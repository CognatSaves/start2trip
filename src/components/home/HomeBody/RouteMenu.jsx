import React from 'react';
import './RouteMenu.css'
import addIcon from './pictures/addWhite.svg'
import calendarIcon from './pictures/calendar.svg'
import crossIcon from './pictures/close.svg'
import arrowIcon from './pictures/da_tru_big_arrow.png'
import AutoMenu from '../../drivers/DriversBody/DriversProperties/components/AutoMenu/AutoMenu.jsx'
import LanguageMenu from '../../drivers/DriversBody/DriversProperties/components/LanguageMenu/LanguageMenu.jsx'
import PeopleMenu from '../../drivers/DriversBody/DriversProperties/components/PeopleMenu/PeopleMenu'
import userWhiteIcon from '../HomeBody/pictures/white/user_white.svg'
import shapeIcon from './pictures/Shape.svg'
import ellipseIcon from './pictures/Ellipse.svg'
import geoIcon from '../HomeBody/pictures/geo_icon.svg'
import { Redirect } from 'react-router-dom';
import LocationSearchInput from './Search'
import { UncontrolledCollapse, Button } from 'reactstrap';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import {
  languageMenuIsVisibal, changePersonsNumberDispatch,
  changePersonsNumberDispatchOld, peopleMenuCall, autoMenuCall
} from "../../../redusers/Action"
import { isMobileOnly } from 'react-device-detect'



const CityRouteTable = (props) => {
  const { cities, changeCity, removeCity } = props;

  let workCities = [...cities];
  // let tempStart = workCities.shift();
  workCities.pop();
  console.log(cities, "cities");
  console.log(workCities, "workCities");
  return (
    <div className="addCities" >
      {workCities.map((element, index) =>
        <div className="startCity d-flex col-12 p-0" key={element + cities[index + 1]}>
          <div className="addCitiesLocationDropDown col-6 p-0">
            <LocationSearchInput readOnlyOn={index ? true : false} address={element} changeCity={changeCity} index={index} classDropdown="searchElement_style" classInput={index ? "city_input" : "city_input _checkInput"} />
          </div>
          <div className="addCitiesLocationDropDown">
            <LocationSearchInput address={cities[index + 1]} changeCity={changeCity} index={index + 1} classDropdown="searchElement_style" classInput="city_input _checkInput" />
          </div>
          <div className="crossToolTip col-1" style={{ display: index ? "flex" : "none" }} onClick={() => removeCity(index + 1)}>
            <i style={{ background: "url(" + crossIcon + ") no-repeat" }} className="crossIcon"></i>
            <span className="crossToolTipText" style={{display: isMobileOnly ? "none" : "block" }} >Удалить этот пункт назначения</span>
          </div>
        </div>
      )}

    </div>
  )
}


class RouteMenuClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
    }
  }

  chooseDate = (value) => {
    let dayMass = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    let monthMass = ["января", "февраля", "марта", "апреля", "мая",
      "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let resultString = dayMass[value.getDay()] + ", " + value.getDate() + " " + monthMass[value.getMonth()] + " " + value.getFullYear();
    this.setState({
      date: resultString,
    });
  }

  goToNextPage = () => {
    let massCities = this.props.cities;
    let flagCities = true;
    let massInput = document.querySelectorAll("._checkInput")
    for (let i = 0; i < massInput.length; i++) {
      if (massInput[i].defaultValue == "") {
        massInput[i].classList.add("startCity-CheckInput")
        flagCities = false;
      }
      if (massInput[i].defaultValue !== massCities[i]) {
        massInput[i].classList.add("startCity-error")
        flagCities = false;
      }
    }
    if (this.state.date == "") {
      let datePicer = document.querySelector(".routemenu_date")
      datePicer.classList.add("routemenu_date-Check")
      flagCities = false;
    }
    if (flagCities) {
      this.props.goToDrivers(this.props.cities, this.state.departureDate);
      return (<Redirect to="/drivers" />)
    }
  }


  render() {
    function personsCalculation(people) {
      let result = 0;
      people.forEach(function (item, i, people) {
        result += item;
      })
      let resultString = "";
      if ([2, 3, 4].some(el => el === result)) {
        resultString = result + " человека";
      }
      else {
        resultString = result + " человек";
      }
      return resultString;
    }

    let personsNumberString = personsCalculation(this.props.storeState.persons);
    let parameters_text = "Дополнительные параметры ";
    return (
      <React.Fragment>
        <div className="routemenu_container d-flex flex-column col-12">
          <CityRouteTable cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity} />
          <div className=" d-flex routemenu_addCity" onClick={() => this.props.addCity()}>
            <div className="routemenu_city_add_text" style={{ background: "url(" + addIcon + ") no-repeat" }} >Добавить пункт назначения</div>
          </div>
          <div className="routemenu_setDate">
            <DatePicker hintText="Дата отправления" minDate={new Date()} onChange={(e, date) => { this.chooseDate(date); let datePicer = document.querySelector(".routemenu_date"); datePicer.classList.remove("routemenu_date-Check") }} className="routemenu_date col" />
            <div className="routemenu_parametersAdd col-sm-6 col-12" id="toggler" >
              <p style={{ background: "url(" + arrowIcon + ") no-repeat" }}>{parameters_text}</p>
            </div>
          </div>
        </div>
        <div className="routemenu_parameters">
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
        </div>

        <div className="routemenu_footer d-flex flex-sm-row flex-column-reverse align-items-center">
          <div className="routemenu_comment col">
            <div className="routemenu_comment_text">*Возврат в точку отправления в этот же день бесплатно</div>
          </div>
          <div className="routemenu_search col-sm-6 col-12" onClick={() => { this.goToNextPage() }}>
            <div className="routemenu_search_button " >
              <p className="routemenu_search_text">ПОИСК</p>
            </div>
          </div>

        </div>



      </React.Fragment >
    );
  }
}

const RouteMenu = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
)(RouteMenuClass);

export default RouteMenu;