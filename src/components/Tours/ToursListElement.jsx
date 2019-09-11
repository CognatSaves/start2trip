import React from 'react';
import '../Places/PlacesList.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requests from '../../config';
import './ToursListElement.css'

import tagBlue from '../media/tag_blue.svg';
// import geoIcon from '../media/geo_icon.svg';

import Stars from '../stars/Stars';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ToursListElementClass extends React.Component {
    render() {
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.routeListElement;
        let element = this.props.element;
        let index = this.props.index;
        let imageAddress = element.image ? (requests.serverAddressImg + element.image) : '';
        console.log(imageAddress);
        let slug = element.tourlocalization.slug;

        slug = 'poezdka-iz-minska-v-mirskiy-i-nesvizhskiy-zamok';// стоит на время ремонта. По окончании, убрать. Схожая вещь лежит в tourDescription


        return (
            <div className={this.props.placeListElementClass ? this.props.placeListElementClass : "col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3"} >
                <div className={"drivers_block_element d-flex p-0 flex-column"} id={index}>
                    <div className="toursDate">27.03.2019</div>
                    <div className="driversBlock_carImage" style={{ background: "url(" + (element.image ? (requests.serverAddressImg + element.image) : '') + ") no-repeat", backgroundSize: "cover", width: '100%' }}>
                        <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/tours/${slug}/`} className="driversBlock_carBlackout">
                            <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                        </Link>
                    </div>
                    <div className="placesList_info d-flex flex-column">
                        <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/tours/${slug}/`} className="placesList_placeName d-flex">
                            <div>
                                {element.tourlocalization.name}
                            </div>
                        </Link>

                        <div className="placesList_stars">
                            <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false} commentNumberDisplay={true} />
                        </div>
                        <div className="d-flex placesList_info_position toursNumberPeoples">
                            <div className="placesList_info_position_textStyle">{"Number of the people 15"}</div>
                        </div>
                        <div className="d-flex align-items-center placesList_info_position placesList_info_position_tags mb-1">
                            <img src={tagBlue} height="12px" width="12px" alt="tagBlue" />
                            <div className="placesList_info_position_textStyle">{element.tagsArray.map((tag, tagIndex) => <text>{this.props.findTagName(tag) + (element.tagsArray.length - 1 > tagIndex ? "," : "") + " "}</text>)}</div>
                        </div>
                        <div className="d-flex placesList_info_position placesList_info_position_loc">
                            <div className="placesList_info_position_textStyle">{element.tourlocalization.location}</div>
                        </div>
                        
                   </div>
                   <div className="d-flex justify-content-center align-items-center col-12 toursBookBt">BOOK tours</div>
                </div>
            </div>
        )
    }
}
const ToursListElement = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(ToursListElementClass);

export default ToursListElement;