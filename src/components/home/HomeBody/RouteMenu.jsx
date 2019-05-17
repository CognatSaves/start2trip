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



const CityRouteTable = (props) => {
  const { cities, changeCity, removeCity, checkInput } = props;

  let workCities = [...cities];
  // let tempStart = workCities.shift();
  workCities.pop();
  console.log(cities, "cities");
  console.log(workCities, "workCities");
  return (
    <div className="addCities" >
      {workCities.map((element, index) =>
        <div className={checkInput ? "startCity-CheckInput" : "" +" startCity d-flex col-12 p-0"} key={element + cities[index + 1]}>
          <LocationSearchInput readOnlyOn={index ? true : false} address={element} changeCity={changeCity} index={index} classDropdown="searchElement_style" classInput="city_input col-6" />
          <LocationSearchInput address={cities[index + 1]} changeCity={changeCity} index={index + 1} classDropdown="searchElement_style" classInput="city_input" />
          <div className="crossToolTip col-1" style={{ display: index ? "flex" : "none" }} onClick={() => removeCity(index + 1)}>
            <i style={{ background: "url(" + crossIcon + ") no-repeat" }} className="crossIcon"  ></i>
            <span className="crossToolTipText">Удалить этот пункт назначения</span>
          </div>
        </div>
      )}

    </div>
  )
}


class RouteMenuClass extends React.Component {
  /*constructor(props) {
    super(props);
  }
*/


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
    let parameters_text = "Дополнительные параметры    ";
    return (
      <React.Fragment>
        <div className="routemenu_container d-flex flex-column col-12">
          <CityRouteTable cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity} />

          <div className=" d-flex routemenu_addCity " onClick={() => this.props.addCity()}>
            <img className="col-2 p-0" src={addIcon} alt="add" width="15px" height="15px" />
            <div className="routemenu_city_add_text " >Добавить пункт назначения</div>
          </div>
          <div className="routemenu_setDate  p-0 col-12">
            <DatePicker hintText="Дата отправления" className="routemenu_date col-6" />
            <div className="routemenu_parametersAdd" id="toggler" >
              <p style={{background: "url(" + arrowIcon + ") no-repeat"}}>{parameters_text}</p>
            </div>
          </div>
        </div>
        <div className="routemenu_parameters">
        <UncontrolledCollapse toggler="#toggler">
          <div className="d-flex col-12 menuHome">
            <div className="d-flex" style={{ position: "relative" }}>
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
            <div className=" d-flex" onClick={() => this.props.dispatch(autoMenuCall(!this.props.storeState.autoMenu))}>
              <div className="peopleMenuHome col">
                <img src={this.props.storeState.autoIcon} width="40px" height="30px" alt="carImage" />{this.props.storeState.autoValue}
              </div>
              <AutoMenu isVisible={this.props.storeState.autoMenu} />
            </div>
            <div className="d-flex" onClick={() => this.props.dispatch(languageMenuIsVisibal(!this.props.storeState.languageMenu))}>
              <div className="peopleMenuHome propertiesPeopleHome col"><img src={this.props.storeState.languageIcon} width="20px" height="25px" alt="L" />{this.props.storeState.languageValue}</div>
              <LanguageMenu isVisible={this.props.storeState.languageMenu} />
            </div>

          </div>
        </UncontrolledCollapse>
        </div>
      <div className="routemenu_search col" onClick={() => {this.props.goToDrivers(this.props.cities, this.props.date); return (<Redirect to="/drivers" />) }}>
        <div className="routemenu_search_button " >
          <p className="routemenu_search_text">ПОИСК</p>
        </div>
      </div>
      <div className="routemenu_comment">
        <div className="routemenu_comment_text">*Возврат в точку отправления в этот же день бесплатно</div>
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