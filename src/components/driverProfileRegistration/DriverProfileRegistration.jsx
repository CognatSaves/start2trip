import React from 'react';
import './DriverProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import DriverProfileNavigation from './DriverProfileNavigation'
import DriverProfileCar from './DriverProfileCar'
import DriverProfileBasicInformation from './DriverProfileBasicInformation'
import DriverProfileFeedback from './DriverProfileFeedback'
import DriverProfileTripSettingsTrip from './DriverProfileTripSettingsTrip'
import DriverProfileTripSettingsTour from './DriverProfileTripSettingsTour'
import DriverProfileSettings from './DriverProfileSettings'
import DriverProfileTrevelHistory from './DriverProfileTrevelHistory'

import people1 from './img/001372a9a88e12c88b532a.jpg'
import people2 from './img/person.jpg'
import people3 from './img/mina.jpg'
import people4 from './img/gruzinskaja-kuhnja.jpg'



class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trevelHistory: [
          { name: "Валера", img: people1, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", price: "$180" },
          { name: "Анжела", img: people2, route: "Минск-Мцхета-Кутаиси", date: "02.16.2019", price: "$280" },
          { name: "Гоги", img: people3, route: "Тбилиси-Мцхета-Гори", date: "02.1.2019", price: "$110" },
          { name: "Маратик", img: people4, route: "Тбилиси-Мцхета-Гори", date: "02.2.2019", price: "$80" },
      ],

  }
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
                0: <DriverProfileTrevelHistory trevelHistory={this.state.trevelHistory}/>,
                1: <DriverProfileTrevelHistory trevelHistory={this.state.trevelHistory}/>,
                2: <DriverProfileBasicInformation />,
                3: <DriverProfileCar />,
                4: <DriverProfileTripSettingsTrip />,
                5: <DriverProfileTripSettingsTour />,
                6: <DriverProfileFeedback />,
                7: <DriverProfileSettings />,
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