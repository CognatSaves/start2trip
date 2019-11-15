import React from 'react';
import { connect } from 'react-redux'
import { setDriversRouteChange, setDriverCarDescription, setCarTypes } from '../../redusers/ActionDrivers';
import { setGuideData } from '../../redusers/ActionGuides';
import { setCities, set_state } from '../../redusers/Action'
import { setLengthTime } from '../../redusers/ActionDrivers'
import { Helmet } from 'react-helmet';
import requests from '../../config';

import Header from '../header/Header';
import DriverInfo from '../driverProfile/DriverInfo.jsx';
import DatePicker from 'material-ui/DatePicker';
import MapContainer from '../home/HomeBody/MapContainer';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import CommentBlock from '../TourDescription/CommentBlock';
import StartTravelForm from '../startTravelForm/StartTravelForm';
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess';
import LocationSearchInput from '../home/HomeBody/Search';
import GuideTours from './GuideTours';
import GuideInfo from './GuideInfo';
import Cookies from 'universal-cookie';
import './GuideDescription.css';

const cookies = new Cookies();

class GuideDescriptionClass extends React.Component {
    constructor(props) {
        super(props);

        let getdate = props.globalReduser.findGetParameter("date");
        let dateValue;

        if (getdate) {
            dateValue = props.globalReduser.getDateFromDateString(getdate);
            let now = new Date(Date.now());
            if (dateValue < now) {
                let day = dateValue.getDate(); let month = dateValue.getMonth(); let year = dateValue.getFullYear();
                let daynow = now.getDate(); let monthnow = now.getMonth(); let yearnow = now.getFullYear();
                if (day !== daynow || month !== monthnow || year !== yearnow) {
                    dateValue = now;
                    let address = document.location.origin + document.location.pathname;
                    document.location.replace(address);
                }
            }
            dateValue = props.globalReduser.convertDateToUTC(new Date(dateValue));

        }
        else {
            dateValue = props.globalReduser.convertDateToUTC(new Date(Date.now()));
        }

        let resultString = dateValue.toUTCString();
        props.dispatch(set_state(props.storeState.cities, resultString));
        this.state = {
            travelVisibility: false,
            successVisibility: 'none',
            page: 1,
            // mapRwanda:true,
            showPages: 1,
            showPanelVariant: 0,

            //Form value Begin
            firstName: props.storeState.userData ? props.storeState.userData.firstName : "",
            lastName: props.storeState.userData ? props.storeState.userData.lastName : "",
            telNumber: props.storeState.userData ? props.storeState.userData.workPhone : "",
            email: props.storeState.userData ? props.storeState.userData.email : "",
            date: dateValue,
            departureTime: "",
            numberOfPeople: "",
            placeDeparture: "",
            description: "",
            promoCode: "",
            discount: 0,
            checkBoxes: false,
            emailValid: false,
            //Form value end
            errorMes: false,
            //flagAllOk: false,
            promoCod: "",
            promoCodIsOk: true,
            elementPrice: 0,
            comments: [],
            isLoaded: false,

            tourType:"default",
            visibilityArray: [true, false],
            visibilityValues: ['Мои туры', "Отзывы"],
            dataLang: ''//Язык, на котором загружены данные
        }
        this.state = { ...this.state, "mapRwanda": true }



    }
    componentWillUnmount(){
        //зачистка
        this.props.dispatch(setGuideData({}));
    }
    componentDidMount() {
       this.sendDataRequest(); 
    }
    sendDataRequest = () => {
        this.props.dispatch(setLengthTime("-", "-"));
        let that = this;
        startRefresherGlobal(this)
        console.log(this.props.match);
        this.props.dispatch(setDriverCarDescription({}));//зачищает старое значение
        let lang = cookies.get('userLang', {path: '/'});
        let guideBody = JSON.stringify({
            //id: this.props.match.params.id,
            slug: this.props.match.params.slug,
            lang: lang
        })
        this.setState({
            dataLang: lang,
        })
        fetch(requests.showGuide, {
            method: 'PUT', body: guideBody,
            headers: { 'content-type': 'application/json' }
        })
        .then(response => {
            return response.json();
        })
        .then(function (data) {
            
            if (data.error) {
                console.log("bad");
                throw data.error;
            }
            else {           
                thenFuncGlobal(that)    
                console.log('good - you get a guide description');
                console.log(data);
                if(data.guideData.tours.length>0){
                    //если туры у человека пришли, то отрабатываем стандартно - 
                    //проверка на наличие локализаций на выбранном языке
                    
                    that.props.dispatch(setGuideData(data.guideData, data.carTypes));
                }
                else{
                    //иначе делаем перенаправление на страницу гидов, пускай выбирает
                    //тех гидов, что заполнили локализации на выбранном языке
                    that.props.globalReduser.history.push("/" + that.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/guides/');
                }
                
            }
        })
        .catch(function (error) {
            console.log('bad');
            console.log('An error occurred:', error);
            catchFuncGlobal(that)
            let address = '/404'
            if(that.props.storeState.country && that.props.storeState.languages && that.props.storeState.languages.length>0 && that.props.storeState.activeLanguageNumber){
                address = '/' + that.props.storeState.country + "-" + that.props.storeState.languages[that.props.storeState.activeLanguageNumber].isoAutocomplete + '/guides';
            }
            setTimeout(() => { that.props.history.push(address) }, 1000);       
        });
    }
    changeTravelVisibility = (elementPrice) => {

        this.setState({
            travelVisibility: !this.state.travelVisibility,
            elementPrice: elementPrice
        })
    }
    changeSuccessVisibility = (value, travelVisibility) => {

        this.setState({
            travelVisibility: travelVisibility ? travelVisibility : this.state.travelVisibility,
            successVisibility: value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.storeState.userData && this.props.storeState.userData){
            if (prevProps.storeState.userData.firstName !== this.props.storeState.userData.firstName) {

                this.setState({
                    firstName: this.props.storeState.userData.firstName,//"",
                    lastName: this.props.storeState.userData.lastName,//"",
                    telNumber: this.props.storeState.userData.workPhone,//"",
                    email: this.props.storeState.userData.email,//"",
                })
            }
        }
        
        return true
    }
    showMorePages = () => {
        this.setState({
            page: this.state.page + 1,
            showPages: this.state.showPages + 1
        })
    }
    setPage = (page) => {
        if (page !== "...") {
            this.setState(
                {
                    page: page,
                    showPages: 1
                }
            )
        }
    }
    goToDrivers = () => {
        this.props.dispatch(setDriversRouteChange(true));
        this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/drivers/');
    }
    changePanelVariant = (value) => {
        this.setState({
            showPanelVariant: value
        })
    }
    changeCity = (index, value, extraData) => {

        let cities = this.props.storeState.cities;
        cities[index] = {
            point: value,
            lat: extraData.location.lat,
            long: extraData.location.long
        };
        this.props.dispatch(setCities(cities))
    }
    parseStringToArray = (cities, country, langISO) => {

        let newCities = [];
        let newString = cities.split("from-");
        let newArrayCities = newString[1].split("-to-");
        for (let i = 0; i < newArrayCities.length; i++) {
            let stringWithSpaces = newArrayCities[i].replace(/-/g, ' ');
            stringWithSpaces = stringWithSpaces + ', ' + country;
            stringWithSpaces = this.props.globalReduser.convertFromUrlTranslation(stringWithSpaces, langISO ? langISO : 'en');
            newCities[i] = { point: stringWithSpaces, lat: "", long: "" };
        }
        this.props.dispatch(setCities(newCities));
        return newCities;
    }

    chooseDate = (value) => {//это не такой же chooseDate, как в RouteMenu, attention please


        let resultString = this.props.globalReduser.convertDateToUTC(value).toUTCString();
        if (this.state.date !== resultString) {
            this.props.dispatch(set_state(this.props.storeState.cities, resultString))
            this.setState({
                date: value
            });
        }
    }

    newComments = (newArray)=>{
        let guideData = {...this.props.guidesReduser.guideData}
        guideData.comments = newArray
        this.props.dispatch(setGuideData(guideData, this.props.guidesReduser.carTypes));
    }

    render() {
        function isPointsLoaded(cities) {
            for (let i = 0; i < cities.length; i++) {
                let a = Number.isFinite(cities[i].lat);
                let b = Number.isFinite(cities[i].long);
                if (!a || !b) {
                    return false;
                }
            }
            return true;
        }
        let lang =cookies.get('userLang', {path: '/'});

        if(this.state.dataLang!==lang && !(this.props.storeState.isRefreshExist)){
            this.sendDataRequest();
        }
        console.log('DriverProfile render');
        //console.log(this.props);
        //console.log('cities', this.props.storeState.cities);
        let flagAllOk = false;
        if (
            this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.telNumber !== "" &&
            this.state.email !== "" &&
            this.state.emailValid === true &&
            this.state.date !== "" &&
            this.state.departureTime !== "" &&
            this.state.numberOfPeople !== "" &&
            this.state.placeDeparture !== "" &&
            this.state.checkBoxes === true
        ) {
            if (!flagAllOk && this.state.errorMes) {
                this.setState({ errorMes: false })
            }
            flagAllOk = true;
        }

        let storeState = this.props.storeState;
        let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber]
        let textInfo = this.props.storeState.languageTextMain.drivers.driversBlock;
        let defaultPrice = this.props.driversState.driverCarDescription.price * (100 - this.state.discount) / 100;
        let isCurrencyLoaded = activeCurrency && activeCurrency.symbol;
        
        let helmet = this.props.guidesReduser.guideData.guide ? this.props.storeState.languageTextMain.helmets.guideProfile.guide :
        this.props.storeState.languageTextMain.helmets.guideProfile.agency;

        let windowImg = null
        if (this.props.storeState.languages.length > 0) {

            let coockisIso = cookies.get('country', { path: '/' })
            let j;
            for (let i = 0; i < this.props.storeState.countries.length; i++) {
                if (this.props.storeState.countries[i].ISO === coockisIso) {
                    j = i
                    break;
                }
            }
            if (coockisIso === undefined) {
                j = 1
            }
            windowImg = requests.serverAddressImg + this.props.storeState.countries[j].windowImg.url
        }
        let isSuperUser = false
        let userId = cookies.get('userId', { path: "/" })
        if (requests.isSuperUser(userId)) {
            isSuperUser = true
        }

        return (
            <>

                <div className="drivers_top_background" style={{ background: "url(" + windowImg + ")no-repeat" }}>
                    <Header history={this.props.history} showBtnBack={true} />

                    <div className="wrapper d-flex flex-column">
                        <div className="drivers_top_block d-flex flex-column" style={{ visibility: this.props.guidesReduser.guideData.id ? 'visible' : 'hidden' }}>
                            {
                                this.props.guidesReduser.guideData.id ?
                                <Helmet>
                                    <title>{helmet.title[0]+this.props.guidesReduser.guideData.name+helmet.title[1]}</title>
                                    <meta name="description" content={helmet.description[0]+this.props.guidesReduser.guideData.name+helmet.description[1]} />
                                    <meta property="og:site_name" content="Tripfer" />
                                    <meta property="og:type" content="website" />
                                    <meta property="og:url" content={document.URL} />
                                    <meta property="og:title" content={helmet.title[0]+this.props.guidesReduser.guideData.name+helmet.title[1]} />
                                    <meta property="og:description" content={helmet.description[0]+this.props.guidesReduser.guideData.name+helmet.description[1]} />
                                </Helmet>
                                : <React.Fragment/>
                            }                        
                            <GuideInfo guideData={this.props.guidesReduser.guideData} />                                  
                        </div>
                    </div> 

                </div>
                {
                    this.props.guidesReduser.guideData.id ?
                        <>                           
                            <div className="wrapper d-flex flex-column">
                                <div className="driverProfileComments_panel d-flex">
                                    <div className="d-flex col-12 p-md-0 guidesSortElementsBlock">
                                    {
                                        this.state.visibilityArray.map((element, index)=>{
                                            
                                            return(
                                            <span className={"driverProfileComments_panel_element" + (this.state.visibilityArray[index] ? ' driverProfileComments_panel_selectedElement' : '')}
                                            onClick={()=>{
                                            let visibilityArray = Array(this.state.visibilityArray.length).fill(false); 
                                            visibilityArray[index]=true; 
                                            this.setState({visibilityArray: visibilityArray})}}
                                            style={{margin: '0 10px'}}>
                                                {this.state.visibilityValues[index]}
                                            </span>
                                            )
                                        })                         
                                    }
                                    </div>
                                </div>
                                {
                                    this.state.visibilityArray[0] &&
                                    <div /*drivers_route*/ className="col-12 d-flex flex-column" >
                                        <GuideTours isStaying={!this.props.storeState.isRefreshExist} departureDate={new Date()/*this.state.departureDate*/} 
                                            changeTravelVisibility={()=>{}/*this.changeTravelVisibility*/} tourType={this.state.tourType}/>
                                    </div>
                                }
                                {
                                    this.state.visibilityArray[1] &&
                                    <div className="drivers_bottom_background d-flex flex-column" >
                                        <div className="drivers_body d-flex">
                                            <div className="left_body_part col-12">
                                                <CommentBlock comments={this.props.guidesReduser.guideData.comments} isSuperUser={isSuperUser} 
                                                showCreateComment={false} profile={this.props.guidesReduser.guideData}
                                                page={this.state.page} setPage={this.setPage} newComments={this.newComments} 
                                                targetType="user" targetId={this.props.guidesReduser.guideData.id} isNeedAnswer={true}
                                                showMorePages={this.showMorePages} showPages={this.state.showPages} id={"commentBlockId"} noHeader={true}/>
                                            </div>
                                        </div>
                                    </div>
                                }                               
                            </div>                         
                        </>
                        : <div style={{ position: 'relative',minHeight:"55vh" }}></div>
                }
            </>
        )
    }
}

const GuideDescription = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
        commentState: state.CommentReduser,
        globalReduser: state.GlobalReduser,
        guidesReduser: state.GuidesReduser
    }),
)(GuideDescriptionClass);

export default GuideDescription;