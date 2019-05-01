import React from 'react';
import './DriverProfileAffiliateProgram.css'
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';




class DriverProfileAffiliateProgramClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }



    render() {

        return (
            <React.Fragment>
                <div className="d-flex flex-column col-12">
                    <div className="d-flex flex-column align-items-center">
                        <h3>Партнёрская программа</h3>
                        <p className="col-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae impedit odio aspernatur veniam obcaecati veritatis fugit id voluptate excepturi nam aliquam architecto quam laboriosam suscipit deserunt neque, ab dolorem alias?</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <button>Промо материалы</button>
                        </div>
                        <div>
                            <button>Партнёрские ссылки</button>
                            <button>Пригласить друга</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div></div>
                        <div>
                            <div>
                                <div>Icon</div>
                                <div></div>
                                <div>Всего рефеналов</div>
                            </div>
                            <div>
                                <div>Icon</div>
                                <div>14%</div>
                                <div>С каждой оплаты</div>
                            </div>
                            <div>
                                <div>Icon</div>
                                <div>0.00р</div>
                                <div>Заработанно Всего</div>
                            </div>
                        </div>
                    </div>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow >
                                <TableHeaderColumn>EMAIL</TableHeaderColumn>
                                <TableHeaderColumn>Дата регистрации</TableHeaderColumn>
                                <TableHeaderColumn>Источник регистрации</TableHeaderColumn>
                                <TableHeaderColumn>Начисления</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>dssf@ff.f</TableRowColumn>
                                <TableRowColumn>03.05.2018</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                                <TableRowColumn>$150</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>

                </div>
            </React.Fragment>
        );
    }
}

const DriverProfileAffiliateProgram = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileAffiliateProgramClass);

export default DriverProfileAffiliateProgram;