import React from 'react';
import '../Places/PlacesList.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requests from '../../config';
import './Guides.css';
import tagBlue from '../media/tag_blue.svg';
// import geoIcon from '../media/geo_icon.svg';

import Stars from '../stars/Stars';

import guideIcon from '../media/tour-guide.svg';
import agencyIcon from '../media/agencyIcon.svg';
import { isMobile } from 'react-device-detect';
import { findLanguageById, findCategoryById } from '../../redusers/GlobalFunction'

import seatIcon from '../media/seat.svg';
import no_smokingIcon from '../media/no-smoking.svg'
import snowflakeIcon from '../media/snowflake.svg'
import wifiIcon from '../media/wifi.svg'

const InfoBlock = (params) => {

    const CarParamsIcon = (params) => {
        let {value, icon} = params;
        return value && <i className="driverInfo_comfortIconStyle" style={{margin: 'auto 0px auto 5px',width:'14px', height: '14px', background: "url(" + icon + ") no-repeat", backgroundSize: "13px 13px" }} />
    }
    let {nameArr, valueArr, typeArr,textInfo} = params;
    return (
        <div className="d-flex flex-row w-100" style={{fontSize: '14px'}}>
            <div className="d-flex flex-column listElementLeftColumn">
                {
                    nameArr.map((nameEl, nameId)=>{
                        return(
                            <div style={{color: '#666'}}>{nameEl+':'}</div>
                        )
                    })
                }
            </div>
            <div className="d-flex flex-column" style={{overflow: 'hidden'}}>
                {
                    valueArr.map((valueEl, valueId)=>{                 
                        switch(typeArr[valueId]){
                            case 'array':{
                                return <div style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                        {
                                            valueEl.length>0 ? valueEl.map((el, id)=>
                                                <text>{el+(id!==valueEl.length-1 ? ', ' : '')}</text>) :
                                                <text>{textInfo.empty}</text>
                                        }
                                        </div>
                                break;
                            }
                            case 'boolean':{
                                return <div>{valueEl ? textInfo.exist : textInfo.notExist}</div>
                                break;
                            }
                            case 'textarea':{
                                return <div style={{height: '44px', overflow:'hidden'}}>{valueEl}</div>
                                break;
                            }
                            case 'car':{
                                return <div className="d-flex flex-row" style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                    {
                                        valueEl.length>0 ? valueEl.map((car, carID) => {
                                            debugger;
                                            return <div className="d-flex flex-row" style={{marginRight: '5px'}}>
                                                <text>{car.carBrand + ' ('+car.seats+' '+textInfo.seats+')'}</text>
                                                <CarParamsIcon value={car.leatherInterior} icon={seatIcon}/>
                                                <CarParamsIcon value={!car.smokingPermit} icon ={no_smokingIcon}  />
                                                <CarParamsIcon value={car.climatControl} icon={snowflakeIcon} />
                                                <CarParamsIcon value={car.freeWiFi} icon={wifiIcon} />
                                                {
                                                    carID!==valueEl.length-1 && <text>{';'}</text>
                                                }                                           
                                            </div>
                                        }
                                            
                                        ) : <text>{textInfo.empty}</text>
                                    }
                                </div>
                            }
                            default:{//like string or undefined
                                return <div>{valueEl && String(valueEl).length>0 ? valueEl : textInfo.empty}</div>
                            }
                        }                
                    })
                }
            </div>
        </div>
    );
}
class GuidesListElementClass extends React.Component {
    render() {
        function valueArrayGenerator(element, that, type){
            switch(type){
                case 'guide':{
                    let valueArr = [element.city, 
                        findLanguageById({array:element.language, isElArray: true, languages: that.props.storeState.untranslatedlanguages, onlyNames: true}),
                        element.carExist,element.departurePointArray.length,
                        findCategoryById({array:element.categories, isElArray: true, categories: that.props.guidesState.categories, onlyNames: true}),
                        element.dataAbout];
                    return valueArr;
                    break;
                }
                case 'driverPage':{
                    
                    let valueArr = [
                        element.city,
                        findLanguageById({array:element.language, isElArray: true, languages: that.props.storeState.untranslatedlanguages, onlyNames: true}),
                        element.cars,
                        element.dataAbout
                    ]
                    return valueArr;
                    break;
                }
                default:
                    return undefined;
            }
        }
        function findLanguageByISO(value, storeState) {
            for (let i = 0; i < storeState.untranslatedlanguages.length; i++) {
                if (storeState.untranslatedlanguages[i].id === value) {
                    return storeState.untranslatedlanguages[i];
                }
            }
            return undefined;
        }
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.routeListElement;
        let textInfoTour = this.props.storeState.languageTextMain.tours;
        let element = this.props.element;
        let index = this.props.index;
        let linkAddress = this.props.linkAddress;

        let nameArr = this.props.nameArr;
        let typeArr = this.props.typeArr;
        let valueArr = valueArrayGenerator(element, this, this.props.elementType);
        return (
            <div className={this.props.placeListElementClass ? this.props.placeListElementClass : "col-12 py-2"} >

            {
                /*


                    <div className="d-flex flex-column guidesList_info">
                        <div className="d-flex flex-row">
                           
                            <div className="langi guideList_placeName d-flex" style={{ paddingTop: '2px' }} key={"key" + element.id}>
                                {
                                    element.language.map((langElement, index) => {

                                        let langObj = findLanguageByISO(langElement, this.props.storeState);
                                        return <div className="driversBlock_languages_flag"
                                            style={{
                                                background: "url(" + (langObj ? requests.serverAddressImg + langObj.icon.url : '') + ")",
                                                backgroundSize: "15px 15px", marginTop: '0'
                                            }} />
                                    })
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                            
                            

                        </div>

                        <div className="d-flex ">
                            <div className="guideList_tours">{textInfo.excursions + ": " + element.departurePointArray.length}</div>
                        </div>
                    </div>
                </div>

                */
            }
                <div className={"drivers_block_element d-flex p-0 flex-md-row flex-column h-md-100"} id={index}>
                    <div className="col-12 col-md-4 col-lg-3 p-0 h-md-100 imageMinHeight">
                        <div className="driversBlock_carImage h-md-100 noBorderRaduis imageMinHeight" style={{ background: "url(" + (element.image ? (requests.serverAddressImg + element.image) : '') + ") no-repeat", backgroundSize: "cover", width: '100%' }}>
                            <Link to={linkAddress} className="driversBlock_carBlackout noBorderRaduis">
                                <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-9 d-flex flex-column dataBlockStyle">
                        <div className="col-12 d-flex flex-row justify-content-between p-0 mb-auto">
                            <div className="flex-column">
                                <Link to={linkAddress} className="guideList_placeName d-flex">
                                    <div>
                                        {element.name}
                                    </div>
                                </Link>
                                <div className="placesList_stars">
                                    <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10}
                                     commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false}
                                     commentNumberDisplay={true} changeStarsBlock={' guidesBigStars'}/>
                                </div>
                            </div>
                            {
                                (element.guide || !this.props.isNotAgency) &&
                                <i className="placesList_info_guide mb-auto" style={{ background: "url(" + (element.guide ? guideIcon : agencyIcon) + ")no-repeat" }}>
                                    <span className="placesList_info_guide-toolTip">{element.guide ? textInfoTour.guide : textInfoTour.agency}</span>
                                </i>
                            }
                            
