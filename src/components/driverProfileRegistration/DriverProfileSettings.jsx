import React from 'react';
import './DriverProfileSettings.css'
import { connect } from 'react-redux';
import eyeBlueIcon from './img/eyeBlue.svg'
import eyeOrangeIcon from './img/eyeOrange.svg'
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



class DriverProfileSettingsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thisPasswordType: true,
            newPasswordType: true,
            confirmPasswordType: true,


        }

    }




    render() {
        return (
            <div className="driverProfilesettingsBody pb-1">
                <div className="driverProfilesettingsBodyTitle d-xl-block d-lg-block d-md-block d-sm-none d-none">
                    <p>Настройки профиля</p>
                </div>
                <form onSabmit="" id="profileSettings" className="driverProfileSettingsContent d-flex flex-column col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                    <div className="driverProfileSettingsContentRow d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center">
                        <label htmlFor="sittingsEmail" className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 ">Email:</label>
                        <input id="sittingsEmail" className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                    </div>
                    <TextField
                        hintText="Please press your Email"
                        floatingLabelText="Email"
                        className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                        fullWidth="100%"
                        floatingLabelFocusStyle={{ color: "#304269" }}
                        underlineFocusStyle={{ borderColor: "#304269" }}
                    // errorText="This field is required"
                    />

                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start">
                        <p className="driverProfileSettingsContentPasswordText d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 ">Пароль:</p>
                        <div className="driverProfileSettingsContentPassword d-flex flex-column justify-content-end col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12  p-0">
                            <label htmlFor="sittingsCurrentPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">Текущий пароль</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsCurrentPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none" type={this.state.thisPasswordType ? "password" : "text"} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
                                <TextField
                                    hintText="Пожалуйста введите текущий пароль"
                                    type={this.state.thisPasswordType ? "password" : "text"}
                                    floatingLabelText="Текущий пароль"
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ thisPasswordType: !this.state.thisPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>

                            <label htmlFor="sittingsNewPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">Новый пароль</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsNewPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none" type={this.state.newPasswordType ? "password" : "text"} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
                                <TextField
                                    hintText="Пожалуйста введите новый пароль"
                                    type={this.state.newPasswordType ? "password" : "text"}
                                    floatingLabelText="Новый пароль"
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ newPasswordType: !this.state.newPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>
                            <label htmlFor="sittingsConfirmPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">Подтвердите пароль</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsConfirmPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none mb-4" type={this.state.confirmPasswordType ? "password" : "text"} title="Must match the previous field" required />
                                <TextField
                                    hintText="Пожалуйста подтвердите пароль"
                                    type={this.state.confirmPasswordType ? "password" : "text"}
                                    floatingLabelText="Подтвердите пароль"
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ confirmPasswordType: !this.state.confirmPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start ">
                        {/* TODO функционал выбора префикса по стране */}
                        <label htmlFor="sittingsPhoneNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11">Телефон:</label>
                        <TextField
                            hintText="Пожалуйста введите свой номер"
                            floatingLabelText="Телефон"
                            className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                            fullWidth="100%"
                            floatingLabelFocusStyle={{ color: "#304269" }}
                            underlineFocusStyle={{ borderColor: "#304269" }}
                        // errorText="This field is required"
                        />
                        <input id="sittingsPhoneNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " type="tel" />
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
                        <p className="driverProfileSettingsContentUnsubscribeButton">Отписаться от рассылки</p>
                        <p>В результате отписки Вы больше не будете получать сообщения от Start2Trip</p>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileSettings = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileSettingsClass);

export default DriverProfileSettings;