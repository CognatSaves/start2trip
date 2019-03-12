import React, { Component } from 'react';
import './RouteMenu.css'
import addIcon from './pictures/add.svg'
import calendarIcon from './pictures/calendar.svg'
import crossIcon from './pictures/close.svg'
import arrowIcon from './pictures/da_tru_big_arrow.png'
import sedanIcon from './pictures/sedan.svg'
import AutoMenu from '../../drivers/DriversBody/DriversProperties/components/AutoMenu/AutoMenu.jsx'
import LanguageMenu from '../../drivers/DriversBody/DriversProperties/components/LanguageMenu/LanguageMenu.jsx'
import PeopleMenu from '../../drivers/DriversBody/DriversProperties/components/PeopleMenu/PeopleMenu'
import userWhiteIcon from '../HomeBody/pictures/white/user_white.svg'
import shapeIcon from './pictures/Shape.svg'
import ellipseIcon from './pictures/Ellipse.svg'
import geoIcon from '../HomeHeader/pictures/geo_icon.svg'
import { Redirect } from 'react-router-dom';
import LocationSearchInput from './Search'
import { UncontrolledCollapse, Button } from 'reactstrap';
import { connect } from 'react-redux';
import {
  setPagesVisible, setTempPricePart, languageMenuIsVisibal, setSortMenuVisible,
  changePersonsNumberDispatch, changePersonsNumberDispatchOld, peopleMenuCall, autoMenuCall
} from "../../../redusers/Action"

const AddCities = (props) => {
  const { cities, changeCity, removeCity } = props;

  const cityElement = (props) => {

    let { city, changeCity, index, removeCity } = props;
    return (
      <div className="startCity">
        <div className="iconMass col-2">
          <img src={ellipseIcon} alt="ellipseIcon" width="10px" height="12px" />
          <img src={shapeIcon} alt="shapeIcon" width="7px" height="25px" />
        </div>
        {/* <input type="text" className="city_input" placeholder="Укажите точку отправки" value={city} onChange={changeCity.bind(this, 0)} /> */}
        <LocationSearchInput address={city} changeCity={changeCity} index={index} class={"city_input"} />
        <img src={crossIcon} className="crossIcon col-3" alt="crossIcon" width="12px" height="12px" onClick={() => removeCity(index)} />
      </div>
    )
  }

  const newCity = () => {
    if (cities.length > 2) {
      let thisCities = cities;
      thisCities.shift()
      thisCities.pop()
      return (
        /* thisCities.map((element, index) =>
           <div key={index} className="newCity">
             <div className="iconMass">
               <img src={ellipseIcon} alt="ellipseIcon" width="10px" height="12px" />
               <img src={shapeIcon} alt="shapeIcon" width="7px" height="25px" />
             </div>
             <input type="text" className="city_input" value={element} placeholder="Укажите пункт назначения" value={cities[index]} onChange={changeCity.bind(this, index)} />
             <img src={crossIcon} className="crossIcon" alt="crossIcon" width="12px" height="12px" onClick={() => removeCity(index)} />
           </div>*/
        thisCities.map((element, index) => {
          cityElement(element, changeCity, index, removeCity);
        }
        )

      )
    }

  }

  return (
    <div className="addCities">
      {/* <div className="startCity">
        <div className="iconMass">
          <img src={ellipseIcon} alt="ellipseIcon" width="10px" height="12px" />
          <img src={shapeIcon} alt="shapeIcon" width="7px" height="25px" />
        </div>
        <input type="text" className="city_input" placeholder="Укажите точку отправки" value={cities[0]} onChange={changeCity.bind(this, 0)} />
        <img src={crossIcon} className="crossIcon" alt="crossIcon" width="12px" height="12px" />
      </div> */}
      {cityElement(cities[0], changeCity, 0)}
      {newCity()}

      <div className="endCity">
        <img src={geoIcon} alt="geoIcon" className="geoIcon col-2" width="10px" height="12px" />
        {/* <input type="text" className="city_input" placeholder="Укажите пункт назначения" value={cities[cities.length]} /> */}
        <LocationSearchInput address={cities[cities.length]} changeCity={changeCity} index={cities.length} class={"city_input"} />
        <img src={crossIcon} className="crossIcon col-3" alt="crossIcon" width="13px" height="12px" />
      </div>
    </div>
    // <tbody align="center">
    // {cities.map((element,index)=>
    //   <tr key={element}>
    //     <td key={element+"el0"}>
    //       <div className={dotClasses[index]}/>
    //     </td>
    //     <td key={element+"el1"}>
    //       <LocationSearchInput address={element} changeCity={changeCity} index={index} class={"city_input"}/>
    //     </td>
    //     <td  key={element+"el2"} style={{visibility: isVisibleArray[index]}} onClick={()=>removeCity(index)}>
    //       <div className="crossBox">
    //       </div>
    //     </td>
    //   </tr>
    // )}
    // </tbody>
  )
}

