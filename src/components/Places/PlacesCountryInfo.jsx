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
        if (dirId.length === 0) {
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
      if (placesState.selectedDirection.length === 0 || dirNumber === -1) {//не выбрано направление (direction)
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
      <React.Fragment>
        <div className="placesCountryInfo">
          <h1 className="placesCountryInfo_countryName">{data.name}</h1>
          <div className="placesCountryInfo_line" />
          <div className="placesCountryInfo_countryinfo">
            {data.description}
          </div>
          {
            false ?
              <div className="placesCountryInfo_countryData">
                <div className="placesCountryInfo_countryData_element" style={{ marginLeft: "auto" }}>
                  <div className="countryData_element_icon">
                    <img src={territoryIcon} width="100%" height="15%" alt=" " />
                  </div>
                  <div className="countryData_element_text">
                    <text className="countryData_textStyle">
                      <text className="countryData_smallText">{textInfo.placesCountryInfo.territory} </text>
                      <br />
                      <text className="countryData_bigText">{this.props.placesState.country.local ? this.props.placesState.country.local.propTerritory : ''}</text>
                    </text>

                  </div>
                </div>
                <div className="placesCountryInfo_countryData_element">
                  <div className="countryData_element_icon" >
                    <img src={peopleIcon} width="100%" height="15%" alt=" " />
                  </div>
                  <div className="countryData_element_text">
                    <text className="countryData_textStyle">
                      <text className="countryData_smallText">{textInfo.placesCountryInfo.population} </text>
                      <br />
                      <text className="countryData_bigText">{(this.props.placesState.country.propPopulation ? this.props.placesState.country.propPopulation + " чел." : '')}</text>
                    </text>
                  </div>
                </div>
                <div className="placesCountryInfo_countryData_element" style={{ marginRight: "auto" }}>
                  <div className="countryData_element_icon"  >
                    <img src={capitalIcon} width="100%" height="15%" alt=" " />
                  </div>
                  <div className="countryData_element_text">
                    <text className="countryData_textStyle">
                      <text className="countryData_smallText">{textInfo.placesCountryInfo.capital} </text>
                      <br />
                      <text className="countryData_bigText">{this.props.placesState.country.local ? this.props.placesState.country.local.propCapital : ''}</text>
                    </text>
                  </div>
                </div>
              </div> : <React.Fragment />
          }
        </div>
      </React.Fragment>
    )
  }
}

const PlacesCountryInfo = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalReduser: state.GlobalReduser,
    placesState: state.PlacesReduser
  }),

)(PlacesCountryInfoClass);

export default PlacesCountryInfo;