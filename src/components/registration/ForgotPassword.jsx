import React from 'react';
import Header from '../header/Header';
import './ForgotPassword.css'
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import {Helmet} from 'react-helmet';
class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isSended: false,
            isRefreshExist: false,
            isGood: false,
            isChanged: false,
            falde: false,
        };
    }
    emailonchange = (value) => {
        this.setState({
            email: value,
            isChanged: true
        });
    }
    sendRequest = () => {
        if (this.state.isChanged) {
            console.log('You want to send that kek');
            console.log(this.state.email);
            this.setState({
                isSended: false,
                isRefreshExist: true,
                isChanged: false
            })
            let body = JSON.stringify({
                email: this.state.email,
                url: requests.frontendAddress + '/reset-password'
            });
            let that = this;
            fetch(requests.forgotPassword, {
                method: 'POST', body: body
            })
                .then(response => {
                    return response.json();
                })
                .then(function (data) {
                    console.log('data');
                    console.log(data);
                    if (data.error) {
                        throw Error(data.error.errorMsg);
                    }
                    if (data.message) {
                        if (data.message === "Too many attempts, please try again in a minute.") {
                            //throw Error('не кликой. подумой! а то я сейчас кликну!');
                            that.props.history.push('/');
                        }
                    }
                    that.setState({
                        isSended: true,
                        isGood: true,
                        isRefreshExist: false,
                        falde: false,
                    });
                })
                .catch(function (error) {
                    console.log("bad");
                    console.log('An error occurred:', error);
                    that.setState({
                        isSended: true,
                        isGood: false,
                        isRefreshExist: false,
                        falde: true
                    });
                })
        }
        else {
            this.setState({ falde: true })
        }
    }
    render() {
        console.log('Forgot password render');
        console.log(this.state);
        return (
            <React.Fragment>

                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={true} isGoodAnswer={true} />
                <div className="forgotPasswordBody d-flex flex-column align-items-center">
                    <Header driver={false} history={this.props.history} />
                    <Helmet>
                        <title>Tripfer forgot password</title>
                        <meta name="description" content="Tripfer in header" />
                        <link rel="icon" sizes="any" type="image/svg+xml" href="favicon.svg" />
                    </Helmet>
                    {this.state.isGood ?
                        <div className="forgotPasswordSuccess forgotPasswordContent d-flex flex-column align-items-center col-md-7 col-11">
                            <span>Спасибо! Информация для смены пароля выслана на Ваш email.</span>
                        </div>
                        :
                        <div className="forgotPasswordContent d-flex flex-column align-items-center col-md-8 col-11">
                            <div className="d-flex justify-content-center align-items-center">
                                <span>Восстановление пароля</span>
                            </div>
                            <div className="d-flex flex-md-row flex-column align-items-center col-md-8 col-12">
                                <input className={this.state.falde ? "forgotPasswordInput-error col-md-7 col-12" : "col-md-7 col-12"} value={this.state.email} placeholder="Введите адрес Вашей почты" pattern="" onChange={(e) => { this.emailonchange(e.target.value); this.setState({ falde: false, isSended: false }) }}></input>
                               
                               
                                    <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12" onClick={() => this.sendRequest()}><span>Отправить</span></div>
                                
                            </div>
                            {
                                    this.state.isSended ?
                                        <div className={this.state.isGood ? "forgotPasswordContent-active" : "forgotPasswordContent-error"}>{this.state.isGood ? 'Отправлено,проверьте почту' : 'Неверная почта'}</div>
                                        :
                                        <span className="forgotPasswordContentSpanText">На Вашу почту будет выслана ссылка для восстановления пароля.</span>
                                }

                        </div>

                    }
                </div>

            </React.Fragment>
        )
    }
}

export default ForgotPassword;