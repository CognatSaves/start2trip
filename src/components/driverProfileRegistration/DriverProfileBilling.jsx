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
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column justify-content-between billingContentLeft">
                        <div className="billingText col-xl-7 col-lg-7 col-md-7 col-sm-8 col-8 p-0">
                            <div className="border-bottom mb-2">
                                <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Прочие начисления:</label>
                                <span> 120</span>
                            </div>
                            <div className="border-bottom  mb-2">
                                <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Наличные:</label>
                                <span> 560</span>
                            </div>
                            <div className="border-bottom  mb-2">
                                <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Карта:</label>
                                <span> 360</span>
                            </div>
                            <div>
                                <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-8 p-0" htmlFor="">Баланс:</label>
                                <span> 1942</span>
                            </div>
                        </div>
                        <div className="billingButton d-flex justify-content-end  align-items-end">
                            <span>Вывод средств</span>
                        </div>
                    </div>
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column justify-content-between billingContentRight">
                        <div className="billingText col-xl-6 col-lg-6 col-md-6 col-sm-8 col-8 p-0">
                            <div className="border-bottom mb-2">
                                <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Карта</label>
                                <span>126</span>
                            </div>
                            <div className="border-bottom mb-2">
                                <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Наличные</label>
                                <span>196</span>
                            </div>
                            <div>
                                <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Комиссия</label>
                                <span>322</span>
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