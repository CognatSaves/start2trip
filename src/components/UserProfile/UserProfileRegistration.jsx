import React from 'react';
import './UserProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import UserProfileNavigation from './UserProfileNavigation'
import UserProfileBasicInformation from './UserProfileBasicInformation'
import UserProfileSettings from './UserProfileSettings'
import UserProfileHistory from './UserProfileHistory'
import {Route} from 'react-router-dom';



class UserProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

  }
  }


  render() {

    return (
      <React.Fragment>
        <Header driver={true} history={this.props.history}/>
        <UserProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="contentHeight d-flex col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Route path="/account/user/trips" component={UserProfileHistory} />
            <Route path="/account/user/profile" component={UserProfileBasicInformation} />
            <Route path="/account/user/settings" component={UserProfileSettings} />
              {/* {{
                0: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                1: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                2: <UserProfileBasicInformation />,
                3: <UserProfileSettings />,
              }[this.props.storeState.pageRender]} */}
            </div>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const UserProfileRegistration = connect(
  (state) => ({
    storeState: state.UserProfileRegistrationtReduser,
  }),
)(UserProfileRegistrationClass);

export default UserProfileRegistration;