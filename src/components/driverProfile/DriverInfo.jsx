import React from 'react';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
import requests from '../../config';

import Stars from '../stars/Stars';
import information from '../media/information.svg';
import Carousel from './Carousel';

class DriverInfoClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        function getCarTypeNumber(element, carTypes) {
            for (let i = 0; i < carTypes.length; i++) {
                if (carTypes[i].id === element.carType) {
                    return i;
                }
            }
            return -1;
        }
        function createCorrectUrls(urlArray) {
            let res = [];
            for (let i = 0; i < urlArray.length; i++) {
                res[i] = requests.serverAddress + urlArray[i];
            }
            return res;
        }
        function getLanguageNumbers(userLang, langArray) {
            let res = [];
            for (let i = 0; i < userLang.length; i++) {
                for (let k = 0; k < langArray.length; k++) {
                    if (userLang[i] === langArray[k].ISO) {
                        res[i] = k;
                        continue;
                    }
                }
            }
            return res;
        }
        console.log("DriverInfo render", this.props);

        const { element } = this.props;
        let carComfort = element.carComfort ? element.carComfort : [];
        let carTypeNumber = getCarTypeNumber(element, this.props.driversState.carTypes);
        let imageUrls = createCorrectUrls(element.carImages ? element.carImages : []);
        console.log('PhotoArray', this.state.photoArray);
        console.log('imageUrls', imageUrls);

        let languageIdsArray = getLanguageNumbers(element.language ? element.language : [], this.props.storeState.languages);
        return (
            <div className="driverInfo_background d-flex flex-lg-row flex-column align-items-lg-start align-items-center">
                <div className="block_element_left d-flex flex-column col-lg-6 col-12 ">
                    <div className="driverInfo_left_line">
                        <div className="driverInfo_photo">
                            <img src={requests.serverAddressImg + element.avatar} alt={"photo " + element.name} />
                        </div>
                        <div className="block_element_infoBlock">
                            <div style={{ paddingBottom: "2px" }} key={element.rating}>
                                <div className="block_element_infoBlock_name driversInfo_driverName">{element.name}</div>
                                <Stars value={element.rating} commentNumber={element.comments ? element.comments.length + " отзывов" : 0} valueDisplay={true} commentNumberDisplay={true} />
                            </div>
                            <div className="block_element_infoBlock_bot">
                                <div className="d-flex ">
                                    <div className="infoString infoString_driverInfoSize">Языки:</div>
                                    <div className="d-flex">

                                        {
                                            languageIdsArray.map((langElement, index) =>
                                                <div className="driversBlock_languages_flag" style={{ background: "url(" + requests.serverAddressImg + this.props.storeState.languages[langElement].icon.url + ") no-repeat", backgroundSize: "15px 15px", margin: "auto 5px auto 0" }} />
                                            )
                                        }
                                    </div>
                                </div>
                                {/* <div className="d-flex ">
                                <div className="infoString infoString_driverInfoSize">За рулем:</div>
                                <div className="visibleString">{element.drivingAge + " лет"}</div>
                            </div> */}
                            </div>

                        </div>
                        {/* <div className="driverInfo_bookmarkElement"></div> */}
                    </div>
                    <div className="driverInfo_left_line">
                        <div className="valueBlock_commentary pr-1">
                            {element.dataAbout}
                        </div>
                    </div>
                </div>
                <div className="driverInfo_element d-flex flex-column col-lg-6 col-12 p-0" >
                    <div className="d-flex flex-md-row flex-column justify-content-between col-12">
                        <div className="block_element_infoBlock_name driversInfo_driverName d-flex" >
                            {element.carBrand}
                            <div className="driverInfo_informationIcon" style={{ background: "url(" + information + ")", backgroundSize: "18px 18px" }}>
                                <div className="driverInfo_informationBlock">
                                    {
                                        carComfort.map((element, index) =>
                                            element ?
                                                <div className="d-flex">
                                                    <i className="driverInfo_comfortIconStyle" style={{ background: "url(" + this.props.storeState.comfort[index].icon + ") no-repeat", backgroundSize: "15px 15px" }} />
                                                    <span className="driverInfo_comfortTextStyle">{this.props.storeState.comfort[index].title}</span>
                                                </div>
                                                :
                                                <React.Fragment />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="driverInfo_carTypeValue">{carTypeNumber >= 0 ? (this.props.driversState.carTypes[carTypeNumber].name_en + ', ' + element.carCapacity + ' места') : ''}</div>
                    </div>
                    <Carousel photoArray={imageUrls} type={isMobileOnly ? "horizontal" : "vertical"} />

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