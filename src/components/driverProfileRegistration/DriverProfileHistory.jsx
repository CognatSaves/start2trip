import React from 'react';
import { connect } from 'react-redux';

import DriverProfileTrevelHistory from './DriverProfileTrevelHistory'

class DriverProfileHistoryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreHistory: true,
    }
  }

  sortArrayDays = (array, isReverse) => {
    let sortArray = array.sort((c, d) => {
      let a = new Date(c.startDefault);
      let b = new Date(d.startDefault);
      if (isReverse) {
        return a > b ? -1 : a < b ? 1 : 0;
      } else {
        return a < b ? -1 : a > b ? 1 : 0;
      }
    })
    return sortArray
  }

  render() {
    let textPage = this.props.AppReduser.languageText.driverProfileRegistration.DriverProfileHistory;
    let futureTrips;
    let historyTrips;

    if (this.props.globalReduser.profile && this.props.globalReduser.profile.futureTrips) {
      futureTrips = this.sortArrayDays(this.props.globalReduser.profile.futureTrips, false)
    }
    if (this.props.globalReduser.profile && this.props.globalReduser.profile.historyTrips) {
      historyTrips = this.sortArrayDays(this.props.globalReduser.profile.historyTrips, true);
    }

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
            true: <DriverProfileTrevelHistory isHistory={false} trevelHistory={/*this.state.trevelHistory*/this.props.globalReduser.profile && this.props.globalReduser.profile.futureTrips ? futureTrips : []} />,
            false: <DriverProfileTrevelHistory isHistory={true} trevelHistory={/*this.state.trevelHistory1*/this.props.globalReduser.profile && this.props.globalReduser.profile.historyTrips ? historyTrips : []} />,
          }[this.state.isPreHistory]}
        </div>
      </>
    );
  }
}

const DriverProfileHistory = connect(
  (state) => ({
    globalReduser: state.GlobalReduser,
    AppReduser: state.AppReduser,
  }),
)(DriverProfileHistoryClass);

export default DriverProfileHistory;