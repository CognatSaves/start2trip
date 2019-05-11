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

import requests from '../../config';

class DriverProfileTripSettingsTripClass extends React.Component {
    constructor(props) {
        super(props);
        let travelsetting = this.props.profileReduser.profile.travelsetting;
        let dateTour = [];
        if (travelsetting.calendary) {
            for (let i = 0; i < travelsetting.calendary.length; i++) {
                dateTour[i] = new Date(travelsetting.calendary[i]);
            }
        }
        let cityRadius = [];
        let distance = '';
        if (travelsetting.settings) {
            cityRadius = [...travelsetting.settings.points];
            distance = travelsetting.settings.distance;
        }
        this.state = {
            cityRadius: cityRadius,
            distance: distance,
            newDate: false,
            dateTour: dateTour,
            calendarModal: false,
        }

        this.addCityRadius = this.addCityRadius.bind(this);
        this.deleteCityRadius = this.deleteCityRadius.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
    }
    applyChanges() {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            let value = {
                travelsetting: {
                    settings: {
                        points: this.state.cityRadius,
                        distance: this.state.distance
                    },
                    calendary: this.state.dateTour
                }
            }
            console.log('body before json');
            console.log(value);
            let body = JSON.stringify(value);
            fetch(requests.travelsettingsUpdateRequest, {
                method: 'PUT', body: body,
                headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}` }
            })
                .then(response => {
                    return response.json();
                })
                .then(function (data) {
                    if (data.error) {
                        console.log("bad");
                        throw data.error;
                    }
                    else {
                        console.log("good");
                        console.log(data);

                        document.location.reload(true);
                        //that.state.sendResultLocal(true, {jwt:data.jwt, user: data.user});
                    }
                })
                .catch(function (error) {
                    console.log("bad");
                    console.log('An error occurred:', error);
                    //that.state.sendResultLocal(false,{error: error});
                });
                
        }

    }
    formSubmit(event) {
        //
        //alert('Your favorite flavor is: ' + this.state.value);
        this.applyChanges();
        event.preventDefault();
    }

    addCityRadius() {
        let newArrayCity = this.state.cityRadius;
        newArrayCity.push({ point: "", radius: "", lat: '', long: '' });
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
    inputChange(value, variable, index = 0) {
        switch (variable) {
            case 'radius': {
                let cityRadius = this.state.cityRadius;
                cityRadius[index].radius = value;
                this.setState({
                    cityRadius: cityRadius
                });
                break;
            }
            case 'distance': {
                this.setState({
                    distance: value
                })
            }
            default:
        }
    }
    changeCity = (index, value, extraData) => {
        console.log('changeCity call');
        console.log(index);
        console.log(value);
        console.log(extraData);
        let cityRadius = this.state.cityRadius;
        cityRadius[index].point = value;
        cityRadius[index].lat = extraData.location.lat;
        cityRadius[index].long = extraData.location.long;
        this.setState({
            cityRadius: cityRadius
        })
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
        console.log("Double RIP render");
        console.log(this.state);
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
                        <div className="tripSettingsContentTitle d-flex flex-md-row flex-sm-column flex-column align-items-center">
                            <p className="col-xl-2 col-lg-2 col-md-3 col-sm-11 col-11 p-0">Выберите выходные дни</p>
                            <span className="newTourDatepickerSpan col-xl-6 col-lg-7 col-md-9 col-sm-11 col-11" onClick={this.calendarModalShow}>Выбрать даты</span>
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
                                    <label htmlFor={"tripLocation" + index} className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Базовый город/радиус, км:</label>
                                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                        <LocationSearchInput address={element.point} changeCity={this.changeCity} classInput="searchInputDriverInformation" index={index} classDropdown="searchDropdownDriverInformation" />
                                        <input className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ml-1 d-xl-block d-lg-block d-md-block d-sm-none d-none" type="text" id="itemRadiu" value={element.radius}
                                            onChange={(e) => this.inputChange(e.target.value, 'radius', index)}
                                        />
                                        <TextField
                                            floatingLabelText="Радиус в км"
                                            className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                            fullWidth="100%"
                                            floatingLabelFocusStyle={{ color: "#304269" }}
                                            underlineFocusStyle={{ borderColor: "#304269" }}
                                            value={element.radius}
                                            onChange={(e) => this.inputChange(e.target.value, 'radius', index)}
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
                            <label htmlFor="maxDailyMileage" className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Максимальный дневной пробег, км:</label>
                            <input id="maxDailyMileage" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" value={this.state.distance}
                                onChange={(e) => this.inputChange(e.target.value, 'distance')}
                            />
                            <TextField
                                floatingLabelText="Максимальный дневной пробег"
                                className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                fullWidth="100%"
                                floatingLabelFocusStyle={{ color: "#304269" }}
                                underlineFocusStyle={{ borderColor: "#304269" }}
                                value={this.state.distance}
                                onChange={(e) => this.inputChange(e.target.value, 'distance')}
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
        profileReduser: state.DriverProfileRegistrationtReduser,
        globalReduser: state.GlobalReduser,
    }),
)(DriverProfileTripSettingsTripClass);

export default DriverProfileTripSettingsTrip;