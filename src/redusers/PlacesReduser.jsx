import {SET_PAGES_MENU_VALUE,SET_SORT_MENU_VALUE, SET_PAGE} from './ActionPlaces'

const initialState = {
    page: 1,
    pagesMenuVariants: [10,20,40],
    pagesMenuValue: 10,
    sortMenuVariants: ["Популярности", "Отзывам", "Названию"],
    sortMenuValue: 1,
    places: [
        {
            country: "Imperii Romani Orientalis",
            places: [
                {
                    rating: 3.1,
                    comments: 112,
                    name: "Большой ипподром"
                },
                {
                    rating: 3.2,
                    comments: 122,
                    name: "Большой ипподром1"
                },
                {
                    rating: 3.3,
                    comments: 312,
                    name: "Большой ипподром2"
                },
                {
                    rating: 3.4,
                    comments: 142,
                    name: "Большой ипподром3"
                },
                {
                    rating: 3.5,
                    comments: 152,
                    name: "Большой ипподром4"
                },
                {
                    rating: 3.6,
                    comments: 129,
                    name: "Большой ипподром5"
                },
                {
                    rating: 3.7,
                    comments: 162,
                    name: "Большой ипподром6"
                },
                {
                    rating: 3.8,
                    comments: 120,
                    name: "Большой ипподром7"
                },
                {
                    rating: 3.1,
                    comments: 2,
                    name: "Большой ипподром8"
                },
                {
                    rating: 3.1,
                    comments: 112,
                    name: "Большой ипподром9"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром10"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром11"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром12"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром13"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром14"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром15"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром16"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром17"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром18"
                },
                {
                    rating: 3.1,
                    comments: 12,
                    name: "Большой ипподром19"
                },
            ]
        },
        

    ]
}

export const PlacesReduser = (state=initialState, action)=>{
    switch(action.type){
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
            let newState = {...state};
            newState.page=action.page;
            return newState;
        }
        default: return state;
    }
    
}