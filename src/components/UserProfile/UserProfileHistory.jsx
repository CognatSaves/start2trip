import React from 'react';
import { connect } from 'react-redux';

import UserProfileTrevelHistory from './UserProfileTrevelHistory'

class UserProfileHistoryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreHistory: true,
    }

  }

  render() {
    let textPage = this.props.AppReduser.languageTextMain.userProfile.userProfileHistory;
    return (
      <>
        <div className="driverProfileHistory" style={{height: '100%'}}>
          <div className="driverProfileHistoryTop d-flex">
            <div className={this.state.isPreHistory ? "d-flex align-items-center driverProfileHistoryTop-active" : " d-flex align-items-center"} onClick={() => { this.setState({ isPreHistory: true }) }}>
              <span>{textPage.upcoming}</span>
            </div>
            <div className={this.state.isPreHistory ? "d-flex align-items-center" : "driverProfileHistoryTop-active d-flex align-items-center"} onClick={() => { this.setState({ isPreHistory: false }) }}>
              <span>{textPage.story}</span>
            </div>
          </div>
          {{
            true: <UserProfileTrevelHistory isHistory={false} trevelHistory={/*this.state.trevelHistory*/this.props.globalReduser.profile && this.props.globalReduser.profile.futureTrips ? this.props.globalReduser.profile.futureTrips : []} />,
            false: <UserProfileTrevelHistory isHistory={true} trevelHistory={/*this.state.trevelHistory1*/this.props.globalReduser.profile && this.props.globalReduser.profile.historyTrips ? this.props.globalReduser.profile.historyTrips : []} />,
          }[this.state.isPreHistory]}
        </div>
      </>
    );
  }
}

const UserProfileHistory = connect(
  (state) => ({
    globalReduser: state.GlobalReduser,
    AppReduser: state.AppReduser
  }),
)(UserProfileHistoryClass);

export default UserProfileHistory;