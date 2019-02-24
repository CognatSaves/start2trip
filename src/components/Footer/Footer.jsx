import React, { Component } from 'react';
import './Footer.css'
import "./Footer(mobile).css"
import HomeBody from '../home/HomeBody/HomeBody';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
      <div className = "footer">
        <div className="footer_block">
          <div className="footer_logo"/>
          
          <div className="footer_instagramm"/>
          <div className="footer_facebook"/>
          <div className="footerButtons">
            <button className="footerButtons_button">О сервисе</button>
            <button className="footerButtons_button">Партнёрам</button>
            <button className="footerButtons_button">Лицензионное соглашение</button>
            <button className="footerButtons_button">Помощь</button>
            <button className="footerButtons_button">Контакты</button>
          </div>
        </div>
      </div>
      <div className = "footer_mobile">
        <div className = "footer_mobile_element" >
          <div className="footer_mobile_icon" id="footer_mobile_routes"/>
          <div className="footer_mobile_text">Маршруты</div>
        </div>
        <div className = "footer_mobile_element" >
          <div className="footer_mobile_icon" id="footer_mobile_tours"/>
          <div className="footer_mobile_text">Туры</div>
        </div>
        <div className = "footer_mobile_element" >
          <div className="footer_mobile_icon" id="footer_mobile_places"/>
          <div className="footer_mobile_text">Места</div>
        </div>
        <div className = "footer_mobile_element" >
          <div className="footer_mobile_icon" id="footer_mobile_planeTickets"/>
          <div className="footer_mobile_text">Авиабилеты</div>
        </div>
        <div className = "footer_mobile_element" >
          <div className="footer_mobile_icon" id="footer_mobile_profile"/>
          <div className="footer_mobile_text">Профиль</div>
        </div>
      </div>
      </React.Fragment>
    );
  }

}
/*



       
          

          */