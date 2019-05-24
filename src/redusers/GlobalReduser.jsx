import {WHICH_PAGE_RENDER_HISTORY,SET_PROFILE_DATA,SET_URL_ADDRESS} from './ActionGlobal';
import Ru_Drivers from '../textInfo/Ru-Drivers'

const initialState = {
    history: "",
    languageText:Ru_Drivers,
    readCookie: function(name){
        var name_cook = name+"=";
        var spl = document.cookie.split(";");           
        for(var i=0; i<spl.length; i++) {           
            var c = spl[i];               
            while(c.charAt(0) == " ") {               
                c = c.substring(1, c.length);                   
            }               
            if(c.indexOf(name_cook) == 0) {                   
                return c.substring(name_cook.length, c.length);                    
            }               
        }           
        return null;
    },
    compressConfig: {
        quality: 0.8,
        maxWidth: 1600,
        maxHeight: 1200,
        autoRotate: true,
        debug: true
    },
    profile: {},
    previousUrl: ''
};


export const GlobalReduser = (state = initialState, action) => {
    switch (action.type){
        case WHICH_PAGE_RENDER_HISTORY:{
            let newState = { ...state };
            newState.history = action.history;
            return newState;
        }
        case SET_PROFILE_DATA:{
            let newStatePD = { ...state };
            newStatePD.profile = action.profile;
            return newStatePD;
        }
        case SET_URL_ADDRESS:{
            debugger;
            let newStateUA = { ...state };
            newStateUA.previousUrl = action.previousUrl;
            return newStateUA;
        }  
    default: return state;
    }
}