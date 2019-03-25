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
import editBlueIcon from './img/editBlue.svg'



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
            seat: { icon: seatIcon, title: "Машина оборудованна кожанными седеньями" },
            snowflake: { icon: snowflakeIcon, title: "В машине есть кондиционер" },
            wifi: { icon: wifiIcon, title: "Машина оборудована WiFi" },
            no_smoking: { icon: no_smokingIcon, title: "Не курящий водитель" },
            comfort: [
                { icon: seatIcon, title: "Машина оборудованна кожанными седеньями" },
                { icon: snowflakeIcon, title: "В машине есть кондиционер" },
                { icon: wifiIcon, title: "Машина оборудована WiFi" },
                { icon: no_smokingIcon, title: "Не курящий водитель" },
            ],
            file: '',
            imagePreviewUrl: '',
        }
        this.getMassNumbers.bind(this);
        this.getMassYear.bind(this);
        this.addNum.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
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

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        debugger;
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="driverProfileCarAddNewCarPhotoCarImg" />);
        }

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
                            <div className="driverProfileCarFilledCardInformationNameCarEdit">
                                <p>Редактировать</p>
                            </div>
                        </div>
                        <div className="driverProfileCarFilledCardInformationCommon">
                            <div className="d-flex justify-content-between align-content-center">
                                <p>Тип автомобиля:</p>
                                <div className="d-flex">
                                    <div style={{ backgroundImage: "url(" + sedanIcon + ")" }} className="driverProfileCarFilledCardInformationCommonImg"></div>
                                    <p>Седан</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Тип топлива:</p>
                                <p>Бинзин</p>
                            </div>
                            <div className="driverProfileCarFilledCardInformationComfort d-flex align-items-center justify-content-between">
                                <p>Удобства:</p>
                                <div className="driverProfileCarFilledCardInformationComfortImg d-flex align-items-center">
                                    {this.state.comfort.map((element, index) =>
                                        <img src={element.icon} width="18px" height="18px" title={element.title} alt="icon" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="driverProfileCarFilledCardInformationDeleteCar">Удалить автомобиль</p>
                    </div>
                </div>
                <div className="driverProfileCarAddNewCar d-flex align-items-start col-12">
                    <div className="driverProfileCarAddNewCarPhotoCar" >
                        {$imagePreview}
                        <label htmlFor="addCarFile" >+Добавить фото автомобиля</label>
                        <input type="file" id="addCarFile" style={{ display: "none" }} onChange={this._handleImageChange}/>
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