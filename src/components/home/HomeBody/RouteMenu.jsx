import React from 'react';
import './RouteMenu.css'
import addIcon from './pictures/addWhite.svg'
import crossIcon from './pictures/close.svg'
import LocationSearchInput from './Search'
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import requests from '../../../config';
import { isMobileOnly } from 'react-device-detect'
import {setDriversList,setCarTypes} from '../../../redusers/ActionDrivers';
import DriverRefreshIndicator from '../../driverProfileRegistration/DriverRefreshIndicator';

const CityRouteTable = (props) => {
  const { cities, changeCity, removeCity, addCity,isoCountryMap } = props;

  let workCities = [...cities];
  let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  // let tempStart = workCities.shift();
  workCities.pop();
  console.log(cities, "cities");
  
  // console.log(workCities, "workCities");
  return (
    <React.Fragment>
      {isMobileOnly ?
        <div className="addCities" >
          {cities.map((element, index) =>
            <div className="startCity d-flex col-12 p-0" key={element + index}>
              <div className={index <= 1 ? "col-12 p-0" : "col-10 pl-0 pr-1"}>
                <div className="addCitiesLocationDropDown col p-0">
                  <LocationSearchInput address={cities[index].point} changeCity={changeCity} index={index} classDropdown="searchElement_style" spanText={alphabet[index]} placeholder={index ? "Куда, выберите место" : "Откуда, выберите место"} classDiv={index > 1 && !cities[index] ? "classDivMobail  _checkDiv startCity-CheckInput" : "classDivMobail  _checkDiv"} classInput="city_input _checkInput" isoCountryMap={isoCountryMap}/>
                </div>
              </div>
              <div className="crossToolTip col-2 p-0" style={{ display: index <= 1 ? "none" : "" }} onClick={() => removeCity(index)}>
                <i className="crossIcon"></i>
              </div>
            </div>
          )}

        </div>
        :
        <div className="d-flex flex-wrap col-12 p-0" >
          {cities.map((element, index) =>
            <div className="startCity d-flex col-6 p-0" key={element + index}>
              <div className={index <= 1 ? (index % 2 === 0 ? "col-12 pl-0 pr-1" : "col-12 pl-0 pr-1") : (index % 2 === 0 ? "col-10 pl-0 pr-1" : "col-10 pl-0 pr-1 ")}>
                <div className="addCitiesLocationDropDown col p-0">
                  <LocationSearchInput address={cities[index].point} changeCity={changeCity} index={index} classDropdown="searchElement_style" spanText={alphabet[index]} placeholder={index ? "Куда, выберите место" : "Откуда, выберите место"} classDiv={index > 1 && !cities[index] ? "classDiv  _checkDiv startCity-CheckInput" : "classDiv  _checkDiv"} classInput="city_input _checkInput" isoCountryMap={isoCountryMap}/>
                </div>
              </div>
              <div className="crossToolTip col p-0" style={{ display: index <= 1 ? "none" : "" }} onClick={() => removeCity(index)}>
                <i className="crossIcon"></i>
                <span className="crossToolTipText" style={{ display: isMobileOnly ? "none" : "block" }} >Удалить этот пункт назначения</span>
              </div>
            </div>
          )}
          <div className=" d-flex routemenu_addCity col" onClick={() => { addCity() }}>
            <div className="routemenu_city_add_text" style={{ background: "url(" + addIcon + ") no-repeat" }} >Добавить пункт назначения</div>
          </div>
        </div>
      }
    </React.Fragment>
  )
}


class RouteMenuClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      correctDate: "",
      isWaiting: false,
      isRefreshing: true,
      isGoodAnswer: true
    }
  }

  chooseDate = (value) => {
    //let dayMass = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    // let monthMass = ["января", "февраля", "марта", "апреля", "мая",
    //   "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let resultString = value.getDate() + "-" + value.getMonth() + "-" + value.getFullYear();
    this.setState({
      date: resultString,
      correctDate: value.toUTCString()
    });
  }

  validationInput=(massCities)=>{
    let flag =true;
    let massInput = document.querySelectorAll("._checkInput")
    for (let i = 0; i < massInput.length; i++) {
      if (massInput[i].defaultValue == "") {
        let massDivInput = document.querySelectorAll("._checkDiv")
        massDivInput[i].classList.add("startCity-CheckInput")
        flag = false;
      }
      if (massInput[i].defaultValue !== massCities[i].point) {
        let massDivInput = document.querySelectorAll("._checkDiv")
        massDivInput[i].classList.add("startCity-error")
        flag = false;
      }
    }
    if (this.state.date == "") {
      let datePicer = document.querySelector(".routemenu_date")
      datePicer.classList.add("routemenu_date-Check")
      flag = false;
    }
    return flag
  }

  getCountry=(arrayAdress,country)=>{
    let flag=true;
    
    let newCountry = arrayAdress[arrayAdress.length - 1].slice(1);
    if (country === newCountry || country === "") {
      country = newCountry;
    } else {
      alert("Error")
      flag = false;
    }
    return {flag:flag,country:country}
  }

  getRoute=()=>{
    let route = "";
    let canMove;
    let country = "";
    for (let i = 0; i < this.props.cities.length; i++) {
      let arrayAdress = this.props.cities[i].point.split(',');

      let date = this.getCountry(arrayAdress,country);
      country = date.country;
      canMove = date.flag;
      
      let stringWhithoutCountry = "";
      for (let k = 0; k < arrayAdress.length - 1; k++) {
        stringWhithoutCountry += arrayAdress[k]
      }
      let stringWhithoutSpaces = stringWhithoutCountry.replace(/ /g, '-');
      if (i == 0) {
        route = "from-" + stringWhithoutSpaces;
      } else {
        route += "-to-" + stringWhithoutSpaces;
      }
    }
    return {route:route,canMove:canMove,country:country}
  }

  goToNextPage = () => {
    let massCities = this.props.cities;
    let flagCities;
    let canMove;

    flagCities = this.validationInput(massCities);
    if (flagCities) {
      
      this.props.goToDrivers(this.props.cities, this.state.date);
      let routeDate = this.getRoute();
      let newStringCities = routeDate.route;
      let country = routeDate.country;
      canMove = routeDate.canMove;


      
      let body = JSON.stringify({
        cities: this.props.cities,
        country: this.props.storeState.country,
        date: this.state.correctDate,
        distance: '1000'
      });
      let that = this;
      function convertDate(value){

      }
      
      this.setState({isWaiting: true, isRefreshing: true, isGoodAnswer: true});
      fetch(requests.getDrivers, {
          method: 'PUT', body: body,
          headers: { 'content-type': 'application/json'}
      })
      .then(response => {
        
        return response.json();
      })
      .then(function (data) {
        
        if (data.error) {
            console.log("bad");
            that.setState({isRefreshing: false, isGoodAnswer: false});
            setTimeout(()=>{
              that.setState({isWaiting: false});
              throw data.error;
            },1000);
            
        }
        else {                 
            console.log("good");
            console.log(data);
            
            that.props.dispatch(setDriversList(data.drivers));
            that.props.dispatch(setCarTypes(data.carTypes));
            that.setState({isWaiting: false});
            
            if (canMove) {
              that.props.globalhistory.history.push(`/drivers/${country},${newStringCities}`)
              window.scroll(0, 500);
            }
            //that.getProfileData();
        }
      })
      .catch(function (error) {
          console.log("bad");
          console.log('An error occurred:', error);
          //that.catchFunc();
      });




    }
  }


  render() {

    
    return (
      <React.Fragment>
        <div className="routemenu_container d-flex flex-column col-12">
          {
            this.state.isWaiting ?
              <DriverRefreshIndicator isRefreshExist={true} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
              : <React.Fragment />
          } 
          { 
            isMobileOnly ?
            <React.Fragment>
              <CityRouteTable cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity} isoCountryMap={this.props.storeState.isoCountryMap}/>
              <div className=" d-flex routemenu_addCity" onClick={() => this.props.addCity()}>
                <div className="routemenu_city_add_text" style={{ background: "url(" + addIcon + ") no-repeat" }} >Добавить пункт назначения</div>
              </div>
            </React.Fragment>
            :
            <React.Fragment>
              <CityRouteTable cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity} addCity={this.props.addCity} isoCountryMap={this.props.storeState.isoCountryMap}/>
            </React.Fragment>
          }



          <div className="routemenu_setDate">
            <DatePicker hintText="Дата отправления" minDate={new Date()} onChange={(e, date) => { this.chooseDate(date); let datePicer = document.querySelector(".routemenu_date"); datePicer.classList.remove("routemenu_date-Check") }} className="routemenu_date col" />

            <div className="routemenu_search col-sm-6 col-12" onClick={() => { this.goToNextPage() }}>
              <div className="routemenu_search_button " >
                <p className="routemenu_search_text">ПОИСК</p>
              </div>
            </div>
          </div>
        </div>



        <div className="routemenu_footer d-flex flex-sm-row flex-column-reverse align-items-center">
          <div className="routemenu_comment col">
            <div className="routemenu_comment_text">*Возврат в точку отправления в этот же день бесплатно</div>
          </div>
        </div>



      </React.Fragment >
    );
  }
}

const RouteMenu = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
  }),
)(RouteMenuClass);

export default RouteMenu;



{/* <div className="routemenu_parametersAdd col-sm-6 col-12" id="toggler" >
              <p style={{ background: "url(" + arrowIcon + ") no-repeat" }}>{parameters_text}</p>
            </div> */}

{/* <div className="routemenu_parameters">
          <UncontrolledCollapse toggler="#toggler">
            <div className="d-flex flex-md-row flex-column col-12 menuHome">
              <div className="d-flex col-md-3 col-12" style={{ position: "relative" }}>
                <div className="peopleMenuHome col" onClick={() => {
                  if (!this.props.storeState.peopleMenu) {
                    this.props.dispatch(changePersonsNumberDispatchOld(this.props.storeState.persons))
                  } else {
                    this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld))
                  };
                  this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu))
                }}>
                  <div className="propertiesPeopleHome"><img src={userWhiteIcon} width="20px" height="25px" alt="P" />{personsNumberString}</div>
                </div>
                <PeopleMenu isVisible={this.props.storeState.peopleMenu} />
              </div>
              <div className=" d-flex col-md-3 col-12" onClick={() => this.props.dispatch(autoMenuCall(!this.props.storeState.autoMenu))}>
                <div className="peopleMenuHome col">
                  <img src={this.props.storeState.autoIcon} width="40px" height="30px" alt="carImage" />{this.props.storeState.autoValue}
                </div>
                <AutoMenu isVisible={this.props.storeState.autoMenu} />
              </div>
              <div className="d-flex col-md-3 col-12" onClick={() => this.props.dispatch(languageMenuIsVisibal(!this.props.storeState.languageMenu))}>
                <div className="peopleMenuHome propertiesPeopleHome col"><img src={this.props.storeState.languageIcon} width="20px" height="25px" alt="L" />{this.props.storeState.languageValue}</div>
                <LanguageMenu isVisible={this.props.storeState.languageMenu} />
              </div>

            </div>
          </UncontrolledCollapse>
        </div> */}