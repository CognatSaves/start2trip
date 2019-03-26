import React, { Component } from 'react';
import './DriverProfileTripSettingsTrip.css'
import { connect } from 'react-redux';



class DriverProfileTripSettingsTripClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="driverProfileTripSettingsContent col-12">
                    <div className="driverProfileTripSettingsContentTitle d-flex align-items-center">
                        <p>Добавьте город и радиусы, где Вы готовы принимать заказы</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3 p-0">Базовый город:</p>
                        <input type="text" />
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3 p-0">Радиус в км:</p>
                        <select name="radius">
                            <option value="10 км">10 км</option>
                            <option value="20 км">20 км</option>
                            <option value="30 км">30 км</option>
                            <option value="40 км">40 км</option>
                            <option value="50 км">50 км</option>
                            <option value="60 км">60 км</option>
                            <option value="70 км">70 км</option>
                            <option value="80 км">80 км</option>
                            <option value="90 км">90 км</option>
                            <option value="100 км">100 км</option>
                            <option value="110 км">110 км</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center">
                        <p>+ Добавить город</p>
                    </div>
                </div>
                <div className="driverProfileTripSettingsContent">
                    <div className="driverProfileTripSettingsContentTitle d-flex align-items-center">
                        <p>Как далеко Вы готовы совершать поездки от базовых городов?</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3 p-0">Базовый город:</p>
                        <input type="text" />
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="col-3 p-0">Радиус в км:</p>
                        <select name="radius">
                            <option value="10 км">10 км</option>
                            <option value="20 км">20 км</option>
                            <option value="30 км">30 км</option>
                            <option value="40 км">40 км</option>
                            <option value="50 км">50 км</option>
                            <option value="60 км">60 км</option>
                            <option value="70 км">70 км</option>
                            <option value="80 км">80 км</option>
                            <option value="90 км">90 км</option>
                            <option value="100 км">100 км</option>
                            <option value="110 км">110 км</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center">
                        <p>+ Добавить город</p>
                    </div>
                    <button>СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                </div>
            </React.Fragment>
        );
    }
}

const DriverProfileTripSettingsTrip = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTripClass);

export default DriverProfileTripSettingsTrip;