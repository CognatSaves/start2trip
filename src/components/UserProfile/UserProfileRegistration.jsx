import React from 'react';
import './UserProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import UserProfileNavigation from './UserProfileNavigation'
import UserProfileBasicInformation from './UserProfileBasicInformation'
import UserProfileSettings from './UserProfileSettings'




class UserProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <React.Fragment>
        <Header driver={true} />
        <UserProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="d-flex col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12">
              
              {{
                0: <UserProfileBasicInformation />,
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