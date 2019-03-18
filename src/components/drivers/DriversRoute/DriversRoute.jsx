import React, { Component } from 'react';
import './DriversRoute.css'
import './DriversChangeRoute.css'
import { connect } from 'react-redux'
import pointIcon from './pictures/location.svg';
import changeElement from './pictures/drivers_edit_route.png';
import SearchInput from './SearchInput.jsx';
import closeIcon from './pictures/close.svg';
import addIcon from './pictures/add.svg';
import calendarIcon from './pictures/calendar.svg';
import loupe from './pictures/da_loupe.png';
import cityMarker from './pictures/location_white.svg';
import {set_state} from '../../../redusers/Action'
import {setDriversRouteChange} from '../../../redusers/ActionDrivers'
import Calendar from 'react-calendar'
import '../../home/HomeBody/calendary.css';
//import {set_state} from '../../../redusers/Action'

class DriversRouteClass extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      calendaryVisibility: 'hidden',
      date: '',
      cities: [...this.props.storeState.cities]
    }
    this.addCity=this.addCity.bind(this);
    this.removeCity=this.removeCity.bind(this);
    this.openChooseDate=this.openChooseDate.bind(this);
    this.closeChooseDate = this.closeChooseDate.bind(this);
    this.chooseDate = this.chooseDate.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.searchRoute=this.searchRoute.bind(this);
  }
  
  addCity() {
    let cities = this.state.cities;
    cities[cities.length]="";
    this.setState({
      cities: cities,
    })
  }
  removeCity(index) {
    let cities = this.state.cities;
    cities.splice(index, 1);
    this.setState({
      cities: cities,
      mapUpdate: true
    })
  }
  openChooseDate() {
    //console.log("openChooseDate call");
    this.setState({
      calendaryVisibility: 'visible'
    }) 
  }
  closeChooseDate() {
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
      calendaryVisibility: 'hidden'
    });
  }
  changeCity(index, value) {
    let cities = this.state.cities;
    cities[index] = value;
    this.setState({
      cities: cities,
    });
  }
  searchRoute(){
    //на данный момент это просто применение изменений
    //поставлено только ограничения - нельзя пустые города и пустую дату
    function isCorrectSearchData(cities, date){
      for(let i=0; i<cities.length; i++){
        if(cities[i].length===""){
          return false;
        }
      }
      if(date.length===0){
        return false;
      }
      return true;
    }
    if(isCorrectSearchData(this.state.cities, this.state.date)){
      this.props.dispatch(set_state("DriversRoute",[...this.state.cities],this.state.date));
      this.props.dispatch(setDriversRouteChange(!this.props.driversState.driversRouteChange))
    }
    else{
      alert("Nekotorie dannie nekorektni!! Proverte vse esche!");
    }
  }
    render() {
      let isVisibleArray = Array(this.props.storeState.cities.length).fill("visible");
      isVisibleArray[isVisibleArray.length-1]="hidden";
      if(!this.props.driversState.driversRouteChange){
        return (
          <div className = "drivers_route col-12 d-flex flex-column">
            <div className="route_date d-flex flex-row">
              <div className="route_date_text">Ваш индивидуальный маршрут на: {this.props.storeState.date}</div>
              <div className="d-flex flex-row" onClick={()=>this.props.dispatch(setDriversRouteChange(!this.props.driversState.driversRouteChange))}>               
                <div className="route_change_text">Изменить маршрут</div>
                <div className="route_change_emblem"/>
              </div>
            </div>
            <div className="route_show d-flex flex-row">
              {this.state.cities.map((element, index) =>
              <div className="route_show_element" style={{/*width: routeElementWidth*/}}>
                <div className="route_show_icon"/>
                <div className="route_show_text" >{this.state.cities[index]}</div>
                <div className="route_show_line" style={{visibility: isVisibleArray[index]}}></div>
              </div>
              )}
            </div>
            <div className="route_bottomBlock d-flex flex-column">
              <div className="route_time_text">Время в пути без остановок:
                <p1>{this.props.driversState.travelTime}</p1><p2>{this.props.driversState.travelLength}</p2>
              </div>
              <div className="route_comment">*Возврат в точку отправления в этот же день бесплатно</div>
            </div>                      
          </div>
        )
      }
      else{
        let removeArray = Array(this.state.cities.length).fill('block');
        removeArray[0]='none';
        removeArray[removeArray.length-1]='none';
        return (
          <div className = "drivers_route col-12 d-flex flex-column">
            <div className="route_date d-flex flex-row">
              <div className="route_date_text">Ваш индивидуальный маршрут на: {this.props.storeState.date}</div>
              <div className="d-flex flex-row" onClick={()=>this.props.dispatch(setDriversRouteChange(!this.props.driversState.driversRouteChange))}>               
                <div className="route_change_text">Изменить маршрут</div>
                <div className="route_change_emblem"/>
              </div>
            </div>
            <div className="route_show d-flex flex-row">
              {this.state.cities.map((element, index) =>
              <React.Fragment>
                <div className="route_show_element" key={element+"/"+index}>
                  <div className="search_input_block">
                    <div className="search_input_icon"/>
                    <SearchInput address={element} changeCity={this.changeCity} index={index} class={"search_input_style"}/>
                  </div>                  
                  <div className="route_show_cross" style={{display: removeArray[index]}} onClick={()=>this.removeCity(index)}/>                                 
                </div>
              </React.Fragment>
              )}
            </div>
            <div className="route_show route_show_bottom d-flex flex-row" style={{width: "100%"}}>
              <div className="route_bottomBlock d-flex flex-column">
                <div className="route_add_city" onClick={()=>this.addCity()}>
                  <div className="route_add_city_imageBlock"/>
                  <div className="route_add_city_text">
                    Добавить пункт назначения
                  </div>
                </div>
                <div className="route_time_text">Время в пути без остановок:
                  <p1>{this.props.driversState.travelTime}</p1><p2>{this.props.driversState.travelLength}</p2>
                </div>
                <div className="route_comment">*Возврат в точку отправления в этот же день бесплатно</div>
              </div>
              <div className="route_secondBottomBlock">
                <div className="route_secondBottomBlock_date route_secondBottomBlock_elementStyle">
                  <div className="secondBottomBlock_calendarBlock">
                    <div style={{ visibility: this.state.calendaryVisibility}}>
                      <Calendar className="calendary_drivers_position"
                        tileClassName={""}
                        onClickDay={(value) => { this.chooseDate(value);}} />
                    </div>
                    <div className="secondBottomBlock_calendar"/>
                    <input className="secondBottomBlock_dateInput" placeholder="Date must be here" value={this.state.date} onClick={()=>this.openChooseDate()}></input>
                  </div>                 
                </div>
                <button className="route_secondBottomBlock_button route_secondBottomBlock_elementStyle"  onClick={()=>this.searchRoute()}>
                  <div className="secondBottomBlock_button_inner">                   
                    <div className="route_secondBottomBlock_searchText" >
                      ПОИСК
                    </div>
                  </div>
                  
                </button>
              </div>
            </div>
            
                      
          </div>
        )
      
        
        }
    }

}
/*

<div className = "drivers_route">
            <div className="route_date">
              <div className="route_date_text">Ваш индивидуальный маршрут на:</div>
              <div className="route_date_value">{date}</div>
            </div>
            <div className="route_show">
              {cities.map((element, index) =>
              <div className="route_show_element">
                <div className="route_show_icon" style={{left: left*index+"px"}}/>
                <div className="route_show_text" style={{left: left*index+size+delta+"px"}}>{cities[index]}</div>
                <div className="route_show_line" style={{visibility: isVisibleArray[index], left: left*index+size+"px"}}>__________________</div>
              </div>
              )}
            </div>
            <div className="route_time_text">Время в пути без остановок:</div>
            <div className="route_time_value"><p1>24 ч. 18 мин.</p1> <p2>2003 км</p2></div>
            <div className="route_comment">*Возврат в точку отправления в этот же день бесплатно</div>
            <div className="route_change">
              <div className="route_change_emblem"></div>
              <div className="route_change_text">Изменить маршрут</div>
            </div>
          </div>



*/



const DriversRoute = connect(
  (state) =>({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  })
)(DriversRouteClass);

export default DriversRoute;