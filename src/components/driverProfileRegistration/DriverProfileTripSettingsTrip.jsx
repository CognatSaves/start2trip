import React from 'react';

import { connect } from 'react-redux';
import LocationSearchInput from '../home/HomeBody/Search'
import TextField from 'material-ui/TextField';
import { isMobile } from 'react-device-detect';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
} from 'react-infinite-calendar';
import '../../../node_modules/react-infinite-calendar/styles.css'
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import getUserData from './DriverProfileRequest';
import requests from '../../config';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import DriverRefreshIndicator from './DriverRefreshIndicator';

class DriverProfileTripSettingsTripClass extends React.Component {
    constructor(props) {
        super(props);
        
        let travelsetting = this.props.globalReduser.profile.travelsetting;
        let calend = eval(travelsetting.calendary);
        let dateTour = [];
        if (travelsetting.calendary) {
            for (let i = 0; i < travelsetting.calendary.length; i++) {
                dateTour[i] = new Date(travelsetting.calendary[i]);
            }
        }
        let cityRadius = [];
        let distance = '';
        if (travelsetting.settings) {
            cityRadius = [...travelsetting.settings.points];
            distance = travelsetting.settings.distance;
        }
        if(cityRadius.length===0){
            cityRadius[0]={
                point: '',
                lat: '',
                long: ''
            }
        }
        this.state = {
            cityRadius: cityRadius,
            distance: distance,
            newDate: false,
            dateTour: dateTour,
            calendarModal: false,
            isRefreshExist:false,
            isRefreshing: true,
            isGoodAnswer: true,
        }
    }
    getProfileData=()=>{
        console.log('getProfileData');
        let that = this;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt && jwt !== '-'){
            let requestValues = {
                readCookie: this.props.globalReduser.readCookie,
                setProfileData: function(data){
                that.props.dispatch(setProfileData(data))
                },
                requestAddress: requests.profileRequest
            }
            getUserData(requestValues,that.thenFunc,that.catchFunc);
        }
        else{
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/login');
            //return null;
        }
    }
    startRefresher=()=>{
        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
    }   
    thenFunc=()=>{
        console.log('thenFunc');
        console.log(this.props.globalReduser);
        this.setState({
            isRefreshExist: true,
            isRefreshing: false,
            isGoodAnswer: true,
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 1000);
    }
    catchFunc=()=>{
        console.log('catchFunc');
        this.setState({
            isRefreshExist: true,
            isRefreshing: false,
            isGoodAnswer: false,
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 2000);
    }
    applyChanges=(props)=> {
        
        let jwt = this.props.globalReduser.readCookie('jwt');
        let a = this.state.cityRadius[0].point.length===0;
        let b =!(Number.isInteger(eval(this.state.distance)));
        if(a || b){
            return false;
        }
        else{
            if (jwt && jwt !== "-") {
                let that = this; 
                this.startRefresher();
                let value = {
                    travelsetting: {

                        settings: {
                            points: this.state.cityRadius,
                            distance: this.state.distance
                        },
                        calendary: this.state.dateTour
                    }
                }
                
                if(props){
                    value.onWork = props.onWork;
                }
                console.log('body before json');
                console.log(value);
                let body = JSON.stringify(value);
                
                fetch(requests.travelsettingsUpdateRequest, {
                    method: 'PUT', body: body,
                    headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}` }
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
                            console.log("good");
                            console.log(data);
                            

                            let profile = that.props.globalReduser.profile;
                            profile.travelsetting = data.travelsetting;
                            profile.onWork=data.onWork;
                            that.props.dispatch(setProfileData(profile));
                            /*that.setState({
                                onWork: data.travelsetting.onWork
                            });*/
                            that.thenFunc();
                            //that.getProfileData();
                            //document.location.reload(true);
                            //that.state.sendResultLocal(true, {jwt:data.jwt, user: data.user});
                        }
                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        /*that.setState({
                            onWork: that.props.globalReduser.profile.onWork
                        });*/
                        that.catchFunc();
                        //that.state.sendResultLocal(false,{error: error});
                    });
                    
            }
            else{
                this.props.dispatch(setUrlAddress(window.location.pathname));
                this.props.history.push('/login');
                //return null;
            }
        }
    }
    formSubmit=(event)=> {
        this.applyChanges();
        event.preventDefault();
    }

    addCityRadius=()=> {
        let newArrayCity = this.state.cityRadius;
        newArrayCity.push({ point: "", radius: "", lat: '', long: '' });
        this.setState({
            cityRadius: newArrayCity,
        })
    }

    deleteCityRadius=(index)=> {
        let newArrayCity = this.state.cityRadius;
        newArrayCity.splice(index, 1);
        this.setState({
            cityRadius: newArrayCity,
        })
        console.log(this.state.cityRadius)
    }
    inputChange=(value, variable, index = 0)=> {
        switch (variable) {
            case 'radius': {
                let cityRadius = this.state.cityRadius;
                cityRadius[index].radius = value;
                this.setState({
                    cityRadius: cityRadius
                });
                break;
            }
            case 'distance': {
                this.setState({
                    distance: value
                })
            }
            default:
        }
    }
    changeCity = (index, value, extraData) => {
        console.log('changeCity call');
        console.log(index);
        console.log(value);
        console.log(extraData);
        let cityRadius = this.state.cityRadius;
        cityRadius[index].point = value;
        cityRadius[index].lat = extraData.location.lat;
        cityRadius[index].long = extraData.location.long;
        this.setState({
            cityRadius: cityRadius
        })
    }

    calendarModalShow = () => {
        this.setState({ calendarModal: !this.state.calendarModal, newDate: false });
    };

    addDate = (dates) => {
        let newDate = this.state.dateTour;
        if (this.state.newDate) {
            var needAddDate = true;

            for (let i = 0; i < newDate.length; i++) {
                if (dates.getDate() == newDate[i].getDate() && dates.getMonth() == newDate[i].getMonth() && dates.getFullYear() == newDate[i].getFullYear()) {
                    newDate.splice(i, 1);
                    this.setState({ dateTour: newDate })
                    needAddDate = false;
                    break;
                }
            };
            if (needAddDate) {
                newDate.push(dates);
                this.setState({ dateTour: newDate })
            }
        }
        this.setState({ newDate: true })
    }

    handleRequestDelete = (element) => {
        this.dateTour = this.state.dateTour;
        const dateTourToDelete = this.dateTour.map((chip) => chip.key).indexOf(element.key);
        this.dateTour.splice(dateTourToDelete, 1);
        this.setState({ dateTour: this.dateTour });

    }

    render() {
        console.log("Double RIP render");
        console.log(this.state);
        const MultipleDatesCalendar = withMultipleDates(Calendar);
        var today = new Date();
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.calendarModalShow}
            />,
        ];
        const themeCalendar = {
            accentColor: '#f60',
            floatingNav: {
                background: 'rgba(56, 87, 138, 0.94)',
                chevron: '#304269',
                color: '#FFF',
            },
            headerColor: '#304269',
            selectionColor: '#304269',
            textColor: {
                active: '#FFF',
                default: '#333',
            },
            todayColor: '#f60',
            weekdayColor: '#304269',
        }
        const customContentStyle = {
            width: '100%',
            maxWidth: 'none',
        };
        const locale = {
            blank: 'Select a date...',
            headerFormat: 'ddd, MMM Do',
            todayLabel: {
                long: 'Today',
            },
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            weekStartsOn: 0,
        };
        const style = {
            refresh: {
                display: 'inline-block',
                position: 'relative',
            },
        };

        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileTripSettingsTrip;
        return (

            <React.Fragment>
                <Dialog
                    actions={actions}
                    modal={false}
                    bodyStyle={{ padding: 0 }}
                    contentStyle={isMobile ? customContentStyle : ""}
                    open={this.state.calendarModal}
                    onRequestClose={this.calendarModalShow}
                >
                    <InfiniteCalendar
                        Component={MultipleDatesCalendar}
                        width={100 + "%"}
                        minDate={today}
                        theme={themeCalendar}
                        locale={locale}
                        className="newTourCalendarStyle"
                        interpolateSelection={defaultMultipleDateInterpolation}
                        selected={this.state.dateTour}
                        onSelect={this.addDate}
                    />
                </Dialog>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer}/>
                <div className="tripSettingsBody">
                <div className="basicInformationBodyBottomHeader d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        <p>{textPage.titlePage}</p>
                    </div>
                    <form onSubmit={(event)=>this.formSubmit(event)} id="tripForm" className="">
                        <div className="tripSettingsContent">                        
                            
                            <div className="tripSettingsContentTitle d-flex align-items-center tripname">
                                {textPage.addCityTitle}
                            </div>
                            {this.state.cityRadius.map((element, index) =>
                                <React.Fragment>
                                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                        <label htmlFor={"tripLocation" + index} className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0 triplabel">{textPage.tripLocation}:</label>
                                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column col-md-6 col-sm-12 col-12 p-0">
                                            <LocationSearchInput address={element.point} changeCity={this.changeCity} classDiv="col-md-8 col-12 p-0" classInput="searchInputDriverInformation" index={index} classDropdown="searchDropdownDriverInformation" />
                                            <input className="col-md-2 col-12 ml-1 d-xl-block d-lg-block d-md-block d-sm-none d-none" type="text" id="itemRadiu" value={element.radius}
                                                onChange={(e) => this.inputChange(e.target.value, 'radius', index)}
                                            />
                                            <TextField
                                                floatingLabelText={textPage.textField.floatingLabelText}
                                                className="inputClass d-md-none d-sm-block d-block "
                                                fullWidth="100%"
                                                floatingLabelFocusStyle={{ color: "#304269" }}
                                                underlineFocusStyle={{ borderColor: "#304269" }}
                                                value={element.radius}
                                                onChange={(e) => this.inputChange(e.target.value, 'radius', index)}
                                            />
                                        </div>
                                         <span style={{ display: index ? "block" : "none" }} className="tripSettingsContentDeletButton " title={textPage.textField.title} onClick={() => { this.deleteCityRadius(index) }} /> 
                                        {/* <p className={index ? "d-none" : "d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2"}>{textPage.textField.description}</p> */}
                                    </div>
                                </React.Fragment>
                            )}
                            <div className="tripSettingsContentAddCity d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center pb-2">
                                <p className="col-md-8 col-sm-12 col-12 " onClick={this.addCityRadius}>{textPage.textField.addCityBt}</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="maxDailyMileage" className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-12 p-0 dailymile">{textPage.maxDailyMileage.floatingLabelText}</label>
                                <div className="d-md-block d-sm-none d-none">
                                <input id="maxDailyMileage" className="col-md-5 col-12 " type="text" value={this.state.distance}
                                    onChange={(e) => this.inputChange(e.target.value, 'distance')}
                                />
                                </div>
                                
                                <TextField
                                    floatingLabelText={textPage.maxDailyMileage.floatingLabelText}
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.distance}
                                    onChange={(e) => this.inputChange(e.target.value, 'distance')}
                                />
                                {/* <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">{textPage.maxDailyMileage.description}</p> */}
                            </div>
                            <div className="tripSettingsContentTitle mt-5 border-top col-12 p-0">{textPage.weekendSettings}</div>
                            <div className="tripSettingsContentP d-flex align-items-center">
                                <p className="col-lg-2 col-md-3 col-6 p-0 closetext">{textPage.chooseWeekend}</p>
                                <span className="newTourDatepickerSpan " onClick={this.calendarModalShow}>{textPage.selectDates}</span>
                            </div>
                            <div className="tripSettingsContentDate d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center">
                                <div className="d-flex flex-wrap flex-row align-items-start col-md-8 col-6 p-0 my-2">

                                    {this.state.dateTour.map((element, index) => {
                                        let day = element.getDate();
                                        let month = element.getMonth();
                                        let year = element.getFullYear();
                                        let newDate = day + "." + month + "." + year;
                                        return (
                                            <Chip
                                                key={element.key}
                                                onRequestDelete={() => this.handleRequestDelete(element)}
                                                labelStyle={{ color: "#000" }}
                                                labelColor="#f60"
                                                textColor="#304269"
                                                className="chipClass"
                                            >
                                                {newDate}
                                            </Chip>)
                                    })}

                                </div>
                            </div>
                        </div>

                        <div className="tripSettingsContent d-flex justify-content-md-start justify-content-sm-center justify-content-center py-0">
                            <p className="col-2 p-0  d-md-block d-sm-none d-none"></p>
                            <button htmlFor="tripForm" type="submit">{textPage.tripSaveBt}</button>
                        </div>

                    </form>
                    <div className="tripSettingsContent d-flex justify-content-center">
                        <div className="tripSettingsContentP d-flex flex-column col-md-8 col-12 py-3 pt-4 px-0">
                            <p className="">{textPage.changeOnWorkP}</p>
                            <span onClick = {()=>{this.applyChanges({onWork:!this.props.globalReduser.profile.onWork});}}>{this.props.globalReduser.profile.onWork ? textPage.onWorkTrue : textPage.onWorkFalse}</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const DriverProfileTripSettingsTrip = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(DriverProfileTripSettingsTripClass);

export default DriverProfileTripSettingsTrip;