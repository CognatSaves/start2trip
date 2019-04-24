import React from 'react';
import './UserProfileTrevelHistory.css'
import { connect } from 'react-redux'
import Stars from '../stars/Stars';





class DriverProfileTrevelHistoryClass extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {

        return (
            <div className="d-flex flex-wrap justify-content-center">
                { this.props.trevelHistory.map((element, index) =>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
                        <div className="trevelHistoryBody  d-flex flex-column">
                            <div className="d-flex flex-column historyBodyElement ">
                                <h5>Перевозчик</h5>
                                <div className="d-flex align-items-center">
                                    <img src={element.img} alt={element.img}/>
                                    <span>{element.name}</span>
                                    <Stars value={5 - index} commentNumber="30" valueDisplay={true} commentNumberDisplay={false} />
                                </div>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>Маршрут</h5>
                                <span>{element.route}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>Дата</h5>
                                <span>{element.date}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>Стоимость поездки</h5>
                                <span>{element.price}</span>
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