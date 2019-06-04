// import geoFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/georgia.svg'
// import ruFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/russia.svg'
// import enFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/united-kingdom.svg'
// import espFlag from '../components/drivers/DriversBody/DriversProperties/components/LanguageMenu/pictures/spain.svg'
import languageBlueIcon from '../components/drivers/DriversBody/DriversBlock/pictures/languageWhite.svg'
import sedan from '../components/drivers/DriversBody/DriversProperties/components/AutoMenu/pictures/sedan.svg';
import seatIcon from '../components/driverProfileRegistration/img/seat.svg';
import no_smokingIcon from '../components/driverProfileRegistration/img/no-smoking.svg'
import snowflakeIcon from '../components/driverProfileRegistration/img/snowflake.svg'
import wifiIcon from '../components/driverProfileRegistration/img/wifi.svg'
import { OPEN_FILTER_SHOW } from './ActionDrivers';


import {
    SET_STATE,
    SET_CITIES,
    SET_AUTO,
    SET_PAGES,
    SET_PAGES_VISIBLE,
    SET_SORT_MENU,
    SET_SORT_MENU_VISIBLE,
    SET_MAX_PRICE,
    LANGUAGE_VALUE_CHOOSE,
    LANGUAGE_MENU_IS_VISIBAL,
    SET_TEMP_PRICE_PART,
    SET_PRICE_PART,
    CHANGE_PERSONS_NUMBER,
    PEOPLE_MENU_CALL,
    CHANGE_PERSONS_NUMBER_OLD,
    AUTO_MENU_CALL,
    MODAL_COUNTRY,
    SET_USER,
    SET_LOCALS
} from './Action';


const initialState = {
    cities: [
        { point: "", lat: "", long: "" },
        { point: "", lat: "", long: "" },
    ],
    date: "",
    autoVariants: ["Седан", "Внедорожник", "Минивен", "Микроавтобус"],
    autoIcon: sedan,
    autoValue: "Любое авто",
    autoMenu: false,
    languages: [],
    currencies: [],
    comfort: [
        { icon: seatIcon, title: "Кожаный салон" },
        { icon: snowflakeIcon, title: "Климат контроль" },
        { icon: wifiIcon, title: "Бесплатный Wi-Fi" },
        { icon: no_smokingIcon, title: "Курение в салоне запрещено" },
        { icon: no_smokingIcon, title: "Курение в салоне разрешено" },
    ],
    pagesMenuVariants: [12, 24, 48],
    pagesMenuValue: 12,
    pagesMenu: false,
    sortMenuValue: "Цене",
    sortMenuWay: false,
    sortMenuVariants: ["Цене", "Популярности", "Рейтингу"],
    sortMenuVariantsMobail: ["Сначала дешевые", "Сначала дорогие", "Популярности", "Рейтингу"],
    sortMenu: false,
    persons: [1, 0],
    personsOld: [1, 0],
    peopleMenu: false,
    pricePart: 100,
    tempPricePart: 100,
    maxPrice: 0,
    valueMenu: false,
    languageValue: "Любой язык",
    languageIcon: languageBlueIcon,
    languageMenu: false,
    country: "GEO",
    isoCountryMap: "ge",
    avatarUrl: "",
    userName: "",
    isAuthorized: false,
    openFilter: false,
};

