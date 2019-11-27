const SET_GUIDES_LIST = 'SET_GUIDES_LIST';

const SET_PAGES_MENU_VALUE = 'SET_PAGES_MENU_VALUE';

const SET_SORT_MENU_VALUE = 'SET_SORT_MENU_VALUE';

const SET_PAGE = 'SET_PAGE';

const SET_MORE_PAGES_SHOW = 'SET_MORE_PAGES_SHOW';

const CHANGE_PLACES_FIXED_CLASS = 'CHANGE_PLACES_FIXED_CLASS';

const SET_PLACES_PANEL_SELECTED_ELEMENT = 'SET_PLACES_PANEL_SELECTED_ELEMENT';

const SET_GUIDE_DATA = 'SET_GUIDE_DATA';

const setGuideData = function(guideData,carTypes){
  return {
    type: SET_GUIDE_DATA,
    guideData: guideData,
    carTypes:carTypes
  }
}
const setGuidesList = function (guidesList, country, departurePoints, categories){
    return{
        type: SET_GUIDES_LIST,
        guidesList: guidesList,
        country: country,
        departurePoints:departurePoints,
        categories:categories
    }
}
const setPagesMenuValue = function (pagesMenuValue){
    return {
      type: SET_PAGES_MENU_VALUE,
      pagesMenuValue: pagesMenuValue
    }
}
const setSortMenuValue = function (sortMenuValueText){
    return {
      type: SET_SORT_MENU_VALUE,
      sortMenuValueText: sortMenuValueText
    }  
}
const setPage= function(page){
    return{
      type: SET_PAGE,
      page: page
    }
}
const setMorePagesShow = function (){
    console.log("setMorePagesShow call");
    return{
        type: SET_MORE_PAGES_SHOW
    }
}
const changePlacesFixedClass = function(value){
    return{
      type: CHANGE_PLACES_FIXED_CLASS,
      placePanelFixedClass: value
    }
}
const setPlacesPanelSelectedElement = function(value){
    return{
      type: SET_PLACES_PANEL_SELECTED_ELEMENT,
      placePanelSelectedElement: value
    }
}

export {
    SET_GUIDES_LIST,setGuidesList,
    SET_PAGES_MENU_VALUE,setPagesMenuValue,
    SET_SORT_MENU_VALUE,setSortMenuValue,
    SET_PAGE,setPage,
    SET_MORE_PAGES_SHOW,setMorePagesShow,
    CHANGE_PLACES_FIXED_CLASS,changePlacesFixedClass,
    SET_PLACES_PANEL_SELECTED_ELEMENT,setPlacesPanelSelectedElement,
    SET_GUIDE_DATA,setGuideData
}