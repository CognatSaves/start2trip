import languageBlueIcon from '../components/media/languageWhite.svg'
import sedan from '../components/media/sedan.svg';
import seatIcon from '../components/media/seat.svg';
import no_smokingIcon from '../components/media/no-smoking.svg'
import snowflakeIcon from '../components/media/snowflake.svg'
import wifiIcon from '../components/media/wifi.svg'
import {
    OPEN_FILTER_SHOW
} from './ActionDrivers';

/*
const Ru_admin = lazy(()=> import('../textInfo/Ru-admin.jsx'));
const En_admin = lazy(()=> import('../textInfo/En-admin.jsx'));
const Ge_admin = lazy(()=> import('../textInfo/Ge-admin.jsx'));
const Ru = lazy(()=> import('../textInfo/Ru.jsx'));
const En = lazy(()=> import('../textInfo/En.jsx'));*/

import Ru_admin from '../textInfo/Ru-admin.jsx';
import En_admin from '../textInfo/En-admin.jsx';
import Ge_admin from '../textInfo/Ge-admin.jsx';

import Ru from '../textInfo/Ru.jsx';
import En from '../textInfo/En.jsx';

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
    SET_LOCALS,
    SET_ACTIVE_CURR,
    SET_ACTIVE_LANG,
    SET_MODAL_REGISTER,
    SET_ACTIVE_LANG_ADMIN,
    CHANGE_LANGUAGE_PART,
    SET_ACTIVE_LANG_ISO,
    CLEAR_FILTERS,
} from './Action';

const langArrayMassAdmin = [En_admin, Ru_admin, Ge_admin];
const langArrayMassMain = [En, Ru];
const langArrayMassAdminISO = ['ENG', 'RUS', 'GEO'];
const langArrayMassMainISO = ['ENG', 'RUS'];

const initialState = {
    cities: [{
            point: "",
            lat: "",
            long: ""
        },
        {
            point: "",
            lat: "",
            long: ""
        },
    ],
    date: "",
    languageText: langArrayMassAdmin[0],
    languageTextMain: langArrayMassMain[0],
    autoVariants: ["Седан", "Внедорожник", "Минивен", "Микроавтобус"],
    autoIcon: sedan,
    autoValue: [], // Участвует в фильтрации
    autoMenu: false,
    languages: [],
    adminLanguages: [],
    activeLanguageNumber: 0,

    activeLanguageNumberAdmin: 0,

    isSecondLanguageGroupPart: false,
    isAdminLanguageType: false,

    currencies: [],
    countries: [],
    activeCurrencyNumber: 0,
    comfort: [{
            icon: seatIcon,
            title: "Кожаный салон"
        },
        {
            icon: snowflakeIcon,
            title: "Климат контроль"
        },
        {
            icon: wifiIcon,
            title: "Бесплатный Wi-Fi"
        },
        {
            icon: no_smokingIcon,
            title: "Курение в салоне запрещено"
        },
        {
            icon: no_smokingIcon,
            title: "Курение в салоне разрешено"
        },
    ],
    pagesMenuVariants: [12, 24, 48],
    pagesMenuValue: 12,
    pagesMenu: false,
    sortMenuValue: "Цене",
    sortMenuWay: true,
    sortMenuVariants: ["Цене", "Популярности", "Рейтингу"],
    sortMenuVariantsMobail: ["Сначала дешевые", "Сначала дорогие", "Популярности", "Рейтингу"],
    sortMenu: false,
    persons: [1, 0], // Участвует в фильтрации
    personsOld: [1, 0], // Участвует в фильтрации
    peopleMenu: false,
    maxPrice: 0,
    pricePart: 0, // Участвует в фильтрации
    tempPricePart: 0,
    valueMenu: false,
    languageValue: [], // Участвует в фильтрации
    languageIcon: languageBlueIcon,
    languageMenu: false,
    country: "",
    isoCountryMap: "",
    isoLanguage: '',
    avatarUrl: "",
    userName: "",
    //isCustomer:true,
    userData: {},
    isAuthorized: false,
    openFilter: false,

    modalRegistration: false
};

