import React from 'react';
import { connect } from 'react-redux';
import './RenderModalCountry.css'
import { modalCountryDispatch } from '../../redusers/Action'
import { setActiveCurr } from '../../redusers/Action';
import requests from '../../config';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class RenderModalCountryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onSelect = (element) => {

        this.props.globalhistory.changeActiveCountry(element,
            (ISO, isoMap)=>this.props.dispatch(modalCountryDispatch(ISO,isoMap)),
            cookies, this.props.storeState.currencies,
            (currencyIndex) => this.props.dispatch(setActiveCurr(currencyIndex)))
        this.props.close();
        // let namePage = this.props.globalhistory.history.location.pathname.split("/");
        // namePage = namePage.splice(2)
        // namePage = namePage.join('/')//в случае, когда мы стоим в countrySelect при первом заходе в namePage остаётся пустая строка
        let cookiesLangISO = cookies.get('userLangISO', { path: '/' })
        this.props.globalhistory.history.push("/" + element.ISO + "-" + cookiesLangISO + "/")
    }
    render() {
        return (
            <div className="countryBody d-flex flex-column flex-wrap">
                {this.props.storeState.countries.map((element, index) =>
                    <div className="d-flex align-items-center justify-content-start p-0">
                        <img src={element.image.url ? requests.serverAddressImg + element.image.url : ''} alt={element.ISO} width="15px" height="15px" />
                        <p className="m-0 p-1" onClick={() => { this.onSelect(element) }}>{element.defaultName}</p>
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