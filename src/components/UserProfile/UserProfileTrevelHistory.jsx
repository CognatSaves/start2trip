import React from 'react';
import { connect } from 'react-redux'
import requests from '../../config';
import { Collapse } from 'reactstrap'
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'

import Stars from '../stars/Stars';

class UserProfileTrevelHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        let arrayCollapse = new Array(props.trevelHistory.length).fill(false)
        this.state = {

            collapse: arrayCollapse,
        };
    }
    componentDidMount(){
        //thenFuncGlobal(this)
    }
    render() {
        function createCorrectRoute(route, length, time) {
            let routeString = route[0].point;
            for (let i = 1; i < route.length; i++) {
                routeString += ' - ' + route[i].point;
            }
            routeString += ' (' + length + ', ' + time + ")";
            return routeString;
        }
        function findCurrencyEl(that, iso) {
            for (let i = 0; i < that.props.globalReduser.profile.currencies.length; i++) {
                if (iso === that.props.globalReduser.profile.currencies[i].ISO) {
                    return i;
                }
            }
        }
        let that = this;
        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileTrevelHistory;
        let textInfo = this.props.storeState.languageTextMain.userProfile.userProfileTravelHistory;
        let textInfoAgency = this.props.storeState.languageText.agencyProfile.agencyProfileHistory;
        if(this.props.trevelHistory.length>0){
            
        }
        return (
            <div className="d-flex flex-wrap justify-content-center" style={{height: '100%'}}>
                {this.props.trevelHistory.map((element, index) =>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-11 p-2" style={{height: 'maxContent'}}>
                        <div className="trevelHistoryBody  d-flex flex-column">
                            <div className="d-flex flex-column historyBodyHeader">
                                <div className="d-flex justify-content-between">
                                    <span>{element.startDefault ? this.props.globalReduser.createDateTimeString(element.startDefault) : ''}</span>
                                    <span className="historyBodyHeaderType">{element.tripType.type_en}</span>
                                </div>
                                <span className="historyBodyHeaderRoute">{createCorrectRoute(element.route, element.travelLength, element.travelTime)}</span>
                                <hr />
                            </div>
                            <span className="historyBodyHeaderBtn pt-2"
                                    onClick={() => {
                                        let array = this.state.collapse;
                                        array[index] = !array[index];
                                        this.setState({ collapse: array })
                                    }}>{this.state.collapse[index] ? textPage.historyBodyHeaderBtn[0] : textPage.historyBodyHeaderBtn[1]}</span>
                            <Collapse isOpen={this.state.collapse[index]} className={this.state.collapse[index] ? "d-flex flex-column px-3" : ""} >
                            <div className="d-flex flex-column historyBodyElement ">

                                <h5>{textInfo.drivercar}</h5>
                                {
                                    !element.isCarrierConfirmed && 
                                    <div style={{color: 'red'}}>NOT CONFIRMED</div> 
                                }
                                <div className="historyBodyElementDriver d-flex align-items-center">
                                    <img src={requests.serverAddressImg + element.carrier.image} alt={''} />
                                    <div className="d-flex flex-column ml-1">
                                        <span>{element.carrier.firstName}</span>
                                        <Stars value={element.carrier.rating} commentNumber={element.carrier.comments + " " + textInfo.comments} valueDisplay={true} commentNumberDisplay={true} />
                                    </div>

                                </div>
                                <span>{element.carrier.workPhone}</span>
                                <span>{element.carrier.email}</span>
                                <div className="historyBodyElementDriver d-flex align-items-center">
                                    <img src={requests.serverAddressImg + element.car.image} alt={''} />
                                    <div className="d-flex flex-column ml-1">
                                        <span>{element.car.carBrand}</span>
                                    </div>
                                </div>
                                {/* <span>{textInfo.passengerNumber+': ' + element.passengerNumber}</span> */}
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>{textInfo.startPlace}</h5>
                                <span>{element.startPlace}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>{textInfo.price}</h5>
                                <span>{this.props.globalReduser.profile.currencies ? this.props.globalReduser.profile.currencies[findCurrencyEl(that, element.currencyType)].symbol + element.price : ''}</span>
                            </div>
                            {
                                this.props.isHistory ?
                                    <>
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>{textInfo.startFact}</h5>
                                            <span>{element.startFact ? this.props.globalReduser.createDateTimeString(element.startFact) : textInfo.notStart}</span>
                                        </div>
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>{textInfo.endFact}</h5>
                                            <span>{element.endFact ? this.props.globalReduser.createDateTimeString(element.endFact) : textInfo.notEnd}</span>
                                        </div>
                                    </>
                                    : <React.Fragment />
                            }
                            </Collapse>
                        </div>
                    </div>
                )}
                {
                    this.props.trevelHistory.length===0 &&
                    <div style={{margin: 'auto', paddingBottom: '7%'}}>{this.props.isHistory ?  textInfoAgency.emptyHistory : textInfoAgency.emptyUpcoming}</div>
                }
            </div>
        );
    }
}

const UserProfileTrevelHistory = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(UserProfileTrevelHistoryClass);

export default UserProfileTrevelHistory;