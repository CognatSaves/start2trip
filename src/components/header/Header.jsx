import React, { Component } from 'react';
import './header_css.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import earth from './pictures/earth.svg'
import whiteEarth from './pictures/globe.svg';
import geoIcon from './pictures/geo_icon.png'
import logoBlue from './pictures/logo_blue.svg'
import logoWhite from './pictures/logo_white_svg.svg'
import RenderModalCountry from './RenderModalCountry'
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
      modal: false,

    };
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleLanguage() {
    this.setState({
      dropdownLanguageOpen: !this.state.dropdownLanguageOpen
    });
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
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalBody>
            <div className="d-flex flex-column col-12">
              <div className="d-flex flex-row justify-content-center col-12">
                <img src={mapWorldIcon} height="150px" alt="mapWorldIcon" />
                <button className="modalCountryButtton" onClick={() => { this.toggleModal() }}><img src={crossIconModal} width="20px" height="20px" alt="crossIconModal"/></button>
              </div>
              <div className="modalCountry d-flex flex-column align-items-center ">
                <h4 className="mb-4">ВЫБЕРИТЕ ВАШУ СТРАНУ</h4>
                <RenderModalCountry close={this.toggleModal} />
              </div>
            </div>
          </ModalBody>
        </Modal>
        <div className="home_header col-12">
          <div className='header d-flex flex-row align-items-center'>
            <div className="headerLogo d-flex flex-row col-5">
              <Link className="" to="">
              <div className="logo"></div>
                {/* <img src={logo[this.props.type]} height="38px" width="205px" alt="logo" /> */}
              </Link>
              <div className="header_geo_block col-5">
                <img src={earthPic[this.props.type]} width="40px" height="30px" alt="earthPic" />
                <div onClick={this.toggleModal} className={"header_geo_button " + this.props.colorClass}>
                  <div className={"geo_button_value " + this.props.backgroundColorClass}>
                    <div>
                      <img src={geoIcon} width="9px" height="12px" alt="geoIcon" />
                      <span>{this.props.storeState.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"header_buttonMass d-flex flex-row justify-content-start col-4 " + this.props.colorClass2}>
              <Link to="/places" className={"buttonMass_button " + this.props.colorClass2}>МЕСТА</Link>
              <Link to="/" className={"buttonMass_button " + this.props.colorClass2}>ТУРЫ</Link>
              <Link to="/" className={"buttonMass_button " + this.props.colorClass2}>ОТЕЛИ</Link>
              <Link to="/" className={"buttonMass_button " + this.props.colorClass2}>АВИАБИЛЕТЫ</Link>
            </div>
            <div className="headerSelect d-flex flex-row align-items-center col-4">
              <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="selectGeneral">
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
              <button className={"header_registration " + this.props.borderColorClass}>
                <p className={this.props.colorClass2}>ВОЙТИ / РЕГИСТРАЦИЯ</p>
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
