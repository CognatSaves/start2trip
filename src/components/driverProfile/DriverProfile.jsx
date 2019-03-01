import React, { Component } from 'react';
import './DriverProfile.css';
import { connect } from 'react-redux'
import Footer from '../Footer/Footer.jsx'
import DriversRoute from '../drivers/DriversRoute/DriversRoute';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import DriversProfileComments from './DriversProfileComments';
import Manipulator from '../manipulator/Manipulator';

class DriverProfileClass extends React.Component{
    constructor(props){
        super(props);        
    }
    render(){
        console.log("DriverProfile render");

        return(
            <React.Fragment>
                <div className = "drivers_top_background">
                    <div className="header_placeholder"></div>
                    Hello World
                    <DriversRoute/>
                </div>

                <div className = "drivers_bottom_background" >
                    <div className = "drivers_body">
                        <div className="left_body_part">
                            <DriversProfileComments/>
                            <Manipulator/>
                        </div>
                        <div className="right_body_part">
                            <DriversCommercial/>
                        </div>
                        
                    </div>
                    <Footer/>
                </div>

            </React.Fragment>
            
        )
    }
}

const DriverProfile = connect(
    (state) =>({
      storeState: state.AppReduser,
      driversState: state.DriversReduser
    }),
    (dispatch) => ({
     // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
    })
  )(DriverProfileClass);
  
  export default DriverProfile;