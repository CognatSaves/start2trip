const SET_DRIVERS_ROUTE_CHANGE = 'SET_DRIVERS_ROUTE_CHANGE';

const SET_PAGE = 'SET_PAGE_DRIVERS';

const SET_MORE_PAGES_SHOW = 'SET_MORE_PAGES_SHOW';

const OPEN_FILTER_SHOW = 'OPEN_FILTER_SHOW';

const SET_DRIVERS_LIST = 'SET_DRIVERS_LIST';

const SET_CAR_TYPES = 'SET_CAR_TYPES';

const SET_DRIVER_CAR_DESCR = 'SET_DRIVER_CAR_DESCR';

const SET_LENGTH_TIME = 'SET_LENGTH_TIME';

const SET_WAITING_DRIVER_REQUEST = 'SET_WAITING_DRIVER_REQUEST';
const setWaitingDriverRequest = function(waitingDriverRequest){
    return{
        type: SET_WAITING_DRIVER_REQUEST,
        waitingDriverRequest:waitingDriverRequest
    }
}
const setDriverCarDescription = function(driverCarDescription){
    
    return{
        type: SET_DRIVER_CAR_DESCR,
        driverCarDescription: driverCarDescription
    }
}
const setCarTypes = function(carTypes){
    return{
        type:SET_CAR_TYPES,
        carTypes: carTypes
    }
}
const setDriversList = function(driversList){
    return{
        type: SET_DRIVERS_LIST,
        driversList: driversList
    }
}
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

const openFilterShow = function (openFilter){
    return{
        type: OPEN_FILTER_SHOW,
        openFilter:openFilter
    }
}
const setLengthTime = function (travelTime,travelLength){
    return{
        type: SET_LENGTH_TIME,
        travelTime: travelTime,
        travelLength: travelLength 
    }
}
export {
    setDriversRouteChange, SET_DRIVERS_ROUTE_CHANGE,
    setPage, SET_PAGE,
    setMorePagesShow, SET_MORE_PAGES_SHOW,
    OPEN_FILTER_SHOW,openFilterShow,
    SET_DRIVERS_LIST,setDriversList,
    SET_CAR_TYPES,setCarTypes,
    SET_DRIVER_CAR_DESCR,setDriverCarDescription,
    SET_LENGTH_TIME,setLengthTime,
    SET_WAITING_DRIVER_REQUEST,setWaitingDriverRequest
}