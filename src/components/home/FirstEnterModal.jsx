import React from 'react';
import './FirstEnterModal.css';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';

import IconUser1 from './img/user/1_user.svg'
import IconUser2 from './img/user/2_user.svg'
import IconUser3 from './img/user/3_user.svg'
import IconUser4 from './img/user/4_user.svg'

import IconDriver1 from './img/driver/illustration_driver_1.svg'
import IconDriver2 from './img/driver/illustration_driver_2.svg'
import IconDriver3 from './img/driver/illustration_driver_3.svg'
import IconDriver4 from './img/driver/illustration_driver_4.svg'
import IconDriver5 from './img/driver/illustration_driver_5.svg'

import IconAgency1 from './img/agency/illustration_agency_1.svg'
import IconAgency2 from './img/agency/illustration_agency_2.svg'
import IconAgency3 from './img/agency/illustration_agency_3.svg'
import IconAgency4 from './img/agency/illustration_agency_4.svg'

import Dialog from 'material-ui/Dialog';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class FirstEnterModalClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputChecked: [true, false, false, false],
            openModalStart: false,
            changeBtClose: false,
            renderContent: [],
            renderContentUser: [
                { Icon: IconUser1, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentUser.user1.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentUser.user1.textP, },
                { Icon: IconUser2, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentUser.user2.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentUser.user2.textP, },
                { Icon: IconUser3, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentUser.user3.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentUser.user3.textP, },
                { Icon: IconUser4, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentUser.user4.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentUser.user4.textP, },
            ],
            renderContentDriver: [
                { Icon: IconDriver1, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver1.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver1.textP, },
                { Icon: IconDriver2, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver2.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver2.textP, },
                { Icon: IconDriver3, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver3.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver3.textP, },
                { Icon: IconDriver4, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver4.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver4.textP, },
                { Icon: IconDriver5, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver5.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentDriver.driver5.textP, },
            ],
            renderContentAgency: [
                { Icon: IconAgency1, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentAgency.agency1.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentAgency.agency1.textP, },
                { Icon: IconAgency2, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentAgency.agency2.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentAgency.agency2.textP, },
                { Icon: IconAgency3, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentAgency.agency3.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentAgency.agency3.textP, },
                { Icon: IconAgency4, textTitle: props.storeState.languageTextMain.firstEnterModal.renderContentAgency.agency4.textTitle, textP: props.storeState.languageTextMain.firstEnterModal.renderContentAgency.agency4.textP, },
            ],
            activeWindow: 0,
        }
        if (/prerendercloud/.test(window.navigator.userAgent)) {
            console.log("Chrome headless detected");
        } else {
            let firstEnter = cookies.get('firstEnter', { path: '/' });
            let accountFirstEnter = cookies.get('accountFirstEnter', { path: '/' });
            if (firstEnter === undefined || accountFirstEnter === undefined) {
                this.state.openModalStart = true;
            }
        }

    }
    ChangeinputChecked = (indexEl) => {

        console.log(this.state.activeWindow)
        let div = document.querySelector(".modalStartInformationContent");
        if (!div) {
            div = document.querySelector(".modalStartInformationContentmodal");
        }
        let widthOneWindow = div.scrollWidth / this.state.renderContent.length - 2.5;
        if (indexEl || indexEl === 0) {
            div.scrollLeft = widthOneWindow * indexEl;
        } else {
            div.scrollLeft = widthOneWindow * (this.state.activeWindow + 1);
        }

    }
    handleClose = () => {

        let date = new Date(Date.now() + 1000 * 3600 * 24 * 60 * 500);
        if (this.props.whatRender === 'user') {
            cookies.set('firstEnter', 'no', { path: '/', expires: date });
        }
        else {
            cookies.set('accountFirstEnter', 'no', { path: '/', expires: date });
        }
        this.setState({
            openModalStart: false
        });
    }

    scrollDiv = (e) => {
        
        let widthOneWindow = e.currentTarget.scrollWidth / this.state.renderContent.length - 3.5;
        let marginLeft = e.currentTarget.scrollLeft;
        let firstOn = widthOneWindow;
        let second = widthOneWindow * 2;
        let third = (widthOneWindow * 3) - 10;
        let fourth = (widthOneWindow * 4) - 10;
        if (0 <= marginLeft) {
            this.setState({ activeWindow: 0 })
        }
        if (firstOn < marginLeft && second >= marginLeft) {
            this.setState({ activeWindow: 1 })
            // e.currentTarget.scrollLeft = widthOneWindow;
        }
        if (second < marginLeft && third >= marginLeft) {
            this.setState({ activeWindow: 2 })
            // e.currentTarget.scrollLeft = widthOneWindow*2;
        }
        if (third < marginLeft && fourth >= marginLeft) {
            this.setState({ activeWindow: 3 })
            // e.currentTarget.scrollLeft = widthOneWindow*3;
        }
        if (fourth < marginLeft) {
            this.setState({ activeWindow: 4 })
            // e.currentTarget.scrollLeft = widthOneWindow*4;
        }
    }
    render() {
        debugger
        let textPage = this.props.storeState.languageTextMain
        if (this.state.renderContent == 0) {
            let whatRender;
            switch (this.props.whatRender) {
                case "user": {
                    whatRender = this.state.renderContentUser;
                    break;
                }
                case "driver": {
                    whatRender = this.state.renderContentDriver;
                }
                    break;
                case "agency": {
                    whatRender = this.state.renderContentAgency;
                }
                    break;
            }
            this.setState({ renderContent: whatRender })
        }

        return (
            <>
                {
                    this.state.openModalStart ?
                        <>

                            {isMobileOnly ?
                                <>
                                    {/* //Модалка для мобильной версии стартовая */}
                                    <div className="modalStartInformation " style={{ display: this.state.openModalStart ? "block" : "none" }} >
                                        <div className="d-flex align-items-center justify-content-end col-11 mt-3 mx-auto">
                                            <div className="modalStartInformation_logo" />
                                            <span className="modalStartInformationSkip" onClick={this.handleClose}>{textPage.home.firstEnterModal.skipButton}</span>
                                        </div>

                                        <div className="modalStartInformationContent d-flex align-items-start pt-4 col-12 " onScroll={(e) => { this.scrollDiv(e) }}>
                                            {this.state.renderContent.map((element, index) =>
                                                <div className="modalStartInformationContentText d-flex flex-column align-items-center justify-content-start px-4" >
                                                    <i className="iconImg" style={{ background: "url(" + element.Icon + ")" }} />
                                                    <span>{element.textTitle}</span>
                                                    <p>{element.textP}</p>
                                                </div>
                                            )}

                                        </div>
                                        <div className="d-flex justify-content-center buttonChenge mt-2 pt-2 mb-1">
                                            {this.state.renderContent.map((element, index) =>
                                                <span className={this.state.activeWindow == index ? "activeBtChenge" : ""} onClick={() => { this.ChangeinputChecked(index) }}></span>
                                            )}
                                        </div>
                                        <div className="modalStartInformationDivNext d-flex align-items-center justify-content-center col-11 " onClick={() => { this.state.activeWindow == this.state.renderContent.length - 1 ? this.handleClose() : this.ChangeinputChecked() }}>
                                            <span className="modalStartInformationNext">{this.state.activeWindow == this.state.renderContent.length - 1 ? textPage.renderModalRegistration.registrationUserType.buttonClose : textPage.renderModalRegistration.registrationUserType.buttonNext}</span>
                                        </div>
                                    </div>
                                </>
                                :
                                <Dialog
                                    modal={this.state.openModalStart}
                                    open={this.state.openModalStart}
                                >
                                    {/* // Модалка для мобильной версии стартовая */}
                                    <div className="col-12 " >
                                        <div className="d-flex align-items-center justify-content-end col-11 mt-3"/*  */ style={{ margin: '0 auto' }}>
                                            <div className="modalStartInformation_logo" />
                                            <span className="modalStartInformationSkip" onClick={this.handleClose}>{textPage.home.firstEnterModal.skipButton}</span>
                                        </div>

                                        <div className="modalStartInformationContentmodal d-flex align-items-center col-12 " onScroll={(e) => { this.scrollDiv(e) }}>
                                            {this.state.renderContent.map((element, index) =>
                                                <div className="modalStartInformationContentText d-flex flex-column align-items-center justify-content-start px-4" >
                                                    <i className="iconImg" style={{ background: "url(" + element.Icon + ")" }} />
                                                    <span>{element.textTitle}</span>
                                                    <p>{element.textP}</p>
                                                </div>
                                            )}

                                        </div>
                                        <div className="d-flex justify-content-center buttonChenge mt-5 mb-4">
                                            {this.state.renderContent.map((element, index) =>
                                                <span className={this.state.activeWindow == index ? "activeBtChenge" : ""} onClick={() => { this.ChangeinputChecked(index) }}></span>
                                            )}
                                        </div>
                                        <div className="modalStartInformationDivNext d-flex align-items-center justify-content-center col-6 " onClick={() => { this.state.activeWindow == this.state.renderContent.length - 1 ? this.handleClose() : this.ChangeinputChecked() }}>
                                            <span className="modalStartInformationNext">{this.state.activeWindow == this.state.renderContent.length - 1 ? textPage.renderModalRegistration.registrationUserType.buttonClose : textPage.renderModalRegistration.registrationUserType.buttonNext}</span>
                                        </div>
                                    </div>

                                </Dialog>

                            }
                        </>
                        :
                        <React.Fragment />
                }

            </>
        )
    }
}

const FirstEnterModal = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(FirstEnterModalClass);

export default FirstEnterModal;