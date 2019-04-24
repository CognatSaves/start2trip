import React from 'react';
import './UserProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import UserProfileNavigation from './UserProfileNavigation'
import UserProfileBasicInformation from './UserProfileBasicInformation'
import UserProfileSettings from './UserProfileSettings'
import UserProfileTrevelHistory from './UserProfileTrevelHistory'
import people1 from './img/001372a9a88e12c88b532a.jpg'
import people2 from './img/person.jpg'
import people3 from './img/mina.jpg'
import people4 from './img/gruzinskaja-kuhnja.jpg'



class UserProfileRegistrationClass extends React.Component {
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
        <UserProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="contentHeight d-flex col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12">
              
              {{
                0: <UserProfileBasicInformation />,
                1: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                2: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                3: <UserProfileSettings />,
              }[this.props.storeState.pageRender]}
            </div>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const UserProfileRegistration = connect(
  (state) => ({
    storeState: state.DriverProfileRegistrationtReduser,
  }),
)(UserProfileRegistrationClass);

export default UserProfileRegistration;