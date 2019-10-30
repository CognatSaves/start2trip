import React from 'react';
import '../../Places/PlacesList.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requests from '../../../config';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,findTagName,getCurrencies} from '../../../redusers/GlobalFunction'

// import tagBlue from '../../media/tag_blue.svg';
// import geoIcon from '../../media/geo_icon.svg';

import Stars from '../../stars/Stars';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class RouteListElementClass extends React.Component {

    lookAvailable = (additionalParams) => {
        console.log('look available');

        let routeDate = this.props.globalhistory.getRoute(additionalParams.point, this.props.storeState.languages[this.props.storeState.activeLanguageNumber].isoAutocomplete);//this.getRoute(this.props.storeState.cities);
        let newStringCities = routeDate.route;
        let country = routeDate.country;
        let langISO = routeDate.langISO;
        if (additionalParams && additionalParams.noDate) {
            this.props.globalhistory.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/drivers/${newStringCities}/`);
        }
        else {
            let dateString = this.props.globalhistory.createDateTimeString(new Date(), true);
            this.props.globalhistory.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/drivers/${newStringCities}?date=` + dateString);
        }


    }
 

    render() {
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.routeListElement;
        function createRouteString(points) {
            let res = '';
            let start = textInfo.from;
            res = start;
            function cutLastElement(point) {

                let pieces = point.split(',');
                if (pieces.length === 1) {
                    return pieces;
                }
                else {
                    let cuttedEl = '';
                    for (let k = 0; k < pieces.length - 1; k++) {
                        cuttedEl += pieces[k];
                    }
                    return cuttedEl;
                }
            }
            for (let i = 0; i < points.length; i++) {
                res += ' ' + cutLastElement(points[i].point) + ' ';
                if (i !== points.length - 1) {
                    res += ' ' + '→' + ' '
                }
            }
            return res;
        }
        let element = this.props.element;
        let index = this.props.index;
        let linkString = "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) +
            `/routes/${element.placelocalization.slug}/`;


            
        let isoCurrencies = cookies.get('userCurr', { path: "/" })
        let price = null
        let usd = element.price
        if (isoCurrencies === "USD") {
            let idIndex = getCurrencies("USD", "ISO",this)
            usd = Math.ceil(usd)
            price = "" + this.props.storeState.currencies[idIndex].symbol + usd
        } else {
            let idIndex = getCurrencies(isoCurrencies, "ISO",this)
            usd = usd * this.props.storeState.currencies[idIndex].costToDefault
            usd = Math.ceil(usd)
            price = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + usd) :
                (usd + " " + this.props.storeState.currencies[idIndex].symbol)
        }

        
        return (
            <div className={this.props.routeListElementClass ? this.props.routeListElementClass : "col-lg-3 col-md-4 col-sm-6 col-12 p-2 mb-3 "}>
                <div className="drivers_block_element d-flex p-0 flex-column" id={index}>
                    <div className="driversBlock_carImage" style={{ background: "url(" + (element.image ? (requests.serverAddressImg + element.image) : '') + ") no-repeat", backgroundSize: "cover", width: '100%' }}>
                        <Link to={linkString} className="driversBlock_carBlackout">
                            <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                        </Link>
                        <div className="toursDuration d-flex justify-content-between">
                            <text>{textInfo.from + price}</text>
                            <span>{1 + " " + textInfo.daysNumber}</span>
                        </div>
                    </div>
                    <div className="placesList_info routes_info d-flex flex-column">
                        <Link to={linkString} className="placesList_placeName d-flex">
                            <div>
                                {element.placelocalization.name}
                            </div>
                        </Link>

                        <div className="placesList_stars">
                            <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false} commentNumberDisplay={true} />
                        </div>
                        {
                            /*
                            <div className="d-flex placesList_info_position placesList_info_position_tags">
                                <img src={tagBlue} height="12px" width="12px" alt="tagBlue"/>
                                <div className="placesList_info_position_textStyle">{element.tagsArray.map((tag, tagIndex)=><text>{ this.props.findTagName(tag) +(element.tagsArray.length-1>tagIndex ? ",":"")+" "}</text>) }</div>
                            </div>
                            */
                        }

                        <div className="d-flex placesList_info_position placesList_info_position_loc">

                            <div className="placesList_info_position_textStyle">{createRouteString(element.placelocalization.points)}</div>
                        </div>
                    </div>
                    <span className="placesList_info_button" onClick={() => this.lookAvailable({ noDate: false, point: element.placelocalization.points })}>{textInfo.seeOffers}</span>
                </div>

            </div>
        )
    }
}
const RouteListElement = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalhistory: state.GlobalReduser,
    }),
)(RouteListElementClass);

export default RouteListElement;