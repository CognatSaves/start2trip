import React from 'react';
import './DriverProfile.css';
import './DriverInfo.css';
import './DriverAdaptedRoute.css';
import { connect } from 'react-redux'
// import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
// import DriversProfileComments from './DriversProfileComments';
// import Manipulator from '../manipulator/Manipulator';
import Header from '../header/Header';
import { setDriversRouteChange, setDriverCarDescription, setCarTypes } from '../../redusers/ActionDrivers';
// import StartTravelForm from '../startTravelForm/StartTravelForm';
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess';
// import DriverAdaptedRoute from './DriverAdaptedRoute';
import DriverInfo from './DriverInfo.jsx';
// import DriverProfileTours from './DriverProfileTours';
import requests from '../../config';
import { setCities } from '../../redusers/Action'
// import RouteMenu from '../home/HomeBody/RouteMenu';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'material-ui/DatePicker';
import ReactTelInput from 'react-telephone-input'
import flags from '../media/flags.png'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import MapContainer from '../home/HomeBody/MapContainer';
import { setLengthTime } from '../../redusers/ActionDrivers'
import axios from 'axios';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import { isMobileOnly } from 'react-device-detect';
import CommentBlock from '../TourDescription/CommentBlock'

class DriverProfileClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            travelVisibility: false,
            // successVisibility: 'none',
            page: 1,
            // mapRwanda:true,
            showPages: 1,
            showPanelVariant: 0,

            //Form value Begin
            firstName: this.props.storeState.userData ? this.props.storeState.userData.firstName : "",
            lastName: this.props.storeState.userData ? this.props.storeState.userData.lastName : "",
            telNumber: this.props.storeState.userData ? this.props.storeState.userData.workPhone : "",
            email: this.props.storeState.userData ? this.props.storeState.userData.email : "",
            date: this.props.storeState.date ? this.props.storeState.date : new Date(),
            departureTime: "",
            numberOfPeople: "",
            placeDeparture: "",
            description: "",
            promoCode: "",
            discount: 0,
            checkBoxes: false,
            emailValid:false,
            //Form value end
            errorMes: false,
            flagAllOk: false,
            promoCod: "",
            isRefreshExist: false,
            isRefreshing: false,
            isGoodAnswer: false,
            promoCodIsOk:true,
            elementPrice:0,
            comments:{},
        }
        this.state = { ...this.state, "mapRwanda": true }

        props.dispatch(setLengthTime("-", "-"));
        // let now = new Date(Date.now());


        let that = this;
        console.log(props.match);
        that.props.dispatch(setDriverCarDescription({}));
        if (!(!props.match || !props.match.params.id || !props.match.params.carId)) {
            let body = JSON.stringify({
                id: props.match.params.id,
                carId: props.match.params.carId,
                cities: [
                    {
                        point: "Тбилиси, Грузия",
                        lat: 41.7151377,
                        long: 44.82709599999998
                    },
                    {
                        point: "Мцхета, Грузия",
                        lat: 41.8411674,
                        long: 44.70738640000002
                    }
                ],
                country: "GEO",
                date: "Fri, 28 Jun 2019 21:00:00 GMT",
                distance: 1000
            });
            fetch(requests.getDriverData, {
                method: 'PUT', body: body,
                headers: { 'content-type': 'application/json' }
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
                        console.log('good');
                        console.log(data);
                        that.setState({comments:data.driverCarDescription.comments})
                        that.props.dispatch(setDriverCarDescription(data.driverCarDescription));
                        that.props.dispatch(setCarTypes(data.carTypes));
                    }

                })
                .catch(function (error) {
                    console.log('bad');
                    console.log('An error occurred:', error);
                    props.history.push('/');
                });
        }
        else {
            props.history.push('/');
        }

    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.storeState.userData.firstName !== this.props.storeState.userData.firstName) {

            this.setState({
                firstName: this.props.storeState.userData.firstName,//"",
                lastName: this.props.storeState.userData.lastName,//"",
                telNumber: this.props.storeState.userData.workPhone,//"",
                email: this.props.storeState.userData.email,//"",
            })
        }
        return true
    }
    showMorePages = () => {
        this.setState({
            page: this.state.page + 1,
            showPages: this.state.showPages + 1
        })
    }
    setPage = (page) => {
        if (page !== "...") {
            this.setState(
                {
                    page: page,
                    showPages: 1
                }
            )
        }
    }
    goToDrivers = () => {
        this.props.dispatch(setDriversRouteChange(true));
        this.props.history.push("/"+(this.props.storeState.country.toLowerCase())+'/drivers');
    }
    changeTravelVisibility = () => {
        this.setState({
            travelVisibility: !this.state.travelVisibility
        })
    }
    // changeSuccessVisibility = (value) => {
    //     this.setState({
    //         successVisibility: value
    //     })
    // }
    changePanelVariant = (value) => {
        this.setState({
            showPanelVariant: value
        })
    }
    parseStringToArray = (cities, country) => {

        let newCities = [];
        let newString = cities.split("from-");
        let newArrayCities = newString[1].split("-to-");
        for (let i = 0; i < newArrayCities.length; i++) {
            let stringWithSpaces = newArrayCities[i].replace(/-/g, ' ');
            stringWithSpaces = stringWithSpaces + ', ' + country;
            newCities[i] = { point: stringWithSpaces, lat: "", long: "" };
        }
        this.props.dispatch(setCities(newCities))
    }
    setLengthTime = (travelLength, travelTime) => {
        function getLengthString(travelLength) {
            let length = travelLength;
            length = Math.ceil(length / 1000);
            let lengthString = length + " км";
            return lengthString;
        }
        function getTimeString(travelTime) {
            let hours = travelTime / 3600 ^ 0;
            let minutes = (travelTime - hours * 3600) / 60 ^ 0;
            let days = hours / 24 ^ 0;
            hours = hours - days * 24;
            let timeString = "";
            if (days !== 0) {
                timeString += days + " дн. " + hours + " ч.";
            }
            else {
                if (hours !== 0) {
                    timeString += hours + " ч. ";
                }
                timeString += minutes + " мин.";
            }
            return timeString;
        }
        if (this.props.driversState.travelLength == "-" && this.props.driversState.travelTime == "-") {
            let lengthString = getLengthString(travelLength);
            let timeString = getTimeString(travelTime);
            this.props.dispatch(setLengthTime(timeString, lengthString));
        }


    }

    sendTripRequest = (body) => {
        if (body) {
            let that = this;
            that.setState({
                isRefreshExist: true,
                isRefreshing: true
            });
            fetch(requests.createNewTrip, {
                method: 'POST', body: body,
                headers: { 'content-type': 'application/json' }
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
                        console.log('good');
                        console.log(data);
                        that.setState({
                            isRefreshExist: true,
                            isRefreshing: false,
                            isGoodAnswer:true
                        });
                        setTimeout(() => { that.setState({ isRefreshExist: false }) }, 1000);
                    }
                })
                .catch(function (error) {
                    console.log('bad');
                    console.log('An error occurred:', error);
                    this.setState({
                        isRefreshExist: true,
                        isRefreshing: false,
                        isGoodAnswer:true
                    });
                    setTimeout(() => { that.setState({ isRefreshExist: false }) }, 1000);
                });
        }
    }
    validate = () => {
        let massValidate = document.querySelectorAll(".validate");
        let phoneInput = document.querySelector(".route_datePhoneInput");
        let departureTime = document.querySelector(".departureTime");
        let numberOfPeople = document.querySelector(".numberOfPeople");
        let placeDeparture = document.querySelector(".placeDeparture");
        let checkBoxes = document.querySelector(".checkboxStyle");
        let email  = document.querySelector(".validateEmail");
        // let description = document.querySelector(".description");
        let isAllGood = true;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailValid = re.test(String(this.state.email).toLowerCase());
          
        for (let i = 0; i < massValidate.length; i++) {
            let el = massValidate[i].children[1];
            if (el.children.length == 2) {
                if (el.children[1].value == "") {
                    massValidate[i].children[1].children[0].classList.add("draver_route-error");
                    isAllGood = false;
                }
            }
            
            if(this.state.email === "" || !emailValid|| !this.state.emailValid){
                email.children[1].children[0].classList.add("draver_route-error");
                isAllGood = false;
            }
            if (this.state.telNumber === '') {
                phoneInput.children[1].classList.add("draver_route-error");
                isAllGood = false;
            }
            if (this.state.checkBoxes === false) {
                checkBoxes.classList.add("draver_route-error");
                isAllGood = false;
            }
            if (this.state.departureTime === "") {
                departureTime.classList.add("draver_route-error");
                isAllGood = false;
            }
            if (this.state.numberOfPeople === "") {
                numberOfPeople.classList.add("draver_route-error");
                isAllGood = false;
            }
            if (this.state.placeDeparture === "") {
                placeDeparture.children[1].children[0].classList.add("draver_route-error");
                isAllGood = false;
            }
            if (this.state.placeDeparture === "") {
                placeDeparture.children[1].children[0].classList.add("draver_route-error");
                isAllGood = false;
            }
            // if (this.state.description === "") {
            //     description.children[1].children[0].classList.add("draver_route-error");
            //     isAllGood = false;
            // }
        }
        this.setState({ errorMes: true , emailValid:emailValid})



        if (isAllGood) {
            let date = this.state.date;
            let year = date.getUTCFullYear(); let month = date.getUTCMonth() + 1; let day = date.getUTCDate();
            let body = {
                newFirstName: this.state.firstName,
                newSecondName: this.state.lastName,
                startDate: year + '-' + (month > 10 ? month : '0' + month) + '-' + (day > 10 ? day : '0' + day),
                startTime: this.state.departureTime,
                route: [
                    {
                        point: "Тбилиси, Грузия",
                        lat: 41.7151377,
                        long: 44.82709599999998
                    },
                    {
                        point: "Мцхета, Грузия",
                        lat: 41.8411674,
                        long: 44.70738640000002
                    }
                ],
                startPlace: this.state.placeDeparture,
                price: this.props.driversState.driverCarDescription.price,
                tripCommentary: this.state.description,
                carrier: this.props.match.params.id,
                currencyType: this.props.storeState.currencies.length > 0 ? this.props.storeState.currencies[this.props.storeState.activeCurrencyNumber].id : undefined,
                tripType: 'Trip',
                newPhone: this.state.telNumber,
                passengerNumber: this.state.numberOfPeople,
                promocode: this.state.promoCode,
                clientEmail: this.state.email,
                carId: this.props.match.params.carId,
                frontendAddress: requests.frontendAddress,
                travelLength: this.props.driversState.travelLength,
                travelTime: this.props.driversState.travelTime
            };
            this.sendTripRequest(JSON.stringify(body));
        }
    }
    promocodeVerification = () => {

        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
        let that = this;

        //ЭтО ЗаПрОс На ПрОвЕрКу ПрОмОкОдА. ОчЕнЬ НуЖеН


        axios.get(requests.checkPromocode + "?code=" + this.state.promoCod)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .then(data => {

                if (data.error) {
                    console.log("bad");
                    throw data.error;
                }
                else {
                    console.log('good');
                    console.log(data);
                    that.setState({
                        promoCode: this.state.promoCod,
                        discount: data.discount,
                        isRefreshExist: true,
                        isRefreshing: false,
                        isGoodAnswer: true,
                        promoCodIsOk:true
                    });
                    setTimeout(() => { that.setState({ isRefreshExist: false }) }, 1000);
                }
            })
            .catch(error => {
                console.log('get wasted promocode answer');
                that.setState({
                    isRefreshExist: true,
                    isRefreshing: false,
                    isGoodAnswer: false,
                    promoCodIsOk:false
                });
                setTimeout(() => { that.setState({ isRefreshExist: false }) }, 1000);
            })
    }

    render() {
        console.log('DriverProfile render');
        console.log(this.state.comments);

        console.log('cities', this.props.storeState.cities);


        let driver = this.props.driversState.driverCarDescription;
        //console.log('driver', driver);

        let buttonNames = ["Отзывы (" + this.props.commentState.comments.length + ")"];
        let cities;
        let country;
        if (this.props.match) {
            
            if (this.props.storeState.cities[0].point === "") {
                
                cities = this.props.match.params.cities;
                country = this.props.match.params.country;
                this.parseStringToArray(cities, country);
            }
        }
        let carCapacityArray = [];
        if (this.props.driversState.driverCarDescription.carCapacity) {
            for (let i = 0; i < this.props.driversState.driverCarDescription.carCapacity; i++) {
                carCapacityArray.push(i + 1)
            }
        } else {
            carCapacityArray.push("1")
        }
        let flagAllOk = false;
        if (
            this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.telNumber !== "" &&
            this.state.email !== "" &&
            this.state.emailValid === true && 
            this.state.date !== "" &&
            this.state.departureTime !== "" &&
            this.state.numberOfPeople !== "" &&
            this.state.placeDeparture !== "" &&
            this.state.checkBoxes === true
        ) {
            if (!flagAllOk && this.state.errorMes) {
                this.setState({ errorMes: false })
            }
            flagAllOk = true;
        }
        let storeState= this.props.storeState;
        let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber]
        let textInfo = this.props.storeState.languageTextMain.drivers.driversBlock;
        let defaultPrice = this.props.driversState.driverCarDescription.price * (100 - this.state.discount) / 100;
        let isCurrencyLoaded = activeCurrency && activeCurrency.symbol;
        if (this.props.driversState.driverCarDescription.id) {
            return (
                <React.Fragment>
                    <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
                    <div className="drivers_top_background">
                        <Header history={this.props.history} />
                        <dir className="driversGoBack" style={{display: isMobileOnly?"flex":"none"}}>
                            <span onClick={()=>{this.props.history.goBack()}}>Назад</span>
                        </dir>
                        <div className="wrapper d-flex flex-column">
                            <div className="drivers_top_block d-flex flex-column">

                                <DriverInfo element={driver} />
                                <div className="driversRoute col-12 ">
                                    <hr />
                                    <div className="d-flex flex-sm-row flex-column pb-3 col-12">
                                        <h3title>Маршрут: </h3title>
                                        <h3 className="d-flex flex-sm-row flex-wrap flex-column"> {this.props.storeState.cities.map((element, index) => {
                                             let returned = (index === this.props.storeState.cities.length - 1 ? element.point : element.point + "  ⟶  ") 
                                             return<span>{returned}</span>
                                        })}</h3>
                                    </div>
                                    

                                    <div className="route_time_text col-sm-6 col-12">Время в пути без остановок:
                                    <p1> {this.props.driversState.travelTime}</p1>
                                        , длина пути:
                                    <p2> {this.props.driversState.travelLength}</p2>

                                    </div>
                                </div>
                                <div className="drivers_route col-12 d-flex" >
                                    <div className="drivers_route_form col-md-6 col-12 p-0">
                                        <div className="d-flex flex-sm-row flex-wrap flex-column col-12 p-0">
                                            <div className="col-sm-6 col-12 order-0">
                                                <TextField
                                                    label="Имя*"
                                                    value={this.state.firstName}
                                                    onChange={(event) => { this.setState({ firstName: event.target.value }); event.target.previousSibling.classList.remove("draver_route-error") }}
                                                    className="textField validate w-100"
                                                    margin="normal"
                                                    variant="outlined"
                                                />

                                            </div>
                                            <div className="col-sm-6 col-12 order-2">
                                                <ReactTelInput
                                                    defaultCountry={this.props.storeState.isoCountryMap}
                                                    classNames="route_datePhoneInput w-100"
                                                    flagsImagePath={flags}
                                                    value={this.state.telNumber}
                                                    onChange={(telNumber, selectedCountry) => { this.setState({ telNumber: telNumber }); document.querySelector(".route_datePhoneInput").children[1].classList.remove("draver_route-error") }}
                                                    onBlur={(value) => { console.log(value) }}
                                                    initialValue="Телефон"
                                                />
                                            </div>
                                            <div className="col-sm-6 col-12 order-6">
                                                <DatePicker onChange={(nul, date) => { this.setState({ date: date }); document.querySelector(".route_dateCalendarModal").classList.remove("draver_route-error") }} shouldDisableDate={(day) => { let a = day }} defaultDate={this.state.date} minDate={new Date()} disableYearSelection={true} floatingLabelText="Дата отправления*" className="route_dateCalendarModal" />
                                            </div>
                                            <div className="col-sm-6 col-12 order-5">
                                                <FormControl className="route_dateSelect numberOfPeople w-100">
                                                    <InputLabel htmlFor="select-multiple">Количество человек*</InputLabel>
                                                    <Select
                                                        value={this.state.numberOfPeople}
                                                        input={<Input id="select-multiple" variant="outlined" />}
                                                        onChange={(event) => { this.setState({ numberOfPeople: event.target.value }); document.querySelector(".numberOfPeople").classList.remove("draver_route-error") }}
                                                    >
                                                        {carCapacityArray.map(name => (
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-sm-6 col-12 order-1">
                                                <TextField
                                                    label="Фамилия*"
                                                    value={this.state.lastName}
                                                    onChange={(event) => { this.setState({ lastName: event.target.value }); event.target.previousSibling.classList.remove("draver_route-error") }}
                                                    className="textField validate w-100"
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </div>
                                            <div className="col-sm-6 col-12 order-3">
                                                <TextField
                                                    label="Email*"
                                                    value={this.state.email}
                                                    onChange={(event) => { this.setState({ email: event.target.value }); event.target.previousSibling.classList.remove("draver_route-error") }}
                                                    className="textField validateEmail w-100"
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </div>
                                            <div className="col-sm-6 col-12 order-7">
                                                <FormControl className="route_dateSelect departureTime w-100">
                                                    <InputLabel htmlFor="select-multiple">Время*</InputLabel>
                                                    <Select
                                                        value={this.state.departureTime}
                                                        input={<Input id="select-multiple" variant="outlined" />}
                                                        onChange={(event) => { this.setState({ departureTime: event.target.value }); document.querySelector(".departureTime").classList.remove("draver_route-error") }}
                                                    >
                                                        {this.props.globalReduser.time.map(name => (
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-sm-6 col-12 order-8">
                                                <TextField
                                                    label="Место отправления*"
                                                    multiline
                                                    rowsMax="4"
                                                    defaultValue={this.state.placeDeparture}
                                                    onChange={(event) => { this.setState({ placeDeparture: event.target.value }); event.target.previousSibling.classList.remove("draver_route-error") }}
                                                    className="textField placeDeparture w-100"
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <TextField
                                                label="Описание"
                                                multiline
                                                rows="2"
                                                rowsMax="2"
                                                defaultValue={this.state.description}
                                                onChange={(event) => { this.setState({ description: event.target.value }); event.target.previousSibling.classList.remove("draver_route-error") }}
                                                className="textField w-100 description"
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </div>


                                        <div className="col-12 p-0">
                                            <div className="d-flex align-items-center ">
                                            <Checkbox
                                                checked={this.state.checkBoxes}
                                                className="checkboxStyle"
                                                onChange={(event) => { this.setState({ checkBoxes: !this.state.checkBoxes }) }}
                                            />
                                            <span className="drivers_route_Link">Я принимаю условия <Link to="">договора оферты</Link></span>
                                            </div>
                                            <span className="errorMes col-12" style={{display: !this.state.checkBoxes && this.state.errorMes ? "block" : "none"  }}>Вы должны принять условия договора</span>
                                        </div>
                                        <div className=" d-flex align-items-center justify-content-between flex-md-row flex-column col-12 py-md-0 py-4">
                                            <div className="d-flex drivers_routePromo">
                                                <input placeholder="Введите промо код" readOnly={this.state.promoCode} value={this.state.promoCod} onChange={(event) => { this.setState({ promoCod: event.target.value,promoCodIsOk:true }) }} type="text" />
                                                <span onClick={() => { this.state.promoCode ? (this.setState({ promoCod: "", promoCode: "", discount: 0 })) : (this.promocodeVerification()) }}>{this.state.promoCode ? "сбросить" : "применить"}</span>
                                            </div>
                                            <h3 className="drivers_routePrice">{isCurrencyLoaded ? ((activeCurrency.isLeft ? activeCurrency.symbol : '') + Math.ceil(defaultPrice*activeCurrency.costToDefault) + (!activeCurrency.isLeft ? activeCurrency.symbol : '')) : ''}</h3>
                                            {
                                                isCurrencyLoaded ? /**пока валюты не загружены - не будет отображаться кнопка "заказать тур" */
                                                <div className={flagAllOk ? "drivers_routeBtn drivers_routeBtn-active" : "drivers_routeBtn"} onClick={() => { this.validate() }}>
                                                    <span>Заказать тур</span>
                                                </div>
                                                : <React.Fragment/>
                                            }
                                            
                                        </div>
                                        <div className="d-flex justify-content-start col-12 errorMes">
                                            {!this.state.isGoodAnswer && !this.state.promoCodIsOk ? <error>Неверный промокод</error> : <div />}
                                        </div>
                                        <div className="d-flex justify-content-end errorMes">
                                            {this.state.errorMes ? <error>Заполните правильно все поля</error> : <div />}
                                        </div>

                                    </div>
                                    <div className="col-6 d-md-block d-none ">
                                        <MapContainer cities={this.props.storeState.cities} setLengthTime={this.setLengthTime} mapUpdate={true} />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="wrapper d-flex flex-column">
                        <div className="drivers_bottom_background d-flex flex-column" >
                            <div className="drivers_body d-flex">
                                <div className="left_body_part col-12">
                                    {/* <div className="driverProfileComments_panel d-flex">
                                        {
                                            buttonNames.map((element, index) =>
                                                <button className={this.state.showPanelVariant === index ? "driverProfileComments_panel_element driverProfileComments_panel_selectedElement" : "driverProfileComments_panel_element"} onClick={() => this.changePanelVariant(index)}>{element}</button>
                                            )
                                        }
                                    </div> */}
                                    <CommentBlock comments={this.state.comments}  page={this.state.page} setPage={this.setPage}
                                                showMorePages={this.showMorePages} showPages={this.state.showPages} id={"commentBlockId"}  />
                                        
                                    
                                    {/* {
                                        this.state.showPanelVariant === 0 &&
                                        <React.Fragment>
                                            <DriversProfileComments page={this.state.page} showPages={this.state.showPages} driver={driver} />
                                            <Manipulator number={this.props.commentState.comments.length} page={this.state.page} elementsNumber={5}
                                                setPage={this.setPage} showMorePages={this.showMorePages} />
                                        </React.Fragment>
                                    } */}
                                    {/* {
                                        this.state.showPanelVariant === 1 &&
                                        <React.Fragment>
                                            <DriverProfileTours />
                                        </React.Fragment>
                                    } */}
                                </div>
                                {/* <div className="right_body_part col-3">
                                    <DriversCommercial />
                                </div> */}

                            </div>
                        </div>
                    </div>
                    {/* successVisibility={this.changeSuccessVisibility} changeSuccessVisibility={this.changeSuccessVisibility}*/}
                    {/* <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} elementPrice={this.state.elementPrice} driversState={this.props.driversState}
                        travelVisibility={this.state.travelVisibility} isoCountryMap={this.props.storeState.isoCountryMap} storeState={this.props.storeState} /> */}
                    <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility} />
                </React.Fragment>

            )
        }
        else {
            return (
                <React.Fragment>
                    <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true} />
                </React.Fragment>
            )
        }
    }
}

const DriverProfile = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
        commentState: state.CommentReduser,
        globalReduser: state.GlobalReduser
    }),
)(DriverProfileClass);

export default DriverProfile;