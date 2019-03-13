import React, { Component } from 'react';
import './Footer.css'
import "./Footer(mobile).css"
import facebookIcon from "./pictures/facebook-letter-logo.svg"
import instagramIcon from "./pictures/instagram.svg"
import logoWhiteIcon from "./pictures/logo_white_svg.svg"
import upArrowIcon from "./pictures/up-arrow.svg"
import HomeBody from '../home/HomeBody/HomeBody';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="footer d-flex justify-content-center align-items-center col-12">
        <div className="footerButtonUp" onClick={()=>{window.scroll(0,0)}}><img src={upArrowIcon} width="20px" height="20px"  alt="upArrowIcon" /></div>
          <div className="footer_block d-flex flex-row justify-content-betwen align-items-center col-12">
            <img className="col-2" src={logoWhiteIcon} width="110px" height="18px" alt="logoWhiteIcon" />
            <div className="footerButtons col-8">
              <button className="footerButtons_button">О сервисе</button>
              <button className="footerButtons_button">Партнёрам</button>
              <button className="footerButtons_button">Лицензионное соглашение</button>
              <button className="footerButtons_button">Помощь</button>
              <button className="footerButtons_button">Контакты</button>
              <div className="footerButtonsIcon">
                <img src={facebookIcon} width="16px" height="16px" alt="facebookIcon" />
                <img src={instagramIcon} width="17px" height="17px" alt="instagramIcon" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer_mobile">
          <div className="footer_mobile_element" >
            <div className="footer_mobile_icon" id="footer_mobile_routes" />
            <div className="footer_mobile_text">Маршруты</div>
          </div>
          <div className="footer_mobile_element" >
            <div className="footer_mobile_icon" id="footer_mobile_tours" />
            <div className="footer_mobile_text">Туры</div>
          </div>
          <div className="footer_mobile_element" >
            <div className="footer_mobile_icon" id="footer_mobile_places" />
            <div className="footer_mobile_text">Места</div>
          </div>
          <div className="footer_mobile_element" >
            <div className="footer_mobile_icon" id="footer_mobile_planeTickets" />
            <div className="footer_mobile_text">Авиабилеты</div>
          </div>
          <div className="footer_mobile_element" >
            <div className="footer_mobile_icon" id="footer_mobile_profile" />
            <div className="footer_mobile_text">Профиль</div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
