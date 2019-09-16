import React from 'react';
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

import messengerIcon from '../media/messenger.svg'
import whatsappIcon from '../media/whatsapp.svg'
import viberIcon from '../media/viber.svg'
import telegramIcon from '../media/telegram.svg'

import RenderShareLink from '../driverProfileRegistration/RenderShareLink';

class AgencyProfileAffiliateProgrammClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconsArray: [messengerIcon, whatsappIcon, viberIcon, telegramIcon, messengerIcon, whatsappIcon, viberIcon, telegramIcon, messengerIcon, whatsappIcon, viberIcon, telegramIcon],
            howMuchRender: 4,
        }
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
        var allPayments = paymentsCalculation(this.props.globalReduser.profile.partners ? this.props.globalReduser.profile.partners : []);
        let partners = this.props.globalReduser.profile.partners ? this.props.globalReduser.profile.partners : [];
        let textInfo = this.props.storeState.languageText.agencyProfile.agencyProfileAffiliateProgramm;
        return (
            <div className="affiliateProgramBody">
                <div className="d-flex flex-column ">
                    <div className="d-flex flex-column align-items-center">
                        <h3>{textInfo.affiliateProgramsTitle}</h3>
                        <p className="col-xl-8 col-lg-8 col-md-9 col-sm-10 col-10">{textInfo.affiliateProgramsDescription}</p>
                    </div>
                    <div className="affiliateProgramButton d-flex flex-sm-row flex-column justify-content-between align-items-center">
                        {/* <div>
                            <div>Ваши партнёрские ссылки</div>
                            <div>
                                Ссылка на регистрацию
                            </div>
                            <div className="d-flex flex-row">
                                <input id="partnerRegistrationLink" placeholder="Ссылка 1" style={{width: '400px'}} value={requests.frontendAddress+'/register/'+this.props.globalReduser.profile._id}/>
                                <div onClick = {()=>this.copyValue("partnerRegistrationLink")} style={{background: 'url('+copy+') no-repeat center'}} className="copyElement"/>
                            </div>
                            <div>
                                Ссылка на главную
                            </div>
                            <div className="d-flex flex-row">
                                <input id="partnerMainPageLink" placeholder="Ссылка 1" style={{width: '400px'}} value={requests.frontendAddress+'/start/'+this.props.globalReduser.profile._id}/>
                                <div onClick = {()=>this.copyValue("partnerMainPageLink")} style={{background: 'url('+copy+') no-repeat center'}} className="copyElement"/>
                            </div>
                        </div>   */}
                        <div className="d-flex flex-lg-row flex-column align-items-center col-md-8 col-12">
                            {/* <div>{textPage.affiliateLinks.title}</div> */}
                            <RenderShareLink classNameDiv={"col-lg-6 col-12"} idInput={"partnerRegistrationLink"} valueInput={requests.frontendAddress + '/register/' + this.props.globalReduser.profile._id} iconsArray={this.state.iconsArray} textTitle={textInfo.affiliateLinks.registrationLink} buttonCopyText={textInfo.affiliateLinks.spanLink} />
                            <RenderShareLink classNameDiv={"col-lg-6 col-12"} idInput={"partnerMainPageLink"} valueInput={requests.frontendAddress + '/start/' + this.props.globalReduser.profile._id} iconsArray={this.state.iconsArray} textTitle={textInfo.affiliateLinks.linkToHomePage}  buttonCopyText={textInfo.affiliateLinks.spanLink} />
                        </div>
                        <div className="d-flex flex-sm-row flex-column">
                            {
                                /*
                                    <span>Партнерские ссылки</span>
                                    <span>Пригласить друга</span>
                                */
                                <span>{textInfo.promotionalMaterials}</span>
                            }

                        </div>
                    </div>
                </div>
                <div>
                    <div className="affiliateProgramContent col-12">
                        <div className="affiliateProgramTitle d-flex">
                            <i className="questionicon"></i>
                            <span>{textInfo.questionicon}</span>
                        </div>
                        <div className="affiliateProgramAllEl d-flex flex-sm-row flex-column justify-content-around">
                            <div className="col-sm-4 col-12 ">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="peopleicon"></i>
                                    <span>{this.props.globalReduser.profile.partners ? this.props.globalReduser.profile.partners.length : 0}</span>
                                    <span>{textInfo.peopleicon}</span>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="percenticon"></i>
                                    <span>20%</span>
                                    <span>{textInfo.percenticon}</span>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12 ">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="currencyicon"></i>
                                    <span>{allPayments + '$'}</span>
                                    <span>{textInfo.currencyicon}</span>
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
                                    <TableHeaderColumn>{textInfo.affiliateProgramTableHeader[0]}</TableHeaderColumn>
                                    <TableHeaderColumn>{textInfo.affiliateProgramTableHeader[1]}</TableHeaderColumn>
                                    <TableHeaderColumn>{textInfo.affiliateProgramTableHeader[2]}</TableHeaderColumn>
                                    <TableHeaderColumn>{textInfo.affiliateProgramTableHeader[3]}</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                className="affiliateProgramTable"
                                stripedRows={true}
                                displayRowCheckbox={false}>
                                {partners.map((element, index) => {
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
const AgencyProfileAffiliateProgramm = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileAffiliateProgrammClass);

export default AgencyProfileAffiliateProgramm;