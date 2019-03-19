import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './RenderModalRegistration.css'
import { modalCountryDispacth } from '../../redusers/Action'






class RenderModalRegistrationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitingInDarkBacgraundText: { titleSitingIn: "Войти в аккаунт", sitingInFirstText: "С возвращением!", sitingInSecondText: "Пожалуйста, введите свои данные.", buttonText: "ВОЙТИ" },
            sitingInLightBacgraundText: { titleSitingIn: "Войти в аккаунт", sitingInFirstText: "Через социальные сети", sitingInSecondText: "или используйте Ваш email для входа", firstInputPlaceholderText: "Имя", secondInputPlaceholderText: "Email", linkText: "Забыли пароль?", buttonText: "ВОЙТИ" },
            registrationDarkBacgraundText: { registrationTitle: "Добро пожаловать!", registrationFirstText: "Введите свои персональные данные,", registrationSecondText: "и начинайте путешествие вместе с нами!", buttonText: "РЕГИСТРАЦИЯ" },
            registrationLightBacgraundText: { registrationTitle: "Создать аккаунт", registrationFirstText: "Через социальные сети", registrationSecondText: "или используйте Ваш email для регистрации", firstInputPlaceholderText: "Имя", secondInputPlaceholderText: "Email", thirdInputPlaceholderText: "Пароль", buttonText: "РЕГИСТРАЦИЯ" },
            sitingIn: true,
            sitingInLightAnimation: "",
            registrationDarkAnimation: "",
        };
    }

    changeAnimation() {
        if (this.state.sitingIn) {
            this.setState({
                sitingInLightAnimation: "sitingInLightAnimationLeft",
                registrationDarkAnimation: "registrationDarkAnimationLeft",
            });
            setTimeout(()=>{this.setState({
                sitingIn: !this.state.sitingIn,
            })}, 400)
        }else{
            this.setState({
                sitingInLightAnimation: "sitingInLightAnimationRight",
                registrationDarkAnimation: "registrationDarkAnimationRight",
            });
            setTimeout(()=>{this.setState({
                sitingIn: !this.state.sitingIn,
            })}, 300)
        }

    }

    render() {
        return (
            <div className="registrationBody d-flex flex-row">
                <div className={"sitingInLight d-flex flex-column justify-content-center align-items-center " + this.state.sitingInLightAnimation}>
                    <h3>{this.state.sitingIn ? this.state.sitingInLightBacgraundText.titleSitingIn : this.state.registrationLightBacgraundText.registrationTitle}</h3>
                    <p className="mb-0">{this.state.sitingInLightBacgraundText.sitingInFirstText}</p>
                    <div className="iconBlok d-flex align-content-center">
                        <div className="facebookIcon"></div>
                        <div className="googleIcon"></div>
                        <div className="twitterIcon"></div>
                    </div>
                    <p className="mb-1">{this.state.sitingIn ? this.state.sitingInLightBacgraundText.sitingInSecondText : this.state.registrationLightBacgraundText.registrationSecondText}</p>
                    <input className="sitingInLightInput" type="text" placeholder={this.state.sitingInLightBacgraundText.firstInputPlaceholderText} id="" required/>
                    <input className="sitingInLightInput" type="email" placeholder={this.state.sitingInLightBacgraundText.secondInputPlaceholderText} id="" required/>
                    <input className="sitingInLightInput" style={{ display: !this.state.sitingIn ? "block" : "none" }} type="password" placeholder={this.state.registrationLightBacgraundText.thirdInputPlaceholderText} id="" required/>
                    <Link style={{ display: this.state.sitingIn ? "block" : "none" }} to="">{this.state.sitingInLightBacgraundText.linkText}</Link>
                    <button>{this.state.sitingIn ? this.state.sitingInLightBacgraundText.buttonText : this.state.registrationDarkBacgraundText.buttonText}</button>
                </div>
                <div className={"registrationDark d-flex flex-column justify-content-center align-items-center " + this.state.registrationDarkAnimation}>
                    <h3>{this.state.sitingIn ? this.state.registrationDarkBacgraundText.registrationTitle : this.state.sitingInDarkBacgraundText.titleSitingIn}</h3>
                    <p className="mb-0">{this.state.sitingIn ? this.state.registrationDarkBacgraundText.registrationFirstText : this.state.sitingInDarkBacgraundText.sitingInFirstText}</p>
                    <p>{this.state.sitingIn ? this.state.registrationDarkBacgraundText.registrationSecondText : this.state.sitingInDarkBacgraundText.sitingInSecondText}</p>
                    <button onClick={() => { this.changeAnimation() }}>{this.state.sitingIn ? this.state.registrationDarkBacgraundText.buttonText : this.state.sitingInDarkBacgraundText.buttonText}</button>
                </div>
            </div>
        )
    }

}

const RenderModalRegistration = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(RenderModalRegistrationClass);

export default RenderModalRegistration;