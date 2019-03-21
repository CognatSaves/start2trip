
const SET_PAGES_MENU_VALUE = 'SET_PAGES_MENU_VALUE';

const SET_SORT_MENU_VALUE = 'SET_SORT_MENU_VALUE';

const SET_PAGE = 'SET_PAGE_PLACES';

const SET_MORE_PAGES_SHOW = 'SET_MORE_PAGES_SHOW';

const CHANGE_PLACES_FIXED_CLASS = 'CHANGE_PLACES_FIXED_CLASS';

const setPagesMenuValue = function (pagesMenuValue){
    return {
      type: 'SET_PAGES_MENU_VALUE',
      pagesMenuValue: pagesMenuValue
    }
  }
const setSortMenuValue = function (sortMenuValueText){
  return {
    type: 'SET_SORT_MENU_VALUE',
    sortMenuValueText: sortMenuValueText
  }

}
const  setPage= function(page){
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
  export {

    setPagesMenuValue, SET_PAGES_MENU_VALUE,
    setSortMenuValue, SET_SORT_MENU_VALUE,
    setPage, SET_PAGE,
    setMorePagesShow, SET_MORE_PAGES_SHOW,
    changePlacesFixedClass, CHANGE_PLACES_FIXED_CLASS

  }