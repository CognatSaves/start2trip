import React from 'react';
import './StartTravelForm.css';
import './StartTravelBlockStyles.css';
import { Link } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import axios from 'axios';
import requests from '../../config';

import grayCross from '../media/close_gray.svg';
import flags from '../media/flags.png'

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import ReactTelInput from 'react-telephone-input'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Cookies from 'universal-cookie';

// import DatePicker from 'material-ui/DatePicker';
// import { thisExpression } from '@babel/types';

const cookies = new Cookies();
const Content = (that, flagAllOk, carCapacityArray, activeCurrency, textInfo, changeSuccessVisibility) => {
    let isCurrencyLoaded = activeCurrency && activeCurrency.symbol;

    return (
        <React.Fragment>
            <DriverRefreshIndicator isRefreshExist={that.state.isRefreshExist} isRefreshing={that.state.isRefreshing} isGoodAnswer={that.state.isGoodAnswer} />

            <div className="startTravelForm p-3" >
                <div className="startTravelForm_element mx-auto">
                    <div className="startTravelForm_headerText">{textInfo.headerText}</div>
                    <button className="startTravelForm_crossPlace" onClick={() => that.props.changeTravelVisibility()}>
                        <img src={grayCross} width="100%" height="100%" alt="grayCross"></img>
                    </button>
                </div>
                <div className="drivers_route_form col-12 p-0">
                    <div className="d-flex flex-sm-row flex-wrap flex-column col-12 p-0">
                        <div className="col-sm-6 col-12 order-0">
                            <TextField
                                label={textInfo.nameLabel + '*'}
                                value={that.state.firstName}
                                onChange={(event) => { that.setState({ firstName: event.target.value }); event.target.previousSibling.classList.remove("driver_route-error") }}
                                className="textField validate w-100"
                                margin="normal"
                                variant="outlined"
                            />

                        </div>
                        {/* <div className="col-sm-6 col-12 order-1">
                            <TextField
                                label={textInfo.secondNameLabel + '*'}
                                value={that.state.lastName}
                                onChange={(event) => { that.setState({ lastName: event.target.value }); event.target.previousSibling.classList.remove("driver_route-error") }}
                                className="textField validate w-100"
                                margin="normal"
                                variant="outlined"
                            />
                        </div> */}
                        <div className="col-sm-6 col-12 order-2">
                            <ReactTelInput
                                defaultCountry={that.props.storeState.isoCountryMap}
                                classNames="route_datePhoneInput w-100"
                                flagsImagePath={flags}
                                value={that.state.telNumber}
                                onChange={(telNumber, selectedCountry) => 
                                { that.setState({ telNumber: telNumber });
                                 document.querySelector(".route_datePhoneInput").children[1].classList.remove("driver_route-error") }}
                                onBlur={(value) => { console.log(value) }}
                                initialValue={textInfo.telInputInitial}
                            />
                        </div>
                        <div className="col-sm-6 col-12 order-3">
                            <TextField
                                label="Email*"
                                value={that.state.email}
                                onChange={(event) => { that.setState({ email: event.target.value }); event.target.previousSibling.classList.remove("driver_route-error") }}
                                className="textField validateEmail w-100"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        {/* <div className="col-sm-6 col-12 order-6">
                            <DatePicker disabled={true} onChange={(nul, date) => { that.setState({ date: внимание - тут надо редусер this.props.globalReduser.convertDateToUTC(date) }); document.querySelector(".route_dateCalendarModal").classList.remove("driver_route-error") }}
                                shouldDisableDate={(day) => { let a = day }} defaultDate={that.state.date} minDate={new Date()} disableYearSelection={true}
                                floatingLabelText={textInfo.startDate + '*'} className="route_dateCalendarModal" />
                        </div> */}
                        {/* <div className="col-sm-6 col-12 order-5">
                            <FormControl className="route_dateSelect numberOfPeople w-100">
                                <InputLabel htmlFor="select-multiple">{textInfo.peopleNumber + '*'}</InputLabel>
                                <Select
                                    value={that.state.numberOfPeople}
                                    input={<Input id="select-multiple" variant="outlined" />}
                                    onChange={(event) => { that.setState({ numberOfPeople: event.target.value }); document.querySelector(".numberOfPeople").classList.remove("driver_route-error") }}
                                >
                                    {carCapacityArray.map(name => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div> */}
                        <div className="col-sm-6 col-12 order-7">
                            <FormControl className="route_dateSelect departureTime w-100">
                                <InputLabel htmlFor="select-multiple">{textInfo.timeLabel + '*'}</InputLabel>
                                <Select
                                    value={that.state.departureTime}
                                    input={<Input id="select-multiple" variant="outlined" />}
                                    onChange={(event) => { 
                                     that.setState({ departureTime: event.target.value });
                                     debugger;
                                     let obj = document.querySelector(".departureTime");
                                     document.querySelector(".departureTime").classList.remove("draver_route-error") }}
                                >
                                    {that.state.time.map(name => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className=" col-12 order-8">
                            <TextField
                                label={textInfo.placeDepartureLabel + '*'}
                                multiline
                                rowsMax="4"
                                defaultValue={that.state.placeDeparture}
                                onChange={(event) => { that.setState({ placeDeparture: event.target.value }); event.target.previousSibling.classList.remove("draver_route-error") }}
                                className="textField placeDeparture w-100"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <TextField
                            label={textInfo.descriptionLabel}
                            multiline
                            rows="2"
                            rowsMax="2"
                            defaultValue={that.state.description}
                            onChange={(event) => { that.setState({ description: event.target.value }); event.target.previousSibling.classList.remove("draver_route-error") }}
                            className="textField w-100 description"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>


                    <div className="col-12 p-0">
                        <div className="d-flex align-items-center ">
                            <Checkbox
                                checked={that.state.checkBoxes}
                                className="checkboxStyle"
                                onChange={(event) => { that.setState({ checkBoxes: !that.state.checkBoxes }) }}
                            />
                            <span className="drivers_route_Link">{textInfo.driversRouteLink[0] + ' '}<Link to={"/terms/"} target="_blank">{textInfo.driversRouteLink[1]}</Link></span>
                        </div>
                        <span className="errorMes col-12" style={{ display: !that.state.checkBoxes && that.state.errorMes ? "block" : "none" }}>{textInfo.errorContract}</span>
                    </div>
                    <div className=" d-flex align-items-center justify-content-between flex-md-row flex-column col-12 py-md-0 py-4">
                        <div className="d-flex flex-column">
                            <div className="d-flex drivers_routePromo">
                                <input placeholder={textInfo.promoPlaceholder} readOnly={that.state.promoCode} value={that.state.promoCod} onChange={(event) => { that.setState({ promoCod: event.target.value, promoCodIsOk: true }) }} type="text" />
                                <span onClick={() => {
                                    that.state.promoCode ? (that.setState({ promoCod: "", promoCode: "", discount: 0 })) :
                                        (that.promocodeVerification())
                                }}>{that.state.promoCode ? textInfo.promoVerification[0] : textInfo.promoVerification[1]}</span>
                            </div>
                            <div className="d-flex justify-content-start errorMes">
                                {!that.state.isGoodAnswer && !that.state.promoCodIsOk ? <error>{textInfo.uncorrectPromocode}</error> : <div />}
                            </div>
                        </div>

                        <div className='d-flex'>
                            {
                                that.state.promoCode ?
                                    <h3 className="drivers_routePrice" style={{ textDecoration: 'line-through', color: 'rgb(144,144,144)', marginRight: '5px', fontSize: '16px', lineHeight: '28px' }}>
                                        {
                                            isCurrencyLoaded ? ((activeCurrency.isLeft ? activeCurrency.symbol : '')
                                                + Math.ceil(that.props.elementPrice * activeCurrency.costToDefault)
                                                + (!activeCurrency.isLeft ? activeCurrency.symbol : '')) : ''
                                        }
                                    </h3> : <React.Fragment />
                            }
                            <h3 className="drivers_routePrice">{isCurrencyLoaded ? ((activeCurrency.isLeft ? activeCurrency.symbol : '')
                                + Math.ceil(that.props.elementPrice * (100 - that.state.discount) / 100 * activeCurrency.costToDefault)
                                + (!activeCurrency.isLeft ? activeCurrency.symbol : '')) : ''}</h3>
                        </div>
                        {
                            isCurrencyLoaded ? /**пока валюты не загружены - не будет отображаться кнопка "заказать тур" */
                                <div className={flagAllOk ? "drivers_routeBtn drivers_routeBtn-active" : "drivers_routeBtn"} onClick={() => { that.validate() }}>
                                    <span>{textInfo.bookTour}</span>
                                </div>
                                : <React.Fragment />
                        }
                    </div>

                    <div className="d-flex justify-content-end errorMes">
                        {that.state.errorMes ? <error>{textInfo.errorFieldsMessage}</error> : <div />}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default class StartTravelForm extends React.Component {

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
            firstName: props.storeState.userData ? props.storeState.userData.firstName : "",
            lastName: props.storeState.userData ? props.storeState.userData.lastName : "",
            telNumber: props.storeState.userData ? props.storeState.userData.workPhone : "",
            email: props.storeState.userData ? props.storeState.userData.email : "",
            //date: props.storeState.date.length > 0 ? new Date(props.storeState.date) : new Date(),
            departureTime: "",
            numberOfPeople: "",
            placeDeparture: "",
            description: "",
            promoCode: "",
            discount: 0,
            checkBoxes: false,
            emailValid: false,
            //Form value end
            errorMes: false,
            flagAllOk: false,
            promoCod: "",
            isRefreshExist: false,
            isRefreshing: false,
            isGoodAnswer: false,
            promoCodIsOk: true,
            time: props.globalReduser.time,
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
    sendTripRequest = (body) => {
        
        function returnToStartData(that){
            that.setState({
                travelVisibility: false,
                // successVisibility: 'none',
                page: 1,
                // mapRwanda:true,
                showPages: 1,
                showPanelVariant: 0,
                //Form value Begin
                firstName: that.props.storeState.userData ? that.props.storeState.userData.firstName : "",
                lastName: that.props.storeState.userData ? that.props.storeState.userData.lastName : "",
                telNumber: that.props.storeState.userData ? that.props.storeState.userData.workPhone : "",
                email: that.props.storeState.userData ? that.props.storeState.userData.email : "",
                date: that.props.storeState.date.length > 0 ? new Date(that.props.storeState.date) : new Date(),
                departureTime: "",
                numberOfPeople: "",
                placeDeparture: "",
                description: "",
                promoCode: "",
                discount: 0,
                checkBoxes: false,
                emailValid: false,
                //Form value end
                errorMes: false,
                flagAllOk: false,
                promoCod: "",
                isRefreshExist: false,
                isRefreshing: false,
                isGoodAnswer: false,
                promoCodIsOk: true,
                time: that.props.globalReduser.time,
            })
        }
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
                            isGoodAnswer: true
                        });

                        setTimeout(() => {

                            that.props.changeTravelVisibility();
                            that.props.changeSuccessVisibility('block', false);
                            //уборка - откат к старым данным
                            returnToStartData(that);
                        }, 1000);

                    }
                })
                .catch(function (error) {
                    
                    console.log('bad');
                    console.log('An error occurred:', error);
                    that.setState({
                        isRefreshExist: true,
                        isRefreshing: false,
                        isGoodAnswer: false
                    });
                    setTimeout(() => { 
                        //уборка - откат к старым данным
                        returnToStartData(that);
                     }, 1000);
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
        let email = document.querySelector(".validateEmail");
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
        }
        if (this.state.email === "" || !emailValid /*|| !this.state.emailValid*/) {
            email.children[1].children[0].classList.add("draver_route-error");
            isAllGood = false;
        }
        if (this.state.telNumber === undefined) {
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
        // if (this.state.numberOfPeople === "") {
        //     numberOfPeople.classList.add("draver_route-error");
        //     isAllGood = false;
        // }
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

        this.setState({ errorMes: !isAllGood, emailValid: emailValid })

        if (isAllGood) {
            
            let date = new Date(this.props.storeState.date);
            let year = date.getUTCFullYear(); let month = date.getUTCMonth() + 1; let day = date.getUTCDate();
            let body = {
                newFirstName: this.state.firstName,
                newSecondName: this.state.lastName,
                startDate: year + '-' + (month > 10 ? month : '0' + month) + '-' + (day > 10 ? day : '0' + day),
                startTime: this.state.departureTime,
                route: [...this.props.storeState.cities],
                startPlace: this.state.placeDeparture,
                price: this.props.driversState.driverCarDescription.price,
                tripCommentary: this.state.description,
                carrier: this.props.match === undefined || this.props.match.params.id === undefined ? this.props.driversState.driverCarDescription.id : this.props.match.params.id,
                currencyType: this.props.storeState.currencies.length > 0 ? this.props.storeState.currencies[this.props.storeState.activeCurrencyNumber].id : undefined,
                tripType: 'Trip',
                newPhone: this.state.telNumber,
                passengerNumber: this.state.numberOfPeople,
                promocode: this.state.promoCode,
                clientEmail: this.state.email,
                carId: this.props.match === undefined || this.props.match.params.carId === undefined ? this.props.driversState.driverCarDescription.carId : this.props.match.params.carId,
                frontendAddress: requests.frontendAddress,
                travelLength: this.props.driversState.travelLength,
                travelTime: this.props.driversState.travelTime,
                userLangCookies: (cookies.get('userLang', { path: '/' })).toUpperCase(),
                country:cookies.get('country', { path: '/' })
            };
            console.log("--------------------------------")
            console.log(body);
            console.log("--------------------------------")
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
                        promoCodIsOk: true
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
                    promoCodIsOk: false
                });
                setTimeout(() => { that.setState({ isRefreshExist: false }) }, 1000);
            })
    }
    render() {
        let flagAllOk = false;
        if (
            this.state.firstName !== "" &&
            // this.state.lastName !== "" &&
            this.state.telNumber !== "" &&
            this.state.email !== "" &&
            this.state.emailValid === true &&
            this.state.date !== "" &&
            this.state.departureTime !== "" &&
            // this.state.numberOfPeople !== "" &&
            this.state.placeDeparture !== "" &&
            this.state.checkBoxes === true
        ) {
            if (!flagAllOk && this.state.errorMes) {
                this.setState({ errorMes: false })
            }
            flagAllOk = true;
        }
        let carCapacityArray = [];
        if (this.props.driversState.driverCarDescription.carCapacity) {
            for (let i = 0; i < this.props.driversState.driverCarDescription.carCapacity; i++) {
                carCapacityArray.push(i + 1)
            }
        } else {
            carCapacityArray.push("1")
        }
        return (
            <React.Fragment>
                {isMobileOnly ?
                    <React.Fragment>
                        <Dialog fullScreen open={this.props.travelVisibility} onClose={this.props.changeTravelVisibility} >
                            {Content(this, flagAllOk, carCapacityArray, this.props.activeCurrency, this.props.textInfo, this.props.changeSuccessVisibility)}
                        </Dialog>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Dialog open={this.props.travelVisibility} onClose={this.props.changeTravelVisibility} >
                            {Content(this, flagAllOk, carCapacityArray, this.props.activeCurrency, this.props.textInfo, this.props.changeSuccessVisibility)}
                        </Dialog>
                    </React.Fragment>
                }

            </React.Fragment>
        )

    }

}
