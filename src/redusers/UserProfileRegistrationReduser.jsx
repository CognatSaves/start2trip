import {WHICH_PAGE_RENDER_USER,SET_PROFILE_DATA} from './ActionUserProfileRegistration';

const initialState = {
    pageRender: "0",
      
};


export const UserProfileRegistrationReduser = (state = initialState, action) => {
    switch (action.type){
        case WHICH_PAGE_RENDER_USER:{
            let newState = { ...state };
            newState.pageRender = action.pageRender;
            return newState;
        }
        
        
    default: return state;
    }
}