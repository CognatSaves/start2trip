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
        
        if(this.props.match.params.userType === "2" || this.props.match.params.userType === "3"){
            if(this.state.changeTerms !== false){
                this.setState({changeTerms:false})
            }
        }
        return (
            <React.Fragment>
                <Helmet>
                    <title>{'Лицензионное соглашение'}</title>
                    <meta name="description" content="Лицензионное соглашение" />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://tripfer.com/terms" />
                    <meta property="og:title" content="Лицензионное соглашение" />
                    <meta property="og:description" content="Лицензионное соглашение сервиса tripfer.com" /> 
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