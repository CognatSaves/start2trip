import { SET_TOURS_LIST,SET_TOUR_PANEL_SELECTED_ELEMENT, 
    SET_TOURS_MORE_PAGES_SHOW, SET_TOURS_PAGE,
     CHANGE_PANEL_FIXED_CLASS,SET_MAX_PRICE,
     SET_TEMP_PRICE_PART_TOUR,SET_PRICE_PART_TOUR,
     CHANGE_VISUAL_TYPE
    } from './ActionTours';
    import {SET_PAGE, SET_MORE_PAGES_SHOW,SET_SELECTED_DIRECTION} from './ActionPlaces'

const initialState = {
    page: 1,
    showPages: 1,
    pagesMenuValue: 8,
    
    tourPanelFixedClass: "",
    tourPanelSelectedElement: -1,
    
    toursList: [],
    isToursListFailed: 0,
    categories: [],
    tags: [],
    directions: [],
    maxPrice:0,
    pricePart:0,
    tempPricePart:0,
    valueMenu:0,
    departurePoint:[],
    daysNumber:[],
    selectedDirection:'',
    tourPageVisualType: 'default' //possible variants = 'default', 'wide'
}

export const ToursReduser = (state = initialState, action)=>{
    switch (action.type){
        case SET_TOURS_LIST:{
            
            let newState={...state};
            newState.toursList = action.toursList;
            if(action.toursList.length===0){
                newState.isToursListFailed++;
                //newState.toursList = [{isBreaked: true}];
            }
            else{
                newState.isToursListFailed=0;
            }
            newState.categories = action.categories;
            newState.tags = action.tags;
            newState.directions = action.directions;
            newState.daysNumber = action.daysNumber;
            newState.departurePoint = action.departurePoint;
            return newState;
        }
        case SET_SELECTED_DIRECTION:{
            let newState={...state};
            newState.selectedDirection=action.directionId;
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
        case SET_MAX_PRICE: {
            let newState = {...state};
            newState.maxPrice=action.maxPrice;
            newState.tempPricePart = action.maxPrice;
            return newState;
        }
        case SET_TEMP_PRICE_PART_TOUR: {
            let newState = {
                ...state
            };
            newState.tempPricePart = action.tempPricePart;
            newState.valueMenu = action.valueMenu;
            return newState;
        }
        case SET_PRICE_PART_TOUR: {
            let newState = {
                ...state
            };
            newState.pricePart = action.pricePart;
            newState.valueMenu = action.valueMenu;
            return newState;
        }
        case SET_PAGE: {
            // console.log("Set page placeReduser");
            // console.log(action);
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
        case CHANGE_VISUAL_TYPE:{
            let newState= {...state};
            
            if(!action.toDefault){
                if(!action.tourPageVisualType){
                    switch (newState.tourPageVisualType){
                        case 'thin':{
                            newState.tourPageVisualType='wide';
                            break;
                        }
                        case 'wide':{
                            newState.tourPageVisualType='thin';
                            break;
                        }
                        default: {
                            newState.tourPageVisualType='wide';
                        }
                    }
                }
                else{
                    switch(action.tourPageVisualType){
                        case 'thin':{
                            newState.tourPageVisualType='thin';
                            break;
                        }
                        case 'wide':{
                            newState.tourPageVisualType='wide';
                            break;
                        }
                        default: {
                            newState.tourPageVisualType='wide';
                        }
                    }
                }              
            }
            else{
                newState.tourPageVisualType='wide';
            }
            console.log(document);
            return newState;
        }
        default: return state;
    }
    
}