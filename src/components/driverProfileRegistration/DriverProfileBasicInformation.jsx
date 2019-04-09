import React from 'react';
import './DriverProfileBasicInformation.css'
import { connect } from 'react-redux';
import imgPerson from './img/drivers_body_photo.png'
import Stars from '../stars/Stars'




class DriverProfileBasicInformationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: {
                month: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Декабрь"],
            },
            dataNumber: [],
            dataYear: [],
            language: ["Грузинский", "Русский", "Корейский", "Хинди"],

        }
        this.getMassNumbers.bind(this);
        this.getMassYear.bind(this);
        this.addNum.bind(this);
    }

    getMassNumbers(num) {
        let number = [];
        for (let i = 1; i < num; i++) {
            number.push(i)
        }
        return number;
    }

    getMassYear(num) {
        let number = [];
        for (let i = num; i > 1919; i--) {
            number.push(i)
        }
        return number;
    }

    addNum() {
        let newDataNumber = this.getMassNumbers(32);
        let newdataYear = this.getMassYear(2019);
        this.setState({
            dataNumber: newDataNumber,
            dataYear: newdataYear,
        })
    }
    componentDidMount() {
        this.addNum();
    }

    render() {

        return (
            <div className="basicInformationBody d-flex flex-column">
                <div className="basicInformationBodyTop d-xl-flex d-lg-flex d-md-flex align-items-center mb-4 d-sm-none d-none">
                    <div className="basicInformationBodyTopImgHover">
                        <label className="basicInformationBodyTopImg" htmlFor="addFile">Обновить фотографию</label>
                        <img src={imgPerson} alt="imgPerson" />
                        {/* <label className="edditIcon" htmlFor="addFile"></label> */}
                        <input type="file" id="addFile" style={{ display: "none" }} />
                    </div>
                    <div className="bodyTopDriverInfo w-100">
                        <div className="d-flex align-items-center">
                            <p className="mb-0 mr-2">Валерий</p>
                            <Stars value={"4.5"} commentNumber={"35 отзывов"} valueDisplay="block" commentNumberDisplay="block" />
                        </div>
                        <div className="bodyTopDriverInfoPlace">
                            <p className="mb-2">Грузия,Тбилиси</p>
                            {/* TODO Location */}
                        </div>
                        <div className="bodyTopDriverInfoRide container p-0 d-flex">
                            <div className="d-flex flex-column col-2 p-0">
                                <p>Всего</p>
                                <p>поездок</p>
                                <p>18</p>
                            </div>
                            <div className="d-flex flex-column col-5 p-0">
                                <p>Предстоящие</p>
                                <p>поездки</p>
                                <p>8</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basicInformationBodyBottom d-flex flex-column mb-5 p-0">
                    <div className="basicInformationBodyBottomHeader d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        <p>Редактировать профиль</p>
                    </div>
                    <div className="basicInformationBodyBottomContent d-flex justify-content-center mt-2">
                        <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none flex-column col-3">
                            <p>Имя:</p>
                            <p>Фамилия:</p>
                            <p>Дата рождения:</p>
                            <p>Номер паспорта:</p>
                            <p>Дата выдачи:</p>
                            <p>Родной город:</p>
                            <p>Языки:</p>
                            <p>О себе:</p>
                        </div>
                        <div className="d-flex flex-column col-lx-6 col-lg-6 col-md-7 col-sm-12 col-12">
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Имя:</p>
                            <input type="text" />
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Фамилия:</p>
                            <input type="text" />
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Дата рождения:</p>
                            <div className="d-flex justify-content-between">
                                <select className=" mr-1" name="number">
                                    {this.state.dataNumber.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                                <select className=" mr-1" name="month">
                                    {this.state.date.month.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                                <select className="" name="year">
                                    {this.state.dataYear.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </div>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Номер паспорта:</p>
                            <input type="text" placeholder="12121215" />
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Дата выдачи:</p>
                            <div className="d-flex justify-content-between">
                                <select className="mr-1" name="number">
                                    {this.state.dataNumber.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                                <select className="mr-1" name="month">
                                    {this.state.date.month.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                                <select className="" name="year">
                                    {this.state.dataYear.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </div>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Страна проживания:</p>
                            <input className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0" type="text" />
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Родной город:</p>
                            <div className="d-flex">
                                <select className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-6 mr-1" name="country">
                                    <option value="Грузия">Грузия</option>
                                </select>
                                <input className="w-100" type="text" />
                            </div>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">Языки:</p>
                            <select className="w-100" name="language">
                                {this.state.language.map((element, index) =>
                                    <option value={element}>{element}</option>
                                )}
                            </select>
                            <p className="d-xl-none d-lg-none d-md-none d-sm-block d-block mb-0">О себе:</p>
                            <textarea name="" id="" cols="66" rows="5"></textarea>
                            <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center ">
                                <button className="col-8 mb-5">Сохранить Изменения</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileBasicInformation = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileBasicInformationClass);

export default DriverProfileBasicInformation;