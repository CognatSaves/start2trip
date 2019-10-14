import React from 'react';
import './DriverProfileNavigation.css'
import { connect } from 'react-redux';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import getUserData from './DriverProfileRequest';


import calendarBG from '../media/illustrations_calendar.svg'
import carBg from '../media/illustrations_nastroiki-01.svg'
import billingBG from '../media/illustrations_billing.svg'
import referralsBG from '../media/illustrations_partners.svg'
import sittingsBG from '../media/illustrations_nastroiki-04.svg'
import feedbackBG from '../media/illustrations_otzivi.svg'
import preHistoryBG from '../media/illustrations_predstoishie.svg'

import AvatarEditorCustom from '../usefulСomponents/AvatarEditorCustom'
import Stars from '../stars/Stars'
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class DriverProfileNavigationClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

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

            index: this.props.globalReduser.pageRender,
            imgModal: false,

        };
    }
    getProfileData = (thenFunc, catchFunc) => {
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
            };
            getUserData(requestValues, thenFunc, catchFunc);
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }
    }
    startRefresher = () => {
        startRefresherGlobal(this)
    }
    thenFunc = () => {
        thenFuncGlobal(this)
    }
    catchFunc = () => {
        catchFuncGlobal(this)
    }
    shiftLeft = (event) => {

        event.currentTarget.parentElement.scrollLeft = event.currentTarget.offsetLeft - 120;
    }

    imgModalShow = () => {
        this.setState({ imgModal: !this.state.imgModal });
    };
    

    render() {


        let textPage = this.props.AppReduser.languageText.driverProfileRegistration.DriverProfileNavigation;
        let profile = this.props.globalReduser.profile;
        let navigationText = this.props.AppReduser.languageText.driverProfileRegistration.DriverProfileNavigation.navigationText;
        let that = this;
        return (
            <>
                <AvatarEditorCustom imgModalShow={this.imgModalShow} imgModal={this.state.imgModal} />
                <div className="registrationWrapper driverBG col-12 p-0" style={{
                    "/account/driver/trips": { backgroundImage: "url(" + preHistoryBG + ")" },
                    "/account/driver/profile": { backgroundImage: "url(" + sittingsBG + ")" },
                    "/account/driver/cars": { backgroundImage: "url(" + carBg + ")" },
                    "/account/driver/tripsSettings": { backgroundImage: "url(" + calendarBG + ")" },
                    "/account/driver/reviews": { backgroundImage: "url(" + feedbackBG + ")" },
                    "/account/driver/settings": { backgroundImage: "url(" + sittingsBG + ")" },
                    "/account/driver/billing": { backgroundImage: "url(" + billingBG + ")" },
                    "/account/driver/referrals": { backgroundImage: "url(" + referralsBG + ")" },
                }[this.props.globalhistory.history.location.pathname]}>
                    <div className="basicInformationBodyTop d-flex align-items-center ">
                        <div className="basicInformationBodyTopImgHover">
                            <label className="basicInformationBodyTopImg" onClick={() =>this.imgModalShow()}>{textPage.updatePhoto}</label>
                            <img src={this.props.AppReduser.avatarUrl} alt="imgPerson" />
                        </div>
                        <div className="bodyTopDriverInfo col-8">
                            <div className="bodyTopDriverInfoName d-flex flex-column align-items-start">
                                <p className="mb-0 mr-2">{profile.firstName.length !== 0 ? profile.firstName : profile.email}</p>
                                <Stars value={profile.rating} valueDisplay={true} commentNumberDisplay={true} commentNumber={profile.comments.length + " " + textPage.starsReviews} />
                            </div>
                            <div className="bodyTopDriverInfoPlace">
                                <p>{profile.hometown.length !== 0 ? (profile.hometown + ", " + profile.homecountry) : ""}</p>
                            </div>
                            <div className="bodyTopDriverInfoRide p-0 d-flex flex-md-row flex-column">
                                <div className="d-md-flex d-none align-items-center col-lg-3 col-md-4 col-6 p-0">
                                    <span>{profile.futureTrips.length + profile.historyTrips.length}</span>
                                    <div className="d-flex flex-column">
                                        <p>{textPage.totalTrips.first}</p>
                                        <p>{textPage.totalTrips.last}</p>
                                    </div>
                                </div>

                                <div className="d-md-flex d-none align-items-center col-lg-3 col-md-4 col-6 p-0">
                                    <span>{profile.futureTrips.length}</span>
                                    <div className="d-flex flex-column ">
                                        <p>{textPage.upcomingTrips.first}</p>
                                        <p>{textPage.upcomingTrips.last}</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail  d-md-none d-flex align-items-center justify-content-between col-md-3 col-sm-5 col-12 p-0">
                                    <p>{textPage.upcomingTrips.full}:</p>
                                    <span className="pl-1">{profile.futureTrips.length}</span>
                                </div>
                                <div className=" d-md-flex d-none align-items-center col-lg-3 col-md-4 col-6 p-0">
                                    <span>{profile.penalty !== null ? profile.penalty : 0}</span>
                                    <div className="d-flex flex-column">
                                        <p>{textPage.penalty.first}</p>
                                        <p>{textPage.penalty.last}</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail  d-md-none d-flex align-items-center justify-content-between col-md-3 col-sm-5 col-12 p-0">
                                    <p>{textPage.penalty.full + ':'}</p>
                                    <span className="pl-1">{profile.penalty !== null ? profile.penalty : 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navigationBody d-flex align-items-center">
                        {navigationText.map(function (element, index) {
                            if (!(profile.hostagency && index === navigationText.length - 1)) {
                                //плохое ограничение, но так как у нас оно одно, то и ладно
                                //оно запрещает партнёрскую программу для водителя, прикреплённого к агенству
                                return (
                                    <span key={that.state.route[index]} className={{ [that.state.route[index]]: "navigationBodyActive", }[that.props.globalhistory.history.location.pathname] + " navigationButton mb-0 " + (that.state.route[index].length === 0 ? "blockedSpan" : "")}
                                        onClick={(event) => {
                                            if (that.state.route[index].length > 0) {

                                                that.setState({ index: index });
                                                that.shiftLeft(event);
                                                that.props.globalhistory.history.push(that.state.route[index])
                                            }
                                        }}>{element}</span>
                                )
                            }
                            else {
                                return <React.Fragment />
                            }
                        }
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const DriverProfileNavigation = connect(
    (state) => ({
        globalhistory: state.GlobalReduser,
        globalReduser: state.GlobalReduser,
        AppReduser: state.AppReduser,
    }),
)(DriverProfileNavigationClass);

export default DriverProfileNavigation;