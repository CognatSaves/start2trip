import React from 'react';
import './HomeBody.css'
import './calendary.css';
import { connect } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import { setLengthTime } from '../../../redusers/ActionDrivers'

import RouteMenu from './RouteMenu.jsx'
import MapContainer from './MapContainer.jsx'

const ChangeMapListBlock = (props) => {
  let { mapContainerClass, routeMenuClass, that } = props;
  return (
    <>
      {
        that.state.changeMapList ?
          <div className={mapContainerClass} style={{ display: that.state.changeMapList ? 'block' : 'none' }}>
            <MapContainer cities={that.props.storeState.cities} setLengthTime={that.setLengthTime} mapUpdate={true} />
          </div>
          :
          <div className={routeMenuClass}>
            <RouteMenu goToDrivers={that.goToDrivers} date={that.state.date} setLengthTime={that.setLengthTime} validationInput={(cities) => that.validationInput(cities)} />
            <div style={{ visibility: that.state.calendaryVisibility }} >
            </div>
          </div>
      }
    </>
  )
}
const ConstructorButtonsBlock = (props) => {
  let { that, buttonClasses, textInfo } = props;
  return (
    <>
      {
        <div className="d-flex justify-content-center mb-2 w-50">
          <span className={that.state.changeMapList ? buttonClasses[0] : buttonClasses[1]} onClick={() => {
            that.setState(
              {
                changeMapList: false
              }
            )
          }
          }
          >{textInfo.changeMapList.first}</span>
          <span className={that.state.changeMapList ? buttonClasses[2] : buttonClasses[3]}
            onClick=
            {() => {
              if (that.validationInput(that.props.storeState.cities)) {
                that.setState({ changeMapList: true })
              }
            }
            }
          >{textInfo.changeMapList.second}</span>
        </div>
      }
    </>
  )
}
class HomeBodyClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //cities: this.props.storeState.cities,


      // calendaryVisibility: this.props.storeState.calendaryVisibility,
      date: this.props.storeState.date,
      // picture: this.props.storeState.picture,
      changeMapList: true,
    }
    this.state = JSON.parse(JSON.stringify(this.props.storeState));
    this.state = { ...this.state, "mapUpdate": true, calendaryVisibility: 'hidden' }

  }
  goToDrivers = () => {
    this.setState({ mapUpdate: false });
    this.props.setState(this.state.cities, this.state.date, "drivers");
    this.props.redirectToDrivers();
  }
  setLengthTime = (travelLength, travelTime) => {
    let translation = this.props.storeState.languageTextMain.home.routeMenu;

    function getLengthString(travelLength) {
      let length = travelLength;
      length = Math.ceil(length / 1000);
      let lengthString = length + " " + translation.km;
      return lengthString;
    }
    function getTimeString(travelTime) {
      let hours = travelTime / 3600 ^ 0;
      let minutes = (travelTime - hours * 3600) / 60 ^ 0;
      let days = hours / 24 ^ 0;
      hours = hours - days * 24;
      let timeString = "";
      if (days !== 0) {
        timeString += days + " " + translation.days + " " + hours + " " + translation.hours;
      }
      else {
        if (hours !== 0) {
          timeString += hours + " " + translation.hours + " ";
        }
        timeString += minutes + " " + translation.minutes;
      }
      return timeString;
    }

    if ((this.props.driversState.travelLength === "-" && this.props.driversState.travelTime === "-") ||
      (this.props.driversState.travelLength.length === 0 || this.props.driversState.travelLength.length === 0)) {
      let lengthString = getLengthString(travelLength);
      let timeString = getTimeString(travelTime);
      this.props.setLengthTime(timeString, lengthString);
    }
  }
  validationInput = (massCities) => {
    //Внимание!(спасибо за внимание) Эта функция использует элементы из RouteMenu(первоначально эта функция и принадлежит вышеупомянутому классу).
    //В случае их изменения, может ругаться и сильно.
    //в исходной функции ещё есть проверка на дату - она осталась на старом месте
    let flag = true;
    let massInput = document.querySelectorAll("._checkInput")
    for (let i = 0; i < massInput.length; i++) {
      if (massInput[i].defaultValue === "") {
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
    return flag
  }
  render() {
    let textInfo = this.props.storeState.languageTextMain.home.homeBody;
    console.log(isMobileOnly, "isMobileOnlyBody")
    return (
      <>
        {isMobileOnly ?
          <>
            <div className="w-100">
              <div className="mobailRoutMenu">
                <div className="d-flex flex-column align-items-center">
                  <h1 className="mobailRoutMenuTitle">{textInfo.mobileRouteMenuTitle}</h1>
                  <span className="mobailRoutMenuText">{textInfo.mobileRouteMenuText.mobileRouteMenuText}<br />{textInfo.mobileRouteMenuText.secondLine}</span>
                  <ConstructorButtonsBlock that={this} textInfo={textInfo}
                    buttonClasses={["mobailRoutMenuBtList", "mobailRoutMenuBt-active mobailRoutMenuBtList",
                      "mobailRoutMenuBt-active mobailRoutMenuBtMap", "mobailRoutMenuBtMap"]} />
                </div>
                <ChangeMapListBlock that={this} mapContainerClass="mapContain" routeMenuClass="p-2" />
              </div>
            </div>

          </>
          :
          <>
            <div className="routeContent d-flex flex-column align-items-center col-lg-10 col-md-12 col-11">
              <ConstructorButtonsBlock that={this} textInfo={textInfo}
                buttonClasses={["routMenuBtList", "routMenuBt-active routMenuBtList",
                  "routMenuBt-active routMenuBtMap", "routMenuBtMap"]} />
              <ChangeMapListBlock that={this} mapContainerClass="sizeMap col-12 p-0" routeMenuClass="col-12 p-0" />
            </div>
          </>}
      </>
    );
  }

}



const HomeBody = connect(
  (state) => ({
    driversState: state.DriversReduser,
    storeState: state.AppReduser
  }),
  (dispatch) => ({
    setLengthTime: (travelLength, travelTime) => dispatch({ type: "SET_LENGTH_TIME", travelTime: travelTime, travelLength: travelLength }),
    setState: (cities, date, visibility, picture) => dispatch({ type: "SET_STATE", cities: cities, date: date })
  })
)(HomeBodyClass);

export default HomeBody;