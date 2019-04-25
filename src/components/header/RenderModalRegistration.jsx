import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './RenderModalRegistration.css'
import emailIcon from './pictures/email.svg'
import lockIcon from './pictures/lock.svg'
import eyeIcon from './pictures/eye.svg'
import logoBlue from './pictures/logo_tripfer_blue.svg'
import logoWhite from './pictures/logo_tripfer_white.svg'
import axios from 'axios';
import requests from '../../config.js';
import ReactDOM from 'react-dom';
import pageTextInfo from '../../textInfo/RenderModalRegistration';
const windowProps = "width=420,height=400,resizable=yes,scrollbars=yes,status=yes";
class RenderModalRegistrationClass extends React.Component {
    constructor(props) {
        super(props);
        console.log("renderModalRegistration constructor");
        let that = this;
        console.log(that.props);
        function setAnswerResult(type,data){
            function clearLocalStorage(params){
                for(let i=0; i<params.length;i++){
                    window.localStorage.removeItem(params[i]);
                }
            }
            function setRegWindow(){
                console.log('setRegWindow func');
                that.setState({
                    regAnswerStatus: true,
                    selectedRegistrationAnswer: errorId
                });
            }
            //debugger;
            let errorId = window.localStorage.getItem('errorId');
            if(type==='good'){
                that.setState({
                    cookie: document.cookie
                });
                /*console.log("this is jwt");
                console.log(data.jwt);
                console.log("put it into one reduser");*/
                that.props.authorization();
                that.props.close();
            }
            if(type==='bad'){
                /*console.log("all is failed");
                console.log("this is jwtstatus");
                console.log(data.jwtstatus);*/
            }
            setRegWindow();
            clearLocalStorage(['type','errorId']);
        }
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
        function sendResultLocal(type,data){
            console.log('sendResult');
            let date = new Date(Date.now()+1000*3600*24*60); 
            if(type){                
                let jwtstring = "jwt="+data.jwt+"; expires="+date.toString();
                let jwtstatus = "jwtstatus=correct; expires="+date.toString();
                document.cookie=jwtstring;
                document.cookie=jwtstatus;
                window.localStorage.setItem('errorId',0);
                //let jwt = readCookie("jwt");
                let avatarString="avatarUrl="+requests.serverAddress+data.user.avatarUrl+"; expires="+date.toString();
                let usernameString = "userName="+data.user.userName+"; expires="+date.toString();
                document.cookie=avatarString;
                document.cookie=usernameString;
                setAnswerResult('good',{jwt: data.jwt});  
            }
            else{
                console.log("Не смогли!");
                console.log('error message');
                console.log(data.error);
                let jwtstring = "jwt=-; expires="+date.toString();
                let jwtstatus = "jwtstatus="+data.error+"; expires="+date.toString();
                if(data.error){
                    if(data.error.errorId){
                        window.localStorage.setItem('errorId', data.error.errorId);
                    }
                } 
                document.cookie=jwtstring;
                document.cookie=jwtstatus;
                let status=readCookie("jwtstatus");
                setAnswerResult('bad',{jwtstatus:status});
            }
            that.setState({
                cookie:document.cookie
            })
            //
        }
        function socialWebRegistrationRequest(body){
            console.log("registration");
            fetch(requests.serverRegistrationRequest, {method: 'POST',body:body,
                headers:{'content-type': 'application/json'}})
                .then(response => {
                    return response.json();
                })
                .then(function (data) {
                    
                    if(data.error){
                        console.log("bad");
                        throw data.error;
                    }
                    else{
                        console.log("good");         
                        console.log(data);
                        that.state.sendResultLocal(true, {jwt:data.jwt, user: data.user});
                    }
                    /*that.setState({
                        regAnswerStatus:true,
                        selectedRegistrationAnswer:0
                    })*/
                })
                .catch(function(error) {
                    console.log("bad");
                    console.log('An error occurred:', error);
                    that.state.sendResultLocal(false,{error: error});
                });
        }
        function socialWebAuthorizationRequest(body){
            fetch(requests.serverAuthorizationRequest, {method: 'POST',body:body,
            headers:{'content-type': 'application/json'}})
            .then(response => {
                return response.json();
            })
            .then(function (data) { 
                if(data.error){
                    console.log("bad");
                    throw data.error;
                }
                else{
                    console.log("good");        
                    console.log(data);
                    that.state.sendResultLocal(true, {jwt:data.jwt, user: data.user});
                }
            })
            .catch(function(error) {
                console.log('An error occurred:', error);
                that.state.sendResultLocal(false,{error: error});
            });
            //console.log(body);
        }
        function checkCookie(newWin){
            console.log('check cookie call');
            console.log(window);
            //let i=0;
            var timer = setInterval(()=>{
               // i++;
                /*if(i%10===0){
                    console.log(newWin);
                }*/
                if(newWin.window===null){
                    alert("window closed");
                    clearInterval(timer);
                }
                if(that.state.cookie!==document.cookie){
                    /*alert("smth new is here");
                    console.log("check cookie");
                    console.log(that.state.cookie);
                    console.log(document.cookie);*/
                    console.log("get good answer");
                    clearInterval(timer);
                    let jwt = readCookie("jwt");
                    let jwtstatus=readCookie("jwtstatus");
                    //console.log(jwt);
                    if(jwt!=="-"&&jwtstatus==="correct"){
                        setAnswerResult('good',{jwt: jwt});
                    }
                    else{
                        setAnswerResult('bad',{jwtstatus: jwtstatus});
                    }                
                }
                console.log('wait');        
            },500);
            
        }
        this.state = {
            sitingIn: true,
            sitingInLightAnimation: "",
            registrationDarkAnimation: "",
            passwordType:true,
            logoIconActive:true,
            languageTextActive: true,
            languageValue: 0,
            languageVariants: ["ru", "en"],
            isAuthenticated: false,
            user: null,
            token: '',
            socialWebRegistrationRequest: socialWebRegistrationRequest,
            socialWebAuthorizationRequest: socialWebAuthorizationRequest,
            sendResultLocal:sendResultLocal,
            regAnswerStatus: false,
            selectedRegistrationAnswer: 3,
            regWindowType: 0,
            userType: 0,
            cookie: document.cookie,
            checkCookie: checkCookie,
            socialWindow: "",
        };
        let urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('access_token');
        console.log("requests string");
        console.log(requests);
    }
    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
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
    changeLanguageValue(index){
        this.setState({
            languageValue: index
        })
    }
    changeInput(value,index){
        let userData = [...this.state.userData];
        userData[index]=value;
        this.setState({
            userData: userData
        })
    }
    sendRegistrationRequest(type){
        if(!type){//в случае регистрации
            this.setState({
                regAnswerStatus:true,
                selectedRegistrationAnswer:3
            });
            console.log("Send Request");
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let body = JSON.stringify({
                username: email,
                email: email,
                password: password,
                isCustomer: this.state.userType===1 ? true : false,
                isDriver: this.state.userType===2 ? true : false,                         
                isAgency: this.state.userType===3 ? true : false,
                provider: 'local',
                });
            console.log(body);
            this.state.socialWebRegistrationRequest(body);
        }
        else{//в случае авторизации            
            console.log("try to log in");
            console.log("Send request");
            console.log("body:");
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let body = JSON.stringify({
                identifier: email,
                password: password,
            });
            this.state.socialWebAuthorizationRequest(body);
        }
    }
    render() {
        function sendRequestFunc(that,address){
            let jwtstring = "jwt=-; expires=Thu, 01 Jan 1970 00:00:01 GMT";
            let jwtstatus = "jwtstatus=correct; expires=Thu, 01 Jan 1970 00:00:01 GMT";
            document.cookie=jwtstring;
            document.cookie=jwtstatus;
            that.setState({
                cookie: document.cookie
            });
            window.localStorage.setItem('type',that.state.sitingIn ? "Authorization":"Registration");
            let newWin=window.open(address,that.state.sitingIn ? "Authorization":"Registration",windowProps);
            that.state.checkCookie(newWin);            
        }
        let lang = this.state.languageValue;
        console.log("Render modal registration window");
        console.log(pageTextInfo.registrationAnswer);
        console.log('this.state.selectedRegistrationAnswer');
        console.log(this.state.selectedRegistrationAnswer);
        let selectedRegistrationAnswer=this.state.selectedRegistrationAnswer;
        return (
            <React.Fragment>
            <div className="registrationBody d-flex ">
            <img className="registrationBodyLogoIcon" src={this.state.logoIconActive ? logoBlue : logoWhite} alt="logo" width="100px" height="20px"/>
            <div className="registrationBodyLanguageBlock d-flex" >
                {
                    this.state.languageVariants.map((element,index) => 
                        <div className={ 
                            (this.state.languageTextActive ? 
                                (index===lang ? "registrationBodyLanguageBlock_element_light registrationBodyLanguageBlock_element_selected" : "registrationBodyLanguageBlock_element_light" )  :
                                (index===lang ? "registrationBodyLanguageBlock_element_dark registrationBodyLanguageBlock_element_selected" : "registrationBodyLanguageBlock_element_dark")
                            )} onClick={()=>this.changeLanguageValue(index)} key={element+"/"+index}>
                            {element}
                        </div>
                    )
                }
            </div>
                <div className={"sitingInLight d-flex flex-column justify-content-center align-items-center " + this.state.sitingInLightAnimation}>
                    <h3>{this.state.sitingIn ? pageTextInfo.sitingInLightBackgroundText.titleSitingIn[lang] : pageTextInfo.registrationLightBackgroundText.registrationTitle[lang]}</h3>
                        
                        <div style={{display: this.state.sitingIn || this.state.regWindowType===1 ? 'block' : 'none'}}>
                            <p className="mb-0" style={{textAlign: "center"}}>{pageTextInfo.sitingInLightBackgroundText.sitingInFirstText[lang]}</p>
                                <div className="iconBlok d-flex align-content-center">                       
                                    <div target="windowName" className="socialIcon facebookIcon" style={{marginLeft: "auto"}}
                                    onClick={()=>{sendRequestFunc(this,requests.facebookRequest);}}
                                    />
                                    <div target="windowName" className="socialIcon googleIcon" style={{marginRight: "auto"}}
                                    onClick={()=>{sendRequestFunc(this,requests.googleRequest);}}
                                    />
                                    {
                                    /*
                                        <div className="socialIcon twitterIcon" style={{marginRight: "auto"}}></div>  
                                    */
                                    }                                
                                </div>                       
                            <p className="mb-1" >{this.state.sitingIn ? pageTextInfo.sitingInLightBackgroundText.sitingInSecondText[lang] : pageTextInfo.registrationLightBackgroundText.registrationSecondText[lang]}</p>
                            <form id="regForm" onSubmit={(e)=>{e.preventDefault(); console.log(this); this.sendRegistrationRequest(this.state.sitingIn)}}>
                                <div className="inputIcon">
                                    <img className="emailIcon" src={emailIcon} alt="emailIcon" width='13px' height='12px' />
                                    <input className="sitingInLightInput" type="email" id="email" pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$" placeholder={pageTextInfo.sitingInLightBackgroundText.secondInputPlaceholderText[lang]} required />
                                </div>
                                <div className="inputIcon">
                                    <img className="lockIcon" src={lockIcon} alt="lockIcon" width='12px' height='12px' />
                                    <input className="sitingInLightInput"  id="password" type={this.state.passwordType ? "password":"text"} placeholder={pageTextInfo.registrationLightBackgroundText.thirdInputPlaceholderText[lang]} required />
                                    <img onClick={()=>{this.setState({passwordType: !this.state.passwordType })}} className="eyeIcon" src={eyeIcon} alt="eyeIcon" width='15px' height='15px' />
                                </div>
                                <div className="registrationAnswerText" style={{visibility:this.state.regAnswerStatus ? 'visible' : 'hidden', color: selectedRegistrationAnswer!=0 ? 'red' : 'green'}}>{pageTextInfo.registrationAnswer[selectedRegistrationAnswer][lang]}</div>
                                <Link className="forgotPasswordLink" style={{ display: this.state.sitingIn ? "block" : "none" }} to="">{pageTextInfo.sitingInLightBackgroundText.linkText[lang]}</Link>
                                <div className="d-flex justify-content-center align-items-end">
                                    <div className="returnButton pr-5" style={{display: !this.state.sitingIn ? 'block' : 'none'}} onClick={()=>this.setState({regWindowType: 0})}>{pageTextInfo.registrationUserType.buttonReturn[lang]}</div>
                                    <button type="submit" htmlFor="regForm">{this.state.sitingIn ? pageTextInfo.sitingInLightBackgroundText.buttonText[lang] : pageTextInfo.registrationDarkBackgroundText.buttonText[lang]}</button>
                                </div>
                            </form>
                        </div>
                        <div style={{display: !this.state.sitingIn && this.state.regWindowType===0 ? 'block' : 'none'}}>
                            <p style={{textAlign: "center"}}>{pageTextInfo.registrationUserType.userTypeText[lang]}</p>
                            {
                                pageTextInfo.registrationUserType.userTypes.map((element,index)=>
                                    <div className="selectTypeBlock d-flex">
                                        <label className="typeCheckLabel" for={"typeCheckbox"+(index+1)}>{element.userText[lang]}</label>
                                        <input className="typeCheckButton" id={"typeCheckbox"+(index+1)} type="radio" name="raz" onClick={()=>this.setState({userType: index+1})}/>
                                    </div>
                                )
                            }
                            <button onClick={()=>this.state.userType===0 ? {} : this.setState({regWindowType: 1})}>{pageTextInfo.registrationUserType.buttonNext[lang]}</button>
                        </div>
                </div>
                <div className={"registrationDark d-flex flex-column justify-content-center align-items-center " + this.state.registrationDarkAnimation}>
                    <h3>{this.state.sitingIn ? pageTextInfo.registrationDarkBackgroundText.registrationTitle[lang] : pageTextInfo.sitingInDarkBackgroundText.titleSitingIn[lang]}</h3>
                    <p className="mb-0">{this.state.sitingIn ? pageTextInfo.registrationDarkBackgroundText.registrationFirstText[lang] : pageTextInfo.sitingInDarkBackgroundText.sitingInFirstText[lang]}</p>
                    <p>{this.state.sitingIn ? pageTextInfo.registrationDarkBackgroundText.registrationSecondText[lang] : pageTextInfo.sitingInDarkBackgroundText.sitingInSecondText[lang]}</p>
                    <button onClick={() => { this.changeAnimation() }}>{this.state.sitingIn ? pageTextInfo.registrationDarkBackgroundText.buttonText[lang] : pageTextInfo.sitingInDarkBackgroundText.buttonText[lang]}</button>
                </div>
            </div>
            
            </React.Fragment>
        )
    }

}

const RenderModalRegistration = connect(
    (state) => ({
        //storeState: state.AppReduser,
    }),
)(RenderModalRegistrationClass);

export default RenderModalRegistration;
