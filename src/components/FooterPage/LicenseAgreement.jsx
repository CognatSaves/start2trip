import React from 'react';
import { connect } from 'react-redux';
import './LicenseAgreement.css'
import Header from '../header/Header';
import { isMobileOnly } from 'react-device-detect';
import {Helmet} from 'react-helmet';

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
                <Helmet>
                    <title>Tripfer license</title>
                    <meta name="description" content="Tripfer in header" />
                    <link rel="icon" sizes="any" type="image/svg+xml" href="favicon.svg" />
                </Helmet>
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