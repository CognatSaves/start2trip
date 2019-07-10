import {SET_ROUTES_LIST, SET_SELECTED_DIRECTION, SET_PLACES_LIST, SET_PLACES_PANEL_SELECTED_ELEMENT, CHANGE_PLACES_FIXED_CLASS, SET_PAGES_MENU_VALUE,SET_SORT_MENU_VALUE, SET_PAGE, SET_MORE_PAGES_SHOW,SET_SELECTED_TAG} from './ActionPlaces'

const initialState = {
    page: 1,
    showPages: 1,
    pagesMenuVariants: [10,20,40],
    pagesMenuValue: 10,
    sortMenuVariants: ["Популярности", "Отзывам", "Названию"],//в случае изменения количества
    // или смысла необходимо их кореллировать с изменениями в переводах
    sortMenuValue: 1,
    placePanelFixedClass: "",
    placePanelSelectedElement: -1,
    placesList: [],
    tags:[],
    selectedTags:[],
    directions:[],
    selectedDirection:'',
    country:{},
    routesList: []
}

export const PlacesReduser = (state=initialState, action)=>{
    //console.log("PlacesReduser");
    //console.log(action);
    switch(action.type){
        case SET_ROUTES_LIST:{
            
            let newState={...state};
            newState.routesList=action.routesList;
            newState.directions = action.directions;
            newState.country=action.country;
            return newState;
        }
        case SET_SELECTED_DIRECTION:{
            let newState={...state};
            newState.selectedDirection=action.directionId;
            return newState;
        }
        case SET_SELECTED_TAG:{
            let newState={...state};
            let index = -1;
            for(let i=0; i<newState.selectedTags.length;i++){
                if(newState.selectedTags[i]===action.tagId){
                    index = i;
                    break;
                }
            }
            if(index===-1){
                newState.selectedTags[newState.selectedTags.length]=action.tagId;
            }
            else{
                newState.selectedTags.splice(index,1);
            }
            return newState;
        }
        case SET_PLACES_LIST: {
            let newState={...state};
            newState.placesList = action.placesList;
            newState.tags = action.tags;
            newState.directions = action.directions;
            newState.country=action.country;
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