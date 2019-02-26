const initialState = {
    picture: "home",
    cities: ["Тбилиси","Минск"],
    date:"",
        
};

export const AppReduser = (state = initialState, action) =>{
    switch (action.type){
    
    case "SET_STATE":
        let newStateSS = JSON.parse(JSON.stringify(state));
        switch (action.sourse){
            case "HomeBody":
            newStateSS.cities = action.cities;
            newStateSS.date = action.date;
            //newStateSS.picture = action.picture;
            break;

            case "DriversRoute":
            newStateSS.cities = action.cities;
            newStateSS.date = action.date;
            //newStateSS.picture = action.picture;
            break;
            
            default:
        }
        return newStateSS;
    case "SET_CITIES":
        let newStateSC = JSON.parse(JSON.stringify(state));
        newStateSC.cities = action.cities;
        return newStateSC;
    case "CHANGE_PICTURE":
        let newStateCP = JSON.parse(JSON.stringify(state));
        newStateCP.picture=action.picture;
        return newStateCP;
    
    
    default: return state;
    }
}