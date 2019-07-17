import React from 'react';
import './HomeBody.css'
import RouteMenu from './RouteMenu.jsx'
import MapContainer from './MapContainer.jsx'
// import Calendar from 'react-calendar'
import './calendary.css';
import { connect } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'

const ChangeMapListBlock = (props) =>{
  let {mapContainerClass, routeMenuClass, that} = props;
  return(
    <React.Fragment>
      {
        that.state.changeMapList ?
        <div className={mapContainerClass}>
          <MapContainer cities={that.props.storeState.cities} setLengthTime={that.setLengthTime} mapUpdate={true} />
        </div>
        :
        <div className={routeMenuClass}>
          <RouteMenu  goToDrivers={that.goToDrivers} date={that.state.date} validationInput={(cities)=>that.validationInput(cities)}/>
          <div style={{ visibility: that.state.calendaryVisibility }} >
          </div>
        </div>
      }
    </React.Fragment>
  )
}
const ConstructorButtonsBlock = (props) => {
  let {that, buttonClasses, textInfo} = props;
  return(
    <React.Fragment>
    {
      <div className="d-flex mb-4">
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
          {() => 
            {           
              if(that.validationInput(that.props.storeState.cities))
              {
                that.setState({ changeMapList: true })
              }
            }
          }
        >{textInfo.changeMapList.second}</span>
      </div>
    }
    </React.Fragment>
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
    this.setState({mapUpdate: false});
    this.props.setState(this.state.cities, this.state.date, "drivers");
    this.props.redirectToDrivers();
  }
  setLengthTime = (travelLength, travelTime) => {
    function getLengthString(travelLength) {
      let length = travelLength;
      length = Math.ceil(length / 1000);
      let lengthString = length + " км";
      return lengthString;
    }
    function getTimeString(travelTime) {
      let hours = travelTime / 3600 ^ 0;
      let minutes = (travelTime - hours * 3600) / 60 ^ 0;
      let days = hours / 24 ^ 0;
      hours = hours - days * 24;
      let timeString = "";
      if (days !== 0) {
        timeString += days + " дн. " + hours + " ч.";
      }
      else {
        if (hours !== 0) {
          timeString += hours + " ч. ";
        }
        timeString += minutes + " мин.";
      }
      return timeString;
    }
    let lengthString = getLengthString(travelLength);
    let timeString = getTimeString(travelTime);

    this.props.setLengthTime(lengthString, timeString);
  }
  validationInput = (massCities) => {
    //Внимание!(спасибо за внимание) Эта функция использует элементы из RouteMenu(первоначально эта функция и принадлежит вышеупомянутому классу).
    //В случае их изменения, может ругаться и сильно.
    //в исходной функции ещё есть проверка на дату - она осталась на старом месте
    let flag = true;
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
    return flag
  }
  render() {
    let textInfo = this.props.storeState.languageTextMain.home.homeBody;
    console.log(isMobileOnly, "isMobileOnlyBody")
    return (
      <React.Fragment>
        {isMobileOnly ?
          <React.Fragment>
            <div className="w-100">
              <div className="mobailRoutMenu">
                <div className="d-flex flex-column align-items-center ">
                  <div className="mobailRoutMenuTitle">{textInfo.mobileRouteMenuTitle}</div>
                  <p className="mobailRoutMenuText">{textInfo.mobileRouteMenuText.mobileRouteMenuText}<br />{textInfo.mobileRouteMenuText.secondLine}</p>
                  <ConstructorButtonsBlock that={this} textInfo={textInfo} 
                  buttonClasses={["mobailRoutMenuBtList","mobailRoutMenuBt-active mobailRoutMenuBtList",
                  "mobailRoutMenuBt-active mobailRoutMenuBtMap","mobailRoutMenuBtMap"]}/>
                </div>
                <ChangeMapListBlock that={this} mapContainerClass="mapContain" routeMenuClass="p-2"/>
              </div>
            </div>

          </React.Fragment>
          :
          <React.Fragment>
            <div className="routeContent d-flex flex-column align-items-center col-xl-10 col-lg-10 col-md-12 col-sm-11 col-11">
              <ConstructorButtonsBlock that={this} textInfo={textInfo} 
                    buttonClasses={["routMenuBtList","routMenuBt-active routMenuBtList",
                    "routMenuBt-active routMenuBtMap","routMenuBtMap"]}/>              
              <ChangeMapListBlock that={this} mapContainerClass="sizeMap col-12 p-0" routeMenuClass="col-12 p-0"/>
            </div>
          </React.Fragment>}
      </React.Fragment>
    );
  }

}



const HomeBody = connect(
  (state) => ({
    storeState: state.AppReduser,
    stateReduserState: state.StateReduser
  }),
  (dispatch) => ({
    // goToDrivers: () => dispatch({ type: "CHANGE_PICTURE", picture: "drivers" }),
    // calendaryVisibility: (visibility) => dispatch({ type: "CHOOSE_DATE_VIS", visibility: visibility }),
    setLengthTime: (travelLength, travelTime) => dispatch({ type: "SET_LENGTH_TIME", travelTime: travelTime, travelLength: travelLength }),
    setState: (cities, date, visibility, picture) => dispatch({ type: "SET_STATE", cities: cities, date: date})
  })
)(HomeBodyClass);

export default HomeBody;