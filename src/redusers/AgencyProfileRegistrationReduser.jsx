import {WHICH_PAGE_RENDER} from './ActionAgencyProfileRegistration';

const initialState = {
    profile: {}  
};


export const AgencyProfileRegistrationReduser = (state = initialState, action) => {
    switch (action.type){
        case WHICH_PAGE_RENDER:{
            let newState = { ...state };
            newState.pageRender = action.pageRender;
            return newState;
        }
    default: return state;
    }
}