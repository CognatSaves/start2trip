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
import { isMobile, isMobileOnly } from 'react-device-detect';
import Stars from '../stars/Stars';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ListElementImage = (props) => {
    let {element, that, textInfo, address} = props;
    return (
        <div className="driversBlock_carImage" style={{ background: "url(" + (element.image ? (requests.serverAddressImg + element.image) : '') + ") no-repeat", backgroundSize: "cover", width: '100%' }}>
            {!that.props.noDateSeatsData &&
                <>
                    <div className="toursDate">{that.props.departureDate + " | " + element.time}</div>
                </>
            }
            <Link to={address} className="driversBlock_carBlackout">
                <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
            </Link>
        </div>
    )
}

const TourNameBlock = (props) => {
    let {element, address, index, textInfo,  that,tourNameElementClass } = props;
    return (
        <div className="placesList_topBlock d-flex flex-column justify-content-between">

            <Link to={address} className={"placesList_placeName d-flex "+(tourNameElementClass ? tourNameElementClass : '')}>
                <div>
                    {element.tourlocalization.name}
                </div>
            </Link>
            {!that.props.isGuideTours &&
                <div className="placesList_stars">
                    <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false} commentNumberDisplay={true} />
                </div>
            }

        </div>
    )
}

const PriceBlock = (props) => {
    let {topBlockClass, isGuideTours, pricePerPersonOld, pricePerPerson, textInfo, element} = props;
    return (
        <div style={isGuideTours ? { paddingTop: "0px" } : {}} className={topBlockClass}>
            <span className="routesPricesSmall">
                {pricePerPersonOld ? /*(priceold+'('+'от '+pricePerPersonOld+')')*/ (!element.isPricePerPerson ? 'от ' : '')+pricePerPersonOld : ''}
            </span>
            <span className="routesPricesBig">{/*price + '('*/}
            {
                !element.isPricePerPerson &&
                    <text style={{color: '#999', fontWeight: '500', fontSize: '14px', lineHeight: '16px', marginTop: 'auto', paddingRight: '5px'}}>{'от'}</text>
            }
                
            {pricePerPerson/*+')'*/}</span>
            <text>{/*(element.isPricePerPerson ? textInfo.bookTours[0] : textInfo.bookTours[1]) + ' ('+*/textInfo.bookTours[0]/*+')'*/}</text>
        </div>
    )
}
const TourPropsBlock = (props)=> {
    let {textInfo, element, seats,noDateSeatsData} = props;
    return(
        <>
            <span>{textInfo.daysNumber0 + ": " + element.daysNumber + " " + textInfo.daysNumber}</span>
            <text className="toursText">{!noDateSeatsData ? 
                (element.isPricePerPerson ? textInfo.seats[0] : textInfo.seats[1]) +
                " " + seats + (element.isPricePerPerson ? textInfo.seats[2] : "") : ""}
            </text>
        </>
    )
}
class ToursListElementClass extends React.Component {