// const CityRouteTable = (props) => {
//   const { cities, changeCity, removeCity } = props;
//   let isVisibleArray = Array(cities.length).fill("visible");
//   let dotClasses = Array(cities.length).fill("dotBox");
//   dotClasses[0] = "firstDotBox";
//   dotClasses[dotClasses.length - 1] = "lastDotBox";
//   //non-visible x near first and last element-city - can not delete first & last;
//   isVisibleArray[0] = "hidden";
//   isVisibleArray[isVisibleArray.length - 1] = "hidden";
//   console.log("CityRouteTable arrays:");
//   console.log(dotClasses);
//   //TODO css make 
//   return (
//     <tbody align="center">
//       {cities.map((element, index) =>
//         <tr key={index}>
//           <td key={index + "el0"}>
//             <div className={dotClasses[index]} />
//           </td>
//           <td key={index + "el1"}>
//             <input value={element} className="city_input" onChange={changeCity.bind(this, index)} />
//           </td>
//           <td key={index + "el2"} style={{ visibility: isVisibleArray[index] }} onClick={() => removeCity(index)}>
//             <img src={crossIcon} className="crossBox" alt="crossIcon" />
//           </td>
//         </tr>
//       )}
//     </tbody>
//   )
// }

 class RouteMenuClass extends React.Component {
  constructor(props) {
    super(props);

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
    console.log("RouteMenu render call");
    let parameters_text = "Дополнительные параметры    ";
    return (
      <React.Fragment>
        <div className="routemenu_container d-flex flex-column col-12">
          <AddCities cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity}></AddCities>
          {/* <table className="routemenu_table">
            <CityRouteTable cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity} />
          </table> */}
          <div className="routemenu_addCity d-flex flex-row col-12">
            <img className="col-2" src={addIcon} alt="add" width="15px" height="15px" onClick={() => this.props.addCity()} />
            <div className="routemenu_city_add_text " onClick={() => this.props.addCity()}>Добавить пункт назначения</div>
          </div>
          <div className="routemenu_setDate d-flex flex-row col-12">
            <img className="col-2" src={calendarIcon} alt="calendarIcon" width="15px" height="15px" />
            <input className="routemenu_date" value={this.props.date} placeholder="Дата отправления" onClick={() => this.props.chooseDate()}></input>
          </div>
        </div>
        <div className="routemenu_parameters">
          <Button className="routemenu_parametersAdd" id="toggler" >
            <p>{parameters_text}</p><img src={arrowIcon} alt="arrow" width="15px" height="15px" />
          </Button>
          <UncontrolledCollapse toggler="#toggler">
          <div className="d-flex flex-column col-12 menuHome">
          <div className="d-flex flex-row justify-content-center" style={{ position: "relative" }}>
            <div className="peopleMenuHome" onClick={() => {
              if (!this.props.storeState.peopleMenu) {
                this.props.dispatch(changePersonsNumberDispatchOld(this.props.storeState.persons))
              } else {
                this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld))
              };
              this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu))
            }}>
              <div className="propertiesPeopleHome"><img src={userWhiteIcon} width="20px" height="25px" />{personsNumberString}</div>
            </div>
            <PeopleMenu isVisible={this.props.storeState.peopleMenu} />
          </div>
          <div className="d-flex flex-row justify-content-center" onClick={() => this.props.dispatch(autoMenuCall(!this.props.storeState.autoMenu))}>
            <div className="peopleMenuHome ">
              <img src={this.props.storeState.autoIcon} width="40px" height="30px" alt="carImage" />{this.props.storeState.autoValue}
            </div>
            <AutoMenu isVisible={this.props.storeState.autoMenu} />
          </div>
          <div className="d-flex flex-row justify-content-center" onClick={() => this.props.dispatch(languageMenuIsVisibal(!this.props.storeState.languageMenu))}>
            <div className="peopleMenuHome propertiesPeopleHome"><img src={this.props.storeState.languageIcon} width="20px" height="25px" />{this.props.storeState.languageValue}</div>
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