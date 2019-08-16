import React from 'react';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from '@material-ui/core/TextField';

// TODO Static data
class UserProfileBillingClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hederTitle: ["id Транзакции", "Тип оплаты", "Сумма", "Дата платежа", "ID поездки", "Маршрут", "Водитель",],
            withdrawalOfFundsModal: false,
            toPayModal: false,
            typeCardValue: "Выберите тип",
            typeCardArray: ["visa", "mastercard"],
            toPayPersonalAccountValue: true,
            toPayCardValue: false,
            bodyTable: [
                { idTransaction: "1", paymentType: "visa", sum: "$155", paymentDate: "20.03.2019", idTrip: "5", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Bob" },
                { idTransaction: "1", paymentType: "visa", sum: "$155", paymentDate: "20.03.2019", idTrip: "5", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Gibson" },
                { idTransaction: "75", paymentType: "visa", sum: "$155", paymentDate: "20.03.2019", idTrip: "56", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "dev.by" },
                { idTransaction: "5", paymentType: "visa", sum: "$95", paymentDate: "20.03.2019", idTrip: "52", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Same" }
            ],
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
        }

    };

    render() {
        let profile = this.props.globalReduser.profile;
        function findCurrencyEl(that, iso) {
            for (let i = 0; i < that.props.globalReduser.profile.currencies.length; i++) {
                if (iso === that.props.globalReduser.profile.currencies[i].ISO) {
                    return i;
                }
            }
        }
        function dateStringConversion(datestr) {
            let date = new Date(datestr);
            let day = date.getUTCDate();
            let month = date.getUTCMonth() + 1;
            let year = date.getUTCFullYear();
            let hours = date.getUTCHours();
            let minutes = date.getMinutes();
            return (day < 10 ? '0' + day : day) + "." + (month < 10 ? '0' + month : month) + "." + year + ", " + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes);
        }
        let that = this;
        console.log('DriverProfileBilling render');
        console.log(this.state);
        //let earnedTotal
        // let partnersPayings = profile ? (profile.billing.partnersProfit) : 0;
        // partnersPayings = Math.round(partnersPayings * 100);
        // partnersPayings = profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + partnersPayings / 100;

        // let accountTotal = profile ? (profile.billing.transactionCardTotal + profile.billing.partnersProfit - profile.billing.payeddriverprofit) : 0;
        // accountTotal = Math.round(accountTotal * 100);
        // accountTotal = profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + accountTotal / 100;

        // let systemPayings = profile ? (profile.payments.systemPayments) : 0;
        // systemPayings = Math.round(systemPayings * 100);
        // systemPayings = profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + systemPayings / 100;

        // let systemPayingsTotal = profile ? (profile.payments.systemPayments - profile.billing.payedsystempart) : 0;
        // systemPayingsTotal = Math.round(systemPayingsTotal * 100);
        // systemPayingsTotal = profile.currencies[findCurrencyEl(that, profile.payments.currencyType)].symbol + systemPayingsTotal / 100;
        // let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileBilling;
        let billing = this.props.globalReduser.profile.billing;
        return (
            <React.Fragment>
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
                        <span>Доступно к выводу:{/*accountTotal*/}$</span>
                    </div>
                    <form action="" className="billingModalContent">
                        <div className="d-flex align-items-center mt-1">
                            <TextField
                                label={"Сумма USD"}
                                value={this.state.summ}
                                onChange={(e) => this.setState({ summ: e.target.value })}
                                className="textField validate w-100"
                                margin="normal"
                                variant="outlined"
                            />
                            {/* <label htmlFor="withdrawalSum" className="col-3">Sum</label>
                            <input id="withdrawalSum" className="col-md-9 col-sm-9" type="text" required /> */}
                        </div>
                        <div className="d-flex align-items-center mt-1">
                            <TextField
                                label={"Номер карты"}
                                value={this.state.cardNumber}
                                onChange={(e) => this.setState({ cardNumber: e.target.value })}
                                className="textField validate w-100"
                                margin="normal"
                                variant="outlined"
                            />
                            {/* <label htmlFor="NumberCard" className="col-3">Number</label>
                            <input id="NumberCard" className="col-md-9 col-sm-9" type="text" required /> */}
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
                            <MenuItem value="Тип карты" disabled={true} primaryText="Тип карты" />
                            {this.state.typeCardArray.map((element, index) =>
                                <MenuItem value={element} primaryText={element} />
                            )}
                        </DropDownMenu>

                        <div className="billingModalFooter d-flex justify-content-end mt-2">
                            <FlatButton
                                label="Отмена"
                                primary={true}
                                onClick={() => { this.handleClose('withdrawal') }}
                            />
                            <button className="billingBtSubmit" type="submit">Вывод средств</button>
                        </div>

                    </form>
                </Dialog>
                <div className="billingBody">
                    <div className="d-flex flex-md-row flex-sm-column flex-column">
                        <div className=" col-12">
                            <div className="d-flex  flex-sm-row flex-column align-items-md-end align-items-sm-center align-items-center  justify-content-between">
                                <div className="billingText col-md-10 col-12 p-0">
                                    <div className="billingTextTitle col-12 p-0">
                                        <span>Текущий баланс (Лицевой счет № 20456787)</span>
                                    </div>
                                    <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                        <span className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0 py-2">Партнерские начисления:</span>
                                        <span>{'$'+billing.partnersProfit}</span>
                                    </div>
                                    <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                        <span className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0 py-2">Выведено всего:</span>
                                        <span>{'$'+billing.payedprofit}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span className="specialText col-xl-7 col-lg-7 col-md-8 col-sm-9 col-8 p-0 py-2">Всего на счету:</span>
                                        <span className="specialText">{'$'+(billing.partnersProfit-billing.payedprofit)}</span>
                                    </div>
                                </div>
                                <div className="billingButton d-flex justify-content-end  align-items-end">
                                    <span onClick={() => { this.handleClose('withdrawal') }}>Вывод средств</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {
                    /*
                <div className="billingBody">
                    <div className="d-flex flex-md-row flex-sm-column flex-column justify-content-between col-12 p-0">
                        <div className="d-flex flex-column">
                            <span className="blillingHeaderTitle">Операции по счету №20456787</span>
                            <div className="d-flex flex-wrap">
                                <DatePicker onChange={(nul, date) => { this.setState({ tableStartDate: date }); }} floatingspanText="Дата начала" className="billingCalendar" value={this.state.tableStartDate} />
                                <span className="align-md-self-end align-self-center mx-md-2 mx-0 mt-2">&#175;</span>
                                <DatePicker onChange={(nul, date) => { this.setState({ tableEndDate: date }); }} floatingspanText="Дата конца" className="billingCalendar" value={this.state.tableEndDate} />

                            </div>
                            <div className="billingButton mx-md-0 mx-auto my-md-0 my-2" onClick={() => this.getTransactionTable()}>
                                <span style={{ color: "#fff" }}>Показать</span>
                            </div>
                        </div>
                        <div className=" col-md-4 col-12 p-0 blillingHeader d-flex align-items-end justify-content-between">
                            <div className="col-12">
                                <div className="billingText border-bottom d-flex align-items-center justify-content-between py-2">
                                    <span className="">Оплата наличными:</span>
                                    <span>$148</span>
                                </div>
                                <div className="billingText border-bottom d-flex align-items-center justify-content-between py-2">
                                    <span className="">Оплата по картам:</span>
                                    <span>$480</span>
                                </div>
                                <div className="billingText d-flex align-items-center justify-content-between pt-2">
                                    <span className="specialText">Всего за период:</span>
                                    <span className="specialText">$708</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="billingTableBody">
                        <Table className="billingTable">
                            <TableHeader className="billingTableHeader" displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    {this.state.hederTitle.map((element, index) =>
                                        <TableHeaderColumn>{element}</TableHeaderColumn>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                className="billingTable"
                                stripedRows={true}
                                displayRowCheckbox={false}>
                                {this.state.bodyTable.map((element, index) =>
                                    <TableRow>
                                        <TableRowColumn>{element.idTransaction}</TableRowColumn>
                                        <TableRowColumn>{element.paymentType}</TableRowColumn>
                                        <TableRowColumn>{element.sum}</TableRowColumn>
                                        <TableRowColumn>{element.paymentDate}</TableRowColumn>
                                        <TableRowColumn>{element.idTrip}</TableRowColumn>
                                        <TableRowColumn>{element.route}</TableRowColumn>
                                        <TableRowColumn>{element.client}</TableRowColumn>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                    </div>
                </div>
           

                */
                }
                 </React.Fragment>
        );
    }
}


const UserProfileBilling = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(UserProfileBillingClass);

export default UserProfileBilling;