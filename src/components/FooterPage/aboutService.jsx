import React from 'react';
import { connect } from 'react-redux';
import './aboutService.css'
import illustrationUser from '../media/illustration_user_1.svg'
import illustrationCar from '../media/illustration_user_2.svg'
import illustrationPhone from '../media/illustration_user_4.svg'
import Header from '../header/Header';


class aboutServiceClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayEl: [
                {
                    img: illustrationUser,
                    title: "Индивидуальный подбор маршрута",
                    text: "Планируйте собственный маршрут путешествия,\n с возможностью включить в него любое количество\n пунктов, совершая остановки в интересных местах."
                },
                {
                    img: illustrationCar,
                    title: "Свобода выбора",
                    text: "Выбирайте автомобиль с водителем, исходя \n из заданных критериев. Местный водитель-гид \n познакомит Вас с историей и культурой страны."
                },
                {
                    img: illustrationPhone,
                    title: "Гибкая система оплаты",
                    text: "Стоимость поездки расчитывается в зависимости \n от расстояния, типа транспорта и типа топлива.\n Оплата производится по окончанию поездки \n удобным для Вас спосоом."
                },
            ]

        }


    }

    render() {
        return (
            <React.Fragment>
                <Header driver={true} history={this.props.history} />
                <div className="wrapper">
                    <div className="aboutService d-flex" >
                        <div className="aboutService_Title col-12 p-0">
                            <h2>О сервисе</h2>
                            <p className="col-md-9 col-12">Сервис <strong>tripfer.com</strong> позволяет взаимодействовать с местными водителями и турагентами
                            туристам, которые хотят получить услугу трнсфера. Таким образом, формируется масса предложеий, из которых
                            Вы можете выбрать что-то особенное и индивидуально подходящее. Наша цель-создание качественных информационных продуктов
                            для данного сектора услуг.
                        Ключивыми особенностями сервиса являются:</p>
                            <div className="aboutService_content d-flex flex-column col-md-8 col-12 p-0">
                                {
                                    this.state.arrayEl.map((element, index) =>
                                        <div className="d-flex flex-md-row flex-column align-items-center mb-5">
                                            <i className="col-md-3 col-8 p-0" style={{ background: "url(" + element.img + ")no-repeat" }} />
                                            <div className="d-flex flex-column align-items-md-start align-items-center col-md-8 col-sm-11 col-12">
                                                <span>{element.title}</span>
                                                <p>{element.text}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const aboutService = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(aboutServiceClass);
export default aboutService;