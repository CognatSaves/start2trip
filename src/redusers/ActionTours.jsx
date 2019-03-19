
const SET_TOURS_MORE_PAGES_SHOW = 'SET_TOURS_MORE_PAGES_SHOW';

const SET_TOURS_PAGE = 'SET_TOURS_PAGE';

const setToursMorePagesShow = function (){
    return{
        type: SET_TOURS_MORE_PAGES_SHOW
    }
  }

const setToursPage = function(page){
    return{
      type: SET_TOURS_PAGE,
      toursPage: page
    }
  }

export {
    setToursMorePagesShow, SET_TOURS_MORE_PAGES_SHOW,
    setToursPage, SET_TOURS_PAGE
}