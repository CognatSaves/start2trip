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


class AgencyProfileBillingClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hederTitle: ["id Транзакции", "Тип оплаты", "Сумма", "Коммисия", "Дата платежа", "ID поездки", "Маршрут", "Клиент",],
            withdrawalOfFundsModal: false,
            toPayModal: false,
            typeCardValue: "Выберите тип",
            typeCardArray: ["visa", "mastercard"],
            toPayPersonalAccountValue: true,
            toPayCardValue: false,
            //TODO Static data - необходимо загрузить данные с сервера
            bodyTable: [
                { idTransaction: "1", paymentType: "payPal", sum: "$155", commission: "12%", paymentDate: "20.03.2019", idTrip: "5", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Bob" },
                { idTransaction: "1", paymentType: "payPal", sum: "$155", commission: "12%", paymentDate: "20.03.2019", idTrip: "5", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Gibson" },
                { idTransaction: "75", paymentType: "payPal", sum: "$155", commission: "12%", paymentDate: "20.03.2019", idTrip: "56", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "dev.by" },
                { idTransaction: "5", paymentType: "payPal", sum: "$95", commission: "12%", paymentDate: "20.03.2019", idTrip: "52", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Same" }
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
                    <form action="" className="billingModalContent">
                        <div className="d-flex align-items-center mt-1">
                            <label htmlFor="withdrawalSum" className="col-3">Sum</label>
                            <input id="withdrawalSum" className="col-md-9 col-sm-9" type="text" required />
                        </div>
                        <div className="d-flex align-items-center mt-1">
                            <label htmlFor="NumberCard" className="col-3">Number</label>
                            <input id="NumberCard" className="col-md-9 col-sm-9" type="text" required />
                        </div>
                        <div className="d-flex align-items-center mt-1">
                            <label htmlFor="typeCard" className="col-3">Type</label>
                            <DropDownMenu
                                value={this.state.typeCardValue}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                className="billingModalContentDropDown col-md-9 col-sm-9"
                                onChange={(event, index, value) => { this.handleClose('typeCard', value) }}
                                style={{ width: "100%" }}
                                autoWidth={false}
                                selectedMenuItemStyle={{ color: "#f60" }}
                            >
                                <MenuItem value="Выберите тип" disabled={true} primaryText="Выберите тип" />
                                {this.state.typeCardArray.map((element, index) =>
                                    <MenuItem value={element} primaryText={element} />
                                )}
                            </DropDownMenu>
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                            <FlatButton
                                label="Закрыть"
                                primary={true}
                                onClick={() => { this.handleClose('withdrawal') }}
                            />
                            <button className="billingBtSubmit" type="submit">Ok</button>
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
                    <form action="" className="billingModalContent">
                        <div className="d-flex align-items-center mt-1">
                            <label htmlFor="toPaySum" className="col-3">Sum</label>
                            <input id="toPaySum" className="col-md-6 col-sm-9" type="text" required />
                        </div>
                        <div className="d-flex align-items-center">
                            <input id="toPayPersonalAccount" type="radio"
                                checked={this.state.toPayPersonalAccountValue}
                                onClick={() => { this.setState({ toPayPersonalAccountValue: true, toPayCardValue: false }) }} />
                            <label htmlFor="toPayPersonalAccount" className="col-md-6 col-sm-9">С лецевого счета</label>
                        </div>
                        <div className="d-flex align-items-center">
                            <input id="toPayCard" type="radio"
                                checked={this.state.toPayCardValue}
                                onClick={() => { this.setState({ toPayPersonalAccountValue: false, toPayCardValue: true }) }} />
                            <label htmlFor="toPayCard" className="col-md-6 col-sm-9">с банковской карты</label>
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                            <FlatButton
                                label="Закрыть"
                                primary={true}
                                onClick={() => { this.handleClose('toPay') }}
                            />
                            <button className="billingBtSubmit" type="submit">Ok</button>
                        </div>

                    </form>
                </Dialog>
                <div className="billingBody">
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column">
                        <div className="billingContentLeft">
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column align-items-md-end align-items-sm-center align-items-center  justify-content-between">
                                <div className="billingText col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 p-0">
                                    <div className="billingTextTitle col-12 p-0">
                                        <span>Текущий баланс (Лицевой счет № 20456787)</span>
                                    </div>
                                    <div className="border-bottom mb-2 d-flex align-items-center justify-content-between">
                                        <span className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0 py-2">Оплачено картами:</span>
                                        <span>$360</span>
                                    </div>
                                    <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                        <span className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0 py-2">Партнерские начисления:</span>
                                        <span>$120</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span className="specialText col-xl-7 col-lg-7 col-md-8 col-sm-9 col-8 p-0 py-2">Всего на счету:</span>
                                        <span className="specialText">$480</span>
                                    </div>
                                </div>
                                <div className="billingButton d-flex justify-content-end  align-items-end">
                                    <span onClick={() => { this.handleClose('withdrawal') }}>Вывод средств</span>
                                </div>
                            </div>
                            <div className="col-8 mt-5 p-0">
                                <div className="billingText border-bottom d-flex align-items-center justify-content-between">
                                    <span className="">Заработано за все время:</span>
                                    <span>$1480</span>
                                </div>
                            </div>
                        </div>
                        <div className="billingContentRight">
                            <div className="billingTextTitle col-12 p-0">
                                <span>Оплата за пользование системой (прошлый месяц)</span>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column align-items-md-end align-items-sm-center align-items-center justify-content-between ">
                                <div className="billingText col-xl-7 col-lg-7 col-md-7 col-sm-8 col-8 p-0">
                                    <div className="border-bottom mb-2 d-flex align-items-center justify-content-between">
                                        <span className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0 py-2">Коммисия с карт:</span>
                                        <span>$126</span>
                                    </div>
                                    <div className="specialBorder mb-2 d-flex align-items-center justify-content-between">
                                        <span className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0 py-2">Коммисия с наличных:</span>
                                        <span>$196</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span className="specialText col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0 py-2">Итого:</span>
                                        <span className="specialText">$322</span>
                                    </div>
                                </div>
                                <div className="billingButton d-flex justify-content-end align-items-end">
                                    <span onClick={() => { this.handleClose('toPay') }}>Оплатить</span>
                                </div>

                            </div>
                            <div className="billingText col-12 p-0 mt-5">
                                <p>Для поддержания работоспособности сервиса с каждой поездки взимается комиссия. Для продолжения пользования системой, Вам необходимо оплатить счет до 5 числа каждого месяца.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="billingBody">
                    <div className="d-flex flex-md-row flex-sm-column flex-column justify-content-between col-12 p-0">
                        <div className="d-flex flex-column">
                            <span className="blillingHeaderTitle">Операции по счету №20456787</span>
                            <div className=" billingText d-flex flex-md-row flex-sm-column flex-column align-items-center mt-3">
                                <span className="pr-2">За период</span>
                                <div className="d-flex  ">
                                    <DatePicker floatingspanText="Дата начала" className="billingCalendar" />
                                    <span className="align-self-end mx-2">&#175;</span>
                                    <DatePicker floatingspanText="Дата конца" className="billingCalendar" />
                                </div>
                            </div>
                        </div>
                        <div className=" col-md-4 col-sm-12 col-12 p-0 blillingHeader d-flex align-items-end justify-content-between">
                            <div className="col-12">
                                <div className="billingText border-bottom d-flex align-items-center justify-content-between py-2">
                                    <span className="">Оплата наличными:</span>
                                    <span>$148</span>
                                </div>
                                <div className="billingText border-bottom d-flex align-items-center justify-content-between py-2">
                                    <span className="">Оплата по картам:</span>
                                    <span>$480</span>
                                </div>
                                <div className="billingText specialBorder d-flex align-items-center justify-content-between py-2">
                                    <span className="">Партнёрские начисления:</span>
                                    <span>$80</span>
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
                                        <TableRowColumn>{element.commission}</TableRowColumn>
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
            </React.Fragment>
        );
    }
}
const AgencyProfileBilling = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileBillingClass);

export default AgencyProfileBilling;