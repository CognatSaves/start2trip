import React, { Component } from 'react';
import './HomeBody.css'
import RouteMenu from './components/RouteMenu.js'
import MapContainer from './components/MapContainer.js'
import Calendar from 'react-calendar'
import './calendary.css';
import { connect } from 'react-redux'
import {Link, Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';

class HomeBodyClass extends React.Component {
  constructor(props) {
    super(props);
    this.state=this.props.storeState
    
    this.changeCity=this.changeCity.bind(this);
    this.addCity=this.addCity.bind(this);
    this.removeCity=this.removeCity.bind(this);
    this.openChooseDate=this.openChooseDate.bind(this);
    this.closeChooseDate=this.closeChooseDate.bind(this);
    this.goToDrivers=this.goToDrivers.bind(this);
  }
  changeCity(index,e){
    let cities = this.state.cities;
    cities[index]=e.target.value;
    this.setState({
      cities:cities
    });
    //this.props.changeCity(index,e.target.value);
  }
  addCity(){
    let cities=this.state.cities;
    cities[cities.length]="";
    this.setState({
      cities:cities
    })
    //this.props.addCity();
  }
  removeCity(index){
    let cities = this.state.cities;
    cities.splice(index,1);
    this.setState({
      cities:cities
    })
    //this.props.removeCity(index);
  }
  openChooseDate(){
    console.log("OpenChooseDate call");
    this.setState({
      calendaryVisibility: 'visible'
    })
    //this.props.calendaryVisibility('visible');
  }
  closeChooseDate(){
    this.setState({
      calendaryVisibility: 'hidden'
    })
    //this.props.calendaryVisibility('hidden');
  }
  chooseDate(value){
    //console.log("chooseDate call");
   // console.log(value);

    let dayMass = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];
    let monthMass=["января","февраля","марта","апреля","мая",
      "июня","июля","августа","сентября","октября","ноября","декабря"];
    let resultString = dayMass[value.getDay()]+", "+value.getDate()+" "+monthMass[value.getMonth()]+" "+value.getFullYear();
   // console.log("result");
    //console.log(resultString);
    this.setState({
      date: resultString
    });
    //this.props.setDate(resultString);
    //this.closeChooseDate();

  }
  goToDrivers(){
    console.log("Go to Drivers call");
    this.props.setState(this.state.cities, this.state.date, this.state.calendaryVisibility, "drivers");  
    /*this.setState({
      picture: "drivers"
    }  )*/
    this.props.redirectToDrivers();
  }
  render() {
    console.log("HomeBody render");
    console.log(this.props);
    return(
      <React.Fragment>
        <div className="body_menu">
          <RouteMenu cities={this.state.cities} changeCity={this.changeCity} addCity={this.addCity}
          removeCity={this.removeCity} goToDrivers={this.goToDrivers} chooseDate={this.openChooseDate} date={this.state.date}/>
          <div  style={{visibility: this.state.calendaryVisibility}}>
            <Calendar className="calendary_position"
            tileClassName={""}
            onClickDay={(value) => { this.chooseDate(value); this.closeChooseDate()}}/>
          </div>
        </div>
        <div className="body_map">
          <MapContainer cities={this.props.storeState.cities}/>
        </div>
        
      </React.Fragment>
    );
  }

}


const HomeBody = connect(
  (state) =>({
    storeState: state.AppReduser
  }),
  (dispatch) => ({
    goToDrivers:() => dispatch({type:"CHANGE_PICTURE", picture:"drivers"}),
    changeCity:(index,value) => dispatch({type:"CHANGE_CITY", index: index, value: value}),
    addCity:()=>dispatch({type: "ADD_CITY"}),
    removeCity:(index)=>dispatch({type:"REMOVE_CITY",index: index}),
    calendaryVisibility:(visibility)=>dispatch({type:"CHOOSE_DATE_VIS", visibility: visibility}),
    setDate: (date)=>dispatch({type:"SET_DATE",date:date}),
    setState: (cities, date, visibility, picture)=>dispatch({type:"SET_STATE", sourse:"HomeBody", cities: cities, date: date, calendaryVisibility: visibility, picture: picture})
  })
)(HomeBodyClass);

export default HomeBody;