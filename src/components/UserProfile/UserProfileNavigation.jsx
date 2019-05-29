import React from 'react';
import './UserProfileNavigation.css'
import { connect } from 'react-redux';
import { whichPageRenderUser } from "../../redusers/ActionUserProfileRegistration"
import imgPerson from './img/person.jpg'
import Stars from '../stars/Stars'

import historyBG from './img/history.svg'
import sittingsBG from './img/user_settings.svg'
import preHistoryBG from './img/user_predstoiashie.svg'
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import { readAndCompressImage } from 'browser-image-resizer';
import { setUser } from '../../redusers/Action';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class UserProfileNavigationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationText: ["Мои поездки","Профиль","Настройки", "Биллинг", "Партнерская программа"],
            //avatar: imgPerson,
            profile: this.props.globalReduser.profile,
            route: [
                "",//"/account/user/trips",
                "/account/user/profile",
                "/account/user/settings",
                "",//"/account/user/billing",
                "/account/user/referrals"
            ],
            isRefreshExist:false,
            isRefreshing: true,
            isGoodAnswer: true,
        };
        this.getProfileData = this.getProfileData.bind(this);
        this.startRefresher = this.startRefresher.bind(this);
        this.thenFunc = this.thenFunc.bind(this);
        this.catchFunc = this.catchFunc.bind(this);
    }
    getProfileData(thenFunc,catchFunc){
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
    startRefresher(){
        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
    }   
    thenFunc(){
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
    catchFunc(){
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

    render() {
        // if (!this.state.avatar) {
        //     let img = requests.serverAddress + this.state.profile.avatar.url
        //     this.setState({ avatar: img })
        // }
        let textPage = this.props.globalReduser.languageText.DriverProfileNavigation;
        
        return (
            <div className="registrationWrapper driverBG col-12 p-0" style={{
                "/account/user/trips": { backgroundImage: "url(" + preHistoryBG + ")" },
                // "/account/user/profile": { backgroundImage: "url(" + historyBG + ")" },
                "/account/user/profile": { backgroundImage: "url(" + historyBG + ")" },
                "/account/user/settings": { backgroundImage: "url(" + sittingsBG + ")" },
            }[this.props.globalhistory.history.location.pathname]}>
                <div className="basicInformationBodyTop d-flex align-items-center ">
                    <div className="basicInformationBodyTopImgHover">
                        <label className="basicInformationBodyTopImg" htmlFor="addFile">{textPage.updatePhoto}</label>
                        <img src={this.props.AppReduser.avatarUrl} alt="imgPerson" />
                        <input type="file" id="addFile" style={{ display: "none" }} onChange={this._handleImageChange} />
                    </div>
                    <div className="bodyTopDriverInfo col-7">
                    
                        
                        <div className="bodyTopDriverInfoName d-flex flex-column align-items-start">
                            <p className="mb-0 mr-2">{this.state.profile.firstName.length!==0 ? this.state.profile.firstName : this.state.profile.email}</p>
                            {
                                /*
                                    <Stars value={this.state.profile.rating} valueDisplay={true} commentNumberDisplay={true} commentNumber={this.state.profile.comments.length + textPage.starsReviews} />
                        
                                */
                            }
                            </div>
                        
                    
                        
                        <div className="bodyTopDriverInfoPlace">
                            <p>{this.state.profile.hometown.length!==0 ? (this.state.profile.hometown + ", " + this.state.profile.homecountry) : ""}</p>
                        </div>
                        <div className="bodyTopDriverInfoRide p-0 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column">
                            <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 p-0">
                                <span>{this.state.profile.futureTrips.length + this.state.profile.historyTrips.length}</span>
                                <div className="d-flex flex-column">
                                    <p>{textPage.totalTrips.first}</p>
                                    <p>{textPage.totalTrips.last}</p>
                                </div>
                            </div>
                            <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center col-xl-3 col-lg-3 col-md-3 col-sm-5 col-9 p-0">
                                <p>{textPage.totalTrips.full}:</p>
                                <span className="pl-1">{this.state.profile.futureTrips.length + this.state.profile.historyTrips.length}</span>
                            </div>
                            <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 p-0">
                                <span>{this.state.profile.futureTrips.length}</span>
                                <div className="d-flex flex-column ">
                                    <p>{textPage.upcomingTrips.first}</p>
                                    <p>{textPage.upcomingTrips.last}</p>
                                </div>
                            </div>
                            <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center col-xl-3 col-lg-3 col-md-3 col-sm-5 col-12 p-0">
                                <p>{textPage.upcomingTrips.full}:</p>
                                <span className="pl-1">{this.state.profile.futureTrips.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="navigationBody d-flex align-items-center">
                    {this.state.navigationText.map((element, index) =>
                        <span className={{ [this.state.route[index]]: "navigationBodyActive", }[this.props.globalhistory.history.location.pathname] + " navigationButton mb-0 " + (this.state.route[index].length===0 ? "blockedSpan" : "")}
                        onClick={(event) => { 
                            if(this.state.route[index].length>0){ 
                                this.props.dispatch(whichPageRenderUser(index));
                                this.shiftLeft(event);
                                this.props.globalhistory.history.push(this.state.route[index]);
                            }
                        }
                        }>{element}</span>
                    )}
                </div>
            </div>
        );
    }
}

const UserProfileNavigation = connect(
    (state) => ({
        storeState: state.UserProfileRegistrationReduser,
        globalhistory: state.GlobalReduser,
        globalReduser: state.GlobalReduser,
        AppReduser: state.AppReduser,
    }),
)(UserProfileNavigationClass);

export default UserProfileNavigation;