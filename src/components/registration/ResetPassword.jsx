import React from 'react';
import Header from '../header/Header';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        let code = this.props.match.params.code;
        this.state = {
            passwords: ["", ""],
            code: code,
            isSended: false,
            isRefreshExist: false,
            isGood: false,
            isRefreshing: true,
            isChanged: false,
            falde: false,
            noChange:false,
            isMatchUp:false,
            isChangePasswordType: false,
            isChangePasswordType2: false,
        }
        if (code.length === 0) {
            this.props.history.push('/');
        }
       
    }
    passwordonchange=(value, number)=> {
        let passwords = this.state.passwords;
        passwords[number] = value;
        this.setState({
            isChanged: true,
            passwords: passwords
        });
    }
    sendRequest=()=> {
        if (this.state.isChanged) {
            if (this.state.passwords[0] === this.state.passwords[1] && this.state.passwords[0].length > 0) {
                this.setState({
                    isSended: false,
                    isRefreshExist: true,
                    isRefreshing: true,
                    isChanged: false
                })
                let body = JSON.stringify({
                    password: this.state.passwords[0],
                    passwordConfirmation: this.state.passwords[1],
                    code: this.state.code
                });
                let that = this;
                fetch(requests.resetPassword, {
                    method: 'POST', body: body
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log('reset password server answer');
                        console.log(data);
                        if (data.error) {
                            throw Error('самшит');
                        }
                        if (data.message) {
                            if (data.message === "Too many attempts, please try again in a minute.") {
                                //throw Error('не кликой. подумой! а то я сейчас кликну!');
                                //that.props.history.push('/');
                                setTimeout(() => {
                                    that.setState({
                                        isSended: true,
                                        isGood: false,
                                        isRefreshExist: false
                                    });
                                }, 60000);
                            }
                        }
                        else {
                            that.setState({
                                isSended: true,
                                isGood: true,
                                isRefreshing: false
                            });
                            setTimeout(() => {
                                that.setState({
                                    isRefreshExist: false
                                });
                                that.props.history.push('/');
                            }, 1000);
                        }

                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        that.setState({
                            isSended: true,
                            isGood: false,
                            isRefreshExist: false,
                            falde: true,
                        });
                    });
            }
            else {
                this.setState({
                    noChange:true,
                    isMatchUp:false,
                });
            }
        }
        else {
            this.setState({
                noChange:true,
                isMatchUp:true,
            });
        }
    }
    render() {
        console.log('Reset password render');
        console.log(this.state);
        return (
            <React.Fragment>

                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={true} />
                <div className="forgotPasswordBody d-flex flex-column align-items-center">
                    <Header driver={true} history={this.props.history} />
                    <div className="forgotPasswordSuccess forgotPasswordContent d-flex flex-column align-items-center col-md-7 col-11">
                        <div className="d-flex justify-content-center align-items-center">
                            <span>Введите новый пароль для вашего аккаунта</span>
                        </div>
                        <div className={this.state.isChangePasswordType?"resetPasswordInput resetPasswordInput-active":"resetPasswordInput"}>
                            <input className={this.state.falde ? "forgotPasswordInput-error" : ""}
                            placeholder="Пароль" type={this.state.isChangePasswordType?"text":"password"} value={this.state.passwords[0]} onChange={(e) => {this.passwordonchange(e.target.value, 0); this.setState({ falde: false, isSended: false, noChange:false, })}} />
                            <i  onClick={()=>{this.setState({isChangePasswordType: !this.state.isChangePasswordType})}}/>
                        </div>
                        <div className={this.state.isChangePasswordType2?"resetPasswordInput resetPasswordInput-active":"resetPasswordInput"}>
                            <input className={this.state.falde ? "forgotPasswordInput-error" : ""}
                            placeholder="Повторите пароль" type={this.state.isChangePasswordType2?"text":"password"} value={this.state.passwords[1]} onChange={(e) => {this.passwordonchange(e.target.value, 1);this.setState({ falde: false, isSended: false, noChange:false, })}} />
                            <i onClick={()=>{this.setState({isChangePasswordType2: !this.state.isChangePasswordType2})}}/>
                        </div>
                        {
                            this.state.isSended ?
                                <div className={this.state.isGood ? "forgotPasswordContent-active" 
                                : "forgotPasswordContent-error"}>{this.state.isGood ? 'Пароль вашего аккаунта перезаписан' : 'Пароль вашего аккаунта перезаписать не удалось'}</div> :
                                <React.Fragment />
                        }
                        {
                            this.state.noChange ?
                                <div className="forgotPasswordContent-error">{this.state.isMatchUp ? 'Нет изменений' : 'Не совпадают пароли'}</div> :
                                <React.Fragment />
                        }
                        <div className="forgotPasswordBt" onClick={() => this.sendRequest()}><span>Отправить данные</span></div>
                       
                    </div>


                </div>

            </React.Fragment>
        )
    }
}
export default ResetPassword;