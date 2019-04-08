import React from 'react';
import './DriverProfileTripSettingsTrip.css'
import { connect } from 'react-redux';
import LocationSearchInput from '../home/HomeBody/Search'



class DriverProfileTripSettingsTripClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityRadius: [{ city: "", itemRadius: "" },],
            readyLeavePlease: [{ cityLeave: "", itemRadiusLeave: "" },],
        }

        this.addCityRadius = this.addCityRadius.bind(this);
        this.deleteCityRadius = this.deleteCityRadius.bind(this);
        this.deleteReadyLeavePleaseel = this.deleteReadyLeavePleaseel.bind(this);
        this.addReadyLeavePleaseel = this.addReadyLeavePleaseel.bind(this);
    }

    addCityRadius() {
        let newArrayCity = this.state.cityRadius;
        newArrayCity.push({ city: "", itemRadius: "" })
        this.setState({
            cityRadius: newArrayCity,
        })
    }

    deleteCityRadius(index) {
        let newArrayCity = this.state.cityRadius;
        newArrayCity.splice(index, 1);
        this.setState({
            cityRadius: newArrayCity,
        })
        console.log(this.state.cityRadius)
    }

    addReadyLeavePleaseel() {
        let newReadyLeavePlease = this.state.readyLeavePlease;
        newReadyLeavePlease.push({ cityLeave: "", itemRadiusLeave: "" })
        this.setState({
            readyLeavePlease: newReadyLeavePlease,
        })
    }

    deleteReadyLeavePleaseel(index) {
        let newReadyLeavePlease = this.state.readyLeavePlease;
        newReadyLeavePlease.splice(index, 1);
        this.setState({
            readyLeavePlease: newReadyLeavePlease,
        })
    }

    changeAllValue(index, e) {
        let newArrayCity = this.state.cityRadius.slice();
        let newReadyLeavePlease = this.state.readyLeavePlease.slice();
        switch (e.currentTarget.id) {
            case "city": {
                newArrayCity[index].city = e.currentTarget.value;
                this.setState({ cityRadius: newArrayCity });
                break;
            }
            case "itemRadiu": {
                newArrayCity[index].itemRadius = e.currentTarget.value;
                this.setState({ cityRadius: newArrayCity });
                break;
            }
            case "cityLeave": {
                newReadyLeavePlease[index].cityLeave = e.currentTarget.value;
                this.setState({ readyLeavePlease: newReadyLeavePlease });
                break;
            }
            case "itemRadiusLeave": {
                newReadyLeavePlease[index].itemRadiusLeave = e.currentTarget.value;
                this.setState({ readyLeavePlease: newReadyLeavePlease });
                break;
            }
        }
    }

    // TODO Добавить инпут с подсказчиком гугл
    render() {
        return (
            <div className="driverProfileTripSettingsBody">
                <div className="driverProfileTripSettingsContent col-12 pt-4">
                    <div className="driverProfileTripSettingsContentTitle d-flex align-items-center">
                        <p>Добавьте город и радиусы, где Вы готовы принимать заказы</p>
                    </div>
                    {this.state.cityRadius.map((element, index) =>
                        <React.Fragment>
                            <div className="d-flex align-items-center">
                                <p className="col-3 p-0">Базовый город:</p>
                                <input type="text" id="city" value={this.state.cityRadius[index].city} onChange={this.changeAllValue.bind(this, index)} />
                                <div style={{ display: index ? "block" : "none" }} className="driverProfileTripSettingsContentDeletButton col-3 mb-0 " onClick={() => { this.deleteCityRadius(index) }}>Удалить город</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 p-0">Радиус в км:</p>
                                <input type="text" id="itemRadiu" value={this.state.cityRadius[index].itemRadius} onChange={this.changeAllValue.bind(this, index)} />
                            </div>
                        </React.Fragment>
                    )}
                    <div className="driverProfileTripSettingsContentAddCity d-flex align-items-center justify-content-center">
                        <p className="col-6 pl-0" onClick={this.addCityRadius}>+ Добавить город</p>
                    </div>
                </div>

                <div className="driverProfileTripSettingsContent">
                    <div className="driverProfileTripSettingsContentTitle d-flex align-items-center">
                        <p>Как далеко Вы готовы совершать поездки от базовых городов?</p>
                    </div>
                    {this.state.readyLeavePlease.map((element, index) =>
                        <React.Fragment>
                            <div className="d-flex align-items-center">
                                <p className="col-3 p-0">Базовый город:</p>
                                <input type="text" id="cityLeave" value={this.state.readyLeavePlease[index].cityLeave} onChange={this.changeAllValue.bind(this, index)} />
                                <div style={{ display: index ? "block" : "none" }} className="driverProfileTripSettingsContentDeletButton col-3 mb-0" onClick={() => { this.deleteReadyLeavePleaseel(index) }}>Удалить город</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="col-3 p-0">Радиус в км:</p>
                                <input type="text" id="itemRadiusLeave" value={this.state.readyLeavePlease[index].itemRadiusLeave} onChange={this.changeAllValue.bind(this, index)} />
                            </div>
                        </React.Fragment>
                    )}
                    <div className="driverProfileTripSettingsContentAddCity d-flex align-items-center justify-content-center">
                        <p className="col-6 pl-0" onClick={this.addReadyLeavePleaseel}>+ Добавить город</p>
                    </div>
                    <div className="d-flex justify-content-center col-9 ml-4 ">
                        <button>СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileTripSettingsTrip = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTripClass);

export default DriverProfileTripSettingsTrip;