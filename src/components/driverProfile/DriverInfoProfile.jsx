import React from 'react';
import requests from '../../config';
import Stars from '../stars/Stars';
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
        
        let languageIdsArray = getLanguageNumbers(element.language ? element.language : [], this.props.storeState.languages);
        let textInfo = this.props.storeState.languageTextMain.drivers;
        return (
            <>
                <div className="driverInfo_left_line">
                    <div className="driverInfo_photo">
                        <img src={requests.serverAddressImg + element.avatar} alt={"photo " + element.name} />
                    </div>
                    <div className="block_element_infoBlock">
                        <div style={{ paddingBottom: "2px" }} key={element.rating}>
                            <div className="block_element_infoBlock_name driversInfo_driverName">{element.name}</div>
                            <Stars value={element.rating} commentNumber={element.comments ? element.comments.length + " "+textInfo.driversBlock.comments : 0} valueDisplay={true} commentNumberDisplay={true} />
                        </div>
                        <div className="block_element_infoBlock_bot">
                            <div className="d-flex ">
                                <div className="infoString infoString_driverInfoSize">{textInfo.driverInfo.languages+":"}</div>
                                <div className="d-flex">

                                    {
                                        languageIdsArray.map((langElement, index) =>
                                            <div className="driversBlock_languages_flag" style={{ background: "url(" + requests.serverAddressImg + this.props.storeState.languages[langElement].icon.url + ") no-repeat", backgroundSize: "15px 15px", margin: "auto 5px auto 0" }} />
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