import React from 'react';
import {connect} from 'react-redux';
import '../driverProfileRegistration/DriverProfileSettings.css';
import TextField from 'material-ui/TextField';
import flags from '../driverProfileRegistration/img/flags.png';
import ReactTelInput from 'react-telephone-input'
import requests from '../../config';
import { setProfileData } from "../../redusers/ActionGlobal"
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import AgencyProfileSettings from '../AgencyProfile/AgencyProfileSettings'
import './UserProfileSettings.css';

class UserProfileSettingsClass extends React.Component {
    render(){
       return(
        <React.Fragment>
            <AgencyProfileSettings/>
        </React.Fragment>
       )
    }
}

const UserProfileSettings = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(UserProfileSettingsClass);

export default UserProfileSettings;



