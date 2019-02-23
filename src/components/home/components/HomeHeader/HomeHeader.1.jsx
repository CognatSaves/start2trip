import React, { Component } from 'react';
import './header_css.css'
import earth from './pictures/earth.png'
import geoIcon from './pictures/geo_icon.png'
import logoBlue from './pictures/logo_blue.svg'
import geoFlag from './pictures/georgia.svg'
import ruFlag from './pictures/russia.svg'
import enFlag from './pictures/united-kingdom.svg'
import espFlag from './pictures/spain.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
export default class HomeHeader extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <React.Fragment>
        <div className='header'>
          <img src={logoBlue} height="42px" width="20%" alt="" />
          <div className="header_geo_block">
            <img src={earth} alt="" />
            <Link to="/" className="header_geo_button">
              <div className="geo_button_value">
                <div>
                  <img src={geoIcon} alt="" />
                  <span>GEO</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="header_buttonMass">
            <Link to="/" className="buttonMass_button">МЕСТА</Link>
            <Link to="/" className="buttonMass_button">ТУРЫ</Link>
            <Link to="/" className="buttonMass_button">ОТЕЛИ</Link>
            <Link to="/" className="buttonMass_button">АВИАБИЛЕТЫ</Link>
          </div>
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
      </React.Fragment>
    );
  }
}
