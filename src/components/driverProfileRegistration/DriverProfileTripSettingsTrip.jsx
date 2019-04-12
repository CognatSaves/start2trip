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
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(event) {
        debugger
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
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
            <form onSubmit={this.formSubmit} id="tripForm" className="tripSettingsBody">
                <div className="tripSettingsContent">
                    <div className="tripSettingsContentTitle d-flex align-items-center">
                        <p>Добавьте город и радиусы, где Вы готовы принимать заказы</p>
                    </div>
                    {this.state.cityRadius.map((element, index) =>
                        <React.Fragment>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <p className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Базовый город:</p>
                                <input className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" id="city" value={this.state.cityRadius[index].city} onChange={this.changeAllValue.bind(this, index)} required/>
                                <div style={{ display: index ? "block" : "none" }} className="tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0" onClick={() => { this.deleteCityRadius(index) }}>Удалить город</div>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <p className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Радиус в км:</p>
                                <input className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" id="itemRadiu" value={this.state.cityRadius[index].itemRadius} onChange={this.changeAllValue.bind(this, index)} required/>
                            </div>
                        </React.Fragment>
                    )}
                    <div className="tripSettingsContentAddCity d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center">
                        <p className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 pl-0" onClick={this.addCityRadius}>+ Добавить город</p>
                    </div>
                </div>

                <div className="tripSettingsContent">
                    <div className="tripSettingsContentTitle d-flex align-items-center">
                        <p>Как далеко Вы готовы совершать поездки от базовых городов?</p>
                    </div>
                    {this.state.readyLeavePlease.map((element, index) =>
                        <React.Fragment>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <p className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Базовый город:</p>
                                <input className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" id="cityLeave" value={this.state.readyLeavePlease[index].cityLeave} onChange={this.changeAllValue.bind(this, index)} required/>
                                <div style={{ display: index ? "block" : "none" }} className="tripSettingsContentDeletButton col-xl-3 col-lg-3 col-md-3 col-sm-11 col-11 mb-0" onClick={() => { this.deleteReadyLeavePleaseel(index) }}>Удалить город</div>
                            </div>
                            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                <p className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Радиус в км:</p>
                                <input className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" id="itemRadiusLeave" value={this.state.readyLeavePlease[index].itemRadiusLeave} onChange={this.changeAllValue.bind(this, index)} required/>
                            </div>
                        </React.Fragment>
                    )}
                    <div className="tripSettingsContentAddCity d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center">
                        <p className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 pl-0" onClick={this.addReadyLeavePleaseel}>+ Добавить город</p>
                    </div>
                    <div className="d-flex justify-content-center col-6 ml-4 ">
                        <button htmlFor="tripForm" type="submit">СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                    </div>
                </div>
            </form>
        );
    }
}

const DriverProfileTripSettingsTrip = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTripClass);

export default DriverProfileTripSettingsTrip;