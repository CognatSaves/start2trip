import React from 'react';
import '../Places/PlacesCountryInfo.css';
import './TourInfo.css';
export default class TourInfo extends React.Component {
    shouldComponentUpdate(nextProps){ 
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        function createLocationString(places){
            let res = places[0];
            for(let i=1;i<places.length; i++){
                res = res + " - "+places[i];
            }
            return res;
        }
        function departureDateString(value){
            let dayMass = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
            let monthMass = ["января", "февраля", "марта", "апреля", "мая",
              "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
            let resultString = dayMass[value.getDay()] + ", " + value.getDate() + " " + monthMass[value.getMonth()] + " " + value.getFullYear();
            return resultString;
        }
        console.log("TourInfo");
        let placesString = createLocationString(this.props.tour.places);
        return(
            <div className="placesCountryInfo d-flex flex-column">
                <div className="tourInfo_tourShow">{placesString}</div>
                <div className="tourInfo_dateBlock d-flex flex-row">
                    <div style={{height: "100%"}}>{"Дата:"}</div>
                    <div className="tourInfo_dateBlock_dateValue">{departureDateString(this.props.tour.departureDate)}</div>
                </div>
                <div className="tourInfo_price">{"$"+this.props.tour.price}</div>
                <button className="tourInfo_buttonStyle">ЗАКАЗАТЬ ТУР</button>
                <div className="tourInfo_priceInfo">Стоимость за человека</div>
            </div>
        )
    }
}