                        </div>
                        {
                            
                            <InfoBlock nameArr={nameArr}
                                valueArr={valueArr} typeArr={typeArr} textInfo={textInfo}/>
                            
                        }
                    </div>
                    

                    
                </div>
            </div>
        )
    }
}
const GuidesListElement = connect(
    (state) => ({
        storeState: state.AppReduser,
        guidesState: state.GuidesReduser,
    }),
)(GuidesListElementClass);

export default GuidesListElement;



/*
import React from 'react';
import '../Places/PlacesList.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requests from '../../config';
import './Guides.css';
import tagBlue from '../media/tag_blue.svg';
// import geoIcon from '../media/geo_icon.svg';

import Stars from '../stars/Stars';
import Cookies from 'universal-cookie';
import guideIcon from '../media/tour-guide.svg';
import agencyIcon from '../media/agencyIcon.svg';
import { isMobile } from 'react-device-detect';

const cookies = new Cookies();

class GuidesListElementClass extends React.Component {
    render() {
        function findLanguageByISO(value, storeState) {
            for (let i = 0; i < storeState.untranslatedlanguages.length; i++) {
                if (storeState.untranslatedlanguages[i].id === value) {
                    return storeState.untranslatedlanguages[i];
                }
            }
            return undefined;
        }
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.routeListElement;
        let textInfoTour = this.props.storeState.languageTextMain.tours;
        let element = this.props.element;
        let index = this.props.index;
        let linkAddress = "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/guides/${element.userSlug}/`;
        return (
            <div className={this.props.placeListElementClass ? this.props.placeListElementClass : "col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3"} >
                <div className={"drivers_block_element d-flex p-0 flex-column h-100"} id={index}>

                    <div className="driversBlock_carImage" style={{ background: "url(" + (element.image ? (requests.serverAddressImg + element.image) : '') + ") no-repeat", backgroundSize: "cover", width: '100%' }}>
                        <Link to={linkAddress} className="driversBlock_carBlackout">
                            <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                        </Link>
                    </div>

                    <div className="d-flex flex-column guidesList_info">
                        <div className="d-flex flex-row">
                            <Link to={linkAddress} className="guideList_placeName d-flex">
                                <div>
                                    {element.name}
                                </div>
                            </Link>
                            <div className="langi guideList_placeName d-flex" style={{ paddingTop: '2px' }} key={"key" + element.id}>
                                {
                                    element.language.map((langElement, index) => {

                                        let langObj = findLanguageByISO(langElement, this.props.storeState);
                                        return <div className="driversBlock_languages_flag"
                                            style={{
                                                background: "url(" + (langObj ? requests.serverAddressImg + langObj.icon.url : '') + ")",
                                                backgroundSize: "15px 15px", marginTop: '0'
                                            }} />
                                    })
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                            <div className="placesList_stars">
                                <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false} commentNumberDisplay={true} />
                            </div>
                            <i className="placesList_info_guide my-auto col-2" style={{ background: "url(" + (element.guide ? guideIcon : agencyIcon) + ")no-repeat" }}>
                                <span className="placesList_info_guide-toolTip">{element.guide ? textInfoTour.guide : textInfoTour.agency}</span>
                            </i>

                        </div>

                        <div className="d-flex ">
                            <div className="guideList_tours">{textInfo.excursions + ": " + element.departurePointArray.length}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const GuidesListElement = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(GuidesListElementClass);

export default GuidesListElement;

*/