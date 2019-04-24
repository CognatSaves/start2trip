import React from 'react';
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
                  { img: australiaIcon, ISO:"AUS", country: "Австралия" },
                  { img: austriaIcon, ISO:"AUT", country: "Австрия" },
                  { img: azerbaijanIcon, ISO:"AZE", country: "Азербайджан" },
                  { img: armeniaIcon, ISO:"ARM", country: "Армения" },
                  { img: belarusIcon, ISO:"BLR", country: "Беларусь" },
                  { img: enFlag, ISO:"GBR", country: "Великобритания" },
                  { img: hungaryIcon, ISO:"HUN", country: "Венгрия" },
                  { img: germanyIcon, ISO:"DEU", country: "Германия" },
                  { img: greeceIcon, ISO:"GRC", country: "Греция" },
                  { img: geoFlag, ISO:"GEO", country: "Грузия" },
                  { img: israelIcon, ISO:"ISR", country: "Израиль" },
                  { img: irelandIcon, ISO:"IRL", country: "Ирландия" },
                  { img: icelandIcon, ISO:"ISL", country: "Исландия" },
                  { img: espFlag, ISO:"ESP", country: "Испания" },
                  { img: italyIcon, ISO:"ITA", country: "Италия" },
                  { img: kazakhstanIcon, ISO:"KAZ", country: "Казахстан" },
                  { img: canadaIcon, ISO:"CAN", country: "Канада" },
                  { img: chinaIcon, ISO:"CHN", country: "Китай" },
                  { img: latviaIcon, ISO:"LVA", country: "Латвия" },
                  { img: lebanonIcon, ISO:"LBN", country: "Ливан" },
                  { img: lithuaniaIcon, ISO:"LTU", country: "Литва" },
                  { img: norwayIcon, ISO:"NOR", country: "Норвегия" },
                  { img: polandIcon, ISO:"POL", country: "Польша" },
                  { img: ruFlag, ISO:"RUS", country: "Россия" },
                  { img: uSAIcon, ISO:"USA", country: "США" },
                  { img: turkeyIcon, ISO:"TUR", country: "Турция" },
                  { img: ukraineIcon, ISO:"UKR", country: "Украина" },
                  { img: franceIcon, ISO:"FRA", country: "Франция" },
                  { img: czechIcon, ISO:"CZE", country: "Чехия" },
                  { img: switzerlandIcon, ISO:"CHE", country: "Швейцария" },
                  { img: swedenIcon, ISO:"SWE", country: "Швеция" },
                  { img: estoniaIcon, ISO:"EST", country: "Эстония" },
                  { img: japanIcon, ISO:"JPN", country: "Япония" }]
              },
        };
    }
    render() {
        return (
            <div className="countryBody d-flex flex-column flex-wrap">
                {this.state.country.arrayCountry.map((element, index) =>
                    <div className="d-flex align-items-center justify-content-start p-0">
                        <img src={element.img} alt={element.country} width="15px" height="15px"/>
                        <p className="m-0 p-1" onClick={()=>{this.props.dispatch(modalCountryDispacth(element.ISO)); this.props.close()}}>{element.country}</p>
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