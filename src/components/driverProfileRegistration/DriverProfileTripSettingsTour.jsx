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
import TextField from 'material-ui/TextField';
import MultipleDatePicker from 'react-multiple-datepicker'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once






class DriverProfileTripSettingsTourClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            calendarModal: false,
            tourContentEveryday: false,
            tourContentOther: false,
            currency: ["USD", "EUR", "GEL", "RUB",],
            activeCurrency: "USD",
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
            dateTour: [],
            newTourEverydayTime: "Выберите время",
            newTourDatepickerTime: "Выберите время",
            time: [
                "00:00", "00:15", "00:30", "00:45",
                "01:00", "01:15", "01:30", "01:45",
                "02:00", "02:15", "02:30", "02:45",
                "03:00", "03:15", "03:30", "03:45",
                "04:00", "04:15", "04:30", "04:45",
                "05:00", "05:15", "05:30", "05:45",
                "06:00", "06:15", "06:30", "06:45",
                "07:00", "07:15", "07:30", "07:45",
                "08:00", "08:15", "08:30", "08:45",
                "09:00", "09:15", "09:30", "09:45",
                "10:00", "10:15", "10:30", "10:45",
                "11:00", "11:15", "11:30", "11:45",
                "12:00", "12:15", "12:30", "12:45",
                "13:00", "13:15", "13:30", "13:45",
                "14:00", "14:15", "14:30", "14:45",
                "15:00", "15:15", "15:30", "15:45",
                "16:00", "16:15", "16:30", "16:45",
                "17:00", "17:15", "17:30", "17:45",
                "18:00", "18:15", "18:30", "18:45",
                "19:00", "19:15", "19:30", "19:45",
                "20:00", "20:15", "20:30", "20:45",
                "21:00", "21:15", "21:30", "21:45",
                "22:00", "22:15", "22:30", "22:45",
                "23:00", "23:15", "23:30", "23:45",
            ],
        }

        this.toggle = this.toggle.bind(this);
        this.addCity = this.addCity.bind(this);
        this.deleteCity = this.deleteCity.bind(this);
        this.addDepartureDate = this.addDepartureDate.bind(this);
        this.deleteDepartureDate = this.deleteDepartureDate.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.addDate = this.addDate.bind(this);
    }

    formSubmit(event) {
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

    calendarModalShow = () => {
        this.setState({ calendarModal: !this.state.calendarModal });
    };

    handleChange = (event, index, value) => { this.setState({ typeCar: value }) };

    handleChangenEverydayTime = (event, index, value) => { this.setState({ newTourEverydayTime: value }) };

    handleChangeDatepickerTime = (event, index, value) => {this.setState({ newTourDatepickerTime: value }) };

    handleChangeCurrency = (event, index, value) => { this.setState({ activeCurrency: value }) };

    handleRequestDelete = (key) => {

        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({ chipData: this.chipData });
    };

    addDate = (dates) => {
        let newDate = this.state.dateTour;
        let needAddDate = true;
        if (newDate.length) {
            for (let i = 0; i < newDate.length; i++) {
                if (dates.getDate() == newDate[i].getDate() && dates.getMonth() == newDate[i].getMonth() && dates.getFullYear() == newDate[i].getFullYear()) {
                    newDate.splice(i, 1);
                    needAddDate = false;
                    break;
                }
            };
            if (needAddDate) {
                newDate.push(dates);
            }
        } else {
            newDate.push(dates);
        }
    }

    handleRequestDeleteDate = (key) => {

        this.dateTour = this.state.dateTour;
        const dateTourToDelete = this.dateTour.map((chip) => chip.key).indexOf(key);
        this.dateTour.splice(dateTourToDelete, 1);
        this.setState({ dateTour: this.dateTour });
    };






    render() {
        const MultipleDatesCalendar = withMultipleDates(Calendar);
        var today = new Date();
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.calendarModalShow}
            />,
        ];
        const themeCalendar = {
            accentColor: '#f60',
            floatingNav: {
                background: 'rgba(56, 87, 138, 0.94)',
                chevron: '#304269',
                color: '#FFF',
            },
            headerColor: '#304269',
            selectionColor: '#304269',
            textColor: {
                active: '#FFF',
                default: '#333',
            },
            todayColor: '#f60',
            weekdayColor: '#304269',
        }
        const customContentStyle = {
            width: '100%',
            maxWidth: 'none',
        };
        const locale = {
            blank: 'Select a date...',
            headerFormat: 'ddd, MMM Do',
            todayLabel: {
                long: 'Today',
            },
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            weekStartsOn: 0,
        };

        return (
            <React.Fragment>

                <Dialog
                    actions={actions}
                    modal={false}
                    bodyStyle={{ padding: 0 }}
                    contentStyle={isMobile ? customContentStyle : ""}
                    open={this.state.calendarModal}
                    onRequestClose={this.calendarModalShow}
                >
                    <InfiniteCalendar
                        Component={MultipleDatesCalendar}
                        width={100 + "%"}
                        minDate={today}
                        theme={themeCalendar}
                        locale={locale}
                        className="newTourCalendarStyle"
                        interpolateSelection={defaultMultipleDateInterpolation}
                        selected={this.state.dateTour}
                        onSelect={this.addDate}
                    />
                </Dialog>
                <Collapse isOpen={this.state.collapse}>
                    <div className="tourSettingsBody">
                        <form onSubmit={this.formSubmit} id="newTourForm" className="tourContent col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className=" tourContentTitle d-flex align-items-center mb-0">
                                <p>Добавление тура</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mb-0">
                                <label htmlFor="nameNewTour" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Название тура:</label>
                                <TextField
                                    hintText="Пожалуйста название тура"
                                    floatingLabelText="Название тура"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}

                                />
                                <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " id="nameNewTour" type="text" />
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="newTourAttractions" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Достопримичательности по маршруту:</label>
                                <div className="d-flex col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                    <LocationSearchInput classDropdown="searchDropdownDriverTour" id="newTourAttractions" />
                                </div>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="d-flex justify-content-end col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="d-flex flex-wrap col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 p-0 mb-2">

                                    {this.state.chipData.map((element, index) =>
                                        <Chip
                                            key={element.key}
                                            onRequestDelete={() => this.handleRequestDelete(element.key)}
                                            labelStyle={{ color: "#000" }}
                                            labelColor="#f60"
                                            textColor="#304269"
                                            className="chipClass"
                                        >
                                            {element.label}
                                        </Chip>
                                    )}

                                </div>
                            </div>
                            <div className="d-flex align-items-start mb-2">
                                <label htmlFor="newTourDescription" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Описание:</label>
                                <textarea id="newTourDescription" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " name="" id="description" cols="30" rows="3" />
                                <TextField
                                    hintText="Расскажите о туре"
                                    floatingLabelText="Описание"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block multiLineInputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    multiLine={true}
                                    rows={1}
                                />
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="d-flex border-top flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start mt-3 p-0">
                                <div className="tourContentTitle d-flex align-items-center col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 p-0">
                                    <p className="mb-0">Расписание</p>
                                </div>
                                <div className="d-flex flex-column col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 p-0">
                                    <div className="d-flex col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                        <div className="tourContentCheckbox">
                                            <label htmlFor="tourContentEveryday">
                                                <input id="tourContentEveryday" checked={this.state.tourContentEveryday} onChange={() => { this.setState({ tourContentEveryday: !this.state.tourContentEveryday, tourContentOther: false }) }} type="checkbox" />
                                                <span />
                                            </label>
                                        </div>
                                        <div className="tourContentEveryday d-flex align-items-center ml-1 mb-0">
                                            <label htmlFor="newTourEveryday" onClick={() => { this.setState({ tourContentEveryday: !this.state.tourContentEveryday, tourContentOther: false }) }} className="">Ежедневно</label>
                                            <DropDownMenu
                                                value={this.state.newTourEverydayTime}
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                                onChange={this.handleChangenEverydayTime}
                                                style={{ width: "100%", display: this.state.tourContentEveryday ? "" : "none" }}
                                                menuStyle={{ maxHeight: "150px" }}
                                                className="dropdownClass"
                                                autoWidth={false}
                                                selectedMenuItemStyle={{ color: "#f60" }}
                                            >
                                                <MenuItem value="Выберите время" disabled={true} primaryText="Выберите время" />
                                                {this.state.time.map((element, index) =>
                                                    <MenuItem value={element} primaryText={element} />
                                                )}
                                            </DropDownMenu>
                                        </div>
                                    </div>
                                    <div className="d-flex col-xl-8 col-lg-8 col-md-8 col-sm-10 col-10 p-0">
                                        <div className="tourContentCheckbox">
                                            <label htmlFor="tourContentOther">
                                                <input id="tourContentOther" checked={this.state.tourContentOther} onChange={() => { this.setState({ tourContentOther: !this.state.tourContentOther, tourContentEveryday: false }) }} type="checkbox" />
                                                <span className="tourContentOtherSpan" />
                                            </label>
                                        </div>
                                        <div className="openMultipleDatepicker d-xl-flex d-lg-flex d-md-flex d-sm-block d-block flex-column justify-content-center ml-1 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-0 p-0">
                                            <label htmlFor="newTourDatepicker" onClick={() => { this.setState({ tourContentOther: !this.state.tourContentOther, tourContentEveryday: false }) }} className="mb-0 mr-2">По определённым дням</label>
                                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column  align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                                <span style={{ display: this.state.tourContentOther ? "block" : "none" }} className="col-xl-6 col-lg-7 col-md-9 col-sm-12 col-12 p-0" onClick={this.calendarModalShow}>Выбрать даты</span>
                                                <DropDownMenu
                                                    value={this.state.newTourDatepickerTime}
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                                    onChange={this.handleChangeDatepickerTime}
                                                    style={{ width: "100%", display: this.state.tourContentOther ? "" : "none" }}
                                                    menuStyle={{ maxHeight: "150px" }}
                                                    className="dropdownClass"
                                                    autoWidth={false}
                                                    selectedMenuItemStyle={{ color: "#f60" }}
                                                >
                                                    <MenuItem value="Выберите время" disabled={true} primaryText="Выберите время" />
                                                    {this.state.time.map((element, index) =>
                                                        <MenuItem value={element} primaryText={element} />
                                                    )}
                                                </DropDownMenu>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className={this.state.tourContentOther ? " d-flex justify-content-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" : " d-none"}>
                                <div className="d-flex flex-wrap flex-row align-items-start col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 p-0 mb-2">

                                    {this.state.dateTour.map((element, index) => {
                                        let day = element.getDate();
                                        let month = element.getMonth();
                                        let year = element.getFullYear();
                                        let newDate = day + "." + month + "." + year;
                                        return (
                                            <Chip
                                                key={element.key}
                                                onRequestDelete={() => this.handleRequestDeleteDate(element.key)}
                                                labelStyle={{ color: "#000" }}
                                                labelColor="#f60"
                                                textColor="#304269"
                                                className="chipClass"
                                            >
                                                {newDate}
                                            </Chip>)
                                    })}

                                </div>
                            </div>
                            <div className="tourContentTitle border-top d-flex align-items-center mt-3 mb-0">
                                <p>Дополнительная информация</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="newTourPrice" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Стоимость тура:</label>
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                    <TextField
                                        hintText="Пожалуйста введите номер"
                                        floatingLabelText="Номер паспорта"
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                    <input id="newTourPrice" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mr-1" type="text" />
                                    <DropDownMenu
                                        value={this.state.activeCurrency}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                        onChange={this.handleChangeCurrency}
                                        style={{ width: "100%" }}
                                        className="dropdownClass"
                                        autoWidth={false}
                                        selectedMenuItemStyle={{ color: "#f60" }}
                                    >
                                        {this.state.currency.map((element, index) =>
                                            <MenuItem value={element} primaryText={element} />
                                        )}
                                    </DropDownMenu>
                                </div>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 ">Тип транспорта:</label>
                                <DropDownMenu
                                    value={this.state.typeCar}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                    hintText="Тип автомобиля"
                                    onChange={this.handleChange}
                                    style={{ width: "100%" }}
                                    className="dropdownClass col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0"
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                >
                                    <MenuItem value={"sedan"} primaryText={"Седан"} />
                                    <MenuItem value={"microbus"} primaryText={"Микроавтобус"} />
                                    <MenuItem value={"minivan"} primaryText={"Минивэн"} />
                                    <MenuItem value={"jeep"} primaryText={"Внедорожник"} />

                                </DropDownMenu>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label htmlFor="newTourPeople" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Количество мест:</label>
                                <input id="newTourPeople" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" />
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Загрузить фото:</label>
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" />
                            </div>
                            <div className="tourContentAddButton pb-4 d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center mt-3">
                                <span className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 d-xl-block d-lg-block d-md-block d-sm-none d-none" />
                                <button htmlFor="newTourForm" type="submit" className="col-8">ДОБАВИТЬ ТУР</button>
                                <span className="ml-3" onClick={this.toggle}>Отмена</span>
                            </div>
                        </form>
                    </div>
                </Collapse>
                <div className="tourBodyElement">
                    <div className="p-0 d-flex  justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-wrap col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div style={{ display: this.state.collapse ? "none" : "block" }} onClick={this.toggle} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" >
                            <div className="filledTourImgAddBg">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <span />
                                    <p>Добавить тур</p>
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
                                        <Stars value={5.0 - index} commentNumber={22 + " отзывов"} valueDisplay={true} commentNumberDisplay={true} />
                                        <div className="settingsTourHeader d-flex pr-1">
                                            <p>Свободных мест:</p>
                                            <p>15</p>
                                        </div>
                                        <div className="settingsTourPlace d-flex">
                                            <p>Кутаиси, Храм Баграти, Монастырь Гелати </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {// TODO доделать render Element 
                    }


                </div>
            </React.Fragment >
        );
    }
}

const DriverProfileTripSettingsTour = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTourClass);

export default DriverProfileTripSettingsTour;


