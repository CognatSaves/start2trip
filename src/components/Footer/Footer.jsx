import React from 'react';
import './Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
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
        pathname: "/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+"/routes",
        pathnamesInner: ["/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+"/routes"],
        iconClasses: ['footerMobileIconRoutes_active','footerMobileIconRoutes'],
        classValue: 'footerMobileTextRoutes',
        value: textInfo.footerMobileTextRoutes
      },
      {
        pathname: "/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"}),
        pathnamesInner: ["/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+"/tours"],
        iconClasses: ["footerMobileIconTours_active","footerMobileIconTours"],
        classValue:"footerMobileTextTours",
        value: textInfo.footerMobileTextTours
      },
      {
        pathname: "/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+"/places",
        pathnamesInner: ["/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+"/places"],
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
        <div className="footer d-xl-flex d-lg-flex d-md-flex d-sm-none d-none justify-content-center align-items-center  col-12 p-0">
          <div className="footerButtonUp" onClick={() => { window.scroll({top: 0, left: 0, behavior: 'smooth'}) }}><img src={upArrowIcon} width="20px" height="20px" alt="upArrowIcon" /></div>
          <div className="footer_block d-flex  justify-content-between align-items-center col-12 p-0">
          <Link to={"/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+"/routes"} className="col-md-1 col-2 p-0 "><img src={logoTripfer} width="110px" height="18px" alt="logoWhiteIcon" /></Link>
            <div className="footerButtons d-flex justify-content-between col-xl-7 col-lg-7 col-md-9 col-sm-12 col-12">
              <Link to="/about-service" className="footerButtons_button">{textInfo.footerButtons[0]}</Link>
              <Link to="/affiliate-program" className="footerButtons_button">{textInfo.footerButtons[1]}</Link>
              <Link to="/licenseAgreement" className="footerButtons_button">{textInfo.footerButtons[2]}</Link>
              <Link to="" className="footerButtons_button">{textInfo.footerButtons[3]}</Link>
              <Link to="/contacts" className="footerButtons_button">{textInfo.footerButtons[4]}</Link>
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
            <Link to={element.pathname} className="col-3 d-flex align-items-end">
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