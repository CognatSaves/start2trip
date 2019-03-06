const SET_DRIVERS_ROUTE_CHANGE = 'SET_DRIVERS_ROUTE_CHANGE';


const setDriversRouteChange = function (driversRouteChange){
    console.log("setDriversRouteChange");
    console.log("params:");
    console.log(driversRouteChange)
    return {
        type: 'SET_DRIVERS_ROUTE_CHANGE',
        driversRouteChange: driversRouteChange
    }
}

export {
    setDriversRouteChange, SET_DRIVERS_ROUTE_CHANGE
}