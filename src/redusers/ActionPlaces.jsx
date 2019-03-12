
const SET_PAGES_MENU_VALUE = 'SET_PAGES_MENU_VALUE';

const SET_SORT_MENU_VALUE = 'SET_SORT_MENU_VALUE';

const SET_PAGE = 'SET_PAGES';

const setPagesMenuValue = function (pagesMenuValue){
    alert("SET_PAGES_MENU_VALUE ACTIVATED");
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
  alert("SET_PAGE ACTIVATED");
  return{
    type: 'SET_PAGES',
    page: page
  }
}
  export {

    setPagesMenuValue, SET_PAGES_MENU_VALUE,
    setSortMenuValue, SET_SORT_MENU_VALUE,
    setPage, SET_PAGE,

  }