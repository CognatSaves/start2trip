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
import Cookies from 'universal-cookie';
import {Helmet} from 'react-helmet';
const cookies = new Cookies();

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
                <React.Fragment>
                    <Helmet>
                        <title>{"Загрузка Вашего аккаунта на Tripfer"}</title>
                        <meta name="description" content={"Загрузка Вашего аккаунта на Tripfer"} />
                        <meta property="og:site_name" content="Tripfer" />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={document.URL} />
                        <meta property="og:title" content={"Загрузка Вашего аккаунта на Tripfer"} />
                        <meta property="og:description" content="Подтверждение поездки на сайте tripfer.com" /> 
                    </Helmet>
                
                    <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true}/>
                </React.Fragment>
            )
        }
        else{
            let selected = false;
            let parseLocationPathnameResult = parseLocationPathname(pathname,profile);
            
            if(parseLocationPathnameResult){
                return (
                    <React.Fragment>
                        <Helmet>
                            <title>{"Ваш аккаунт на Tripfer"}</title>
                            <meta name="description" content={"Ваш аккаунт на Tripfer"} />
                            <meta property="og:site_name" content="Tripfer" />
                            <meta property="og:type" content="website" />
                            <meta property="og:url" content={document.URL} /* тут надо подумать, может вообще перенксти это внутрь каждого типа *//>
                            <meta property="og:title" content={"Ваш аккаунт на Tripfer"} />
                            <meta property="og:description" content={"Ваш аккаунт на Tripfer"} /> 
                        </Helmet>

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
        this.props.history.push("/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+'/routes');
        return null;
    }
}

const AccountRedirector = connect(
    (state) => ({
        globalReduser: state.GlobalReduser,
    }),
)(AccountRedirectorClass);

export default AccountRedirector;