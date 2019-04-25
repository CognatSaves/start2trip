import React from 'react';
import { connect } from 'react-redux'
import Stars from '../stars/Stars';





class DriverProfileTrevelHistoryClass extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {

        return (
            <div className="d-flex flex-wrap justify-content-center">
                {this.props.trevelHistory.map((element, index) =>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
                        <div className="trevelHistoryBody  d-flex flex-column">
                            <div className="d-flex flex-column historyBodyHeader">
                                <div className="d-flex justify-content-between">
                                    <span>{element.date},{element.time}</span>
                                    <span className="historyBodyHeaderType">{element.type}</span>
                                </div>
                                <span className="historyBodyHeaderRoute">{element.route}</span>
                                <hr/>
                            </div>
                            <div className="d-flex flex-column historyBodyElement ">
                                <h5>Клиент</h5>
                                <span>{element.name}</span>
                                <span>{element.tel}</span>
                                <span>{element.email}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>Место встречи</h5>
                                <span>{element.place}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>Стоимость поездки</h5>
                                <span>{element.price}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>Комментарий</h5>
                                <span>{element.feedback}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const DriverProfileTrevelHistory = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTrevelHistoryClass);

export default DriverProfileTrevelHistory;