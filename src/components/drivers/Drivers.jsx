import React from 'react';
import './Drivers.css';
// // import { set_state } from '../../redusers/Action'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux'

import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'
import DriversProperties from './DriversBody/DriversProperties/DriversProperties';
import DriversBlock from './DriversBody/DriversBlock/DriversBlock';
import Cookies from 'universal-cookie';

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
    props.setCities([{ point: '', lat: '', long: '' }, { point: '', lat: '', long: '' }])
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

    if (this.props.storeState.countries.length > 0) {
      function findCountryNameByISO(that) {
        function findLangID(that) {
          let langISO = cookies.get('userLang', { path: '/' });
          //первый for - стандартный случай, остальные - фактически, обработка ошибок
          for (let i = 0; i < that.props.storeState.languages.length; i++) {
            if (that.props.storeState.languages[i].ISO === langISO) {
              return that.props.storeState.languages[i].id;
            }
          }
          for (let i = 0; i < that.props.storeState.languages.length; i++) {
            if (that.props.storeState.languages[i].ISO === 'ENG') {
              return that.props.storeState.languages[i].id;
            }
          }
          return that.props.storeState.languages[0].id;
        }
        let langId = findLangID(that);
        for (let i = 0; i < that.props.storeState.countries.length; i++) {
          if (that.props.storeState.countries[i].ISO === country) {
            let locals = that.props.storeState.countries[i].locals;
            for (let j = 0; j < locals.length; j++) {
              if (locals[j].langId === langId) {
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
        stringWithSpaces = stringWithSpaces + ',';

        stringWithSpaces = this.props.globalReduser.convertFromUrlTranslation(stringWithSpaces, langISO ? langISO : 'en');

        stringWithSpaces += countryName;
        newCities[i] = { point: stringWithSpaces, lat: "", long: "" };
      }

      this.props.setCities(newCities)
    }
  }


  render() {
    function createTitleString(string) {
      let temp = string.replace('from-', '');
      return temp.replace('-to-', '-');
    }
    let cities;
    let country;
    let dateString;
    if (this.props.match) {

      if (this.props.storeState.cities[0].point === "") {

        // let langISO = this.props.globalReduser.findGetParameter('lang');

        cities = this.props.match.params.cities;
        country = this.props.match.params[0];
        country = country.split("-")
        this.parseStringToArray(cities, country[0], country[1]);
      } else {
        let routeFuncResult = this.props.globalReduser.getRoute(this.props.storeState.cities,
          this.props.storeState.languages[this.props.storeState.activeLanguageNumber].isoAutocomplete);
        cities = routeFuncResult.route;
        dateString = this.props.globalReduser.createDateTimeString(this.props.storeState.date, true);
      }
    }

    let countryName = this.props.storeState.countries.length > 0 ?
      this.props.globalReduser.findCountryNameByISO(this, cookies.get('country', { path: '/' }), cookies.get('userLang', { path: '/' }))
      : '';
    let storeState = this.props.storeState;
    let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber];
    let route = createTitleString(cities);

    let textInfo = this.props.storeState.languageTextMain.drivers.mainPage;

    console.log(window);
    let helmet = this.props.storeState.languageTextMain.helmets.drivers;

    return (
      <>
        {
          countryName.length > 0 ?
            (this.props.storeState.languages.length > 0 ?
              <Helmet>
                <title>{helmet.route.title[0] + ' ' + route + helmet.route.title[1]}</title>
                <meta name="description" content={helmet.route.description} />
                <meta property="og:site_name" content="Tripfer" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={document.URL} />
                <meta property="og:title" content={helmet.route.title[0] + ' ' + route + helmet.route.title[1]} />
                <meta property="og:description" content={helmet.route.description} />
              </Helmet> :
              <Helmet>
                <title>{countryName + helmet.country.title}</title>
                <meta name="description" content={helmet.country.description} />
                <meta property="og:site_name" content="Tripfer" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={document.URL} />
                <meta property="og:title" content={countryName + helmet.country.title} />
                <meta property="og:description" content={helmet.country.description} />
              </Helmet>)
            :
            <React.Fragment />
        }



        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
            <div className="left_body_part col-12 d-flex flex-column p-0">
              <DriversProperties storeState={this.props.storeState} />
              <DriversBlock changeTravelVisibility={this.changeTravelVisibility} country={country} cities={cities} dateString={dateString} />
            </div>
          </div>
        </div>
        <StartTravelForm {...this.props} changeTravelVisibility={this.changeTravelVisibility} driversState={this.props.driversState}
          travelVisibility={this.state.travelVisibility} isoCountryMap={this.props.storeState.isoCountryMap} storeState={this.props.storeState}
          elementPrice={this.state.elementPrice} activeCurrency={activeCurrency} textInfo={this.props.storeState.languageTextMain.startTravelForm} changeSuccessVisibility={this.changeSuccessVisibility} />
        <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
          textInfo={this.props.storeState.languageTextMain.startTravelForm}
        />
      </>
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