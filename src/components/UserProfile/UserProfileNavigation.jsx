import React from 'react';
import { connect } from 'react-redux';
import { setProfileData, setUrlAddress, whichPageRender } from "../../redusers/ActionGlobal"
import { readAndCompressImage } from 'browser-image-resizer';
import { setUser } from '../../redusers/Action';
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';

import billingBG from '../media/illustrations_billing.svg'
import referralsBG from '../media/illustrations_partners.svg'
import historyBG from '../media/history.svg'
import sittingsBG from '../media/user_settings.svg'
import preHistoryBG from '../media/user_predstoiashie.svg'

import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, } from '../../redusers/GlobalFunction'
import AvatarEditorCustom from '../usefulСomponents/AvatarEditorCustom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class UserProfileNavigationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationText: ["Мои поездки", "Профиль", "Настройки", "Биллинг", "Партнерская программа"],
            //avatar: imgPerson,
            route: [
                "/account/user/trips",
                "/account/user/profile",
                "/account/user/settings",
                "/account/user/billing",
                "/account/user/referrals"
            ],
            activePage: this.props.globalReduser.pageRender,
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
        startRefresherGlobal(this,true)
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
        // if (!this.state.avatar) {
        //     let img = requests.serverAddressImg + this.state.profile.avatar.url
        //     this.setState({ avatar: img })
        // }

        let textPage = this.props.storeState.languageTextMain.userProfile.userProfileNavigation;
        let profile = this.props.globalReduser.profile;
        return (
            <>
                <AvatarEditorCustom imgModalShow={this.imgModalShow} imgModal={this.state.imgModal} />
                <div className="registrationWrapper driverBG col-12 p-0" style={{
                    "/account/user/trips": { backgroundImage: "url(" + preHistoryBG + ")" },
                    // "/account/user/profile": { backgroundImage: "url(" + historyBG + ")" },
                    "/account/user/profile": { backgroundImage: "url(" + historyBG + ")" },
                    "/account/user/settings": { backgroundImage: "url(" + sittingsBG + ")" },
                    "/account/user/billing": { backgroundImage: "url(" + billingBG + ")" },
                    "/account/user/referrals": { backgroundImage: "url(" + referralsBG + ")" },
                }[this.props.globalhistory.history.location.pathname]}>
                    <div className="basicInformationBodyTop d-flex align-items-center ">
                        <div className="basicInformationBodyTopImgHover">
                            <label className="basicInformationBodyTopImg" onClick={() => this.imgModalShow()}>{textPage.updatePhoto}</label>
                            <img src={this.props.AppReduser.avatarUrl} alt="imgPerson" />

                        </div>
                        <div className="bodyTopDriverInfo col-8">

                            <div className="bodyTopDriverInfoName d-flex flex-column align-items-start">
                                <p className="mb-0 mr-2">{profile.firstName.length !== 0 ? profile.firstName : profile.email}</p>
                            </div>

                            <div className="bodyTopDriverInfoPlace">
                                <p>{profile.hometown.length !== 0 ? (profile.hometown + ", " + profile.homecountry) : ""}</p>
                            </div>
                            <div className="bodyTopDriverInfoRide p-0 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column">
                                <div className=" d-md-flex d-none align-items-center  col-lg-3 col-md-4  col-6 p-0">
                                    <span>{profile.futureTrips.length + profile.historyTrips.length}</span>
                                    <div className="d-flex flex-column">
                                        <p>{textPage.totalTrips.first}</p>
                                        <p>{textPage.totalTrips.last}</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail d-md-none d-flex align-items-center justify-content-between col-md-3 col-sm-5 col-12 p-0">
                                    <p>{textPage.totalTrips.full}:</p>
                                    <span className="pl-1">{profile.futureTrips.length + profile.historyTrips.length}</span>
                                </div>
                                <div className=" d-md-flex  d-none align-items-center  col-md-2  col-6 p-0">
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
                            </div>
                        </div>
                    </div>

                    <div className="navigationBody d-flex align-items-center">
                        {this.state.navigationText.map((element, index) =>
                            <span className={{ [this.state.route[index]]: "navigationBodyActive", }[this.props.globalhistory.history.location.pathname] + " navigationButton mb-0 " + (this.state.route[index].length === 0 ? "blockedSpan" : "")}
                                onClick={(event) => {
                                    if (this.state.route[index].length > 0) {
                                        this.props.dispatch(whichPageRender(index));
                                        this.shiftLeft(event);
                                        this.props.globalhistory.history.push(this.state.route[index]);
                                    }
                                    this.setState({ activePage: this.state.route[index] })
                                }
                                }>{textPage.navigationText[index]}</span>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const UserProfileNavigation = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalhistory: state.GlobalReduser,
        globalReduser: state.GlobalReduser,
        AppReduser: state.AppReduser,
    }),
)(UserProfileNavigationClass);

export default UserProfileNavigation;