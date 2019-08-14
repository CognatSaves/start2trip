import React from 'react';
import Header from '../header/Header';
import './ForgotPassword.css'
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';

class ForgotPasswordClass extends React.Component {
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
        let textInfo = this.props.storeState.languageTextMain.registration.forgotPassword;
        debugger;
        console.log('EEE');
        return (
            <React.Fragment>

                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={true} isGoodAnswer={true} />
                <div className="forgotPasswordBody d-flex flex-column align-items-center">
                    <Header driver={false} history={this.props.history} />
                    <Helmet>
                        <title>{'Восстановление пароля'}</title>
                        <meta name="description" content={'Восстановление пароля'} />
                        <meta property="og:site_name" content="Tripfer" />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={document.URL} />
                        <meta property="og:title" content={'Восстановление пароля'} />
                        <meta property="og:description" content={'Восстановление пароля'} /> 
                    </Helmet>
                    {this.state.isGood ?
                        <div className="forgotPasswordSuccess forgotPasswordContent d-flex flex-column align-items-center col-md-7 col-11">
                            <span>{textInfo.success}</span>
                        </div>
                        :
                        <div className="forgotPasswordContent d-flex flex-column align-items-center col-md-8 col-11">
                            <div className="d-flex justify-content-center align-items-center">
                                <span>{textInfo.passwordRepair}</span>
                            </div>
                            <div className="d-flex flex-md-row flex-column align-items-center col-md-8 col-12">
                                <input className={this.state.falde ? "forgotPasswordInput-error col-md-7 col-12" : "col-md-7 col-12"}
                                value={this.state.email} placeholder={textInfo.placeholder} 
                                pattern="^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{6,}$" 
                                onChange={(e) => { this.emailonchange(e.target.value);
                                this.setState({ falde: false, isSended: false }) }}></input>
                                <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12" onClick={() => this.sendRequest()}>
                                    <span>{textInfo.sendEmail}</span>
                                </div>
                                
                            </div>
                            {
                                this.state.isSended ?
                                    <div className={this.state.isGood ? "forgotPasswordContent-active" : "forgotPasswordContent-error"}>
                                        {this.state.isGood ? textInfo.goodAnswer : textInfo.wrongAnswer}
                                    </div>
                                    :
                                    <span className="forgotPasswordContentSpanText">{textInfo.preSendText}</span>
                            }

                        </div>

                    }
                </div>

            </React.Fragment>
        )
    }
}

const ForgotPassword = connect(
    (state) => ({
        storeState: state.AppReduser
    })
)(ForgotPasswordClass);

export default ForgotPassword;