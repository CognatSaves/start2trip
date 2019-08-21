import React from 'react';
import { connect } from 'react-redux';

import AgencyProfileSettings from '../AgencyProfile/AgencyProfileSettings'

class UserProfileSettingsClass extends React.Component {
    render() {
        return (
            <React.Fragment>
                <AgencyProfileSettings textInfo = {this.props.storeState.languageTextMain.userProfile.userProfileSettings}/>
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



