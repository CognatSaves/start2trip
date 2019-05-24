import React from 'react';
import { connect } from 'react-redux';
import Header from '../header/Header'
import {Route} from 'react-router-dom';
import AgencyProfileNavigation from './AgencyProfileNavigation';
import AgencyProfileBasicInformation from './AgencyProfileBasicInformation';
import AgencyProfileAffiliateProgramm from './AgencyProfileAffiliateProgramm';
import AgencyProfileHistory from './AgencyProfileHistory';
import AgencyProfileDrivers from './AgencyProfileDrivers';
import AgencyProfileSettings from './AgencyProfileSettings';
import AgencyProfileTour from './AgencyProfileTour';
import AgencyProfileFeedback from './AgencyProfileFeedback';
import AgencyProfileBilling from './AgencyProfileBilling';

import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import '../driverProfileRegistration/DriverProfileRegistration.css';
class AgencyProfileClass extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log('Здесь работает AgencyProfile!');
        if(this.props.globalReduser.profile.isAgency){
            return(
                <React.Fragment>
                <Header driver={true} history={this.props.history} />
                <AgencyProfileNavigation/>
                <div className="registrationWrapper d-flex flex-column col-12 p-0">
                    <div className="d-flex contentHeight col-12 p-0">
                        <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
        
                            <Route path="/account/agency/profile" component={AgencyProfileBasicInformation}/>
                            <Route path="/account/agency/referrals" component={AgencyProfileAffiliateProgramm}/>
                            <Route path="/account/agency/trips" component={AgencyProfileHistory}/>
                            <Route path="/account/agency/drivers" component={AgencyProfileDrivers}/>
                            <Route path="/account/agency/settings" component={AgencyProfileSettings}/>
                            <Route path="/account/agency/tours" component={AgencyProfileTour}/>
                            <Route path="/account/agency/reviews" component={AgencyProfileFeedback}/>
                            <Route path="/account/agency/billing" component={AgencyProfileBilling}/>
                
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
                    this.props.dispatch(setUrlAddress(window.location.href));
                    this.props.history.push('/login');
                    return null;
                }
            }   
        }
    }
}

const AgencyProfile = connect(
    (state) => ({
      storeState: state.DriverProfileRegistrationReduser,
      globalReduser: state.GlobalReduser,
    }),
  )(AgencyProfileClass);
  
export default AgencyProfile;