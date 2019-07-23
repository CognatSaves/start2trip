import { SET_TOUR_PANEL_SELECTED_ELEMENT, SET_TOURS_MORE_PAGES_SHOW, SET_TOURS_PAGE, CHANGE_PANEL_FIXED_CLASS} from './ActionTours';

const initialState = {
    toursPage: 1,
    toursShowPages: 1,
    tourPanelFixedClass: "",
    tourPanelSelectedElement: -1,
    
}

export const ToursReduser = (state = initialState, action)=>{
    switch (action.type){
        case SET_TOURS_MORE_PAGES_SHOW:{
            let newState={...state};
            newState.toursShowPages=newState.toursShowPages+1;
            newState.toursPage=newState.toursPage+1;
            return newState;
        }
        case SET_TOURS_PAGE: {
            let newState = {...state};
            newState.toursPage=action.toursPage;
            newState.toursShowPages=1;
            return newState;
        }
        case CHANGE_PANEL_FIXED_CLASS: {
            let newState = {...state};
            newState.tourPanelFixedClass=action.tourPanelFixedClass;
            return newState;
        }
        case SET_TOUR_PANEL_SELECTED_ELEMENT: {
            let newState = {...state};
            newState.tourPanelSelectedElement=action.tourPanelSelectedElement;
            return newState;
        }
        default: return state;
    }
    
}