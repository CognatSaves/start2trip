import { connect } from 'react-redux';
import React from 'react';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import { /*Link,*/ Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import DriverProfileRegistration from '../driverProfileRegistration/DriverProfileRegistration';
import UserProfileRegistration from '../UserProfile/UserProfileRegistration';
import AgencyProfile from '../AgencyProfile/AgencyProfile';

class AccountRedirectorClass extends React.Component{
    constructor(props){
        super(props);
        
        const that = this;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt && jwt !== '-'){
            let requestValues = {
            readCookie: that.props.globalReduser.readCookie,
            setProfileData: function(data){
                that.props.dispatch(setProfileData(data))
            },
            requestAddress: requests.profileRequest
            }
            getUserData(requestValues);
        }
        else{
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/login');
            //return null;
        }
    }
    render(){
        function parseLocationPathname(pathname,profile){
            let splitedString = pathname.split('/');
            
            if(profile.isCustomer){
                address='user';
                if(splitedString[2]==='user'){
                    return true
                }
                else{
                    return false;
                }
            }
            if(profile.isDriver){
                address='driver';
                if(splitedString[2]==='driver'){
                    return true
                }
                else{
                    return false;
                }
            }
            if(profile.isAgency){
                address='agency';
                if(splitedString[2]==='agency'){
                    return true
                }
                else{
                    return false;
                }
            }
            return false;
        }
        

        let profile = this.props.globalReduser.profile;
        let pathname = this.props.history.location.pathname;
        let address;
        
        if(!profile.email){
            return(
                <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true}/>
            )
        }
        else{
            let selected = false;
            let parseLocationPathnameResult = parseLocationPathname(pathname,profile);
            
            if(parseLocationPathnameResult){
                return (
                    <React.Fragment>
                        <Route path="/account/driver" component={DriverProfileRegistration} />
                        <Route path="/account/user" component={UserProfileRegistration} />
                        <Route path="/account/agency" component={AgencyProfile}/>
                    </React.Fragment>
                )
            }
            else{
                let newPath = '/account/'+address+'/profile';
                this.props.history.push(newPath);
                return null;
            }
            
        }
        //if everything is bad! If it entered here there is a problem!
        this.props.history.push('/home');
        return null;
    }
}

const AccountRedirector = connect(
    (state) => ({
        globalReduser: state.GlobalReduser,
    }),
)(AccountRedirectorClass);

export default AccountRedirector;