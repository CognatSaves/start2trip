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
            tour: ["", "", "", "", "", "",],
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
                    <div className="settingsBody">
                        <div className="tourContent col-lx-9 col-lg-9 col-md-9 col-sm-12 col-12 pt-2">
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Добавление тура</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-0">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Название тура:</p>
                                <input className="pl-0" type="text" />
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Маршрут</p>
                            </div>
                            <div className="d-flex flex-column justify-content-center mb-0">
                                {this.state.cities.map((element, index) =>
                                    <React.Fragment>
                                        <div className="mb-0">
                                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Населённый пункт:</p>
                                                <input className="pl-0" type="text" id="city" value={this.state.cities[index].city} onChange={this.changeAllValue.bind(this, index)} />
                                                <div style={{ display: index ? "block" : "none" }} className={index ? "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0 mt-4 " : "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0 "} onClick={() => { this.deleteCity(index) }}>Удалить город</div>
                                            </div>
                                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-0">
                                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Описание:</p>
                                                <textarea className=" pl-0" name="" id="description" cols="30" rows="10" value={this.state.cities[index].description} onChange={this.changeAllValue.bind(this, index)}></textarea>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}
                                <div className="tourContentAdd d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center mb-0">
                                    <p className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-5 pl-lg-5 pl-md-5 p-sm-0 p-0" onClick={this.addCity}>+ Добавить населённый пункт</p>
                                </div>
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Расписание</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row-reverse flex-row-reverse align-items-center">
                                <div className="tourContentCheckbox">
                                    <label htmlFor="tourContentCheckbox">
                                        <input  id="tourContentCheckbox" type="checkbox" />
                                        <span />
                                    </label>
                                </div>
                                <div className="d-xl-flex d-lg-flex d-md-flex d-sm-block d-block align-items-center ml-2 mb-0">
                                    <span className="p-1">Нет конкретных дат</span>
                                    <p>(индивидуальные даты или даты по запросу)</p>
                                </div>
                            </div>
                            <div className="d-flex flex-column mb-0">
                                {this.state.departureDate.map((el, index) =>
                                    <React.Fragment>
                                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-0 mt-2">
                                            <p className="col-4 pl-0">Дата отправления:</p>
                                            <div className="d-flex ">
                                                <select className="mr-1" id="day" value={this.state.departureDate[index].day} onChange={this.changeAllValue.bind(this, index)} name="day">
                                                    {this.state.dataNumber.map((element, indexes) =>
                                                        <option value={element}>{element}</option>
                                                    )}
                                                </select>
                                                <select className="mr-1" id="month" value={this.state.departureDate[index].month} onChange={this.changeAllValue.bind(this, index)} name="month">
                                                    {this.state.date.month.map((element, index) =>
                                                        <option value={element}>{element}</option>
                                                    )}
                                                </select>
                                                <select className="" id="year" value={this.state.departureDate[index].year} onChange={this.changeAllValue.bind(this, index)} name="year">
                                                    {this.state.dataYear.map((element, index) =>
                                                        <option value={element}>{element}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div style={{ display: index ? "block" : "none" }} className={index ? "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0 mt-2" : "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0 "} onClick={() => { this.deleteDepartureDate(index) }}>Удалить Дату</div>
                                        </div>
                                    </React.Fragment>
                                )}
                                <div className="tourContentAdd d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center mb-0">
                                    <p className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-5 pl-lg-5 pl-md-5 p-sm-0 pl-2" onClick={this.addDepartureDate}>+ Добавить даты</p>
                                </div>
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Дополнительная информация</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Стоимость тура:</p>
                                <div className="d-flex">
                                    <input className=" mr-xl-1 mr-lg-1 mr-md-1 mr-sm-5 mr-5" type="text" />
                                    <input className="" type="text" />
                                </div>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Тип транспорта:</p>
                                <input className="pl-0" type="text" />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Количество мест:</p>
                                <input className="pl-0" type="text" />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Дополнительное описание:</p>
                                <textarea className="pl-0" name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <p className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Загрузить фото:</p>
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                            </div>
                            <div className="tourContentAddButton d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center">
                                <p className="col-4 d-xl-block d-lg-block d-md-block d-sm-none d-none"></p>
                                <button className="col-8 mb-4">ДОБАВИТЬ ТУР</button>
                                <p className="ml-3" onClick={this.toggle}>Отмена</p>
                            </div>
                        </div>
                    </div>
                </Collapse>
                <div className="tourBodyElement">
                    <div className="tourBodyElementTitle d-flex align-items-center">
                        <p>Ваши туры</p>
                    </div>

                    <div className="p-0 d-flex flex-wrap col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        {this.state.tour.map((element, index) =>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 p-2">
                            <div className="filledCard d-flex flex-column p-0">
                                <div className="filledCardInformation d-flex flex-column">
                                    <div className="filledCardInformationNameCar d-flex d-flex justify-content-end w-100 align-items-center">
                                        
                                        <label className="cardInformationNameCarIcon"></label>
                                        <div className="filledCardInformationMenu">
                                            <p className="filledCardInformationDeleteCar">Удалить</p>
                                            <p className="filledCardInformationNameCarEdit">Редактировать</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="filledCardImg">
                                    <img src={georgiaImg} alt="imgCar" width="100%" height="100%" />
                                </div>
                                
                               
                                <div className="cardInformationType d-flex flex-column">
                                <p>Кутаиси-Боржоми-Тбилиси</p>
                                <Stars value={5.0 - index} commentNumber={22 + " отзывов"} valueDisplay="block" commentNumberDisplay="block" />
                                    <div className="settingsTourHeader d-flex pr-1">
                                        <p>Свободных мест:</p>
                                        <p>15</p>
                                    </div>
                                    <div className="settingsTourPlace d-flex">
                                        <p>Кутаиси, Храм Баграти, Монастырь Гелати, Цхалтубо, Пещера Прометей</p>
                                    </div>
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