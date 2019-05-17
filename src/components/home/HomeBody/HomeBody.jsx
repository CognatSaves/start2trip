import React from 'react';
import './HomeBody.css'
import RouteMenu from './RouteMenu.jsx'
import MapContainer from './MapContainer.jsx'
// import Calendar from 'react-calendar'
import './calendary.css';
import { connect } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'


class HomeBodyClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: this.props.storeState.cities,
      calendaryVisibility: this.props.storeState.calendaryVisibility,
      date: this.props.storeState.date,
      picture: this.props.storeState.picture,
      changeMapList: true,
    }
    this.state = JSON.parse(JSON.stringify(this.props.storeState));
    this.state = { ...this.state, "mapUpdate": true, calendaryVisibility: 'hidden' }

  }

  changeCity=(index, value)=> {
    debugger
    let cities = this.state.cities;
    cities[index] = value;
    this.setState({
      cities: cities,
      mapUpdate: true
    });
  }
  addCity=()=> {
    let cities = this.state.cities;
    /*cities[cities.length] = cities[cities.length-1];
    cities[cities.length-2]="";*/
    cities[cities.length] = "";
    this.setState({
      cities: cities,
      mapUpdate: true
    })
  }
  removeCity=(index)=> {
    let cities = this.state.cities;
    cities.splice(index, 1);
    this.setState({
      cities: cities,
      mapUpdate: true
    })
  }
  openChooseDate=()=> {
    console.log("openChooseDate call");
    this.setState({
      mapUpdate: false,
    })
    this.setState({
      calendaryVisibility: 'visible'
    })
  }
  closeChooseDate=()=> {
    this.setState({
      mapUpdate: false,
    })
    this.setState({
      calendaryVisibility: 'hidden'
    })
  }
  chooseDate(value) {
    let dayMass = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    let monthMass = ["января", "февраля", "марта", "апреля", "мая",
      "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let resultString = dayMass[value.getDay()] + ", " + value.getDate() + " " + monthMass[value.getMonth()] + " " + value.getFullYear();
    this.setState({
      date: resultString,
      mapUpdate: false
    });
  }
  goToDrivers=()=> {
    this.props.setState(this.state.cities, this.state.date, "drivers");
    this.props.redirectToDrivers();
  }
  setLengthTime=(travelLength, travelTime)=> {
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
  render() {
    console.log(isMobileOnly, "isMobileOnlyBody")
    return (
      <React.Fragment>
        {isMobileOnly ?
          <React.Fragment>
            <div className="d-md-none d-sm-block d-block w-100">
              <div className="mobailRoutMenu">
                <div className="d-flex flex-column align-items-center">
                  <div className="mobailRoutMenuTitle">Cпланируйте свою экскурсию</div>
                  <p className="mobailRoutMenuText">Предложения от местных гидов-водителей <br /> по вашему индивидуальному маршруту</p>
                  <div className="d-flex mb-4">
                    <span className={this.state.changeMapList ? "mobailRoutMenuBtList" : "mobailRoutMenuBt-active mobailRoutMenuBtList"} onClick={() => { this.setState({ changeMapList: false }) }}>Список</span>
                    <span className={this.state.changeMapList ? "mobailRoutMenuBt-active mobailRoutMenuBtMap" : "mobailRoutMenuBtMap"} onClick={() => { this.setState({ changeMapList: true }) }}>Карта</span>
                  </div>
                </div>
                {this.state.changeMapList ?
                  <div className="mapContain">
                    <MapContainer cities={this.state.cities} setLengthTime={this.setLengthTime} mapUpdate={true} />
                  </div>
                  :
                  <div>
                    <RouteMenu cities={[...this.state.cities]} changeCity={this.changeCity} addCity={this.addCity}
                      removeCity={this.removeCity} goToDrivers={this.goToDrivers} chooseDate={this.openChooseDate} date={this.state.date} />
                    <div style={{ visibility: this.state.calendaryVisibility }}>
                    </div>
                  </div>
                }
              </div>
            </div>

          </React.Fragment>
          :
          <React.Fragment>
            <div className="d-flex flex-column align-items-center">
            <div className="d-flex mb-4">
              <span className={this.state.changeMapList ? "mobailRoutMenuBtList" : "mobailRoutMenuBt-active mobailRoutMenuBtList"} onClick={() => { this.setState({ changeMapList: false }) }}>Список</span>
              <span className={this.state.changeMapList ? "mobailRoutMenuBt-active mobailRoutMenuBtMap" : "mobailRoutMenuBtMap"} onClick={() => { this.setState({ changeMapList: true }) }}>Карта</span>
            </div>

            {this.state.changeMapList ?
              <div className="">
                <MapContainer cities={this.state.cities} setLengthTime={this.setLengthTime} mapUpdate={true} />
              </div>
              :
              <div>
                <RouteMenu cities={[...this.state.cities]} changeCity={this.changeCity} addCity={this.addCity}
                  removeCity={this.removeCity} goToDrivers={this.goToDrivers} chooseDate={this.openChooseDate} date={this.state.date} />
                <div style={{ visibility: this.state.calendaryVisibility }}>
                </div>
              </div>
            }

            </div>
            
          </React.Fragment>}
        {/* <React.Fragment>
             <div className="body_menu col-xl-4 col-lg-3 col-md-4 col-sm-5 col-3 p-0">
              <RouteMenu cities={[...this.state.cities]} changeCity={this.changeCity} addCity={this.addCity} 
                 removeCity={this.removeCity} goToDrivers={this.goToDrivers} chooseDate={this.openChooseDate} date={this.state.date} />
               <div style={{ visibility: this.state.calendaryVisibility }}>
               </div>
            </div>
           <div className="body_map col-xl-8 col-lg-9 col-md-7 col-sm-7 col-6 p-0">
              <MapContainer cities={this.state.cities} setLengthTime={this.setLengthTime} mapUpdate={true} />
             </div>

         </React.Fragment>} */}


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
    goToDrivers: () => dispatch({ type: "CHANGE_PICTURE", picture: "drivers" }),
    calendaryVisibility: (visibility) => dispatch({ type: "CHOOSE_DATE_VIS", visibility: visibility }),
    setLengthTime: (travelLength, travelTime) => dispatch({ type: "SET_LENGTH_TIME", travelTime: travelTime, travelLength: travelLength }),
    setState: (cities, date, visibility, picture) => dispatch({ type: "SET_STATE", sourse: "HomeBody", cities: cities, date: date, calendaryVisibility: visibility, picture: picture })
  })
)(HomeBodyClass);

export default HomeBody;