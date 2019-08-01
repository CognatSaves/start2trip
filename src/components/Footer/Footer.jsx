import React from 'react';
import './Footer.css'
import facebookIcon from "../media/facebook-letter-logo.svg"
import instagramIcon from "../media/instagram.svg"
import logoTripfer from "../media/logo_tripfer_white.svg"
import upArrowIcon from "../media/up-arrow.svg"
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MobileFilter from '../drivers/DriversBody/DriversProperties/MobileFilter/MobileFilter'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class FooterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      
    }
  }

  render() {
  
    let pathname = "";
    if(this.props.globalhistory.history !==""){
       pathname = this.props.globalhistory.history.location.pathname
    }
    
    let textInfo = this.props.storeState.languageTextMain.footer;
    let mobileElemArray = [
      {
        pathname: "/routes",
        pathnamesInner: ["/routes"],
        iconClasses: ['footerMobileIconRoutes_active','footerMobileIconRoutes'],
        classValue: 'footerMobileTextRoutes',
        value: textInfo.footerMobileTextRoutes
      },
      {
        pathname: "/tours",
        pathnamesInner: ["/tours"],
        iconClasses: ["footerMobileIconTours_active","footerMobileIconTours"],
        classValue:"footerMobileTextTours",
        value: textInfo.footerMobileTextTours
      },
      {
        pathname: "/places",
        pathnamesInner: ["/places"],
        iconClasses: ['footerMobileIconPlaces_active','footerMobileIconPlaces'],
        classValue: 'footerMobileTextPlaces',
        value: textInfo.footerMobileTextPlaces
      },
      {
        pathname: "/account",
        pathnamesInner: ["/account/user/profile","/account/driver/profile","/account/agency/profile"],
        iconClasses: ['footerMobileIconProfile_active','footerMobileIconProfile'],
        classValue: 'footerMobileTextProfile',
        value: textInfo.footerMobileTextProfile
      }
    ]
    return (
      <React.Fragment>
        <div className="footer d-xl-flex d-lg-flex d-md-flex d-sm-none d-none justify-content-center align-items-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="footerButtonUp" onClick={() => { window.scroll(0, 0) }}><img src={upArrowIcon} width="20px" height="20px" alt="upArrowIcon" /></div>
          <div className="footer_block d-flex  justify-content-between align-items-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <img className="col-1 p-0" src={logoTripfer} width="110px" height="18px" alt="logoWhiteIcon" />
            <div className="footerButtons d-flex justify-content-around col-xl-8 col-lg-9 col-md-11 col-sm-12 col-12">
              <button className="footerButtons_button">{textInfo.footerButtons[0]}</button>
              <button className="footerButtons_button">{textInfo.footerButtons[1]}</button>
              <button className="footerButtons_button">{textInfo.footerButtons[2]}</button>
              <button className="footerButtons_button">{textInfo.footerButtons[3]}</button>
              <button className="footerButtons_button">{textInfo.footerButtons[4]}</button>
              <div className="footerButtonsIcon d-flex">
                <img src={facebookIcon} width="16px" height="16px" alt="facebookIcon" />
                <img src={instagramIcon} width="17px" height="17px" alt="instagramIcon" />
              </div>
            </div>
          </div>
        </div>

        <div className="footerMobile d-xl-none d-lg-none d-md-none d-sm-flex d-flex">
          {
            mobileElemArray.map((element, index)=>
            <Link to={"/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+element.pathname} className="col-3 d-flex align-items-end">
              <div className={ (element.pathnamesInner.indexOf(pathname)!==-1 ? "foterMobaileItem_active":" " )+ " d-flex flex-column align-items-center justify-content-end col-12 foterMobaileItem "} >
                <div className={element.pathnamesInner.indexOf(pathname)!==-1 ? element.iconClasses[0]:element.iconClasses[1] } />
                <div className={element.classValue}>{element.value}</div>
              </div>
            </Link>
            )
          }
        </div>
        <MobileFilter />
      </React.Fragment>
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