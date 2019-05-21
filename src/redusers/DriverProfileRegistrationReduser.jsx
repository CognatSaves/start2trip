import {WHICH_PAGE_RENDER,SET_PROFILE_DATA,SET_REFRESH_STATE} from './ActionDriverProfileRegistration';

const initialState = {
    profile: {}  
};


export const DriverProfileRegistrationReduser = (state = initialState, action) => {
    switch (action.type){
        case WHICH_PAGE_RENDER:{
            let newState = { ...state };
            newState.pageRender = action.pageRender;
            return newState;
        }
    default: return state;
    }
}