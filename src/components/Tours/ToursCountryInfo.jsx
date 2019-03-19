import React from 'react';
import '../Places/PlacesCountryInfo.css';
import './ToursCountryInfo.css'; 

import calendar from './pictures/calendar.svg';
import geoIcon from './pictures/geo_icon.svg';

export default class ToursCountryInfo extends React.Component {
    render(){
        return(
            <React.Fragment>
              <div className="placesCountryInfo">
                <div className="placesCountryInfo_countryName">Turonensis Imperii Romani Orientalis</div>
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
                <div className="placesCountryInfo_countryData flex-column">
                  <div className="d-flex" style={{marginBottom: "10px"}}>
                    <div className="toursCountryInfo_inputBlock d-flex" style={{marginLeft: "auto", marginRight: "3px"}}>
                        <div className="toursCountryInfo_inputBlock_icon" style={{background: "url("+geoIcon+") no-repeat",backgroundSize: "16px 17px"}}/>
                        <input className="toursCountryInfo_inputBlock_input" placeholder="Место отправления"/>
                    </div>
                    <div className="toursCountryInfo_inputBlock d-flex" style={{marginRight: "auto", marginLeft: "3px"}}>
                        <div className="toursCountryInfo_inputBlock_icon" style={{background: "url("+calendar+") no-repeat",backgroundSize: "16px 17px"}}/>
                        <input className="toursCountryInfo_inputBlock_input" placeholder="Дата отправления"/>
                    </div>
                  </div>
                    <button className="toursCountryInfo_tourSearchButton">ПОДОБРАТЬ ТУР</button>
                </div>
              </div>         
            </React.Fragment>
        )
    }
}