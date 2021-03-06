import React from 'react';
import { connect } from 'react-redux';
import DriverInfoProfile from '../driverProfile/DriverInfoProfile';
import DriverInfoCar from '../driverProfile/DriverInfoCar';
import GuideCarSelector from '../GuideDescription/GuideCarSelector';
class DriverPageInfoClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCar: 0
        }
    }
    carSelection = (value) => {
        this.setState({
            selectedCar: value
        })
    }
    render() {
        console.log("DriverInfo render", this.props);
        const { guideData } = this.props;
        return (
            <div className="driverInfo_background d-flex flex-lg-row flex-column align-items-lg-start align-items-center">
                <div className={"block_element_left d-flex flex-column col-12 "+(guideData.cars && guideData.cars.length>0 ? "col-lg-6" : '')}>
                    <DriverInfoProfile element={guideData} storeState={this.props.storeState} needGuideIcon={true} 
                        isDriverPage={!guideData.guide/*if our driver is not a guide that not means, that he is an agency*/}/>
                </div>
                <div className="driverInfo_element d-flex flex-column col-lg-6 col-12 p-0" >
                    {
                        guideData.cars && guideData.cars.length>0 &&
                        <>
                            <DriverInfoCar element={guideData.cars && guideData.cars.length>0 ? guideData.cars[this.state.selectedCar] : {}} carTypes={this.props.guidesState.carTypes} storeState={this.props.storeState}/>
                            <GuideCarSelector cars={guideData.cars ? guideData.cars : []} carSelection={this.carSelection} selectedCar={this.state.selectedCar}/>
                        </> 
                    }
                </div>
            </div>
        )
    }
}
const DriverPageInfo = connect(
    (state) => ({
        storeState: state.AppReduser,
        guidesState: state.GuidesReduser
    }),
)(DriverPageInfoClass);

export default DriverPageInfo;