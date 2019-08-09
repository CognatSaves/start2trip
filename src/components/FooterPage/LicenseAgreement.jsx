import React from 'react';
import { connect } from 'react-redux';
import './LicenseAgreement.css'
import Header from '../header/Header';
import { isMobileOnly } from 'react-device-detect';


class LicenseAgreementClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }


    }

    render() {
        let text = this.props.storeState.languageTextMain.footerPage
        return (
            <React.Fragment>
                <Header driver={true} history={this.props.history} />
                <div className="wrapper">
                    <div className="LicenseAgreement d-flex" >
                       {text()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const LicenseAgreement = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(LicenseAgreementClass);
export default LicenseAgreement;