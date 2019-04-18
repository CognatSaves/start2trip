import React from 'react';
import './DriverProfileTripSettingsTour.css'
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import georgiaImg from './img/bg.jpg'
import Stars from '../stars/Stars'
import LocationSearchInput from '../home/HomeBody/Search'
import { isMobile } from 'react-device-detect';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';




class DriverProfileTripSettingsTourClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            typeCar: "sedan",
            cities: [{ city: "", description: "" },],
            departureDate: [{ day: "1", month: "Январь", year: "2019" },],
            tour: ["", "", "", "", "", "",],
            chipData: [
                { key: 0, label: 'samcxe jaxaheti' },
                { key: 1, label: 'kvemo samegrelo' },
                { key: 2, label: 'minsk' },
                { key: 3, label: 'molodechno samegrelo samcxe' },
            ],
        }
        this.toggle = this.toggle.bind(this);
        this.addCity = this.addCity.bind(this);
        this.deleteCity = this.deleteCity.bind(this);
        this.addDepartureDate = this.addDepartureDate.bind(this);
        this.deleteDepartureDate = this.deleteDepartureDate.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(event) {
        debugger
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
        if (isMobile) {
            window.scroll(0, 300);
        } else {
            window.scroll(0, 322);
        }
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

    handleChange = (event, index, value) => { this.setState({ typeCar: value }); console.log(this.state.typeCar) };
    handleRequestDelete = (key) => {

        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({ chipData: this.chipData });
    };



    render() {

        return (
            <React.Fragment>
                <Collapse isOpen={this.state.collapse}>
                    <div className="tourBodyElementTitle d-flex justify-content-center align-items-center">
                        <p>Добавление тура</p>
                    </div>
                    <div className="tourSettingsBody">
                        <form onSubmit={this.formSubmit} id="newTourForm" className="tourContent col-lx-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Добавление тура</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-0">
                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Название тура:</label>
                                <input className="pl-0" type="text" required />
                            </div>
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                {/* <p>Маршрут</p> */}
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pt-2 pl-0">Достопримичательности по маршруту:</label>
                                <div className="d-flex col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 p-0">
                                    <LocationSearchInput classDropdown="searchDropdownDriverTour" id="ww" />
                                </div>
                                {/* <input className="pl-0 mt-3" type="text" id="city" value={this.state.cities[index].city} onChange={this.changeAllValue.bind(this, index)} required/> */}
                                {/* <div style={{ display: index ? "block" : "none" }} className={index ? "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-2 mt-2" : "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0 "} onClick={() => { this.deleteCity(index) }}>Удалить город</div> */}
                            </div>
                            <div className="d-flex justify-content-end">
                                <div className="d-flex flex-wrap flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start col-8 p-0 mb-2">

                                        {this.state.chipData.map((element, index) =>
                                            <Chip
                                                key={element.key}
                                                onRequestDelete={() => this.handleRequestDelete(element.key)}
                                                labelStyle={{ color: "#686868" }}
                                                labelColor="#f60"
                                                textColor="#304269"
                                                className="chipClass"
                                            >
                                                {element.label}
                                            </Chip>
                                        )}

                                </div>
                            </div>

                            {/* <div className="d-flex flex-column justify-content-center mb-0">
                                {this.state.cities.map((element, index) =>
                                    <React.Fragment>
                                        <div className="mb-0">
                                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pt-2 pl-0">Населённый пункт:</label>
                                                <LocationSearchInput address={this.state.cities[index].city} changeCity={this.changeAllValue.bind(this, index)} classDropdown="searchDropdownDriverInformation" />
                                                {/* <input className="pl-0 mt-3" type="text" id="city" value={this.state.cities[index].city} onChange={this.changeAllValue.bind(this, index)} required/> 
                                                <div style={{ display: index ? "block" : "none" }} className={index ? "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-2 mt-2" : "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0 "} onClick={() => { this.deleteCity(index) }}>Удалить город</div>
                                            </div>
                                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-0">
                                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Описание:</label>
                                                <textarea className=" pl-0" name="" id="description" cols="30" rows="3" value={this.state.cities[index].description} onChange={this.changeAllValue.bind(this, index)} required />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )} */}
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-0">
                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Описание:</label>
                                <textarea className=" pl-0" name="" id="description" cols="30" rows="3" />
                                {/* value={this.state.cities[index].description} onChange={this.changeAllValue.bind(this, index)} */}
                            </div>

                            {/* <div className="tourContentAdd d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center mb-0">
                                    <span className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 p-0 pl-xl-4 pl-lg-4 pl-md-4" onClick={this.addCity}>+ Добавить населённый пункт</span>
                                </div>
                            </div> */}
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Расписание</p>
                            </div>
                            <div className="d-flex flex-column ">
                                <div className="d-flex">
                                    <div className="tourContentCheckbox">
                                        <label htmlFor="tourContentCheckbox">
                                            <input id="tourContentCheckbox" type="checkbox" />
                                            <span />
                                        </label>
                                    </div>
                                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-block d-block align-items-center ml-1 mb-0">
                                        <span className="">Ежедневно</span>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="tourContentCheckbox">
                                        <label htmlFor="tourThisDay">
                                            <input id="tourThisDay" type="checkbox" />
                                            <span />
                                        </label>
                                    </div>
                                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-block d-block align-items-center ml-1 mb-0">
                                        <span className="">По определённым датам</span>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="d-flex flex-column mb-0">
                                {this.state.departureDate.map((el, index) =>
                                    <React.Fragment>
                                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-0 mt-2">
                                            <p className="col-4 pl-0 pt-2">Дата отправления:</p>
                                            <div className="d-flex mb-0">
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
                                            <div style={{ display: index ? "block" : "none" }} className={index ? "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0 mt-2" : "tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0  mt-xl-4 mt-lg-4 mt-md-4 mt-sm-2 mt-2"} onClick={() => { this.deleteDepartureDate(index) }}>Удалить Дату</div>
                                        </div>
                                    </React.Fragment>
                                )}
                                <div className="tourContentAdd d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center mb-0">
                                    <p className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 pl-xl-4 pl-lg-4 pl-md-4 p-0" onClick={this.addDepartureDate}>+ Добавить даты</p>
                                </div>
                            </div> */}
                            <div className="tourContentTitle d-flex align-items-center mb-0">
                                <p>Дополнительная информация</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Стоимость тура:</label>
                                <div className="d-flex">
                                    <input className=" mr-xl-1 mr-lg-1 mr-md-1 mr-sm-5 mr-5" type="text" required />
                                    <input className="" type="text" required />
                                </div>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Тип транспорта:</label>
                                <DropDownMenu
                                    value={this.state.typeCar}
                                    hintText="Тип автомобиля"
                                    onChange={this.handleChange}
                                    style={{ width: "100%" }}
                                    className="dropdownClass"
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                >
                                    <MenuItem value={"sedan"} primaryText={"Седан"} />
                                    <MenuItem value={"microbus"} primaryText={"Микроавтобус"} />
                                    <MenuItem value={"minivan"} primaryText={"Минивэн"} />
                                    <MenuItem value={"jeep"} primaryText={"Внедорожник"} />

                                </DropDownMenu>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Количество мест:</label>
                                <input className="pl-0" type="text" />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="col-xl-4 col-lg-4 col-md-4 col-sm-11 col-11 pl-0">Загрузить фото:</label>
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                            </div>
                            <div className="tourContentAddButton d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center">
                                <span className="col-4 d-xl-block d-lg-block d-md-block d-sm-none d-none" />
                                <button htmlFor="newTourForm" type="submit" className="col-8 mb-4">ДОБАВИТЬ ТУР</button>
                                <span className="ml-3" onClick={this.toggle}>Отмена</span>
                            </div>
                        </form>
                    </div>
                </Collapse>
                <div className="tourBodyElement">
                    <div className="p-0 d-flex  justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-wrap col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div style={{ display: this.state.collapse ? "none" : "block" }} onClick={this.toggle} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" >
                            <div className="filledCard d-flex flex-column p-0">
                                <div className="filledCardImgAdd d-flex justify-content-center align-items-center">
                                    <div className="filledCardImgAddBg">
                                        <span />
                                    </div>
                                    <img src={georgiaImg} className="img-fluid" alt="imgCar" width="100%" height="100%" />
                                </div>
                                <div className="cardInformationType d-flex flex-column">
                                    <p>Название Тура</p>
                                    <Stars value={5.0} commentNumber={22 + " отзывов"} valueDisplay="block" commentNumberDisplay="block" />
                                    <div className="settingsTourHeader d-flex pr-1">
                                        <p>Колличество свободных мест</p>
                                    </div>
                                    <div className="settingsTourPlace d-flex mb-3">
                                        <p>Города которые будет посещать тур</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.tour.map((element, index) =>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
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
                                        <img src={georgiaImg} className="img-fluid" alt="imgCar" width="100%" height="100%" />
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
            </React.Fragment>
        );
    }
}

const DriverProfileTripSettingsTour = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTourClass);

export default DriverProfileTripSettingsTour;