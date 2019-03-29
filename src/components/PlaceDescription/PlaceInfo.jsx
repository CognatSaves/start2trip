import React from 'react';
import '../Places/PlacesCountryInfo.css';

export default class PlaceInfo extends React.Component {
    render(){
        return(
            <div className="d-flex flex-column placesCountryInfo" style={{position: "relative"}}>
                <div className="placesCountryInfo_countryName">{this.props.place.name}</div>
                <div className="placesCountryInfo_line"/>
                <div className="placesCountryInfo_countryinfo">
                    {this.props.place.info}
                </div>
            </div>
        )
    }
}