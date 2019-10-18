import React from 'react';
import './StartTravelForm.css';
import './StartTravelBlockStyles.css';
import { connect } from 'react-redux';

import { isMobileOnly } from 'react-device-detect';
import axios from 'axios';
import requests from '../../config';
import StartTravelContent from './StartTravelContent';
import Dialog from '@material-ui/core/Dialog';
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, } from '../../redusers/GlobalFunction'

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class StartTravelFormClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            travelVisibility: props.travelVisibility,
            //page: 1,
            //showPages: 1,
            //showPanelVariant: 0,
            //Form value Begin

            firstName: props.storeState.userData ? props.storeState.userData.firstName : "",
            //lastName: props.storeState.userData ? props.storeState.userData.lastName : "",
            telNumber: props.storeState.userData ? props.storeState.userData.workPhone : "",
            email: props.storeState.userData ? props.storeState.userData.email : "",
            date: props.elementActive ? props.elementActive.date : new Date(),
            departureTime: "",
            numberOfPeople: "",
            placeDeparture: "",
            description: "",
            promoCode: "",
            discount: 0,
            checkBoxes: false,
            emailValid: false,
            freeSeats: 0,
            //Form value end
            errorMes: false,
            //flagAllOk: false,
            promoCod: "",
            promoCodIsOk: true,
            time: props.globalReduser.time,
        }


    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.storeState.userData && this.props.storeState.userData) {
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


    }
    sendTripRequest = (body) => {

        function returnToStartData(that) {
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
                /*placeDeparture: "",
                description: "",*/
                promoCode: "",
                discount: 0,
                checkBoxes: false,
                emailValid: false,
                freeSeats: 0,
                //Form value end
                errorMes: false,
                //flagAllOk: false,
                promoCod: "",
                promoCodIsOk: true,
                time: that.props.globalReduser.time,
            })
        }
        if (body) {

            let that = this;

            startRefresherGlobal(this, true)
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
                        thenFuncGlobal(that)

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
                    catchFuncGlobal(that)
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
        if (this.state.telNumber === undefined || this.state.telNumber.length < 5) {
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
                startDate: year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day),
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
                country: cookies.get('country', { path: '/' })
            };
            console.log("--------------------------------")
            console.log(body);
            console.log("--------------------------------")
            this.sendTripRequest(JSON.stringify(body));


        }
    }

    validateTours = () => {

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
            // email.children[1].children[0].classList.add("draver_route-error");
            isAllGood = false;
        }
        if (this.state.telNumber === undefined || this.state.telNumber.length < 5) {
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

        this.setState({ errorMes: !isAllGood, emailValid: emailValid })

        if (isAllGood) {

            let date = new Date(this.state.date);
            let year = date.getFullYear(); let month = date.getMonth() + 1; let day = date.getDate();
            let body = {
                newFirstName: this.state.firstName,
                newSecondName: this.state.lastName,
                startDate: year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day),
                startTime: this.state.departureTime,
                tourId: this.props.isTourDescription ? this.props.elementActive.tour.id : this.props.elementActive.element.id,
                tourlocId: this.props.isTourDescription ? this.props.elementActive.local.id : this.props.elementActive.element.tourlocalization.id,
                startPlace: this.state.placeDeparture,
                price: this.props.elementPrice,
                tripCommentary: this.state.description,
                carrier: this.props.isTourDescription ? this.props.elementActive.tour.author.id : this.props.elementActive.element.author.id,
                currencyType: this.props.storeState.currencies.length > 0 ? this.props.storeState.currencies[this.props.storeState.activeCurrencyNumber].id : undefined,
                tripType: 'Tour',
                newPhone: this.state.telNumber,
                passengerNumber: this.state.numberOfPeople,
                promocode: this.state.promoCode,
                clientEmail: this.state.email,
                frontendAddress: requests.frontendAddress,
                userLangCookies: (cookies.get('userLang', { path: '/' })).toUpperCase(),
                country: cookies.get('country', { path: '/' })
            };
            console.log("--------------------------------")
            console.log(body);
            console.log("--------------------------------")
            this.sendTripRequest(JSON.stringify(body));


        }
    }

    promocodeVerification = () => {

        let that = this;

        //ЭтО ЗаПрОс На ПрОвЕрКу ПрОмОкОдА. ОчЕнЬ НуЖеН

        startRefresherGlobal(this, true)
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
                        promoCodIsOk: true
                    });
                    thenFuncGlobal(that)
                }
            })
            .catch(error => {
                console.log('get wasted promocode answer');
                that.setState({
                    promoCodIsOk: false
                });
                catchFuncGlobal(that)
            })
    }
    render() {
        if (this.state.travelVisibility !== this.props.travelVisibility) {

            this.setState({

                travelVisibility: this.props.travelVisibility,
                //page: 1,
                //showPages: 1,
                //showPanelVariant: 0,
                //Form value Begin

                firstName: this.props.storeState.userData ? this.props.storeState.userData.firstName : "",
                //lastName: props.storeState.userData ? props.storeState.userData.lastName : "",
                telNumber: this.props.storeState.userData ? this.props.storeState.userData.workPhone : "",
                email: this.props.storeState.userData ? this.props.storeState.userData.email : "",
                date: this.props.elementActive ? this.props.elementActive.date : new Date(),
                departureTime: "",
                numberOfPeople: "",
                placeDeparture: "",
                description: "",
                promoCode: "",
                discount: 0,
                checkBoxes: false,
                emailValid: false,
                freeSeats: this.props.freeSeats,
                //Form value end
                errorMes: false,
                //flagAllOk: false,
                promoCod: "",
                promoCodIsOk: true,
                time: this.props.globalReduser.time,
            })
        }
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

        if (this.props.driversState) {

            if (this.props.driversState.driverCarDescription.carCapacity) {
                for (let i = 0; i < this.props.driversState.driverCarDescription.carCapacity; i++) {
                    carCapacityArray.push(i + 1)
                }
            } else {
                carCapacityArray.push(1);
            }


        }

        return (
            <>
                {
                    //это на время подключения startTravelForm к турам
                    this.props.driversState ?
                        <>
                            {
                                isMobileOnly ?
                                    <>
                                        <Dialog fullScreen open={this.props.travelVisibility} onClose={this.props.changeTravelVisibility} >
                                            <StartTravelContent that={this} flagAllOk={flagAllOk} carCapacityArray={carCapacityArray} activeCurrency={this.props.activeCurrency} textInfo={this.props.textInfo} changeSuccessVisibility={this.props.changeSuccessVisibility} />
                                        </Dialog>
                                    </>
                                    :
                                    <>
                                        <Dialog open={this.props.travelVisibility} onClose={this.props.changeTravelVisibility} >
                                            <StartTravelContent that={this} flagAllOk={flagAllOk} carCapacityArray={carCapacityArray} activeCurrency={this.props.activeCurrency} textInfo={this.props.textInfo} changeSuccessVisibility={this.props.changeSuccessVisibility} />
                                        </Dialog>
                                    </>
                            }
                        </> : <React.Fragment />
                }
                {
                    this.props.toursState ?
                        <>
                            <Dialog open={this.props.travelVisibility} onClose={this.props.changeTravelVisibility} >

                                {/* <div className="d-flex justify-content-center align-items-center p-5">В Разработке</div> */}
                                <StartTravelContent that={this} flagAllOk={flagAllOk} carCapacityArray={carCapacityArray} activeCurrency={this.props.activeCurrency}
                                    textInfo={this.props.textInfo} changeSuccessVisibility={this.props.changeSuccessVisibility} isTour={true} elementActive={this.props.elementActive}
                                    isTourDescription={this.props.isTourDescription}
                                />
                            </Dialog>
                        </>
                        : <React.Fragment />
                }


            </>
        )

    }

}

const StartTravelForm = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(StartTravelFormClass);

export default StartTravelForm;
