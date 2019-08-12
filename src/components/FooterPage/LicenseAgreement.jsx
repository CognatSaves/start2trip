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
            changeTerms: true,
        }
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          });
    }

    render() {
        let textUser = this.props.storeState.languageTextMain.termsUser
        let textDriver = this.props.storeState.languageTextMain.termsDriver
        let text = this.props.storeState.languageTextMain.footerPage.LicenseAgreement
        return (
            <React.Fragment>
                <Helmet>
                    <title>{'Лицензионное соглашение'}</title>
                    <meta name="description" content="Tripfer in header" />
                </Helmet>
                <Header driver={true} history={this.props.history} />
                <div className="wrapper">
                    
                    <div className="LicenseAgreement d-flex flex-column" >
                    <div className="d-flex justify-content-end pb-4 col-12">
                        <span className={this.state.changeTerms ? "LicenseAgreementPanel-active LicenseAgreementPanel":"LicenseAgreementPanel"} onClick={() => { this.setState({ changeTerms: !this.state.changeTerms }) }}>{text.users}</span>
                        <span className={!this.state.changeTerms ? "LicenseAgreementPanel-active LicenseAgreementPanel":"LicenseAgreementPanel"} onClick={() => { this.setState({ changeTerms: !this.state.changeTerms }) }}>{text.partners}</span>
                    </div>
                        {this.state.changeTerms ? textUser() : textDriver()}
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