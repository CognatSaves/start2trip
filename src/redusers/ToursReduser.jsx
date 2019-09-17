import { SET_TOURS_LIST,SET_TOUR_PANEL_SELECTED_ELEMENT, SET_TOURS_MORE_PAGES_SHOW, SET_TOURS_PAGE, CHANGE_PANEL_FIXED_CLASS} from './ActionTours';

const initialState = {
    page: 1,
    showPages: 1,
    pagesMenuValue: 8,
    
    tourPanelFixedClass: "",
    tourPanelSelectedElement: -1,
    
    toursList: [],
    categories: [],
    tags: [],
    directions: []
}

export const ToursReduser = (state = initialState, action)=>{
    switch (action.type){
        case SET_TOURS_LIST:{
            let newState={...state};
            newState.toursList = action.toursList;
            newState.categories = action.categories;
            newState.tags = action.tags;
            newState.directions = action.directions;
            newState.daysNumber = action.daysNumber;
            newState.departurePoint = action.departurePoint;
            return newState;
        }
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