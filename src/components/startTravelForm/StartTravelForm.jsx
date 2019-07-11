import React from 'react';
import './StartTravelForm.css';
import './StartTravelBlockStyles.css';
import { Link } from 'react-router-dom';
import grayCross from './pictures/close_gray.svg';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'material-ui/DatePicker';
import ReactTelInput from 'react-telephone-input'
import flags from '../driverProfileRegistration/img/flags.png'
import { isMobileOnly } from 'react-device-detect';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

const Content = (that,flagAllOk,carCapacityArray) => {
    return (
        <div className="startTravelForm" >
            <div className="startTravelForm_element mx-auto">
                <div className="startTravelForm_headerText">Забронировать поездку</div>
                <button className="startTravelForm_crossPlace" onClick={() => that.props.changeTravelVisibility()}>
                    <img src={grayCross} width="100%" height="100%" alt="grayCross"></img>
                </button>
            </div>

            <div className="drivers_route_form col-md-6 col-12 p-0">
                <div className="d-flex flex-sm-row flex-column col-12 p-0">
                    <div className="d-flex flex-sm-column flex-column-reverse col-sm-6 col-12">
                        <TextField
                            label="Имя"
                            value={that.state.firstName}
                            onChange={(event) => { that.setState({ firstName: event.target.value }); event.target.previousSibling.classList.remove("driver_route-error") }}
                            className="textField validate"
                            margin="normal"
                            variant="outlined"
                        />
                        <ReactTelInput
                            // defaultCountry={that.props.storeState.isoCountryMap}
                            classNames="route_datePhoneInput"
                            flagsImagePath={flags}
                            value={that.state.telNumber}
                            onChange={(telNumber, selectedCountry) => { that.setState({ telNumber: telNumber }); document.querySelector(".route_datePhoneInput").children[1].classList.remove("driver_route-error") }}
                            onBlur={(value) => { console.log(value) }}
                            initialValue="Телефон"
                        />

                        <DatePicker onChange={(nul, date) => { that.setState({ date: date }); document.querySelector(".route_dateCalendarModal").classList.remove("driver_route-error") }} shouldDisableDate={(day) => { let a = day }} defaultDate={that.state.date} minDate={new Date()} disableYearSelection={true} floatingLabelText="Дата отправления" className="route_dateCalendarModal" />

                        <FormControl className="route_dateSelect numberOfPeople">
                            <InputLabel htmlFor="select-multiple">Количество человек</InputLabel>
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
                    </div>
                    <div className="d-flex flex-column  col-sm-6 col-12">
                        <TextField
                            label="Фамилия"
                            value={that.state.lastName}
                            onChange={(event) => { that.setState({ lastName: event.target.value }); event.target.previousSibling.classList.remove("driver_route-error") }}
                            className="textField validate"
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            label="Email"
                            value={that.state.email}
                            onChange={(event) => { that.setState({ email: event.target.value }); event.target.previousSibling.classList.remove("driver_route-error") }}
                            className="textField validate"
                            margin="normal"
                            variant="outlined"
                        />
                        <FormControl className="route_dateSelect departureTime">
                            <InputLabel htmlFor="select-multiple">Время</InputLabel>
                            <Select
                                value={that.state.departureTime}
                                input={<Input id="select-multiple" variant="outlined" />}
                                onChange={(event) => { that.setState({ departureTime: event.target.value }); document.querySelector(".departureTime").classList.remove("driver_route-error") }}
                            >
                                {that.state.time.map(name => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <TextField
                            label="Место отправления"
                            multiline
                            rowsMax="4"
                            defaultValue={that.state.placeDeparture}
                            onChange={(event) => { that.setState({ placeDeparture: event.target.value }); event.target.previousSibling.classList.remove("driver_route-error") }}
                            className="textField placeDeparture"
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
                        defaultValue={that.state.description}
                        onChange={(event) => { that.setState({ description: event.target.value }); event.target.previousSibling.classList.remove("driver_route-error") }}
                        className="textField w-100 description"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div className="d-flex align-items-center col-12 p-0">
                    <Checkbox
                        checked={that.state.checkBoxes}
                        onChange={(event) => { that.setState({ checkBoxes: !that.state.checkBoxes }) }}
                    />
                    <span className="drivers_route_Link">Я принимаю условия <Link to="">договора оферты</Link></span>
                </div>
                <div className=" d-flex align-items-center justify-content-between flex-md-row flex-column col-12 py-md-0 py-4">
                    <div className="d-flex drivers_routePromo">
                        <input placeholder="Введите промо код" readOnly={that.state.promoCode} value={that.state.promoCod} onChange={(event) => { that.setState({ promoCod: event.target.value }) }} type="text" />
                        <span onClick={() => { that.state.promoCode ? (that.setState({ promoCod: "", promoCode: "", discount: 0 })) : (that.promocodeVerification()) }}>{that.state.promoCode ? "сбросить" : "применить"}</span>
                    </div>
                    <h3 className="drivers_routePrice">${that.props.driversState.driverCarDescription.price * (100 - that.state.discount) / 100}</h3>
                    <div className={flagAllOk ? "drivers_routeBtn drivers_routeBtn-active" : "drivers_routeBtn"} onClick={() => { that.validate() }}>
                        <span>Заказать тур</span>
                    </div>
                </div>
                <div className="d-flex justify-content-end errorMes">
                    {that.state.errorMes ? <error>Заполните правильно все поля</error> : <div />}
                </div>

            </div>
        </div>
    )
}

export default class StartTravelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            telNumber: "",
            date:  new Date(),
            adress: "",
            numberOfPeople:"",
            placeDeparture:"",
            description: "",
            departureTime: "",
            checkBoxes:false,
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
    }
    render() {
        let flagAllOk = false;
        if (
            this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.telNumber !== "" &&
            this.state.email !== "" &&
            this.state.date !== "" &&
            this.state.departureTime !== "" &&
            this.state.numberOfPeople !== "" &&
            this.state.placeDeparture !== "" &&
            this.state.description !== "" &&
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
                            {Content(this,flagAllOk,carCapacityArray)}
                        </Dialog>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Dialog open={this.props.travelVisibility} onClose={this.props.changeTravelVisibility} >
                            {Content(this,flagAllOk,carCapacityArray)}
                        </Dialog>
                    </React.Fragment>
                }

            </React.Fragment>
        )

    }

}
