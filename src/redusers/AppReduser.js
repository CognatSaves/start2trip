import geoFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/georgia.svg'
import ruFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/russia.svg'
import enFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/united-kingdom.svg'
import espFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/spain.svg'

const initialState = {
    cities: ["Тбилиси","Минск"],
    date:"",
    autoVariants: ["Седан","Внедорожник","Минивен","Микроавтобус"],
    languages: [        
        {
          languageName: "Русский",
          icon:ruFlag,
        },
        {
          languageName: "English",
          icon:enFlag,
        },
        {
          languageName: "Georgian",
          icon:geoFlag,
        },
        {
          languageName: "Spanish",
          icon:espFlag,
        },
        
      ],
        
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
    
    
    default: return state;
    }
}