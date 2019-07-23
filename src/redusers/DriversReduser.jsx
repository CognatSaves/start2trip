import {SET_DRIVER_CAR_DESCR,SET_DRIVERS_ROUTE_CHANGE, SET_PAGE, SET_MORE_PAGES_SHOW,SET_DRIVERS_LIST,SET_CAR_TYPES,SET_LENGTH_TIME} from './ActionDrivers';

const initialState = {
    travelTime: '',
    travelLength: '',
    driversRouteChange: false,
    page: 1,
    showPages: 1,
    driversList: [],
    carTypes: [],
    driverCarDescription:{}
}

export const DriversReduser = (state=initialState, action)=>{
    switch(action.type){
        case SET_LENGTH_TIME:{
            let newStateLT = {...state};
            newStateLT.travelTime=action.travelTime;
            newStateLT.travelLength=action.travelLength;
            return newStateLT;
        }
        case SET_DRIVER_CAR_DESCR:{
            let newState = {...state};
            newState.driverCarDescription=action.driverCarDescription;
            return newState;
        }
        case SET_DRIVERS_ROUTE_CHANGE:{
            let newStateSDRC = {...state};
            newStateSDRC.driversRouteChange = action.driversRouteChange;
            return newStateSDRC;
        }
        case SET_PAGE:{
            let newState={...state};
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
        case SET_DRIVERS_LIST:{
            let newState={...state};
            newState.driversList=action.driversList;
            return newState;
        }
        case SET_CAR_TYPES:{
            let newState={...state};
            newState.carTypes=action.carTypes;
            return newState;
        }
        default: return state;
    }

}