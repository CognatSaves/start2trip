import React from 'react';
import './DriverProfileBilling.css'
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';



class DriverProfileBillingClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hederTitle: ["id Транзакции", "Тип оплаты", "Сумма", "Коммисия", "Дата платежа", "ID поездки", "Маршрут", "Клиент",],
            bodyTable: [
                { idTransaction: "1", paymentType: "payPal", sum: "$155", commission: "12%", paymentDate: "20.03.2019", idTrip: "5", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Bob" },
                { idTransaction: "1", paymentType: "payPal", sum: "$155", commission: "12%", paymentDate: "20.03.2019", idTrip: "5", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Gibson" },
                { idTransaction: "75", paymentType: "payPal", sum: "$155", commission: "12%", paymentDate: "20.03.2019", idTrip: "56", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "dev.by" },
                { idTransaction: "5", paymentType: "payPal", sum: "$95", commission: "12%", paymentDate: "20.03.2019", idTrip: "52", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Same" }
            ],
        };


    }



    render() {

        return (
            <div className="billingBody">
                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column">
                    <div className="billingContentLeft">
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column justify-content-between">
                            <div className="billingText col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 p-0">
                                <div className="billingTextTitle col-12 p-0">
                                    <span>Текущий баланс (Лицевой счет № 20456787)</span>
                                </div>
                                <div className="border-bottom mb-2">
                                    <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Оплата Картами:</label>
                                    <span>$360</span>
                                </div>
                                <div className="specialBorder mb-2">
                                    <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Партнёрские начисления:</label>
                                    <span>$120</span>
                                </div>
                                <div>
                                    <label className="specialText col-xl-7 col-lg-7 col-md-8 col-sm-9 col-8 p-0" htmlFor="">Всего на счету:</label>
                                    <span className="specialText">$480</span>
                                </div>
                            </div>
                            <div className="billingButton d-flex justify-content-end  align-items-end">
                                <span>Вывод средств</span>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="billingText border-top d-flex justify-content-between mb-2">
                                <label className="" htmlFor="">Полученно наличными за текущий меcяц:</label>
                                <span>$480</span>
                            </div>
                            <div className="billingText border-top d-flex justify-content-between">
                                <label className="" htmlFor="">Заработанно за всё время:</label>
                                <span>$1480</span>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column justify-content-between billingContentRight">
                        <div className="billingText col-xl-7 col-lg-7 col-md-7 col-sm-8 col-8 p-0">
                            <div className="billingTextTitle col-12 p-0">
                                <span>Оплата за пользование системой</span>
                            </div>
                            <div className="border-bottom mb-2">
                                <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Коммисия с карт:</label>
                                <span>$126</span>
                            </div>
                            <div className="specialBorder mb-2">
                                <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Коммисия с наличных:</label>
                                <span>$196</span>
                            </div>
                            <div>
                                <label className="specialText col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Итого:</label>
                                <span className="specialText">$322</span>
                            </div>
                        </div>
                        <div className="billingButton d-flex justify-content-end align-items-end">
                            <span>Оплатить</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                {this.state.hederTitle.map((element, index) =>
                                    <TableRowColumn>{element}</TableRowColumn>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
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
        );
    }
}

const DriverProfileBilling = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileBillingClass);

export default DriverProfileBilling;