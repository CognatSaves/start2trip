import React from 'react';
import './Drivers.css';
import {set_state} from '../../redusers/Action'

import DriversBody from './DriversBody/DriversBody';
import { connect } from 'react-redux'
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'

class DriversClass extends React.Component {
  constructor(props) {

    
    super(props);
    let maxPrice = this.maxPriceCalc(this.props.driversState.driversList);
    this.state = {
      travelVisibility: false,
      successVisibility: 'none',
      maxPrice: maxPrice,
      elementPrice:0,
    }
  }
  maxPriceCalc = (array) =>{
    let maxValue = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].price > maxValue) {
        maxValue = array[i].price;
      }
    }
    return maxValue;
  }
  componentWillMount() {
    this.props.setMaxPrice(this.state.maxPrice);
  }
  shouldComponentUpdate(nextProps, nextState){
    if(JSON.stringify(nextProps.driversState.driversList)!==JSON.stringify(this.props.driversState.driversList)){
      
      this.props.setMaxPrice(this.maxPriceCalc(nextProps.driversState.driversList))
    }
    return true;
  }
  changeTravelVisibility=(elementPrice)=> {
    
    this.setState({
      travelVisibility: !this.state.travelVisibility,
      elementPrice:elementPrice
    })
  }
  changeSuccessVisibility=(value)=> {
    this.setState({
      successVisibility: value
    })
  }
  parseStringToArray=(cities,country, langISO)=>{
    
    let newCities = [];
    let newString = cities.split('from-');
    let newArrayCities = newString[1].split("-to-");
    for(let i = 0; i<newArrayCities.length;i++){
      let stringWithSpaces = newArrayCities[i].replace(/-/g, ' ');
      stringWithSpaces = stringWithSpaces + ', ' +country;
      
      stringWithSpaces=this.props.globalReduser.convertFromUrlTranslation(stringWithSpaces, langISO ? langISO : 'ENG');
      
      newCities[i]={point: stringWithSpaces, lat: "", long: ""};
    }
    
    this.props.setCities(newCities)
  }
  

  render() {
    let cities;
    let country;
    if(this.props.match){
      if(this.props.storeState.cities[0].point === ""){
        
        let langISO = this.props.globalReduser.findGetParameter('lang');
        
        cities = this.props.match.params.cities;
        country = this.props.match.params.country;
        this.parseStringToArray(cities,country,langISO);
      }else{
        let route = "";
          for (let i = 0; i < this.props.storeState.cities.length; i++) {
            let arrayAddress = this.props.storeState.cities[i].point.split(',');
            country = arrayAddress[arrayAddress.length - 1].slice(1);
            
            
            let stringWithoutCountry = "";
            for (let k = 0; k < arrayAddress.length - 1; k++) {
              stringWithoutCountry += arrayAddress[k]
            }
            let stringWithoutSpaces = stringWithoutCountry.replace(/ /g,'-');
             stringWithoutSpaces = stringWithoutSpaces.replace(/[/]/g,'');
            if (i == 0) {
              route = "from-" + stringWithoutSpaces;
            } else {
              route += "-to-" + stringWithoutSpaces;
            }
          }
         cities = route; 
      }
    }
    let storeState= this.props.storeState;
    let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber];
    
    return (
      <React.Fragment>
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
            <DriversBody changeTravelVisibility={this.changeTravelVisibility} country={country} cities={cities}/>
          </div>
        </div>
        <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} driversState={this.props.driversState}
                        travelVisibility={this.state.travelVisibility} isoCountryMap={this.props.storeState.isoCountryMap} storeState={this.props.storeState}
                        elementPrice={this.state.elementPrice} activeCurrency={activeCurrency} textInfo={this.props.storeState.languageTextMain.startTravelForm}/>
        <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility} />
      </React.Fragment>
    );
  }
}
const Drivers = connect(
  (state) => ({
    storeState: state.AppReduser,
    driversState: state.DriversReduser,
    globalReduser: state.GlobalReduser
  }),
  (dispatch) => ({
    setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities}),
    setMaxPrice: (maxPrice) => dispatch({ type: "SET_MAX_PRICE", maxPrice: maxPrice, pricePart: 1000 })
  })
)(DriversClass);

export default Drivers;