import React from 'react';
import './DriverProfileTripSettingsTrip.css'
import { connect } from 'react-redux';
import LocationSearchInput from '../home/HomeBody/Search'
import TextField from 'material-ui/TextField';
import { isMobile } from 'react-device-detect';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
} from 'react-infinite-calendar';



class DriverProfileTripSettingsTripClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityRadius: [{ city: "", itemRadius: "" },],
            city: "",
            newDate: false,
            dateTour: [],
            calendarModal: false,
            readyLeavePlease: [{ cityLeave: "", itemRadiusLeave: "" },],
        }

        this.addCityRadius = this.addCityRadius.bind(this);
        this.deleteCityRadius = this.deleteCityRadius.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(event) {
        debugger
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    addCityRadius() {
        let newArrayCity = this.state.cityRadius;
        newArrayCity.push({ city: "", itemRadius: "" })
        this.setState({
            cityRadius: newArrayCity,
        })
    }

    deleteCityRadius(index) {
        let newArrayCity = this.state.cityRadius;
        newArrayCity.splice(index, 1);
        this.setState({
            cityRadius: newArrayCity,
        })
        console.log(this.state.cityRadius)
    }


    changeAllValue(index, e) {
        let newArrayCity = this.state.cityRadius.slice();
        let newReadyLeavePlease = this.state.readyLeavePlease.slice();
        switch (e.currentTarget.id) {
            case "city": {
                newArrayCity[index].city = e.currentTarget.value;
                this.setState({ cityRadius: newArrayCity });
                break;
            }
            case "itemRadiu": {
                newArrayCity[index].itemRadius = e.currentTarget.value;
                this.setState({ cityRadius: newArrayCity });
                break;
            }
            case "cityLeave": {
                newReadyLeavePlease[index].cityLeave = e.currentTarget.value;
                this.setState({ readyLeavePlease: newReadyLeavePlease });
                break;
            }
            case "itemRadiusLeave": {
                newReadyLeavePlease[index].itemRadiusLeave = e.currentTarget.value;
                this.setState({ readyLeavePlease: newReadyLeavePlease });
                break;
            }
        }
    }

    changeCity = (index, value) => {
        this.setState({ city: value })
    }

    calendarModalShow = () => {
        this.setState({ calendarModal: !this.state.calendarModal, newDate: false });
    };

    addDate = (dates) => {
        let newDate = this.state.dateTour;
        if (this.state.newDate) {
            var needAddDate = true;

            for (let i = 0; i < newDate.length; i++) {
                if (dates.getDate() == newDate[i].getDate() && dates.getMonth() == newDate[i].getMonth() && dates.getFullYear() == newDate[i].getFullYear()) {
                    newDate.splice(i, 1);
                    this.setState({ dateTour: newDate })
                    needAddDate = false;
                    break;
                }
            };
            if (needAddDate) {
                newDate.push(dates);
                this.setState({ dateTour: newDate })
            }
        }
        this.setState({ newDate: true })
    }

    handleRequestDelete = (element) => {
        this.dateTour = this.state.dateTour;
        const dateTourToDelete = this.dateTour.map((chip) => chip.key).indexOf(element.key);
        this.dateTour.splice(dateTourToDelete, 1);
        this.setState({ dateTour: this.dateTour });

    }

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
                <form onSubmit={this.formSubmit} id="tripForm" className="tripSettingsBody">
                    <div className="tripSettingsContent">
                        <div className="tripSettingsContentTitle d-flex align-items-center">
                            <p className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Выберите выходные дни</p>
                            <span className="newTourDatepickerSpan col-xl-6 col-lg-7 col-md-9 col-sm-12 col-12 p-0" onClick={this.calendarModalShow}>Выбрать даты</span>
                        </div>
                        <div className="tripSettingsContentDate d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center">

                            <div className="d-flex flex-wrap flex-row align-items-start col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 p-0 mb-2">
                               
                                {this.state.dateTour.map((element, index) => {
                                    let day = element.getDate();
                                    let month = element.getMonth();
                                    let year = element.getFullYear();
                                    let newDate = day + "." + month + "." + year;
                                    return (
                                        <Chip
                                            key={element.key}
                                            onRequestDelete={() => this.handleRequestDelete(element)}
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
                        <div className="tripSettingsContentTitle d-flex align-items-center">
                            <p>Добавьте город и радиусы, где Вы готовы принимать заказы</p>
                        </div>
                        {this.state.cityRadius.map((element, index) =>
                            <React.Fragment>
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                    <label htmlFor={"tripLocation" + index} className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Базовый город/радиус:</label>
                                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                        <LocationSearchInput changeCity={this.changeCity} classInput="searchInputDriverInformation" id={"tripLocation" + index} classDropdown="searchDropdownDriverInformation" />
                                        <input className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ml-1 d-xl-block d-lg-block d-md-block d-sm-none d-none" type="text" id="itemRadiu" value={this.state.cityRadius[index].itemRadius} onChange={this.changeAllValue.bind(this, index)} required />
                                        <TextField
                                            floatingLabelText="Радиус в км"
                                            className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                            fullWidth="100%"
                                            floatingLabelFocusStyle={{ color: "#304269" }}
                                            underlineFocusStyle={{ borderColor: "#304269" }}

                                        />
                                    </div>
                                    <span style={{ display: index ? "block" : "none" }} className="tripSettingsContentDeletButton " title="Удалить город" onClick={() => { this.deleteCityRadius(index) }} />
                                    <p className={index ? "d-none" : "d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                </div>
                            </React.Fragment>
                        )}
                        <div className="tripSettingsContentAddCity d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center">
                            <p className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 pl-0" onClick={this.addCityRadius}>+ Добавить город</p>
                        </div>
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                            <label htmlFor="maxDailyMileage" className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Максимальный дневной пробег:</label>
                            <input id="maxDailyMileage" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" />
                            <TextField
                                floatingLabelText="Максимальный дневной пробег"
                                className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                fullWidth="100%"
                                floatingLabelFocusStyle={{ color: "#304269" }}
                                underlineFocusStyle={{ borderColor: "#304269" }}

                            />
                            <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                        </div>
                    </div>

                    <div className="tripSettingsContent d-flex justify-content-md-start justify-content-sm-center justify-content-center p-0">
                        <p className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 d-xl-block  d-lg-block  d-md-block d-sm-none d-none"></p>
                        <button htmlFor="tripForm" type="submit">СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                    </div>

                </form>
            </React.Fragment>
        );
    }
}

const DriverProfileTripSettingsTrip = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTripClass);

export default DriverProfileTripSettingsTrip;