import React from 'react';
import './DriverProfileTripSettingsTour.css'
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import georgiaImg from './img/bg.jpg'
import Stars from '../stars/Stars'



class DriverProfileTripSettingsTourClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            cities: [{ city: "", description: "" },],
            departureDate: [{ day: "1", month: "Январь", year: "2019" },],
            date: {
                month: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Декабрь"],
            },
            dataNumber: [],
            dataYear: [],
            tour:["","","","","","",],
        }
        this.toggle = this.toggle.bind(this);
        this.addCity = this.addCity.bind(this);
        this.deleteCity = this.deleteCity.bind(this);
        this.addDepartureDate = this.addDepartureDate.bind(this);
        this.deleteDepartureDate = this.deleteDepartureDate.bind(this);
        this.getMassNumbers.bind(this);
        this.getMassYear.bind(this);
        this.addNum.bind(this)
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    addCity() {
        let newArrayCity = this.state.cities;
        newArrayCity.push({ city: "", itemRadius: "" })
        this.setState({
            cities: newArrayCity,
        })
    }

    deleteCity(index) {
        let newArrayCity = this.state.cities;
        newArrayCity.splice(index, 1);
        this.setState({
            cities: newArrayCity,
        })
    }

    addDepartureDate() {
        let newArrayDepartureDate = this.state.departureDate;
        newArrayDepartureDate.push({ day: "1", month: "Январь", year: "2019" })
        this.setState({
            departureDate: newArrayDepartureDate,
        })
    }

    deleteDepartureDate(index) {
        debugger
        let newArrayDepartureDate = this.state.departureDate;
        newArrayDepartureDate.splice(index, 1);
        this.setState({
            departureDate: newArrayDepartureDate,
        })
    }

    changeAllValue(index, e) {
        let newArrayCity = this.state.cities.slice();
        let newArraydepartureDate = this.state.departureDate.slice();
        switch (e.currentTarget.id) {
            case "city": {
                newArrayCity[index].city = e.currentTarget.value;
                this.setState({ cities: newArrayCity });
                break;
            }
            case "description": {
                newArrayCity[index].description = e.currentTarget.value;
                this.setState({ cities: newArrayCity });
                break;
            }
            case "day": {
                newArraydepartureDate[index].day = e.currentTarget.value;
                this.setState({ departureDate: newArraydepartureDate });
                break;
            }
            case "month": {
                newArraydepartureDate[index].month = e.currentTarget.value;
                this.setState({ departureDate: newArraydepartureDate });
                break;
            }
            case "year": {
                newArraydepartureDate[index].year = e.currentTarget.value;
                this.setState({ departureDate: newArraydepartureDate });
                break;
            }
        }
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
        for (let i = num; i < 2023; i++) {
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
            <div>
                <div style={{ opacity: this.state.collapse ? "0" : "1" }} className="col-12 d-flex justify-content-center p-0">
                    <button className="addTourShow" onClick={this.toggle}>Добавить Тур</button>
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <div className="driverProfileTripSettingsBody">
                        <div className="driverProfileTripSettingsTourContent col-12 pt-2">
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Добавление тура</p>
                            </div>
                            <div className="d-flex align-items-center mb-0">
                                <p className="col-3 pl-0">Название тура:</p>
                                <input className="col-6 pl-0" type="text" />
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Маршрут</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center mb-0">
                                {this.state.cities.map((element, index) =>
                                    <React.Fragment>
                                        <div className="mb-0">
                                            <div className="d-flex align-items-center">
                                                <p className="col-3 pl-0">Населённый пункт:</p>
                                                <input className="col-6 pl-0" type="text" id="city" value={this.state.cities[index].city} onChange={this.changeAllValue.bind(this, index)} />
                                                <div style={{ display: index ? "block" : "none" }} className={index ? "driverProfileTripSettingsContentDeletButton col-3 mb-0 mt-4 " : "driverProfileTripSettingsContentDeletButton col-3 mb-0 "} onClick={() => { this.deleteCity(index) }}>Удалить город</div>
                                            </div>
                                            <div className="d-flex align-items-start mb-0">
                                                <p className="col-3 pl-0">Описание:</p>
                                                <textarea className="col-6 pl-0" name="" id="description" cols="30" rows="10" value={this.state.cities[index].description} onChange={this.changeAllValue.bind(this, index)}></textarea>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}
                                <div className="tourContentAdd d-flex justify-content-center col-9 pl-0 mb-0">
                                    <p className="pl-1" onClick={this.addCity}>+ Добавить населённый пункт</p>
                                </div>
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Расписание</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <input type="checkbox" />
                                <span className="p-1">Нет конкретных дат</span><p>(индивидуальные даты или даты по запросу)</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center mb-0">
                                {this.state.departureDate.map((el, index) =>
                                    <React.Fragment>
                                        <div className="d-flex align-items-center col-12 mb-0 mt-2">
                                            <p className="col-3 pl-0">Дата отправления:</p>
                                            <select className="col-2 mr-1" id="day" value={this.state.departureDate[index].day} onChange={this.changeAllValue.bind(this, index)} name="day">
                                                {this.state.dataNumber.map((element, indexes) =>
                                                    <option value={element}>{element}</option>
                                                )}
                                            </select>
                                            <select className="col-2 mr-1" id="month" value={this.state.departureDate[index].month} onChange={this.changeAllValue.bind(this, index)} name="month">
                                                {this.state.date.month.map((element, index) =>
                                                    <option value={element}>{element}</option>
                                                )}
                                            </select>
                                            <select className="col-2 mr-1" id="year" value={this.state.departureDate[index].year} onChange={this.changeAllValue.bind(this, index)} name="year">
                                                {this.state.dataYear.map((element, index) =>
                                                    <option value={element}>{element}</option>
                                                )}
                                            </select>
                                            <div style={{ display: index ? "block" : "none" }} className={index ? "driverProfileTripSettingsContentDeletButton col-3 mb-0 mt-2" : "driverProfileTripSettingsContentDeletButton col-3 mb-0 "} onClick={() => { this.deleteDepartureDate(index) }}>Удалить Дату</div>
                                        </div>
                                    </React.Fragment>
                                )}
                                <div className="tourContentAdd d-flex justify-content-center col-7 pl-5 mb-0">
                                    <p className="pl-2" onClick={this.addDepartureDate}>+ Добавить даты</p>
                                </div>
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Дополнительная информация</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 pl-0">Стоимость тура:</p>
                                <input className="col-3 mr-1" type="text" />
                                <input className="col-3" type="text" />
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 pl-0">Тип транспорта:</p>
                                <input className="col-6 pl-0" type="text" />
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 pl-0">Количество мест:</p>
                                <input className="col-6 pl-0" type="text" />
                            </div>
                            <div className="d-flex align-items-start">
                                <p className="col-3 pl-0">Дополнительное описание:</p>
                                <textarea className="col-6 pl-0" name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 pl-0">Загрузить фото:</p>
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                            </div>
                            <div className="tourContentAddButton d-flex">
                                <p className="col-3"></p>
                                <button className="col-8 mb-4">ДОБАВИТЬ ТУР</button>
                                <p className="ml-3" onClick={this.toggle}>Отмена</p>
                            </div>
                        </div>
                    </div>
                </Collapse>
                <div className="driverProfileTripSettingsTourBodyElement">
                    <div className="TourBodyElementTitle d-flex align-items-center">
                        <p>Ваши туры</p>
                    </div>

                    <div className="container p-0 d-flex flex-wrap">
                {this.state.tour.map((element, index) =>
                    <div className="driverProfileCarFilledCard d-flex flex-column col-3 p-0">
                        <div className="driverProfileCarFilledCardInformation d-flex flex-column">
                            <div className="driverProfileCarFilledCardInformationNameCar d-flex justify-content-between align-items-center">
                                <p>Кутаиси-Боржоми-Тбилиси</p>
                                <label className="cardInformationNameCarIcon"></label>
                                <div className="driverProfileCarFilledCardInformationMenu">
                                    <p className="driverProfileCarFilledCardInformationDeleteCar">Удалить</p>
                                    <p className="driverProfileCarFilledCardInformationNameCarEdit">Редактировать</p>
                                </div>
                            </div>
                        </div>
                        <div className="driverProfileCarFilledCardImg">
                            <img src={georgiaImg} alt="imgCar" width="100%" height="100%" />
                        </div>
                        <Stars value={5.0 - index} commentNumber={22 + " отзывов"} valueDisplay="block" commentNumberDisplay="block" />
                        <div className="cardInformationType d-flex">
                            <div className=" d-flex flex-column align-content-center pr-1">
                                <p>Дата отправления:</p>
                                <p>Свободных мест:</p>
                                <p>Стоимость тура:</p>
                            </div>
                            <div className="driverProfileCarFilledCardInformationComfort d-flex flex-column align-items-start ">
                                <p>Ср, 21 Февраля</p>
                                <p>15</p>
                                <p>$188</p>
                            </div>
                        </div>
                    </div>
                )}
                </div>
                    {// TODO доделать render Element 
                    }
                    
                   
                </div>
            </div>
        );
    }
}

const DriverProfileTripSettingsTour = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTourClass);

export default DriverProfileTripSettingsTour;