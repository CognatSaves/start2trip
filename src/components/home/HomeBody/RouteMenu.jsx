import React, { Component } from 'react';
import './RouteMenu.css'
import addIcon from './pictures/add.svg'
import calendarIcon from './pictures/calendar.svg'
import crossIcon from './pictures/close.svg'
import arrowIcon from './pictures/da_tru_big_arrow.png'
import loupeIcon from './pictures/da_tru_loupe.png'
import shapeIcon from './pictures/Shape.svg'
import ellipseIcon from './pictures/Ellipse.svg'
import geoIcon from '../HomeHeader/pictures/geo_icon.png'
import { Redirect } from 'react-router-dom';

const AddCities = (props) => {
  const { cities, changeCity, removeCity } = props;

  const newCity = () => {
    debugger
    if (cities.length > 2) {
      let thisCities = cities;
      thisCities.shift()
      thisCities.pop()
      return (
        thisCities.map((element, index) =>
          <div key={index} className="newCity">
            <div className="iconMass">
              <img src={ellipseIcon} alt="ellipseIcon" width="10px" height="12px" />
              <img src={shapeIcon} alt="shapeIcon" width="7px" height="25px" />
            </div>
            <input type="text" className="city_input" value={element} placeholder="Укажите пункт назначения" value={cities[index]} onChange={changeCity.bind(this, index)} />
            <img src={crossIcon} className="crossIcon" alt="crossIcon" width="12px" height="12px" onClick={() => removeCity(index)} />
          </div>
        )
      )
    }

  }

  return (
    <div className="addCities">
      <div className="startCity">
        <div className="iconMass">
          <img src={ellipseIcon} alt="ellipseIcon" width="10px" height="12px" />
          <img src={shapeIcon} alt="shapeIcon" width="7px" height="25px" />
        </div>
        <input type="text" className="city_input" placeholder="Укажите точку отправки" value={cities[0]} onChange={changeCity.bind(this,0)} />
        <img src={crossIcon} className="crossIcon" alt="crossIcon" width="12px" height="12px" />
      </div>
      {newCity()}
      <div className="endCity">
        <img src={geoIcon} alt="geoIcon" className="geoIcon" width="10px" height="12px" />
        <input type="text" className="city_input" placeholder="Укажите пункт назначения" value={cities[cities.length]}  />
        <img src={crossIcon} className="crossIcon" alt="crossIcon" width="12px" height="12px" />
      </div>
    </div>
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

export default class HomeBody extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log("RouteMenu render call");
    let parameters_text = "Дополнительные параметры    ";
    return (
      <React.Fragment>
        <div className="routemenu_container">
          <AddCities cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity}></AddCities>
          {/* <table className="routemenu_table">
            <CityRouteTable cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity} />
          </table> */}
          <div className="routemenu_addCity">
            <img src={addIcon} alt="add" width="18px" height="18px" onClick={() => this.props.addCity()} />
            <div className="routemenu_city_add_text" onClick={() => this.props.addCity()}>Добавить пункт назначения</div>
          </div>
          <div className="routemenu_setDate">
            <img src={calendarIcon} alt="calendarIcon" width="18px" height="18px" />
            <input className="routemenu_date" value={this.props.date} placeholder="Дата отправления" onClick={() => this.props.chooseDate()}></input>

          </div>
        </div>
        <div className="routemenu_parameters">
          <p>{parameters_text}</p>
          <img src={arrowIcon} alt="arrow" width="18px" height="18px" />
        </div>
        <div className="routemenu_search" onClick={() => { return (<Redirect to="/drivers" />) }}>
          <div className="routemenu_search_button" onClick={() => this.props.goToDrivers(this.props.cities, this.props.date)}>
            <img src={loupeIcon} alt="calendarIcon" width="25px" height="20px" />
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
