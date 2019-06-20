import React from 'react';
import { connect } from 'react-redux';
import './FirstEnterModal.css';
import Cookies from 'universal-cookie';
import Icon1 from './img/illustration_user_1.svg'
import Icon2 from './img/illustration_user_2.svg'
import Icon3 from './img/illustration_user_3.svg'
import Icon4 from './img/illustration_user_4.svg'
const cookies = new Cookies();

class FirstEnterModalClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputChecked: [true, false, false, false],
            openModalStart: true,
            changeBtClose: false,
            renderContent: [
                { Icon: Icon1, textTitle: "Построй свой маршрут", textP: "Наш сервис позволяет построить маршрут с любым количеством остановок на выбранную дату.", },
                { Icon: Icon2, textTitle: "Выбирайте и бронируйте", textP: "Выберите автомобиль с водителем исходя из Ваших критериев.", },
                { Icon: Icon3, textTitle: "Остановки по маршруту", textP: "Вы можете сделать остановки в интересных местах для фото, видео съёмки и посещения достопримечательностей.", },
                { Icon: Icon4, textTitle: "Оплата за поездку", textP: "Оплата производиться по окончанию поездки удобным для Вас способом.Возврат в точку отправления в этот же день-бусплатно.", },
            ],
            activeWindow: 0,
        }
    }
    ChangeinputChecked = (indexEl) => {
        let div = document.querySelector(".modalStartInformationContent");
        let widthOneWindow = div.scrollWidth / this.state.renderContent.length - 2.5;
        if (indexEl || indexEl == 0) {
            switch (indexEl) {
                case 0: {
                    div.scrollLeft = 0;
                }
                    break;
                case 1: {
                    div.scrollLeft = widthOneWindow;
                }
                    break;
                case 2: {
                    div.scrollLeft = widthOneWindow * 2;
                }
                    break;
                case 3: {
                    div.scrollLeft = widthOneWindow * 3;
                }
                    break;
                case 4: {
                    div.scrollLeft = widthOneWindow * 4;
                }
                    break;
            }

        } else {
            if (0 === this.state.activeWindow) {
                div.scrollLeft = widthOneWindow;
            }
            if (1 === this.state.activeWindow) {
                div.scrollLeft = widthOneWindow * 2;
            }
            if (2 === this.state.activeWindow) {
                div.scrollLeft = widthOneWindow * 3;
            }
            if (3 === this.state.activeWindow) {
                div.scrollLeft = widthOneWindow * 4;
            }
        }

    }
    handleClose = () => {
        let date = new Date(Date.now() + 1000 * 3600 * 24 * 60 * 500);
        cookies.set('firstEnter', 'no', { path: '/', expires: date });
        this.setState({
            openModalStart: false
        });
    }
    scrollDiv = (e) => {

        let widthOneWindow = e.currentTarget.scrollWidth / this.state.renderContent.length - 2.5;
        let marginLeft = e.currentTarget.scrollLeft - 10;
        if (0 === marginLeft) {

            this.setState({ activeWindow: 0 })
        }
        if (widthOneWindow === marginLeft) {

            this.setState({ activeWindow: 1 })
        }
        if (widthOneWindow * 2 === marginLeft) {

            this.setState({ activeWindow: 2 })
        }
        if (widthOneWindow * 3 === marginLeft) {

            this.setState({ activeWindow: 3 })
        }
        if (widthOneWindow * 4 === marginLeft) {

            this.setState({ activeWindow: 4 })
        }


    }
    render() {
        return (
            <React.Fragment>
                {
                    //Модалка для мобильной версии стартовая
                }
                {/* style={{display: this.state.openModalStart? "block":"none"}} */}
                <div className="modalStartInformation " style={{ display: this.state.openModalStart ? "block" : "none" }} >
                    <div className="d-flex align-items-center justify-content-end col-11 mt-3"/*  */ style={{ margin: '0 auto' }}>
                        <div className="modalStartInformation_logo" />
                        <span className="modalStartInformationSkip" onClick={this.handleClose}>Пропустить</span>
                    </div>

                    <div className="modalStartInformationContent d-flex align-items-center col-12 " onScroll={(e) => { this.scrollDiv(e) }}>
                        {this.state.renderContent.map((element, index) =>
                            <div className="modalStartInformationContentText d-flex flex-column align-items-center px-4" >
                                <i className="iconImg" style={{ background: "url(" + element.Icon + ")" }} />
                                <span>{element.textTitle}</span>
                                <p>{element.textP}</p>
                            </div>
                        )}

                    </div>
                    <div className="d-flex justify-content-center buttonChenge mb-2">
                        {this.state.renderContent.map((element, index) =>
                            <span className={this.state.activeWindow == index ? "activeBtChenge" : ""} onClick={() => { this.ChangeinputChecked(index) }}></span>
                        )}
                    </div>
                    <div className="modalStartInformationDivNext d-flex align-items-center justify-content-center col-11 " onClick={() => { this.state.changeBtClose ? this.handleClose() : this.ChangeinputChecked() }}>
                        <span className="modalStartInformationNext">{this.state.activeWindow == this.state.renderContent.length ? "Закрыть" : "Далее"}</span>
                    </div>
                </div>
                {
                    // Модалка для мобильной версии стартовая
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

export default FirstEnterModalClass;