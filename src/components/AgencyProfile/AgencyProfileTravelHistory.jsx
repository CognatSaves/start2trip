import React from 'react';
import { connect } from 'react-redux'
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import requests from '../../config';

import Stars from '../stars/Stars';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';

class AgencyProfileTravelHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //TODO Static data
            isRefreshExist: false,
            isRefreshing: true,
            isGoodAnswer: true,
        };
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
            isGoodAnswer: false,
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 2000);
    }
    getProfileData = () => {
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
            }
            getUserData(requestValues, that.thenFunc, that.catchFunc);
        }
        else {

            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/login');
            //return null;
        }
    }
    stateButtonClicked = (element) => {
        let body = JSON.stringify({
            id: element.id
        });

        //console.log(requests);
        let jwt = this.props.globalReduser.readCookie('jwt');

        if (jwt && jwt !== '-') {
            let that = this;
            that.startRefresher();

            if (!(element.startFact)) {
                fetch(requests.tripStart, {
                    method: 'POST', body: body,
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
                            console.log('good');
                            console.log(data);
                            that.getProfileData();
                        }
                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        that.catchFunc();
                    });
            }
            if (element.startFact) {
                fetch(requests.tripEnd, {
                    method: 'POST', body: body,
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
                            console.log('good');
                            console.log(data);
                            that.getProfileData();
                        }
                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        that.catchFunc();
                    });
            }
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/login');
            return null;
        }
    }

    render() {
        function findCurrencyEl(that, iso) {
            for (let i = 0; i < that.props.globalReduser.profile.currencies.length; i++) {
                if (iso === that.props.globalReduser.profile.currencies[i].ISO) {
                    return i;
                }
            }
        }
        function createCorrectRoute(route, length, time) {
            let routeString = route[0].point;
            for (let i = 1; i < route.length; i++) {
                routeString += ' - ' + route[i].point;
            }
            routeString += ' (' + length + ', ' + time + ")";
            return routeString;
        }

        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileTrevelHistory;

        let that = this;
        return (
            <div className="d-flex flex-wrap justify-content-center">
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />

                {this.props.trevelHistory.map((element, index) =>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" key={element}>
                        <div className="trevelHistoryBody  d-flex flex-column">
                            <div className="d-flex flex-column historyBodyHeader">
                                <div className="d-flex justify-content-between">
                                    <span>{element.startDefault ? this.props.globalReduser.createDateTimeString(element.startDefault) : ''}</span>
                                    <span className="historyBodyHeaderType">{element.tripType.type_en}</span>
                                </div>
                                <span className="historyBodyHeaderRoute">{createCorrectRoute(element.route, element.travelLength, element.travelTime)}</span>
                                <hr />
                            </div>
                            <div className="d-flex flex-column historyBodyElement ">
                                <h5>ID поездки</h5>
                                <span>{element.id}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement ">
                                <h5>Водитель и автомобиль</h5>
                                <div className="historyBodyElementDriver d-flex align-items-center">
                                    <img src={requests.serverAddressImg + element.carrier.image} alt={''} />
                                    <div className="d-flex flex-column ml-1">
                                        <span>{element.carrier.firstName}</span>
                                        <Stars value={element.carrier.rating} commentNumber={element.carrier.comments + " отзывов"} valueDisplay={true} commentNumberDisplay={true} />
                                    </div>

                                </div>
                                {
                                    /*
                                    <span>{element.carrier.workPhone}</span>
                                    
                                    */
                                }

                                <span>{element.carrier.email}</span>
                                <div className="historyBodyElementDriver d-flex align-items-center">
                                    <img src={requests.serverAddressImg + element.car.image} alt={''} />
                                    <div className="d-flex flex-column ml-1">
                                        <span>{element.car.carBrand}</span>
                                    </div>
                                </div>
                                {
                                    /**
                                    <span>{'Количество человек: '+element.passengerNumber}</span>
                                     */
                                }

                            </div>
                            <div className="d-flex flex-column historyBodyElement ">
                                <h5>{"Клиент"}</h5>
                                <span>{element.client.firstName}</span>
                                <span>{element.client.phone}</span>
                                <span>{element.client.email}</span>
                                {
                                    /**
                                        <span>{element.passengerNumber+" чел."}</span>
                                    */
                                }

                            </div>
                            {
                                /**
                                <div className="d-flex flex-column historyBodyElement">
                                    <h5>{textPage.venue}</h5>
                                    <span>{element.startPlace}</span>
                                </div>
                                 */
                            }

                            <div className="d-flex flex-column historyBodyElement">
                                <h5>{"Стоимость поездки"}</h5>
                                <span>{this.props.globalReduser.profile.currencies ? this.props.globalReduser.profile.currencies[findCurrencyEl(that, element.currencyType)].symbol + element.price : ''}</span>
                            </div>
                            {
                                this.props.isHistory ?
                                    <React.Fragment>
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>Начало поездки</h5>
                                            <span>{element.startFact ? this.props.globalReduser.createDateTimeString(element.startFact) : 'Поездка не была начата'}</span>
                                        </div>
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>Окончание поездки</h5>
                                            <span>{element.endFact ? this.props.globalReduser.createDateTimeString(element.endFact) : 'Поездка не была закончена'}</span>
                                        </div>
                                    </React.Fragment>
                                    : <React.Fragment>
                                    </React.Fragment>
                            }

                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const AgencyProfileTravelHistory = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(AgencyProfileTravelHistoryClass);

export default AgencyProfileTravelHistory;