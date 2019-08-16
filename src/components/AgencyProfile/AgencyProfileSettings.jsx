import React from 'react';
import { connect } from 'react-redux';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';

import flags from '../media/flags.png';

import ReactTelInput from 'react-telephone-input'
import TextField from 'material-ui/TextField';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';

class AgencyProfileSettingsClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.globalReduser.profile;
        this.state = {
            thisPasswordType: true,
            newPasswordType: true,
            confirmPasswordType: true,
            mailing: true,
            settingsValues: {
                email: profile.email,
                password: "",
                newPassword: "",
                newPassword2: "",
                privatePhone: profile.privatePhone,
                subscription: profile.subscription
            },
            isRefreshExist: false,
            isRefreshing: true,
            isGoodAnswer: true,
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
            this.props.history.push('/login');
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

    applyChanges = (sendedData) => {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            function checkPasswords(values) {
                if (values.newPassword === values.newPassword2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            function isPasswordsFilled(values) {
                return values.password.length !== 0 && values.newPassword.length !== 0 && values.newPassword.length !== 0;
            }
            let value = {};
            let data = sendedData ? sendedData : this.state.settingsValues;
            if (isPasswordsFilled(data)) {
                if (checkPasswords(data)) {
                    value = {
                        email: data.email,
                        privatePhone: data.privatePhone,
                        password: data.password,
                        newPassword: data.newPassword,
                        subscription: data.subscription
                    };
                }
                else {
                    alert('they are different');
                }
            }
            else {
                value = {
                    email: data.email,
                    privatePhone: data.privatePhone,
                    subscription: data.subscription
                }
            }
            if (value.email) {//если не заполнено - значит есть ошибки
                let that = this;
                that.startRefresher();
                let body = JSON.stringify(value);
                fetch(requests.profileUpdateRequest, {
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
                            that.getProfileData();
                            //document.location.reload(true);
                            //that.state.sendResultLocal(true, {jwt:data.jwt, user: data.user});
                        }
                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:');
                        console.log(error);
                        that.catchFunc();
                        //that.state.sendResultLocal(false,{error: error});
                    });
            }

        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/login');
            //return null;
        }
    }

    formSubmit = (event) => {
        this.applyChanges();
        event.preventDefault();
    }

    inputChange = (value, variable) => {
        let settingsValues = this.state.settingsValues;
        switch (variable) {
            case 'email': {
                settingsValues.email = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'password': {
                settingsValues.password = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'newPassword': {
                settingsValues.newPassword = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'newPassword2': {
                settingsValues.newPassword2 = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'privatePhone': {
                settingsValues.privatePhone = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            default:
        }
    }

    render() {
        const style = {
            refresh: {
                display: 'inline-block',
                position: 'relative',
            },
        };

        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileSettings;
        let profile = this.props.globalReduser.profile;

        return (
            <div className="driverProfilesettingsBody pb-1">
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
                <div className="driverProfilesettingsBodyTitle d-xl-block d-lg-block d-md-block d-sm-none d-none">
                    <p>{textPage.settingsBodyTitle}</p>
                </div>
                <form onSubmit={this.formSubmit} id="profileSettings" className="driverProfileSettingsContent d-flex flex-column col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                    <div className="driverProfileSettingsContentRow d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center">
                        <label htmlFor="sittingsEmail" className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 ">{textPage.sittingsEmail.floatingLabelText}:</label>
                        <input id="sittingsEmail" className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={this.state.settingsValues.email}
                            onChange={(e) =>/*this.inputChange(e.target.value,'email')*/console.log('disabled')} disabled
                        />
                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">{textPage.sittingsEmail.description}</p>
                    </div>
                    <TextField
                        floatingLabelText={textPage.sittingsEmail.floatingLabelText}
                        className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                        fullWidth="100%"
                        floatingLabelFocusStyle={{ color: "#304269" }}
                        underlineFocusStyle={{ borderColor: "#304269" }}
                        value={this.state.settingsValues.email}
                        onChange={(e) =>/*this.inputChange(e.target.value,'email')*/console.log('disabled')}
                        disabled
                    // errorText="This field is required"
                    />

                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start">
                        <p className="driverProfileSettingsContentPasswordText d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 ">{textPage.ContentPasswordText}:</p>
                        <div className="driverProfileSettingsContentPassword d-flex flex-column justify-content-end col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12  p-0">
                            <label htmlFor="sittingsCurrentPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">{textPage.sittingsCurrentPassword.floatingLabelText}</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsCurrentPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none" type={this.state.thisPasswordType ? "password" : "text"}
                                    pattern="[A-Za-z0-9]{6,}" title="Должен содержать не менее 6-ти сомволов латинских букв (заглавных или строчных) и цифр"
                                    value={this.state.settingsValues.password} onChange={(e) => this.inputChange(e.target.value, 'password')} />
                                <TextField
                                    type={this.state.thisPasswordType ? "password" : "text"}
                                    floatingLabelText={textPage.sittingsCurrentPassword.floatingLabelText}
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.settingsValues.password}
                                    onChange={(e) => this.inputChange(e.target.value, 'password')}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ thisPasswordType: !this.state.thisPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>

                            <label htmlFor="sittingsNewPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">{textPage.sittingsNewPassword.floatingLabelText}</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsNewPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none" type={this.state.newPasswordType ? "password" : "text"}
                                    pattern="[A-Za-z0-9]{6,}" title="Должен содержать не менее 6-ти сомволов латинских букв (заглавных или строчных) и цифр"
                                    value={this.state.settingsValues.newPassword} onChange={(e) => this.inputChange(e.target.value, 'newPassword')} />
                                <TextField
                                    type={this.state.newPasswordType ? "password" : "text"}
                                    floatingLabelText={textPage.sittingsNewPassword.floatingLabelText}
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.settingsValues.newPassword}
                                    onChange={(e) => this.inputChange(e.target.value, 'newPassword')}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ newPasswordType: !this.state.newPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>
                            <label htmlFor="sittingsConfirmPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">{textPage.sittingsConfirmPassword.floatingLabelText}</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsConfirmPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none mb-4" type={this.state.confirmPasswordType ? "password" : "text"}
                                    title="Must match the previous field" value={this.state.settingsValues.newPassword2} onChange={(e) => this.inputChange(e.target.value, 'newPassword2')} />
                                <TextField
                                    type={this.state.confirmPasswordType ? "password" : "text"}
                                    floatingLabelText={textPage.sittingsConfirmPassword.floatingLabelText}
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.settingsValues.newPassword2}
                                    onChange={(e) => this.inputChange(e.target.value, 'newPassword2')}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ confirmPasswordType: !this.state.confirmPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start ">
                        <label htmlFor="sittingsPhoneNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11">{textPage.sittingsPhoneNumber.floatingLabelText}:</label>
                        <ReactTelInput
                            defaultCountry={this.props.storeState.isoCountryMap}
                            classNames="myPhoneInput col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0"
                            flagsImagePath={flags}
                            onChange={(telNumber, selectedCountry) => { this.inputChange(telNumber, 'privatePhone'); }}
                            onBlur={(value) => { console.log(value) }}
                            initialValue={this.state.settingsValues.privatePhone}

                        />
                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">{textPage.sittingsPhoneNumber.description}</p>
                    </div>
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-center py-3">
                        <label className="col-2" />
                        <button htmlFor="profileSettings" type="submit">{textPage.sittingsSaveBt}</button>
                    </div>
                </form>
                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start pb-3">
                    <p className="col-2"></p>
                    <div className="driverProfileSettingsContentUnsubscribe d-flex flex-column">
                        <p className="driverProfileSettingsContentUnsubscribeButton" onClick={() => {
                            let settingsValues = this.state.settingsValues;
                            settingsValues.subscription = !settingsValues.subscription;
                            this.setState({ settingsValues: settingsValues });
                            this.applyChanges({
                                email: profile.email,
                                password: "",
                                newPassword: "",
                                newPassword2: "",
                                privatePhone: profile.privatePhone,
                                subscription: this.state.settingsValues.subscription
                            })
                        }
                        }>{this.state.settingsValues.subscription ? textPage.unsubscribeButton.mailing.unsubscribe : textPage.unsubscribeButton.mailing.subscribe}</p>
                        <p>{textPage.unsubscribeButton.message}</p>
                    </div>
                </div>
            </div>
        );
    }
}
const AgencyProfileSettings = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileSettingsClass);

export default AgencyProfileSettings;