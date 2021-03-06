import React from 'react';
import '../Places/PlacesList.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requests from '../../config';
import '../Guides/Guides.css';
import tagBlue from '../media/tag_blue.svg';
// import geoIcon from '../media/geo_icon.svg';

import Stars from '../stars/Stars';
import Cookies from 'universal-cookie';
import guideIcon from '../media/tour-guide.svg';
import agencyIcon from '../media/agencyIcon.svg';
import { isMobile } from 'react-device-detect';

const cookies = new Cookies();

class DriversPageListElementClass extends React.Component {
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
        let linkAddress = "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/drivers-page/${element.userSlug}/`;
        return (
            <div className={this.props.placeListElementClass ? this.props.placeListElementClass : "col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3"} >
                <div className={"drivers_block_element d-flex p-0 flex-column"} id={index}>

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
                            {
                                element.guide && 
                                <i className="placesList_info_guide my-auto col-2" style={{ background: "url(" + (guideIcon) + ")no-repeat" }}>
                                    <span className="placesList_info_guide-toolTip">{textInfoTour.guide}</span>
                                </i>
                            }
                            

                        </div>

                        <div className="d-flex ">
                            <div className="guideList_tours">{textInfo.cars + ": " + element.carsNumber}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const DriversPageListElement = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriversPageListElementClass);

export default DriversPageListElement;