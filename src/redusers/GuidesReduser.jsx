import {SET_GUIDE_DATA,SET_GUIDES_LIST,SET_PAGES_MENU_VALUE,SET_SORT_MENU_VALUE,SET_PAGE,
    SET_MORE_PAGES_SHOW,CHANGE_PLACES_FIXED_CLASS,SET_PLACES_PANEL_SELECTED_ELEMENT} from './ActionGuides';
const initialState = {
    page: 1,
    showPages: 1,
    pagesMenuVariants: [8,16,32],
    pagesMenuValue: 8,
    sortMenuVariants: ["Популярности", "Отзывам"],//в случае изменения количества
    // или смысла необходимо их кореллировать с изменениями в переводах
    sortMenuValue: 1,
    placePanelFixedClass: "",
    placePanelSelectedElement: -1,
    country:{},

    guidesList: [],
    departurePoints: [],

    guideData: {},
    carTypes: []
}

export const GuidesReduser = (state = initialState, action) => {
    switch (action.type){
        case SET_GUIDE_DATA:{
            let newState = {...state};
            newState.guideData = action.guideData;
            newState.carTypes = action.carTypes;
            return newState;
        }
        case SET_GUIDES_LIST:{
            let newState = {...state};
            newState.guidesList = action.guidesList;
            newState.country = action.country;
            newState.departurePoints = action.departurePoints;
            return newState;
        }
        case SET_PAGES_MENU_VALUE: {
            let newState = { ...state };
            newState.pagesMenuValue = action.pagesMenuValue;
            return newState;
        }
        case SET_SORT_MENU_VALUE: {
            
            let newState = {...state};
            newState.sortMenuValue=newState.sortMenuVariants.indexOf(action.sortMenuValueText);
            return newState;
        }
        case SET_PAGE: {
            console.log("Set page placeReduser");
            console.log(action);
            let newState = {...state};
            newState.page=action.page;
            newState.showPages=1;
            return newState;
        }
        case SET_MORE_PAGES_SHOW:{
            let newState={...state};
            newState.showPages=newState.showPages+1;
            newState.page=newState.page+1;
            return newState;
        }
        case CHANGE_PLACES_FIXED_CLASS: {
            let newState = {...state};
            newState.placePanelFixedClass=action.placePanelFixedClass;
            return newState;
        }
        case SET_PLACES_PANEL_SELECTED_ELEMENT: {
            let newState = {...state};
            newState.placePanelSelectedElement = action.placePanelSelectedElement;
            return newState;
        }
        default: return state;
    }
}