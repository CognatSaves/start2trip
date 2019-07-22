import React, {Suspense, lazy } from 'react';
import './DriverProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import DriverProfileNavigation from './DriverProfileNavigation'

// import DriverProfileCar from './DriverProfileCar'
// import DriverProfileBasicInformation from './DriverProfileBasicInformation'
// import DriverProfileFeedback from './DriverProfileFeedback'
// import DriverProfileTripSettingsTrip from './DriverProfileTripSettingsTrip'
// import DriverProfileTripSettingsTour from './DriverProfileTripSettingsTour'
// import DriverProfileSettings from './DriverProfileSettings'
// import DriverProfileHistory from './DriverProfileHistory'
// import DriverProfileBilling from './DriverProfileBilling'
// import DriverProfileAffiliateProgram from './DriverProfileAffiliateProgram'

import {Route} from 'react-router-dom';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import getUserData from './DriverProfileRequest';
import DriverRefreshIndicator from './DriverRefreshIndicator';
// import UserProfileRegistration from '../UserProfile/UserProfileRegistration';
// import AgencyProfile from '../AgencyProfile/AgencyProfile';
import {changeLanguagePart} from '../../redusers/Action';
import FirstEnterModal from '../home/FirstEnterModal';

const DriverProfileHistory = lazy(()=> import('./DriverProfileHistory'));
const DriverProfileBasicInformation = lazy(()=> import('./DriverProfileBasicInformation'));
const DriverProfileCar = lazy(()=> import('./DriverProfileCar'));
const DriverProfileTripSettingsTrip = lazy(()=> import('./DriverProfileTripSettingsTrip'));
const DriverProfileFeedback = lazy(()=> import('./DriverProfileFeedback'));
const DriverProfileSettings = lazy(()=> import('./DriverProfileSettings'));
const DriverProfileBilling = lazy(()=> import('./DriverProfileBilling'));
const DriverProfileAffiliateProgram = lazy(()=> import('./DriverProfileAffiliateProgram'));

class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    let accountEnterCookie = this.props.globalReduser.readCookie('accountFirstEnter');
    
    this.state = {
      accountEnter: accountEnterCookie ? false : true
    }
    
    props.dispatch(changeLanguagePart(true)); //эта ересь сообщает шапке, что мы в админке за водителя/агенство, т.е. нужна 2 партия языков
  }
  componentWillUnmount(){
    this.props.dispatch(changeLanguagePart(false))//эта ересь сообщает шапке, что мы валим из админки водителя/агенства, т.е. нужна стандартная партия языков
  }
  render() {
    let profile = this.props.globalReduser.profile;
    let userType = this.props.globalReduser.readCookie('userType');
    let that = this;
    
    if(this.props.globalReduser.profile.isDriver){
      return(
        <React.Fragment>
        {
          this.state.accountEnter ?
          <FirstEnterModal whatRender="driver"/> : <React.Fragment/>
        }
        <Header driver={true} history={this.props.history} />
        <DriverProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="d-flex contentHeight col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <Suspense fallback={<div>Загрузка...</div>}>
            <Route path="/account/driver/trips" component={DriverProfileHistory} />
            <Route path="/account/driver/profile" component={DriverProfileBasicInformation} />
            <Route path="/account/driver/cars" component={DriverProfileCar} />
            <Route path="/account/driver/tripsSettings" component={DriverProfileTripSettingsTrip} />
            {
              /*
              <Route path="/account/driver/tours" component={DriverProfileTripSettingsTour} />
              */
            }
            
            <Route path="/account/driver/reviews" component={DriverProfileFeedback} />
            <Route path="/account/driver/settings" component={DriverProfileSettings} />
            <Route path="/account/driver/billing" component={DriverProfileBilling} />
            <Route path="/account/driver/referrals" component={DriverProfileAffiliateProgram} />
            </Suspense>
            </div>           
          </div>
        </div>
        </React.Fragment>
      )
    }
    else{
      if(this.props.globalReduser.profile.email){
        this.props.history.push('/home');
        return null;
      }
      else{
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt && jwt !== '-'){
            let that = this;
            let requestValues = {
                readCookie: this.props.globalReduser.readCookie,
                setProfileData: function(data){               
                    that.props.dispatch(setProfileData(data))
                },
                requestAddress: requests.profileRequest
                }
            getUserData(requestValues);
            return(
                <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true}/>
            ) 
        }
        else{
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/login');
            return null;
        }
      }
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