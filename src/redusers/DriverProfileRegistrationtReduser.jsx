import {WHICH_PAGE_RENDER,SET_PROFILE_DATA} from './ActionDriverProfileRegistration';

const initialState = {
    pageRender: "0",
    carCards:[],
    profile: {},   
};


export const DriverProfileRegistrationtReduser = (state = initialState, action) => {
    switch (action.type){
        case WHICH_PAGE_RENDER:{
            let newState = { ...state };
            newState.pageRender = action.pageRender;
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