import React from 'react';

import { connect } from 'react-redux'
import Stars from '../stars/Stars';
import requests from '../../config';




class UserProfileTrevelHistoryClass extends React.Component {
    // constructor(props) {
    //     super(props);

    // }


    render() {
        /*function createDateTimeString(start){
            
            let date = new Date(start);
            let month = date.getUTCMonth(); let day = date.getUTCDate(); let hours = date.getUTCHours(); let minutes = date.getMinutes();
            let res = date.getUTCFullYear()+"-"+(month>=10 ? month : '0'+month)+"-"+(day>=10 ? day : '0'+day)+'; '+
            (hours>=10 ? hours : '0'+hours)+":"+(minutes>=10 ? minutes : '0'+minutes);
            return res;
        }*/
        function createCorrectRoute(route, length, time){
            let routeString=route[0].point;
            for(let i=1; i<route.length;i++){
                routeString+=' - '+route[i].point;
            }
            routeString+=' ('+length+', '+time+")";
            return routeString; 
        }
        function findCurrencyEl(that,iso){
            for(let i=0; i<that.props.globalReduser.profile.currencies.length;i++){
                if(iso===that.props.globalReduser.profile.currencies[i].ISO){
                    return i;
                }
            }
        }
        let that = this;
        return (
            <div className="d-flex flex-wrap justify-content-center">
                {this.props.trevelHistory.map((element, index) =>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
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
                            <h5>Водитель и автомобиль</h5>
                                <div className="historyBodyElementDriver d-flex align-items-center">
                                    <img src={requests.serverAddress+element.carrier.image} alt={''} />
                                    <div className="d-flex flex-column ml-1">
                                    <span>{element.carrier.firstName}</span>
                                    <Stars value={element.carrier.rating} commentNumber={element.carrier.comments +" отзыва"} valueDisplay={true} commentNumberDisplay={true} />
                                    </div>
                                    
                                </div>
                                <span>{element.carrier.workPhone}</span>
                                <span>{element.carrier.email}</span>
                                <div className="historyBodyElementDriver d-flex align-items-center">
                                    <img src={requests.serverAddress+element.car.image} alt={''} />
                                    <div className="d-flex flex-column ml-1">
                                    <span>{element.car.carBrand}</span>
                                    </div>                           
                                </div>
                                <span>{'Количество человек: '+element.passengerNumber}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>Место встречи</h5>
                                <span>{element.startPlace}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>Стоимость поездки</h5>
                                <span>{this.props.globalReduser.profile.currencies ? this.props.globalReduser.profile.currencies[findCurrencyEl(that,element.currencyType)].symbol+element.price : ''}</span>
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
                                :<React.Fragment>
                                    
                                </React.Fragment>
                            }
                        </div>
                    </div>
                )}
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