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
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, findTagName, getCurrencies, isNeedDiscount } from '../../redusers/GlobalFunction'

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
        
        let seats = element.freeSeats ? element.freeSeats : element.seats;

        let language = element.language.map((el, index) => {

            for (let i = 0; i < this.props.storeState.untranslatedlanguages.length; i++) {
                if (this.props.storeState.untranslatedlanguages[i].id === el) {
                    return this.props.storeState.untranslatedlanguages[i]
                }
            }
        })

        let isoCurrencies = cookies.get('userCurr', { path: "/" })
        let idIndex = getCurrencies(element.currency, "id", this)
        let price = null
        let priceold = null
        let isNnewTour = false
        let isPlacesRunOut = false

        if(element.lastUpdate){
            let today = new Date()
            let lastUpdate = new Date(element.lastUpdate)
            if(today-lastUpdate<14 * 86400000){
                isNnewTour= true
            }
        }

        if(element.freeSeats !== element.seats && element.freeSeats < 4){
            isPlacesRunOut = true
        }

        if (this.props.storeState.currencies.length > 0) {
            console.log("isneedDiscountCall");
            let discont = isNeedDiscount(element, this.props.storeState.country, this.props.storeState.countries)
            let usd = element.price / this.props.storeState.currencies[idIndex].costToDefault
            if (isoCurrencies === "USD") {
                let idIndex = getCurrencies("USD", "ISO", this)
                usd = Math.ceil(usd)
                price = "" + this.props.storeState.currencies[idIndex].symbol + usd
                if (discont.isGood) {
                    priceold = Math.ceil(usd / (1 - discont.discount))
                    priceold = "" + this.props.storeState.currencies[idIndex].symbol + (priceold);
                }
            } else {
                let idIndex = getCurrencies(isoCurrencies, "ISO", this)
                usd = usd * this.props.storeState.currencies[idIndex].costToDefault
                usd = Math.ceil(usd)
                price = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + usd) :
                    (usd + " " + this.props.storeState.currencies[idIndex].symbol)
                if (discont.isGood) {
                    priceold = Math.ceil(usd / (1 - discont.discount))
                    priceold = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + priceold) :
                        (priceold + " " + this.props.storeState.currencies[idIndex].symbol)
                }
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

                        {/* <div className="toursDuration d-flex justify-content-between">
                            <text>{!this.props.noDateSeatsData ? (element.isPricePerPerson ? textInfo.seats[0] : textInfo.seats[1]) + " " + seats + (element.isPricePerPerson ? textInfo.seats[2] : "") : price}</text>
                        </div> */}
                        <Link to={address} className="driversBlock_carBlackout">
                            <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                        </Link>
                    </div>
                    <div className="toursDuration d-flex align-items-center justify-content-between">
                        <div className="d-flex flex-column">
                            <span>{textInfo.daysNumber0 + ": " + element.daysNumber + " " + textInfo.daysNumber}</span>
                            <text className="toursText">{!this.props.noDateSeatsData ? (element.isPricePerPerson ? textInfo.seats[0] : textInfo.seats[1]) + " " + seats + (element.isPricePerPerson ? textInfo.seats[2] : "") : ""}</text>
                        </div>
                        {
                            isPlacesRunOut || isNnewTour &&
                            <div style={isPlacesRunOut?{ background: "#f90", height: "25px" }:{background: "#00aa71", height: "25px"}} className="d-flex align-items-center align-self-start">
                                <text>{isPlacesRunOut?textInfo.bestseller[2]:isNnewTour?textInfo.bestseller[1]:""}</text>
                            </div>
                        }
                            

                    </div>
                    <div style={this.props.isGuideTours ? { maxHeight: "117px" } : {}} className="placesList_info_tours d-flex flex-column justify-content-between">

                        <div className="placesList_topBlock d-flex flex-column justify-content-between">

                            <Link to={address} className="placesList_placeName d-flex">
                                <div>
                                    {element.tourlocalization.name}
                                </div>
                            </Link>
                            {!this.props.isGuideTours &&
                                <div className="placesList_stars">
                                    <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false} commentNumberDisplay={true} />
                                </div>
                            }

                        </div>

                        <div className={this.props.isGuideTours ? "d-flex justify-content-between align-items-center pb-2" : "d-flex justify-content-between  border-top"}>
                            {!this.props.isGuideTours &&
                                <div className="d-flex justify-content-between py-3 ">
                                    <div className="toursListEl_avatar">
                                        <img src={(element.author ? (requests.serverAddressImg + element.author.avatar.url) : '')} alt="" />
                                    </div>
                                    <div className="toursListEl_bottomContent col pr-0">
                                        <h5><Link to={"/" + cookies.get('country', { path: "/" }) + "-" + cookies.get('userLangISO', { path: "/" }) + "/guides/" + (element.author ? element.author.userSlug : "") + "/"}>{element.author ? (element.author.firstName + " " + element.author.lastName) : ""}</Link></h5>
                                        <div className="placesList_info_position_textStyle d-flex align-items-center">
                                            <p className="placesList_info_textCss">{textInfo.Languages}</p>
                                            {language.map((el, index) => (<i className="placesList_info_icons" style={{ background: "url(" + requests.serverAddressImg + el.icon.url + ")no-repeat" }} />))}
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.props.isGuideTours &&
                                <div className="placesList_stars">
                                    <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false} commentNumberDisplay={true} />
                                </div>
                            }
                            <div style={this.props.isGuideTours ? { paddingTop: "0px" } : {}} className="routesPrices d-flex flex-column align-items-end">
                                <span className="routesPricesSmall">{priceold}</span>
                                <span className="routesPricesBig">{price}</span>
                                <text>{element.isPricePerPerson ? textInfo.bookTours[0] : textInfo.bookTours[1]}</text>
                            </div>

                            {/* <i className="placesList_info_guide my-auto col-2" style={{ background: "url(" + (element.isGuide ? guideIcon : agencyIcon) + ")no-repeat" }}><span className="placesList_info_guide-toolTip">{element.isGuide ? textInfo.guide : textInfo.agency}</span></i> */}
                        </div>

                    </div>
                    {/* {
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
                    } */}

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