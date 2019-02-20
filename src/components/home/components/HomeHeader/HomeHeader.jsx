import React, { Component } from 'react';
import './header_css.css'
export default class HomeHeader extends React.Component {
  constructor(props){
    super(props);

  }
  render(){
    return(
      <React.Fragment>
        <div className="header_label"></div>
        <div className="header_geo_block">
          <div className="header_geo_emblem"/>
          <button className="header_geo_button header_button">
            
            <div className="geo_button_value">
              <div className="geo_button_icon"/>
              <div style={{display: "inline-block"}}>GEO</div>
            </div>           
          </button>          
        </div>
        <div className="header_buttonMass">
          <button className="buttonMass_button">МЕСТА</button>
          <button className="buttonMass_button">ТУРЫ</button>
          <button className="buttonMass_button">ОТЕЛИ</button>
          <button className="buttonMass_button">АВИАБИЛЕТЫ</button>
        </div>
        <button className="header_currency header_button header_rightButtonsClass">
          <div className="header_currency_value">$ USD</div>
        </button>
 
       
        <button className="header_language header_button header_rightButtonsClass">
          <div className="header_language_flag"/>
          <div className="header_language_value">RU</div>
        </button>
        <button className="header_registration">
          <div className="header_registration_text">
            ВОЙТИ / РЕГИСТРАЦИЯ
          </div>
        </button> 
      </React.Fragment>
    );
  }
}
/*


        
             

        
        

        




*/