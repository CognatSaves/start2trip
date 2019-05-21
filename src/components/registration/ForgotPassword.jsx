import React from 'react';
import Header from '../header/Header';
import './ForgotPassword.css'
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
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
                    {this.state.isGood ?
                        <div className="forgotPasswordSuccess forgotPasswordContent d-flex flex-column align-items-center col-md-7 col-11">
                            <span>Спасибо! Информация для смены пароля выслана на Ваш email.</span>
                        </div>
                        :
                        <div className="forgotPasswordContent d-flex flex-column align-items-center col-md-5 col-11">
                            <div className="d-flex justify-content-center align-items-center">
                                <span>Здесь вы можете восстановить ваш пароль</span>
                            </div>
                            <input className={this.state.falde ? "forgotPasswordContent-error" : ""} value={this.state.email} placeholder="Введите адрес вашей почты" pattern="" onChange={(e) => { this.emailonchange(e.target.value); this.setState({ falde: false, isSended: false }) }}></input>
                            <div className="d-flex justify-content-end align-items-center w-100">
                                {
                                    this.state.isSended ?
                                        <div className={this.state.isGood ? "forgotPasswordContent-active" : "forgotPasswordContent-error"}>{this.state.isGood ? 'Отправлено,проверьте почту' : 'Неверная почта'}</div> :
                                        <div></div>
                                }
                                <div className="forgotPasswordBt" onClick={() => this.sendRequest()}><span>Отправить на почту</span></div>
                            </div>
                        </div>

                    }
                </div>

            </React.Fragment>
        )
    }
}

export default ForgotPassword;