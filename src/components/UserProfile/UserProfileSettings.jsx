import React from 'react';
import { connect } from 'react-redux';

import AgencyProfileSettings from '../AgencyProfile/AgencyProfileSettings'

class UserProfileSettingsClass extends React.Component {
    render() {
        return (
            <>
                <AgencyProfileSettings textInfo={this.props.storeState.languageTextMain.userProfile.userProfileSettings} />
            </>
        )
    }
}

const UserProfileSettings = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(UserProfileSettingsClass);

export default UserProfileSettings;



