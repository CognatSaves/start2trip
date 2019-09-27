import React from 'react';
import { connect } from 'react-redux';
import DriverInfoProfile from './DriverInfoProfile';
import DriverInfoCar from './DriverInfoCar';

class DriverInfoClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log("DriverInfo render", this.props);
        const { element } = this.props;
        return (
            <div className="driverInfo_background d-flex flex-lg-row flex-column align-items-lg-start align-items-center">
                <div className="block_element_left d-flex flex-column col-lg-6 col-12 ">
                    <DriverInfoProfile element={element} storeState={this.props.storeState}/>
                </div>
                <div className="driverInfo_element d-flex flex-column col-lg-6 col-12 p-0" >
                    <DriverInfoCar element={element} carTypes={this.props.driversState.carTypes} storeState={this.props.storeState}/>
                </div>
            </div>
        )
    }
}
const DriverInfo = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser
    }),
)(DriverInfoClass);

export default DriverInfo;