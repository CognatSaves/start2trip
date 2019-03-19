import React from 'react';
import '../Places/PlacesCountryInfo.css';

export default class PlaceInfo extends React.Component {
    render(){
        return(
            <div className="placesCountryInfo">
                <div className="placesCountryInfo_countryName">Некоторое выбранное Вами место</div>
                <div className="placesCountryInfo_line"/>
                <div className="placesCountryInfo_countryinfo">
                    Какая-то краткая информация про это место, возможно, взятая со страницы /places
                </div>
            </div>
        )
    }
}