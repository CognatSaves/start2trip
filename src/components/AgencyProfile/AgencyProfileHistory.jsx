import React from 'react';
import { connect } from 'react-redux';

import AgencyProfileTravelHistory from './AgencyProfileTravelHistory'


class AgencyProfileHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPreHistory: true
        }
    }
    render() {
        let textInfo = this.props.storeState.languageText.agencyProfile.agencyProfileHistory;
        
        return (
            <React.Fragment>
                <div className="driverProfileHistory">
                    <div className="driverProfileHistoryTop d-flex">
                        <div className={this.state.isPreHistory ? "d-flex align-items-center driverProfileHistoryTop-active" : " d-flex align-items-center"} onClick={() => { this.setState({ isPreHistory: true }) }}>
                            <span>{textInfo.upcoming}</span>
                        </div>
                        <div className={this.state.isPreHistory ? "d-flex align-items-center" : "driverProfileHistoryTop-active d-flex align-items-center"} onClick={() => { this.setState({ isPreHistory: false }) }}>
                            <span>{textInfo.story}</span>
                        </div>
                    </div>
                    {{
                        true: <AgencyProfileTravelHistory isHistory={false} trevelHistory={this.props.globalReduser.profile && this.props.globalReduser.profile.futureTrips ? this.props.globalReduser.profile.futureTrips : []} />,
                        false: <AgencyProfileTravelHistory isHistory={true} trevelHistory={this.props.globalReduser.profile && this.props.globalReduser.profile.historyTrips ? this.props.globalReduser.profile.historyTrips : []} />,
                    }[this.state.isPreHistory]}
                </div>
            </React.Fragment>
        )
    }
}
const AgencyProfileHistory = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileHistoryClass);

export default AgencyProfileHistory;