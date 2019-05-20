import React from 'react';
import './DriverProfileAffiliateProgram.css'
import copy from './img/copy.svg';
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



class DriverProfileAffiliateProgramClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }



    render() {

        return (
            <div className="affiliateProgramBody">
                <div className="d-flex flex-column ">
                    <div className="d-flex flex-column align-items-center">
                        <h3>Партнерская программа</h3>
                        <p className="col-xl-8 col-lg-8 col-md-9 col-sm-10 col-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae impedit odio aspernatur veniam obcaecati veritatis fugit id voluptate excepturi nam aliquam architecto quam laboriosam suscipit deserunt neque, ab dolorem alias?</p>
                    </div>
                    <div className="affiliateProgramButton d-flex flex-sm-row flex-column justify-content-between align-items-center">
                        <div>
                            <div>Ваши партнёрские ссылки</div>
                            <div>
                                Ссылка на регистрацию
                            </div>
                            <div className="d-flex flex-row">
                                <input placeholder="Ссылка 1" style={{width: '400px'}} value={requests.frontendAddress+'/register/'+this.props.profileReduser.profile._id}/>
                                <div style={{background: 'url('+copy+') no-repeat center', backgroundSize: '40px 40px', width: '40px'}}/>
                            </div>
                            <div>
                                Ссылка на главную
                            </div>
                            <div className="d-flex flex-row">
                                <input placeholder="Ссылка 1" style={{width: '400px'}} value={requests.frontendAddress+'/start/'+this.props.profileReduser.profile._id}/>
                                <div style={{background: 'url('+copy+') no-repeat center', backgroundSize: '40px 40px', width: '40px'}}/>
                            </div>
                        </div>                   
                        <div className="d-flex flex-sm-row flex-column">
                        {
                            /*
                                <span>Партнерские ссылки</span>
                                <span>Пригласить друга</span>
                            */
                           <span>Промо материалы</span>
                        }
                              
                        </div>
                    </div>
                </div>
                <div>
                    <div className="affiliateProgramContent col-12">
                        <div className="affiliateProgramTitle d-flex">
                            <i className="questionicon"></i>
                            <span>Начисления никогда не заканчиваются. Чем больше у вас рефералов, и чем лучше они работают - тем больше вы получаете каждый день</span>
                        </div>
                        <div className="affiliateProgramAllEl d-flex flex-sm-row flex-column justify-content-around">
                            <div className="col-sm-4 col-12 ">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="peopleicon"></i>
                                    <span>0</span>
                                    <span>Всего рефералов</span>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="percenticon"></i>
                                    <span>14%</span>
                                    <span>С каждой оплаты</span>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12 ">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="currencyicon"></i>
                                    <span>0.00$</span>
                                    <span>Заработанно Всего</span>
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
                                    <TableHeaderColumn>EMAIL</TableHeaderColumn>
                                    <TableHeaderColumn>Дата регистрации</TableHeaderColumn>
                                    <TableHeaderColumn>Источник регистрации</TableHeaderColumn>
                                    <TableHeaderColumn>Начисления</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                className="affiliateProgramTable"
                                stripedRows={true} 
                                displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn>dssf@ff.f</TableRowColumn>
                                    <TableRowColumn>03.05.2018</TableRowColumn>
                                    <TableRowColumn>Employed</TableRowColumn>
                                    <TableRowColumn>$150</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileAffiliateProgram = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationReduser,
    }),
)(DriverProfileAffiliateProgramClass);

export default DriverProfileAffiliateProgram;