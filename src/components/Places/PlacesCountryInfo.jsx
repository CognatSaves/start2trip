import React from 'react';
import './PlacesCountryInfo.css'

import territoryIcon from './pictures/georgia_Монтажная область 1.svg';
import peopleIcon from './pictures/people_Монтажная область 1.svg';
import capitalIcon from './pictures/building_Монтажная область 1.svg';

export default class Places extends React.Component {
    render(){
        return(
            <React.Fragment>
              <div className="placesCountryInfo">
                <div className="placesCountryInfo_countryName">IMPERII ROMANI ORIENTALIS</div>
                <div className="placesCountryInfo_line"/>
                <div className="placesCountryInfo_countryinfo">
                Imperio Romano anno 395 in partes duas diviso, Imperium Romanum Orientale
                (Graece: Βασιλεία Ῥωμαίων) vel etiam ab historicis recentioribus imperium
                Byzantinum nuncupatum principio fuit pars orientalis eius. Postquam
                imperium occidentale eversum est plus quam decem exinde saecula valebat
                donec anno 1453 urbs capitalis eius, Constantinopolis, ab Ottomanis expugnatur.
                Quamquam principio provincias orientales antiqui Romani imperii, i.e. imprimis
                Aegyptum, Asiam Minorem, Haemimontum paeninsulam, Arabiam et oras Africae
                administrandas accepit, saeculo septimo autem Arabis invadentibus magnas
                orientis partes cessit et in Asiam Minorem et Europam meridionalem deminutum
                est. Georgius Ostrogorsky cum imperii radices variis ex fontibus sumptas atque
                fusas describeret Byzantinum imperium tribus ex elementis, id est administrationem
                Romanam, Graecam linguam moresque et Christianam religionem,
                constetisse distinxit.
                </div>
                <div className="placesCountryInfo_countryData">
                  <div className="placesCountryInfo_countryData_element" style={{marginLeft: "auto"}}>
                    <div className="countryData_element_icon">
                      <img src={territoryIcon} width="100%" height="15%" alt=" "/>
                    </div>
                    <div className="countryData_element_text">
                      <text style={{textAlign: "center", width: "100%", fontFamily: "Roboto", }}>
                        <text style={{fontWeight: "300", fontSize: "12px"}}>{"территория"} </text>                     
                        <br/>
                        <text style={{fontWeight: "400", fontSize: "14px"}}>{"69 700 км"}</text>
                      </text> 

                    </div>
                  </div>
                  <div className="placesCountryInfo_countryData_element">
                    <div className="countryData_element_icon" >
                      <img src={peopleIcon} width="100%" height="15%" alt=" "/>
                    </div>
                    <div className="countryData_element_text">
                      <text style={{textAlign: "center", width: "100%", fontFamily: "Roboto", }}>
                        <text style={{fontWeight: "300", fontSize: "12px"}}>{"население"} </text>                     
                        <br/>
                        <text style={{fontWeight: "400", fontSize: "14px"}}>{"3 729 млн"}</text>
                      </text> 
                    </div>
                  </div>
                  <div className="placesCountryInfo_countryData_element" style={{marginRight: "auto"}}>
                    <div className="countryData_element_icon"  >
                      <img src={capitalIcon} width="100%" height="15%" alt=" "/>
                    </div>
                    <div className="countryData_element_text">
                      <text style={{textAlign: "center", width: "100%", fontFamily: "Roboto", }}>
                        <text style={{fontWeight: "300", fontSize: "12px"}}>{"столица"} </text>                     
                        <br/>
                        <text style={{fontWeight: "400", fontSize: "14px"}}>{"Тбилиси"}</text>
                      </text>  
                    </div>
                  </div>
                </div>
              </div>         
            </React.Fragment>
        )
    }
}