import React from 'react';
import './Drivers.css';
import {set_state} from '../../redusers/Action'

import DriversBody from './DriversBody/DriversBody';
import { connect } from 'react-redux'
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'

class DriversClass extends React.Component {
  constructor(props) {

    function maxPriceCalc(array) {
      let maxValue = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].price > maxValue) {
          maxValue = array[i].price;
        }
      }
      return maxValue;
    }
    super(props);
    let maxPrice = maxPriceCalc(this.props.driversState.drivers);
    this.state = {
      travelVisibility: 'none',
      successVisibility: 'none',
      maxPrice: maxPrice
    }
  }
  componentWillMount() {
    this.props.setMaxPrice(this.state.maxPrice);
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
  parseStringToArray=(cities,country)=>{
    
    let newCities = [];
    let newString = cities.slice(5);
    let newArrayCities = newString.split("-to-");
    for(let i = 0; i<newArrayCities.length;i++){
      let stringWhithSpaces = newArrayCities[i].replace(/-/g, ' ');
      stringWhithSpaces = stringWhithSpaces + ' , ' +country;
      newCities[i]={point: stringWhithSpaces, lat: "", long: ""};
    }
    this.props.setCities(newCities)
  }
  

  render() {
    let cities;
    let country;
    if(this.props.match){
      if(this.props.storeState.cities[0].point === ""){
        cities = this.props.match.params.cities;
        country = this.props.match.params.country;
        this.parseStringToArray(cities,country);
      }else{
        let route = "";
          for (let i = 0; i < this.props.storeState.cities.length; i++) {
            let arrayAdress = this.props.storeState.cities[i].point.split(',');
            country = arrayAdress[arrayAdress.length - 1].slice(1);
            
            
            let stringWhithoutCountry = "";
            for (let k = 0; k < arrayAdress.length - 1; k++) {
              stringWhithoutCountry += arrayAdress[k]
            }
            let stringWhithoutSpaces = stringWhithoutCountry.replace(/ /g,'-');
             stringWhithoutSpaces = stringWhithoutSpaces.replace(/[/]/g,'');
            if (i == 0) {
              route = "from-" + stringWhithoutSpaces;
            } else {
              route += "-to-" + stringWhithoutSpaces;
            }
          }
         cities = route; 
      }
    }
  
    return (
      <React.Fragment>
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
            <DriversBody changeTravelVisibility={this.changeTravelVisibility} country={country} cities={cities}/>
          </div>
        </div>
        <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
          travelVisibility={this.state.travelVisibility} successVisibility={this.changeSuccessVisibility} />
        <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility} />
      </React.Fragment>
    );
  }
}
const Drivers = connect(
  (state) => ({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  }),
  (dispatch) => ({
    setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities}),
    setMaxPrice: (maxPrice) => dispatch({ type: "SET_MAX_PRICE", maxPrice: maxPrice, pricePart: 100 })
  })
)(DriversClass);

export default Drivers;