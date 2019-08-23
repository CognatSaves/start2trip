import {SET_DRIVER_CAR_DESCR,SET_DRIVERS_ROUTE_CHANGE, SET_PAGE, SET_MORE_PAGES_SHOW,SET_DRIVERS_LIST,SET_CAR_TYPES,SET_LENGTH_TIME,SET_WAITING_DRIVER_REQUEST} from './ActionDrivers';

const initialState = {
    travelTime: '',
    travelLength: '',
    driversRouteChange: false,
    page: 1,
    showPages: 1,
    driversList: [],
    carTypes: [],
    driverCarDescription:{},
    waitingDriverRequest: false,//эта и след. переменные - флаги для картинки на /drivers
    isFirstSave: true
}

export const DriversReduser = (state=initialState, action)=>{
    switch(action.type){
        case SET_WAITING_DRIVER_REQUEST:{
            let newState = {...state};
            newState.waitingDriverRequest = action.waitingDriverRequest;
            if(action.waitingDriverRequest){
                newState.isFirstSave=false;
            }
            return newState;
        }
        case SET_LENGTH_TIME:{
            let newStateLT = {...state};
            newStateLT.travelTime=action.travelTime;
            newStateLT.travelLength=action.travelLength;
            return newStateLT;
        }
        case SET_DRIVER_CAR_DESCR:{
            let newState = {...state};
            debugger
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
            function sortCarTypes(carTypes){
                
                let orderInNeed = ['Sedan', 'Minivan', 'Jeep', 'Microbus'];
                let res = [];
                let tempCarTypes = [...carTypes];
                for(let i=0; i<orderInNeed.length; i++){
                    for(let j=0; j<tempCarTypes.length; j++){
                        if(orderInNeed[i]===tempCarTypes[j].name_en){
                            res.push(tempCarTypes[j]);
                            tempCarTypes.splice(j,1);
                            break;
                        }
                    }
                }
                res=[...res, ...tempCarTypes];
                return res;
            }
            
            let newState={...state};
            newState.carTypes=sortCarTypes(action.carTypes);
            return newState;
        }
        default: return state;
    }

}