import React, { Component } from 'react';
import './DriverProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import DriverProfileNavigation from './DriverProfileNavigation'

import DriverProfileCar from './DriverProfileCar'
import DriverProfileBasicInformation from './DriverProfileBasicInformation'
import DriverProfileFeedback from './DriverProfileFeedback'

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
              {/* <DriverProfileBasicInformation /> */}
              <DriverProfileCar />
              {/* <Route path="" component={} /> */}
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const DriverProfileRegistration = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
)(DriverProfileRegistrationClass);

export default DriverProfileRegistration;