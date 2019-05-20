import { connect } from 'react-redux';
import React from 'react';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import { setProfileData } from "../../redusers/ActionDriverProfileRegistration"
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import {Route,Redirect} from 'react-router-dom';

import DriverProfileRegistration from '../driverProfileRegistration/DriverProfileRegistration';
import UserProfileRegistration from '../UserProfile/UserProfileRegistration';
import Home from '../home/Home';
class AccountRedirectorClass extends React.Component{
    constructor(props){
        super(props);
        
        const that = this;
        let requestValues = {
        readCookie: that.props.globalReduser.readCookie,
        setProfileData: function(data){
            that.props.dispatch(setProfileData(data))
        },
        requestAddress: requests.profileRequest
        }
        getUserData(requestValues);
    }
    render(){
        
        let profile = this.props.storeState.profile;
        if(!profile.email){
            return(
                <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true}/>
            )
        }
        else{
            let selected = false;
            if(this.props.history.location.pathname==="/account"){
                this.props.history.push('/home');
                return null; 
            }
            if(profile.isDriver){
                selected=true;
                
                console.log(this.props.history);
                
                this.props.history.push("/account/driver");
                return (
                    <React.Fragment/>
                )
            }
            if(profile.isCustomer){
                selected=true;
                console.log(this.props.history);
                //this.props.history.push('/account/user');<Route path="/" component={Home} />
                this.props.history.push("/account/user");
                return (
                    <React.Fragment/>
                )
            }


            if(!selected){
                this.props.history.push('/home');
                return (
                    <React.Fragment/>
                )
            }
        }
        //if everything is bad! If it entered here there is a problem!
        this.props.history.push('/home');
        return null;
    }
}

const AccountRedirector = connect(
    (state) => ({
        storeState: state.DriverProfileRegistrationReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AccountRedirectorClass);

export default AccountRedirector;