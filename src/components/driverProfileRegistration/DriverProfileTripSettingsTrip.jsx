import React from 'react';
import './DriverProfileTripSettingsTrip.css'
import { connect } from 'react-redux';
import LocationSearchInput from '../home/HomeBody/Search'
import TextField from 'material-ui/TextField';



class DriverProfileTripSettingsTripClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityRadius: [{ city: "", itemRadius: "" },],
            readyLeavePlease: [{ cityLeave: "", itemRadiusLeave: "" },],
        }

        this.addCityRadius = this.addCityRadius.bind(this);
        this.deleteCityRadius = this.deleteCityRadius.bind(this);
        // this.deleteReadyLeavePleaseel = this.deleteReadyLeavePleaseel.bind(this);
        // this.addReadyLeavePleaseel = this.addReadyLeavePleaseel.bind(this);
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

    // addReadyLeavePleaseel() {
    //     let newReadyLeavePlease = this.state.readyLeavePlease;
    //     newReadyLeavePlease.push({ cityLeave: "", itemRadiusLeave: "" })
    //     this.setState({
    //         readyLeavePlease: newReadyLeavePlease,
    //     })
    // }

    // deleteReadyLeavePleaseel(index) {
    //     let newReadyLeavePlease = this.state.readyLeavePlease;
    //     newReadyLeavePlease.splice(index, 1);
    //     this.setState({
    //         readyLeavePlease: newReadyLeavePlease,
    //     })
    // }

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
                                <label htmlFor={"tripLocation"+ index} className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Базовый город/радиус:</label>
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                    <LocationSearchInput classInput="searchInputDriverInformation" id={"tripLocation"+ index} classDropdown="searchDropdownDriverInformation" />
                                    <input className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ml-1 d-xl-block d-lg-block d-md-block d-sm-none d-none" type="text" id="itemRadiu" value={this.state.cityRadius[index].itemRadius} onChange={this.changeAllValue.bind(this, index)} required />
                                    <TextField
                                        hintText="Пожалуйста введите радиус"
                                        floatingLabelText="Радиус в км"
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                </div>
                                {/* <LocationSearchInput address={this.state.cityRadius[index].city} changeCity={this.changeAllValue.bind(this, index)} classInput="searchInputDriverInformation" id="city" classDropdown="searchDropdownDriverInformation" /> */}
                                {/* <input className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" id="city" value={this.state.cityRadius[index].city} onChange={this.changeAllValue.bind(this, index)} required/> */}
                                <span style={{ display: index ? "block" : "none" }} className="tripSettingsContentDeletButton " title="Удалить город" onClick={() => { this.deleteCityRadius(index) }} />
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>

                        </React.Fragment>
                    )}
                    <div className="tripSettingsContentAddCity d-flex align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start justify-content-center">
                        <p className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 pl-0" onClick={this.addCityRadius}>+ Добавить город</p>
                    </div>
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                        <label htmlFor="maxDailyMileage" className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 p-0">Максимальный дневной пробег:</label>
                        <input id="maxDailyMileage" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="text" />
                        <TextField
                            hintText="Пожалуйста дневной пробег"
                            floatingLabelText="Максимальный дневной пробег"
                            className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                            fullWidth="100%"
                            floatingLabelFocusStyle={{ color: "#304269" }}
                            underlineFocusStyle={{ borderColor: "#304269" }}

                        />
                        <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                    </div>
                </div>

                {/* <div className="tripSettingsContent">
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
                    </div> */}
                <div className="tripSettingsContent d-flex justify-content-md-start justify-content-sm-center justify-content-center p-0">
                    <p className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 d-xl-block  d-lg-block  d-md-block d-sm-none d-none"></p>
                    <button htmlFor="tripForm" type="submit">СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                </div>
                {/* </div> */}
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