import geoFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/georgia.svg'
import ruFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/russia.svg'
import enFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/united-kingdom.svg'
import espFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/spain.svg'

const initialState = {
    cities: ["Тбилиси","Минск"],
    date:"",
    autoVariants: ["Седан","Внедорожник","Минивен","Микроавтобус"],
    autoValue: "Тип авто",
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
    pagesMenuVariants: [10,20,40],
    pagesMenuValue: 10,
    sortMenuValue: "Популярность",
    sortMenuVariants: ["Популярность","Рейтинг","Цена"],
    pricePart:100,
    tempPricePart: 100,
    maxPrice: 0
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
    case "SET_AUTO":
        let newStateSA = {...state};
        newStateSA.autoValue = action.autoValue;
        return newStateSA;
    case "SET_PAGES":
        let newStateSP = {...state};
        newStateSP.pagesMenuValue = action.pagesMenuValue;
        return newStateSP;
    case "SET_SORT_MENU":
        let newStateSSM = {...state};
        newStateSSM.sortMenuValue = action.sortMenuValue;
        return newStateSSM;
    case "SET_MAX_PRICE":
        let newStateSMP = {...state};
        newStateSMP.pricePart = action.pricePart;
        newStateSMP.tempPricePart = action.pricePart;
        newStateSMP.maxPrice = action.maxPrice;
        return newStateSMP;
    case "SET_TEMP_PRICE_PART":
        let newStateSTPP = {...state};
        newStateSTPP.tempPricePart = action.tempPricePart;
        return newStateSTPP;
    case "SET_PRICE_PART":
        let newStateSPP = {...state};
        newStateSPP.pricePart = action.pricePart;
        return newStateSPP;
    default: return state;
    }
}