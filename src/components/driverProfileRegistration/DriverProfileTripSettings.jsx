import React, { Component } from 'react';
import './DriverProfileTripSettings.css'
import { connect } from 'react-redux';
import DriverProfileTripSettingsTrip from './DriverProfileTripSettingsTrip'
import DriverProfileTripSettingsTour from './DriverProfileTripSettingsTour'



class DriverProfileTripSettingsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationText: ["Поездки", "Туры",],
            toggleTabFlag: true,
        }
        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab() {
        this.setState({
            toggleTabFlag: !this.state.toggleTabFlag,
        })
    }

    render() {
        return (
            <div className="driverProfileTripSettingsBody">
                <div className="driverProfileTripSettingsNavigation d-flex align-items-center">
                    <div className={this.state.toggleTabFlag ? "driverProfileTripSettingsNavigationTour activTag" : "driverProfileTripSettingsNavigationTour"} onClick={() => this.toggleTab()}>
                        <p className="mb-0">{this.state.navigationText[0]}</p>
                    </div>
                    <div className={this.state.toggleTabFlag ? "driverProfileTripSettingsNavigationTour" : "driverProfileTripSettingsNavigationTour activTag"} onClick={() => this.toggleTab()}>
                        <p className="mb-0">{this.state.navigationText[1]}</p>
                    </div>
                </div>
                <div style={{ display: this.state.toggleTabFlag ? "block" : "none" }}>
                    <DriverProfileTripSettingsTrip />
                </div>
                <div style={{ display: this.state.toggleTabFlag ? "none" : "block" }}>
                    <DriverProfileTripSettingsTour />
                </div>
            </div>
        );
    }
}

const DriverProfileTripSettings = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsClass);

export default DriverProfileTripSettings;