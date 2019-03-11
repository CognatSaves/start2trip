import React, { Component } from 'react';
import './header_css.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      activLanguage: [{ flag: ruFlag, string: "RU" }, { flag: enFlag, string: "EN" }, { flag: geoFlag, string: "GEO" }, { flag: espFlag, string: "ESP" }],
      activLanguageNumber: 0,
    };
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    let logo = [logoBlue, logoWhite];
    let earthPic = [earth, whiteEarth];
    return (
      <React.Fragment>
        <div className='header d-flex flex-row align-items-center col-12'>
          <div className="headerLogo d-flex flex-row col-5">
            <img src={logo[this.props.type]} height="20%" width="41%" alt="logo" />
            <div className="header_geo_block">
              <img src={earthPic[this.props.type]} width="40px" height="30px" alt="earthPic" />
              <Link to="/" className={"header_geo_button " + this.props.colorClass}>
                <div className={"geo_button_value " + this.props.backgroundColorClass}>
                  <div>
                    <img src={geoIcon} alt="geoIcon" />
                    <span>GEO</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className={"header_buttonMass d-flex flex-row justify-content-start col-4 " + this.props.colorClass2}>
            <Link to="/places" className={"buttonMass_button " + this.props.colorClass2}>МЕСТА</Link>
            <Link to="/" className={"buttonMass_button " + this.props.colorClass2}>ТУРЫ</Link>
            <Link to="/" className={"buttonMass_button " + this.props.colorClass2}>ОТЕЛИ</Link>
            <Link to="/" className={"buttonMass_button " + this.props.colorClass2}>АВИАБИЛЕТЫ</Link>
          </div>
          <div className="headerSelect d-flex flex-row align-items-center col-3">
            <select className={"selectСgvicurrency  " + this.props.backgroundColorClass + " " + this.props.colorClass}>
              <option value="RUB">₽ RUB</option>
              <option value="USD">$ USD</option>
              <option value="GEL">₾ GEL</option>
              <option value="EUR">€ EUR</option>
            </select>
            <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="selectGeneral">
              <DropdownToggle caret size="sm">
                <img src={this.state.activLanguage[this.state.activLanguageNumber].flag} height="15px" width="15px" alt="flag" />{this.state.activLanguage[this.state.activLanguageNumber].string}
              </DropdownToggle>
              <DropdownMenu className="dropdownLanguageMenu">
                <DropdownItem className="dropdownLanguageMenu" onClick={() => { this.setState({ activLanguageNumber: 0 }) }}><img src={ruFlag} height="15px" width="15px" alt="RU" />RU</DropdownItem>
                <DropdownItem className="dropdownLanguageMenu" onClick={() => { this.setState({ activLanguageNumber: 1 }) }}><img src={enFlag} height="15px" width="15px" alt="EN" />EN</DropdownItem>
                <DropdownItem className="dropdownLanguageMenu" onClick={() => { this.setState({ activLanguageNumber: 2 }) }}><img src={geoFlag} height="15px" width="15px" alt="GEO" />GEO</DropdownItem>
                <DropdownItem className="dropdownLanguageMenu" onClick={() => { this.setState({ activLanguageNumber: 3 }) }}><img src={espFlag} height="15px" width="15px" alt="ESP" />ESP</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <button className={"header_registration " + this.props.borderColorClass}>
              <p className={this.props.colorClass2}>ВОЙТИ / РЕГИСТРАЦИЯ</p>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
