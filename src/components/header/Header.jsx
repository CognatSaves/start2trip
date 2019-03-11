import React, { Component } from 'react';
import './header_css.css'
import earth from './pictures/earth.svg'
import whiteEarth from './pictures/globe.svg';
import geoIcon from './pictures/geo_icon.png'
import logoBlue from './pictures/logo_blue.svg'
import logoWhite from './pictures/logo_white_svg.svg'
import geoFlag from './pictures/georgia.svg'
import ruFlag from './pictures/russia.svg'
import enFlag from './pictures/united-kingdom.svg'
import espFlag from './pictures/spain.svg'
//import styled from 'styled-components'
import { Link } from 'react-router-dom';
export default class Header extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    let logo = [logoBlue,logoWhite];
    let earthPic= [earth, whiteEarth];
    return (
      <React.Fragment>
        <div className='header'>
          <div className="headerLogo">
            <img src={logo[this.props.type]} height="40px" width="240px" alt="logo" />
            <div className="header_geo_block">
              <img src={earthPic[this.props.type]} width="40px" height="30px" alt="earthPic" />
              <Link to="/" className={"header_geo_button "+this.props.colorClass}>
                <div className={"geo_button_value "+this.props.backgroundColorClass}>
                  <div>
                    <img src={geoIcon} alt="geoIcon" />
                    <span>GEO</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className={"header_buttonMass "+this.props.colorClass2}>
            <Link to="/places" className={"buttonMass_button "+this.props.colorClass2}>МЕСТА</Link>
            <Link to="/" className={"buttonMass_button "+this.props.colorClass2}>ТУРЫ</Link>
            <Link to="/" className={"buttonMass_button "+this.props.colorClass2}>ОТЕЛИ</Link>
            <Link to="/" className={"buttonMass_button "+this.props.colorClass2}>АВИАБИЛЕТЫ</Link>
          </div>
          <div className="headerSelect">
            <select className={"selectСgvicurrency "+this.props.backgroundColorClass+" "+this.props.colorClass}>
              <option value="RUB">₽ RUB</option>
              <option value="USD">$ USD</option>
              <option value="GEL">₾ GEL</option>
              <option value="EUR">€ EUR</option>
            </select>
            <label className={"selectGeneral "+this.props.labelColorClass} placeholder="select Language">
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
            <button className={"header_registration "+this.props.borderColorClass}>
              <p className={this.props.colorClass2}>ВОЙТИ / РЕГИСТРАЦИЯ</p>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
