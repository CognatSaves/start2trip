import React from 'react';
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
import { Link } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';

const ModalRegistration = (props) =>{
  let {modalRegistration, toggle, className} = props;
  return(
        <Modal isOpen={modalRegistration} toggle={toggle} className={className + " p-0"}>
          <ModalBody>
            <RenderModalRegistration close={toggle} />
          </ModalBody>
        </Modal>
  )
}
const CountrySelect = (props) => {
  let {modalCountry, toggleModalCountry, className} = props;
  return(
        <Modal isOpen={modalCountry} toggle={toggleModalCountry} className={className}>
          <ModalBody>
            <div className="d-flex flex-column col-12">
              <div className="d-flex  justify-content-center col-12 p-4">
                <img src={mapWorldIcon} height="150px" alt="mapWorldIcon" />
                <button className="modalCountryButtton" onClick={() => { this.toggleModalCountry() }}><img src={crossIconModal} width="20px" height="20px" alt="crossIconModal" /></button>
              </div>
              <div className="modalCountry d-flex flex-column align-items-center mb-5">
                <h4 className="mb-4">ВЫБЕРИТЕ ВАШУ СТРАНУ</h4>
                <RenderModalCountry close={toggleModalCountry} />
              </div>
            </div>
          </ModalBody>
        </Modal>
  )
}

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
      buttonMassElements: [
        {
          to:"/",
          value: "МАРШРУТЫ" 
        },
        {
          to:"/places",
          value: "МЕСТА" 
        },
        {
          to:"/tours",
          value: "ТУРЫ" 
        }
      ],
      currencyValues: [
        "₽ RUB","$ USD","₾ GEL","€ EUR"
      ],
      languageValues: [
        {
          src: ruFlag,
          value: "RU"
        },
        {
          src: enFlag,
          value: "EN"
        },
        {
          src: geoFlag,
          value: "GEO"
        },
        {
          src: espFlag,
          value: "ESP"
        },
      ]
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
    console.log("render");
    return (
      <React.Fragment>

        <ModalRegistration modalRegistration={this.state.modalRegistration} toggle={this.toggleModalRegistration} className={this.props.className}/>
        <CountrySelect modalCountry={this.state.modalCountry} toggleModalCountry={this.toggleModalCountry} className={this.props.className}/>

        <div className="home_header col-12">
          <div className='header d-flex align-items-center'>
            <Link className="" to="">
              <div className={this.props.colorWhite ? "logoWhite" : "logoBlue"}></div>
            </Link>
            <div className="header_geo_block col-4">
                <img src={this.props.colorWhite ? whiteEarth : earth} width="40px" height="30px" alt="earthPic" />
                <div onClick={this.toggleModalCountry} className={this.props.colorWhite ? "header_geo_button_Blue" : "header_geo_button_White"}>
                  <div className={this.props.colorWhite ? "geo_button_value_White" : "geo_button_value_Blue"}>
                    <div className={this.props.colorWhite ? "hederGeoIconBlue" : "hederGeoIconWhite"} >
                      <span>{this.props.storeState.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            <div className="header_buttonMass d-flex justify-content-start col-4 ">
            {
              this.state.buttonMassElements.map((element,index)=>
                <Link to={element.to} className={this.props.colorWhite ? "buttonMass_button_White" : "buttonMass_button_Blue"}>{element.value}</Link>
              )
            }            
            </div>
            <div className="headerSelect d-flex align-items-center justify-content-end col-4">
              <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownOpen} className="selectGeneral">
                <DropdownToggle className={this.props.colorWhite ? "selectGeneralBtWhite" : "selectGeneralBtBlue"} caret size="sm">
                  {this.state.activeCurrency[this.state.activeCurrencyNumber]}
                </DropdownToggle>
                <DropdownMenu className={this.props.colorWhite ? "dropdownMenuWhite currenty" : "dropdownMenuBlue currenty"}>
                {
                  this.state.currencyValues.map((element,index)=>
                    <DropdownItem className={this.props.colorWhite ? "dropdownMenuWhite" : "dropdownMenuBlue"} onClick={() => {this.setState({ activeCurrencyNumber: index })}}>{element}</DropdownItem>
                  )
                }
                </DropdownMenu>
              </Dropdown>
              <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownLanguageOpen} toggle={this.toggleLanguage} className="selectGeneral">
                <DropdownToggle className={this.props.colorWhite ? "selectGeneralBtWhite" : "selectGeneralBtBlue"} caret size="sm">
                  <img src={this.state.activLanguage[this.state.activLanguageNumber].flag} height="15px" width="15px" alt="flag" />{this.state.activLanguage[this.state.activLanguageNumber].string}
                </DropdownToggle>
                <DropdownMenu className={this.props.colorWhite ? "dropdownMenuWhite" : "dropdownMenuBlue"}>
                {
                  this.state.languageValues.map((element,index)=>
                    <DropdownItem className={this.props.colorWhite ? "dropdownMenuWhite" : "dropdownMenuBlue"} onClick={() => { this.setState({ activLanguageNumber: 0 }) }}><img src={element.src} height="15px" width="15px" alt="RU" />{element.value}</DropdownItem>
                  )
                }
                </DropdownMenu>
              </Dropdown>
              <button onClick={this.toggleModalRegistration} className={this.props.colorWhite ? "header_registration_White" : "header_registration_Blue"}>
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
