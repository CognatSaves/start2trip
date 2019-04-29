import React from 'react';
import './DriverProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import DriverProfileNavigation from './DriverProfileNavigation'
import DriverProfileCar from './DriverProfileCar'
import DriverProfileBasicInformation from './DriverProfileBasicInformation'
import DriverProfileFeedback from './DriverProfileFeedback'
import DriverProfileTripSettingsTrip from './DriverProfileTripSettingsTrip'
import DriverProfileTripSettingsTour from './DriverProfileTripSettingsTour'
import DriverProfileSettings from './DriverProfileSettings'
import DriverProfileHistory from './DriverProfileHistory'

import requests from '../../config';
import axios from 'axios';

import { setProfileData } from "../../redusers/ActionDriverProfileRegistration"

class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    const that = this;
    function getUserData(){
      function readCookie(name) {
        var name_cook = name+"=";
        var spl = document.cookie.split(";");           
        for(var i=0; i<spl.length; i++) {           
            var c = spl[i];               
            while(c.charAt(0) == " ") {               
                c = c.substring(1, c.length);                   
            }               
            if(c.indexOf(name_cook) == 0) {                   
                return c.substring(name_cook.length, c.length);                    
            }               
        }           
        return null;           
      }
      let jwt = readCookie('jwt');
      console.log('jwt');
      console.log(jwt);
      if(jwt && jwt!=="-"){
        
        axios.get(requests.profileRequest+'?ISO=RUS&countryISO=IRO', {
          headers: {
            //Authorization: `${jwt}`
            Authorization: `Bearer ${jwt}`
          }
        })
        .then(response =>{
          //debugger;
          console.log('Data profile: ');
          console.log(response.data);
          that.props.dispatch(setProfileData(response.data));
        })
        .catch(error => {
          console.log('error, here must be return to authorization window! or smth else');
        })
      }
    }
    getUserData();
    this.state = {
      userData:{}
  }

  }
  render() {
    /*console.log("this.state.userData:");
    console.log(this.state.userData);*/
    console.log("DriverProfileRender");
    
    let profile =this.props.storeState.profile;
    console.log(profile);
    return (
      <React.Fragment>
        { profile.isDriver ?
            <React.Fragment>
            <Header driver={true} />
            <DriverProfileNavigation />
            <div className="registrationWrapper d-flex flex-column col-12 p-0">
              <div className="d-flex contentHeight col-12 p-0">
                <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  
                  {{
                    0: <DriverProfileHistory/>,
                    1: <DriverProfileHistory/>,
                    2: <DriverProfileBasicInformation />,
                    3: <DriverProfileCar />,
                    4: <DriverProfileTripSettingsTrip />,
                    5: <DriverProfileTripSettingsTour />,
                    6: <DriverProfileFeedback />,
                    7: <DriverProfileSettings />,
                  }[this.props.storeState.pageRender]}
                </div>
                
              </div>
            </div>
          </React.Fragment> :
          <React.Fragment/>
        }
        {
          (!profile.isCustomer && !profile.isDriver && !profile.isAgency) ?
          <div>
            {"Additional confirmation page - if there is no user type"}
          </div> :
          <React.Fragment/>
        }
      </React.Fragment>
    );
  }
}

const DriverProfileRegistration = connect(
  (state) => ({
    storeState: state.DriverProfileRegistrationtReduser,
  }),
)(DriverProfileRegistrationClass);

export default DriverProfileRegistration;