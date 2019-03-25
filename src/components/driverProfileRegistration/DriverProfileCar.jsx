import React, { Component } from 'react';
import './DriverProfileCar.css'
import { connect } from 'react-redux';
import imgCar from './img/images.jpeg'
import jeepIcon from './img/jeep.svg'
import microbusIcon from './img/microbus.svg'
import minivanIcon from './img/minivan.svg'
import sedanIcon from './img/sedan.svg'
import no_smokingIcon from './img/no-smoking.svg'
import seatIcon from './img/seat.svg'
import snowflakeIcon from './img/snowflake.svg'
import wifiIcon from './img/wifi.svg'



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
            comfort:[no_smokingIcon,seatIcon,snowflakeIcon,wifiIcon],

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
                <div className="driverProfileCarFilledCard d-flex align-items-center col-12">
                    {/* TODO отрисовка автомобилей */}
                    <div className="driverProfileCarFilledCardImg">
                        <img src={imgCar} alt="imgCar" />
                    </div>
                    <div className="driverProfileCarFilledCardInformation d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <div className="driverProfileCarFilledCardInformationNameCar d-flex flex-column ">
                                <p>Toyota Prius, 2008</p>
                                <p>WWW-888-WWW</p>
                            </div>
                            <div>
                                <p>Редактировать</p>
                            </div>
                        </div>
                        <div className="driverProfileCarFilledCardInformationCommon">
                            <div className="d-flex justify-content-between align-content-center">
                                <p>Тип автомобиля:</p>
                                <div className="d-flex">
                                    <div style={{backgroundImage:"url("+ sedanIcon +")"}} className="driverProfileCarFilledCardInformationCommonImg"></div>
                                    <p>Седан</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Тип топлива:</p>
                                <p>Бинзин</p>                        
                            </div>
                            <div className="driverProfileCarFilledCardInformationComfort d-flex justify-content-between">
                                <p>Удобства:</p>
                                <div>
                                    {this.state.comfort.map((elment,index)=>
                                        <img src="" alt=""/>
                                        )}
                                </div>
                            </div>
                        </div>
                        <p className="driverProfileCarFilledCardInformationDeleteCar">Удалить автомобиль</p>
                    </div>
                </div>
                <div className="driverProfileCarAddNewCar d-flex">
                    <div>
                        <input type="file" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="d-flex">
                            <p>Марка автомобиля:</p>
                            <input type="text" />
                        </div>
                        <div className="d-flex">
                            <p>Год автомобиля:</p>
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