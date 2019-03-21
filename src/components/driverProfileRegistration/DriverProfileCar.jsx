import React, { Component } from 'react';
import './DriverProfileCar.css'
import { connect } from 'react-redux';




class DriverProfileCarClass extends React.Component {
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
        for (let i = num; i < 2019; i++) {
            number.push(i)
        }
        return number;
    }

    addNum() {
        let newDataNumber = this.getMassNumbers(31);
        let newdataYear = this.getMassYear(1919);
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
            <div>
                <div className="d-flex">
                    {/* TODO отрисовка автомобилей */}
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="d-flex">
                            <div className="d-flex flex-column">
                                <p>Toyota Prius,2008</p>
                                <p>WWW-888-WWW</p>
                            </div>
                            <div>
                                <p>Редактировать</p>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex">
                                <p>Тип автомобиля:</p>
                                <p>Седан</p>
                            </div>
                            <div className="d-flex">
                                <p>Тип топлива:</p>
                                <p>Бинзин</p>
                            </div>
                            <div className="d-flex">
                                <p>Удобства:</p>
                                <div></div>
                            </div>
                        </div>
                        <p>Удалить автомобиль</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <input type="file" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="d-flex">
                            <p>Марка автомобиля:</p>
                            <input type="text" />
                        </div>
                        <div className="d-flex">
                            <p>Номер автомобиля:</p>
                            <input type="text" />
                        </div>
                        <div className="d-flex">
                            <p>Тип автомобиля:</p>
                            <input type="text" />
                        </div>
                        <div className="d-flex">
                            <p>Тип топлива:</p>
                            <input type="text" />
                        </div>
                        <div className="d-flex">
                            <p>Удобства:</p>
                            <div className="d-flex flex-column">
                                <input type="radio" name="comfort" id="comfort1" />
                                <label htmlFor="comfort1"></label>
                                <input type="radio" name="comfort" id="comfort2" />
                                <label htmlFor="comfort2"></label>
                                <input type="radio" name="comfort" id="comfort3" />
                                <label htmlFor="comfort3"></label>
                                <input type="radio" name="comfort" id="comfort4" />
                                <label htmlFor="comfort4"></label>
                                <input type="radio" name="comfort" id="comfort5" />
                                <label htmlFor="comfort5"></label>
                            </div>
                        </div>
                        <button>Добавить Автомобиль</button>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileCar = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileCarClass);

export default DriverProfileCar;