import React from 'react';
import './Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import facebookIcon from "../media/facebook-letter-logo.svg"
import instagramIcon from "../media/instagram.svg"
import logoTripfer from "../media/logo_tripfer_white.svg"
import upArrowIcon from "../media/up-arrow.svg"
import ecommpay_logo from "../media/ecommpay-logo.svg"
import logo_square from "../media/logo-square.svg"
import mastercard from "../media/mastercard.svg"
import visa from "../media/visa.svg"


import Cookies from 'universal-cookie';

const cookies = new Cookies();

class FooterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    let pathname = "";
    if (this.props.globalhistory.history !== "") {
      pathname = this.props.globalhistory.history.location.pathname
    }
    let textInfoMain = this.props.storeState.languageTextMain.footer;
    let textInfoAdmin = this.props.storeState.languageText.footer;
    let isAdmin = this.props.storeState.isSecondLanguageGroupPart;
    let textInfo = isAdmin ? textInfoAdmin : textInfoMain;
    //let textInfo = this.props.storeState.languageTextMain.footer;
    let mobileElemArray = [
      {
        pathname: "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) +"/",
        pathnamesInner: ["/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) +"/"],
        iconClasses: ['footerMobileIconProfile_active', 'footerMobileIconProfile'],
        classValue: 'footerMobileTextProfile',
        value: textInfo.footerMobileTextProfile
      },
      {
        pathname: "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/routes/",
        pathnamesInner: ["/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/routes/"],
        iconClasses: ['footerMobileIconRoutes_active', 'footerMobileIconRoutes'],
        classValue: 'footerMobileTextRoutes',
        value: textInfo.footerMobileTextRoutes
      },
      {
        pathname: "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" })+ "/tours/",
        pathnamesInner: ["/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/tours/"],
        iconClasses: ["footerMobileIconTours_active", "footerMobileIconTours"],
        classValue: "footerMobileTextTours",
        value: textInfo.footerMobileTextTours
      },
      {
        pathname: "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/guides/",
        pathnamesInner: ["/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/guides/"],
        iconClasses: ['footerMobileTextGuides_active', 'footerMobileTextGuides'],
        classValue: 'footerMobileTextPlaces',
        value: textInfo.footerMobileTextGuides
      },
      {
        pathname: "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/places/",
        pathnamesInner: ["/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/places/"],
        iconClasses: ['footerMobileIconPlaces_active', 'footerMobileIconPlaces'],
        classValue: 'footerMobileTextPlaces',
        value: textInfo.footerMobileTextPlaces
      },     
      
    ]

    return (
      <>
        <div className="footer d-md-flex d-none justify-content-center align-items-center  col-12 p-0">
          <div className="footerButtonUp" onClick={() => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }) }}><img src={upArrowIcon} width="20px" height="20px" alt="upArrowIcon" /></div>
          <div className="footer_block d-flex  justify-content-between align-items-center col-12 p-0">
            <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/"} className="col-md-1 col-2 p-0 "><img src={logoTripfer} width="110px" height="18px" alt="logoWhiteIcon" /></Link>
            <div className="footerButtons d-flex justify-content-between col-lg-8 col-md-10 col-sm-12 col-12">
              <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/about-service/"} className="footerButtons_button">{textInfo.footerButtons[0]}</Link>
              <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/affiliate-program/"} className="footerButtons_button">{textInfo.footerButtons[1]}</Link>
              <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/terms/"} className="footerButtons_button">{textInfo.footerButtons[2]}</Link>
              <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/help/"} className="footerButtons_button">{textInfo.footerButtons[3]}</Link>
              <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/contacts/"} className="footerButtons_button">{textInfo.footerButtons[4]}</Link>
              <div className="d-flex">
                
                  
                <div className="d-flex flex-column justify-content-center" style={{visibility: 'hidden'}}>
                  <i style={{ background: "url(" + ecommpay_logo + ")no-repeat", backgroundSize: "100% 100%", width: "70px", height: "24px" }} />
                  <i style={{ background: "url(" + mastercard + ")no-repeat", backgroundSize: "100% 100%", width: "70px", height: "25px" }} />
                </div>
                <div className="d-flex flex-column justify-content-center" style={{visibility: 'hidden'}}>
                  <i style={{ background: "url(" + logo_square + ")no-repeat", backgroundSize: "100% 100%", width: "70px", height: "21px" }} />
                  <i style={{ background: "url(" + visa + ")no-repeat", backgroundSize: "100% 100%", width: "60px", height: "24px" }} />
                </div>
              
                <div className="footerButtonsIcon d-flex align-items-center">
                  <a target="_blank" href="https://www.facebook.com/Tripfer.com.LLC/"><i style={{ background: "url(" + facebookIcon + ")no-repeat", backgroundSize: "100% 100%", width: "30px", height: "20px" }} /></a>
                  <i style={{ background: "url(" + instagramIcon + ")no-repeat", backgroundSize: "100% 100%", width: "28px", height: "20px" }} />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="footerMobile d-md-none d-flex">
          {
            mobileElemArray.map((element, index) =>
              <Link to={element.pathname} className="col d-flex align-items-end p-0" onClick={()=>{window.scroll({ top: 0, left: 0 })}} /*onClick={(event, target)=>{ console.log(event, target); event.preventDefault()}}*/>
                <div className={(element.pathnamesInner.indexOf(pathname) !== -1 ? "foterMobaileItem_active" : " ") + " d-flex flex-column align-items-center justify-content-end col-12 p-md-2 p-0 foterMobaileItem "} >
                  <div className={element.pathnamesInner.indexOf(pathname) !== -1 ? element.iconClasses[0] : element.iconClasses[1]} />
                  <div className={element.classValue}>{element.value}</div>
                </div>
              </Link>
            )
          }
        </div>
        
      </>
    );
  }

}

const Footer = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
  }),
)(FooterClass);

export default Footer;