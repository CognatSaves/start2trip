const initialState = {
    picture: "home",
    cities: ["Тбилиси","Минск"],
    date:"",
    calendaryVisibility: 'hidden'
};

export const AppReduser = (state = initialState, action) =>{
    switch (action.type){
    
    case "SET_STATE":
        let newStateSS = JSON.parse(JSON.stringify(state));
        switch (action.sourse){
            case "HomeBody":
            newStateSS.cities = action.cities;
            newStateSS.date = action.date;
            newStateSS.calendaryVisibility = action.calendaryVisibility;
            newStateSS.picture = action.picture;
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
    case "CHANGE_CITY":
        let newStateCC = JSON.parse(JSON.stringify(state));
        newStateCC.cities[action.index]=action.value;
        return newStateCC;
    case "ADD_CITY":
        let newStateAC = JSON.parse(JSON.stringify(state));
        newStateAC.cities[newStateAC.cities.length]="";
        return newStateAC;
    case "REMOVE_CITY":
        let newStateRC= JSON.parse(JSON.stringify(state));
        newStateRC.cities.splice(action.index, 1);
        return newStateRC;
    case "CHOOSE_DATE_VIS":
        let newStateCDV = JSON.parse(JSON.stringify(state));
        newStateCDV.calendaryVisibility = action.visibility;
        return newStateCDV;
    case "SET_DATE":
        let newStateSD = JSON.parse(JSON.stringify(state));
        newStateSD.date=action.date;
        return newStateSD;
    default: return state;
    }
}