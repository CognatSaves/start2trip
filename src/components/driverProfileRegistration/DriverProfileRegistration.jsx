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
import DriverProfileBilling from './DriverProfileBilling'
import DriverProfileAffiliateProgram from './DriverProfileAffiliateProgram'
import {Route} from 'react-router-dom';

class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('DriverProfileRegistration');
    
    //let profile = this.props.storeState.profile;
    let userType = this.props.globalReduser.readCookie('userType');
    if(this.props.globalReduser.profile.isDriver){
      return(
        <React.Fragment>
        <Header driver={true} history={this.props.history} />
        <DriverProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="d-flex contentHeight col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <Route path="/account/driver/trips" component={DriverProfileHistory} />
            <Route path="/account/driver/profile" component={DriverProfileBasicInformation} />
            <Route path="/account/driver/cars" component={DriverProfileCar} />
            <Route path="/account/driver/tripsSettings" component={DriverProfileTripSettingsTrip} />
            <Route path="/account/driver/tours" component={DriverProfileTripSettingsTour} />
            <Route path="/account/driver/reviews" component={DriverProfileFeedback} />
            <Route path="/account/driver/settings" component={DriverProfileSettings} />
            <Route path="/account/driver/billing" component={DriverProfileBilling} />
            <Route path="/account/driver/referrals" component={DriverProfileAffiliateProgram} />
            </div>           
          </div>
        </div>
        </React.Fragment>
      )
    }
    else{
      this.props.history.push('/home');
      return null;
    }
    /*
    if(!profile.email){
      return(
        <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true}/>
      )
    }
    else{    
      if(profile.isDriver){
        return(
          <React.Fragment>
          <Header driver={true} history={this.props.history} />
          <DriverProfileNavigation />
          <div className="registrationWrapper d-flex flex-column col-12 p-0">
            <div className="d-flex contentHeight col-12 p-0">
              <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <Route path="/account/driver/trips" component={DriverProfileHistory} />
              <Route path="/account/driver/profile" component={DriverProfileBasicInformation} />
              <Route path="/account/driver/cars" component={DriverProfileCar} />
              <Route path="/account/driver/tripsSettings" component={DriverProfileTripSettingsTrip} />
              <Route path="/account/driver/tours" component={DriverProfileTripSettingsTour} />
              <Route path="/account/driver/reviews" component={DriverProfileFeedback} />
              <Route path="/account/driver/settings" component={DriverProfileSettings} />
              <Route path="/account/driver/billing" component={DriverProfileBilling} />
              <Route path="/account/driver/referrals" component={DriverProfileAffiliateProgram} />
              </div>
              
            </div>
          </div>
          </React.Fragment>
        )
      }
      else{
        this.props.history.push('/home');
        return null;
      }
    }
    */
    /*
    return (
      <React.Fragment>
      {
        profile.isDriver ? 
        <React.Fragment>
        <Header driver={true} history={this.props.history} />
        <DriverProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="d-flex contentHeight col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <Route path="/account/driver/trips" component={DriverProfileHistory} />
            <Route path="/account/driver/profile" component={DriverProfileBasicInformation} />
            <Route path="/account/driver/cars" component={DriverProfileCar} />
            <Route path="/account/driver/tripsSettings" component={DriverProfileTripSettingsTrip} />
            <Route path="/account/driver/tours" component={DriverProfileTripSettingsTour} />
            <Route path="/account/driver/reviews" component={DriverProfileFeedback} />
            <Route path="/account/driver/settings" component={DriverProfileSettings} />
            <Route path="/account/driver/billing" component={DriverProfileBilling} />
            <Route path="/account/driver/referrals" component={DriverProfileAffiliateProgram} />
              {// {{
                //0: <DriverProfileHistory />,
               // 1: <DriverProfileBasicInformation />,
               // 2: <DriverProfileCar />,
               // 3: <DriverProfileTripSettingsTrip />,
               // 4: <DriverProfileTripSettingsTour />,
               // 5: <DriverProfileFeedback />,
               // 6: <DriverProfileSettings />,
               // 7: <DriverProfileBilling />,
               // 8: <DriverProfileAffiliateProgram />,
              //}[this.props.storeState.pageRender]} 
            }
            </div>
            
          </div>
        </div>
        </React.Fragment> : <div/>
      }
      </React.Fragment>
    );*/

  }
}

const DriverProfileRegistration = connect(
  (state) => ({
    storeState: state.DriverProfileRegistrationReduser,
    globalReduser: state.GlobalReduser,
  }),
)(DriverProfileRegistrationClass);

export default DriverProfileRegistration;