    render() {
        let textInfo = this.props.storeState.languageTextMain.tours;
        let element = this.props.element;
        let index = this.props.index;
        let imageAddress = element.image ? (requests.serverAddressImg + element.image) : '';

        // console.log(imageAddress);
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
        let pricePerPerson = null;
        let pricePerPersonOld = null;
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
            // console.log("isneedDiscountCall");
            let discont = isNeedDiscount(element, this.props.storeState.country, this.props.storeState.countries)
            let value = element.price / this.props.storeState.currencies[idIndex].costToDefault;

            let targetedIdIndex = getCurrencies(isoCurrencies, "ISO", this)
            let selectedCurrency = this.props.storeState.currencies[targetedIdIndex];
            value = value * selectedCurrency.costToDefault
            value = Math.ceil(value)
            let tempPricePerPerson = element.isPricePerPerson ? value : Math.ceil(value / seats * 100)/100;

            pricePerPerson = selectedCurrency.isLeft ? (selectedCurrency.symbol + tempPricePerPerson) :
                (tempPricePerPerson + selectedCurrency.symbol)
            if (discont.isGood) {
                let tempPricePerPersonOld = element.isPricePerPerson ? Math.ceil(value / (1 - discont.discount)) : Math.ceil(value / (1 - discont.discount) * 100) /100;
                
                pricePerPersonOld = selectedCurrency.isLeft ? (selectedCurrency.symbol +tempPricePerPersonOld) :
                    (tempPricePerPersonOld + selectedCurrency.symbol)
            }


            // if (isoCurrencies === "USD") {
            //     let targetedIdIndex = getCurrencies("USD", "ISO", this)
            //     let selectedCurrency = this.props.storeState.currencies[targetedIdIndex];
            //     usd = Math.ceil(usd);
            //     let tempPricePerPerson = element.isPricePerPerson ? usd : Math.ceil(usd / seats * 100)/100;


            //     price = "" + selectedCurrency.symbol + usd
            //     pricePerPerson = "" + selectedCurrency.symbol + tempPricePerPerson
            //     if (discont.isGood) {
            //         debugger;
            //         priceold = Math.ceil(usd / (1 - discont.discount));
            //         let tempPricePerPersonOld = element.isPricePerPerson ? priceold : Math.ceil(usd / (1 - discont.discount) * 100) /100;
                    
            //         priceold = "" + selectedCurrency.symbol + (priceold);
            //         pricePerPersonOld = "" + selectedCurrency.symbol + (tempPricePerPersonOld);
            //     }
            // } else {
            //     let targetedIdIndex = getCurrencies(isoCurrencies, "ISO", this)
            //     let selectedCurrency = this.props.storeState.currencies[targetedIdIndex];
            //     usd = usd * selectedCurrency.costToDefault
            //     usd = Math.ceil(usd)
            //     let tempPricePerPerson = element.isPricePerPerson ? usd : Math.ceil(usd / seats * 100)/100;

            //     price = selectedCurrency.isLeft ? (selectedCurrency.symbol + " " + usd) :
            //         (usd + " " + selectedCurrency.symbol)
            //     pricePerPerson = selectedCurrency.isLeft ? (selectedCurrency.symbol + " " + tempPricePerPerson) :
            //         (tempPricePerPerson + " " + selectedCurrency.symbol)
            //     if (discont.isGood) {
            //         priceold = Math.ceil(usd / (1 - discont.discount))
            //         let tempPricePerPersonOld = element.isPricePerPerson ? priceold : Math.ceil(usd / (1 - discont.discount) * 100) /100;
                    
            //         priceold = selectedCurrency.isLeft ? (selectedCurrency.symbol + " " + priceold) :
            //             (priceold + " " + selectedCurrency.symbol)
            //         pricePerPersonOld = selectedCurrency.isLeft ? (selectedCurrency.symbol + " " + tempPricePerPersonOld) :
            //             (tempPricePerPersonOld + " " + selectedCurrency.symbol)
            //     }
            // }

            /*
            if (isoCurrencies === "USD") {
                let idIndex = getCurrencies("USD", "ISO", this)
                usd = Math.ceil(usd);
                let tempPricePerPerson = element.isPricePerPerson ? usd : Math.ceil(usd / seats * 100)/100;


                price = "" + this.props.storeState.currencies[idIndex].symbol + usd
                pricePerPerson = "" + this.props.storeState.currencies[idIndex].symbol + tempPricePerPerson
                if (discont.isGood) {
                    debugger;
                    priceold = Math.ceil(usd / (1 - discont.discount));
                    let tempPricePerPersonOld = element.isPricePerPerson ? priceold : Math.ceil(usd / (1 - discont.discount) * 100) /100;
                    
                    priceold = "" + this.props.storeState.currencies[idIndex].symbol + (priceold);
                    pricePerPersonOld = "" + this.props.storeState.currencies[idIndex].symbol + (tempPricePerPersonOld);
                }
            } else {
                let idIndex = getCurrencies(isoCurrencies, "ISO", this)
                let selectedCurrency = this.props.storeState.currencies[idIndex];
                usd = usd * this.props.storeState.currencies[idIndex].costToDefault
                usd = Math.ceil(usd)
                let tempPricePerPerson = element.isPricePerPerson ? usd : Math.ceil(usd / seats * 100)/100;

                price = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + usd) :
                    (usd + " " + this.props.storeState.currencies[idIndex].symbol)
                pricePerPerson = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + tempPricePerPerson) :
                    (tempPricePerPerson + " " + this.props.storeState.currencies[idIndex].symbol)
                if (discont.isGood) {
                    priceold = Math.ceil(usd / (1 - discont.discount))
                    let tempPricePerPersonOld = element.isPricePerPerson ? priceold : Math.ceil(usd / (1 - discont.discount) * 100) /100;
                    
                    priceold = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + priceold) :
                        (priceold + " " + this.props.storeState.currencies[idIndex].symbol)
                    pricePerPersonOld = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + tempPricePerPersonOld) :
                        (tempPricePerPersonOld + " " + this.props.storeState.currencies[idIndex].symbol)
                }
            }


            */
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
        console.log('TourListElement render');
        console.log(element);
        //
        let isAnotherClass = this.props.placeListElementClass ? true : false;
        let isWide =  !(this.props.toursState.tourPageVisualType==='thin') ; // because now 'wide' is equal to default - if we have smth !=='thin' -> use 'wide'
        return (
            <> 
                <div className={'drivers_block_element flex-md-row flex-column col-12 p-0 ' + (!isAnotherClass && isWide ? 'd-flex' : 'd-none')} style={{marginBottom: '10px'}}>
                    <div className='col-md-3 col-12 p-0 driversBlock_carImageHeigth' style={{/*maxHeight: '300px'*/}}>
                        <ListElementImage element={element} that={this} textInfo={textInfo} address={address}/>
                    </div>
                    <div className="col-md-9 col-12 d-flex flex-row justify-content-between toursListElement" style={{fontSize: '14px', padding: '0 15px'}}>
                        <div className="d-flex flex-column" style={{padding: '20px 0'}}>
                            <div style={{height: '50px'}}>
                                <TourNameBlock address={address} element={element} index={index} textInfo={textInfo} that={this}
                                    tourNameElementClass={'tourNameElementClass'}
                                />
                            </div>
                            <div style={{height: '30px', display: isPlacesRunOut?textInfo.bestseller[2]:isNnewTour?'block':'none'}}>
                                <div style={isPlacesRunOut?{ background: "#f90" }:{background: "#00aa71"}} className="d-flex wideTourFlagBlock">
                                    <text style={{margin: 'auto'}}>{isPlacesRunOut?textInfo.bestseller[2]:isNnewTour?textInfo.bestseller[1]:""}</text>
                                </div>
                            </div>
                            <div className="d-flex flex-column" style={{height: '80px'}}>
                            <div className="d-flex flex-row">
                                <div className="wideTourDataType">{textInfo.Languages}</div>
                                <div className="wideTourDataType">{language.map((langEl, langId)=><text>{langEl.languageName}</text>)}</div>
                            </div>
                            <div className="d-flex flex-row">
                                    <div className="wideTourDataType">{textInfo.author}</div>
                                    <div className="wideTourDriverLink">
                                        <Link to={"/" + cookies.get('country', { path: "/" }) + "-" + cookies.get('userLangISO', { path: "/" }) + "/guides/" +
                                            (element.author ? element.author.userSlug : "") + "/"}>{element.author ? (element.author.firstName + " " + element.author.lastName) : ""}
                                        </Link>
                                    </div>
                            </div>
                            <div className=" d-flex flex-row" style={{height: '40px', overflow: 'hidden'}}>
                                <div className="wideTourDataType">{textInfo.about}</div>
                                <div className="wideTourInfoStyle">{element.tourlocalization.info}</div>
                            </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column" style={{minWidth: '150px', padding: '20px 0'}}>
                            <div className = 'toursDuration d-flex' style={{height: '50px'}}>
                                <div className=" d-flex flex-column" style={{marginLeft: 'auto'}}>
                                    <TourPropsBlock element={element} textInfo={textInfo} noDateSeatsData={this.props.noDateSeatsData} seats={seats}/>
                                </div> 
                            </div>
                            <PriceBlock topBlockClass={"routesPrices d-flex flex-column align-items-end wideTourPrice"} isGuideTours={this.props.isGuideTours}
                                pricePerPersonOld={pricePerPersonOld} pricePerPerson={pricePerPerson} element={element} textInfo={textInfo}/>
                        </div>
                    </div>
                </div>
                
                <div className={(this.props.placeListElementClass ? this.props.placeListElementClass+" " : ("col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3 " + (isWide ? 'd-none' : 'd-flex')))} >
                    <div className="drivers_block_element d-flex p-0 flex-column w-100" id={index}>
                        <ListElementImage element={element} that={this} textInfo={textInfo} address={address} />                      
                        <div className="toursDuration d-flex align-items-center justify-content-between">
                            <div className="d-flex flex-column">
                                <TourPropsBlock element={element} textInfo={textInfo} noDateSeatsData={this.props.noDateSeatsData} seats={seats}/>
                            </div>
                            {
                                (isPlacesRunOut || isNnewTour) &&
                                <div style={isPlacesRunOut?{ background: "#f90", height: "25px" }:{background: "#00aa71", height: "25px"}} className="d-flex align-items-center align-self-start">
                                    <text>{isPlacesRunOut?textInfo.bestseller[2]:isNnewTour?textInfo.bestseller[1]:""}</text>
                                </div>
                            }
                        </div>
                        <div style={this.props.isGuideTours ? { maxHeight: "117px" } : {}} className="placesList_info_tours d-flex flex-column justify-content-between">
                            <TourNameBlock address={address} element={element} index={index} textInfo={textInfo} that={this}/>
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
                                <PriceBlock topBlockClass={"routesPrices d-flex flex-column align-items-end"} isGuideTours={this.props.isGuideTours}
                                    pricePerPersonOld={pricePerPersonOld} pricePerPerson={pricePerPerson} element={element} textInfo={textInfo}/>                                
                            </div>
                        </div>
                    </div>
                </div>

            </>
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