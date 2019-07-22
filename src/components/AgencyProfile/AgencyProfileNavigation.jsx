import React from 'react';
import { connect } from 'react-redux';
// import { whichPageRender } from "../../redusers/ActionAgencyProfileRegistration"
import Stars from '../stars/Stars'

import calendarBG from '../media/illustrations_calendar.svg'
import carBg from '../media/illustrations_nastroiki-01.svg'
import toursBG from '../media/illustrations_poezdki_tours.svg'
import billingBG from '../media/illustrations_billing.svg'
import referralsBG from '../media/illustrations_partners.svg'
import sittingsBG from '../media/illustrations_nastroiki-04.svg'
import feedbackBG from '../media/illustrations_otzivi.svg'
import preHistoryBG from '../media/illustrations_predstoishie.svg'

import { readAndCompressImage } from 'browser-image-resizer';
import requests from '../../config';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import { setUser } from '../../redusers/Action';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class AgencyProfileNavigationClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            navigationText: ["Мои поездки", "Профиль", "Водители", "Туры", "Отзывы", "Настройки", "Биллинг", "Партнерская программа"],
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
            isRefreshExist:false,
            isRefreshing: true,
            isGoodAnswer: true, 
            index: -1
        }

    }
    getProfileData=(thenFunc,catchFunc)=>{
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
            };
            getUserData(requestValues,thenFunc,catchFunc);
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
        console.log(this.props.profileReduser);
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
            isGoodAnswer: false
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 2000);
    }
    shiftLeft = (event) => {

        event.currentTarget.parentElement.scrollLeft = event.currentTarget.offsetLeft - 120;
    }
    _handleImageChange = (e) => {
        e.preventDefault();

        let file = e.target.files[0];

        if (file && file.type.match('image')) {
            let that = this; 
            this.startRefresher();

            readAndCompressImage(file, this.props.globalReduser.compressConfig)
            .then(resizedImage => {
            let sizFile = new File([resizedImage], file.name);
            return sizFile;
            })
            .then(sizFile => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    let jwt = this.props.globalReduser.readCookie('jwt');
                    if(jwt && jwt!=="-"){
                        var img = reader.result;                      
                        var carForm = new FormData();
                        carForm.append('avatar', sizFile);
                        const request = new XMLHttpRequest();
                        request.open('PUT', requests.userAvatarChangeRequest);
                        request.setRequestHeader('Authorization',`Bearer ${jwt}`);
                        request.onreadystatechange = function(){
                                                            
                            if(request.readyState === XMLHttpRequest.DONE && request.status === 200){ 
                                let responseText = JSON.parse(request.responseText);
                                let avatar = requests.serverAddress+responseText.avatar;
                                let date = new Date(Date.now()+1000*3600*24*60); 
                                cookies.set("avatarUrl",avatar, {path: '/', expires: date});
                                that.props.dispatch(setUser(that.props.AppReduser.userName, avatar));
                                that.thenFunc();                                                                                                                      
                            }
                            if(request.readyState === XMLHttpRequest.DONE && request.status === 0){
                                that.catchFunc();
                            }                      
                           
                           
                        }
                        request.send(carForm);
                    }
                    else{
                        this.props.dispatch(setUrlAddress(window.location.pathname));
                        this.props.history.push('/login');
                        //return null;
                    }
                }
                reader.readAsDataURL(sizFile)
            });
        }
    }
    render(){
        console.log('agency profile navigation render');
        console.log(this.props);
        console.log(this.state);
        let profile = this.props.globalReduser.profile;

        return(
            <React.Fragment>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer}/> 
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
                            <label className="basicInformationBodyTopImg" htmlFor="addFile">Обновить фотографию</label>
                            <img src={this.props.AppReduser.avatarUrl} alt="imgPerson" />
                            <input type="file" id="addFile" style={{ display: "none" }} onChange={this._handleImageChange} />
                        </div>
                        <div className="bodyTopDriverInfo col-8">
                            <div className="bodyTopDriverInfoName d-flex flex-column align-items-start" >
                                <p className="mb-0 mr-2">{profile.organizationName.length!==0 ? profile.organizationName : profile.email}</p>
                                <div style={{display: profile.comments.length>0 ? 'block':'none'}}>
                                    <Stars value={profile.rating} valueDisplay={true} commentNumberDisplay={true} commentNumber={profile.comments.length + " отзывов"} />
                                </div>              
                            </div>
                            <div className="bodyTopDriverInfoPlace">
                                <p>{profile.legalAddress.length!==0 ? (profile.legalAddress) : ""}</p>
                            </div>
                            <div className="bodyTopDriverInfoRide p-0 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column">
                                <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 p-0">
                                    <span>{profile.futureTrips.length + profile.historyTrips.length}</span>
                                    <div className="d-flex flex-column">
                                        <p>ВСЕГО </p>
                                        <p>ПОЕЗДОК</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center col-xl-3 col-lg-3 col-md-3 col-sm-5 col-9 p-0">
                                    <p>ВСЕГО ПОЕЗДОК:</p>
                                    <span className="pl-1">{profile.futureTrips.length + profile.historyTrips.length}</span>
                                </div>
                                <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 p-0">
                                    <span>{profile.agencyWorkers.length}</span>
                                    <div className="d-flex flex-column ">
                                        <p>ВСЕГО</p>
                                        <p>ВОДИТЕЛЕЙ</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center col-xl-3 col-lg-3 col-md-3 col-sm-5 col-12 p-0">
                                    <p>ВСЕГО ВОДИТЕЛЕЙ:</p>
                                    <span className="pl-1">{profile.agencyWorkers.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navigationBody d-flex align-items-center">
                        {this.state.navigationText.map((element, index) =>

                            <span className={{ [this.state.route[index]]: "navigationBodyActive", }[this.props.globalhistory.history.location.pathname] + " navigationButton mb-0 " + (this.state.route[index].length===0 ? "blockedSpan" : "")}
                            onClick={(event) => { if(this.state.route[index].length>0) {
                                this.setState({index: index});
                                //this.props.dispatch(whichPageRender(index));
                                this.shiftLeft(event);
                                this.props.globalhistory.history.push(this.state.route[index])
                            }
                            }}>{element}</span>
                        )}
                    </div>
                </div>
            </React.Fragment>
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