import React, { Component } from 'react';
import './Drivers.css';
import DriversBody from './components/DriversBody/DriversBody.js';
import DriversHeader from './components/DriversHeader/DriversHeader.js';
import DriversRoute from './components/DriversRoute/DriversRoute.js';
import Footer from '../Footer/Footer.js'
import { connect } from 'react-redux'

class DriversClass extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
      console.log("Drivers render");
      console.log(this.props);
        return (
          <div>
            <div className = "drivers_top_background" >
              <DriversHeader/>
              <DriversRoute cities={this.props.storeState.cities} date={this.props.storeState.date}/>
            </div>
            <div className = "drivers_bottom_background" >
              <DriversBody/>
              <Footer/>
            </div>
          </div>
        );
    }
}
const Drivers = connect(
  (state) =>({
    storeState: state.AppReduser
  }),
  (dispatch) => ({
   // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
  })
)(DriversClass);

export default Drivers;