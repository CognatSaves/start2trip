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
                { idTransaction: "1", paymentType: "payPlay", sum: "$155", commission: "12%", paymentDate: "20.03.2019", idTrip: "5", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Bob" },
                { idTransaction: "1", paymentType: "payPlay", sum: "$155", commission: "12%", paymentDate: "20.03.2019", idTrip: "5", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Gibson" },
                { idTransaction: "75", paymentType: "payPlay", sum: "$155", commission: "12%", paymentDate: "20.03.2019", idTrip: "56", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "dev.by" },
                { idTransaction: "5", paymentType: "payPlay", sum: "$105", commission: "12%", paymentDate: "20.03.2019", idTrip: "52", route: "Кутаиси-Тбилиси-Гори-Мцхета", client: "Same" }
            ],
        };


    }



    render() {

        return (
            <React.Fragment>
                <div className="d-flex">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div>
                                <label htmlFor="">Баланс</label>
                                <span>1942</span>
                            </div>
                            <div>
                                <label htmlFor="">Наличные</label>
                                <span>560</span>
                            </div>
                            <div>
                                <label htmlFor="">Карта</label>
                                <span>360</span>
                            </div>
                            <div>
                                <label htmlFor="">Прочие начисления</label>
                                <span>120</span>
                            </div>
                        </div>
                        <div>
                            <span>Вывод средств</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <div>
                                <label htmlFor="">Комиссия</label>
                                <span>322</span>
                            </div>
                            <div>
                                <label htmlFor="">Наличные</label>
                                <span>196</span>
                            </div>
                            <div>
                                <label htmlFor="">Карта</label>
                                <span>126</span>
                            </div>
                        </div>
                        <div>
                            <span>Оплатить</span>
                        </div>
                    </div>
                </div>
                <div  className="overflow-hidden">
                    <Table style={{width:"1200px"}}>
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
            </React.Fragment>
        );
    }
}

const DriverProfileBilling = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileBillingClass);

export default DriverProfileBilling;