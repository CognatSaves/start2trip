import LocationSearchInput from './SearchInput.jsx'
import React from 'react';
import { connect } from 'react-redux';
import './DriversChangeRoute.css';
import './DriversRoute.css';
import Calendar from 'react-calendar'

class DriversRouteClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.storeState.cities,
      date: this.props.storeState.date,
      routeChange: false,
      calendaryVisibility: 'hidden'
    }
    this.routeChangeFunc = this.routeChangeFunc.bind(this);
    this.addCity=this.addCity.bind(this);
    this.removeCity=this.removeCity.bind(this);
    this.applyChanges=this.applyChanges.bind(this);
    this.chooseDate=this.chooseDate.bind(this);
  }
  routeChangeFunc() {
    this.setState({
      routeChange: !this.state.routeChange
    })
  }
  addCity(){
    let cities = [...this.state.cities, ""];
    console.log("addCity call");
    console.log(cities);
    this.setState({
      cities:cities
    })
  }
  removeCity(index){
    let cities = [...this.state.cities];
    cities.splice(index,1);
    this.setState({
      cities: cities
    })
  }
  applyChanges(){
    this.props.setState(this.state.cities, this.state.date, "drivers");
    alert("Производится(нет) попытка отыскатьь маршрут по заявленным данным. Чтобы вернуть панель в исходное состояние нажмите кнопку 'Изменить маршрут'");
  }
  changeCalendaryVisibility(value){
    this.setState({
      calendaryVisibility: value
    })
  }
  chooseDate(value){
    let dayMass = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];
    let monthMass=["января","февраля","марта","апреля","мая",
      "июня","июля","августа","сентября","октября","ноября","декабря"];
    let resultString = dayMass[value.getDay()]+", "+value.getDate()+" "+monthMass[value.getMonth()]+" "+value.getFullYear();
    this.setState({
      date: resultString,
    });
  }
  render() {
    console.log("DriversRoute render");
    console.log(this.state);

    let isVisibleArray = Array(this.state.cities.length).fill("visible");
    isVisibleArray[isVisibleArray.length - 1] = "hidden";
    let left = 128; let size = 32 - 4; let delta = 8;
    if (!this.state.routeChange) {
      return (

        <div className="drivers_route">
          <div className="route_date">
            <div className="route_date_text">Ваш индивидуальный маршрут на:</div>
            <div className="route_date_value">{this.state.date}</div>
          </div>
          <div className="route_show">
            {this.state.cities.map((element, index) =>
              <div className="route_show_element">
                <div className="route_show_icon" style={{ left: left * index + "px" }} />
                <div className="route_show_text" style={{ left: left * index + size + delta + "px" }}>{element}</div>
                <div className="route_show_line" style={{ visibility: isVisibleArray[index], left: left * index + size + "px" }}>__________________</div>
              </div>
            )}
          </div>
          <div className="route_time_text">Время в пути без остановок:</div>
          <div className="route_time_value"><p1>{this.props.driversState.travelTime}</p1> <p2>{this.props.driversState.travelLength}</p2></div>
          <div className="route_comment">*Возврат в точку отправления в этот же день бесплатно</div>
          <div className="route_change" onClick={() => this.routeChangeFunc()}>
            <div className="route_change_emblem"></div>
            <div className="route_change_text">Изменить маршрут</div>
          </div>
        </div>

      );
    }
    else {
      return (
        <div className="drivers_route">
          <div className="route_date">
            <div className="route_date_text">Ваш индивидуальный маршрут на:</div>
            <div className="route_date_value">{this.state.date}</div>
          </div>
          <div className="driversRoute_changeCityBlock">
            {this.state.cities.map((element, index)=>
              <div className="changeCityBlock_city changeCityBlock_elementStyle">
                <LocationSearchInput address={element} key={element}/>
                <div style={{width: "30px", height: "30px", backgroundColor: "blue"}} onClick={()=>this.removeCity(index)}>del</div>
              </div>
            )}           
          </div>
          <div className="changeCityBlock_elementStyle changeCityBlock_addCityBlock" onClick={()=>this.addCity()}>Добавить пункт назначения</div>
          <div className="changeCityBlock_elementStyle changeCityBlock_addCityBlock" style={{color: "red"}}>
              <input placeholder="Дата отправления" value={this.state.date} onClick={()=>this.changeCalendaryVisibility('visible')}></input>
          </div>
          <button className="applyCityBlock_applyButton" onClick={()=>this.applyChanges()}>Поиск</button>
          <div style = {{visibility: this.state.calendaryDisplay}}>
            <Calendar className="no_class_here"
            tileClassName={""}
            onClickDay={(value) => { this.chooseDate(value); this.changeCalendaryVisibility('hidden')}}/>
          </div>


          <div className="driversRoute_applyCityBlock">
            <div className="applyCityBlock_infoBlock">
              <div className="route_time_text">Время в пути без остановок:</div>
              <div className="route_time_value"><p1>{this.props.driversState.travelTime}</p1> <p2>{this.props.driversState.travelLength}</p2></div>
              <div className="route_comment">*Возврат в точку отправления в этот же день бесплатно</div>
            </div>
            
            
          </div>
          <div className="route_change" onClick={() => this.routeChangeFunc()}>
            <div className="route_change_emblem"></div>
            <div className="route_change_text">Изменить маршрут</div>
          </div>
        </div>
      )
    }
  }

}

const DriversRoute = connect(
  (state) =>({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  }),
  (dispatch) => ({
    setState: (cities, date, visibility, picture)=>dispatch({type:"SET_STATE", sourse:"HomeBody", cities: cities, date: date, calendaryVisibility: visibility, picture: picture}) 
  })
)(DriversRouteClass);

export default DriversRoute;