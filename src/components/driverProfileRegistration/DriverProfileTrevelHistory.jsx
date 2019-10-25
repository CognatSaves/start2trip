import React from 'react';
import { connect } from 'react-redux'
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { Collapse } from 'reactstrap'
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';

import Stars from '../stars/Stars';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class DriverProfileTrevelHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        let arrayCollapse = new Array(props.trevelHistory.length).fill(false)
        this.state = {

            collapse: arrayCollapse,
        };
    }
    startRefresher = () => {
        startRefresherGlobal(this,true)
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
            getUserData(requestValues, thenFuncGlobal, catchFuncGlobal,that);
        }
        else {

            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
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
                            thenFuncGlobal(that)
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
                            that.getProfileData();
                            thenFuncGlobal(that)
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
    componentDidMount(){
        //thenFuncGlobal(this)
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
        let textInfoAgency = this.props.storeState.languageText.agencyProfile.agencyProfileHistory;

        if(this.props.trevelHistory.length>0){
            
        }
        return (
            <div className="d-flex flex-wrap justify-content-md-start justify-content-center">

                {this.props.trevelHistory.map((element, index) =>
                    <div className={this.state.collapse[index] ? " openCollapse col-md-6 col-12 p-2" : "col-lg-3 col-md-4 col-sm-6 col-11 p-2 "} key={element}>
                        <div className={(Math.abs(new Date(element.startDefault) - new Date()) < 86400000) && !this.props.isHistory ? "trevelHistoryBody trevelHistoryBodyActiveDay  d-flex flex-column" : "trevelHistoryBody  d-flex flex-column"}>
                            <div className="d-flex flex-column historyBodyHeader">
                                <div className="d-flex justify-content-between">
                                    <span>{element.startDefault ? this.props.globalReduser.createDateTimeString(element.startDefault) : ''}</span>
                                    <span className="historyBodyHeaderType">{element.tripType.type_en}</span>
                                </div>
                                {
                                    !element.isCarrierConfirmed && 
                                    <div style={{color: 'red'}}>NOT CONFIRMED</div> 
                                }
                                <span className="historyBodyHeaderRoute">{createCorrectRoute(element.route, element.travelLength, element.travelTime)}</span>
                                <span className="historyBodyHeaderBtn pt-2"
                                    onClick={() => {
                                        let array = this.state.collapse;
                                        array[index] = !array[index];
                                        this.setState({ collapse: array })
                                    }}>{this.state.collapse[index] ? textPage.historyBodyHeaderBtn[0] : textPage.historyBodyHeaderBtn[1]}</span>
                            </div>
                            <Collapse isOpen={this.state.collapse[index]} className={this.state.collapse[index] ? "d-flex flex-column px-3" : ""} >
                                {
                                    this.props.isHistory &&
                                    <> <div className="d-flex">
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>{textPage.tripStart}</h5>
                                            <span>{element.startFact ? this.props.globalReduser.createDateTimeString(element.startFact) : textPage.noStart}</span>
                                        </div>
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>{textPage.tripEnd}</h5>
                                            <span>{element.endFact ? this.props.globalReduser.createDateTimeString(element.endFact) : textPage.noEnd}</span>
                                        </div>
                                    </div>

                                    </>
                                }
                                <div className="d-flex  historyBodyElement">
                                    <h5>{textPage.tripId + ":"}</h5>
                                    <span>{element.id}</span>
                                </div>
                                <div className="d-flex  historyBodyElement">
                                    <h5>{textPage.venue + ":"}</h5>
                                    <span>{element.startPlace}</span>
                                </div>
                                <div className="d-flex  historyBodyElement">
                                    <h5>{textPage.car + ":"}</h5>
                                    <span>{element.car}</span>
                                </div>
                                <div className="d-flex  historyBodyElement">
                                    <h5>{textPage.costOfTravel + ":"}</h5>
                                    <span>{this.props.globalReduser.profile.currencies ? this.props.globalReduser.profile.currencies[findCurrencyEl(that, element.currencyType)].symbol + element.price : ''}</span>
                                </div>
                                <div className="d-flex flex-column historyBodyElement">
                                    <h5>{textPage.customer + ":"}</h5>
                                    <span>{element.client.firstName}</span>
                                    <span>{element.client.phone}</span>
                                    <span>{element.client.email}</span>
                                    {/* <span>{element.passengerNumber+" чел."}</span> */}
                                </div>
                                <div className="d-flex flex-column historyBodyElement">
                                    <h5>{textPage.comment + ":"}</h5>
                                    <span>{element.commentary}</span>
                                </div>
                            </Collapse>

                            {
                                !this.props.isHistory &&
                                <>
                                    <div className={(Math.abs(new Date(element.startDefault) - new Date()) < 86400000)||element.startFact ? "d-flex flex-column historyBodyBtn" : "d-flex flex-column historyBodyBtnNotActive"}>
                                        <button onClick={() => {
                                            if (Math.abs(new Date(element.startDefault) - new Date()) < 86400000) {
                                                this.stateButtonClicked(element)
                                            }else if(element.startFact){
                                                this.stateButtonClicked(element)
                                            }
                                        }}>{element.startFact ? textPage.stateVariants[0] : textPage.stateVariants[1]}</button>
                                    </div>
                                </>
                            }

                        </div>

                    </div>
                )}
                {
                    this.props.trevelHistory.length===0 &&
                    <div style={{margin: 'auto', paddingTop: '7%'}}>{this.props.isHistory ? textInfoAgency.emptyHistory : textInfoAgency.emptyUpcoming}</div>
                }
            </div>
        );
    }
}

const DriverProfileTrevelHistory = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(DriverProfileTrevelHistoryClass);

export default DriverProfileTrevelHistory;