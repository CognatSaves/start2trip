import React from 'react';
import { connect } from 'react-redux';
import './RenderModalCountry.css'
import {modalCountryDispatch} from '../../redusers/Action'
import requests from '../../config';

import Cookies from 'universal-cookie';
import {  setActiveCurr  } from '../../redusers/Action';

const cookies = new Cookies();


class RenderModalCountryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onSelect = (element) => {
        function findTargetCurrency(currencies, selectedId){
            //если набор валют корректен, то отработает только этот цикл
            for(let i=0; i<currencies.length; i++){
                if(currencies[i].id===selectedId){
                    return i;
                }
            }
            //если пользовательскую валюту не нашли, выбираем доллары (желательно конечно было бы подтягивать базовую валюту, но то долго
            //и пока у нас базовая валюта - доллар, так что пойдёт)
            for(let i=0; i<currencies.length; i++){
                if(currencies[i].ISO==='USD'){
                    return i;
                }
            }
            //если всё уже совсем плохо, но что-то всё-таки пришло, берём первое попавшееся
            return 0;
        }
        
        this.props.dispatch(modalCountryDispatch(element.ISO,element.isoMap));
        let date = new Date(Date.now()+1000*3600*24*60); 
        cookies.set("country",element.ISO, {path: '/', expires: date}); 

        //данный блок меняет язык при смене страны  - сначала отыскивает номер языка по id, потом
        //вешает соответствующую куку и запись в редусер
        let selectedCurrenctIndex = findTargetCurrency(this.props.storeState.currencies, element.nationalCurrency);
        cookies.set('userCurr', this.props.storeState.currencies[selectedCurrenctIndex].ISO, { path: '/', expires: date });
        this.props.dispatch(setActiveCurr(selectedCurrenctIndex));


        let cookiesLangISO = cookies.get('userLangISO', { path: '/' })
       
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