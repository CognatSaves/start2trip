import React, { Suspense,lazy } from 'react';
import { connect } from 'react-redux';
import Header from '../header/Header'
import {Route} from 'react-router-dom';
import AgencyProfileNavigation from './AgencyProfileNavigation';
// import AgencyProfileBasicInformation from './AgencyProfileBasicInformation';
// import AgencyProfileAffiliateProgramm from './AgencyProfileAffiliateProgramm';
//  import AgencyProfileHistory from './AgencyProfileHistory';
// import AgencyProfileDrivers from './AgencyProfileDrivers';
// import AgencyProfileSettings from './AgencyProfileSettings';
// import AgencyProfileTour from './AgencyProfileTour';
// import AgencyProfileFeedback from './AgencyProfileFeedback';
// import AgencyProfileBilling from './AgencyProfileBilling';

import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import {changeLanguagePart} from '../../redusers/Action';
import FirstEnterModal from '../home/FirstEnterModal';

//import css
import '../driverProfileRegistration/DriverProfileRegistration.css';
import '../driverProfileRegistration/DriverProfileBasicInformation.css';
import '../driverProfileRegistration/DriverProfileCalendar.css';
import '../driverProfileRegistration/DriverProfileAffiliateProgram.css';
import '../driverProfileRegistration/DriverProfileHistory.css';
import '../driverProfileRegistration/DriverProfileBilling.css';
import '../driverProfileRegistration/DriverProfileSettings.css';
import '../driverProfileRegistration/DriverProfileTripSettingsTour.css';
import '../driverProfileRegistration/DriverProfileFeedback.css';
import '../driverProfileRegistration/DriverProfileBilling.css';
import './AgencyProfileDrivers.css';
//import css

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const AgencyProfileBasicInformation = lazy(()=> import('./AgencyProfileBasicInformation'));
const AgencyProfileAffiliateProgramm = lazy(()=> import('./AgencyProfileAffiliateProgramm'));
const AgencyProfileHistory = lazy(()=> import('./AgencyProfileHistory'));
const AgencyProfileDrivers = lazy(()=> import('./AgencyProfileDrivers'));
const AgencyProfileSettings = lazy(()=> import('./AgencyProfileSettings'));
const AgencyProfileTour = lazy(()=> import('./AgencyProfileTour'));
const AgencyProfileFeedback = lazy(()=> import('./AgencyProfileFeedback'));
const AgencyProfileBilling = lazy(()=> import('./AgencyProfileBilling'));

class AgencyProfileClass extends React.Component{
    constructor(props){
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
    render(){
        console.log('Здесь работает AgencyProfile!');
        if(this.props.globalReduser.profile.isAgency){
            return(
                <React.Fragment>
                {
                    this.state.accountEnter ?
                    <FirstEnterModal whatRender="agency"/> : <React.Fragment/>
                }
                <Header driver={true} history={this.props.history} />
                <AgencyProfileNavigation/>
                <div className="registrationWrapper d-flex flex-column col-12 p-0">
                    <div className="d-flex contentHeight col-12 p-0">
                        <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <Route path="/account/agency/profile" component={AgencyProfileBasicInformation}/>
                            <Route path="/account/agency/referrals" component={AgencyProfileAffiliateProgramm}/>
                            <Route path="/account/agency/trips" component={AgencyProfileHistory}/>
                            <Route path="/account/agency/drivers" component={AgencyProfileDrivers}/>
                            <Route path="/account/agency/settings" component={AgencyProfileSettings}/>
                            <Route path="/account/agency/tours" component={AgencyProfileTour}/>
                            <Route path="/account/agency/reviews" component={AgencyProfileFeedback}/>
                            <Route path="/account/agency/billing" component={AgencyProfileBilling}/>
                            </Suspense>
                        </div>           
                    </div>
                </div>
                </React.Fragment>
            )
        }
        else{
            if(this.props.globalReduser.profile.email){
                this.props.history.push("/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+'/route');
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

const AgencyProfile = connect(
    (state) => ({
      storeState: state.AppReduser,
      globalReduser: state.GlobalReduser,
    }),
  )(AgencyProfileClass);
  
export default AgencyProfile;