export const AppReduser = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE_PART: {
            let newState = {
                ...state
            };
            newState.isSecondLanguageGroupPart = action.isSecondLanguageGroupPart;
            newState.isAdminLanguageType = action.isAdminLanguageType;
            return newState;
        }
        case SET_MODAL_REGISTER: {
            let newState = {
                ...state
            };
            newState.modalRegistration = action.modalRegistration;
            return newState;
        }
        case SET_ACTIVE_CURR: {
            let newState = {
                ...state
            };
            newState.activeCurrencyNumber = action.activeCurrencyNumber;
            return newState;
        }
        case SET_ACTIVE_LANG_ADMIN: {
            let newState = {
                ...state
            };
            newState.activeLanguageNumberAdmin = action.activeLanguageNumberAdmin;
            if (newState.adminLanguages.length > 0) {

                let indexAdmin = langArrayMassAdminISO.indexOf(newState.adminLanguages[action.activeLanguageNumberAdmin].ISO);
                if (indexAdmin === -1) {
                    indexAdmin = langArrayMassAdminISO.indexOf('ENG');
                    if (indexAdmin === -1) {
                        indexAdmin = 0;
                    }
                }
                newState.languageText = langArrayMassAdmin[indexAdmin];
            }
            return newState;
        }
        case SET_ACTIVE_LANG_ISO: {
            
            let newState = {
                ...state
            };
            if (action.mainISO && action.mainISO.length > 0) {
                let isoMainIndex = langArrayMassMainISO.indexOf(action.mainISO);
                if (isoMainIndex !== -1) {
                    newState.languageTextMain = langArrayMassMain[isoMainIndex];
                }
            }
            if (action.adminISO && action.adminISO.length > 0) {
                let isoAdminIndex = langArrayMassAdminISO.indexOf(action.adminISO);
                if (isoAdminIndex !== -1) {
                    newState.languageText = langArrayMassAdmin[isoAdminIndex];
                }
            }
            return newState;
        }
        case SET_ACTIVE_LANG: {

            let newState = {
                ...state
            };
            newState.activeLanguageNumber = action.activeLanguageNumber;

            if (newState.languages.length > 0) {
                let indexMain = langArrayMassMainISO.indexOf(newState.languages[action.activeLanguageNumber].ISO);
                if (indexMain === -1) {
                    indexMain = langArrayMassMainISO.indexOf('ENG');
                    if (indexMain === -1) {
                        indexMain = 0;
                    }
                }
                newState.languageTextMain = langArrayMassMain[indexMain];
            }

            return newState;
        }
        case SET_USER: {

            let newStateSU = {
                ...state
            };
            newStateSU.avatarUrl = action.avatarUrl;
            newStateSU.userName = action.userName;
            newStateSU.userData = action.userData;
            //newStateSU.isCustomer = action.isCustomer;
            if (action.avatarUrl.length === 0 && action.userName.length === 0) {
                newStateSU.isAuthorized = false;
            } else {
                newStateSU.isAuthorized = true;
            }
            return newStateSU;
        }
        case SET_STATE: {
            let newStateSS = {
                ...state
            };
            newStateSS.cities = action.cities;
            newStateSS.date = action.date;
            return newStateSS;
        }
        case SET_CITIES: {
            let newState = {
                ...state
            };
            newState.cities = action.cities;
            return newState;
        }
        case SET_AUTO: {
            let newState = {
                ...state
            };
            newState.autoValue = action.autoValue;
            newState.autoIcon = action.autoIcon;
            return newState;
        }
        case AUTO_MENU_CALL: {
            let newState = {
                ...state
            };
            newState.autoMenu = action.autoMenu;
            newState.pagesMenu = false;
            newState.sortMenu = false;
            newState.peopleMenu = false;
            newState.valueMenu = false;
            newState.languageMenu = false;
            return newState;
        }
        case SET_PAGES: {
            let newState = {
                ...state
            };
            newState.pagesMenuValue = action.pagesMenuValue;
            return newState;
        }
        case SET_PAGES_VISIBLE: {
            let newState = {
                ...state
            };
            newState.pagesMenu = action.pagesMenu;
            newState.autoMenu = false;
            newState.sortMenu = false;
            newState.peopleMenu = false;
            newState.valueMenu = false;
            newState.languageMenu = false;
            return newState;
        }
        case SET_SORT_MENU: {
            let newState = {
                ...state
            };
            newState.sortMenuValue = action.sortMenuValue;
            newState.sortMenuWay = action.sortMenuWay;
            return newState;
        }
        case SET_SORT_MENU_VISIBLE: {
            let newState = {
                ...state
            };
            newState.sortMenu = action.sortMenu;
            newState.autoMenu = false;
            newState.pagesMenu = false;
            newState.peopleMenu = false;
            newState.valueMenu = false;
            newState.languageMenu = false;
            return newState;
        }
        case SET_MAX_PRICE: {
            let newStateSMP = {
                ...state
            };
            newStateSMP.pricePart = action.pricePart;
            newStateSMP.tempPricePart = action.pricePart;
            newStateSMP.maxPrice = action.maxPrice;
            return newStateSMP;
        }
        case SET_TEMP_PRICE_PART: {
            let newState = {
                ...state
            };
            newState.tempPricePart = action.tempPricePart;
            newState.valueMenu = action.valueMenu;
            newState.autoMenu = false;
            newState.pagesMenu = false;
            newState.sortMenu = false;
            newState.peopleMenu = false;
            newState.languageMenu = false;
            return newState;
        }
        case SET_PRICE_PART: {
            let newState = {
                ...state
            };
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
            let newState = {
                ...state
            };
            newState.persons = action.persons;
            return newState;
        }

        case CHANGE_PERSONS_NUMBER_OLD: {
            let newState = {
                ...state
            };
            newState.personsOld = action.personsOld;
            return newState;
        }

        case PEOPLE_MENU_CALL: {
            let newState = {
                ...state
            };
            newState.peopleMenu = action.peopleMenu;
            newState.autoMenu = false;
            newState.pagesMenu = false;
            newState.sortMenu = false;
            newState.valueMenu = false;
            newState.languageMenu = false;
            return newState;
        }

        case LANGUAGE_VALUE_CHOOSE: {
            let newState = {
                ...state
            };
            newState.languageValue = action.languageValue;
            newState.languageIcon = action.languageIcon;
            newState.languageMenu = action.languageMenu;

            return newState;
        }

        case LANGUAGE_MENU_IS_VISIBAL: {
            let newState = {
                ...state
            };
            newState.languageMenu = action.languageMenu;
            newState.autoMenu = false;
            newState.pagesMenu = false;
            newState.sortMenu = false;
            newState.valueMenu = false;
            newState.peopleMenu = false;
            return newState;
        }

        case SET_LOCALS: {

            let newState = {
                ...state
            };
            newState.languages = [...action.languages];
            newState.currencies = [...action.currencies];
            newState.countries = [...action.countries];
            newState.adminLanguages = [...action.adminLanguages];
            return newState;
        }
        case MODAL_COUNTRY: {

            let newState = {
                ...state
            };
            newState.country = action.country;
            if (action.isoCountryMap) {
                newState.isoCountryMap = action.isoCountryMap;
            } else {
                if (newState.countries.length > 0) {
                    for (let i = 0; i < newState.countries.length; i++) {
                        if (newState.countries[i].ISO === action.country) {
                            newState.isoCountryMap = newState.countries[i].isoMap;
                            break;
                        }
                    }
                }
            }
            return newState;
        }
        case OPEN_FILTER_SHOW: {
            let newState = {
                ...state
            };
            newState.openFilter = action.openFilter;
            return newState;
        }
        case CLEAR_FILTERS: {
            let newState = {
                ...state
            };
            newState.persons = [1, 0];
            newState.personsOld = [1, 0];
            newState.autoValue = [];
            newState.pricePart = 0;
            newState.languageValue =[];
            return newState;
        }

        default:
            return state;
    }
}