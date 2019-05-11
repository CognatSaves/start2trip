import React from 'react';
import './DriverProfileNavigation.css'
import { connect } from 'react-redux';
import { whichPageRender } from "../../redusers/ActionDriverProfileRegistration"
import imgPerson from './img/drivers_body_photo.png'
import Stars from '../stars/Stars'

import calendarBG from './img/illustrations_calendar.svg'
import carBg from './img/illustrations_nastroiki-01.svg'
import toursBG from './img/illustrations_poezdki_tours.svg'
import historyBG from './img/illustrations_history.svg'
import sittingsBG from './img/illustrations_nastroiki-04.svg'
import feedbackBG from './img/illustrations_otzivi.svg'
import preHistoryBG from './img/illustrations_predstoishie.svg'

import requests from '../../config';

class DriverProfileNavigationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationText: ["Мои поездки", "Профиль", "Автомобиль", "Настройки поездок", "Туры", "Отзывы", "Настройки", "Биллинг", "Партнерская программа",],
            avatar: "",
            profile: this.props.storeState.profile,
            route: [
                "/account/driver/trips",
                "/account/driver/profile",
                "/account/driver/cars",
                "/account/driver/tripsSettings",
                "/account/driver/tours",
                "/account/driver/reviews",
                "/account/driver/settings",
                "/account/driver/billing",
                "/account/driver/referrals",
            ],
        }
    }
    shiftLeft = (event) => {

        event.currentTarget.parentElement.scrollLeft = event.currentTarget.offsetLeft - 120;
    }
    _handleImageChange = (e) => {
        e.preventDefault();
        

        let file = e.target.files[0];

        if (file.type.match('image')) {
            
            let reader = new FileReader();
            reader.onloadend = () => {
                function readCookie(name) {
                    var name_cook = name+"=";
                    var spl = document.cookie.split(";");           
                    for(var i=0; i<spl.length; i++) {           
                        var c = spl[i];               
                        while(c.charAt(0) == " ") {               
                            c = c.substring(1, c.length);                   
                        }               
                        if(c.indexOf(name_cook) == 0) {                   
                            return c.substring(name_cook.length, c.length);                    
                        }               
                    }           
                    return null;           
                }
                let jwt = readCookie('jwt');
                
                //
                if(jwt && jwt!=="-"){
                    var img = reader.result;
                    this.setState({ avatar: img });
                    var carForm = new FormData();
                    carForm.append('avatar', file);
                    const request = new XMLHttpRequest();
                    request.open('PUT', requests.userAvatarChangeRequest);
                    request.setRequestHeader('Authorization',`Bearer ${jwt}`);
                    request.send(carForm);
                }
            }
            reader.readAsDataURL(file);

        }
    }

    render() {

        if (!this.state.avatar) {
            let img = requests.serverAddress + this.state.profile.avatar.url
            this.setState({ avatar: img })
        }



        // console.log('profile');
        // console.log(profile);
        return (
            <React.Fragment>
                <div className="registrationWrapper driverBG col-12 p-0" style={{
                    "/account/driver/trips": { backgroundImage: "url(" + preHistoryBG + ")" },
                    // 1: { backgroundImage: "url(" + historyBG + ")" },
                    "/account/driver/profile": { backgroundImage: "url(" + sittingsBG + ")" },
                    "/account/driver/cars": { backgroundImage: "url(" + carBg + ")" },
                    "/account/driver/tripsSettings": { backgroundImage: "url(" + calendarBG + ")" },
                    "/account/driver/tours": { backgroundImage: "url(" + toursBG + ")" },
                    "/account/driver/reviews": { backgroundImage: "url(" + feedbackBG + ")" },
                    "/account/driver/settings": { backgroundImage: "url(" + sittingsBG + ")" },
                }[this.props.globalhistory.history.location.pathname]}>
                    <div className="basicInformationBodyTop d-flex align-items-center ">
                        <div className="basicInformationBodyTopImgHover">
                            <label className="basicInformationBodyTopImg" htmlFor="addFile">Обновить фотографию</label>
                            <img src={this.state.avatar} alt="imgPerson" />
                            <input type="file" id="addFile" style={{ display: "none" }} onChange={this._handleImageChange} />
                        </div>
                        <div className="bodyTopDriverInfo col-7">
                            <div className="bodyTopDriverInfoName d-flex flex-column align-items-start">
                                <p className="mb-0 mr-2">{this.state.profile.firstName.length!==0 ? this.state.profile.firstName : this.state.profile.email}</p>
                                <Stars value={this.state.profile.rating} valueDisplay={true} commentNumberDisplay={true} commentNumber={this.state.profile.comments.length + " отзывов"} />
                            </div>
                            <div className="bodyTopDriverInfoPlace">
                                <p>{this.state.profile.hometown.length!==0 ? (this.state.profile.hometown + ", " + this.state.profile.homecountry) : ""}</p>
                            </div>
                            <div className="bodyTopDriverInfoRide p-0 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column">
                                <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 p-0">
                                    <span>{this.state.profile.futureTrips.length + this.state.profile.historyTrips.length}</span>
                                    <div className="d-flex flex-column">
                                        <p>ВСЕГО </p>
                                        <p>ПОЕЗДОК</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center col-xl-3 col-lg-3 col-md-3 col-sm-5 col-9 p-0">
                                    <p>ВСЕГО ПОЕЗДОК:</p>
                                    <span className="pl-1">18</span>
                                </div>
                                <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 p-0">
                                    <span>{this.state.profile.futureTrips.length}</span>
                                    <div className="d-flex flex-column ">
                                        <p>ПРЕДСТОЯЩИЕ </p>
                                        <p>ПОЕЗДКИ</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center col-xl-3 col-lg-3 col-md-3 col-sm-5 col-12 p-0">
                                    <p>ПРЕДСТОЯЩИЕ ПОЕЗДКИ:</p>
                                    <span className="pl-1">8</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navigationBody d-flex align-items-center">
                        {this.state.navigationText.map((element, index) =>

                            <span className={{ [this.state.route[index]]: "navigationBodyActive", }[this.props.globalhistory.history.location.pathname] + " navigationButton mb-0 "} onClick={(event) => { this.props.dispatch(whichPageRender(index)); this.shiftLeft(event); this.props.globalhistory.history.push(this.state.route[index]) }}>{element}</span>

                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const DriverProfileNavigation = connect(
    (state) => ({
        storeState: state.DriverProfileRegistrationtReduser,
        globalhistory: state.GlobalReduser,
    }),
)(DriverProfileNavigationClass);

export default DriverProfileNavigation;