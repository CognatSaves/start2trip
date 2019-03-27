import {WHICH_PAGE_RENDER,} from './ActionDriverProfileRegistration';

const initialState = {
    pageRender: "0",
       
};


export const DriverProfileRegistrationtReduser = (state = initialState, action) => {
    switch (action.type){
        case WHICH_PAGE_RENDER:{
            let newState = { ...state };
            newState.pageRender = action.pageRender;
            return newState;
        }
           
    default: return state;
    }
}