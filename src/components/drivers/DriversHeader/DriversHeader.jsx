import React, { Component } from 'react';
import './DriversHeader.css'
import driversLabel from './pictures/logo_white_svg.svg';
import driversEarth from './pictures/globe.svg';
import geoFlag from './pictures/georgia.svg'
import ruFlag from './pictures/russia.svg'
import enFlag from './pictures/united-kingdom.svg'
import espFlag from './pictures/spain.svg'
import geoIcon from './pictures/geo_icon.png'

import { Link } from 'react-router-dom';

export default class DriversHeader extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="drivers_header">
        <div className="drivers_header_logo">
          <img src={driversLabel} height="40%" width="60%" alt="logo"/>
          <div className="drivers_geo_block">
              <img src={driversEarth} alt="" height="31px" width="31px" alt="globo"/>
              <Link to="/" className="drivers_geo_button">
                <div className="geo_button_value">
                  <div>
                    <img src={geoIcon} alt="" />
                    <span>GEO</span>
                  </div>
                </div>
              </Link>
            </div>
        </div>
        <div className="drivers_header_buttonMass">
            <Link to="/" className="buttonMass_button">МЕСТА</Link>
            <Link to="/" className="buttonMass_button">ТУРЫ</Link>
            <Link to="/" className="buttonMass_button">ОТЕЛИ</Link>
            <Link to="/" className="buttonMass_button">АВИАБИЛЕТЫ</Link>
          </div>
          <div className="drivers_header_select">
            <select className="selectСgvicurrency">
              <option value="RUB">₽ RUB</option>
              <option value="USD">$ USD</option>
              <option value="GEL">₾ GEL</option>
              <option value="EUR">€ EUR</option>
            </select>
            <label className="selectGeneral" placeholder="select Language">
              <input type="radio" name="Lang" />
              <div>
                <input
                  type="radio"
                  name="Lang"
                  value="RU"
                  id="Lang[Ru]"
                  defaultChecked
                />
                <label htmlFor="Lang[Ru]"><img src={ruFlag} height="15px" width="15px" alt="RU" />RU</label>
                <input
                  type="radio"
                  name="Lang"
                  value="EN"
                  id="Lang[En]"
                />
                <label htmlFor="Lang[En]"><img src={enFlag} height="15px" width="15px" alt="EN" />EN</label>
                <input
                  type="radio"
                  name="Lang"
                  value="GEO"
                  id="Lang[GEO]"
                />
                <label htmlFor="Lang[GEO]"><img src={geoFlag} height="15px" width="15px" alt="GEO" />GEO</label>
                <input
                  type="radio"
                  name="Lang"
                  value="ESP"
                  id="Lang[ESP]"
                />
                <label htmlFor="Lang[ESP]"><img src={espFlag} height="15px" width="15px" alt="ESP" />ESP</label>
              </div>
            </label>
            <button className="header_registration">
              <p>ВОЙТИ / РЕГИСТРАЦИЯ</p>
            </button>
          </div>
      </div>
    )
  }

}
/*

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

      */