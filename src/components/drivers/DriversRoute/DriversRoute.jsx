import React from 'react';
import './DriversRoute.css'
import './DriversChangeRoute.css'
import { connect } from 'react-redux'


import LocationSearchInput from '../../home/HomeBody/Search';
import { set_state } from '../../../redusers/Action'
import { setDriversRouteChange } from '../../../redusers/ActionDrivers'
import DatePicker from 'material-ui/DatePicker';
import crossIcon from './pictures/close.svg'
import Calendar from 'react-calendar'
import '../../home/HomeBody/calendary.css';
import { isMobileOnly } from 'react-device-detect'

class DriversRouteClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendaryVisibility: 'hidden',
      date: '',
      cities: [...this.props.storeState.cities]
    }
  }

  addCity = () => {
    let cities = this.state.cities;
    let flagCities = true;
    let massInput = document.querySelectorAll("._checkInput")
    for (let i = 0; i < massInput.length; i++) {
      if (massInput[i].defaultValue == "") {
        massInput[i].classList.add("startCity-CheckInput")
        flagCities = false;
      }
    }
    if (cities[cities.length - 1] == "") {
    } else if (flagCities) {
      cities[cities.length] = {
        point: "",
        lat: "",
        long: ""
      };
      this.setState({
        cities: cities,
        mapUpdate: true,
      })
    }

  }
  removeCity = (index) => {
    let cities = this.state.cities;
    cities.splice(index, 1);
    this.setState({
      cities: cities,
      mapUpdate: true
    })
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
  changeCity = (index, value, extraData) => {
    let cities = this.state.cities;
    cities[index] = {
      point:value,
      lat: extraData.location.lat,
      long: extraData.location.long
    };
    this.setState({
      cities: cities,
    });
  }
  searchRoute = () => {
    let flagCities = true;
    function isCorrectSearchData(cities, date) {
      let massInput = document.querySelectorAll("._checkInput")
      for (let i = 0; i < massInput.length; i++) {
        if (massInput[i].defaultValue == "") {
          massInput[i].classList.add("startCity-CheckInput")
          flagCities = false;
        }
        if (massInput[i].defaultValue !== cities[i].point) {
          massInput[i].classList.add("startCity-error")
          flagCities = false;
        }
      }
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].point.length === "") {
          return false;
        }
      }
      if (date.length === 0) {
        let datePicker = document.querySelector(".routemenu_date")
        datePicker.classList.add("routemenu_date-Check")
        return false;
      }
      return true;
    }
    if (isCorrectSearchData(this.state.cities, this.state.date) && flagCities) {
      this.props.dispatch(set_state([...this.state.cities], this.state.date));
      this.props.dispatch(setDriversRouteChange(!this.props.driversState.driversRouteChange))
    }
  }

  CityRouteTable = () => {
    let workCities = [...this.state.cities];
    // let tempStart = workCities.shift();
    workCities.pop();
    console.log(this.state.cities, "cities");
    console.log(workCities, "workCities");
    return (
      <div className="addCities col-12 p-0" >
        {workCities.map((element, index) =>
          <div className="startCity d-flex col-md-8 col-12 p-0" key={element + this.state.cities[index + 1].point}>
            <div className="addCitiesLocationDropDown col-6 p-0">
              <LocationSearchInput readOnlyOn={index ? true : false} address={element.point} changeCity={this.changeCity} index={index} classDropdown="searchElement_style" classInput={index ? "city_input" : "city_input _checkInput"} />
            </div>
            <div className="addCitiesLocationDropDown">
              <LocationSearchInput address={this.state.cities[index + 1].point} changeCity={this.changeCity} index={index + 1} classDropdown="searchElement_style" classInput="city_input _checkInput" />
            </div>

            <div className="crossToolTip col-1" style={{ display: index ? "flex" : "none" }} onClick={() => this.removeCity(index + 1)}>
              <i style={{ background: "url(" + crossIcon + ") no-repeat" }} className="crossIcon"></i>
              <span className="crossToolTipText" style={{display: isMobileOnly ? "none" : "block" }}>Удалить этот пункт назначения</span>
            </div>
          </div>
        )}

      </div>
    )
  }


  render() {


    let isVisibleArray = Array(this.props.storeState.cities.length).fill("visible");
    isVisibleArray[isVisibleArray.length - 1] = "hidden";
    if (!this.props.driversState.driversRouteChange) {
      return (
        <div className="drivers_route col-12 d-flex flex-column">
          <div className="route_date d-flex ">
            <div className="route_date_text">дата отправления: {this.props.storeState.date}</div>
            <div className="d-flex " onClick={() => this.props.dispatch(setDriversRouteChange(!this.props.driversState.driversRouteChange))}>
              <span className="route_change_text  d-sm-block d-none">Изменить маршрут</span>
              <span className="route_change_text  d-sm-none d-block" />
            </div>
          </div>
          <div className="route_show d-flex flex-sm-row flex-column  justify-content-center align-items-center ">
            {this.state.cities.map((element, index) =>
              <React.Fragment>
                <div className="route_show_Line" style={{ display: index ? "block" : "none" }} />
                <span className="route_show_text" >{this.state.cities[index].point}</span>
              </React.Fragment>

            )}
          </div>
          <div className="route_bottomBlock d-flex justify-content-md-between justify-content-sm-end justify-content-end ">
            <div className="route_comment d-md-block d-sm-none d-none">*Возврат в точку отправления в этот же день <span>бесплатно</span></div>
            <div className="route_time_text">Время в пути без остановок:
                <p1>{this.props.driversState.travelTime}</p1><p2>{this.props.driversState.travelLength}</p2>
            </div>
          </div>
        </div>
      )
    }
    else {
      let removeArray = Array(this.state.cities.length).fill('block');
      removeArray[0] = 'none';
      removeArray[removeArray.length - 1] = 'none';
      return (
        <div className="drivers_route col-12 d-flex flex-column">
          <div className="route_date d-flex justify-content-end ">
            {/* <div className="route_date_text">Ваш индивидуальный маршрут на: {this.props.storeState.date}</div> */}
            <div className="d-flex " onClick={() => this.props.dispatch(setDriversRouteChange(!this.props.driversState.driversRouteChange))}>
              <span className="route_change_text">Изменить маршрут</span>
            </div>
          </div>
          <div className="route_show d-flex flex-column align-items-center">
            {this.CityRouteTable()}
            <div className="d-flex justify-content-end align-items-center col-md-8 col-12">
              <span className="route_add_city" onClick={() => this.addCity()} > Добавить пункт назначения</span>
            </div>
          </div>
          <div className="route_show route_show_bottom d-flex " style={{ width: "100%" }}>
            <div className="route_bottomBlock d-flex flex-column">
              <div className="d-flex col-12 justify-content-md-between justify-content-sm-center justify-content-center align-items-center">
                <div className="d-md-flex d-sm-none d-none flex-column">
                  <div className="route_time_text">Время в пути без остановок:
                  <p1>{this.props.driversState.travelTime}</p1><p2>{this.props.driversState.travelLength}</p2>
                  </div>
                  <div className="route_comment">*Возврат в точку отправления в этот же день <span>бесплатно</span></div>
                </div>

                <div className="route_secondBottomBlock flex-sm-row flex-column">
                  <DatePicker hintText="Дата отправления" minDate={new Date()} onChange={(e, date) => { this.chooseDate(date); let datePicker = document.querySelector(".routemenu_date"); datePicker.classList.remove("routemenu_date-Check") }} className="routemenu_date col-md-6 col-12" />

                  <div className="route_secondBottomBlock_button" onClick={() => this.searchRoute()}>
                    <span>ПОИСК</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )
    }
  }

}

const DriversRoute = connect(
  (state) => ({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  })
)(DriversRouteClass);

export default DriversRoute;