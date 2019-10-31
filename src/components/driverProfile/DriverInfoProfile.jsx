import React from 'react';
import requests from '../../config';
import Stars from '../stars/Stars';
import guideIcon from '../media/tour-guide.svg';
import agencyIcon from '../media/agencyIcon.svg';
import { isMobile } from 'react-device-detect';

class DriverInfoProfile extends React.Component{
    render(){
        //компонент, отрисовывающий информацию о водителе в DriverInfo
        //получает element - водитель, 
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
        let element = this.props.element;
        
        let languageIdsArray = getLanguageNumbers(element.language ? element.language : [], this.props.storeState.untranslatedlanguages);
        let textInfo = this.props.storeState.languageTextMain.drivers;
        let textInfoTour = this.props.storeState.languageTextMain.tours;
        return (
            <>
                <div className="driverInfo_left_line">
                    <div className="driverInfo_photo">
                        <img src={requests.serverAddressImg + element.avatar} alt={"photo " + element.name} />
                    </div>
                    <div className="block_element_infoBlock">
                        <div className="d-flex flex-column" style={{ paddingBottom: "2px" }} key={element.rating}>
                            <div className="d-flex flex-row">
                                <div className="block_element_infoBlock_name driversInfo_driverName" style={{whiteSpace: 'nowrap'}}>{element.name}</div>
                                {
                                    this.props.needGuideIcon && !isMobile &&
                                    <i className="placesList_info_guide my-auto col-2" style={{marginLeft: '10px', background: "url(" + (element.guide  ? guideIcon : agencyIcon) + ")no-repeat" }}>
                                        <span className="placesList_info_guide-toolTip">{element.guide  ? textInfoTour.guide : textInfoTour.agency}</span>
                                    </i>
                                }
                                
                            </div>
                            
                            <Stars value={element.rating} commentNumber={element.comments ? element.comments.length + " "+textInfo.driversBlock.comments : 0} valueDisplay={true} commentNumberDisplay={true} />
                        </div>
                        <div className="block_element_infoBlock_bot">
                            <div className="d-flex ">
                                <div className="infoString infoString_driverInfoSize">{textInfo.driverInfo.languages+":"}</div>
                                <div className="d-flex">

                                    {
                                        languageIdsArray.map((langElement, index) =>
                                            <div className="driversBlock_languages_flag" style={{ background: "url(" + requests.serverAddressImg + this.props.storeState.untranslatedlanguages[langElement].icon.url + ") no-repeat", backgroundSize: "15px 15px", margin: "auto 5px auto 0" }} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="driverInfo_left_line">
                    <div className="valueBlock_commentary px-3">
                        {element.dataAbout}
                    </div>
                </div>
            </>
                
        )
    }
}
export default DriverInfoProfile;