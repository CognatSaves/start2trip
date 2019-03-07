const initialState = {
    places: [
        {
            name: "Place_name"
        },
        {
            name: "Place_name"
        },
        {
            name: "Place_name"
        },
        {
            name: "Place_name"
        },
        {
            name: "Place_name"
        },
        {
            name: "Place_name"
        },
        {
            name: "Place_name"
        },

    ]
}

export const PlacesReduser = (state=initialState, action)=>{
    switch(action.type){
        default: return state;
    }
    
}