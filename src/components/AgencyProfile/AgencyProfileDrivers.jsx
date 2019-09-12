import React from 'react';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import requests from '../../config';

import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import RenderShareLink from '../driverProfileRegistration/RenderShareLink';

import messengerIcon from '../media/messenger.svg'
import whatsappIcon from '../media/whatsapp.svg'
import viberIcon from '../media/viber.svg'
import telegramIcon from '../media/telegram.svg'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AgencyProfileDriversClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTable: ["Водитель", "Автомобили", "Число поездок",
                "Рейтинг", "Штрафные баллы", "Действия"],//этот блок будет использоваться
            // для размера, сами значения будут браться из переводов
            headerWidth: ["30%", "16%", "12%", "12%", "12%", "18%"],
            isRefreshExist: false,
            isRefreshing: true,
            isGoodAnswer: true,
            iconsArray: [messengerIcon, whatsappIcon, viberIcon, telegramIcon, messengerIcon, whatsappIcon, viberIcon, telegramIcon, messengerIcon, whatsappIcon, viberIcon, telegramIcon],
            howMuchRender: 4,
        }

    }
    copyValue = (id) => {
        let selectedInput = document.getElementById(id);
        selectedInput.select();
        document.execCommand("copy");
    }
    getProfileData = (thenFunc, catchFunc) => {
        console.log('getProfileData');
        let that = this;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== '-') {
            let requestValues = {
                readCookie: this.props.globalReduser.readCookie,
                setProfileData: function (data) {
                    that.props.dispatch(setProfileData(data))
                },
                requestAddress: requests.profileRequest
            };
            getUserData(requestValues, thenFunc, catchFunc);
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }
    }
    startRefresher = () => {
        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
    }
    thenFunc = () => {
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
    catchFunc = () => {
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
            fetch(requests.changeMyDriver, {
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
                        console.log('data', data);
                        that.getProfileData(that.thenFunc, that.catchFunc);
                    }
                })
                .catch(function (error) {
                    console.log("bad");
                    console.log('An error occurred:', error);
                    that.catchFunc();
                });
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }
    }
    render() {
        let textInfo = this.props.storeState.languageText.agencyProfile.agencyProfileDrivers;

        let userLang = cookies.get('userLangISO', { path: '/' });
        let linkAddress = requests.frontendAddress + '/' + (userLang ? userLang : 'en') + '/login?agency=' + this.props.globalReduser.profile._id;
        return (
            <div className="billingBody">
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />

                <div className="basicInformationBodyBottomHeader d-xl-block d-lg-block d-md-block d-sm-none d-none">
                    <p>{textInfo.driversText}</p>
                </div>
                <div className="d-flex flex-lg-row flex-column col-12">
                    <RenderShareLink classNameDiv={"col-lg-5 col-12 affiliateProgramButton mx-0"}
                        idInput={"partnerMainPageLink"} valueInput={linkAddress}
                        iconsArray={this.state.iconsArray}
                        textTitle={textInfo.linkTitle}
                        buttonCopyText={textInfo.linkButton} />
                </div>
                <div className="billingTableBody">
                    <Table className="billingTable">
                        <TableHeader className="billingTableHeader" displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                {this.state.headerTable.map((element, index) =>
                                    <TableHeaderColumn style={{ width: this.state.headerWidth[index] }}>{textInfo.headerTable[index]}</TableHeaderColumn>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            className="billingTable"
                            stripedRows={true}
                            displayRowCheckbox={false}>
                            {this.props.globalReduser.profile.agencyWorkers.map((element, index) =>
                                <TableRow>
                                    <TableRowColumn style={{ width: this.state.headerWidth[0] }}>
                                        <div className="d-flex agencyDriverImage">
                                            <img src={requests.serverAddressImg + element.avatar.url} alt={element.name} />
                                            <div className="d-flex flex-column ">
                                                <div>{element.firstName + " " + element.lastName}</div>
                                                <div>{element.email}</div>
                                                <div>{element.workPhone}</div>
                                            </div>

                                        </div>
                                    </TableRowColumn>
                                    <TableRowColumn style={{ width: this.state.headerWidth[1] }}>
                                        <div className="d-flex flex-column">
                                            {
                                                element.cars.map((element, index) =>
                                                    <div>{element}</div>
                                                )
                                            }
                                        </div>
                                    </TableRowColumn>
                                    <TableRowColumn style={{ width: this.state.headerWidth[2] }}>{element.tripsNumber}</TableRowColumn>
                                    <TableRowColumn style={{ width: this.state.headerWidth[3] }}>{element.rating}</TableRowColumn>
                                    <TableRowColumn style={{ width: this.state.headerWidth[4] }}>{element.penalty}</TableRowColumn>
                                    <TableRowColumn style={{ width: this.state.headerWidth[5] }}>
                                        <div className="d-flex flex-column">
                                            <button className="applyButton" onClick={() => this.sendChangeDriverRequest(element.id, 'block')}>{element.blocked ? 'Разблокировать' : 'Блокировать'}</button>
                                            <button className="applyButton" onClick={() => this.sendChangeDriverRequest(element.id, 'remove')}>Открепить</button>
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
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileDriversClass);

export default AgencyProfileDrivers;