import React, { Component } from 'react';
import './DriverProfileTripSettingsTour.css'
import { connect } from 'react-redux';



class DriverProfileTripSettingsTourClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }



    render() {
        return (
            <React.Fragment>
                <div className="driverProfileTripSettingsContent">
                    <div className="d-flex align-items-center"></div>
                    <div className="d-flex align-items-center"></div>
                    <div className="d-flex align-items-center"></div>
                    <div className="d-flex align-items-center"></div>
                </div>
                <div className="driverProfileTripSettingsContent">
                    <div className="d-flex align-items-center"></div>
                    <div className="d-flex align-items-center"></div>
                    <div className="d-flex align-items-center"></div>
                    <div className="d-flex align-items-center"></div>
                </div>
            </React.Fragment>
        );
    }
}

const DriverProfileTripSettingsTour = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTourClass);

export default DriverProfileTripSettingsTour;