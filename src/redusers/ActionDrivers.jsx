const SET_DRIVERS_ROUTE_CHANGE = 'SET_DRIVERS_ROUTE_CHANGE';

const SET_PAGE = 'SET_PAGE_DRIVERS';

const SET_MORE_PAGES_SHOW = 'SET_MORE_PAGES_SHOW';

const setDriversRouteChange = function (driversRouteChange){
    return {
        type: 'SET_DRIVERS_ROUTE_CHANGE',
        driversRouteChange: driversRouteChange
    }
}

const setPage = function (page){
    console.log("setPage(ActionDrivers) call");
    console.log(setPage);
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
export {
    setDriversRouteChange, SET_DRIVERS_ROUTE_CHANGE,
    setPage, SET_PAGE,
    setMorePagesShow, SET_MORE_PAGES_SHOW
}