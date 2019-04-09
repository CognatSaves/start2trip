import React from 'react';
import './DriverProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import DriverProfileNavigation from './DriverProfileNavigation'
import DriverProfileCalendar from './DriverProfileCalendar'
import DriverProfileCar from './DriverProfileCar'
import DriverProfileBasicInformation from './DriverProfileBasicInformation'
import DriverProfileFeedback from './DriverProfileFeedback'
import DriverProfileTripSettingsTrip from './DriverProfileTripSettingsTrip'
import DriverProfileTripSettingsTour from './DriverProfileTripSettingsTour'
import DriverProfileSettings from './DriverProfileSettings'

import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial'



class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <React.Fragment>

        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <Header />
          <div className="d-flex col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <DriverProfileNavigation />
              {{
                0: <DriverProfileBasicInformation />,
                1: <DriverProfileCar />,
                2: <DriverProfileTripSettingsTrip />,
                3: <DriverProfileTripSettingsTour />,
                4: <DriverProfileCalendar />,
                5: <DriverProfileSettings />,
                6: <DriverProfileFeedback />,

              }[this.props.storeState.pageRender]}
            </div>
            {/* <div className="driverProfileRegistrationCommercial d-xl-block d-lg-block d-md-none d-none col-3 p-0">
            <DriversCommercial />
            </div> */}
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