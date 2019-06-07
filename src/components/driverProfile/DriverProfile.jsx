import React from 'react';
import './DriverProfile.css';
import './DriverInfo.css';
import './DriverAdaptedRoute.css';
import { connect } from 'react-redux'
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import DriversProfileComments from './DriversProfileComments';
import Manipulator from '../manipulator/Manipulator';
import Header from '../header/Header';
import { setDriversRouteChange, setDriverCarDescription, setCarTypes } from '../../redusers/ActionDrivers';
import StartTravelForm from '../startTravelForm/StartTravelForm';
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess';
import DriverAdaptedRoute from './DriverAdaptedRoute';
import DriverInfo from './DriverInfo.jsx';
import DriverProfileTours from './DriverProfileTours';
import requests from '../../config';
import { setCities } from '../../redusers/Action'
import RouteMenu from '../home/HomeBody/RouteMenu';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'material-ui/DatePicker';
import ReactTelInput from 'react-telephone-input'
import flags from '../driverProfileRegistration/img/flags.png'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import MapContainer from '../home/HomeBody/MapContainer';
import {setLengthTime} from '../../redusers/ActionDrivers'
import axios from 'axios';

class DriverProfileClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            travelVisibility: 'none',
            successVisibility: 'none',
            page: 1,
            // mapRwanda:true,
            showPages: 1,
            showPanelVariant: 0,

            //Form value Begin
            firstName:"",
            lastName:"",
            telNumber:"",
            email:"",
            date: this.props.storeState.date ? this.props.storeState.date : new Date(),
            departureTime:"",
            numberOfPeople:"",
            plaseDeparture:"",
            description:"",
            promoCode:"",
            checkBoxes:false,
            //Form value end

            promoCod:"",

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
        this.state = { ...this.state, "mapRwanda": true }
        
        props.dispatch(setLengthTime("-", "-"));
        let now = new Date(Date.now());
        //debugger;
        console.log(props.match);
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
            let that = this;
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
                        that.props.dispatch(setDriverCarDescription(data.driverCarDescription));
                        that.props.dispatch(setCarTypes(data.carTypes));
                    }

            })
            .catch(function (error){
                console.log('bad');
                console.log('An error occurred:',error);
            });
            
