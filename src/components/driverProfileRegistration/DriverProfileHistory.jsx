import React from 'react';

import { connect } from 'react-redux';
import DriverProfileTrevelHistory from './DriverProfileTrevelHistory'





class DriverProfileHistoryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreHistory:true,
    }

  }


  render() {
    let textPage = this.props.AppReduser.languageText.driverProfileRegistration.DriverProfileHistory;
    return (
      <React.Fragment>
        <div className="driverProfileHistory">
          <div className="driverProfileHistoryTop d-flex">
              <div className={this.state.isPreHistory ? "d-flex align-items-center driverProfileHistoryTop-active":" d-flex align-items-center"} onClick={()=>{this.setState({isPreHistory:true})}}>
                <span>{textPage.upcoming}</span>
              </div>
              <div className={this.state.isPreHistory ? "d-flex align-items-center":"driverProfileHistoryTop-active d-flex align-items-center"} onClick={()=>{this.setState({isPreHistory:false})}}>
                <span>{textPage.story}</span>
              </div>
          </div>
          {{
            true: <DriverProfileTrevelHistory isHistory={false} trevelHistory={/*this.state.trevelHistory*/this.props.globalReduser.profile &&  this.props.globalReduser.profile.futureTrips ? this.props.globalReduser.profile.futureTrips : []} />,
            false: <DriverProfileTrevelHistory isHistory={true} trevelHistory={/*this.state.trevelHistory1*/this.props.globalReduser.profile && this.props.globalReduser.profile.historyTrips ? this.props.globalReduser.profile.historyTrips : []} />,
          }[this.state.isPreHistory]}
        </div>
      </React.Fragment>
    );
  }
}

const DriverProfileHistory = connect(
  (state) => ({
    storeState: state.DriverProfileRegistrationReduser,
    globalReduser: state.GlobalReduser,
    AppReduser: state.AppReduser,
  }),
)(DriverProfileHistoryClass);

export default DriverProfileHistory;