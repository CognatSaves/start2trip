import React, { Component } from 'react';
import './RouteMenu.css'
import {Redirect} from 'react-router-dom';

const CityRouteTable = (props) => {
  const {cities, changeCity,removeCity} = props;
  let isVisibleArray = Array(cities.length).fill("visible");
  let dotClasses = Array(cities.length).fill("dotBox");
  dotClasses[0]="firstDotBox";
  dotClasses[dotClasses.length-1]="lastDotBox";
  //non-visible x near first and last element-city - can not delete first & last;
  isVisibleArray[0]="hidden";
  isVisibleArray[isVisibleArray.length-1]="hidden";
  console.log("CityRouteTable arrays:");
  console.log(dotClasses);
  return(
    <tbody align="center">
    {cities.map((element,index)=>
      <tr key={index}>
        <td key={index+"el0"}>
          <div className={dotClasses[index]}/>
        </td>
        <td key={index+"el1"}>
          <input value={element} className="city_input" onChange={changeCity.bind(this,index)}/>
        </td>
        <td  key={index+"el2"} style={{visibility: isVisibleArray[index]}} onClick={()=>removeCity(index)}>
          <div className="crossBox">
          </div>
        </td>
      </tr>
    )}
    </tbody>
  )
}

export default class HomeBody extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log("RouteMenu render call");
    let parameters_text="Дополнительные параметры    ";
    return(
      <React.Fragment>
      <div className="routemenu_container">
        <table className="routemenu_table">
          <CityRouteTable cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity}/>
        </table>
        <div className="routemenu_addCity">          
          <div className="routemenu_city_add_button" onClick={()=>this.props.addCity()}></div>
          <div className="routemenu_city_add_text" onClick={()=>this.props.addCity()}>Добавить пункт назначения</div>
        </div>
        <div className="routemenu_setDate">
          <div className="routemenu_calendary"></div>
          <input className="routemenu_date" value={this.props.date} placeholder="Дата отправления" onClick={()=>this.props.chooseDate()}></input>
          
        </div>
        
      </div>
        <div className="routemenu_parameters">
          <div className="routemenu_parameters_text"><p>{parameters_text}</p></div>
          <div className="routemenu_parameters_arrow"/>
        </div>
        <div className="routemenu_search" onClick={()=>{return (<Redirect to="/drivers"/>)}}>
          <div className="routemenu_search_button" onClick={()=>this.props.goToDrivers(this.props.cities, this.props.date)}>
            <div className="routemenu_search_loupe"/>
            <div className="routemenu_search_text">ПОИСК</div>
          </div>
        </div>
        <div className="routemenu_comment">
          <div className="routemenu_comment_text">*Возврат в точку отправления в этот же день бесплатно</div>
        </div>
      </React.Fragment>
    );
  }
}

/*



/*
<table className="routemenu_table">
          <CityRouteTable cities={this.props.cities} changeCity={this.props.changeCity} removeCity={this.props.removeCity}/>
        </table>
<div className="routemenu_city_add_button" onClick={()=>this.props.addCity()}></div>
        <div className="routemenu_city_add_text">Добавить пункт назначения</div>
        <div className="routemenu_calendary"></div>
        <input className="routemenu_date" value={this.props.date} placeholder="Дата отправления" onClick={()=>this.props.chooseDate()}></input>
        <div className="routemenu_parameters">
          <div className="routemenu_parameters_text"><p>{parameters_text}</p></div>
          <div className="routemenu_parameters_arrow"/>
        </div>
        <button className="routemenu_search" onClick={()=>this.props.goToDrivers(this.props.cities, this.props.date)}>
          <div className="routemenu_search_loupe"/>
          <div className="routemenu_search_text">ПОИСК</div>
        </button>
        <div className="routemenu_comment">*Возврат в точку отправления в этот же день бесплатно</div>





*/