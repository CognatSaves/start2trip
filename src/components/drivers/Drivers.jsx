import React, { Component } from 'react';
import './Drivers.css';
import DriversBody from './DriversBody/DriversBody.jsx';
import DriversHeader from './DriversHeader/DriversHeader.jsx';
import DriversRoute from './DriversRoute/DriversRoute.jsx';
import Footer from '../Footer/Footer.jsx'
import { connect } from 'react-redux'
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'

class DriversClass extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          travelVisibility: 'none',
          successVisibility: 'none'
        }
        this.changeTravelVisibility=this.changeTravelVisibility.bind(this);
        this.changeSuccessVisibility=this.changeSuccessVisibility.bind(this);
    }
    changeTravelVisibility(value){
      console.log("changeTravelVisibility call");
      console.log(value);
      this.setState({
        travelVisibility: value
      })
    }
    changeSuccessVisibility(value){
      console.log("changeSuccessVisibility call");
      console.log(value);
      this.setState({
        successVisibility: value
      })
    }
    render() {
      console.log("Drivers render");
      console.log(this.props);
      console.log(this.state);
        return (
          <React.Fragment>
              <div className = "drivers_top_background">
                <div className="travelFormBlock">
                  <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
                  travelVisibility={this.state.travelVisibility} successVisibility={this.changeSuccessVisibility}/>
                  <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility}/>
                </div>
                <DriversHeader/>
                <DriversRoute/>
              </div>
              <div className = "drivers_bottom_background" >
                <DriversBody changeTravelVisibility={this.changeTravelVisibility}/>
                <Footer/>
              </div>           
          </React.Fragment>
        );
    }
}

/*
<div>
            <div className = "drivers_top_background" >
              <DriversHeader/>
              <DriversRoute/>
              
            </div>
            <div className = "drivers_bottom_background" >
              <DriversBody/>
              <Footer/>
            </div>
          </div>


*/

const Drivers = connect(
  (state) =>({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  }),
  (dispatch) => ({
   // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
  })
)(DriversClass);

export default Drivers;