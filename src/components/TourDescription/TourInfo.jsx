import React from 'react';
import '../Places/PlacesCountryInfo.css';
import './TourInfo.css';
export default class TourInfo extends React.Component {
    render(){
        return(
            <div className="placesCountryInfo d-flex flex-column">
                <div className="tourInfo_tourShow">А - Б - В - Г</div>
                <div className="tourInfo_dateBlock d-flex flex-row">
                    <div style={{height: "100%"}}>{"Дата:"}</div>
                    <div className="tourInfo_dateBlock_dateValue">как только даш деняк</div>
                </div>
                <div className="tourInfo_price">$99999</div>
                <button className="tourInfo_buttonStyle">ЗАКАЗАТЬ ТУР</button>
                <div className="tourInfo_priceInfo">Стоимость за человека</div>
            </div>
        )
    }
}