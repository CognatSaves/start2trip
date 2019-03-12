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


class DriversRouteClass extends React.Component {
    render() {
      let isVisibleArray = Array(this.props.storeState.cities.length).fill("visible");
      isVisibleArray[isVisibleArray.length-1]="hidden";
      let cities = this.props.storeState.cities;
      let routeElementWidth=100/(isVisibleArray.length+1);
      routeElementWidth=routeElementWidth+"%";
      if(!this.props.driversState.driversRouteChange){
        return (
          <div className = "drivers_route col-12 d-flex flex-column">
            <div className="route_date d-flex flex-row">
              <div className="route_date_text">Ваш индивидуальный маршрут на: {this.props.storeState.date}</div>
              <div className="d-flex flex-row" onClick={()=>this.props.dispatch(setDriversRouteChange(!this.props.driversState.driversRouteChange))}>               
                <div className="route_change_text">Изменить маршрут</div>
                <div className="route_change_emblem">
                  <img src={changeElement} width="100%" height="100%" alt="change"></img>
                </div>
              </div>
            </div>
            <div className="route_show d-flex flex-row">
              {cities.map((element, index) =>
              <div className="route_show_element" style={{/*width: routeElementWidth*/}}>
                <img src={pointIcon} style={{marginTop: "10px"}} height="75%" width="auto" alt={"icon"+index}/>
                <div className="route_show_text" >{cities[index]}</div>
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
        return (
          <div className = "drivers_route col-12 d-flex flex-column">
            <div className="route_date d-flex flex-row">
              <div className="route_date_text">Ваш индивидуальный маршрут на: {this.props.storeState.date}</div>
              <div className="d-flex flex-row" onClick={()=>this.props.dispatch(setDriversRouteChange(!this.props.driversState.driversRouteChange))}>               
                <div className="route_change_text">Изменить маршрут</div>
                <div className="route_change_emblem">
                  <img src={changeElement} width="100%" height="100%" alt="change"></img>
                </div>
              </div>
            </div>
            <div className="route_show d-flex flex-row">
              {cities.map((element, index) =>
              <React.Fragment>
                <div className="route_show_element">
                  <div className="search_input_block">
                    <div className="search_input_icon">
                      <img src={cityMarker} width="100%" height="100%" alt=""></img>
                    </div>
                    <SearchInput address={element} changeCity={()=>{}} index={index} class={"search_input_style"}/>
                  </div>                  
                  <div className="route_show_cross">
                    <img src={closeIcon} width="100%" height="100%" alt="close"></img>
                  </div>                 
                </div>
              </React.Fragment>
              )}
            </div>
            <div className="route_show route_show_bottom d-flex flex-row" style={{width: "100%"}}>
              <div className="route_bottomBlock d-flex flex-column">
                <div className="route_add_city">
                  <div className="route_add_city_imageBlock">
                    <img src={addIcon} width="100%" height="100%" alt="addIcon"></img>
                  </div>
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
                    <div className="secondBottomBlock_calendar">
                      <img src={calendarIcon} width="100%" height="100%" alt="calendar"></img>
                    </div>
                    <input className="secondBottomBlock_dateInput" placeholder="Date must be here"></input>
                  </div>                 
                </div>
                <button className="route_secondBottomBlock_button route_secondBottomBlock_elementStyle">
                  <div className="secondBottomBlock_button_inner">                   
                    <div className="route_secondBottomBlock_searchText">
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