/*
            //ЭтО ЗаПрОс На ПрОвЕрКу ПрОмОкОдА. ОчЕнЬ НуЖеН


            axios.get(requests.checkPromocode+"?code=PROMOCODE1")
            .then(response =>{
                console.log('get promocode answer');
                console.log(response);
            })
            .catch(error => {
                console.log('get wasted promocode answer');
            })
*/
}
        else{
            props.history.push('/'); 
        }      
            
    }
    showMorePages=()=> {
        this.setState({
            page: this.state.page + 1,
            showPages: this.state.showPages + 1
        })
    }
    setPage=(page)=> {
        if (page !== "...") {
            this.setState(
                {
                    page: page,
                    showPages: 1
                }
            )
        }
    }
    goToDrivers=()=> {
        this.props.dispatch(setDriversRouteChange(true));
        this.props.history.push('/drivers');
    }
    changeTravelVisibility=(value)=> {
        this.setState({
            travelVisibility: value
        })
    }
    changeSuccessVisibility=(value)=> {
        this.setState({
            successVisibility: value
        })
    }
    changePanelVariant=(value)=> {
        this.setState({
            showPanelVariant: value
        })
    }
    parseStringToArray = (cities, country) => {

        let newCities = [];
        let newString = cities.slice(5);
        let newArrayCities = newString.split("-to-");
        for (let i = 0; i < newArrayCities.length; i++) {
            let stringWhithSpaces = newArrayCities[i].replace(/-/g, ' ');
            stringWhithSpaces = stringWhithSpaces + ', ' + country;
            newCities[i] = { point: stringWhithSpaces, lat: "", long: "" };
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
        if(this.props.driversState.travelLength == "-" && this.props.driversState.travelTime == "-"){
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
            let lengthString = getLengthString(travelLength);
            let timeString = getTimeString(travelTime);
            this.props.dispatch(setLengthTime(lengthString, timeString));
        }
        
        
      }

    sendTripRequest = () => {
        let bodybody = JSON.stringify({
            newFirstName: 'klo',
            newSecondName: 'olk',
            startDate: '2009-09-09',
            startTime: '10:15',
            route:[
                {
                    point:"Тбилиси, Грузия",
                    lat:41.7151377,
                    long:44.82709599999998
                },
                {
                    point:"Мцхета, Грузия",
                    lat:41.8411674,
                    long:44.70738640000002 
                }
            ],
            startPlace: '16 проспект Шота Руставели, Тбилиси, Грузия',
            price: 100,
            tripCommentary: 'tripCommentary',
            carrier: this.props.match.params.id,
            currencyType: this.props.storeState.currencies.length>0 ? this.props.storeState.currencies[this.props.storeState.activeCurrencyNumber].id : undefined,
            tripType: 'Trip',
            newPhone: '+1234567890',
            passengerNumber: '15',
            promocode: 'PROMOCODE1',
            clientEmail: 'gorlev98@mail.ru',
            carId: this.props.match.params.carId,
            frontendAddress: requests.frontendAddress
        });
        
        fetch(requests.createNewTrip,{
            method: 'POST', body: bodybody,
            headers: { 'content-type': 'application/json'}
        })
        .then(response => {
            return response.json();
        })
        .then(function (data){
            if (data.error) {
                console.log("bad");
                throw data.error;
            }
            else{
                console.log('good');
                console.log(data);
            }
        })
        .catch(function (error){
            console.log('bad');
            console.log('An error occurred:',error);
        });
    }
    validate = ()=>{
        
    }
    render() {
        console.log('DriverProfile render');
        console.log(this.props.driversState);

        let driver = this.props.driversState.driverCarDescription;
        console.log('driver', driver);

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
        if(this.props.driversState.driverCarDescription.carCapacity){
            for(let i = 0; i<this.props.driversState.driverCarDescription.carCapacity;i++){
                carCapacityArray.push(i+1)
            }
        }else{
            carCapacityArray.push("1") 
        }
        
        

        return (
            <React.Fragment>
                <div className="drivers_top_background">
                    <Header history={this.props.history} />
                    <div className="wrapper d-flex flex-column">
                        <div className="drivers_top_block d-flex flex-column">
                            
                            <DriverInfo element={driver} />
                            <div className="driversRoute col-12 ">
                                <hr/>
                                <h3>{this.props.storeState.cities.map((element,index)=>{

                                    return(index == this.props.storeState.cities.length-1 ? element.point : element.point+ "-")
                                    
                                })}</h3>
                                <div className="route_time_text col-sm-6 col-12">Время в пути без остановок:
                                <p2>{this.props.driversState.travelLength}</p2>
                            <p1>{this.props.driversState.travelTime}</p1>
                                    </div>
                            </div>
                            <div className="drivers_route col-12 p-0 d-flex" >
                                <div className="drivers_route_form col-md-6 col-12 p-0">
                                    <div className="d-flex flex-sm-row flex-column col-12 p-0">
                                        <div className="d-flex flex-sm-column flex-column-reverse col-sm-6 col-12">
                                            <TextField
                                                label="Имя"
                                                defaultValue={this.state.firstName}
                                                onChange={(event)=>{this.setState({firstName:event.target.value})}}
                                                className="textField"
                                                margin="normal"
                                                variant="outlined"
                                            />
                                            <ReactTelInput
                                                defaultCountry={this.props.storeState.isoCountryMap}
                                                classNames="route_datePhoneInput"
                                                flagsImagePath={flags}
                                                defaultValue = {this.state.telNumber}
                                                onChange={(telNumber, selectedCountry) => { this.setState({ telNumber: telNumber }) }}
                                                onBlur={(value) => { console.log(value) }}
                                                initialValue="Телефон"
                                            />

                                            <DatePicker onChange={(nul, date) => { this.setState({ date: date }) }} shouldDisableDate={(day)=>{let a = day}} defaultDate={this.state.date} minDate={new Date()} disableYearSelection={true} floatingLabelText="Дата отправления" className="route_dateCalendarModal" />
                                            
                                            <FormControl className="route_dateSelect">
                                            <InputLabel htmlFor="select-multiple">Колличество человек</InputLabel>
                                            <Select
                                                value={this.state.numberOfPeople}
                                                input={<Input id="select-multiple" variant="outlined"/>}
                                                onChange={(event)=>{this.setState({numberOfPeople:event.target.value})}}
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
                                                defaultValue={this.state.lastName}
                                                onChange={(event)=>{this.setState({lastName:event.target.value})}}
                                                className="textField"
                                                margin="normal"
                                                variant="outlined"
                                            />

                                            <TextField
                                                label="Email"
                                                defaultValue={this.state.email}
                                                onChange={(event)=>{this.setState({email:event.target.value})}}
                                                className="textField"
                                                margin="normal"
                                                variant="outlined"
                                            />
                                            <FormControl className="route_dateSelect">
                                            <InputLabel htmlFor="select-multiple">Время</InputLabel>
                                            <Select
                                                value={this.state.departureTime}
                                                input={<Input id="select-multiple" variant="outlined"/>}
                                                onChange={(event)=>{this.setState({departureTime:event.target.value})}}
                                            >
                                                 {this.state.time.map(name => ( 
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
                                                defaultValue={this.state.plaseDeparture}
                                                onChange={(event)=>{this.setState({plaseDeparture:event.target.value})}}
                                                className="textField"
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
                                            onChange={(event)=>{this.setState({description:event.target.value})}}
                                            className="textField w-100"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </div>
                                    <div className="d-flex align-items-center col-12 p-0">
                                    <Checkbox
                                        checked={this.state.checkBoxes}
                                        onChange={(event)=>{this.setState({checkBoxes:!this.state.checkBoxes})}}
                                     />
                                     <span className="drivers_route_Link">Я принимаю условия <Link to="">договора оферты</Link></span> 
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between col-12 py-2">
                                        <div className="d-flex drivers_routePromo"><input placeholder="Введите промо код" value={this.state.promoCod} onChange={(event)=>{this.setState({promoCod:event.target.value})}} type="text"/> <span onClick={()=>{this.state.promoCode ?(this.setState({promoCod:"",promoCode:""})):(this.setState({promoCode:this.state.promoCod}))}}>{this.state.promoCode ? "сбросить":"применить"}</span></div>
                                        <h3 className="drivers_routePrice">${this.props.driversState.driverCarDescription.price}</h3>
                                        <div className="drivers_routeBtn" onClick={()=>{this.validate()}}>
                                            <span>Заказать тур</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 d-md-block d-none ">
                                <MapContainer cities={this.props.storeState.cities} setLengthTime={this.setLengthTime} mapUpdate={true} />
                                </div>
                                
                            </div>
                            {/* <DriverAdaptedRoute element={driver} date={this.props.storeState.date} cities={this.props.storeState.cities}
                                travelTime={this.props.driversState.travelTime} travelLength={this.props.driversState.travelLength} goToDrivers={this.goToDrivers}
                                changeTravelVisibility={this.changeTravelVisibility}
                            /> */}
                        </div>
                    </div>
                </div>
                <div className="wrapper d-flex flex-column">
                    <div className="drivers_bottom_background d-flex flex-column" >
                        <div className="drivers_body d-flex">
                            <div className="left_body_part col-12">
                                <div className="driverProfileComments_panel d-flex">
                                    {
                                        buttonNames.map((element, index) =>
                                            <button className={this.state.showPanelVariant === index ? "driverProfileComments_panel_element driverProfileComments_panel_selectedElement" : "driverProfileComments_panel_element"} onClick={() => this.changePanelVariant(index)}>{element}</button>
                                        )
                                    }
                                </div>
                                <button onClick={()=>this.sendTripRequest()}>Press Me! Now!</button>
                                {
                                    this.state.showPanelVariant === 0 &&
                                    <React.Fragment>
                                        <DriversProfileComments page={this.state.page} showPages={this.state.showPages} driver={driver} />
                                        <Manipulator number={this.props.commentState.comments.length} page={this.state.page} elementsNumber={5}
                                            setPage={this.setPage} showMorePages={this.showMorePages} />
                                    </React.Fragment>
                                }
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
                <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
                    travelVisibility={this.state.travelVisibility} successVisibility={this.changeSuccessVisibility} />
                <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility} />
            </React.Fragment>

        )
    }
}

const DriverProfile = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
        commentState: state.CommentReduser
    }),
)(DriverProfileClass);

export default DriverProfile;