export const AppReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            {
                let newStateSU = {...state };
                newStateSU.avatarUrl = action.avatarUrl;
                newStateSU.userName = action.userName;
                if (action.avatarUrl.length === 0 && action.userName.length === 0) {
                    newStateSU.isAuthorized = false;
                } else {
                    newStateSU.isAuthorized = true;
                }
                return newStateSU;
            }
        case SET_STATE:
            {
                let newStateSS = {...state };
                newStateSS.cities = action.cities;
                newStateSS.date = action.date;
                return newStateSS;
            }
        case SET_CITIES:
            {
                let newState = {...state };
                newState.cities = action.cities;
                return newState;
            }

        case SET_AUTO:
            {
                let newState = {...state };
                newState.autoValue = action.autoValue;
                newState.autoIcon = action.autoIcon;
                return newState;
            }

        case AUTO_MENU_CALL:
            {
                let newState = {...state };
                newState.autoMenu = action.autoMenu;
                newState.pagesMenu = false;
                newState.sortMenu = false;
                newState.peopleMenu = false;
                newState.valueMenu = false;
                newState.languageMenu = false;
                return newState;
            }

        case SET_PAGES:
            {
                let newState = {...state };
                newState.pagesMenuValue = action.pagesMenuValue;
                return newState;
            }

        case SET_PAGES_VISIBLE:
            {
                let newState = {...state };
                newState.pagesMenu = action.pagesMenu;
                newState.autoMenu = false;
                newState.sortMenu = false;
                newState.peopleMenu = false;
                newState.valueMenu = false;
                newState.languageMenu = false;
                return newState;
            }

        case SET_SORT_MENU:
            {
                let newState = {...state };
                newState.sortMenuValue = action.sortMenuValue;
                newState.sortMenuWay = action.sortMenuWay;
                return newState;
            }

        case SET_SORT_MENU_VISIBLE:
            {
                let newState = {...state };
                newState.sortMenu = action.sortMenu;
                newState.autoMenu = false;
                newState.pagesMenu = false;
                newState.peopleMenu = false;
                newState.valueMenu = false;
                newState.languageMenu = false;
                return newState;
            }

        case SET_MAX_PRICE:
            {
                let newStateSMP = {...state };
                newStateSMP.pricePart = action.pricePart;
                newStateSMP.tempPricePart = action.pricePart;
                newStateSMP.maxPrice = action.maxPrice;
                return newStateSMP;
            }

        case SET_TEMP_PRICE_PART:
            {
                let newState = {...state };
                newState.tempPricePart = action.tempPricePart;
                newState.valueMenu = action.valueMenu;
                newState.autoMenu = false;
                newState.pagesMenu = false;
                newState.sortMenu = false;
                newState.peopleMenu = false;
                newState.languageMenu = false;
                return newState;
            }

        case SET_PRICE_PART:
            {
                let newState = {...state };
                newState.pricePart = action.pricePart;
                newState.valueMenu = action.valueMenu;
                newState.autoMenu = false;
                newState.pagesMenu = false;
                newState.sortMenu = false;
                newState.peopleMenu = false;
                newState.languageMenu = false;
                return newState;
            }


        case CHANGE_PERSONS_NUMBER:
            {
                let newState = {...state };
                newState.persons = action.persons;
                return newState;
            }

        case CHANGE_PERSONS_NUMBER_OLD:
            {
                let newState = {...state };
                newState.personsOld = action.personsOld;
                return newState;
            }

        case PEOPLE_MENU_CALL:
            {
                let newState = {...state };
                newState.peopleMenu = action.peopleMenu;
                newState.autoMenu = false;
                newState.pagesMenu = false;
                newState.sortMenu = false;
                newState.valueMenu = false;
                newState.languageMenu = false;
                return newState;
            }

        case LANGUAGE_VALUE_CHOOSE:
            {
                let newState = {...state };
                newState.languageValue = action.languageValue;
                newState.languageIcon = action.languageIcon;
                newState.languageMenu = action.languageMenu;

                return newState;
            }

        case LANGUAGE_MENU_IS_VISIBAL:
            {
                let newState = {...state };
                newState.languageMenu = action.languageMenu;
                newState.autoMenu = false;
                newState.pagesMenu = false;
                newState.sortMenu = false;
                newState.valueMenu = false;
                newState.peopleMenu = false;
                return newState;
            }

        case SET_LOCALS:
            {

                let newState = {...state };
                newState.languages = [...action.languages];
                newState.currencies = [...action.currencies];
                return newState;
            }
        case MODAL_COUNTRY:
            {
                let newState = {...state };
                newState.country = action.country;
                newState.isoCountryMap = action.isoCountryMap;
                return newState;
            }
        case OPEN_FILTER_SHOW:
            {
                let newState = {...state };
                newState.openFilter = action.openFilter;
                return newState;
            }


        default:
            return state;
    }
}