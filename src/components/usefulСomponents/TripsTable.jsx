import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import Header from '../header/Header';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import requests from '../../config';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
class TripTableClass extends React.Component{
    constructor(props){
        super(props);
        let isDriverConfirmedVariants = ['Не имеет значения', 'Да', 'Нет'];
        let isCustomerConfirmedVariants = ['Не имеет значения', 'Да', 'Нет'];
        this.state = {
            isDriverConfirmedVariants: isDriverConfirmedVariants,
            isDriverConfirmed: 'Driver',
            isDriverConfirmedIndex: 0,
            isCustomerConfirmedVariants:isCustomerConfirmedVariants,
            isCustomerConfirmed: 'Customer',
            isCustomerConfirmedIndex: 0,
            value: []
        }
        let jwt = cookies.get('jwt', { path: '/' });
        let userId = cookies.get('userId', { path: "/" });
        let that = this;
        if(jwt && requests.isSuperUser(userId)){
            console.log('Call that!');
            fetch(requests.tripTableData, {
                method: 'GET', headers: { Authorization: `Bearer ${jwt}`}
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                that.setState({
                    value: data.trips
                })
            })
        }
    }
    arrayFilter = () => {
        let that = this;
        function driverConfirmationFilter(array){
            
            let driverFilter = [];
            if(that.state.isDriverConfirmedIndex === 0) {
                return array;
            }
            else{
                switch(that.state.isDriverConfirmedIndex){
                    case 1: {
                        //case true;
                        array.map((element, index)=>{
                            if(element.driverConfirmation){
                                driverFilter.push(element)
                            }
                        })
                        break;
                    }
                    case 2:{
                        array.map((element, index)=>{
                            if(!element.driverConfirmation){
                                driverFilter.push(element);
                            }
                        })
                        break;
                    }
                    default:
                        break;
                }
            }
            return driverFilter;
        }
        function customerConfirmationFilter(array){
            
            let customerFilter = [];
            if(that.state.isCustomerConfirmedIndex === 0) {
                return array;
            }
            else{
                switch(that.state.isCustomerConfirmedIndex){
                    case 1: {
                        //case true;
                        array.map((element, index)=>{
                            if(element.userConfirmation){
                                customerFilter.push(element)
                            }
                        })
                        break;
                    }
                    case 2:{
                        array.map((element, index)=>{
                            if(!element.userConfirmation){
                                customerFilter.push(element);
                            }
                        })
                        break;
                    }
                    default:
                        break;
                }
            }
            return customerFilter;
        }
        
        let filterResult = driverConfirmationFilter(customerConfirmationFilter(this.state.value));
        if(!filterResult){
            debugger;
        }
        filterResult.sort((a,b)=> {return a.startDefault<b.startDefault ? -1 : (a.startDefault===b.startDefault ? 0 : 1)})
        return filterResult;
    }
    render(){
        
        // let value = [
        //     {
        //         number: 1,
        //         date: '25.11.2019',
        //         emailCustomer: 'emailC@mail.ru',
        //         emailDriver: 'emailD@mail.ru',
        //         userConfirmation: true,
        //         driverConfirmation: true
        //     },
        //     {
        //         number: 1,
        //         date: '25.11.2019',
        //         emailCustomer: 'emailC@mail.ru',
        //         emailDriver: 'emailD@mail.ru',
        //         userConfirmation: true,
        //         driverConfirmation: true
        //     },
        //     {
        //         number: 1,
        //         date: '25.11.2019',
        //         emailCustomer: 'emailC@mail.ru',
        //         emailDriver: 'emailD@mail.ru',
        //         userConfirmation: true,
        //         driverConfirmation: true
        //     },
        //     {
        //         number: 1,
        //         date: '25.11.2019',
        //         emailCustomer: 'emailC@mail.ru',
        //         emailDriver: 'emailD@mail.ru',
        //         userConfirmation: true,
        //         driverConfirmation: true
        //     },
        //     {
        //         number: 1,
        //         date: '25.11.2019',
        //         emailCustomer: 'emailC@mail.ru',
        //         emailDriver: 'emailD@mail.ru',
        //         userConfirmation: true,
        //         driverConfirmation: true
        //     }

        // ]
        console.log(this.state.isDriverConfirmedVariants[this.state.isDriverConfirmed]);
        let resultArray = this.arrayFilter();
        return(
            <>
                <Header history={this.props.history} />
                <div style={{minHeight: '87vh'}}>
                    <div className="d-flex flex-column">
                        <div>Это таблица заказов</div>
                        <div className="d-flex flex-row">
                            <Select
                                value={this.state.isDriverConfirmed}
                                className="dropdownClass dropdownTime"
                                style={{}}
                                onChange={(event, index, value) => {
                                    
                                    let elementIndex = this.state.isDriverConfirmedVariants.indexOf(event.target.value);
                                    if(elementIndex!==-1){
                                        this.setState({ isDriverConfirmed: event.target.value, isDriverConfirmedIndex: elementIndex });
                                    }
                                    
                                }}
                            >
                                <MenuItem value={"Driver"} disabled>{"Driver"}</MenuItem>
                                {this.state.isDriverConfirmedVariants.map((element, index) =>
                                    {
                                    return <MenuItem value={element}>{element}</MenuItem> 
                                    }
                                    
                                )}
                            </Select>
                            <Select
                                value={this.state.isCustomerConfirmed}
                                className="dropdownClass dropdownTime"
                                style={{}}
                                onChange={(event, index, value) => {
                                    
                                    let elementIndex = this.state.isCustomerConfirmedVariants.indexOf(event.target.value);
                                    if(elementIndex!==-1){
                                        this.setState({ isCustomerConfirmed: event.target.value, isCustomerConfirmedIndex: elementIndex });
                                    }
                                    
                                }}
                            >
                                <MenuItem value={"Customer"} disabled>{"Customer"}</MenuItem>
                                {this.state.isCustomerConfirmedVariants.map((element, index) =>
                                    {
                                    return <MenuItem value={element}>{element}</MenuItem> 
                                    }
                                    
                                )}
                            </Select>
                        </div>
                        
                    </div>
                    <Table >
                        <TableHeader
                        >
                            <TableRow>
                                <TableHeaderColumn>Номер поездки</TableHeaderColumn>
                                <TableHeaderColumn>Дата</TableHeaderColumn>
                                <TableHeaderColumn>Почта пользователя</TableHeaderColumn>
                                <TableHeaderColumn>Почта водителя</TableHeaderColumn>
                                <TableHeaderColumn>Подтверждение пользователя</TableHeaderColumn>
                                <TableHeaderColumn>Подтверждение водителя</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            stripedRows={true}
                            displayRowCheckbox={false}
                        >
                            {
                                resultArray.map((element, index)=>{
                                    return(
                                        <TableRow>
                                            <TableRowColumn>{element.id}</TableRowColumn>
                                            <TableRowColumn>{element.startDefault}</TableRowColumn>
                                            <TableRowColumn>{element.customerEmail}</TableRowColumn>
                                            <TableRowColumn>{element.carrierEmail}</TableRowColumn>
                                            <TableRowColumn>
                                                {
                                                    <Checkbox checked={element.userConfirmation} onChange={() => {}} />
                                                }
                                            </TableRowColumn>
                                            <TableRowColumn>
                                            {
                                                <Checkbox checked={element.driverConfirmation} onChange={() => {}} />
                                            }
                                            </TableRowColumn>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>


                </div>
            </>
        )
    }
}

const TripTable = connect(
    (state) => ({
        storeState: state.AppReduser
    })
)(TripTableClass);

export default TripTable;