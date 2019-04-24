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




class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <React.Fragment>
        <Header driver={true} />
        <DriverProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="d-flex contentHeight col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12">
              
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