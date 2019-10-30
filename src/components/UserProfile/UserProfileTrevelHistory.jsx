import React from 'react';
import { connect } from 'react-redux'
import requests from '../../config';
import { Collapse } from 'reactstrap'
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,findCurrencyEl,createCorrectRoute } from '../../redusers/GlobalFunction'

import Stars from '../stars/Stars';
import { isMobileOnly } from 'react-device-detect';

class UserProfileTrevelHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        let arrayCollapse = new Array(props.trevelHistory.length).fill(false)
        this.state = {

            collapse: arrayCollapse,
        };
    }
    componentDidMount() {
        //thenFuncGlobal(this)
    }
    render() {


        let that = this;
        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileTrevelHistory;
        let textInfo = this.props.storeState.languageTextMain.userProfile.userProfileTravelHistory;
        let textInfoAgency = this.props.storeState.languageText.agencyProfile.agencyProfileHistory;
        if (this.props.trevelHistory.length > 0) {

        }
        return (
            <div className="d-flex flex-wrap justify-content-md-start justify-content-center" >
                {this.props.trevelHistory.map((element, index) =>
                    <div className={this.state.collapse[index] ? " openCollapse col-md-6 col-12 p-2" : "col-lg-3 col-md-4 col-sm-6 col-11 p-2 "} >
                        <div className="trevelHistoryBody  d-flex flex-column">
                            <div className="d-flex flex-column historyBodyHeader">
                                <div className="d-flex justify-content-between">
                                    <span>{element.startDefault ? this.props.globalReduser.createDateTimeString(element.startDefault) : ''}</span>
                                    <span className="historyBodyHeaderType">{element.tripType.type_en}</span>
                                </div>
                                <span className="historyBodyHeaderRoute">{createCorrectRoute(element.route, element.travelLength, element.travelTime)}</span>
                                <hr />
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


                            <Collapse isOpen={this.state.collapse[index]} className={this.state.collapse[index] ? "d-flex flex-column px-3" : ""} >
                                <div className="d-flex flex-column historyBodyElement ">

                                    <h5>{textInfo.drivercar}</h5>
                                    <div className="historyBodyElementDriverCar d-flex flex-column">
                                        <img src={requests.serverAddressImg + element.car.image} alt={''} />
                                        <div className="d-flex flex-column pb-2">
                                            <span>{element.car.carBrand}</span>
                                        </div>
                                    </div>
                                    <div className="historyBodyElementDriver d-flex align-items-center">
                                        <div className="d-flex col">
                                            <img src={requests.serverAddressImg + element.carrier.image} alt={''} />
                                            <div className="d-flex flex-column ml-1">
                                                <span>{element.carrier.firstName}</span>
                                                <Stars value={element.carrier.rating} commentNumber={element.carrier.comments + " " + textInfo.comments} valueDisplay={true} commentNumberDisplay={true} />
                                            </div>
                                        </div>

                                        {!isMobileOnly &&
                                            <div className="col d-flex flex-column historyBodyElement">
                                                <h5>{"Contacts"}</h5>
                                                <span>{element.carrier.workPhone}</span>
                                                <span>{element.carrier.email}</span>
                                            </div>
                                        }


                                    </div>



                                    {/* <span>{textInfo.passengerNumber+': ' + element.passengerNumber}</span> */}
                                </div>
                                {isMobileOnly &&
                                    <div className="col d-flex flex-column historyBodyElement">
                                        <h5>{"Contacts"}</h5>
                                        <span>{element.carrier.workPhone}</span>
                                        <span>{element.carrier.email}</span>
                                    </div>
                                }
                                <div className={isMobileOnly ? "" : "d-flex"}>
                                    <div className="d-flex flex-column historyBodyElement col">
                                        <h5>{textInfo.startPlace}</h5>
                                        <span>{element.startPlace}</span>
                                    </div>
                                    <div className="d-flex flex-column historyBodyElement col">
                                        <h5>{textInfo.price}</h5>
                                        <span>{this.props.globalReduser.profile.currencies ? this.props.globalReduser.profile.currencies[findCurrencyEl(that, element.currencyType)].symbol + element.price : ''}</span>
                                    </div>

                                </div>

                                {
                                    this.props.isHistory ?
                                        <div className="d-flex">
                                            <div className="d-flex flex-column historyBodyElement col">
                                                <h5>{textInfo.startFact}</h5>
                                                <span>{element.startFact ? this.props.globalReduser.createDateTimeString(element.startFact) : textInfo.notStart}</span>
                                            </div>
                                            <div className="d-flex flex-column historyBodyElement col">
                                                <h5>{textInfo.endFact}</h5>
                                                <span>{element.endFact ? this.props.globalReduser.createDateTimeString(element.endFact) : textInfo.notEnd}</span>
                                            </div>
                                        </div>
                                        : <React.Fragment />
                                }
                            </Collapse>
                        </div>
                    </div>
                )}
                {
                    this.props.trevelHistory.length === 0 &&
                    <div style={{ margin: 'auto', paddingBottom: '7%' }}>{this.props.isHistory ? textInfoAgency.emptyHistory : textInfoAgency.emptyUpcoming}</div>
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