import React from 'react';

import { connect } from 'react-redux'
import Header from '../header/Header';
import { setDriversRouteChange, setDriverCarDescription, setCarTypes } from '../../redusers/ActionDrivers';
import DriverInfo from './DriverInfo.jsx';
import requests from '../../config';
import { setCities } from '../../redusers/Action'
import DatePicker from 'material-ui/DatePicker';
import MapContainer from '../home/HomeBody/MapContainer';
import { setLengthTime } from '../../redusers/ActionDrivers'
// import axios from 'axios';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import { isMobileOnly } from 'react-device-detect';
import CommentBlock from '../TourDescription/CommentBlock';
import StartTravelForm from '../startTravelForm/StartTravelForm';
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess';
import LocationSearchInput from '../home/HomeBody/Search';

class DriverProfileClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            travelVisibility: false,
            successVisibility: 'none',
            page: 1,
            // mapRwanda:true,
            showPages: 1,
            showPanelVariant: 0,

            //Form value Begin
            firstName: this.props.storeState.userData ? this.props.storeState.userData.firstName : "",
            lastName: this.props.storeState.userData ? this.props.storeState.userData.lastName : "",
            telNumber: this.props.storeState.userData ? this.props.storeState.userData.workPhone : "",
            email: this.props.storeState.userData ? this.props.storeState.userData.email : "",
            date: this.props.storeState.date ? this.props.storeState.date : new Date(),
            departureTime: "",
            numberOfPeople: "",
            placeDeparture: "",
            description: "",
            promoCode: "",
            discount: 0,
            checkBoxes: false,
            emailValid:false,
            //Form value end
            errorMes: false,
            flagAllOk: false,
            promoCod: "",
            isRefreshExist: true,//в конструкторе происходит вызов ф-ции
            isRefreshing: true,//следовательно можно крутить по кд с начала
            isGoodAnswer: false,
            promoCodIsOk:true,
            elementPrice:0,
            comments:{},
            time: [
                "00:00", "00:15", "00:30", "00:45",
                "01:00", "01:15", "01:30", "01:45",
                "02:00", "02:15", "02:30", "02:45",
                "03:00", "03:15", "03:30", "03:45",
                "04:00", "04:15", "04:30", "04:45",
                "05:00", "05:15", "05:30", "05:45",
                "06:00", "06:15", "06:30", "06:45",
                "07:00", "07:15", "07:30", "07:45",
                "08:00", "08:15", "08:30", "08:45",
                "09:00", "09:15", "09:30", "09:45",
                "10:00", "10:15", "10:30", "10:45",
                "11:00", "11:15", "11:30", "11:45",
                "12:00", "12:15", "12:30", "12:45",
                "13:00", "13:15", "13:30", "13:45",
                "14:00", "14:15", "14:30", "14:45",
                "15:00", "15:15", "15:30", "15:45",
                "16:00", "16:15", "16:30", "16:45",
                "17:00", "17:15", "17:30", "17:45",
                "18:00", "18:15", "18:30", "18:45",
                "19:00", "19:15", "19:30", "19:45",
                "20:00", "20:15", "20:30", "20:45",
                "21:00", "21:15", "21:30", "21:45",
                "22:00", "22:15", "22:30", "22:45",
                "23:00", "23:15", "23:30", "23:45",
            ],
            isLoaded: false
        }
        this.state = { ...this.state, "mapRwanda": true }

        props.dispatch(setLengthTime("-", "-"));
        // let now = new Date(Date.now());

        
        let that = this;
        console.log(props.match);
        //let cityNamesArray = parseStringToArray(props.match.params.cities, props.match.params.country, 'ENG');
        props.dispatch(setDriverCarDescription({}));//зачищает старое значение

        let body = JSON.stringify({
            id: props.match.params.id,
            carId: props.match.params.carId,
        });

