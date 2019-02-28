import React, { Component } from 'react';
import './Drivers.css';
import DriversBody from './DriversBody/DriversBody.jsx';
import DriversHeader from './DriversHeader/DriversHeader.jsx';
import DriversRoute from './DriversRoute/DriversRoute.jsx';
import Footer from '../Footer/Footer.jsx'
import { connect } from 'react-redux'

class DriversClass extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
      console.log("Drivers render");
      console.log(this.props);
        return (
          <React.Fragment>
            <div className = "drivers_top_background" >
              <DriversHeader/>
              <DriversRoute/>
            </div>
            <div className = "drivers_bottom_background" >
              <DriversBody/>
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