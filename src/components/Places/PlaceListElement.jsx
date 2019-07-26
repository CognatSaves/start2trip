import React from 'react';
import './PlacesList.css';
import Stars from '../stars/Stars';
import { Link } from 'react-router-dom';
import requests from '../../config';
import tagBlue from '../media/tag_blue.svg';
import geoIcon from '../media/geo_icon.svg';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class PlaceListElementClass extends React.Component{
    render(){
    let textInfo = this.props.storeState.languageTextMain.home.homeBottom.routeListElement;
        
    let element = this.props.element;
    let index = this.props.index;
    return(
        <div className={this.props.placeListElementClass ? this.props.placeListElementClass : "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3"} >
            <div className={"drivers_block_element d-flex p-0 flex-column"} id={index}>                       
                <div className="driversBlock_carImage" style={{ background: "url(" + (element.image ? (requests.serverAddress+element.image) : '') + ") no-repeat", backgroundSize: "cover", width: '100%' }}>
                    <Link to={"/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+`/place/${element.placelocalization.slug}`} className="driversBlock_carBlackout">
                        <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                    </Link>
                </div>
                <div className="placesList_info d-flex flex-column">
                    <Link to={"/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+`/place/${element.placelocalization.slug}`} className="placesList_placeName d-flex">
                        <div>
                            {element.placelocalization.name}
                        </div>
                    </Link>
                    
                    <div className="placesList_stars">
                        <Stars key={index+"/"+element.rating} value={Math.ceil(element.rating*10)/10} commentNumber={element.comments+" отзывов"} valueDisplay={element.rating>0 ? true : false} commentNumberDisplay={true}/>
                    </div>
                    <div className="d-flex placesList_info_position placesList_info_position_tags">
                        <img src={tagBlue} height="12px" width="12px" alt="tagBlue"/>
                        <div className="placesList_info_position_textStyle">{element.tagsArray.map((tag, tagIndex)=><text>{ this.props.findTagName(tag) +(element.tagsArray.length-1>tagIndex ? ",":"")+" "}</text>) }</div>
                    </div>
                    <div className="d-flex placesList_info_position placesList_info_position_loc">
                       
                        <div className="placesList_info_position_textStyle" style={{color: '#686868', fontSize: '14px'}}>{element.placelocalization.location}</div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}
const PlaceListElement = connect(
    (state) => ({
        storeState: state.AppReduser, 
    }),
  )(PlaceListElementClass);
  
export default PlaceListElement;