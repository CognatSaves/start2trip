import React from 'react';
import './Drivers.css';
import { set_state } from '../../redusers/Action'

import { connect } from 'react-redux'
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'
import DriversProperties from './DriversBody/DriversProperties/DriversProperties';
import DriversBlock from './DriversBody/DriversBlock/DriversBlock';
import Cookies from 'universal-cookie';
import {Helmet} from 'react-helmet';
const cookies = new Cookies();

class DriversClass extends React.Component {
  constructor(props) {


    super(props);
    let maxPrice = this.maxPriceCalc(this.props.driversState.driversList);
    this.state = {
      travelVisibility: false,
      successVisibility: 'none',
      maxPrice: maxPrice,
      elementPrice: 0,
    }
  }
  maxPriceCalc = (array) => {
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
  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps.driversState.driversList) !== JSON.stringify(this.props.driversState.driversList)) {

      this.props.setMaxPrice(this.maxPriceCalc(nextProps.driversState.driversList))
    }
    return true;
  }
  changeTravelVisibility = (elementPrice) => {

    this.setState({
      travelVisibility: !this.state.travelVisibility,
      elementPrice: elementPrice
    })
  }
  changeSuccessVisibility = (value) => {
    this.setState({
      successVisibility: value
    })
  }
  parseStringToArray = (cities, country, langISO) => {

    let newCities = [];
    let newString = cities.split('from-');
    let newArrayCities = newString[1].split("-to-");
    
    if(this.props.storeState.countries.length>0){
      function findCountryNameByISO(that){
        function findLangID(that){               
          let langISO = cookies.get('userLang', {path: '/'});
          //первый for - стандартный случай, остальные - фактически, обработка ошибок
          for(let i=0; i<that.props.storeState.languages.length; i++){
            if(that.props.storeState.languages[i].ISO===langISO){
              return that.props.storeState.languages[i].id;
            }
          }
          for(let i=0; i<that.props.storeState.languages.length; i++){
            if(that.props.storeState.languages[i].ISO==='ENG'){
              return that.props.storeState.languages[i].id;
            }
          }
          return that.props.storeState.languages[0].id;
        }
        let langId = findLangID(that);
        for(let i=0; i<that.props.storeState.countries.length;i++){
          if(that.props.storeState.countries[i].ISO===country){
            let locals =  that.props.storeState.countries[i].locals;
            for(let j=0; j<locals.length; j++){
              if(locals[j].langId===langId){
                return locals[j].name;
              }
            }
            return locals[1].name;
          }
        }
      }
      let countryName = findCountryNameByISO(this);
      for (let i = 0; i < newArrayCities.length; i++) {
        let stringWithSpaces = newArrayCities[i].replace(/-/g, ' ');
        stringWithSpaces = stringWithSpaces+ ',';

        stringWithSpaces = this.props.globalReduser.convertFromUrlTranslation(stringWithSpaces, langISO ? langISO : 'en');

        stringWithSpaces+=countryName;
        newCities[i] = { point: stringWithSpaces, lat: "", long: "" };
      }

      this.props.setCities(newCities)
    }
  }


  render() {
    function createTitleString(string){
      let temp = string.replace('from-','');
      return temp.replace('-to-','-');
    }
    let cities;
    let country;
    if (this.props.match) {

      if (this.props.storeState.cities[0].point === "") {

        // let langISO = this.props.globalReduser.findGetParameter('lang');
        
        cities = this.props.match.params.cities;
        country = this.props.match.params[0];
        country = country.split("-")
        this.parseStringToArray(cities, country[0], country[1]);
      } else {
        let route = "";
        for (let i = 0; i < this.props.storeState.cities.length; i++) {
          let arrayAddress = this.props.storeState.cities[i].point.split(',');
          country = arrayAddress[arrayAddress.length - 1].slice(1);


          let stringWithoutCountry = "";
          if (arrayAddress.length !== 1) {
            for (let k = 0; k < arrayAddress.length - 1; k++) {
              stringWithoutCountry += arrayAddress[k]
            }
          } else {
            stringWithoutCountry += arrayAddress[0];
          }
          let stringWithoutSpaces = stringWithoutCountry.replace(/ /g, '-');
          stringWithoutSpaces = stringWithoutSpaces.replace(/[/]/g, '');
          if (i == 0) {
            route = "from-" + stringWithoutSpaces;
          } else {
            route += "-to-" + stringWithoutSpaces;
          }
        }
        
        cities = route;
      }
    }
    
    let countryName = this.props.storeState.countries.length>0 ?
     this.props.globalReduser.findCountryNameByISO(this,cookies.get('country', {path: '/'}),cookies.get('userLang', {path: '/'}))
     : '';
    let storeState = this.props.storeState;
    let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber];
    let route = createTitleString(cities);
    
    let textInfo = this.props.storeState.languageTextMain.drivers.mainPage;
    debugger;
    console.log(window); 
    let helmet = this.props.storeState.languageTextMain.helmets.drivers;
          
    return (
      <React.Fragment>
        {
          countryName.length>0 ?
          (this.props.storeState.languages.length>0 ? 
          <Helmet>
            <title>{helmet.route.title[0]+' '+route+helmet.route.title[1]}</title>
            <meta name="description" content={helmet.route.description} />
            <meta property="og:site_name" content="Tripfer" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={document.URL} />
            <meta property="og:title" content={helmet.route.title[0]+' '+route+helmet.route.title[1]} />
            <meta property="og:description" content={helmet.route.description} /> 
          </Helmet> :
          <Helmet>
            <title>{countryName+helmet.country.title}</title>
            <meta name="description" content={helmet.country.description} />
            <meta property="og:site_name" content="Tripfer" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={document.URL} />
            <meta property="og:title" content={countryName+helmet.country.title} />
            <meta property="og:description" content={helmet.country.description} /> 
          </Helmet>)
          :
          <Helmet>
            <title>{helmet.loading.title}</title>
            <meta name="description" content={helmet.loading.description} />
            <meta property="og:site_name" content="Tripfer" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={document.URL} />
            <meta property="og:title" content={helmet.loading.title} />
            <meta property="og:description" content={helmet.loading.description} /> 
          </Helmet>
        }
        

        
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
          <div className="left_body_part col-12 d-flex flex-column p-0">
              <DriversProperties/>
              <DriversBlock changeTravelVisibility={this.changeTravelVisibility} country={country} cities={cities}/>
            </div>
          </div>
        </div>
        <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} driversState={this.props.driversState}
          travelVisibility={this.state.travelVisibility} isoCountryMap={this.props.storeState.isoCountryMap} storeState={this.props.storeState}
          elementPrice={this.state.elementPrice} activeCurrency={activeCurrency} textInfo={this.props.storeState.languageTextMain.startTravelForm} changeSuccessVisibility={this.changeSuccessVisibility} />
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
    setCities: (cities) => dispatch({ type: "SET_CITIES", cities: cities }),
    setMaxPrice: (maxPrice) => dispatch({ type: "SET_MAX_PRICE", maxPrice: maxPrice, pricePart: maxPrice })
  })
)(DriversClass);

export default Drivers;