import React from 'react';
import { Link } from 'react-router-dom';

import grayCross from '../media/close_gray.svg';
import flags from '../media/flags.png'


import TextField from '@material-ui/core/TextField';
import ReactTelInput from 'react-telephone-input'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class StartTravelContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    render() {
        const { that, flagAllOk, carCapacityArray, activeCurrency, textInfo, changeSuccessVisibility } = this.props;
        let isCurrencyLoaded = activeCurrency && activeCurrency.symbol;
        let today = new Date()
        let selectDate = new Date(that.props.storeState.date)
        let newTime = [];
        if (today.getDate() === selectDate.getDate() && today.getMonth() === selectDate.getMonth() && today.getFullYear() === selectDate.getFullYear()) {
            let todayHours = today.getHours() + 3
            for (let i = 0; i < that.state.time.length; i++) {
                let newHours = that.state.time[i].split(":")
                newHours = newHours[0]
                if (Number(newHours) > todayHours) {
                    newTime.push(that.state.time[i])
                }
            }
        } else {
            newTime = that.state.time
        }
        let seats = [];
        let time = "";
        let departurePoint = "";
        let isPricePerPerson;
        let seatsNumberMultiplicator;
        let calculatedPrice
        if (this.props.elementActive && this.props.elementActive !== "backdropClick") {
            
            //this shitty code means, that if the object is a tour, there can be different number of seats in different days
            //then I don't like to check tourSeatsData here again. The number of free seats will be taken throw other ways
            let seatsNumber = this.props.isTourDescription ?
              (that.state.freeSeats || that.state.freeSeats===0 ? that.state.freeSeats : this.props.elementActive.tour.seats )
             : (that.state.freeSeats || that.state.freeSeats===0 ? that.state.freeSeats : this.props.elementActive.element.seats);
            for(let i=1; i<seatsNumber+1; i++){
                seats.push(i);
            }
            
            time = this.props.isTourDescription ? this.props.elementActive.tour.time : this.props.elementActive.element.time;
            departurePoint = this.props.isTourDescription ? this.props.elementActive.local.departurePoint.point : this.props.elementActive.element.tourlocalization.departurePoint.point;
            /*
            if(this.props.isTourDescription){
                for (let i = 1; i < this.props.elementActive.tour.seats + 1; i++) {
                    seats.push(i)
                }
                time = this.props.elementActive.tour.time
                 departurePoint = this.props.elementActive.local.departurePoint.point
            }else{
                for (let i = 1; i < this.props.elementActive.element.seats + 1; i++) {
                    seats.push(i)
                }
                time = this.props.elementActive.element.time
                departurePoint = this.props.elementActive.element.tourlocalization.departurePoint.point
            }*/
            isPricePerPerson = this.props.isTourDescription ? this.props.elementActive.tour.isPricePerPerson : this.props.elementActive.element.isPricePerPerson;
            seatsNumberMultiplicator = isPricePerPerson && that.state.numberOfPeople && that.state.numberOfPeople>1 ? that.state.numberOfPeople : 1;
            calculatedPrice = Math.ceil(that.props.elementPrice * activeCurrency.costToDefault * seatsNumberMultiplicator);

            if(that.state.placeDeparture === ""){
                that.setState({ placeDeparture: departurePoint })
            }
        }
        
        let key = JSON.stringify(this.props.that.state);
        
        
        
        return (
            <>

                <div className="startTravelForm p-3"/* key={key}*/>
                    <div className="startTravelForm_element mx-auto">
                        <div className="startTravelForm_headerText">{textInfo.headerText}</div>
                        <button className="startTravelForm_crossPlace" onClick={() => that.props.changeTravelVisibility(0,null)}>
                            <img src={grayCross} width="100%" height="100%" alt="grayCross"></img>
                        </button>
                    </div>
                    <div className="drivers_route_form col-12 p-0">
                        <div className="d-flex flex-sm-row flex-wrap flex-column col-12 p-0">
                            <div className="col-sm-6 col-12 order-0">
                                <TextField
                                    error={that.state.errorMes && !that.state.firstName}
                                    label={textInfo.nameLabel + '*'}
                                    value={that.state.firstName}
                                    onChange={(event) => { that.setState({ firstName: event.target.value }); }}
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
                                    onChange={(telNumber, selectedCountry) => {
                                        that.setState({ telNumber: telNumber });
                                        document.querySelector(".route_datePhoneInput").children[1].classList.remove("driver_route-error")
                                    }}
                                    onBlur={(value) => { console.log(value) }}
                                    initialValue={textInfo.telInputInitial}
                                />
                            </div>
                            <div className="col-sm-6 col-12 order-3">
                                <TextField
                                    error={that.state.errorMes && !that.state.emailValid && !that.state.email}
                                    label="Email*"
                                    value={that.state.email}
                                    onChange={(event) => { that.setState({ email: event.target.value }); }}
                                    className="textField w-100"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>

                            {this.props.isTour &&
                                <>
                                    <div className="col-sm-6 col-12 order-6">
                                        <DatePicker disabled={true} onChange={(nul, date) => { that.setState({ date: that.props.globalReduser.convertDateToUTC(date) }); document.querySelector(".route_dateCalendarModal").classList.remove("driver_route-error") }}
                                /*shouldDisableDate={(day) => { let a = day }}*/ defaultDate={that.state.date} minDate={new Date()} disableYearSelection={true}
                                            floatingLabelText={textInfo.startDate} className="route_dateCalendarModal" />
                                    </div>
                                    <div className="col-sm-6 col-12 order-5">
                                        <FormControl className="route_dateSelect numberOfPeople w-100">
                                            <InputLabel htmlFor="select-multiple">{textInfo.peopleNumber + '*'}</InputLabel>
                                            <Select
                                                value={that.state.numberOfPeople}
                                                input={<Input id="select-multiple" variant="outlined" />}
                                                onChange={(event) => { that.setState({ numberOfPeople: event.target.value }); document.querySelector(".numberOfPeople").classList.remove("driver_route-error") }}
                                            >
                                                {seats.map(name => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </>
                            }

                            <div className="col-sm-6 col-12 order-4">
                                <FormControl className="route_dateSelect departureTime w-100">
                                    <InputLabel htmlFor="select-multiple">{textInfo.timeLabel + '*'}</InputLabel>
                                    <Select
                                        value={that.state.departureTime}
                                        input={<Input id="select-multiple" variant="outlined" />}
                                        onChange={(event) => {
                                            that.setState({ departureTime: event.target.value });

                                            let obj = document.querySelector(".departureTime");
                                            document.querySelector(".departureTime").classList.remove("draver_route-error")
                                        }}
                                    >
                                        {this.props.isTour ?

                                            <MenuItem key={time} value={time}>
                                                {time}
                                            </MenuItem>
                                            :
                                            newTime.map(name => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))
                                        }

                                    </Select>
                                </FormControl>
                            </div>
                            <div className=" col-12 order-8">
                                <TextField
                                    label={textInfo.placeDepartureLabel + '*'}
                                    multiline
                                    rowsMax="4"
                                    disabled={this.props.isTour}
                                    defaultValue={that.state.placeDeparture}
                                    onChange={(event) => { 
                                        that.setState({ placeDeparture: event.target.value });
                                        if(event.target.previousSibling){
                                             event.target.previousSibling.classList.remove("draver_route-error")
                                        }
                                    }}
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
                                onChange={(event) => { that.setState({ description: event.target.value }); }}
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
                                <span className="drivers_route_Link">{textInfo.driversRouteLink[0] + ' '}<Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/terms/"} target="_blank">{textInfo.driversRouteLink[1]}</Link></span>
                            </div>
                            <span className="errorMes col-12" style={{ display: !that.state.checkBoxes && that.state.errorMes ? "block" : "none" }}>{textInfo.errorContract}</span>
                        </div>
                        <span className="drivers_route_messege">{this.props.isTour?"":textInfo.returnToPoint}</span>
                        <div className=" d-flex align-items-center justify-content-between flex-md-row flex-column col-12 py-md-0 py-4">
                            <div className="d-flex flex-column">
                                <div className="d-flex drivers_routePromo">
                                    <input placeholder={textInfo.promoPlaceholder} readOnly={that.state.promoCode} value={that.state.promoCod} onChange={(event) => { that.setState({ promoCod: event.target.value }) }} type="text" />
                                    <span onClick={() => {
                                        that.state.promoCode ? (that.setState({ promoCod: "", promoCode: "", discount: 0 })) :
                                            (that.promocodeVerification())
                                    }}>{that.state.promoCode ? textInfo.promoVerification[0] : textInfo.promoVerification[1]}</span>
                                </div>
                                <div className="d-flex justify-content-start errorMes">
                                    {!that.props.storeState.isGoodAnswer && !that.state.promoCodIsOk ? <error>{textInfo.uncorrectPromocode}</error> : <div />}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-md-0 pt-4">
                                {
                                    that.state.promoCode ?
                                        <h3 className="drivers_routePrice" style={{ textDecoration: 'line-through', color: 'rgb(144,144,144)', marginRight: '5px', fontSize: '16px', lineHeight: '28px' }}>
                                            {
                                                isCurrencyLoaded ? ((activeCurrency.isLeft ? activeCurrency.symbol + ' ' : '')
                                                    + calculatedPrice
                                                    + (!activeCurrency.isLeft ? ' ' + activeCurrency.symbol : '')) : ''
                                            }
                                        </h3> : <React.Fragment />
                                }
                                <h3 className="drivers_routePrice">{isCurrencyLoaded ? ((activeCurrency.isLeft ? activeCurrency.symbol + ' ' : '')
                                    + Math.ceil(calculatedPrice * (100 - that.state.discount) / 100)
                                    + (!activeCurrency.isLeft ? ' ' + activeCurrency.symbol : '')) : ''}</h3>

                                {
                                    isCurrencyLoaded ? /**пока валюты не загружены - не будет отображаться кнопка "заказать тур" */
                                        <div className={flagAllOk ? "drivers_routeBtn drivers_routeBtn-active" : "drivers_routeBtn"} onClick={() => { this.props.isTour ?that.validateTours():that.validate()  }}>
                                            <span>{textInfo.bookTour}</span>
                                        </div>
                                        : <React.Fragment />
                                }
                            </div>
                        </div>

                        <div className="d-flex justify-content-end errorMes">
                            {that.state.errorMes ? <error>{textInfo.errorFieldsMessage}</error> : <div />}
                        </div>
                    </div>

                </div>
            </>
        )
    }
}