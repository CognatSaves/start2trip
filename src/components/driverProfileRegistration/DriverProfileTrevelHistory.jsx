import React from 'react';
import { connect } from 'react-redux'
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { Collapse } from 'reactstrap'
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';

import Stars from '../stars/Stars';
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,findCurrencyEl,createCorrectRoute } from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';
import { Checkbox } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './DriverProfileTripSettings.css';

const cookies = new Cookies();

const TravelHistoryElementInnerPart = (props) => {

    let { isHistory, textPage, /*element, */that, index } = props;

    let element = that.state.filteredTravelHistory[index];
    let isMulticustomeral = (element.union.length > 0);
    let selectedElement = isMulticustomeral ? element.union[that.state.selectedElement[index]] : element;   
    
    let filteredTravelHistory = that.state.filteredTravelHistory;

    let selectedElementIndex = that.state.selectedElement[index];
    let isStarted = false;/*filteredTravelHistory[index].union[selectedElementIndex].startFact ? true : false;*/
    let isConfirmed = false;
    let canChangeSelected = false;
    if (isMulticustomeral && !isHistory) {
        isConfirmed = filteredTravelHistory[index].union[selectedElementIndex].isCarrierConfirmed;
        //if common block is started, we can not change 'selected' value of union element
        //if common block is not started, we can change 'selected' value of union element only if it confirmed
        canChangeSelected = filteredTravelHistory[index].startFact ? isStarted : isConfirmed;
    }


    return (
        <div className={isMulticustomeral ? "historyBodyMultiUser" : ""}>
            {isMulticustomeral &&
                <div className="historyBodyMultiUserEl d-flex justify-content-between" >
                    <h5>{textPage.users}</h5>
                    <h5>{textPage.placesLeft + ": " + props.tourSeatsData}</h5>
                </div>
            }

            <div className="d-flex ">


                {
                    isMulticustomeral &&
                    <div className="d-flex flex-column historyBodyMultiUserEl">
                        <div className="d-flex flex-column">
                            {
                                element.union.map((elUn, inUn) => {
                                    let selectedElementIndex = that.state.selectedElement[index] ? that.state.selectedElement[index] : 0;
                                    return (
                                        <span className={"historyBodyButton " + (selectedElementIndex === inUn ? 'historyBodyButtonSelected ' : '')
                                            + (isMulticustomeral && !elUn.isCarrierConfirmed ? 'historyBodyButtonErrorText' : '')}
                                            onClick={() => {
                                                let selectedElementsArray = that.state.selectedElement;
                                                selectedElementsArray[index] = inUn;
                                                that.setState({
                                                    selectedElement: selectedElementsArray
                                                });
                                            }}>{elUn.client.firstName}</span>
                                    )
                                }
                                )
                            }
                        </div>

                    </div>
                }
                <div className="w-100 ">
                    {
                        isHistory &&
                        <>
                            <div className="d-flex h5lineHeight">
                                <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex flex-column "}>
                                    <h5>{textPage.tripStart}</h5>
                                    <span>{selectedElement.startFact ? that.props.globalReduser.createDateTimeString(selectedElement.startFact) : textPage.noStart}</span>
                                </div>
                                <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex flex-column "}>
                                    <h5>{textPage.tripEnd}</h5>
                                    <span>{selectedElement.endFact ? that.props.globalReduser.createDateTimeString(selectedElement.endFact) : textPage.noEnd}</span>
                                </div>
                            </div>
                        </>
                    }
                    <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex align-items-center h5lineHeight"}>
                        <h5>{textPage.tripId + ":"}</h5>
                        <span>{selectedElement.simpleId ? selectedElement.simpleId : selectedElement.id}</span>
                        {
                            //you can see that this trip is not confirmed in the header of trip;
                            //we mush write it again only if this is a multicustomeral tour, where you mush find not confirmed user
                            //otherwise it's clear for you who is not confirmed)
                            //isMulticustomeral && !selectedElement.isCarrierConfirmed &&
                            //<div style={{ color: 'red', fontSize: "14px" }}>{textPage.notConfirmed}</div>
                        }
                    </div>
                    <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex align-items-center h5lineHeight"}>
                        <h5>{textPage.isСonfirmed}</h5>
                        {
                            //you can see that this trip is not confirmed in the header of trip;
                            //we mush write it again only if this is a multicustomeral tour, where you mush find not confirmed user
                            //otherwise it's clear for you who is not confirmed)
                            /*isMulticustomeral && */!selectedElement.isCarrierConfirmed ?
                                <>
                                    <span style={{ color: 'red', fontSize: "14px" }}>
                                        {textPage.notConfirmed}
                                    </span>
                                    {
                                        !isHistory &&
                                        <>
                                            <Link className="historyBodyBottomMultiUserElLink" to={'/driverConfirmation/' + selectedElement.id + '-' + that.props.globalReduser.profile._id + '-true'}>
                                                {textPage.confirm}
                                            </Link>
                                            <Link className="historyBodyBottomMultiUserElLink" to={'/driverConfirmation/' + selectedElement.id + '-' + that.props.globalReduser.profile._id + '-false'}>
                                                {textPage.refuse}
                                            </Link>
                                        </>
                                    }
                                </>
                                :
                                <div className="historyBodyBottomMultiUserElText" >
                                    {textPage.confirmed}
                                </div>
                        }
                    </div>
                    <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex align-items-center h5lineHeight"}>
                        <h5>{textPage.venue + ":"}</h5>
                        <span>{selectedElement.startPlace}</span>
                    </div>
                    {props.tripType ?
                        <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex align-items-center h5lineHeight"}>
                            <h5>{textPage.numberPersons + ":"}</h5>
                            <span>{selectedElement.passengerNumber}</span>
                        </div>
                        :
                        <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex align-items-center h5lineHeight"}>
                            <h5>{textPage.car + ":"}</h5>
                            <span>{selectedElement.car}</span>
                        </div>
                    }
                    <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex align-items-center h5lineHeight"}>
                        <h5>{textPage.costOfTravel + ":"}</h5>
                        <span>{that.props.storeState.currencies ? that.props.storeState.currencies[findCurrencyEl(that, selectedElement.currencyType)].symbol + selectedElement.price : ''}</span>
                    </div>
                    <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex flex-column h5lineHeight"}>
                        <h5>{textPage.customer + ":"}</h5>
                        <span>{selectedElement.client.firstName}</span>
                        <span>{selectedElement.client.phone}</span>
                        <span>{selectedElement.client.email}</span>
                        {/* <span>{element.passengerNumber+" чел."}</span> */}
                    </div>
                    <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex flex-column h5lineHeight"}>
                        <h5>{textPage.comment + ":"}</h5>
                        <span>{selectedElement.commentary}</span>
                    </div>
                    {
                        isMulticustomeral && !isHistory &&
                        <div className={(isMulticustomeral ? "historyBodyBottomMultiUserEl " : "historyBodyElement ") + "d-flex flex-column h5lineHeight"}>
                            {
                                filteredTravelHistory[index].startFact ?
                                    <div className="d-flex flex-row">
                                        <h5>{"Is started:"}</h5>
                                        <span>{filteredTravelHistory[index].union[selectedElementIndex].startFact ? 'true' : 'false'}</span>
                                    </div>
                                    :
                                    <div className="d-flex align-items-center ">
                                        <h5>{"Is selected:"}</h5>
                                        <Checkbox checked={selectedElement.selected} onClick={() => {

                                            if ((selectedElementIndex || selectedElementIndex === 0) && canChangeSelected) {
                                                filteredTravelHistory[index].union[selectedElementIndex].selected = !filteredTravelHistory[index].union[selectedElementIndex].selected;
                                            }
                                            that.setState({
                                                filteredTravelHistory: filteredTravelHistory
                                            })
                                        }} />
                                    </div>
                            }
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}

class DriverProfileTrevelHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        let arrayCollapse = new Array(props.trevelHistory.length).fill(false)
        this.state = {
            oldTravelHistory: '[]',
            filteredTravelHistory: [],
            collapse: arrayCollapse,
            selectedElement: new Array(props.trevelHistory.length).fill(0)
        };
    }

 
    stateButtonClicked = (element) => {
        function idArrayCreator(union, startFact) {
            let res = [];
            //if !startFact - we start a trip. Then, we must send only selected ids
            //if startFact - we end a trip. Then, we must send all ids
            for (let i = 0; i < union.length; i++) {
                if (union[i].selected || startFact) {
                    res.push(union[i].id);
                }
            }
            return res;
        }

        let body = JSON.stringify({
            id: element.union.length > 0 ? idArrayCreator(element.union, element.startFact) : element.id
        });

        //console.log(requests);
        let jwt = this.props.globalReduser.readCookie('jwt');

        if (jwt && jwt !== '-') {
            let that = this;
            startRefresherGlobal(this, true)

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
                            getUserData(thenFuncGlobal, catchFuncGlobal, that);
                            
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
                            getUserData(thenFuncGlobal, catchFuncGlobal, that);
                           
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
    componentDidMount() {
        //thenFuncGlobal(this)
    }
    render() {

        function travelHistoryFiltration(travelHistory) {

            //this function must return an array of history elements, where multicustomeral tours elements are united into one
            let res = [];
            let changedTravelHistory = [];
            for (let i = 0; i < travelHistory.length; i++) {
                changedTravelHistory.push({ ...travelHistory[i], united: false, union: [] });
            }
            for (let i = 0; i < changedTravelHistory.length; i++) {
                if (changedTravelHistory[i].united || changedTravelHistory[i].tripType.type_en !== 'Tour') {
                    //if this object is united with someone, then skip it
                    continue;
                }
                for (let j = i + 1; j < changedTravelHistory.length; j++) {
                    if (changedTravelHistory[j].tripType.type_en === 'Tour') {
                        if (changedTravelHistory[j].united) {
                            //if this object is united with someone, then skip it
                            continue;
                        }
                        if (changedTravelHistory[i].startDefault.substring(0, 10) === changedTravelHistory[j].startDefault.substring(0, 10)) {
                            //if dates are equal, then unite j to i


                            if (changedTravelHistory[i].union.length === 0) {
                                changedTravelHistory[i].union.push({ ...changedTravelHistory[i]/*, selected: changedTravelHistory[i].isCarrierConfirmed*/ });
                            }
                            changedTravelHistory[i].union.push({ ...changedTravelHistory[j]/*, selected: changedTravelHistory[j].isCarrierConfirmed*/ });
                            changedTravelHistory[j].united = true;
                            //next line set isCarrierConfirmed like if any united object is not confirmed, the main obj is also not confirmed
                            changedTravelHistory[i].isCarrierConfirmed = changedTravelHistory[i].isCarrierConfirmed && changedTravelHistory[j].isCarrierConfirmed;
                            //next line set startFace like if any element have startFact, then all object have startFact
                            changedTravelHistory[i].startFact = changedTravelHistory[i].startFact || changedTravelHistory[j].startFact;
                        }
                    }
                }
            }
            for (let i = 0; i < changedTravelHistory.length; i++) {
                if (!changedTravelHistory[i].united) {
                    for (let j = 0; j < changedTravelHistory[i].union.length; j++) {

                        let isStarted = changedTravelHistory[i].union[j].startFact ? true : false;
                        let isConfirmed = changedTravelHistory[i].union[j].isCarrierConfirmed;
                        //if no started objects - then trip is not started -> selected = isCarrierConfirmed
                        //if started objects exist - then trip is started -> selected = startFact.toBoolean = startFact ? true : false
                        changedTravelHistory[i].union[j].selected = changedTravelHistory[i].startFact ? isStarted : isConfirmed;
                    }
                    res.push(changedTravelHistory[i]);
                }
            }
            return res;
        }
        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileTrevelHistory;

        let that = this;
        let textInfoAgency = this.props.storeState.languageText.agencyProfile.agencyProfileHistory;
        //
        let JSONTravelHistory = JSON.stringify(this.props.trevelHistory);
        if (this.state.oldTravelHistory !== JSONTravelHistory) {
            let filteredTravelHistory = travelHistoryFiltration(this.props.trevelHistory);
            console.log(filteredTravelHistory);
            this.setState({
                oldTravelHistory: JSONTravelHistory,
                filteredTravelHistory: filteredTravelHistory,
                selectedElement: new Array(filteredTravelHistory.length).fill(0)
            })
        }
        return (
            <div className="d-flex flex-wrap justify-content-md-start justify-content-center">
                {
                    this.state.filteredTravelHistory.map((element, index) => {

                        let isToday = Math.abs(new Date(element.startDefault) - new Date()) < 86400000;
                        let canStartTrip = element.isCarrierConfirmed && (isToday || element.startFact);
                        return (
                            <div className={this.state.collapse[index] ? " openCollapse col-md-6 col-12 p-2" : "col-lg-3 col-md-4 col-sm-6 col-11 p-2 "} key={element}>
                                <div className={isToday && !this.props.isHistory ? "trevelHistoryBody trevelHistoryBodyActiveDay  d-flex flex-column" : "trevelHistoryBody  d-flex flex-column"}>
                                    <div className="d-flex flex-column historyBodyHeader">
                                        <div className="d-flex justify-content-between">
                                            <span>{element.startDefault ? this.props.globalReduser.createDateTimeString(element.startDefault) : ''}</span>
                                            <span className="historyBodyHeaderType">{element.tripType.type_en}</span>
                                        </div>
                                        {element.tripType.type_en === "Tour" &&

                                            <span style={{ minHeight: "42px" }}>{element.tourName}</span>
                                        }

                                        {element.tripType.type_en !== "Tour" &&
                                            <span className="historyBodyHeaderRoute">{createCorrectRoute(element.route, element.travelLength, element.travelTime)}</span>
                                        }

                                        <div className="d-flex align-items-center justify-content-between">
                                            <span className="historyBodyHeaderBtn pt-2"
                                                onClick={() => {

                                                    let array = this.state.collapse;
                                                    array[index] = !array[index];
                                                    this.setState({ collapse: array })
                                                }}>{this.state.collapse[index] ? textPage.historyBodyHeaderBtn[0] : textPage.historyBodyHeaderBtn[1]}</span>
                                            {
                                                !element.isCarrierConfirmed &&
                                                <div style={{ color: 'red', fontSize: "14px" }}>{textPage.notConfirmed}</div>
                                            }
                                        </div>

                                    </div>
                                    <Collapse isOpen={this.state.collapse[index]} className={this.state.collapse[index] ? "d-flex flex-column px-2" : ""} >
                                        <TravelHistoryElementInnerPart isHistory={this.props.isHistory} textPage={textPage} /*element={element}*/
                                            that={this} index={index} tourSeatsData={element.tripType.type_en === "Tour" ? (element.tourSeatsData.seatsMax - element.tourSeatsData.reservedSeats) : false}
                                            tripType={element.tripType.type_en === "Tour" ? true : false} />
                                    </Collapse>

                                    {
                                        !this.props.isHistory &&
                                        <>
                                            <div className={canStartTrip ? "d-flex flex-column historyBodyBtn" : "d-flex flex-column historyBodyBtnNotActive"}>
                                                <button onClick={() => {
                                                    if (canStartTrip) {

                                                        console.log(element);
                                                        this.stateButtonClicked(element)
                                                    }
                                                }}>{element.startFact ? textPage.stateVariants[0] : textPage.stateVariants[1]}</button>
                                            </div>
                                        </>
                                    }

                                </div>

                            </div>
                        )
                    }
                    )}
                {
                    this.props.trevelHistory.length === 0 &&
                    <div style={{ margin: 'auto', paddingTop: '7%' }}>{this.props.isHistory ? textInfoAgency.emptyHistory : textInfoAgency.emptyUpcoming}</div>
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
