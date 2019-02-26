import React, { Component } from 'react';
import './DriversRoute.css'
import { connect } from 'react-redux'
import pointIcon from './pictures/location.svg';
import changeElement from './pictures/drivers_edit_route.png';

class DriversRouteClass extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      let isVisibleArray = Array(this.props.storeState.cities.length).fill("visible");
      isVisibleArray[isVisibleArray.length-1]="hidden";
      let cities = this.props.storeState.cities;
      let routeElementWidth=100/isVisibleArray.length;
      routeElementWidth=routeElementWidth+"%";
      console.log("DriversRoute Render");
      console.log(this.props);
        return (
          <div className = "drivers_route">
            <div className="route_date">
              <div className="route_date_text">Ваш индивидуальный маршрут на: {this.props.storeState.date}</div>
              <div className="route_change" >               
                <div className="route_change_text">Изменить маршрут</div>
                <div className="route_change_emblem">
                  <img src={changeElement} width="100%" height="100%" alt="change"></img>
                </div>
              </div>
            </div>
            <div className="route_show">
              {cities.map((element, index) =>
              <div className="route_show_element" style={{width: routeElementWidth}}>
                <img src={pointIcon} height="100%" width="25%" alt={"icon"+index}/>
                <div className="route_show_text" >{cities[index]}</div>
                <div className="route_show_line" style={{visibility: isVisibleArray[index]}}></div>
              </div>
              )}
            </div>
            <div className="route_bottomBlock">
              <div className="route_time_text">Время в пути без остановок:
                <p1>{this.props.driversState.travelTime}</p1><p2>{this.props.driversState.travelLength}</p2>
              </div>
              <div className="route_comment">*Возврат в точку отправления в этот же день бесплатно</div>
            </div>
                      
          </div>
        );
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
  }),
  (dispatch) => ({
    setState: (cities, date, visibility, picture)=>dispatch({type:"SET_STATE", sourse:"HomeBody", cities: cities, date: date, calendaryVisibility: visibility, picture: picture}) 
  })
)(DriversRouteClass);

export default DriversRoute;