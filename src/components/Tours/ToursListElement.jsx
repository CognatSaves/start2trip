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

import Stars from '../stars/Stars';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ToursListElementClass extends React.Component {

    getCurrencies = (currency, criterion) => {
        let idIndex = null
        switch (criterion) {
            case "id":
                this.props.storeState.currencies.map((item, index) => {
                    if (item.id.indexOf(currency) === 0) { idIndex = index }
                })
                break;
            case "ISO":
                this.props.storeState.currencies.map((item, index) => {
                    if (item.ISO.indexOf(currency) === 0) { idIndex = index }
                })
                break;
        }
        return idIndex
    }

    render() {

        let textInfo = this.props.storeState.languageTextMain.tours;
        let element = this.props.element;
        let index = this.props.index;
        let imageAddress = element.image ? (requests.serverAddressImg + element.image) : '';
        console.log(imageAddress);
        let slug = element.tourlocalization.slug;

        let seats = element.seats
        
        let location = null;
        
        location = element.tourlocalization.points.map((el,index)=>{
            let pointName = el.point.split(" ");
            if((element.tourlocalization.points.length-1) === index){
                return pointName[0].slice(0,pointName[0].length-1)
            }
           return pointName[0]
         })
        let isoCurrencies = cookies.get('userCurr', { path: "/" })
        let idIndex = this.getCurrencies(element.currency,"id")
        let price = null
        if(this.props.storeState.currencies.length>0){

        let usd = element.price / this.props.storeState.currencies[idIndex].costToDefault
        if (isoCurrencies === "USD") {
            let idIndex = this.getCurrencies("USD","ISO")
            usd = Math.ceil(usd)
            price = this.props.storeState.currencies[idIndex].symbol+" "+usd
        } else {
            let idIndex = this.getCurrencies(isoCurrencies,"ISO")
            usd = usd *this.props.storeState.currencies[idIndex].costToDefault
            usd = Math.ceil(usd)
            price = this.props.storeState.currencies[idIndex].isLeft ?(this.props.storeState.currencies[idIndex].symbol+" "+usd):
            (usd+" "+this.props.storeState.currencies[idIndex].symbol)
        }
    }
    let validDepartureDate = null;
    if (this.props.departureDate){
        validDepartureDate = this.props.departureDate.split(".");
        validDepartureDate = validDepartureDate[2]+"-"+validDepartureDate[1]+"-"+validDepartureDate[0];
    }
        return (
            <div className={this.props.placeListElementClass ? this.props.placeListElementClass : "col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3"} >
                <div className="drivers_block_element d-flex p-0 flex-column" id={index}>

                    <div className="driversBlock_carImage" style={{ background: "url(" + (element.image ? (requests.serverAddressImg + element.image) : '') + ") no-repeat", backgroundSize: "cover", width: '100%' }}>
                        <div className="toursDate">{this.props.departureDate}</div>
                        <div className="toursDuration">{element.daysNumber + " " + textInfo.daysNumber}</div>
                        <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/tours/${slug}?date=`+validDepartureDate} className="driversBlock_carBlackout">
                            <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                        </Link>
                    </div>
                    <div className="placesList_info_tours d-flex flex-column">
                        <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/tours/${slug}?date=`+validDepartureDate} className="placesList_placeName d-flex">
                            <div>
                                {element.tourlocalization.name}
                            </div>
                        </Link>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-column col p-0">
                                <div className="placesList_stars">
                                    <Stars key={index + "/" + element.rating} value={Math.ceil(element.rating * 10) / 10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={element.rating > 0 ? true : false} commentNumberDisplay={true} />
                                </div>
                                <div className="d-flex placesList_info_position toursNumberPeoples">
                                    <div className="placesList_info_position_textStyle">{textInfo.seats + " " + seats}</div>
                                </div>
                            </div>
                            <i className="placesList_info_guide my-auto col-2" style={{ background: "url(" + (element.isGuide  ? guideIcon : agencyIcon) + ")no-repeat" }}><span className="placesList_info_guide-toolTip">{element.isGuide  ? textInfo.guide : textInfo.agency}</span></i>
                        </div>

                        {/* <div className="d-flex align-items-center placesList_info_position placesList_info_position_tags mb-1">
                            <img src={tagBlue} height="12px" width="12px" alt="tagBlue" />
                            <div className="placesList_info_position_textStyle">{element.tagsArray.map((tag, tagIndex) => <text>{this.props.findTagName(tag) + (element.tagsArray.length - 1 > tagIndex ? "," : "") + " "}</text>)}</div>
                        </div> */}
                        {/* <div className="d-flex placesList_info_position placesList_info_position_loc pt-1">
                            <div className="placesList_info_position_textStyle">{location.map((el,index)=>(el+" "))}</div>
                        </div> */}

                    </div>
                    <button className="driversBlock_driverInfoBlock_element driversBlock_buttonStyle"
                        onClick={() => { 
                            
                            console.log(element);
                            this.props.changeTravelVisibility(element.price);
                            /*this.props.dispatch(setDriverCarDescription(element))*/
                        }}>{textInfo.bookTours+" "+price }</button>
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