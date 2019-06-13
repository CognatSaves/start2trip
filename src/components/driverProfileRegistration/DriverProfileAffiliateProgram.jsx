import React from 'react';
import './DriverProfileAffiliateProgram.css'
import copy from './img/copy.svg';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import requests from '../../config';
import messengerIcon from './img/messenger.svg'
import whatsappIcon from './img/whatsapp.svg'
import viberIcon from './img/viber.svg'
import telegramIcon from './img/telegram.svg'
import RenderShareLink from './RenderShareLink';



class DriverProfileAffiliateProgramClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconsArray: [messengerIcon, whatsappIcon, viberIcon, telegramIcon, messengerIcon, whatsappIcon, viberIcon, telegramIcon, messengerIcon, whatsappIcon, viberIcon, telegramIcon],
            howMuchRender: 4,
        };


    }
    copyValue = (id) => {
        let selectedInput = document.getElementById(id);
        selectedInput.select();
        document.execCommand("copy");
    }


    render() {
        function paymentsCalculation(partners) {
            let res = 0;

            for (let i = 0; i < partners.length; i++) {
                res = res + partners[i].payments;
            }
            res = Math.round(res * 100) / 100;
            return res;
        }
        var allPayments = paymentsCalculation(this.props.globalReduser.profile.partners);

        let textPage = this.props.globalReduser.languageText.DriverProfileAffiliateProgram;

        let iconsRenderArray = [];
        if (this.state.iconsArray.length > this.state.howMuchRender) {

            for (let i = 0; i < this.state.howMuchRender; i++) {
                if (i < this.state.howMuchRender) {
                    iconsRenderArray.push(this.state.iconsArray[i]);
                }
            }
        } else {
            iconsRenderArray = this.state.iconsArray;
        }

        return (
            <div className="affiliateProgramBody">
                <div className="d-flex flex-column ">
                    <div className="d-flex flex-column align-items-center">
                        <h3>{textPage.affiliateProgramsTitle}</h3>
                        <p className="col-lg-8 col-md-9 col-10">{textPage.affiliateProgramsDescription}</p>
                    </div>
                    <div className="affiliateProgramButton d-flex flex-sm-row flex-column justify-content-between align-items-center">
                        <div className="d-flex flex-lg-row flex-column align-items-center col-8">
                            {/* <div>{textPage.affiliateLinks.title}</div> */}
                            <RenderShareLink classNameDiv={"col-lg-6 col-12"} idInput={"partnerRegistrationLink"} valueInput={requests.frontendAddress + '/register/' + this.props.globalReduser.profile._id} iconsArray={this.state.iconsArray} textTitle={textPage.affiliateLinks.registrationLink} buttonCopyText={textPage.affiliateLinks.spanLink} />
                            <RenderShareLink classNameDiv={"col-lg-6 col-12"} idInput={"partnerMainPageLink"} valueInput={requests.frontendAddress + '/start/' + this.props.globalReduser.profile._id} iconsArray={this.state.iconsArray} textTitle={textPage.affiliateLinks.linkToHomePage} buttonCopyText={textPage.affiliateLinks.spanLink} />

                        </div>
                        <div className="d-flex justify-content-center col mb-3">
                            {
                                /*
                                    <span>Партнерские ссылки</span>
                                    <span>Пригласить друга</span>
                                */
                                <span>{textPage.promotionalMaterials}</span>
                            }

                        </div>
                    </div>
                </div>
                <div>
                    <div className="affiliateProgramContent col-12">
                        <div className="affiliateProgramTitle d-flex">
                            <i className="questionicon"></i>
                            <span>{textPage.questionicon}</span>
                        </div>
                        <div className="affiliateProgramAllEl d-flex flex-sm-row flex-column justify-content-around">
                            <div className="col-sm-4 col-12 ">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="peopleicon"></i>
                                    <span>{this.props.globalReduser.profile.partners.length}</span>
                                    <span>{textPage.peopleicon}</span>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="percenticon"></i>
                                    <span>14%</span>
                                    <span>{textPage.percenticon}</span>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12 ">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="currencyicon"></i>
                                    <span>{allPayments + '$'}</span>
                                    <span>{textPage.currencyicon}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="affiliateProgramTableBody">
                        <Table className="affiliateProgramTable">
                            <TableHeader
                                className="affiliateProgramTableHeader"
                                displaySelectAll={false}
                                adjustForCheckbox={false}>
                                <TableRow >
                                    {textPage.affiliateProgramTableHeader.map((element, index) =>
                                        <TableHeaderColumn>{element}</TableHeaderColumn>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                className="affiliateProgramTable"
                                stripedRows={true}
                                displayRowCheckbox={false}>
                                {this.props.globalReduser.profile.partners.map((element, index) => {
                                    function dateConverter(value) {
                                        let day = value.getDate();
                                        let month = value.getMonth() + 1;
                                        let year = value.getFullYear();
                                        if (day < 10) {
                                            day = '0' + day;
                                        }
                                        if (month < 10) {
                                            month = '0' + month;
                                        }
                                        return day + '.' + month + '.' + year;
                                    }
                                    function typeCreator(element) {
                                        let type = 'Not selected';
                                        if (element.isDriver) {
                                            type = 'Driver';
                                        }
                                        if (element.isCustomer) {
                                            type = 'Customer';
                                        }
                                        if (element.isAgency) {
                                            type = 'Agency';
                                        }
                                        return type;
                                    }
                                    let type = typeCreator(element);
                                    let dayString = dateConverter(new Date(element.registrationDate));
                                    return (
                                        <TableRow>
                                            <TableRowColumn>{element.email}</TableRowColumn>
                                            <TableRowColumn>{dayString}</TableRowColumn>
                                            <TableRowColumn>{type}</TableRowColumn>
                                            <TableRowColumn>{element.payments + '$'}</TableRowColumn>
                                        </TableRow>)
                                }
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileAffiliateProgram = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationReduser,
        globalReduser: state.GlobalReduser
    }),
)(DriverProfileAffiliateProgramClass);

export default DriverProfileAffiliateProgram;