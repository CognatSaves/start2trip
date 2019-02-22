const initialState = {
    calendaryVisibility: 'hidden'
}

export const StateReduser = (state=initialState, action) =>{
    switch(action.type){
        case "CHOOSE_DATE_VIS":
        let newStateCDV = JSON.parse(JSON.stringify(state));
        newStateCDV.calendaryVisibility = action.visibility;
        return newStateCDV;
        

        default: return state;
    }
}