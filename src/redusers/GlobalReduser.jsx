import {WHICH_PAGE_RENDER_HISTORY,SET_PROFILE_DATA} from './ActionGlobal';

const initialState = {
    history: "",
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
    profile: {}
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
    default: return state;
    }
}