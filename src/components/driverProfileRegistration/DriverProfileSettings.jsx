import React from 'react';
import './DriverProfileSettings.css'
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import flags from './img/flags.png'
import ReactTelInput from 'react-telephone-input'
import requests from '../../config';


class DriverProfileSettingsClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.profileReduser.profile;
        this.state = {
            thisPasswordType: true,
            newPasswordType: true,
            confirmPasswordType: true,
            mailing:true,
            settingsValues:{
                email: profile.email,
                password: "",
                newPassword: "",
                newPassword2: "",
                privatePhone: profile.privatePhone,
            }
            
        }
        this.formSubmit = this.formSubmit.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }
    applyChanges(){
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
        if(jwt && jwt!=="-"){
            function checkPasswords(values){
                if(values.newPassword===values.newPassword2){
                    return true;
                }
                else{
                    return false;
                }
            }
            function isPasswordsFilled(values){
                return values.password.length!==0 && values.newPassword.length!==0 && values.newPassword.length!==0;
            }
            let value={};
            let data = this.state.settingsValues;
            if(isPasswordsFilled(data)){
                //alert('change password');
                if(checkPasswords(data)){
                    value = {
                        email: data.email,
                        privatePhone: data.privatePhone,
                        password: data.password,
                        newPassword: data.newPassword
                    };
                }
                else{
                    alert('they are different');
                }
            }
            else{
                //alert('dont change password');
                value = {
                    email: data.email,
                    privatePhone: data.privatePhone
                }
            }
            if(value.email){//если не заполнено - значит есть ошибки         
                let body = JSON.stringify(value);
                fetch(requests.profileUpdateRequest, {method: 'PUT',body:body,
                    headers:{'content-type': 'application/json', Authorization: `Bearer ${jwt}`}})
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
                            //that.state.sendResultLocal(true, {jwt:data.jwt, user: data.user});
                        }
                    })
                    .catch(function(error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        //that.state.sendResultLocal(false,{error: error});
                    });
            }
        }          
    }
    formSubmit(event) {
        alert('Settings submitted');
        this.applyChanges();
        event.preventDefault();
    }
    inputChange(value, variable){
        let settingsValues = this.state.settingsValues;
        switch(variable){
            case 'email':{
                settingsValues.email=value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'password':{
                settingsValues.password=value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'newPassword':{
                settingsValues.newPassword=value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'newPassword2':{
                settingsValues.newPassword2=value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'privatePhone':{
                settingsValues.privatePhone=value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            default:
        }
    }


    render() {
        return (
            <div className="driverProfilesettingsBody pb-1">
                <div className="driverProfilesettingsBodyTitle d-xl-block d-lg-block d-md-block d-sm-none d-none">
                    <p>Настройки профиля</p>
                </div>
                <form onSubmit={this.formSubmit} id="profileSettings" className="driverProfileSettingsContent d-flex flex-column col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                    <div className="driverProfileSettingsContentRow d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center">
                        <label htmlFor="sittingsEmail" className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 ">Email:</label>
                        <input id="sittingsEmail" className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={this.state.settingsValues.email}
                            onChange={(e)=>/*this.inputChange(e.target.value,'email')*/console.log('disabled')} disabled
                        />
                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                    </div>
                    <TextField
                        floatingLabelText="Email"
                        className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                        fullWidth="100%"
                        floatingLabelFocusStyle={{ color: "#304269" }}
                        underlineFocusStyle={{ borderColor: "#304269" }}
                        value={this.state.settingsValues.email}
                        onChange={(e)=>/*this.inputChange(e.target.value,'email')*/console.log('disabled')}
                        disabled
                    // errorText="This field is required"
                    />

                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start">
                        <p className="driverProfileSettingsContentPasswordText d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 ">Пароль:</p>
                        <div className="driverProfileSettingsContentPassword d-flex flex-column justify-content-end col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12  p-0">
                            <label htmlFor="sittingsCurrentPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">Текущий пароль</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsCurrentPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none" type={this.state.thisPasswordType ? "password" : "text"}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                value={this.state.settingsValues.password} onChange={(e)=>this.inputChange(e.target.value,'password')}/>
                                <TextField
                                    type={this.state.thisPasswordType ? "password" : "text"}
                                    floatingLabelText="Текущий пароль"
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.settingsValues.password}
                                    onChange={(e)=>this.inputChange(e.target.value,'password')}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ thisPasswordType: !this.state.thisPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>

                            <label htmlFor="sittingsNewPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">Новый пароль</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsNewPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none" type={this.state.newPasswordType ? "password" : "text"}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                value={this.state.settingsValues.newPassword} onChange={(e)=>this.inputChange(e.target.value,'newPassword')}/>
                                <TextField
                                    type={this.state.newPasswordType ? "password" : "text"}
                                    floatingLabelText="Новый пароль"
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.settingsValues.newPassword}
                                    onChange={(e)=>this.inputChange(e.target.value,'newPassword')}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ newPasswordType: !this.state.newPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>
                            <label htmlFor="sittingsConfirmPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">Подтвердите пароль</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsConfirmPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none mb-4" type={this.state.confirmPasswordType ? "password" : "text"}
                                title="Must match the previous field" value={this.state.settingsValues.newPassword2} onChange={(e)=>this.inputChange(e.target.value,'newPassword2')}/>
                                <TextField
                                    type={this.state.confirmPasswordType ? "password" : "text"}
                                    floatingLabelText="Подтвердите пароль"
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.settingsValues.newPassword2}
                                    onChange={(e)=>this.inputChange(e.target.value,'newPassword2')}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ confirmPasswordType: !this.state.confirmPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start ">
                        {/* TODO функционал выбора префикса по стране */}
                        <label htmlFor="sittingsPhoneNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11">Телефон:</label>
                        <ReactTelInput
                            defaultCountry="ge"
                            classNames="myPhoneInput col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0"
                            flagsImagePath={flags}
                            onChange={(telNumber, selectedCountry) => { this.inputChange(telNumber,'privatePhone');}}
                            onBlur={(value) => { console.log(value) }}
                            initialValue={this.state.settingsValues.privatePhone}
                            
                        />
                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                    </div>
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-center py-3">
                        <label className="col-2" />
                        <button htmlFor="profileSettings" type="submit">СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                    </div>
                </form>
                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start pb-3">
                    <p className="col-2"></p>
                    <div className="driverProfileSettingsContentUnsubscribe d-flex flex-column">
                    <p className="driverProfileSettingsContentUnsubscribeButton" onClick={()=>{this.setState({mailing: !this.state.mailing})}}>{this.state.mailing ? "Отписаться от рассылки":"Подписаться на рассылку"}</p>
                    <p>В результате отписки Вы больше не будете получать сообщения от Tripfer</p>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileSettings = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationtReduser,
    }),
)(DriverProfileSettingsClass);

export default DriverProfileSettings;