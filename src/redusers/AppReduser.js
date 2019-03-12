import geoFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/georgia.svg'
import ruFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/russia.svg'
import enFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/united-kingdom.svg'
import espFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/spain.svg'
import languageBlueIcon from '../components/drivers/DriversBody/DriversBlock/pictures/language_blue.svg'
import sedan from '../components/drivers/DriversBody/DriversProperties/components/AutoMenu/pictures/sedan.svg';
import { SET_STATE, SET_CITIES, SET_AUTO, SET_PAGES, SET_PAGES_VISIBLE, SET_SORT_MENU, SET_SORT_MENU_VISIBLE, SET_MAX_PRICE,LANGUAGE_VALUE_CHOOSE,LANGUAGE_MENU_IS_VISIBAL,
  SET_TEMP_PRICE_PART, SET_PRICE_PART, CHANGE_PERSONS_NUMBER, PEOPLE_MENU_CALL, CHANGE_PERSONS_NUMBER_OLD, AUTO_MENU_CALL } from './Action';


const initialState = {
  cities: ["Тбилиси", "Минск"],
  date: "",
  autoVariants: ["Седан", "Внедорожник", "Минивен", "Микроавтобус"],
  autoIcon: sedan,
  autoValue: "Тип авто",
  autoMenu: false,
  languages: [
    {
      languageName: "Русский",
      icon: ruFlag,
    },
    {
      languageName: "English",
      icon: enFlag,
    },
    {
      languageName: "Georgian",
      icon: geoFlag,
    },
    {
      languageName: "Spanish",
      icon: espFlag,
    },

  ],
  pagesMenuVariants: [10, 20, 40],
  pagesMenuValue: 10,
  pagesMenu: false,
  sortMenuValue: "Популярность",
  sortMenuVariants: ["Популярность", "Рейтинг", "Цена"],
  sortMenu: false,
  persons: [1, 0],
  personsOld: "",
  peopleMenu: false,
  pricePart: 100,
  tempPricePart: 100,
  maxPrice: 0,
  valueMenu: false,
  languageValue:"Язык",
  languageIcon:languageBlueIcon,
  languageMenu:false,
};

export const AppReduser = (state = initialState, action) => {
  switch (action.type) {

    case SET_STATE:{
      let newStateSS = { ...state };
      switch (action.sourse) {
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
    }
    case SET_CITIES: {
      let newState = { ...state };
      newState.cities = action.cities;
      return newState;
    }

    case SET_AUTO: {
      let newState = { ...state };
      newState.autoValue = action.autoValue;
      newState.autoIcon = action.autoIcon;
      return newState;
    }

    case AUTO_MENU_CALL: {
      let newState = { ...state };
      newState.autoMenu = action.autoMenu;
      newState.pagesMenu = false;
      newState.sortMenu = false;
      newState.peopleMenu = false;
      newState.valueMenu = false;
      newState.languageMenu = false;
      return newState;
    }

    case SET_PAGES: {
      let newState = { ...state };
      newState.pagesMenuValue = action.pagesMenuValue;
      return newState;
    }

    case SET_PAGES_VISIBLE: {
      let newState = { ...state };
      newState.pagesMenu = action.pagesMenu;
      newState.autoMenu = false;
      newState.sortMenu = false;
      newState.peopleMenu = false;
      newState.valueMenu = false;
      newState.languageMenu = false;
      return newState;
    }

    case SET_SORT_MENU: {
      let newState = { ...state };
      newState.sortMenuValue = action.sortMenuValue;
      return newState;
    }

    case SET_SORT_MENU_VISIBLE: {
      let newState = { ...state };
      newState.sortMenu = action.sortMenu;
      newState.autoMenu = false;
      newState.pagesMenu = false;
      newState.peopleMenu = false;
      newState.valueMenu = false;
      newState.languageMenu = false;
      return newState;
    }
    
    case SET_MAX_PRICE:{
      let newStateSMP = { ...state };
      newStateSMP.pricePart = action.pricePart;
      newStateSMP.tempPricePart = action.pricePart;
      newStateSMP.maxPrice = action.maxPrice;
      return newStateSMP;
    }

    case SET_TEMP_PRICE_PART:{
      let newState = { ...state };
      newState.tempPricePart = action.tempPricePart;
      newState.valueMenu = action.valueMenu;
      newState.autoMenu = false;
      newState.pagesMenu = false;
      newState.sortMenu = false;
      newState.peopleMenu = false;
      newState.languageMenu = false;
      return newState;
    }

    case SET_PRICE_PART:{
      let newState = { ...state };
      newState.pricePart = action.pricePart;
      newState.valueMenu = action.valueMenu;
      newState.autoMenu = false;
      newState.pagesMenu = false;
      newState.sortMenu = false;
      newState.peopleMenu = false;
      newState.languageMenu = false;
      return newState;
    }


    case CHANGE_PERSONS_NUMBER: {
      let newState = { ...state };
      newState.persons = action.persons;
      return newState;
    }

    case CHANGE_PERSONS_NUMBER_OLD: {
      let newState = { ...state };
      newState.personsOld = action.personsOld;
      return newState;
    }

    case PEOPLE_MENU_CALL: {
      let newState = { ...state };
      newState.peopleMenu = action.peopleMenu;
      newState.autoMenu = false;
      newState.pagesMenu = false;
      newState.sortMenu = false;
      newState.valueMenu = false;
      newState.languageMenu = false;
      return newState;
    }
    case LANGUAGE_VALUE_CHOOSE: {
      let newState = { ...state };
      newState.languageValue = action.languageValue;
      newState.languageIcon = action.languageIcon;
      newState.languageMenu = action.languageMenu;

      return newState;
    }
    case LANGUAGE_MENU_IS_VISIBAL: {
      let newState = { ...state };
      newState.languageMenu = action.languageMenu;
      newState.autoMenu = false;
      newState.pagesMenu = false;
      newState.sortMenu = false;
      newState.valueMenu = false;
      newState.peopleMenu = false;
      return newState;
    }



    default: return state;
  }
}