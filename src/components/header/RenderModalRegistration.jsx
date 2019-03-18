import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './RenderModalRegistration.css'
import { modalCountryDispacth } from '../../redusers/Action'






class RenderModalRegistrationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitingInDarkBacgraundText:{ titleSitingIn: "Войти в аккаунт", sitingInFirstText: "С возвращением!", sitingInSecondText: "Пожалуйста, введите свои данные.", buttonText: "Войти" },
            sitingInLightBacgraundText:{ titleSitingIn: "Войти в аккаунт", sitingInFirstText: "Через социальные сети", sitingInSecondText: "или используйте Ваш email для входа", firstInputPlaceholderText: "Имя", secondInputPlaceholderText: "Email", linkText: "Забыли пароль?", buttonText: "Войти" },
            registrationDarkBacgraundText:{ registrationTitle: "Добро пожаловать!", registrationFirstText: "Введите свои персональные данные,", registrationSecondText: "и начинайте путешествие вместе с нами!", buttonText: "Регистрация" },
            registrationLightBacgraundText:{ registrationTitle: "Создать аккаунт", registrationFirstText: "Через социальные сети", registrationSecondText: "или используйте Ваш email для регистрации", firstInputPlaceholderText: "Имя", secondInputPlaceholderText: "Email", thirdInputPlaceholderText: "Пароль", buttonText: "Регистрация" },
        };
    }
    render() {
        return (
            <div className="registrationBody d-flex flex-row">
                <div className="sitingInDark flex-column justify-content-center align-items-center">
                    <h3>{this.state.sitingInDarkBacgraundText.titleSitingIn}</h3>
                    <p>{this.state.sitingInDarkBacgraundText.sitingInFirstText}</p>
                    <p>{this.state.sitingInDarkBacgraundText.sitingInSecondText}</p>
                    <button>{this.state.sitingInDarkBacgraundText.buttonText}</button>
                </div>
                <div className="sitingInLight flex-column justify-content-center align-items-center">
                    <h3>{this.state.sitingInLightBacgraundText.titleSitingIn}</h3>
                    <p>{this.state.sitingInLightBacgraundText.sitingInFirstText}</p>
                    <div>
                        <span>f</span>
                        <span>G</span>
                        <span>T</span>
                    </div>
                    <p>{this.state.sitingInLightBacgraundText.sitingInSecondText}</p>
                    <input type="text" placeholder={this.state.sitingInLightBacgraundText.firstInputPlaceholderText}  id="" />
                    <input type="email" placeholder={this.state.sitingInLightBacgraundText.secondInputPlaceholderText}  id="" />
                    <Link to="">{this.state.sitingInLightBacgraundText.linkText}</Link>
                    <button>{this.state.sitingInLightBacgraundText.buttonText}</button>
                </div>
                <div></div>
                <div className="registrationLight flex-column justify-content-center align-items-center">
                    <h3>{this.state.registrationLightBacgraundText.registrationTitle}</h3>
                    <p>{this.state.registrationLightBacgraundText.registrationFirstText}</p>
                    <div>
                        <span>f</span>
                        <span>G</span>
                        <span>T</span>
                    </div>
                    <p>{this.state.registrationLightBacgraundText.registrationSecondText}</p>
                    <input type="text" placeholder={this.state.registrationLightBacgraundText.firstInputPlaceholderText} id="" />
                    <input type="email" placeholder={this.state.registrationLightBacgraundText.secondInputPlaceholderText} id="" />
                    <input type="password" placeholder={this.state.registrationLightBacgraundText.thirdInputPlaceholderText} id="" />
                    <button>{this.state.registrationLightBacgraundText.buttonText}</button>
                </div>
                <div className="registrationDark flex-column justify-content-center align-items-center">
                    <h3>{this.state.registrationDarkBacgraundText.registrationTitle}</h3>
                    <p>{this.state.registrationDarkBacgraundText.registrationFirstText}</p>
                    <p>{this.state.registrationDarkBacgraundText.registrationSecondText}</p>
                    <button>{this.state.registrationDarkBacgraundText.buttonText}</button>
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