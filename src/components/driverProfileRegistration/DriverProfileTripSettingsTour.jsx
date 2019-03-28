import React from 'react';
import './DriverProfileTripSettingsTour.css'
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';



class DriverProfileTripSettingsTourClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }



    render() {
        return (
            <div>
                <div style={{ opacity: this.state.collapse ? "0" : "1" }} className="col-12 d-flex justify-content-center p-0">
                    <button className="" onClick={this.toggle}>Добавить Тур</button>
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <div className="driverProfileTripSettingsBody">
                        <div className="driverProfileTripSettingsContent">
                            <div className="d-flex align-items-center"></div>
                            <div className="d-flex align-items-center"></div>
                            <div className="d-flex align-items-center"></div>
                            <div className="d-flex align-items-center"></div>
                        </div>
                        <div className="driverProfileTripSettingsContent">
                            <div className="d-flex align-items-center"></div>
                            <div className="d-flex align-items-center"></div>
                            <div className="d-flex align-items-center"></div>
                            <div className="d-flex align-items-center"></div>
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}

const DriverProfileTripSettingsTour = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileTripSettingsTourClass);

export default DriverProfileTripSettingsTour;