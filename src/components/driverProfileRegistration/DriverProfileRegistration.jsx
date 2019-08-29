import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { connect } from 'react-redux';
import { changeLanguagePart } from '../../redusers/Action';
import requests from '../../config';
import getUserData from './DriverProfileRequest';

// import css
import './react-tel-input.css'
import './DriverProfileRegistration.css'
import './DriverProfileHistory.css'
import './DriverProfileBasicInformation.css'
import './DriverProfileCalendar.css'
import './DriverProfileCar.css'
import './DriverProfileTripSettingsTrip.css'
import './DriverProfileFeedback.css';
import './DriverProfileSettings.css'
import './DriverProfileBilling.css'
import './DriverProfileAffiliateProgram.css'
import './DriverProfileCalendar.css'
import '../startTravelForm/StartTravelForm.css';

// import css

// import FirstEnterModal from '../home/FirstEnterModal';

import Header from '../header/Header'
import DriverProfileNavigation from './DriverProfileNavigation'
import DriverRefreshIndicator from './DriverRefreshIndicator';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const DriverProfileHistory = lazy(() => import('./DriverProfileHistory'));
const DriverProfileBasicInformation = lazy(() => import('./DriverProfileBasicInformation'));
const DriverProfileCar = lazy(() => import('./DriverProfileCar'));
const DriverProfileTripSettingsTrip = lazy(() => import('./DriverProfileTripSettingsTrip'));
const DriverProfileFeedback = lazy(() => import('./DriverProfileFeedback'));
const DriverProfileSettings = lazy(() => import('./DriverProfileSettings'));
const DriverProfileBilling = lazy(() => import('./DriverProfileBilling'));
const DriverProfileAffiliateProgram = lazy(() => import('./DriverProfileAffiliateProgram'));
const FirstEnterModal = lazy(() => import('../home/FirstEnterModal'));

class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    let accountEnterCookie = this.props.globalReduser.readCookie('accountFirstEnter');

    this.state = {
      accountEnter: accountEnterCookie ? false : true
    }

    props.dispatch(changeLanguagePart(true, true)); //эта ересь сообщает шапке, что мы в админке за водителя/агенство, т.е. нужна 2 партия языков
  }
  componentWillUnmount() {
    this.props.dispatch(changeLanguagePart(false, false))//эта ересь сообщает шапке, что мы валим из админки водителя/агенства, т.е. нужна стандартная партия языков
  }
  render() {
    let profile = this.props.globalReduser.profile;
    let userType = this.props.globalReduser.readCookie('userType');
    let that = this;
    let textInfo = this.props.storeState.languageText.driverProfileRegistration.DriverProfileRegistration;
    if (this.props.globalReduser.profile.isDriver) {
      return (
        <React.Fragment>
          <Suspense fallback={<div>{textInfo.loading+'...'}</div>}>
            {
              this.state.accountEnter ?
                <FirstEnterModal whatRender="driver" /> : <React.Fragment />
            }
          </Suspense>
          <Header driver={true} history={this.props.history} />
          <DriverProfileNavigation />
          <div className="registrationWrapper d-flex flex-column col-12 p-0">
            <div className="d-flex contentHeight col-12 p-0">
              <div className="d-flex flex-column justify-content-start col-12 p-0 ">
                <Suspense fallback={<div>{textInfo.loading+'...'}</div>}>
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
    else {
      if (this.props.globalReduser.profile.email) {
        this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/');
        return null;
      }
      else {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== '-') {
          let that = this;
          let requestValues = {
            readCookie: this.props.globalReduser.readCookie,
            setProfileData: function (data) {
              that.props.dispatch(setProfileData(data))
            },
            requestAddress: requests.profileRequest
          }
          getUserData(requestValues);
          return (
            <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true} />
          )
        }
        else {
          this.props.dispatch(setUrlAddress(window.location.pathname));
          this.props.history.push('/'+ cookies.get('userLangISO', { path: "/" }) +'/login/');
          return null;
        }
      }
    }

  }
}

const DriverProfileRegistration = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalReduser: state.GlobalReduser,
  }),
)(DriverProfileRegistrationClass);

export default DriverProfileRegistration;