/*
        that.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
*/
        fetch(requests.getDriverDescription, {
            method: 'PUT', body: body,
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
                    
                    console.log('****************************');
                    console.log('getDriverDescription answer',data);
                    that.setState({comments:data.driverCarDescription.comments})
                    that.props.dispatch(setDriverCarDescription(data.driverCarDescription));
                    that.props.dispatch(setCarTypes(data.carTypes));
                    /*that.setState({
                        isRefreshExist: true,
                        isRefreshing: false,
                        isGoodAnswer: true
                    })
                    setTimeout(()=>{that.setState({isRefreshExist: false})}, 1000);*/
                    
                }

            })
            .catch(function (error) {
                console.log('bad');
                console.log('An error occurred:', error);
                that.setState({
                    isRefreshExist: true,
                    isRefreshing: false,
                    isGoodAnswer: false
                })
                setTimeout(()=>{that.props.history.push('/')}, 1000);
                
            });

    }
    changeTravelVisibility=(elementPrice)=> {
    
        this.setState({
            travelVisibility: !this.state.travelVisibility,
            elementPrice:elementPrice
        })
    }
    changeSuccessVisibility=(value, travelVisibility)=> {
        
        this.setState({
            travelVisibility: travelVisibility ? travelVisibility : this.state.travelVisibility,
            successVisibility: value
        })
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.storeState.userData.firstName !== this.props.storeState.userData.firstName) {

            this.setState({
                firstName: this.props.storeState.userData.firstName,//"",
                lastName: this.props.storeState.userData.lastName,//"",
                telNumber: this.props.storeState.userData.workPhone,//"",
                email: this.props.storeState.userData.email,//"",
            })
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
        this.props.history.push('/drivers');
    }
    changePanelVariant = (value) => {
        this.setState({
            showPanelVariant: value
        })
    }
    changeCity = (index, value, extraData) => {
        
        let cities = this.props.storeState.cities;
        cities[index] = {
          point:value,
          lat: extraData.location.lat,
          long: extraData.location.long
        };
        this.props.dispatch(setCities(cities))
      }
    parseStringToArray = (cities, country) => {

        let newCities = [];
        let newString = cities.split("from-");
        let newArrayCities = newString[1].split("-to-");
        for (let i = 0; i < newArrayCities.length; i++) {
            let stringWithSpaces = newArrayCities[i].replace(/-/g, ' ');
            stringWithSpaces = stringWithSpaces + ', ' + country;
            newCities[i] = { point: stringWithSpaces, lat: "", long: "" };
        }
        this.props.dispatch(setCities(newCities));
        return newCities;
    }
    setLengthTime = (travelLength, travelTime) => {
        function getLengthString(travelLength) {
            let length = travelLength;
            length = Math.ceil(length / 1000);
            let lengthString = length + " км";
            return lengthString;
        }
        function getTimeString(travelTime) {
            let hours = travelTime / 3600 ^ 0;
            let minutes = (travelTime - hours * 3600) / 60 ^ 0;
            let days = hours / 24 ^ 0;
            hours = hours - days * 24;
            let timeString = "";
            if (days !== 0) {
                timeString += days + " дн. " + hours + " ч.";
            }
            else {
                if (hours !== 0) {
                    timeString += hours + " ч. ";
                }
                timeString += minutes + " мин.";
            }
            return timeString;
        }
        if (this.props.driversState.travelLength === "-" && this.props.driversState.travelTime === "-") {
            let lengthString = getLengthString(travelLength);
            let timeString = getTimeString(travelTime);
            this.props.dispatch(setLengthTime(timeString, lengthString));
        }


    }

    sendTripRequest = (body) => {
        if (body) {
            let that = this;
            that.setState({
                isRefreshExist: true,
                isRefreshing: true
            });
            fetch(requests.createNewTrip, {
                method: 'POST', body: body,
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
                        console.log('good');
                        console.log(data);
                        /*that.setState({
                            isRefreshExist: true,
                            isRefreshing: false,
                            isGoodAnswer:true
                        });
                        setTimeout(() => { that.setState({ isRefreshExist: false }) }, 1000);*/
                    }
                })
                .catch(function (error) {
                    console.log('bad');
                    console.log('An error occurred:', error);
                    this.setState({
                        isRefreshExist: true,
                        isRefreshing: false,
                        isGoodAnswer:false
                    });
                    setTimeout(() => { that.setState({ isRefreshExist: false }) }, 1000);
                });
        }
    }
    render() {
        console.log('DriverProfile render');
        console.log(this.props);

        console.log('cities', this.props.storeState.cities);


        let driver = this.props.driversState.driverCarDescription;
        //console.log('driver', driver);

        // let buttonNames = ["Отзывы (" + this.props.commentState.comments.length + ")"];
        
        //обработка захода по url - тогда в storeState не будет точек - следовательно, их надо взять из адреса
        //или быть выкинутым на страницу drivers (скорее всего туда, хотя можно выкинуть на home)
        if(this.props.storeState.cities.length===0 || this.props.storeState.cities[0].point===""){
            
            if( this.props.match.params && this.props.match.params.cities){
                let urlCities = this.props.match.params.cities;
                let urlCountry = this.props.match.params.country;
                let cityNamesArray = this.parseStringToArray(urlCities, urlCountry);
                this.props.dispatch(setCities(cityNamesArray));
            }
            else{
                this.props.globalReduser.history.push('/');
            }
            
        }
        
        //следующее условие включает в себя запрос сервера на получение данных о водителе и его транспорте.
        //запрос можно отправить тогда и только тогда, когда все имеющиеся города получат свои координаты
        //обработки события, когда какой-то из городов не получил координат пока(19.07.19) нет
        //запрос отправляется только один раз - isLoaded
        if (!this.state.isLoaded && this.props.storeState.cities.length>0
             && this.props.storeState.cities[this.props.storeState.cities.length-1].lat!=='' && this.props.storeState.languages.length>0) {
            
        
            let cities;
            let country;
            function createRequestElement(cities, travelMode){
                let waypoints = [];
                for (let i = 1; i < cities.length - 1; i++) {
                    waypoints[i - 1] = {
                    location: cities[i].point,
                    stopover: true
                    }
                }
                let request =
                {
                    origin: cities[0].point, //точка старта
                    destination: cities[cities.length - 1].point, //точка финиша
                    waypoints: waypoints,
                    travelMode: travelMode, //режим прокладки маршрута
                };
                return request;
            }
            
            cities = this.props.storeState.cities;


            country = this.props.globalReduser.findGetParameter('countryISO');
            let that = this;
            //let cityNamesArray = this.parseStringToArray(cities, country);

            let date = this.props.globalReduser.findGetParameter('date');


            
            let request = createRequestElement(cities, window.google.maps.DirectionsTravelMode.DRIVING);
            let service = new window.google.maps.DirectionsService();

            service.route(request, function(response, status){
                if (status !== window.google.maps.DirectionsStatus.OK){
                    return false;
                }
                function lengthTimeCalc(response){
                    let res = {
                        duration: 0,
                        distance: 0
                    };
                    for(let i=0; i<response.routes[0].legs.length;i++){
                        res.duration+=response.routes[0].legs[i].duration.value;
                        res.distance+=response.routes[0].legs[i].distance.value;
                    }
                    res.distance = res.distance/1000;//конверсия в км
                    res.duration = res.duration/60;//конверсия в минуты
                    return res;
                }
                
                let routeProps = lengthTimeCalc(response);
                let body = JSON.stringify({
                    id: that.props.match.params.id,
                    carId: that.props.match.params.carId,
                    cities: cities,
                    country: country,
                    date: date,
                    distance: routeProps.distance,
                    duration: routeProps.duration
                });
                
                console.log(requests.getDriverInfo);
                
                fetch(requests.getDriverInfo, {
                    method: 'PUT', body: body,
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
                            
                            console.log('***********************');
                            console.log('getDriverInfo answer',data);
                            //that.setState({comments:data.driverCarDescription.comments})
                            that.props.dispatch(setDriverCarDescription({...that.props.driversState.driverCarDescription, price: data.price}));
                            
                            that.setState({
                                isRefreshExist: false,
                                isRefreshing: false,
                                isGoodAnswer: true
                            })
                            //setTimeout(()=>{that.setState({isRefreshExist: false})}, 1000);
                            
                        }
    
                    })
                    .catch(function (error) {
                        console.log('bad');
                        console.log('An error occurred:', error);
                        that.setState({
                            isRefreshExist: true,
                            isRefreshing: false,
                            isGoodAnswer: false
                        })
                        setTimeout(()=>{that.props.history.push('/')}, 1000);                      
                    });
            });           
            this.setState({isLoaded: true});
        }
        if(!this.state.isLoaded && !this.state.isRefreshExist){
            /*
            this.setState({
                isRefreshExist: true,
                isRefreshing: true
            });
            */
        }
        let carCapacityArray = [];
        if (this.props.driversState.driverCarDescription.carCapacity) {
            for (let i = 0; i < this.props.driversState.driverCarDescription.carCapacity; i++) {
                carCapacityArray.push(i + 1)
            }
        } else {
            carCapacityArray.push("1")
        }
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
        let storeState= this.props.storeState;
        let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber]
        let textInfo = this.props.storeState.languageTextMain.drivers.driversBlock;
        let defaultPrice = this.props.driversState.driverCarDescription.price * (100 - this.state.discount) / 100;
        let isCurrencyLoaded = activeCurrency && activeCurrency.symbol;
        return (
            <React.Fragment>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
                
                <div className="drivers_top_background">
                    <Header history={this.props.history} />
                    <dir className="driversGoBack" style={{display: isMobileOnly?"flex":"none"}}>
                        <span onClick={()=>{this.props.history.goBack()}}>Назад</span>
                    </dir>
                    {
                        /*this.props.driversState.driverCarDescription.id*/true /*this.props.storeState.languages.length>0*/ ? 
                        <div className="wrapper d-flex flex-column"/* style={{background: this.props.driversState.driverCarDescription.id ? 'transpatent' : '#fff'}}*/>
                            <div className="drivers_top_block d-flex flex-column" style={{visibility: this.props.driversState.driverCarDescription.id ? 'visible' : 'hidden'}}>

                                <DriverInfo element={driver} />
                                
                                <div className="drivers_route col-12 d-flex " >
                                    <div className="d-flex flex-column routeTravelBlock_pointPart col-md-6 col-12" style={{margin: 0}}>
                                        <div style={{paddingTop: '10px'}}>
                                            <div className="route_time_text col-12">Время в пути без остановок:
                                            <p1> {this.props.driversState.travelTime}</p1>
                                                , длина пути:
                                            <p2> {this.props.driversState.travelLength}</p2>

                                            </div>
                                        </div>
                                            <div className=" col-12 p-0 d-flex flex-wrap" >
                                            
                                                <div className="d-flex flex-wrap routeTravelBlock_pointBlock">
                                                {
                                                    this.props.storeState.cities && this.props.storeState.cities[0].point.length>0 ?           
                                                        this.props.storeState.cities.map((element, index) => 
                                                        <div className={"routeTravelBlock_element d-flex col-md-6 col-12 " /*+ (index%2===0 ? 'routeTravelBlock_pointElement_left' : 'routeTravelBlock_pointElement_right')*/}>
                                                            <div className="routeTravelBlock_pointValue d-flex flex-row">
                                                                <div style={{paddingRight: '10px',margin: 'auto 0'}}>{this.props.globalReduser.alphabet[index]}</div>
                                                                <div className="d-flex routeTravelBlock_height driverProfile_searchContainer">
                                                                    <LocationSearchInput readOnlyOn={true} address={element.point}
                                                                    changeCity={this.changeCity} index={index}
                                                                    classDropdown="searchElement_style"
                                                                    classInput={index ? "city_input" : "city_input _checkInput"} />
                                                                    
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                        )
                                                    : <React.Fragment/>
                                                }
                                                
                                                <div className={"routeTravelBlock_element d-flex col-md-6 col-12 "}>
                                                    <div className={"routeTravelBlock_pointValue d-flex flex-row "}
                                                    onClick={()=>{if(this.state.isDateHighlighted){this.setState({isDateHighlighted: false})}}}>
                                                        <div className="placesDescription_travelBlock_icon placesDescription_calendary" />
                                                        <DatePicker defaultDate={this.state.date} hintText={textInfo.startDate} minDate={new Date()} onChange={(e, date) => { this.setState({date: date});  }} className="routeDescrDate" />
                                                    </div>
                                                </div>
                                                {
                                                    this.props.storeState.languages.length>0 && defaultPrice ? 
                                                    <div className={"routeTravelBlock_element d-flex "+((this.props.storeState.cities.length+1)%2===0 ? 'col-12': 'col-md-6 col-12') }>
                                                        <button className='driversBlock_buttonStyle' /*"placesDescription_travelBlock_applyButton p-0 "*/
                                                        style={{/*marginBottom: '15px',*/ width: '100%', border: 'none', borderRadius: '5px', height: '100%'}}
                                                        onClick={()=>{this.changeTravelVisibility(defaultPrice)}}>
                                                            <text style={{ margin: "auto", fontSize: '16px' }} >
                                                            {"ЗАБРОНИРОВАТЬ " + (isCurrencyLoaded ? ((activeCurrency.isLeft ? activeCurrency.symbol : '')
                                                            + Math.ceil(defaultPrice*activeCurrency.costToDefault) 
                                                            + (!activeCurrency.isLeft ? activeCurrency.symbol : '')) : '')}</text>
                                                        </button>
                                                    </div> : <React.Fragment/>
                                                }
                                                
                                            </div>
                                            </div>
                                    </div>
                                    <div className="col-6 d-md-block d-none " style={{height: '400px'}}>
                                        <MapContainer cities={this.props.storeState.cities} setLengthTime={this.setLengthTime} mapUpdate={true} />
                                    </div>
                                </div>

                            </div>
                        </div> : <React.Fragment/>
                    }
                    
                </div>
                {
                    this.props.driversState.driverCarDescription.id ? 
                    <React.Fragment>
                        <div className="wrapper d-flex flex-column">
                            <div className="drivers_bottom_background d-flex flex-column" >
                                <div className="drivers_body d-flex">
                                    <div className="left_body_part col-12">
                                        <CommentBlock comments={this.state.comments}  page={this.state.page} setPage={this.setPage}
                                                    showMorePages={this.showMorePages} showPages={this.state.showPages} id={"commentBlockId"}  />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <StartTravelForm {...this.props} changeTravelVisibility={this.changeTravelVisibility} driversState={this.props.driversState} changeSuccessVisibility={this.changeSuccessVisibility}
                            travelVisibility={this.state.travelVisibility} isoCountryMap={this.props.storeState.isoCountryMap} storeState={this.props.storeState}
                            elementPrice={defaultPrice} activeCurrency={activeCurrency} textInfo={this.props.storeState.languageTextMain.startTravelForm}/>
            
                        <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility} />                       
                    </React.Fragment>    
                    : <React.Fragment/>
                }
                </React.Fragment>

        )
       
    }
}

const DriverProfile = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
        commentState: state.CommentReduser,
        globalReduser: state.GlobalReduser
    }),
)(DriverProfileClass);

export default DriverProfile;