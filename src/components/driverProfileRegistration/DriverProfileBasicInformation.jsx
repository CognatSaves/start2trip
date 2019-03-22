import React, { Component } from 'react';
import './DriverProfileBasicInformation.css'
import { connect } from 'react-redux';
import imgPerson from './img/drivers_body_photo.png'




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
        let newDataNumber = this.getMassNumbers(31);
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
            <div className="driverProfileBasicInformationBody d-flex flex-column">
                <div className="driverProfileBasicInformationBodyTop d-flex ">
                    <div>
                    <label className="driverProfileBasicInformationBodyTopImg" htmlFor="addFile">Обновить фотографию</label>
                        <img className="driverProfileBasicInformationBodyTopImgHover" src={imgPerson} alt="imgPerson" />
                        {/* <label className="edditIcon" htmlFor="addFile"></label> */}
                        <input type="file" id="addFile" style={{display:"none"}}/>
                    </div>
                    <div>
                        <div>
                            <p>Валерий</p>
                            {/* TODO stars */}
                        </div>
                        <div>
                            {/* TODO Location */}
                        </div>
                        <div className="d-flex ">
                            <div className="d-flex flex-column">
                                <p>Всего поездок</p>
                                <p>18</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p>Предстоящие поездки</p>
                                <p>8</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="driverProfileBasicInformationBodyBottom d-flex flex-column mb-5">
                    <div className="driverProfileBasicInformationBodyBottomHeader">
                        <p>Редактировать профиль</p>
                    </div>
                    <div className="driverProfileBasicInformationBodyBottomContent d-flex flex-column">
                        <div className="d-flex align-items-center mb-3 mt-4">
                            <p className="col-3">Имя:</p>
                            <input type="text" />
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <p className="col-3">Фамилия:</p>
                            <input type="text" />
                        </div>
                        <div className="d-flex align-items-center mb-4">
                            <p className="col-3">Дата рождения:</p>
                            <p>
                                <select name="number">
                                    {this.state.dataNumber.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </p>
                            <p>
                                <select name="month">
                                    {this.state.date.month.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </p>
                            <p>
                                <select name="year">
                                    {this.state.dataYear.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </p>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <p className="col-3">Номер паспорта</p>
                            <input type="text" placeholder="12121215" />
                        </div>
                        <div className="d-flex align-items-center mb-4">
                            <p className="col-3">Дата выдачи:</p>
                            <p>
                                <select name="number">
                                    {this.state.dataNumber.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </p>
                            <p>
                                <select name="month">
                                    {this.state.date.month.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </p>
                            <p>
                                <select name="year">
                                    {this.state.dataYear.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </p>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <p className="col-3">Родной город:</p>
                            <p>
                                <select name="country">
                                    <option value="Грузия">Грузия</option>
                                </select>
                            </p>
                            <input type="text" />
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <p className="col-3">Языки:</p>
                            <p>
                                <select name="language">
                                    {this.state.language.map((element, index) =>
                                        <option value={element}>{element}</option>
                                    )}
                                </select>
                            </p>

                        </div>
                        <div className="d-flex align-items-start mb-4">
                            <p className="col-3">О себе:</p>
                            <textarea name="" id="" cols="25" rows="5"></textarea>
                        </div>
                        <button className="mb-5">Сохранить Изменения</button>
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