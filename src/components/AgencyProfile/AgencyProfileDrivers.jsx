import React from 'react';
import {connect} from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import '../driverProfileRegistration/DriverProfileBilling.css';
import people3 from '../UserProfile/img/mina.jpg'
import './AgencyProfileDrivers.css';
import requests from '../../config';
import copy from '../driverProfileRegistration/img/copy.svg';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
class AgencyProfileDriversClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            headerTable: ["Водитель", "Автомобили", "Число поездок", "Рейтинг", "Штрафные баллы", "Действия"],
            headerWidth: ["30%", "16%","12%","12%","12%","18%"],
            isRefreshExist:false,
            isRefreshing: true,
            isGoodAnswer: true
        }
        this.getProfileData = this.getProfileData.bind(this);
        this.startRefresher = this.startRefresher.bind(this);
        this.thenFunc = this.thenFunc.bind(this);
        this.catchFunc = this.catchFunc.bind(this);
    }
    copyValue = (id) =>{
        let selectedInput = document.getElementById(id);
        selectedInput.select();
        document.execCommand("copy");
    }
    getProfileData(thenFunc,catchFunc){
        console.log('getProfileData');
        let that = this;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt && jwt !== '-'){
            let requestValues = {
                readCookie: this.props.globalReduser.readCookie,
                setProfileData: function(data){
                that.props.dispatch(setProfileData(data))
                },
                requestAddress: requests.profileRequest
            };
            getUserData(requestValues,thenFunc,catchFunc);
        }
        else{
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/login');
            //return null;
        }
    }
    startRefresher(){
        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
    }   
    thenFunc(){
        console.log('thenFunc');
        this.setState({
            isRefreshExist: true,
            isRefreshing: false,
            isGoodAnswer: true,
            collapse: false
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 1000);
    }
    catchFunc(){
        console.log('catchFunc');
        this.setState({
            isRefreshExist: true,
            isRefreshing: false,
            isGoodAnswer: false
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 2000);
    }
    sendChangeDriverRequest = (driverId, type) => {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            this.startRefresher();
            let body = JSON.stringify({
                type: type,
                driverId: driverId
            });
            let that = this;
            fetch(requests.changeMyDriver,{
                method: 'PUT', body: body,
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
                    console.log("good");
                    console.log('data',data);
                    that.getProfileData(that.thenFunc,that.catchFunc);
                }
            })
            .catch(function (error) {
                console.log("bad");
                console.log('An error occurred:', error);
                that.catchFunc();
            });
        }
        else{
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/login');
            //return null;
        }
    }
    render(){
        return(
            <div className="billingBody">
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer}/>
            
                <div className="basicInformationBodyBottomHeader d-xl-block d-lg-block d-md-block d-sm-none d-none">
                    <p>Подключённые водители</p>
                </div>
                <p>Ваша ссылка на регистрацию нового водителя в автопарк</p>
                <div className="affiliateProgramButton d-flex flex-sm-row flex-column justify-content-between align-items-center">
                    <div>
                        <div className="d-flex flex-row">
                            <input id="registerDriverInput" placeholder="Регистрация людей в автопарке" style={{width: '400px'}} value={requests.frontendAddress+'/login?agency='+this.props.globalReduser.profile._id}/>
                            <div onClick = {()=>this.copyValue("registerDriverInput")} style={{background: 'url('+copy+') no-repeat center'}} className="copyElement"/>
                        </div>
                    </div>
                </div>
                <div className="billingTableBody">
                    <Table className="billingTable">
                        <TableHeader className="billingTableHeader" displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                {this.state.headerTable.map((element, index) =>
                                    <TableHeaderColumn style={{width: this.state.headerWidth[index]}}>{element}</TableHeaderColumn>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            className="billingTable"
                            stripedRows={true}
                            displayRowCheckbox={false}>
                            {this.props.globalReduser.profile.agencyWorkers.map((element, index) =>
                                <TableRow>
                                    <TableRowColumn style={{width: this.state.headerWidth[0]}}>
                                    <div className="d-flex agencyDriverImage">
                                        <img src={requests.serverAddress+element.avatar.url} alt={element.name} />
                                        <div className="d-flex flex-column ">
                                            <div>{element.firstName + " "+element.lastName}</div>
                                            <div>{element.email}</div>
                                            <div>{element.workPhone}</div>
                                        </div>
                                        
                                    </div>
                                    </TableRowColumn>
                                    <TableRowColumn style={{width: this.state.headerWidth[1]}}>
                                        <div className="d-flex flex-column">
                                            {
                                                element.cars.map((element,index)=>
                                                    <div>{element}</div>
                                                )
                                            }
                                        </div>
                                    </TableRowColumn>
                                    <TableRowColumn style={{width: this.state.headerWidth[2]}}>{element.tripsNumber}</TableRowColumn>
                                    <TableRowColumn style={{width: this.state.headerWidth[3]}}>{element.rating}</TableRowColumn>
                                    <TableRowColumn style={{width: this.state.headerWidth[4]}}>{element.penalty}</TableRowColumn>
                                    <TableRowColumn style={{width: this.state.headerWidth[5]}}>
                                        <div className="d-flex flex-column">
                                            <button className="applyButton" onClick={()=>this.sendChangeDriverRequest(element.id, 'block')}>{element.blocked ? 'Разблокировать' : 'Блокировать'}</button>
                                            <button className="applyButton" onClick={()=>this.sendChangeDriverRequest(element.id, 'remove')}>Открепить</button>
                                        </div>                            
                                    </TableRowColumn>
                                    
                                    
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                </div>
            </div>
        )
    }
}
const AgencyProfileDrivers = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileDriversClass);

export default AgencyProfileDrivers;