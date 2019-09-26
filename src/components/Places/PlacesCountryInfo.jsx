import React from 'react';
import './PlacesCountryInfo.css'
import { connect } from 'react-redux';

import territoryIcon from '../media/georgia_Монтажная область 1.svg';
import peopleIcon from '../media/people_Монтажная область 1.svg';
import capitalIcon from '../media/building_Монтажная область 1.svg';

class PlacesCountryInfoClass extends React.Component {
  render() {
    function findFillingText(that, textInfo) {
      function fingDirectionById(directions, dirId) {
        if (!dirId || dirId.length === 0) {
          return -1;
        }
        for (let i = 0; i < directions.length; i++) {
          if (directions[i].id === dirId) {
            return i;
          }
        }
        return -1;
      }
      let placesState = that.props.placesState;
      if (!placesState.country.local) {
        return {
          name: '',
          description: ''
        }
      }
      let dirNumber = fingDirectionById(placesState.directions, placesState.selectedDirection);
      if ( dirNumber === -1 || placesState.selectedDirection.length === 0 ) {//не выбрано направление (direction)
        return {
          name: placesState.country.local.name,
          description: placesState.country.local.description
        }
      }
      else {
        return {
          name: textInfo.placesCountryInfo.namePart + " " + placesState.directions[dirNumber].loc.name,
          description: placesState.directions[dirNumber].loc.description
        }
      }
    }


    let textInfo = this.props.storeState.languageTextMain.places;
    let data = findFillingText(this, textInfo);
    //let countryName = placesState.country.local ? (placesState.selectedDirection && dirNumber!==-1 ? placesState.directions[dirNumber].) : ''
    return (
      <>
        <div className="placesCountryInfo">
          <h1 className="placesCountryInfo_countryName">{data.name}</h1>
          <div className="placesCountryInfo_line" />
          <div className="placesCountryInfo_countryinfo">
            {data.description}
          </div>
        </div>
      </>
    )
  }
}

const PlacesCountryInfo = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalReduser: state.GlobalReduser
  }),

)(PlacesCountryInfoClass);

export default PlacesCountryInfo;