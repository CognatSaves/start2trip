import React from 'react';
import './DriverProfileBilling.css'
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
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
                                    <label className="col-xl-7 col-lg-7 col-md-8 col-sm-9 col-9 p-0" htmlFor="">Оплачено картами:</label>
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
                            <div className="billingText border-bottom d-flex align-items-center justify-content-between mb-2">
                                <label className="" htmlFor="">Полученно наличными за предыдущий меcяц:</label>
                                <span>$480</span>
                            </div>
                            <div className="billingText border-bottom d-flex align-items-center justify-content-between">
                                <label className="" htmlFor="">Заработанно за всё время:</label>
                                <span>$1480</span>
                            </div>
                        </div>

                    </div>
                    <div className="billingContentRight">
                        <div className="billingTextTitle col-12 p-0">
                            <span>Оплата за пользование системой (прошлый месяц)</span>
                        </div>
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column justify-content-between ">
                        <div className="billingText col-xl-7 col-lg-7 col-md-7 col-sm-8 col-8 p-0">
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
                </div>
                <div className="col-12 p-0 blillingHeader billingText d-flex align-items-center justify-content-between">
                    <span>Операции по счету №20456787</span>
                    <div className="d-flex align-items-center">
                        <span className="pr-2">За периуд</span>
                        <div className="d-flex">
                            <DatePicker floatingLabelText="Дата начала" className="calendarModal mr-2" />
                            <DatePicker floatingLabelText="Дата конца" className="calendarModal" />

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