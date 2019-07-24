import React from 'react';
import { connect } from 'react-redux';
import './RenderModalCountry.css'
import {modalCountryDispatch} from '../../redusers/Action'
import requests from '../../config';
/// Flag Country----------------------------/////
// import geoFlag from './pictures/georgia.svg'
// import ruFlag from './pictures/russia.svg'
// import enFlag from './pictures/united-kingdom.svg'
// import espFlag from './pictures/spain.svg'
// import australiaIcon from './pictures/country/australia.svg'
// import austriaIcon from './pictures/country/austria.svg'
// import azerbaijanIcon from './pictures/country/azerbaijan.svg'
// import armeniaIcon from './pictures/country/armenia.svg'
// import belarusIcon from './pictures/country/belarus.svg'
// import hungaryIcon from './pictures/country/hungary.svg'
// import germanyIcon from './pictures/country/germany.svg'
// import greeceIcon from './pictures/country/greece.svg'
// import israelIcon from './pictures/country/israel.svg'
// import irelandIcon from './pictures/country/ireland.svg'
// import icelandIcon from './pictures/country/iceland.svg'
// import italyIcon from './pictures/country/italy.svg'
// import kazakhstanIcon from './pictures/country/kazakhstan.svg'
// import canadaIcon from './pictures/country/canada.svg'
// import chinaIcon from './pictures/country/china.svg'
// import latviaIcon from './pictures/country/latvia.svg'
// import lebanonIcon from './pictures/country/lebanon.svg'
// import lithuaniaIcon from './pictures/country/lithuania.svg'
// import norwayIcon from './pictures/country/norway.svg'
// import polandIcon from './pictures/country/poland.svg'
// import uSAIcon from './pictures/country/united-states.svg'
// import turkeyIcon from './pictures/country/turkey.svg'
// import ukraineIcon from './pictures/country/ukraine.svg'
// import franceIcon from './pictures/country/france.svg'
// import czechIcon from './pictures/country/czech-republic.svg'
// import switzerlandIcon from './pictures/country/switzerland.svg'
// import swedenIcon from './pictures/country/sweden.svg'
// import estoniaIcon from './pictures/country/estonia.svg'
// import japanIcon from './pictures/country/japan.svg'
/// Flag Country------------^^^-------------/////

import Cookies from 'universal-cookie';
const cookies = new Cookies();


class RenderModalCountryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // country: {
            //     title: "Выберите страну", arrayCountry: [
            //       { img: australiaIcon, ISO:"AUS", isoMap:"au", country: "Австралия" },
            //       { img: austriaIcon, ISO:"AUT", isoMap:"at", country: "Австрия" },
            //       { img: azerbaijanIcon, ISO:"AZE", isoMap:"az", country: "Азербайджан" },
            //       { img: armeniaIcon, ISO:"ARM", isoMap:"am", country: "Армения" },
            //       { img: belarusIcon, ISO:"BLR", isoMap:"by", country: "Беларусь" },
            //       { img: enFlag, ISO:"GBR", isoMap:"gb", country: "Великобритания" },
            //       { img: hungaryIcon, ISO:"HUN", isoMap:"hu", country: "Венгрия" },
            //       { img: germanyIcon, ISO:"DEU", isoMap:"de", country: "Германия" },
            //       { img: greeceIcon, ISO:"GRC", isoMap:"gr", country: "Греция" },
            //       { img: geoFlag, ISO:"GEO", isoMap:"ge", country: "Грузия" },
            //       { img: israelIcon, ISO:"ISR", isoMap:"il", country: "Израиль" },
            //       { img: irelandIcon, ISO:"IRL", isoMap:"ie", country: "Ирландия" },
            //       { img: icelandIcon, ISO:"ISL", isoMap:"is", country: "Исландия" },
            //       { img: espFlag, ISO:"ESP", isoMap:"es", country: "Испания" },
            //       { img: italyIcon, ISO:"ITA", isoMap:"it", country: "Италия" },
            //       { img: kazakhstanIcon, ISO:"KAZ", isoMap:"kz", country: "Казахстан" },
            //       { img: canadaIcon, ISO:"CAN", isoMap:"ca", country: "Канада" },
            //       { img: chinaIcon, ISO:"CHN", isoMap:"cn", country: "Китай" },
            //       { img: latviaIcon, ISO:"LVA", isoMap:"lv", country: "Латвия" },
            //       { img: lebanonIcon, ISO:"LBN",isoMap:"lb", country: "Ливан" },
            //       { img: lithuaniaIcon, ISO:"LTU", isoMap:"lt", country: "Литва" },
            //       { img: norwayIcon, ISO:"NOR", isoMap:"no", country: "Норвегия" },
            //       { img: polandIcon, ISO:"POL", isoMap:"pl", country: "Польша" },
            //       { img: ruFlag, ISO:"RUS", isoMap:"ru", country: "Россия" },
            //       { img: uSAIcon, ISO:"USA", isoMap:"us", country: "США" },
            //       { img: turkeyIcon, ISO:"TUR", isoMap:"tr", country: "Турция" },
            //       { img: ukraineIcon, ISO:"UKR", isoMap:"ua", country: "Украина" },
            //       { img: franceIcon, ISO:"FRA", isoMap:"fr", country: "Франция" },
            //       { img: czechIcon, ISO:"CZE", isoMap:"cz", country: "Чехия" },
            //       { img: switzerlandIcon, ISO:"CHE", isoMap:"ch", country: "Швейцария" },
            //       { img: swedenIcon, ISO:"SWE", isoMap:"se", country: "Швеция" },
            //       { img: estoniaIcon, ISO:"EST", isoMap:"ee", country: "Эстония" },
            //       { img: japanIcon, ISO:"JPN", isoMap:"jp", country: "Япония" }]
            //   },
        };
    }
    onSelect = (element) => {
        debugger
        this.props.dispatch(modalCountryDispatch(element.ISO,element.isoMap));
        let date = new Date(Date.now()+1000*3600*24*60); 
        cookies.set("country",element.ISO, {path: '/', expires: date}); 
        let cookiesLangISO = cookies.get('userLangISO', { path: '/' })
        if(cookiesLangISO===undefined){
            cookies.set('userLangISO', "en", { path: '/', expires: date });
        }
       
        this.props.close();
       let namePage = this.props.globalhistory.history.location.pathname.split("/");
       namePage = namePage.splice(2)
       namePage = namePage.join('/')
        this.props.globalhistory.history.push("/"+element.ISO+"-"+cookiesLangISO+'/'+(namePage===""?"route":namePage))
        // window.location.reload()
    }
    render() {
        return (
            <div className="countryBody d-flex flex-column flex-wrap">
                {this.props.storeState.countries.map((element, index) =>
                    <div className="d-flex align-items-center justify-content-start p-0">
                        <img src={element.image.url ? requests.serverAddress + element.image.url : ''} alt={element.ISO} width="15px" height="15px"/>
                        <p className="m-0 p-1" onClick={()=>{this.onSelect(element)}}>{element.defaultName}</p>
                    </div>
                )}
            </div>
        )
    }

}

const RenderModalCountry = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalhistory: state.GlobalReduser,
    }),
)(RenderModalCountryClass);

export default RenderModalCountry;