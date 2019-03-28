import React from 'react';
import './RouteMenu.css'
import addIcon from './pictures/add.svg'
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
import {languageMenuIsVisibal, changePersonsNumberDispatch,
  changePersonsNumberDispatchOld, peopleMenuCall, autoMenuCall} from "../../../redusers/Action"


const CityRouteTable = (props) => {
  const { cities, changeCity, removeCity } = props;
  let workCities = [...cities];
  let tempStart = workCities.shift();
  let tempEnd = workCities.pop();
  return (
    <div className="addCities">
      <div className="startCity col-12 p-0" key={"0" + tempStart}>
        <div className="iconMass col-2">
          <img src={ellipseIcon} alt="ellipseIcon" width="10px" height="12px" />
          <img src={shapeIcon} alt="shapeIcon" width="7px" height="25px" />
        </div>
        <LocationSearchInput address={cities[0]} changeCity={changeCity} index={0} class={"city_input"} />
        <img src={crossIcon} className="crossIcon col-3" alt="crossIcon" width="12px" height="12px" />
      </div>

      {workCities.map((element, index) =>
        <div className="startCity col-12 p-0" key={(index + 1) + element}>
          <div className="iconMass col-2">
            <img src={ellipseIcon} alt="ellipseIcon" width="10px" height="12px" />
            <img src={shapeIcon} alt="shapeIcon" width="7px" height="25px" />
          </div>
          <LocationSearchInput address={element} changeCity={changeCity} index={index + 1} class={"city_input"} />
          <div className="crossToolTip col-2">
            <img src={crossIcon} className="crossIcon " alt="crossIcon" id="crossIcon" width="12px" height="12px" onClick={() => removeCity(index + 1)} style={{ visibility: 'visible' }} />
            <span className="crossToolTipText">Удалить этот пункт назначения</span>
          </div>
        </div>
      )}

      <div className="endCity col-12 p-0" key={(cities.length - 1) + tempEnd}>
        <img src={geoIcon} alt="geoIcon" className="geoIcon col-2 p-0" width="15px" height="12px" />
        <LocationSearchInput address={cities[cities.length - 1]} changeCity={changeCity} index={cities.length - 1} class={"city_input"} />
        <img src={crossIcon} className="crossIcon col-3" alt="crossIcon" width="13px" height="12px" />
      </div>

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

          <div className=" d-flex routemenu_addCity flex-row p-0 col-12">
            <img className="col-2 p-0" src={addIcon} alt="add" width="15px" height="15px" onClick={() => this.props.addCity()} />
            <div className="routemenu_city_add_text " onClick={() => this.props.addCity()}>Добавить пункт назначения</div>
          </div>
          <div className="routemenu_setDate flex-row p-0 col-12">
            <img className="col-2 p-0" src={calendarIcon} alt="calendarIcon" width="15px" height="15px" />
            <input className="routemenu_date" value={this.props.date} placeholder="Дата отправления" onClick={() => this.props.chooseDate()}></input>
          </div>
        </div>
        <div className="routemenu_parameters">
          <Button className="routemenu_parametersAdd" id="toggler" >
            <p>{parameters_text}</p><img src={arrowIcon} alt="arrow" width="15px" height="15px" />
          </Button>
          <UncontrolledCollapse toggler="#toggler">
            <div className="flex-column col-11 menuHome">
              <div className="d-flex flex-row justify-content-center" style={{ position: "relative" }}>
                <div className="peopleMenuHome" onClick={() => {
                  if (!this.props.storeState.peopleMenu) {
                    this.props.dispatch(changePersonsNumberDispatchOld(this.props.storeState.persons))
                  } else {
                    this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld))
                  };
                  this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu))
                }}>
                  <div className="propertiesPeopleHome"><img src={userWhiteIcon} width="20px" height="25px" alt="P"/>{personsNumberString}</div>
                </div>
                <PeopleMenu isVisible={this.props.storeState.peopleMenu} />
              </div>
              <div className=" d-flex flex-row justify-content-center" onClick={() => this.props.dispatch(autoMenuCall(!this.props.storeState.autoMenu))}>
                <div className="peopleMenuHome ">
                  <img src={this.props.storeState.autoIcon} width="40px" height="30px" alt="carImage" />{this.props.storeState.autoValue}
                </div>
                <AutoMenu isVisible={this.props.storeState.autoMenu} />
              </div>
              <div className="d-flex  flex-row justify-content-center" onClick={() => this.props.dispatch(languageMenuIsVisibal(!this.props.storeState.languageMenu))}>
                <div className="peopleMenuHome propertiesPeopleHome"><img src={this.props.storeState.languageIcon} width="20px" height="25px" alt="L"/>{this.props.storeState.languageValue}</div>
                <LanguageMenu isVisible={this.props.storeState.languageMenu} />
              </div>

            </div>
          </UncontrolledCollapse>
        </div>
        <div className="routemenu_search" onClick={() => { return (<Redirect to="/drivers" />) }}>
          <div className="routemenu_search_button" onClick={() => this.props.goToDrivers(this.props.cities, this.props.date)}>
            <p className="routemenu_search_text">ПОИСК</p>
          </div>
        </div>
        <div className="routemenu_comment">
          <div className="routemenu_comment_text">*Возврат в точку отправления в этот же день бесплатно</div>
        </div>
      </React.Fragment>
    );
  }
}

const RouteMenu = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
)(RouteMenuClass);

export default RouteMenu;