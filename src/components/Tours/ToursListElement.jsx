import React from 'react';
import '../Places/PlacesList.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requests from '../../config';
import './ToursListElement.css'

import tagBlue from '../media/tag_blue.svg';
import guideIcon from '../media/tour-guide.svg';
import agencyIcon from '../media/agencyIcon.svg';
// import geoIcon from '../media/geo_icon.svg';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,findTagName,getCurrencies} from '../../redusers/GlobalFunction'

import Stars from '../stars/Stars';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ToursListElementClass extends React.Component {



    render() {
        let textInfo = this.props.storeState.languageTextMain.tours;
        let element = this.props.element;
        let index = this.props.index;
        let imageAddress = element.image ? (requests.serverAddressImg + element.image) : '';
        
        console.log(imageAddress);
        let slug = element.tourlocalization.slug;

        let seats =element.freeSeats ? element.freeSeats : element.seats;

        let language = element.language.map((el, index) => {
            
            for (let i = 0; i < this.props.storeState.untranslatedlanguages.length; i++) {
                if (this.props.storeState.untranslatedlanguages[i].id === el) {
                    return this.props.storeState.untranslatedlanguages[i]
                }
            }
        })

        let isoCurrencies = cookies.get('userCurr', { path: "/" })
        let idIndex = getCurrencies(element.currency, "id",this)
        let price = null
        if (this.props.storeState.currencies.length > 0) {

            let usd = element.price / this.props.storeState.currencies[idIndex].costToDefault
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
        }
        let validDepartureDate = null;
        if (this.props.departureDate) {
            validDepartureDate = this.props.departureDate.split(".");
            validDepartureDate = validDepartureDate[2] + "-" + validDepartureDate[1] + "-" + validDepartureDate[0];
        }
        //let addressFunc = function(slug){return }
        let address = "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/tours/${slug}/` + (validDepartureDate ? `?date=` + validDepartureDate : ``);
        
        let addressFunc = function (slug, that) {
            return "/" + that.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/tours/${slug}/`
        }
        return (
            <div className={this.props.placeListElementClass ? this.props.placeListElementClass : "col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3"} >
                <div className="drivers_block_element d-flex p-0 flex-column" id={index}>

                    <div className="driversBlock_carImage" style={{ background: "url(" + (element.image ? (requests.serverAddressImg + element.image) : '') + ") no-repeat", backgroundSize: "cover", width: '100%' }}>
                        {!this.props.noDateSeatsData &&
                            <>
                                <div className="toursDate">{this.props.departureDate + " | " + element.time}</div>
                                {/* <div className="toursList_ToursElHeader">{(element.isPricePerPerson ? textInfo.seats[0] : textInfo.seats[1]) + " " + seats + (element.isPricePerPerson ? textInfo.seats[2] : "")}</div> */}
                            </>
                        }

                        <div className="toursDuration d-flex justify-content-between">
                            <text>{!this.props.noDateSeatsData?(element.isPricePerPerson ? textInfo.seats[0] : textInfo.seats[1]) + " " + seats + (element.isPricePerPerson ? textInfo.seats[2] : ""):price }</text>
                            <span>{element.daysNumber + " " + textInfo.daysNumber}</span>
                        </div>
                        <Link to={address} className="driversBlock_carBlackout">
                            <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                        </Link>
                    </div>
                    <div className="placesList_info_tours d-flex flex-column justify-content-between">
                        <div className="placesList_topBlock">
                            <Link to={address} className="placesList_placeName d-flex">
                                <div>
                                    {element.tourlocalization.name}
                                </div>
                            </Link>
                            <div className="d-flex justify-content-between">

                                <div className="placesList_stars">
                                    <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false} commentNumberDisplay={true} />
                                </div>

                            </div>
                        </div>
                        {!this.props.isGuideTours &&
                            <div className="d-flex py-3 border-top">
                                <div className="toursListEl_avatar col-2">
                                    <img src={(element.author ? (requests.serverAddressImg + element.author.avatar.url) : '')} alt="" />
                                </div>
                                <div className="toursListEl_bottomContent col pr-0">
                                    <h5><Link to={"/" + cookies.get('country', { path: "/" }) + "-" + cookies.get('userLangISO', { path: "/" }) + "/guides/" + (element.author ? element.author.userSlug : "") + "/"}>{element.author ? (element.author.firstName + " " + element.author.lastName) : ""}</Link></h5>
                                    <div className="placesList_info_position_textStyle d-flex align-items-center">
                                        <p className="placesList_info_textCss">{textInfo.Languages}</p>
                                        {language.map((el, index) => (<i className="placesList_info_icons" style={{ background: "url(" + requests.serverAddressImg + el.icon.url + ")no-repeat" }} />))}
                                    </div>
                                </div>
                                <i className="placesList_info_guide my-auto col-2" style={{ background: "url(" + (element.isGuide ? guideIcon : agencyIcon) + ")no-repeat" }}><span className="placesList_info_guide-toolTip">{element.isGuide ? textInfo.guide : textInfo.agency}</span></i>
                            </div>
                        }
                    </div>
                    {
                        !this.props.isRedirectButton ?
                        <button className="driversBlock_driverInfoBlock_element driversBlock_buttonStyle"
                            onClick={() => {
                                
                                console.log(element);
                                this.props.changeTravelVisibility(element.price, this.props.elementActive, seats);
                        }}>{(element.isPricePerPerson ? textInfo.bookTours[0] : textInfo.bookTours[1]) + " " + price}</button>
                        :
                        <Link to={addressFunc(element.tourlocalization.slug, this)} className="w-100">
                            <button className="driversBlock_driverInfoBlock_element driversBlock_buttonStyle"
                            >{"Подробнее"}</button>
                        </Link>
                    }
                    
                    {
                        /*
                        <div className="d-flex justify-content-center align-items-center col-12 toursBookBt">BOOK tours</div>
                        */
                    }

                </div>
            </div>
        )
    }
}
const ToursListElement = connect(
    (state) => ({
        storeState: state.AppReduser,
        toursState: state.ToursReduser,
    }),
)(ToursListElementClass);

export default ToursListElement;