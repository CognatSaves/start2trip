import React from 'react';
import './DriverProfileSettings.css'
import { connect } from 'react-redux';
import eyeBlueIcon from './img/eyeBlue.svg'
import eyeOrangeIcon from './img/eyeOrange.svg'



class DriverProfileSettingsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thisPasswordType:true,
            newPasswordType:true,
            confirmPasswordType:true,


        }

    }



    render() {
        return (
            <div className="driverProfilesettingsBody">
                <div>
                    <div className="driverProfilesettingsBodyTitle d-xl-block d-lg-block d-md-block d-sm-none d-xl-block">
                        <p>Настройки профиля</p>
                    </div>
                    <div className="driverProfileSettingsContent d-flex flex-column col-xl-9 col-lg-9 col-md-9 col-sm-11 col-11 pt-4">
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-3">
                            <p className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 pr-0">Email:</p>
                            <input className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12  " type="text" />
                        </div>
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                            <p className="driverProfileSettingsContentPasswordText col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 pr-0">Пароль:</p>
                            <div className="driverProfileSettingsContentPassword d-flex flex-column justify-content-end col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12  p-0">
                                <p>Текущий пароль</p>
                                <div className="driverProfileSettingsContentPasswordDivIcon">
                                <input className="mb-3" type={this.state.thisPasswordType ? "password":"text"} />
                                <p onClick={()=>{this.setState({thisPasswordType: !this.state.thisPasswordType })}} className="driverProfileSettingsContentPasswordEyeIcon"/>
                                </div>
                                <p>Новый пароль</p>
                                <div className="driverProfileSettingsContentPasswordDivIcon">
                                <input className="mb-3" type={this.state.newPasswordType ? "password":"text"} />
                                <p onClick={()=>{this.setState({newPasswordType: !this.state.newPasswordType })}} className="driverProfileSettingsContentPasswordEyeIcon"/>
                                </div>
                                <p>Подтвердите пароль</p>
                                <div className="driverProfileSettingsContentPasswordDivIcon">
                                <input className="mb-4" type={this.state.confirmPasswordType ? "password":"text"} />
                                <p onClick={()=>{this.setState({confirmPasswordType: !this.state.confirmPasswordType })}} className="driverProfileSettingsContentPasswordEyeIcon"/>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-4">
                        {/* TODO функционал выбора префикса по стране */}
                            <p className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 pr-0">Телефон:</p>
                            <input className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 " type="text" />
                        </div>
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-center mb-4">
                            <p className="col-2 pr-0"></p>
                            <button>СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                        </div>
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                            <p className="col-3 pr-0"></p>
                            <div className="driverProfileSettingsContentUnsubscribe d-flex flex-column mb-3">
                                <p className="driverProfileSettingsContentUnsubscribeButton">Отписаться от рассылки</p>
                                <p>В результате отписки Вы больше не будете получать сообщения от Start2Trip</p>
                            </div>
                        </div>
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