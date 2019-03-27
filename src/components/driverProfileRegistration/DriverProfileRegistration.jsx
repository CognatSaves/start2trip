import React, { Component } from 'react';
import './DriverProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import DriverProfileNavigation from './DriverProfileNavigation'

import DriverProfileCar from './DriverProfileCar'
import DriverProfileBasicInformation from './DriverProfileBasicInformation'
import DriverProfileFeedback from './DriverProfileFeedback'
import DriverProfileTripSettingsTrip from './DriverProfileTripSettingsTrip'
import DriverProfileTripSettingsTour from './DriverProfileTripSettingsTour'
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial'



class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <React.Fragment>

        <div className="driverProfileRegistrationWrapper d-flex flex-column col-12 p-0">
          <Header />
          <div className="d-flex col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-9">
              <DriverProfileNavigation />
              {{
                0:<DriverProfileBasicInformation />,
                1:<DriverProfileCar />,
                2:<DriverProfileTripSettingsTrip />,
                3:<DriverProfileTripSettingsTour />,
              }[this.props.storeState.pageRender]}
            </div>
            <div className="driverProfileRegistrationCommercial col-3 p-0">
            <DriversCommercial />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const DriverProfileRegistration = connect(
  (state) => ({
    storeState: state.DriverProfileRegistrationtReduser,
  }),
)(DriverProfileRegistrationClass);

export default DriverProfileRegistration;