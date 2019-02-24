import React, { Component } from 'react';
import './DriversHeader.css'

export default class DriversHeader extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="drivers_header">
        <div className="drivers_header_label"/>
        <div className="drivers_header_earth"/>
        <div className="drivers_geo_button"/>
        <div className="drivers_user">
          <div className="drivers_user_photo"/>
          <div className="drivers_user_arrow"/>
        </div>
        <div className="drivers_header_language">
          <div className="drivers_language_flag"/>
          <div className="drivers_language_value">RU</div>
        </div>
        <div className="drivers_header_currency">

          <div className="drivers_currency_value">$ USD</div>
        </div>
        <div className="drivers_header_buttonMass">
          <button className="drivers_buttonMass_button">МЕСТА</button>
          <button className="drivers_buttonMass_button">ТУРЫ</button>
          <button className="drivers_buttonMass_button">ОТЕЛИ</button>
          <button className="drivers_buttonMass_button">АВИАБИЛЕТЫ</button>
        </div>
      </div>
    )
  }

}
