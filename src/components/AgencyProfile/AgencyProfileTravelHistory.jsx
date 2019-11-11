import React from 'react';
import { connect } from 'react-redux'
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import requests from '../../config';

import Stars from '../stars/Stars';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,findCurrencyEl,createCorrectRoute} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AgencyProfileTravelHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        // };
    }

 
    stateButtonClicked = (element) => {
        let body = JSON.stringify({
            id: element.id
        });

        //console.log(requests);
        let jwt = this.props.globalReduser.readCookie('jwt');

        if (jwt && jwt !== '-') {
            let that = this;
            startRefresherGlobal(this,true)

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
                            getUserData(thenFuncGlobal, catchFuncGlobal,that);
                        }
                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        catchFuncGlobal(that);
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
                            getUserData(thenFuncGlobal, catchFuncGlobal,that);
                        }
                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        catchFuncGlobal(that);
                    });
            }
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            return null;
        }
    }

    render() {


        let textInfo = this.props.storeState.languageText.agencyProfile.agencyProfileTrevelHistory;
        let textInfoAgency = this.props.storeState.languageText.agencyProfile.agencyProfileHistory;
        let that = this;
        return (
            <div className="d-flex flex-wrap justify-content-center" style={{height: '100%'}}>

                {this.props.trevelHistory.map((element, index) =>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-11 p-2" key={element} style={{height: 'maxContent'}}>
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
                                <h5>{textInfo.tripId}</h5>
                                <span>{element.id}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement ">
                                <h5>{textInfo.drivercar}</h5>
                                <div className="historyBodyElementDriver d-flex align-items-center">
                                    <img src={requests.serverAddressImg + element.carrier.image} alt={''} />
                                    <div className="d-flex flex-column ml-1">
                                        <span>{element.carrier.firstName}</span>
                                        <Stars value={Math.ceil(element.carrier.rating*10)/10} commentNumber={element.carrier.comments + " " + textInfo.comments} valueDisplay={true} commentNumberDisplay={true} />
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
                                <h5>{textInfo.client}</h5>
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
                                <h5>{textInfo.costOfTravel}</h5>
                                <span>{this.props.globalReduser.profile.currencies ? this.props.globalReduser.profile.currencies[findCurrencyEl(that, element.currencyType)].symbol + element.price : ''}</span>
                            </div>
                            {
                                this.props.isHistory ?
                                    <>
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>{textInfo.tripStart}</h5>
                                            <span>{element.startFact ? this.props.globalReduser.createDateTimeString(element.startFact) : textInfo.notStarted}</span>
                                        </div>
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>{textInfo.tripEnd}</h5>
                                            <span>{element.endFact ? this.props.globalReduser.createDateTimeString(element.endFact) : textInfo.notEnded}</span>
                                        </div>
                                    </>
                                    : <React.Fragment />
                            }

                        </div>
                    </div>
                )}
                {
                    this.props.trevelHistory.length===0 &&
                    <div style={{margin: 'auto', paddingBottom: '7%'}}>{this.props.isHistory ? textInfoAgency.emptyHistory : textInfoAgency.emptyUpcoming}</div>
                }
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