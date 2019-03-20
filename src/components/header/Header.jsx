import React, { Component } from 'react';
import './header_css.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import earth from './pictures/earth.svg'
import whiteEarth from './pictures/globe.svg';
import RenderModalCountry from './RenderModalCountry'
import RenderModalRegistration from './RenderModalRegistration'
import mapWorldIcon from './pictures/mapWorld.svg'
import { connect } from 'react-redux';
import crossIconModal from './pictures/close.svg'
import geoFlag from './pictures/georgia.svg'
import ruFlag from './pictures/russia.svg'
import enFlag from './pictures/united-kingdom.svg'
import espFlag from './pictures/spain.svg'
//import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import LanguageMenu from '../drivers/DriversBody/DriversProperties/components/LanguageMenu/LanguageMenu';


class HeaderClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownLanguageOpen: false,
      dropdownOpen: false,
      activLanguage: [{ flag: ruFlag, string: "RU" }, { flag: enFlag, string: "EN" }, { flag: geoFlag, string: "GEO" }, { flag: espFlag, string: "ESP" }],
      activLanguageNumber: 0,
      activeCurrency: ["₽ RUB", "$ USD", "₾ GEL", "€ EUR"],
      activeCurrencyNumber: 0,
      modalCountry: false,
      modalRegistration: false,


    };
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.toggleDropdownOpen = this.toggleDropdownOpen.bind(this);
    this.toggleModalCountry = this.toggleModalCountry.bind(this);
    this.toggleModalRegistration = this.toggleModalRegistration.bind(this);
  }

  toggleModalCountry() {
    this.setState(prevState => ({
      modalCountry: !prevState.modalCountry
    }));
  }

  toggleModalRegistration() {
    this.setState(prevState => ({
      modalRegistration: !prevState.modalRegistration
    }));
  }

  toggleLanguage() {
    this.setState({
      dropdownLanguageOpen: !this.state.dropdownLanguageOpen
    });
  }
  toggleDropdownOpen() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.modalRegistration} toggle={this.toggleModalRegistration} className={this.props.className + " p-0"}>
          <ModalBody>
            <RenderModalRegistration close={this.toggleModalRegistration} />
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modalCountry} toggle={this.toggleModalCountry} className={this.props.className}>
          <ModalBody>
            <div className="d-flex flex-column col-12">
              <div className="d-flex flex-row justify-content-center col-12 p-4">
                <img src={mapWorldIcon} height="150px" alt="mapWorldIcon" />
                <button className="modalCountryButtton" onClick={() => { this.toggleModalCountry() }}><img src={crossIconModal} width="20px" height="20px" alt="crossIconModal" /></button>
              </div>
              <div className="modalCountry d-flex flex-column align-items-center mb-5">
                <h4 className="mb-4">ВЫБЕРИТЕ ВАШУ СТРАНУ</h4>
                <RenderModalCountry close={this.toggleModalCountry} />
              </div>
            </div>
          </ModalBody>
        </Modal>
        <div className="home_header col-12">
          <div className='header d-flex flex-row align-items-center'>
            <div className="headerLogo d-flex flex-row col-5">
              <Link className="" to="">
                <div className={this.props.colorWhite ? "logoWhite":"logoBlue"}></div>
              </Link>
              <div className="header_geo_block col-5">
                <img src={this.props.colorWhite ? whiteEarth : earth} width="40px" height="30px" alt="earthPic" />
                <div onClick={this.toggleModalCountry} className={this.props.colorWhite ? "header_geo_button_Blue":"header_geo_button_White"}>
                  <div className={this.props.colorWhite ? "geo_button_value_White":"geo_button_value_Blue"}>
                    <div>
                      <span className={this.props.colorWhite ? "hederGeoIconBlue":"hederGeoIconWhite"} >{this.props.storeState.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header_buttonMass d-flex flex-row justify-content-start col-4 ">
              <Link to="/places" className={this.props.colorWhite ? "buttonMass_button_White":"buttonMass_button_Blue"}>МЕСТА</Link>
              <Link to="/tours" className={this.props.colorWhite ? "buttonMass_button_White":"buttonMass_button_Blue"}>ТУРЫ</Link>
              <Link to="/" className={this.props.colorWhite ? "buttonMass_button_White":"buttonMass_button_Blue"}>ОТЕЛИ</Link>
              <Link to="/" className={this.props.colorWhite ? "buttonMass_button_White":"buttonMass_button_Blue"}>АВИАБИЛЕТЫ</Link>
            </div>
            <div className="headerSelect d-flex flex-row align-items-center col-4">
              <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownOpen} className="selectGeneral">
                <DropdownToggle className="selectGeneralBt" caret size="sm">
                  {this.state.activeCurrency[this.state.activeCurrencyNumber]}
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu currenty">
                  <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activeCurrencyNumber: 0 }) }}>₽ RUB</DropdownItem>
                  <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activeCurrencyNumber: 1 }) }}>$ USD</DropdownItem>
                  <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activeCurrencyNumber: 2 }) }}>₾ GEL</DropdownItem>
                  <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activeCurrencyNumber: 3 }) }}>€ EUR</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownLanguageOpen} toggle={this.toggleLanguage} className="selectGeneral">
                <DropdownToggle className="selectGeneralBt" caret size="sm">
                  <img src={this.state.activLanguage[this.state.activLanguageNumber].flag} height="15px" width="15px" alt="flag" />{this.state.activLanguage[this.state.activLanguageNumber].string}
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                  <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activLanguageNumber: 0 }) }}><img src={ruFlag} height="15px" width="15px" alt="RU" />RU</DropdownItem>
                  <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activLanguageNumber: 1 }) }}><img src={enFlag} height="15px" width="15px" alt="EN" />EN</DropdownItem>
                  <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activLanguageNumber: 2 }) }}><img src={geoFlag} height="15px" width="15px" alt="GEO" />GEO</DropdownItem>
                  <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activLanguageNumber: 3 }) }}><img src={espFlag} height="15px" width="15px" alt="ESP" />ESP</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <button onClick={this.toggleModalRegistration} className={this.props.colorWhite ? "header_registration_White":"header_registration_Blue"}>
                <p>ВОЙТИ / РЕГИСТРАЦИЯ</p>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const Header = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
)(HeaderClass);

export default Header;
