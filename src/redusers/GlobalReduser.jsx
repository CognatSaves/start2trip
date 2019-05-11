import {WHICH_PAGE_RENDER_HISTORY} from './ActionGlobal';

const initialState = {
    history: "",   
};


export const GlobalReduser = (state = initialState, action) => {
    switch (action.type){
        case WHICH_PAGE_RENDER_HISTORY:{
            let newState = { ...state };
            newState.history = action.history;
            return newState;
        }  
    default: return state;
    }
}