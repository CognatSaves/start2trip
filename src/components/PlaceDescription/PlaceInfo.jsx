import React from 'react';
import '../Places/PlacesCountryInfo.css';

export default class PlaceInfo extends React.Component {
    render(){
        return(
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
            </div>
        )
    }
}