import React from 'react';
import { connect } from 'react-redux';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';


import calendarBG from '../media/illustrations_calendar.svg'
import carBg from '../media/illustrations_nastroiki-01.svg'
import toursBG from '../media/illustrations_poezdki_tours.svg'
import billingBG from '../media/illustrations_billing.svg'
import referralsBG from '../media/illustrations_partners.svg'
import sittingsBG from '../media/illustrations_nastroiki-04.svg'
import feedbackBG from '../media/illustrations_otzivi.svg'
import preHistoryBG from '../media/illustrations_predstoishie.svg'

import AvatarEditorCustom from '../usefulСomponents/AvatarEditorCustom'
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class AgencyProfileNavigationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationText: ["Мои поездки", "Профиль", "Водители", "Туры", "Отзывы", "Настройки",
                "Биллинг", "Партнерская программа"],//используется для размерности, блоки - из переводов
            //profile: this.props.globalReduser.profile,
            route: [
                "/account/agency/trips",
                "/account/agency/profile",
                "/account/agency/drivers",
                "/account/agency/tours",
                "/account/agency/reviews",
                "/account/agency/settings",
                "/account/agency/billing",
                "/account/agency/referrals",
            ],
            index: -1,
            imgModal: false,
        }

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
        console.log('agency profile navigation render');
        console.log(this.props);
        console.log(this.state);
        let profile = this.props.globalReduser.profile;
        let textInfo = this.props.AppReduser.languageText.agencyProfile.agencyProfileNavigation;
        return (
            <>
                <AvatarEditorCustom imgModalShow={this.imgModalShow} imgModal={this.state.imgModal} />
                <div className="registrationWrapper driverBG col-12 p-0" style={{
                    "/account/agency/trips": { backgroundImage: "url(" + preHistoryBG + ")" },
                    // 1: { backgroundImage: "url(" + historyBG + ")" },
                    "/account/agency/profile": { backgroundImage: "url(" + sittingsBG + ")" },
                    "/account/agency/drivers": { backgroundImage: "url(" + carBg + ")" },
                    "/account/agency/tripsSettings": { backgroundImage: "url(" + calendarBG + ")" },
                    "/account/agency/tours": { backgroundImage: "url(" + toursBG + ")" },
                    "/account/agency/reviews": { backgroundImage: "url(" + feedbackBG + ")" },
                    "/account/agency/settings": { backgroundImage: "url(" + sittingsBG + ")" },
                    "/account/agency/billing": { backgroundImage: "url(" + billingBG + ")" },
                    "/account/agency/referrals": { backgroundImage: "url(" + referralsBG + ")" },
                }[this.props.globalhistory.history.location.pathname]}>
                    <div className="basicInformationBodyTop d-flex align-items-center ">
                        <div className="basicInformationBodyTopImgHover">
                            <label className="basicInformationBodyTopImg" onClick={()=>this.imgModalShow()} >{textInfo.updatePhoto}</label>
                            <img src={this.props.AppReduser.avatarUrl} alt="imgPerson" />
                        </div>
                        <div className="bodyTopDriverInfo col-8">
                            {
                                /*

                                <div className="bodyTopDriverInfoName d-flex flex-column align-items-start" >
                                    <p className="mb-0 mr-2">{profile.organizationName.length !== 0 ? profile.organizationName : profile.email}</p>
                                    <div style={{ display: profile.comments.length > 0 ? 'block' : 'none' }}>
                                        <Stars value={profile.rating} valueDisplay={true} commentNumberDisplay={true} commentNumber={profile.comments.length + " "+textInfo.starsReviews} />
                                    </div>
                                </div>

                                */
                            }
                            <div className="bodyTopDriverInfoName d-flex flex-column align-items-start" >
                                <p className="mb-0 mr-2">{profile.organizationName.length !== 0 ? profile.organizationName : profile.email}</p>
                            </div>
                            <div className="bodyTopDriverInfoPlace">
                                <p>{profile.legalAddress.length !== 0 ? (profile.legalAddress) : ""}</p>
                            </div>
                            <div className="bodyTopDriverInfoRide p-0 d-flex flex-md-row flex-column">
                                <div className="d-md-flex d-none align-items-center col-lg-3 col-md-4 col-6 p-0">
                                    <span>{profile.futureTrips.length + profile.historyTrips.length}</span>
                                    <div className="d-flex flex-column">
                                        <p>{textInfo.totalTrips.first}</p>
                                        <p>{textInfo.totalTrips.last}</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail d-md-none d-flex align-items-center col-md-3 col-sm-5 col-9 p-0">
                                    <p>{textInfo.totalTrips.full + ':'}</p>
                                    <span className="pl-1">{profile.futureTrips.length + profile.historyTrips.length}</span>
                                </div>
                                <div className="d-md-flex d-none align-items-center col-md-2 col-6 p-0">
                                    <span>{profile.agencyWorkers.length}</span>
                                    <div className="d-flex flex-column ">
                                        <p>{textInfo.totalDrivers.first}</p>
                                        <p>{textInfo.totalDrivers.last}</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail d-md-none d-flex align-items-center col-lg-3 col-md-3 col-sm-5 col-12 p-0">
                                    <p>{textInfo.totalDrivers.full + ':'}</p>
                                    <span className="pl-1">{profile.agencyWorkers.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navigationBody d-flex align-items-center">
                        {this.state.navigationText.map((element, index) =>

                            <span className={{ [this.state.route[index]]: "navigationBodyActive", }[this.props.globalhistory.history.location.pathname] + " navigationButton mb-0 " + (this.state.route[index].length === 0 ? "blockedSpan" : "")}
                                onClick={(event) => {
                                    if (this.state.route[index].length > 0) {
                                        this.setState({ index: index });
                                        this.shiftLeft(event);
                                        this.props.globalhistory.history.push(this.state.route[index])
                                    }
                                }}>{textInfo.navigationText[index]}</span>
                        )}
                    </div>
                </div>
            </>
        )
    }
}

const AgencyProfileNavigation = connect(
    (state) => ({
        storeState: state.AgencyProfileRegistrationReduser,
        globalhistory: state.GlobalReduser,
        globalReduser: state.GlobalReduser,
        AppReduser: state.AppReduser,
    }),
)(AgencyProfileNavigationClass);

export default AgencyProfileNavigation;