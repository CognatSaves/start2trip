import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RenderModalCountry.css'
import {modalCountryDispacth} from '../../redusers/Action'

/// Flag Country----------------------------/////
import geoFlag from './pictures/georgia.svg'
import ruFlag from './pictures/russia.svg'
import enFlag from './pictures/united-kingdom.svg'
import espFlag from './pictures/spain.svg'
import australiaIcon from './pictures/country/australia.svg'
import austriaIcon from './pictures/country/austria.svg'
import azerbaijanIcon from './pictures/country/azerbaijan.svg'
import armeniaIcon from './pictures/country/armenia.svg'
import belarusIcon from './pictures/country/belarus.svg'
import hungaryIcon from './pictures/country/hungary.svg'
import germanyIcon from './pictures/country/germany.svg'
import greeceIcon from './pictures/country/greece.svg'
import israelIcon from './pictures/country/israel.svg'
import irelandIcon from './pictures/country/ireland.svg'
import icelandIcon from './pictures/country/iceland.svg'
import italyIcon from './pictures/country/italy.svg'
import kazakhstanIcon from './pictures/country/kazakhstan.svg'
import canadaIcon from './pictures/country/canada.svg'
import chinaIcon from './pictures/country/china.svg'
import latviaIcon from './pictures/country/latvia.svg'
import lebanonIcon from './pictures/country/lebanon.svg'
import lithuaniaIcon from './pictures/country/lithuania.svg'
import norwayIcon from './pictures/country/norway.svg'
import polandIcon from './pictures/country/poland.svg'
import uSAIcon from './pictures/country/united-states.svg'
import turkeyIcon from './pictures/country/turkey.svg'
import ukraineIcon from './pictures/country/ukraine.svg'
import franceIcon from './pictures/country/france.svg'
import czechIcon from './pictures/country/czech-republic.svg'
import switzerlandIcon from './pictures/country/switzerland.svg'
import swedenIcon from './pictures/country/sweden.svg'
import estoniaIcon from './pictures/country/estonia.svg'
import japanIcon from './pictures/country/japan.svg'
/// Flag Country------------^^^-------------/////




class RenderModalCountryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: {
                title: "ВЫБЕРИТЕ ВАШУ СТРАНУ", arrayCountry: [
                  { img: australiaIcon, country: "Австралия" },
                  { img: austriaIcon, country: "Австрия" },
                  { img: azerbaijanIcon, country: "Азербайджан" },
                  { img: armeniaIcon, country: "Армения" },
                  { img: belarusIcon, country: "Беларусь" },
                  { img: enFlag, country: "Великобритания" },
                  { img: hungaryIcon, country: "Венгрия" },
                  { img: germanyIcon, country: "Германия" },
                  { img: greeceIcon, country: "Греция" },
                  { img: geoFlag, country: "Грузия" },
                  { img: israelIcon, country: "Израиль" },
                  { img: irelandIcon, country: "Ирландия" },
                  { img: icelandIcon, country: "Исландия" },
                  { img: espFlag, country: "Испания" },
                  { img: italyIcon, country: "Италия" },
                  { img: kazakhstanIcon, country: "Казахстан" },
                  { img: canadaIcon, country: "Канада" },
                  { img: chinaIcon, country: "Китай" },
                  { img: latviaIcon, country: "Латвия" },
                  { img: lebanonIcon, country: "Ливан" },
                  { img: lithuaniaIcon, country: "Литва" },
                  { img: norwayIcon, country: "Норвегия" },
                  { img: polandIcon, country: "Польша" },
                  { img: ruFlag, country: "Россия" },
                  { img: uSAIcon, country: "США" },
                  { img: turkeyIcon, country: "Турция" },
                  { img: ukraineIcon, country: "Украина" },
                  { img: franceIcon, country: "Франция" },
                  { img: czechIcon, country: "Чехия" },
                  { img: switzerlandIcon, country: "Швейцария" },
                  { img: swedenIcon, country: "Швеция" },
                  { img: estoniaIcon, country: "Эстония" },
                  { img: japanIcon, country: "Япония" }]
              },
        };
    }
    render() {
        return (
            <div className="countryBody d-flex flex-column flex-wrap">
                {this.state.country.arrayCountry.map((element, index) =>
                    <div className="d-flex flex-row align-items-center justify-content-start col-5 p-0">
                        <img src={element.img} alt={element.country} width="15px" height="15px"/>
                        <p className="m-0 p-1" onClick={()=>{this.props.dispatch(modalCountryDispacth(element.country)); this.props.close()}}>{element.country}</p>
                    </div>
                )}
            </div>
        )
    }

}

const RenderModalCountry = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(RenderModalCountryClass);

export default RenderModalCountry;