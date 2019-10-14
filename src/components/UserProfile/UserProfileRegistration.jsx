import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { connect } from 'react-redux';
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';

//import css
import '../driverProfileRegistration/DriverProfileRegistration.css';
import './UserProfileRegistration.css'
import '../driverProfileRegistration/DriverProfileHistory.css'
import '../driverProfileRegistration/DriverProfileBasicInformation.css'
import '../driverProfileRegistration/DriverProfileCalendar.css'
import '../driverProfileRegistration/DriverProfileSettings.css';
import './UserProfileSettings.css';
import '../driverProfileRegistration/DriverProfileBilling.css';
import '../driverProfileRegistration/DriverProfileAffiliateProgram.css';
import './UserProfileTrevelHistory.css'
//import css

import Header from '../header/Header'
import UserProfileNavigation from './UserProfileNavigation'
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';
import { changeLanguagePart } from '../../redusers/Action';

const cookies = new Cookies();

const UserProfileHistory = lazy(() => import('./UserProfileHistory'));
const UserProfileBasicInformation = lazy(() => import('./UserProfileBasicInformation'));
const UserProfileSettings = lazy(() => import('./UserProfileSettings'));
const UserProfileBilling = lazy(() => import('./UserProfileBilling'));
const UserProfileAffiliateProgram = lazy(() => import('./UserProfileAffiliateProgram'));
const FirstEnterModal = lazy(() => import('../home/FirstEnterModal'));

class UserProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    let accountEnterCookie = this.props.globalReduser.readCookie('accountFirstEnter');

    this.state = {
      accountEnter: accountEnterCookie ? false : true
    }
    props.dispatch(changeLanguagePart(false, true)); //эта ересь сообщает шапке, что мы в админке за пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
  }
  componentWillUnmount() {
    this.props.dispatch(changeLanguagePart(false, false))//эта ересь сообщает шапке, что мы валим из пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
  }

  render() {
    console.log('UserProfileRegistration render');
    let textInfo = this.props.storeState.languageTextMain.userProfile.userProfileRegistration;
    if (this.props.globalReduser.profile.isCustomer) {
      return (
        <>
          <Suspense fallback={<div>{textInfo.loading + "..."}</div>}>
            {
              this.state.accountEnter ?
                <FirstEnterModal whatRender="user" /> : <React.Fragment />
            }
          </Suspense>
          <Header driver={true} history={this.props.history} />
          <UserProfileNavigation />
          <div className="registrationWrapper d-flex flex-column col-12 p-0">
            <div className="contentHeight d-flex col-12 p-0">
              <div className="d-flex flex-column justify-content-start col-12">
                <Suspense fallback={<div>{textInfo.loading + "..."}</div>}>
                  <Route path="/account/user/trips" component={UserProfileHistory} />
                  <Route path="/account/user/profile" component={UserProfileBasicInformation} />
                  <Route path="/account/user/settings" component={UserProfileSettings} />
                  <Route path="/account/user/billing" component={UserProfileBilling} />
                  <Route path="/account/user/referrals" component={UserProfileAffiliateProgram} />
                </Suspense>
                {/* {{
                  0: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                  1: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                  2: <UserProfileBasicInformation />,
                  3: <UserProfileSettings />,
                }[this.props.storeState.pageRender]} */}
              </div>

            </div>
          </div>
        </>
      );
    }
    else {
      if (this.props.globalReduser.profile.email) {
        this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/');
        return null;
      }
      else {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== '-') {
          startRefresherGlobal(this)
          let that = this;
          let requestValues = {
            readCookie: this.props.globalReduser.readCookie,
            setProfileData: function (data) {
              that.props.dispatch(setProfileData(data))
            },
            requestAddress: requests.profileRequest
          }
          getUserData(requestValues,()=>thenFuncGlobal(that),()=>catchFuncGlobal(that));
          return (
            <></>
          )
        }
        else {
          this.props.dispatch(setUrlAddress(window.location.pathname));
          this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
          return null;
        }
      }
    }
  }
}

const UserProfileRegistration = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalReduser: state.GlobalReduser,
  }),
)(UserProfileRegistrationClass);

export default UserProfileRegistration;