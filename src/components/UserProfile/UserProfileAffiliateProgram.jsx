import React from 'react';
import '../driverProfileRegistration/DriverProfileAffiliateProgram.css';
import copy from '../driverProfileRegistration/img/copy.svg';
import {connect} from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import requests from '../../config';

class UserProfileAffiliateProgramClass extends React.Component {
    constructor(props){
        super(props);
        this.state ={

        };
    }
    copyValue = (id) =>{
        let selectedInput = document.getElementById(id);
        selectedInput.select();
        document.execCommand("copy");
    }


    render() {
        function paymentsCalculation(partners){
            let res = 0;
            
            for(let i=0; i<partners.length; i++){
                res = res + partners[i].payments;
            }
            res = Math.round(res*100)/100;
            return res;
        }
        var allPayments = paymentsCalculation(this.props.globalReduser.profile.partners);

        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileAffiliateProgram;
        return (
            <div className="affiliateProgramBody">
                <div className="d-flex flex-column ">
                    <div className="d-flex flex-column align-items-center">
                        <h3>{textPage.affiliateProgramsTitle}</h3>
                        <p className="col-xl-8 col-lg-8 col-md-9 col-sm-10 col-10">{textPage.affiliateProgramsDescription}</p>
                    </div>
                    <div className="affiliateProgramButton d-flex flex-sm-row flex-column justify-content-between align-items-center">
                        <div>
                            <div>{textPage.affiliateLinks.title}</div>
                            <div>
                            {textPage.affiliateLinks.registrationLink}
                            </div>
                            <div className="d-flex flex-row">
                                <input id="partnerRegistrationLink" placeholder="Ссылка 1" style={{width: '400px'}} value={requests.frontendAddress+'/register/'+this.props.globalReduser.profile._id}/>
                                <div onClick = {()=>this.copyValue("partnerRegistrationLink")} style={{background: 'url('+copy+') no-repeat center'}} className="copyElement"/>
                            </div>
                            <div>
                            {textPage.affiliateLinks.linkToHomePage}
                            </div>
                            <div className="d-flex flex-row">
                                <input id="partnerMainPageLink" placeholder="Ссылка 1" style={{width: '400px'}} value={requests.frontendAddress+'/start/'+this.props.globalReduser.profile._id}/>
                                <div onClick = {()=>this.copyValue("partnerMainPageLink")} style={{background: 'url('+copy+') no-repeat center'}} className="copyElement"/>
                            </div>
                        </div>                   
                        <div className="d-flex flex-sm-row flex-column">
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
                                    <span>{allPayments+'$'}</span>
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
                                {textPage.affiliateProgramTableHeader.map((element,index)=>
                                    <TableHeaderColumn>{element}</TableHeaderColumn>
                                )}
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                className="affiliateProgramTable"
                                stripedRows={true} 
                                displayRowCheckbox={false}>
                                {this.props.globalReduser.profile.partners.map((element, index)=>{
                                    function dateConverter(value){
                                        let day = value.getDate();
                                        let month = value.getMonth()+1;
                                        let year = value.getFullYear();
                                        if(day<10){
                                            day='0'+day;
                                        }
                                        if(month<10){
                                            month='0'+month;
                                        }
                                        return day+'.'+month+'.'+year;
                                    }
                                    function typeCreator(element){
                                        let type = 'Not selected';
                                        if(element.isDriver){
                                            type='Driver';
                                        }
                                        if(element.isCustomer){
                                            type='Customer';
                                        }
                                        if(element.isAgency){
                                            type='Agency';
                                        }
                                        return type;
                                    }
                                    let type = typeCreator(element);
                                    let dayString = dateConverter(new Date(element.registrationDate));
                                    return(
                                    <TableRow>
                                        <TableRowColumn>{element.email}</TableRowColumn>
                                        <TableRowColumn>{dayString}</TableRowColumn>
                                        <TableRowColumn>{type}</TableRowColumn>
                                        <TableRowColumn>{element.payments+'$'}</TableRowColumn>
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
const UserProfileAffiliateProgram = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationReduser,
        globalReduser: state.GlobalReduser
    }),
)(UserProfileAffiliateProgramClass);

export default UserProfileAffiliateProgram;