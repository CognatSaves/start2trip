import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './RenderModalRegistration.css'
import emailIcon from './pictures/email.svg'
import lockIcon from './pictures/lock.svg'
import eyeIcon from './pictures/eye.svg'
import eyeOrange from './pictures/eyeOrange.svg';
import logoBlue from './pictures/logo_tripfer_blue.svg'
import logoWhite from './pictures/logo_tripfer_white.svg'
import axios from 'axios';
import requests from '../../config.js';
import ReactDOM from 'react-dom';
//import pageTextInfo from '../../textInfo/RenderModalRegistration';
import Cookies from 'universal-cookie';
import backpackIcon from './pictures/backpack.svg'
import dealIcon from './pictures/deal.svg'
import wheelIcon from './pictures/wheel.svg'
import { isMobileOnly } from 'react-device-detect'
import { setModalRegister, setActiveLang } from '../../redusers/Action';
const cookies = new Cookies();
const windowProps = "width=420,height=400,resizable=yes,scrollbars=yes,status=yes";

class RenderModalRegistrationClass extends React.Component {
    constructor(props) {
        super(props);
        console.log("renderModalRegistration constructor");
        let that = this;
        console.log(that.props);
        function setAnswerResult(type, data) {
            function clearLocalStorage(params) {
                for (let i = 0; i < params.length; i++) {
                    window.localStorage.removeItem(params[i]);
                }
            }
            function setRegWindow() {
                console.log('setRegWindow func');
                console.log(errorId);
                that.setState({
                    regAnswerStatus: true,
                    regProcessStatus: false,
                    selectedRegistrationAnswer: errorId
                });
            }
            //;
            let errorId = window.localStorage.getItem('errorId');
            if (type === 'good') {
                that.setState({
                    cookie: document.cookie
                });
                /*console.log("this is jwt");
                console.log(data.jwt);
                console.log("put it into one reduser");*/
                that.props.authorization();
                that.props.close();
            }
            if (type === 'bad') {
                /*console.log("all is failed");
                console.log("this is jwtstatus");
                console.log(data.jwtstatus);*/
            }
            setRegWindow();
            clearLocalStorage(['type', 'errorId']);
        }
        function sendResultLocal(type, data) {
            console.log('sendResult');
            let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
            if (type) {
                
                cookies.set("jwt", data.jwt, { path: '/', expires: date });
                cookies.set("jwtstatus", "correct", { path: '/', expires: date });

                window.localStorage.setItem('errorId', 0);

                cookies.set("avatarUrl", requests.serverAddress + data.user.avatarUrl, { path: '/', expires: date });
                cookies.set("userName", data.user.userName, { path: '/', expires: date });
                cookies.set("userType", data.user.userType, { path: '/', expires: date })
                setAnswerResult('good', { jwt: data.jwt });
            }
            else {
                console.log("Не смогли!");
                console.log('error message');
                console.log(data.error);
                console.log(data.error.errorId);
                cookies.set("jwt", "-", { path: '/', expires: date });
                cookies.set("jwtstatus", data.error, { path: '/', expires: date });

                if (data.error) {
                    if (data.error.errorId) {
                        window.localStorage.setItem('errorId', data.error.errorId);
                    }
                }
                let status = that.props.globalReduser.readCookie("jwtstatus");
                setAnswerResult('bad', { jwtstatus: status });
            }
            that.setState({
                cookie: document.cookie
            })
            //
        }
        function socialWebRegistrationRequest(body) {
            console.log("registration");

            fetch(requests.serverRegistrationRequest, {
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
                        console.log("good");
                        console.log(data);
                        that.state.sendResultLocal(true, { jwt: data.jwt, user: data.user });
                    }
                })
                .catch(function (error) {
                    console.log("bad");
                    console.log('An error occurred:', error);
                    that.state.sendResultLocal(false, { error: error });
                });
        }
        function socialWebAuthorizationRequest(body) {
            fetch(requests.serverAuthorizationRequest, {
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
                        console.log("good");
                        console.log(data);
                        that.state.sendResultLocal(true, { jwt: data.jwt, user: data.user });
                    }
                })
                .catch(function (error) {
                    console.log('An error occurred:', error);
                    that.state.sendResultLocal(false, { error: error });
                });
        }
        function checkCookie(newWin) {
            console.log('check cookie call');
            var timer = setInterval(() => {
                if (newWin.window === null) {
                    alert("window closed");
                    clearInterval(timer);
                }
                if (that.state.cookie !== document.cookie) {
                    console.log("get good answer");
                    clearInterval(timer);
                    let jwt = that.props.globalReduser.readCookie("jwt");
                    let jwtstatus = that.props.globalReduser.readCookie("jwtstatus");
                    //console.log(jwt);
                    if (jwt !== "-" && jwtstatus === "correct") {
                        setAnswerResult('good', { jwt: jwt });
                    }
                    else {
                        setAnswerResult('bad', { jwtstatus: jwtstatus });
                    }
                }
                console.log('wait');
            }, 500);

        }
        function getQueryParam(param) {
            var queries = window.location.search, regex, resRegex, results, response;
            param = encodeURIComponent(param);
            regex = new RegExp('[\\?&]' + param + '=([^&#]*)', 'g');
            resRegex = new RegExp('(.*)=([^&#]*)');
            results = queries.match(regex);

            if (!results) {
                return '';
            }
            response = results.map(function (result) {
                var parsed = resRegex.exec(result);

                if (!parsed) {
                    return '';
                }

                return parsed[2].match(/(^\d+$)/) ? Number(parsed[2]) : parsed[2];
            })

            return response.length > 1 ? response : response[0];
        };

        let agency = getQueryParam('agency');

        this.state = {
            sitingIn: true,
            sitingInLightAnimation: "",
            registrationDarkAnimation: "",
            passwordType: true,
            logoIconActive: true,
            languageTextActive: true,
            languageValue: 0,
            languageVariants: ["ru", "en"],
            isAuthenticated: false,
            user: null,
            token: '',
            socialWebRegistrationRequest: socialWebRegistrationRequest,
            socialWebAuthorizationRequest: socialWebAuthorizationRequest,
            sendResultLocal: sendResultLocal,
            regAnswerStatus: false,
            regProcessStatus: false,
            isError:false,
            selectedRegistrationAnswer: 3,
            regWindowType: 0,
            userType: 0,
            cookie: document.cookie,
            checkCookie: checkCookie,
            socialWindow: "",
            agency: agency,
            email: "",
            password: ""
        };
        let urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('access_token');
        console.log("requests string");
        console.log(requests);
    }
    logout = () => {
        this.setState({ isAuthenticated: false, token: '', user: null })
    };
    onFailure = (error) => {
        alert(error);
    }

    changeAnimation() {
        if (this.state.sitingIn) {
            this.setState({
                sitingInLightAnimation: "sitingInLightAnimationLeft",
                registrationDarkAnimation: "registrationDarkAnimationLeft",
            });
            setTimeout(() => {
                this.setState({
                    sitingIn: !this.state.sitingIn,
                })
            }, 400)
            setTimeout(() => {
                this.setState({
                    logoIconActive: !this.state.logoIconActive,
                })
            }, 700)
            setTimeout(() => {
                this.setState({
                    languageTextActive: !this.state.languageTextActive,
                })
            }, 100)

        } else {
            this.setState({
                sitingInLightAnimation: "sitingInLightAnimationRight",
                registrationDarkAnimation: "registrationDarkAnimationRight",
            });
            setTimeout(() => {
                this.setState({
                    sitingIn: !this.state.sitingIn,
                })
            }, 300)
            setTimeout(() => {
                this.setState({
                    logoIconActive: !this.state.logoIconActive,
                })
            }, 100)
            setTimeout(() => {
                this.setState({
                    languageTextActive: !this.state.languageTextActive,
                })
            }, 700)
        }
    }
    changeLanguageValue(index) {
        this.setState({
            languageValue: index
        })
    }
    changeInput(value, index) {
        let userData = [...this.state.userData];
        userData[index] = value;
        this.setState({
            userData: userData
        })
    }
    sendRegistrationRequest(type) {
        
        let partner = cookies.get('partner');
        
        let email = this.state.email;
        let password = this.state.password;
        if (!type) {//в случае регистрации

            this.setState({
                regAnswerStatus: false,
                regProcessStatus: true
            });
            console.log("Send Request");
            
            let body = JSON.stringify({
                username: email,
                email: email,
                password: password,
                isCustomer: this.state.userType === 1 ? true : false,
                isDriver: this.state.userType === 2 ? true : false,
                isAgency: this.state.userType === 3 ? true : false,
                provider: 'local',
                partner: this.state.agency.length > 0 ? "" : partner,
                agency: this.state.agency
            });
            console.log(body);
            this.state.socialWebRegistrationRequest(body);
        }
        else {//в случае авторизации            
            console.log("try to log in");
            console.log("Send request");
            console.log("body:");
            let body = JSON.stringify({
                identifier: email,
                password: password,
            });
            this.state.socialWebAuthorizationRequest(body);
        }
    }

    render() {
        function sendRequestFunc(that, address) {
            cookies.set("jwt", "-", { path: '/', expires: new Date(0) });
            cookies.set("jwtstatus", "correct", { path: '/', expires: new Date(0) });
            that.setState({
                cookie: document.cookie
            });
            
            window.localStorage.setItem('type', that.state.sitingIn ? "Authorization" : "Registration");
            window.localStorage.setItem('userType', that.state.sitingIn ? 0 : that.state.userType);
            window.localStorage.setItem('agency', that.state.agency);
            let newWin = window.open(address, that.state.sitingIn ? "Authorization" : "Registration", windowProps);
            newWin.localStorage.setItem('type', that.state.sitingIn ? "Authorization" : "Registration");
            newWin.localStorage.setItem('userType', that.state.sitingIn ? 0 : that.state.userType);
            newWin.localStorage.setItem('agency', that.state.agency);
            
            that.state.checkCookie(newWin);
        }
        //let lang = this.state.languageValue;
        /*console.log("Render modal registration window");
        console.log(pageTextInfo.registrationAnswer);
        console.log('this.state.selectedRegistrationAnswer');
        console.log(this.state.selectedRegistrationAnswer);*/
        //console.log('pageTextInfo');
        //console.log(pageTextInfo);
        //console.log(pageTextInfo.registrationDarkBackgroundText.mobailText[lang]);
        //console.log(pageTextInfo.sitingInLightBackgroundText.mobailText[lang]);
        

        let textInfo = this.props.storeState.languageTextMain.renderModalRegistration;
        let selectedRegistrationAnswer = this.state.selectedRegistrationAnswer;
        let massIcon = [backpackIcon, wheelIcon, dealIcon];
        let regAnswerVisibility = (this.state.regAnswerStatus || this.state.regProcessStatus);
        let regAnswerColor = (this.state.regAnswerStatus && selectedRegistrationAnswer !== 0);
        let regAnswerValue = (this.state.regAnswerStatus ? textInfo.registrationAnswer[selectedRegistrationAnswer] : textInfo.registrationProcess[0]);
        return (
            <React.Fragment>

                    <div className="d-md-none d-flex">
                        <img className="registrationBodyLogoIcon" src={logoBlue} alt="logo" width="100px" height="20px" />
                        <div className="registrationBodyLanguageBlock d-flex" >
                            {
                                this.props.storeState.languages.map((element, index) =>
                                    <div className={
                                        index === this.props.storeState.activeLanguageNumber ? "registrationBodyLanguageBlock_element_dark registrationBodyLanguageBlock_element_selected" : "registrationBodyLanguageBlock_element_dark"
                                    } onClick={() => this.props.dispatch(setActiveLang(index))} key={element.ISO + "/" + index}>
                                        {element.ISO}
                                    </div>
                                )
                            }
                        </div>
                        <div className="mobailsitingInLight d-flex flex-column justify-content-center align-items-center ">
                            <h3>{this.state.sitingIn ? textInfo.sitingInLightBackgroundText.titleSitingIn : textInfo.registrationLightBackgroundText.registrationTitle}</h3>
                            <div style={{ display: this.state.sitingIn || this.state.regWindowType === 1 ? 'block' : 'none' }}>
                                <p className="mb-0" style={{ textAlign: "center" }}>{textInfo.sitingInLightBackgroundText.sitingInFirstText}</p>
                                <div className="iconBlok d-flex align-content-center">
                                    <div target="windowName" className="socialIcon facebookIcon" style={{ marginLeft: "auto" }}
                                        onClick={() => {
                                            console.log("REQUEST ADDRESS");
                                            console.log(requests.facebookRequest);
                                            sendRequestFunc(this, requests.facebookRequest);
                                        }}
                                    />
                                    <div target="windowName" className="socialIcon googleIcon" style={{ marginRight: "auto" }}
                                        onClick={() => {
                                            console.log("REQUEST ADDRESS");
                                            console.log(requests.googleRequest);
                                            sendRequestFunc(this, requests.googleRequest);
                                        }}
                                    />
                                    {
                                        /*
                                            <div className="socialIcon twitterIcon" style={{marginRight: "auto"}}></div>  
                                        */
                                    }
                                </div>
                                <p className="mb-1" >{this.state.sitingIn ? textInfo.sitingInLightBackgroundText.sitingInSecondText : textInfo.registrationLightBackgroundText.registrationSecondText}</p>
                                <form id="regForm" onSubmit={(e) => {   e.preventDefault(); this.sendRegistrationRequest(this.state.sitingIn) }}>
                                    <div className="inputIcon">
                                        <img className="emailIcon" src={emailIcon} alt="emailIcon" width='13px' height='12px' />
                                        <input onFocus={() => { this.setState({ regAnswerStatus: false, regProcessStatus: false }) }} className="mobailsitingInLightInput"
                                        type="email" pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$"
                                        placeholder={textInfo.sitingInLightBackgroundText.secondInputPlaceholderText} required
                                        value = {this.state.email} onChange={(e)=>this.setState({email: e.target.value})} />
                                    </div>
                                    <div className="inputIcon">
                                        <img className="lockIcon" src={lockIcon} alt="lockIcon" width='12px' height='12px' />
                                        <input onFocus={() => { this.setState({  regAnswerStatus: false, regProcessStatus: false }) }} className="mobailsitingInLightInput"
                                        type={this.state.passwordType ? "password" : "text"} placeholder={textInfo.registrationLightBackgroundText.thirdInputPlaceholderText}
                                        required  value = {this.state.password} onChange={(e)=>this.setState({password: e.target.value})}/>
                                        <img className="eyeIcon" src={this.state.passwordType ? eyeIcon : eyeOrange} alt="eyeIcon" width='15px' height='15px' onClick={()=>this.setState({passwordType: !this.state.passwordType})}/>
                                    </div>
                                    <div className="registrationAnswerText" style={{ visibility: regAnswerVisibility ? 'visible' : 'hidden', color: regAnswerColor ? 'red' : 'green' }}>{regAnswerValue}</div>

                                    <Link onClick={()=>this.props.dispatch(setModalRegister(false))} className="forgotPasswordLink"
                                     style={{ display: this.state.sitingIn ? "block" : "none" }} to="/forgot-password">{textInfo.sitingInLightBackgroundText.linkText}</Link>

                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="returnButton" style={{ display: !this.state.sitingIn ? 'block' : 'none' }} onClick={() => this.setState({ regWindowType: 0 })}>{textInfo.registrationUserType.buttonReturn}</div>
                                        <button disabled={this.state.regProcessStatus || this.state.regAnswerStatus} type="submit" htmlFor="regForm">{this.state.sitingIn ? textInfo.sitingInLightBackgroundText.buttonText : textInfo.registrationDarkBackgroundText.buttonText}</button>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center registrationCheckMenuBt">
                                    <p>{this.state.sitingIn ? textInfo.registrationDarkBackgroundText.mobailText:textInfo.sitingInLightBackgroundText.mobailText}</p>
                                 <span onClick={() => {  this.setState({
                                        sitingIn: !this.state.sitingIn,
                                        logoIconActive: !this.state.logoIconActive,
                                        languageTextActive: !this.state.languageTextActive,
                                    }) }}>{this.state.sitingIn ? textInfo.registrationDarkBackgroundText.mobailbuttonText : textInfo.sitingInLightBackgroundText.mobailbuttonText}</span>
                                    
                            </div>
                                </form>
                            </div>
                            <div className=" flex-column" style={{ display: !this.state.sitingIn && this.state.regWindowType === 0 ? 'flex' : 'none' }}>
                                <p style={{ textAlign: "center" }}>{textInfo.registrationUserType.userTypeText}</p>
                                <p style={{ textAlign: "center",color:"#e81123" }}>{this.state.isError?textInfo.registrationUserType.userTypeTextError:""}</p>
                                {
                                    textInfo.registrationUserType.userTypes.map((element, index) =>

                                        <div className={index ? "selectTypeBlockLine selectTypeBlock d-flex align-items-center" : "selectTypeBlock d-flex align-items-center "} style={{ visibility: (this.state.agency.length === 0 || index === 1) ? 'visible' : 'hidden' }}>
                                            <i style={{ background: "url(" + massIcon[index] + ") no-repeat" }} />
                                            <label className="typeCheckLabel" for={"typeCheckbox" + (index + 4)}>{element.userText}</label>
                                            <input disabled={!(this.state.agency.length === 0 || index === 1)} className="typeCheckButton" id={"typeCheckbox" + (index + 4)} type="radio" name="raz" onClick={() => this.setState({ userType: index + 1 , isError: false})} />
                                        </div>
                                    )
                                }
                                <button onClick={() => this.state.userType === 0 ? this.setState({ isError: true}) : this.setState({ regWindowType: 1 , isError: true})}>{textInfo.registrationUserType.buttonNext}</button>
                                <div className="d-flex justify-content-center align-items-center registrationCheckMenuBt">
                                <p>{this.state.sitingIn ? textInfo.registrationDarkBackgroundText.mobailText:textInfo.sitingInLightBackgroundText.mobailText}</p>
                                 <span onClick={() => {  this.setState({
                                        sitingIn: !this.state.sitingIn,
                                        logoIconActive: !this.state.logoIconActive,
                                        languageTextActive: !this.state.languageTextActive,
                                    }) }}>{this.state.sitingIn ? textInfo.registrationDarkBackgroundText.mobailbuttonText : textInfo.sitingInLightBackgroundText.mobailbuttonText}</span>
                                    
                            </div>
                            </div>
                        </div>
                    </div>




                    <div className="registrationBody d-md-flex d-none">
                        <img className="registrationBodyLogoIcon" src={this.state.logoIconActive ? logoBlue : logoWhite} alt="logo" width="100px" height="20px" />
                        <div className="registrationBodyLanguageBlock d-flex" >
                            {
                                this.state.languageVariants.map((element, index) =>
                                    <div className={
                                        (this.state.languageTextActive ?
                                            (index === this.props.storeState.activeLanguageNumber ? "registrationBodyLanguageBlock_element_light registrationBodyLanguageBlock_element_selected" : "registrationBodyLanguageBlock_element_light") :
                                            (index === this.props.storeState.activeLanguageNumber ? "registrationBodyLanguageBlock_element_dark registrationBodyLanguageBlock_element_selected" : "registrationBodyLanguageBlock_element_dark")
                                        )} onClick={() => this.props.dispatch(setActiveLang(index))} key={element + "/" + index}>
                                        {element}
                                    </div>
                                )
                            }
                        </div>
                        <div className={"sitingInLight d-flex flex-column justify-content-center align-items-center " + this.state.sitingInLightAnimation}>
                            <h3>{this.state.sitingIn ? textInfo.sitingInLightBackgroundText.titleSitingIn : textInfo.registrationLightBackgroundText.registrationTitle}</h3>
                            <div style={{ display: this.state.sitingIn || this.state.regWindowType === 1 ? 'block' : 'none' }}>
                                <p className="mb-0" style={{ textAlign: "center" }}>{textInfo.sitingInLightBackgroundText.sitingInFirstText}</p>
                                <div className="iconBlok d-flex align-content-center">
                                    <div target="windowName" className="socialIcon facebookIcon" style={{ marginLeft: "auto" }}
                                        onClick={() => {
                                            console.log("REQUEST ADDRESS");
                                            console.log(requests.facebookRequest);
                                            sendRequestFunc(this, requests.facebookRequest);
                                        }}
                                    />
                                    <div target="windowName" className="socialIcon googleIcon" style={{ marginRight: "auto" }}
                                        onClick={() => {
                                            console.log("REQUEST ADDRESS");
                                            console.log(requests.googleRequest);
                                            sendRequestFunc(this, requests.googleRequest);
                                        }}
                                    />
                                </div>
                                <p className="mb-1" >{this.state.sitingIn ? textInfo.sitingInLightBackgroundText.sitingInSecondText : textInfo.registrationLightBackgroundText.registrationSecondText}</p>
                                <form id="regForm" onSubmit={(e) => { e.preventDefault(); this.sendRegistrationRequest(this.state.sitingIn) }}>
                                    <div className="inputIcon">
                                        <img className="emailIcon" src={emailIcon} alt="emailIcon" width='13px' height='12px' />
                                        <input onFocus={() => { this.setState({ regAnswerStatus: false, regProcessStatus: false }) }} className="sitingInLightInput"
                                        type="email" pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$"
                                        placeholder={textInfo.sitingInLightBackgroundText.secondInputPlaceholderText}
                                        required  value = {this.state.email} onChange={(e)=>this.setState({email: e.target.value})}/>
                                    </div>
                                    <div className="inputIcon">
                                        <img className="lockIcon" src={lockIcon} alt="lockIcon" width='12px' height='12px' />
                                        <input onFocus={() => { this.setState({ regAnswerStatus: false, regProcessStatus: false }) }} className="sitingInLightInput" 
                                        type={this.state.passwordType ? "password" : "text"} placeholder={textInfo.registrationLightBackgroundText.thirdInputPlaceholderText}
                                        required value = {this.state.password} onChange={(e)=>this.setState({password: e.target.value})}/>
                                        <img className="eyeIcon" src={this.state.passwordType ? eyeIcon : eyeOrange} alt="eyeIcon" width='15px' height='15px' onClick={()=>this.setState({passwordType: !this.state.passwordType})}/>
                                    </div>
                                    <div className="registrationAnswerText" style={{ visibility: regAnswerVisibility ? 'visible' : 'hidden', color: regAnswerColor ? 'red' : 'green' }}>{regAnswerValue}</div>
                                    <Link onClick={()=>this.props.dispatch(setModalRegister(false))} className="forgotPasswordLink" style={{ display: this.state.sitingIn ? "block" : "none" }} to="/forgot-password">{textInfo.sitingInLightBackgroundText.linkText}</Link>
                                    <div className="d-flex justify-content-center align-items-end">
                                        <div className="returnButton pr-5" style={{ display: !this.state.sitingIn ? 'block' : 'none' }} onClick={() => this.setState({ regWindowType: 0 })}>{textInfo.registrationUserType.buttonReturn}</div>
                                        <button disabled={this.state.regProcessStatus || this.state.regAnswerStatus} type="submit" htmlFor="regForm">{this.state.sitingIn ? textInfo.sitingInLightBackgroundText.buttonText : textInfo.registrationDarkBackgroundText.buttonText}</button>
                                    </div>
                                </form>
                            </div>
                            <div className="justify-content-center flex-column" style={{ display: !this.state.sitingIn && this.state.regWindowType === 0 ? 'flex' : 'none' }}>
                                <p style={{ textAlign: "center" }}>{textInfo.registrationUserType.userTypeText}</p>
                                {
                                    textInfo.registrationUserType.userTypes.map((element, index) =>

                                        <div className={index ? "selectTypeBlockLine selectTypeBlock d-flex align-items-center" : "selectTypeBlock d-flex align-items-center "} style={{ visibility: (this.state.agency.length === 0 || index === 1) ? 'visible' : 'hidden' }}>
                                            <i style={{ background: "url(" + massIcon[index] + ") no-repeat" }} />
                                            <label className="typeCheckLabel" for={"typeCheckbox" + (index + 1)}>{element.userText}</label>
                                            <input disabled={!(this.state.agency.length === 0 || index === 1)} className="typeCheckButton" id={"typeCheckbox" + (index + 1)} type="radio" name="raz" onClick={() => this.setState({ userType: index + 1 })} />
                                        </div>
                                    )
                                }
                                <button onClick={() => this.state.userType === 0 ? {} : this.setState({ regWindowType: 1 })}>{textInfo.registrationUserType.buttonNext}</button>
                            </div>
                        </div>
                        <div className={"registrationDark d-flex flex-column justify-content-center align-items-center " + this.state.registrationDarkAnimation}>
                            <h3>{this.state.sitingIn ? textInfo.registrationDarkBackgroundText.registrationTitle : textInfo.sitingInDarkBackgroundText.titleSitingIn}</h3>
                            <p className="mb-0">{this.state.sitingIn ? textInfo.registrationDarkBackgroundText.registrationFirstText : textInfo.sitingInDarkBackgroundText.sitingInFirstText}</p>
                            <p>{this.state.sitingIn ? textInfo.registrationDarkBackgroundText.registrationSecondText : textInfo.sitingInDarkBackgroundText.sitingInSecondText}</p>
                            <button onClick={() => { this.changeAnimation() }}>{this.state.sitingIn ? textInfo.registrationDarkBackgroundText.buttonText : textInfo.sitingInDarkBackgroundText.buttonText}</button>
                        </div>
                    </div>
            </React.Fragment>
        )
    }

}

const RenderModalRegistration = connect(
    (state) => ({
        globalReduser: state.GlobalReduser,
        storeState: state.AppReduser,
    }),
)(RenderModalRegistrationClass);

export default RenderModalRegistration;
