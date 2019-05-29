import React from 'react';
import './UserProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import UserProfileNavigation from './UserProfileNavigation'
import UserProfileBasicInformation from './UserProfileBasicInformation'
import UserProfileSettings from './UserProfileSettings'
import UserProfileHistory from './UserProfileHistory'
import UserProfileBilling from './UserProfileBilling';
import UserProfileAffiliateProgram from './UserProfileAffiliateProgram';
import {Route} from 'react-router-dom';

import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import '../driverProfileRegistration/DriverProfileRegistration.css';
import AccountFirstEnterModal from '../home/AccountFirstEnterModal';
class UserProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    let accountEnterCookie = this.props.globalReduser.readCookie('accountFirstEnter');
    
    this.state = {
      accountEnter: accountEnterCookie ? false : true
    }
  }


  render() {
    console.log('UserProfileRegistration render');
    if(this.props.globalReduser.profile.isCustomer){
      return (
        <React.Fragment>
          {
            this.state.accountEnter ?
            <AccountFirstEnterModal/> : <React.Fragment/>
          }
          <Header driver={true} history={this.props.history}/>
          <UserProfileNavigation />
          <div className="registrationWrapper d-flex flex-column col-12 p-0">
            <div className="contentHeight d-flex col-12 p-0">
              <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <Route path="/account/user/trips" component={UserProfileHistory} />
              <Route path="/account/user/profile" component={UserProfileBasicInformation} />
              <Route path="/account/user/settings" component={UserProfileSettings} />
              <Route path="/account/user/billing" component={UserProfileBilling} />
              <Route path="/account/user/referrals" component={UserProfileAffiliateProgram} />
                {/* {{
                  0: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                  1: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                  2: <UserProfileBasicInformation />,
                  3: <UserProfileSettings />,
                }[this.props.storeState.pageRender]} */}
              </div>
              
            </div>
          </div>
        </React.Fragment>
      );
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
  }
}

const UserProfileRegistration = connect(
  (state) => ({
    storeState: state.UserProfileRegistrationReduser,
    globalReduser: state.GlobalReduser,
  }),
)(UserProfileRegistrationClass);

export default UserProfileRegistration;