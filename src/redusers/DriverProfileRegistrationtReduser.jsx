import {WHICH_PAGE_RENDER,SET_PROFILE_DATA,SET_REFRESH_STATE} from './ActionDriverProfileRegistration';

const initialState = {
    pageRender: "0",
    carCards:[],
    profile: {},
    isRefreshExist: false,
    isRefreshing: true,
    isGoodAnswer: true   
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
        /*case SET_REFRESH_STATE:{
            let newStateRS = { ...state };
            if(action.isRefreshExist){
                newStateRS.isRefreshExist = action.isRefreshExist;
            }
            if(action.isRefreshing){
                newStateRS.isRefreshing = action.isRefreshing;
            }
            if(action.isGoodAnswer){
                newStateRS.isGoodAnswer = action.isGoodAnswer;
            }
            return newStateRS;
        }*/
    default: return state;
    }
}