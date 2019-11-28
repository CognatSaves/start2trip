import React from 'react';
import { connect } from 'react-redux';
import { setTransactionData, setUrlAddress } from "../../redusers/ActionGlobal"
import { isMobileOnly } from 'react-device-detect'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import requests from '../../config';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from '@material-ui/core/TextField';

import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,findCurrencyEl,dateStringConversion} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const ecommpayWindowProps = "resizable=yes, scrollbars=yes, status=yes";

class DriverProfileBillingClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: ["id Транзакции", "Тип оплаты", "Сумма", "Дата платежа", "ID поездки"],//переводы будут подключаться в месте применения, массив сохранён для соответствующей длины 
            headerWidth: ['26%', "16%", "16%", "16%", "26%"],
            withdrawalOfFundsModal: false,
            toPayModal: false,
            summ: 0,
            cardNumber: "",
            typeCardValue: "Тип карты",
            typeCardArray: ["Visa", "Mastercard", "American express"],
            toPayPersonalAccountValue: true,
            toPayCardValue: false,
            paymentValue: 0,
            tableStartDate: new Date(Date.now() - 2629800000),
            tableEndDate: new Date(),

        };


    }

    handleClose = (name, value) => {
        switch (name) {
            case 'withdrawal':
                this.setState({ withdrawalOfFundsModal: !this.state.withdrawalOfFundsModal });
                break
            case 'toPay':
                this.setState({ toPayModal: !this.state.toPayModal });
                break
            case 'typeCard':
                this.setState({ typeCardValue: value });
                break
            default: break;
        }

    };

    formSubmit = (event, value) => {
        event.preventDefault();
    }
    changePaymentValue = (value) => {
        if(isFinite(value)){
            this.setState({
                paymentValue: value
            })
        }
       
    }

    getTransactionTable = () => {

        let jwt = this.props.globalReduser.readCookie('jwt');
        let that = this;
        if (jwt && jwt !== '-') {
            let body = JSON.stringify({
                tableStartDate: this.state.tableStartDate,
                tableEndDate: this.state.tableEndDate
            });
            startRefresherGlobal(this,true)
            console.log(requests.getUserTransactions);
            fetch(requests.getUserTransactions, {
                method: 'POST', body: body,
                headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}` }
            })
                .then(response => {
                    return response.json();
                })
                .then(function (data) {

                    if (data.error) {
                        console.log("bad");
                        throw data.error;
                    }
                    else {
                        console.log('good');
                        console.log(data);
                        that.props.dispatch(setTransactionData(data));
                    }
                    thenFuncGlobal(that)
                })
                .catch(function (error) {

                    console.log("bad");
                    console.log('An error occurred:', error);
                    catchFuncGlobal(that)
                });
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            return null;
        }
        console.log(this);
    }
    systemPaymentStart = () => {
        
        let value = Number.parseFloat(this.state.paymentValue);
        if(!value || value<=0){
            alert('No valid number here');
            return;
        }
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt && jwt !== '-'){
            let body = JSON.stringify({
                paymentValue: value
            });
            fetch(requests.transactionStart, {
                method: 'POST', body: body,
                headers: {
                    'content-type': 'application/json', Authorization: `Bearer ${jwt}`
                }
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if(data.error){
                    console.log('bad');
                    throw data.error;
                }
                else{
                    //alert(data);
                    console.log(data);
                    //let newWin = window.open(data.url, '', ecommpayWindowProps);
                    window.location.replace(data.url);
                }
            })
            .catch(function (error){
                alert(error);
                console.log('An error occurred:', error);
                
            })
        }
        else{
            
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.globalReduser.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');

        }
        
    }
    render() {
        let profile = this.props.globalReduser.profile;

        let that = this;
        console.log('DriverProfileBilling render');
        console.log(this.state);
        //let earnedTotal

        let partnersPayings = 0; let accountTotal = 0; let systemPayings = 0; let systemPayingsTotal = 0;
        if (!(profile.hostagency)) {
            //если водитель прикреплён к агенству, то мы не выводим нижеперечисленные переменные -> считать их не надо
            //я также не буду их присылать с сервера
            partnersPayings = profile ? (profile.billing.partnersProfit) : 0;
            partnersPayings = Math.round(partnersPayings * 100);
            partnersPayings = profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + partnersPayings / 100;

            accountTotal = profile ? (profile.billing.transactionCardTotal + profile.billing.partnersProfit - profile.billing.payeddriverprofit) : 0;
            accountTotal = Math.round(accountTotal * 100);
            accountTotal = profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + accountTotal / 100;

            systemPayings = profile ? (profile.payments.systemPayments) : 0;
            systemPayings = Math.round(systemPayings * 100);
            systemPayings = profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + systemPayings / 100;

            systemPayingsTotal = profile ? (profile.payments.systemPayments - profile.billing.payedsystempart) : 0;
            systemPayingsTotal = Math.round(systemPayingsTotal * 100);
            systemPayingsTotal = profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + systemPayingsTotal / 100;
        }
        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileBilling;
        return (
            <>

                <Dialog
                    contentClassName='billingModal'
                    paperClassName='billingModalDiv'
                    contentStyle={{ width: isMobileOnly ? "" : "100%" }}
                    // actions={actionsWithdrawal}
                    modal={false}
                    open={this.state.withdrawalOfFundsModal}
                    onRequestClose={() => { this.handleClose('withdrawal') }}
                >
                    <div className="billingModalHeder">
                        <span>{textPage.billingModalA.header + ": " + accountTotal}</span>
                    </div>
                    <form action="" className="billingModalContent">
                        <div className="d-flex align-items-center mt-1">
                            <TextField
                                label={textPage.billingModalA.summ}
                                value={this.state.summ}
                                onChange={(e) => this.setState({ summ: e.target.value })}
                                className="textField validate w-100"
                                margin="normal"
                                variant="outlined"
                            />
                            {/* <label htmlFor="withdrawalSum" className="col-3">Sum</label>
                            <input id="withdrawalSum" className="col-md-9" type="text" required /> */}
                        </div>
                        <div className="d-flex align-items-center mt-1">
                            <TextField
                                label={textPage.billingModalA.cardNumber}
                                value={this.state.cardNumber}
                                onChange={(e) => this.setState({ cardNumber: e.target.value })}
                                className="textField validate w-100"
                                margin="normal"
                                variant="outlined"
                            />
                            {/* <label htmlFor="NumberCard" className="col-3">Number</label>
                            <input id="NumberCard" className="col-md-9" type="text" required /> */}
                        </div>

                        <DropDownMenu
                            value={this.state.typeCardValue}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                            className="billingModalContentDropDown w-100"
                            onChange={(event, index, value) => { this.handleClose('typeCard', value) }}
                            style={{ width: "100%" }}
                            autoWidth={false}
                            selectedMenuItemStyle={{ color: "#f60" }}
                        >
                            <MenuItem value={textPage.billingModalA.cardType} disabled={true}
                                primaryText={textPage.billingModalA.cardType} />
                            {this.state.typeCardArray.map((element, index) =>
                                <MenuItem value={element} primaryText={element} />
                            )}
                        </DropDownMenu>

                        <div className="billingModalFooter d-flex justify-content-end mt-2">
                            <FlatButton
                                label={textPage.billingModalA.cancel}
                                primary={true}
                                onClick={() => { this.handleClose('withdrawal') }}
                            />
                            <button className="billingBtSubmit" type="submit">{textPage.billingModalA.submit}</button>
                        </div>

                    </form>
                </Dialog>
                <Dialog
                    contentClassName='billingModal'
                    paperClassName='billingModalDiv'
                    modal={false}
                    open={this.state.toPayModal}
                    onRequestClose={() => { this.handleClose('toPay') }}
                >
                    <div className="billingModalHeder">
                        <span>{textPage.billingModalB.header + ': ' + systemPayingsTotal}</span>
                    </div>
                    <form onSubmit={this.formSubmit} className="billingModalContent">
                        <div className="d-flex align-items-center mt-1">
                            <TextField
                                label={textPage.billingModalB.summ}
                                value={this.state.paymentValue}
                                onChange={(e) => this.changePaymentValue(e.target.value)}
                                className="textField validate w-100"
                                margin="normal"
                                variant="outlined"
                            />
                            {/* <label htmlFor="toPaySum" className="col-3">Sum</label>
                            <input id="toPaySum" className="col-md-6" type="text"
                                required value={this.state.paymentValue} onChange={(e) => this.changePaymentValue(e.target.value)} /> */}
                        </div>
                        <div className="billingModalContentText d-flex align-items-center mt-1">
                            {textPage.billingModalB.description}
                        </div>
                        {
                            /*
                            <div className="d-flex align-items-center mt-1">
                            <input id="toPayPersonalAccount" type="radio"
                                checked={this.state.toPayPersonalAccountValue}
                                onClick={()=>{ this.setState({toPayPersonalAccountValue: true ,toPayCardValue: false})}} />
                            <label htmlFor="toPayPersonalAccount" className="col-md-6">С лицевого счета</label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input id="toPayCard" type="radio" 
                                    checked={this.state.toPayCardValue}
                                    onClick={()=>{this.setState({toPayPersonalAccountValue: false ,toPayCardValue: true})}} />
                                <label htmlFor="toPayCard" className="col-md-6">с банковской карты</label>
                            </div>
                            */
                        }

                        <div className="billingModalFooter d-flex justify-content-end mt-2">
                            <FlatButton
                                label={textPage.billingModalB.cancel}
                                primary={true}
                                onClick={() => { this.handleClose('toPay') }}
                            />
                            <button className="billingBtSubmit" type="submit" onClick={()=>{this.systemPaymentStart()}}>{textPage.billingModalB.submit}</button>
                        </div>

                    </form>
                </Dialog>
                {
                    !(profile.hostagency) ?
                        <div className="billingBody">
                            <div className="d-flex flex-md-row flex-column">
                                <div className="billingContentLeft">
                                    <div className="d-flex flex-md-row flex-column align-items-md-end align-items-sm-center align-items-center  justify-content-between">
                                        <div className="billingText col-md-12 col-12 p-0">
                                            <div className="billingTextTitle col-md-12 col-10 p-0 mx-auto">
                                                <span>{textPage.currentBalance.currentBalanceText + ' (' + textPage.currentBalance.personalAccount + ' №' + profile.billing.billingId + ')'}</span>
                                            </div>
                                            <div className="border-bottom mb-2 d-flex align-items-center justify-content-between">
                                                <span className="col-lg-7 col-md-8 col-9 p-0 py-2">{textPage.currentBalance.cardPayments + ':'}</span>
                                                <span>{profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + profile.billing.transactionCardTotal}</span>
                                            </div>
                                            <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                                <span className="col-lg-7 col-md-8 col-9 p-0 py-2">{textPage.currentBalance.partnerPayments + ':'}</span>
                                                <span>{partnersPayings}</span>
                                            </div>
                                            <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                                <span className="col-lg-7 col-md-8 col-9 p-0 py-2">{textPage.currentBalance.withdrawnTotal + ':'}</span>
                                                <span>{"-" + profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + profile.billing.payeddriverprofit}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="specialText col-lg-7 col-md-8 col-8 p-0 py-2">{textPage.currentBalance.accountTotal + ':'}</span>
                                                <span className="specialText">{accountTotal}</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="billingButton d-flex justify-content-center  align-items-end">
                                        <span onClick={() => { this.handleClose('withdrawal') }}>{textPage.currentBalance.fundsWithdrawal}</span>
                                    </div>
                                    <div className="col-12 mt-5 p-0">
                                        <div className="billingText border-bottom d-flex align-items-center justify-content-between">
                                            <span className="">{textPage.currentBalance.receivedByCash + ':'}</span>
                                            <span>{profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + profile.billing.transactionCashTotal}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="billingContentRight">
                                    <div className="billingTextTitle col-12 p-0">
                                        <span>{textPage.systemPayments.systemPaymentsText}</span>
                                    </div>
                                    <div className="d-flex flex-md-row flex-column align-items-md-end align-items-sm-center align-items-center justify-content-between ">
                                        <div className="billingText  col-md-12 col-12 p-0">
                                            <div className="border-bottom mb-2 d-flex align-items-center justify-content-between">
                                                <span className="col-lg-7 col-md-8 col-9 p-0 py-2">{textPage.systemPayments.cardCommission + ':'}</span>
                                                <span>$0</span>
                                            </div>
                                            <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                                <span className="col-lg-7 col-md-8 col-9 p-0 py-2">{textPage.systemPayments.cashCommission + ':'}</span>
                                                <span>{systemPayings}</span>
                                            </div>
                                            <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                                <span className="col-lg-7 col-md-8 col-9 p-0 py-2">{textPage.systemPayments.payedPart + ':'}</span>
                                                <span>{"-" + profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + profile.billing.payedsystempart}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="specialText col-lg-7 col-md-8 col-9 p-0 py-2">{textPage.systemPayments.systemPaymentsTotal + ':'}</span>
                                                <span className="specialText">{systemPayingsTotal}</span>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="billingButton d-flex justify-content-center align-items-end">
                                        <span onClick={() => { this.handleClose('toPay') }}>{textPage.systemPayments.payButtonText}</span>
                                    </div>
                                    <div className="billingText col-12 p-0 mt-5">
                                        <p>{textPage.systemPayments.systemPaymentInfo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <React.Fragment />
                }
                <div className="billingBody">
                    <div className="d-flex flex-md-row flex-column justify-content-between col-12 p-0">

                        <div className="d-flex flex-column">
                            <span className="blillingHeaderTitle">{textPage.accountOperations.accountOperationsText + ' № ' + profile.billing.billingId}</span>
                            <div className=" billingText d-flex flex-md-row flex-column align-items-center mt-3">
                                <span className="pr-2">{textPage.accountOperations.forPeriod}</span>
                                <div className="d-flex flex-wrap">
                                    <DatePicker onChange={(nul, date) => { this.setState({ tableStartDate: this.props.globalReduser.convertDateToUTC(date) }); }}
                                        floatingspanText={textPage.accountOperations.datePickerStart} className="billingCalendar" value={this.state.tableStartDate} />
                                    <span className="align-md-self-end align-self-center mx-md-2 mx-0 mt-2">&#175;</span>
                                    <DatePicker onChange={(nul, date) => { this.setState({ tableEndDate: this.props.globalReduser.convertDateToUTC(date) }); }}
                                        floatingspanText={textPage.accountOperations.datePickerEnd} className="billingCalendar" value={this.state.tableEndDate} />

                                </div>
                                <div className="billingButton mx-md-0 mx-auto my-md-0 my-2" onClick={() => this.getTransactionTable()}>
                                    <span style={{ color: "#fff" }}>{textPage.accountOperations.searchButton}</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-sm-12 col-12 p-0 blillingHeader d-flex align-items-end justify-content-between">
                            <div className="col-12">
                                <div className="billingText border-bottom d-flex align-items-center justify-content-between py-2">
                                    <span className="">{textPage.accountOperations.infoTableText.payedByCash + ':'}</span>
                                    <span>{this.props.globalReduser.profile ? '$' + this.props.globalReduser.profile.billing.transactionCashPeriod : 0}</span>
                                </div>
                                <div className="billingText border-bottom d-flex align-items-center justify-content-between py-2">
                                    <span className="">{textPage.accountOperations.infoTableText.payedByCard + ':'}</span>
                                    <span>{this.props.globalReduser.profile ? '$' + this.props.globalReduser.profile.billing.transactionCardPeriod : 0}</span>
                                </div>
                                <div className="billingText specialBorder d-flex align-items-center justify-content-between py-2">
                                    <span className="">{textPage.accountOperations.infoTableText.payedByPartners + ':'}</span>
                                    <span>{this.props.globalReduser.profile ? '$' + this.props.globalReduser.profile.billing.transactionPartnerPeriod : 0}</span>
                                </div>
                                <div className="billingText d-flex align-items-center justify-content-between pt-2">
                                    <span className="specialText">{textPage.accountOperations.infoTableText.payedForPeriod + ':'}</span>
                                    <span className="specialText">{this.props.globalReduser.profile ? '$' +
                                        (this.props.globalReduser.profile.billing.transactionPartnerPeriod +
                                            this.props.globalReduser.profile.billing.transactionCardPeriod +
                                            this.props.globalReduser.profile.billing.transactionCashPeriod) : 0}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="billingTableBody">
                        <Table className="billingTable">
                            <TableHeader className="billingTableHeader" displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    {this.state.headerTitle.map((element, index) =>
                                        <TableHeaderColumn style={{ width: this.state.headerWidth[index], textAlign: 'center' }}>{textPage.accountOperations.valueTableText[index]}</TableHeaderColumn>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                className="billingTable"
                                stripedRows={true}
                                displayRowCheckbox={false}>
                                {this.props.globalReduser.profile ? this.props.globalReduser.profile.filteredTransactions.map((element, index) =>
                                    <TableRow>
                                        <TableRowColumn style={{ width: this.state.headerWidth[0], textAlign: 'center' }}>{element.id}</TableRowColumn>
                                        <TableRowColumn style={{ width: this.state.headerWidth[1], textAlign: 'center' }}>{element.paymentType}</TableRowColumn>
                                        <TableRowColumn style={{ width: this.state.headerWidth[2], textAlign: 'center' }}>{profile.currencies[findCurrencyEl(that, element.currencyType)].symbol + element.sum}</TableRowColumn>
                                        {
                                            /**
                                            <TableRowColumn>{element.transactionComission}</TableRowColumn>
                                            */
                                        }
                                        <TableRowColumn style={{ width: this.state.headerWidth[3], textAlign: 'center' }}>{dateStringConversion(element.paymentDate)}</TableRowColumn>
                                        <TableRowColumn style={{ width: this.state.headerWidth[4], textAlign: 'center' }}>{element.tripId}</TableRowColumn>
                                        {
                                            /**
                                            <TableRowColumn>{element.route.map((city,index)=><text>{city.point+(element.route.length-1<index ? '-':'')}</text>)}</TableRowColumn>
                                            <TableRowColumn>{element.client}</TableRowColumn>
                                            */
                                        }
                                    </TableRow>
                                ) : <React.Fragment />}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </>
        );
    }
}

const DriverProfileBilling = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(DriverProfileBillingClass);

export default DriverProfileBilling;