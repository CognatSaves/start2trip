import React from 'react';
import { connect } from 'react-redux';
import './FirstEnterModal.css';
import Cookies from 'universal-cookie';
import IconUser1 from './img/user/1_user.svg'
import IconUser2 from './img/user/2_user.svg'
import IconUser3 from './img/user/3_user.svg'
import IconUser4 from './img/user/4_user.svg'

import IconDriver1 from './img/driver/illustration_driver_1.svg'
import IconDriver2 from './img/driver/illustration_driver_2.svg'
import IconDriver3 from './img/driver/illustration_driver_3.svg'
import IconDriver4 from './img/driver/illustration_driver_4.svg'
import IconDriver5 from './img/driver/illustration_driver_5.svg'

import IconAgency1 from './img/agency/illustration_agency_1.svg'
import IconAgency2 from './img/agency/illustration_agency_2.svg'
import IconAgency3 from './img/agency/illustration_agency_3.svg'
import IconAgency4 from './img/agency/illustration_agency_4.svg'


import { isMobileOnly } from 'react-device-detect';
import Dialog from 'material-ui/Dialog';
const cookies = new Cookies();

class FirstEnterModalClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputChecked: [true, false, false, false],
            openModalStart: false,
            changeBtClose: false,
            renderContent: [],
            renderContentUser: [
                { Icon: IconUser1, textTitle: "Построй свой маршрут", textP: "Наш сервис позволяет построить маршрут с любым количеством остановок на выбранную дату.", },
                { Icon: IconUser2, textTitle: "Выбирайте и бронируйте", textP: "Выберите автомобиль с водителем исходя из Ваших критериев.", },
                { Icon: IconUser3, textTitle: "Остановки по маршруту", textP: "Вы можете сделать остановки в интересных местах для фото, видео съёмки и посещения достопримечательностей.", },
                { Icon: IconUser4, textTitle: "Оплата за поездку", textP: "Оплата производится по окончанию  поездки удобным для Вас способом. Возврат в точку отправления в этот же день - бесплатно.", },
            ],
            renderContentDriver: [
                { Icon: IconDriver1, textTitle: "Заполнение профиля", textP: "Заполните Ваш профиль и добавьте автомобили на которых собираетесь работать.", },
                { Icon: IconDriver2, textTitle: "Настройки поездок", textP: "На странице 'настройки поездок' укажите место и радиус, где Вы готовы принимать заказы.", },
                { Icon: IconDriver3, textTitle: "График работы", textP: "Заранее выбирайте выходные дни, таким образом планируйте свой график.", },
                { Icon: IconDriver4, textTitle: "Учет финансов", textP: "Получайте оплату за выполненные заказы и ведите учет на своей странице биллинга.", },
                { Icon: IconDriver5, textTitle: "Партнерская программа", textP: "Участвуйте в нашей партнерской программе, приглашайте коллег и путешественников и получайте за это стабильный доход.", },
            ],
            renderContentAgency: [
                { Icon: IconAgency1, textTitle: "Заполнение профиля", textP: "Заполните профиль и укажите реквизиты Вашей организации.", },
                { Icon: IconAgency2, textTitle: "Постройте свой бизнес", textP: "Подключайте водителей в систему, добавляте организованные туры и зарабатывайте на этом деньги.", },
                { Icon: IconAgency3, textTitle: "Учет финансов", textP: "Ведите учет о выполненных заказах, просматривайте финансовую статистику на странице биллинга.", },
                { Icon: IconAgency4, textTitle: "Партнерская программа", textP: "Участвуйте в нашей партнерской программе, приглашайте Ваших партнеров и получайте за это стабильный доход.", },
            ],
            activeWindow: 0,
        }
        if (/HeadlessChrome/.test(window.navigator.userAgent)||/prerendercloud/.test(window.navigator.userAgent)) {
            console.log("Chrome headless detected");
        }else{
            let firstEnter = cookies.get('firstEnter', { path: '/' });
            let accountFirstEnter = cookies.get('accountFirstEnter', { path: '/' });
            if (firstEnter === undefined || accountFirstEnter === undefined) {
                this.state.openModalStart = true;
            }
        }
        
    }
    ChangeinputChecked = (indexEl) => {

        console.log(this.state.activeWindow)
        let div = document.querySelector(".modalStartInformationContent");
        if (!div) {
            div = document.querySelector(".modalStartInformationContentmodal");
        }
        let widthOneWindow = div.scrollWidth / this.state.renderContent.length - 2.5;
        if (indexEl || indexEl === 0) {
            div.scrollLeft = widthOneWindow * indexEl;
        } else {
            div.scrollLeft = widthOneWindow * (this.state.activeWindow + 1);
        }

    }
    handleClose = () => {

        let date = new Date(Date.now() + 1000 * 3600 * 24 * 60 * 500);
        if (this.props.whatRender === 'user') {
            cookies.set('firstEnter', 'no', { path: '/', expires: date });
        }
        else {
            cookies.set('accountFirstEnter', 'no', { path: '/', expires: date });
        }
        this.setState({
            openModalStart: false
        });
    }

    scrollDiv = (e) => {
        let widthOneWindow = e.currentTarget.scrollWidth / this.state.renderContent.length - 3.5;
        let marginLeft = e.currentTarget.scrollLeft;
        let firstOn = widthOneWindow;
        let second = widthOneWindow * 2;
        let third = (widthOneWindow * 3) - 10;
        let fourth = (widthOneWindow * 4) - 10;
        if (0 <= marginLeft) {
            this.setState({ activeWindow: 0 })
        }
        if (firstOn < marginLeft && second >= marginLeft) {
            this.setState({ activeWindow: 1 })
            // e.currentTarget.scrollLeft = widthOneWindow;
        }
        if (second < marginLeft && third >= marginLeft) {
            this.setState({ activeWindow: 2 })
            // e.currentTarget.scrollLeft = widthOneWindow*2;
        }
        if (third < marginLeft && fourth >= marginLeft) {
            this.setState({ activeWindow: 3 })
            // e.currentTarget.scrollLeft = widthOneWindow*3;
        }
        if (fourth < marginLeft) {
            this.setState({ activeWindow: 4 })
            // e.currentTarget.scrollLeft = widthOneWindow*4;
        }
    }
    render() {
        if (this.state.renderContent == 0) {
            let whatRender;
            switch (this.props.whatRender) {
                case "user": {
                    whatRender = this.state.renderContentUser;
                    break;
                }
                case "driver": {
                    whatRender = this.state.renderContentDriver;
                }
                    break;
                case "agency": {
                    whatRender = this.state.renderContentAgency;
                }
                    break;
            }
            this.setState({ renderContent: whatRender })
        }

        return (
            <React.Fragment>
                {
                    this.state.openModalStart ?
                        <React.Fragment>

                            {isMobileOnly ?
                                <React.Fragment>
                                    {/* //Модалка для мобильной версии стартовая */}
                                    <div className="modalStartInformation " style={{ display: this.state.openModalStart ? "block" : "none" }} >
                                        <div className="d-flex align-items-center justify-content-end col-11 mt-3 mx-auto">
                                            <div className="modalStartInformation_logo" />
                                            <span className="modalStartInformationSkip" onClick={this.handleClose}>Пропустить</span>
                                        </div>

                                        <div className="modalStartInformationContent d-flex align-items-start pt-4 col-12 " onScroll={(e) => { this.scrollDiv(e) }}>
                                            {this.state.renderContent.map((element, index) =>
                                                <div className="modalStartInformationContentText d-flex flex-column align-items-center justify-content-start px-4" >
                                                    <i className="iconImg" style={{ background: "url(" + element.Icon + ")" }} />
                                                    <span>{element.textTitle}</span>
                                                    <p>{element.textP}</p>
                                                </div>
                                            )}

                                        </div>
                                        <div className="d-flex justify-content-center buttonChenge mt-2 pt-2 mb-1">
                                            {this.state.renderContent.map((element, index) =>
                                                <span className={this.state.activeWindow == index ? "activeBtChenge" : ""} onClick={() => { this.ChangeinputChecked(index) }}></span>
                                            )}
                                        </div>
                                        <div className="modalStartInformationDivNext d-flex align-items-center justify-content-center col-11 " onClick={() => { this.state.activeWindow == this.state.renderContent.length - 1 ? this.handleClose() : this.ChangeinputChecked() }}>
                                            <span className="modalStartInformationNext">{this.state.activeWindow == this.state.renderContent.length - 1 ? "Закрыть" : "Далее"}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                                :
                                <Dialog
                                    modal={this.state.openModalStart}
                                    open={this.state.openModalStart}
                                >
                                    {/* // Модалка для мобильной версии стартовая */}
                                    <div className="col-12 " >
                                        <div className="d-flex align-items-center justify-content-end col-11 mt-3"/*  */ style={{ margin: '0 auto' }}>
                                            <div className="modalStartInformation_logo" />
                                            <span className="modalStartInformationSkip" onClick={this.handleClose}>Пропустить</span>
                                        </div>

                                        <div className="modalStartInformationContentmodal d-flex align-items-center col-12 " onScroll={(e) => { this.scrollDiv(e) }}>
                                            {this.state.renderContent.map((element, index) =>
                                                <div className="modalStartInformationContentText d-flex flex-column align-items-center justify-content-start px-4" >
                                                    <i className="iconImg" style={{ background: "url(" + element.Icon + ")" }} />
                                                    <span>{element.textTitle}</span>
                                                    <p>{element.textP}</p>
                                                </div>
                                            )}

                                        </div>
                                        <div className="d-flex justify-content-center buttonChenge mt-5 mb-4">
                                            {this.state.renderContent.map((element, index) =>
                                                <span className={this.state.activeWindow == index ? "activeBtChenge" : ""} onClick={() => { this.ChangeinputChecked(index) }}></span>
                                            )}
                                        </div>
                                        <div className="modalStartInformationDivNext d-flex align-items-center justify-content-center col-6 " onClick={() => { this.state.activeWindow == this.state.renderContent.length - 1 ? this.handleClose() : this.ChangeinputChecked() }}>
                                            <span className="modalStartInformationNext">{this.state.activeWindow == this.state.renderContent.length - 1 ? "Закрыть" : "Далее"}</span>
                                        </div>
                                    </div>

                                </Dialog>

                            }
                        </React.Fragment>
                        :
                        <React.Fragment />
                }

            </React.Fragment>
        )
    }
}

const FirstEnterModal = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(FirstEnterModalClass);

export default FirstEnterModal;