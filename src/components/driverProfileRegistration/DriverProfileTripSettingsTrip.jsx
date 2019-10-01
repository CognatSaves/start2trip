import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import getUserData from './DriverProfileRequest';
import requests from '../../config';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';

import LocationSearchInput from '../home/HomeBody/Search'
import DriverRefreshIndicator from './DriverRefreshIndicator';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
        if (cityRadius.length === 0) {
            cityRadius[0] = {
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
            isRefreshExist: false,
            isRefreshing: true,
            isGoodAnswer: true,
            firstDate: null,
            badRequestTextVisibility: false,
        }
    }
    getProfileData = () => {
        console.log('getProfileData');
        let that = this;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== '-') {
            let requestValues = {
                readCookie: this.props.globalReduser.readCookie,
                setProfileData: function (data) {
                    that.props.dispatch(setProfileData(data))
                },
                requestAddress: requests.profileRequest
            }
            getUserData(requestValues, that.thenFunc, that.catchFunc);
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }
    }
    startRefresher = () => {
        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
    }
    thenFunc = () => {
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
    catchFunc = () => {
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
    validate = () => {

        let res = true;
        if ((!(Number.isInteger(eval(this.state.distance))))) {
            let inputBlocks = document.getElementsByClassName('maxDailyMileage');
            inputBlocks[0].classList.add("errorColor");
            inputBlocks[1].classList.add("errorColor");
            res = false;
        }
        for (let i = 0; i < this.state.cityRadius.length; i++) {
            if (this.state.cityRadius[i].point.length === 0) {
                let inputs = document.getElementsByClassName('searchInputDriverInformation');
                inputs[i].classList.add("errorColor");
                res = false;

            }
            if (!Number.isInteger(eval(this.state.cityRadius[i].radius))) {
                res = false;
                let inputs = document.getElementsByClassName('itemRadius');
                inputs[i * 2].classList.add("errorColor");
                inputs[i * 2 + 1].classList.add("errorColor");
            }

        }

        return res;
    }
    applyChanges = (props) => {

        let jwt = this.props.globalReduser.readCookie('jwt');
        let isValid = this.validate() || props;

        if (!isValid) {//какие-то косяки - открываем текст под кнопкой
            //если запрос на изменения статуса водителя, то пох, там только 1 поле и мы его не можем не изменить
            this.setState({
                badRequestTextVisibility: true
            })
            return false;
        }
        else {
            if (jwt && jwt !== "-") {
                let that = this;
                this.startRefresher();
                let value;
                if (props) {
                    value = { onWork: props.onWork, changeOnWork: true };
                }
                else {
                    value = {
                        travelsetting: {

                            settings: {
                                points: this.state.cityRadius,
                                distance: this.state.distance
                            },
                            calendary: this.state.dateTour
                        }
                    }
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
                            profile.onWork = data.onWork;
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
            else {
                this.props.dispatch(setUrlAddress(window.location.pathname));
                this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
                //return null;
            }
        }
    }
    formSubmit = (event) => {
        this.applyChanges();
        event.preventDefault();
    }
    addCityRadius = () => {
        let newArrayCity = this.state.cityRadius;
        newArrayCity.push({ point: "", radius: "", lat: '', long: '' });
        this.setState({
            cityRadius: newArrayCity,
        })
    }
    deleteCityRadius = (index) => {
        let newArrayCity = this.state.cityRadius;
        newArrayCity.splice(index, 1);
        this.setState({
            cityRadius: newArrayCity,
        })
        console.log(this.state.cityRadius)
    }
    inputChange = (value, variable, index = 0) => {
        switch (variable) {
            case 'radius': {
                let cityRadius = this.state.cityRadius;
                cityRadius[index].radius = value;

                let inputs = document.getElementsByClassName('itemRadius');
                inputs[index * 2].classList.remove("errorColor");
                inputs[index * 2 + 1].classList.remove("errorColor");

                this.setState({
                    cityRadius: cityRadius,
                    badRequestTextVisibility: false
                });
                break;
            }
            case 'distance': {
                let inputBlocks = document.getElementsByClassName('maxDailyMileage');
                inputBlocks[0].classList.remove("errorColor");
                inputBlocks[1].classList.remove("errorColor");
                this.setState({
                    distance: value,
                    badRequestTextVisibility: false
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
        let inputs = document.getElementsByClassName('searchInputDriverInformation');
        if (inputs[index] && inputs[index].classList) {
            inputs[index].classList.remove("errorColor");
        }


        this.setState({
            cityRadius: cityRadius,
            badRequestTextVisibility: false
        })
    }
    calendarModalShow = () => {
        if (this.state.firstDate !== null) {
            // на случай если ввели только одно первое число 
            let newDate = this.state.dateTour;
            newDate.push(this.state.firstDate);
            this.setState({
                calendarModal: !this.state.calendarModal,
                newDate: false,
                dateTour: newDate,
                firstDate: null
            });
        } else {
            this.setState({ calendarModal: !this.state.calendarModal, newDate: false });
        }

    };
    handleRequestDelete = (element) => {
        this.dateTour = this.state.dateTour;
        const dateTourToDelete = this.dateTour.map((chip) => chip).indexOf(element);
        this.dateTour.splice(dateTourToDelete, 1);
        this.setState({ dateTour: this.dateTour });

    }
    handleDayClick = (day, { selected }) => {
        const { dateTour } = this.state;
        if (selected) {
            const selectedIndex = dateTour.findIndex(dateTour =>
                DateUtils.isSameDay(dateTour, day)
            );
            dateTour.splice(selectedIndex, 1);
        } else {
            dateTour.push(day);
        }
        this.setState({ dateTour });
    }
    render() {
        console.log("Double RIP render");
        console.log(this.state);
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.calendarModalShow}
            />,
        ];
        const customContentStyle = {
            width: '100%',
            maxWidth: 'none',
        };


        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileTripSettingsTrip;
        let dateTours = [];
        if(this.state.dateTour.length>0){
            dateTours = this.state.dateTour.sort((c, d) => {
                    let a = new Date(c);
                    let b = new Date(d);
                    return a < b ? -1 : a > b ? 1 : 0;

            })
        }
        

        return (

            <>
                <Dialog
                    actions={actions}
                    modal={false}
                    bodyStyle={{ padding: 0 }}
                    contentStyle={isMobile ? customContentStyle : ""}
                    open={this.state.calendarModal}
                    onRequestClose={this.calendarModalShow}
                >
                    <DayPicker
                        selectedDays={this.state.dateTour}
                        onDayClick={this.handleDayClick}
                    />

                </Dialog>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
                <div className="tripSettingsBody">
                    <div className="basicInformationBodyBottomHeader d-md-block d-none">
                        <p>{textPage.titlePage}</p>
                    </div>
                    <form onSubmit={(event) => this.formSubmit(event)} id="tripForm" className="">
                        <div className="tripSettingsContent">

                            <div className="tripSettingsContentTitle d-flex align-items-center tripname">
                                {textPage.addCityTitle}
                            </div>
                            {this.state.cityRadius.map((element, index) =>
                                <>
                                    <div className="d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                        <label htmlFor={"tripLocation" + index} className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0 triplabel">{textPage.tripLocation}:</label>
                                        <div className="d-flex flex-md-row flex-column col-md-6 col-sm-12 col-12 p-0" >
                                            <LocationSearchInput address={element.point} changeCity={this.changeCity} classDiv="col-md-8 col-12 p-0" classInput="searchInputDriverInformation" index={index} classDropdown="searchDropdownDriverInformation" />
                                            <input className="col-md-2 col-12 ml-1 d-md-block d-none itemRadius"/*класс itemRadius добавил ради класса errorColor - отображения некорректоности заполнения */
                                                type="number" id="itemRadiu" max="150" min="0" value={element.radius}
                                                onChange={(e) =>{if(e.target.value>150){this.inputChange(150, 'radius', index) }else{this.inputChange(e.target.value, 'radius', index)}}}
                                            />
                                            <TextField
                                                floatingLabelText={textPage.textField.floatingLabelText}
                                                className="inputClass d-md-none d-block itemRadius margin_5"/*класс itemRadius добавил ради класса errorColor - отображения некорректоности заполнения */
                                                fullWidth="100%"
                                                type="number"
                                                maxlength="3"
                                                floatingLabelFocusStyle={{ color: "#304269" }}
                                                underlineFocusStyle={{ borderColor: "#304269" }}
                                                value={element.radius}
                                                onChange={(e) => {if(e.target.value>150){this.inputChange(150, 'radius', index) }else{this.inputChange(e.target.value, 'radius', index)}}}
                                            />
                                        </div>
                                        <span style={{ display: index ? "block" : "none" }} className="tripSettingsContentDeletButton " title={textPage.textField.title} onClick={() => { this.deleteCityRadius(index) }} />
                                        {/* <p className={index ? "d-none" :  d-md-block d-none pl-2"}>{textPage.textField.description}</p> */}
                                    </div>
                                </>
                            )}
                            <div className="tripSettingsContentAddCity d-flex align-items-md-center align-items-start justify-content-center pb-2">
                                <p className="col-md-8 col-sm-12 col-12 " onClick={this.addCityRadius}>{textPage.textField.addCityBt}</p>
                            </div>
                            <div className="d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                <label htmlFor="maxDailyMileage" className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-12 p-0 dailymile">{textPage.maxDailyMileage.floatingLabelText}</label>
                                <div className="d-md-block d-none">
                                    <input className="col-md-5 col-12 maxDailyMileage" type="number" value={this.state.distance}
                                        onChange={(e) =>{if(e.target.value>1000){this.inputChange(1000, 'distance') }else{this.inputChange(e.target.value, 'distance')}}}
                                    />
                                </div>

                                <TextField
                                    floatingLabelText={textPage.maxDailyMileage.floatingLabelText}
                                    className="d-md-none d-block inputClass maxDailyMileage"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.distance}
                                    onChange={(e) => {if(e.target.value>1000){this.inputChange(1000, 'distance') }else{this.inputChange(e.target.value, 'distance')}}}
                                />
                                {/* <p className=" d-md-block d-none pl-2">{textPage.maxDailyMileage.description}</p> */}
                            </div>
                            <div className="tripSettingsContentTitle mt-5 border-top col-12 p-0">{textPage.weekendSettings}</div>
                            <div className="tripSettingsContentP d-flex align-items-center">
                                <p className="col-lg-2 col-md-3 col-6 p-0 closetext">{textPage.chooseWeekend}</p>
                                <span className="newTourDatepickerSpan " onClick={this.calendarModalShow}>{textPage.selectDates}</span>
                            </div>
                            <div className="tripSettingsContentDate d-flex align-items-md-center align-items-start justify-content-center">
                                <div className="d-flex flex-wrap align-items-start justify-content-md-start justify-content-center col-md-8 col-12 p-0 my-2">

                                    {dateTours.map((element, index) => {
                                        let day = element.getDate() < 10 ? "0" + element.getDate() : element.getDate();
                                        let month = element.getMonth() + 1 < 10 ? "0" + (element.getMonth() + 1) : element.getMonth() + 1;
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
                            <p className="col-2 p-0 d-md-block d-none"></p>
                            <div className="d-flex flex-column">
                                <button htmlFor="tripForm" type="submit">{textPage.tripSaveBt}</button>
                                <text style={{ color: 'red', display: this.state.badRequestTextVisibility ? 'block' : 'none' }}>{textPage.badRequestText}</text>
                            </div>
                        </div>

                    </form>
                    <div className="tripSettingsContent d-flex justify-content-center">
                        <div className="tripSettingsContentP d-flex flex-column col-md-8 col-12 py-3 pt-4 px-0">
                            <p className="">{textPage.changeOnWorkP}</p>
                            <span onClick={() => { this.applyChanges({ onWork: !this.props.globalReduser.profile.onWork }); }}>{this.props.globalReduser.profile.onWork ? textPage.onWorkTrue : textPage.onWorkFalse}</span>
                        </div>
                    </div>
                </div>
            </>
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