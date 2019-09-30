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

const cookies = new Cookies();

class GuidesListElementClass extends React.Component {
    render() {
        function findLanguageByISO(value, storeState){
            for(let i=0; i<storeState.languages.length; i++){
                if(storeState.languages[i].id===value){
                    return storeState.languages[i];
                }
            }
            return undefined;
        }
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.routeListElement;

        let element = this.props.element;
        let index = this.props.index;
        let linkAddress = "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/guides/${element.id}/`;
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
                            <Link to={linkAddress} className="placesList_placeName d-flex">
                                <div>
                                    {element.name}
                                </div>
                            </Link>
                            <div className="langi placesList_placeName d-flex" style={{paddingTop: '2px'}} key={"key"+element.id}>
                                {
                                    element.language.map((langElement, index) =>{
                                        
                                        let langObj= findLanguageByISO(langElement,this.props.storeState);
                                        return <div className="driversBlock_languages_flag" 
                                            style={{ background: "url(" + (langObj ? requests.serverAddressImg + langObj.icon.url : '') + ")",
                                            backgroundSize: "15px 15px", marginTop: '0' }} />
                                    })
                                }
                            </div>
                        </div>
                        <div className="placesList_stars">
                            <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false} commentNumberDisplay={true} />
                        </div>
                        <div className="d-flex ">
                            <div className="">{textInfo.excursions+": "+element.departurePointArray.length}</div>
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