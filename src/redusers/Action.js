const SET_STATE = 'SET_STATE';

const SET_CITIES = 'SET_CITIES';

const SET_AUTO = 'SET_AUTO';

const SET_PAGES = 'SET_PAGES';

const SET_PAGES_VISIBLE = 'SET_PAGES_VISIBLE';

const SET_SORT_MENU = 'SET_SORT_MENU';

const SET_SORT_MENU_VISIBLE = 'SET_SORT_MENU_VISIBLE';

const SET_MAX_PRICE = 'SET_MAX_PRICE';

const SET_TEMP_PRICE_PART = 'SET_TEMP_PRICE_PART';

const SET_PRICE_PART = 'SET_PRICE_PART';

const CHANGE_PERSONS_NUMBER = 'CHANGE_PERSONS_NUMBER';

const CHANGE_PERSONS_NUMBER_OLD = 'CHANGE_PERSONS_NUMBER_OLD';

const PEOPLE_MENU_CALL = 'PEOPLE_MENU_CALL';

const LANGUAGE_VALUE_CHOOSE = 'LANGUAGE_VALUE_CHOOSE';

const LANGUAGE_MENU_IS_VISIBAL = 'LANGUAGE_MENU_IS_VISIBAL';

const AUTO_MENU_CALL = 'AUTO_MENU_CALL';

const MODAL_COUNTRY = 'MODAL_COUNTRY';

const SET_USER = 'SET_USER';

const SET_LOCALS = 'SET_LOCALS';

const SET_ACTIVE_CURR = 'SET_ACTIVE_CURR';

const SET_ACTIVE_LANG = 'SET_ACTIVE_LANG';

const SET_MODAL_REGISTER='SET_MODAL_REGISTER';

const SET_ACTIVE_LANG_ADMIN = 'SET_ACTIVE_LANG_ADMIN';

const CHANGE_LANGUAGE_PART = 'CHANGE_LANGUAGE_PART';

const changeLanguagePart = function(isSecondLanguageGroupPart){
    return{
        type: CHANGE_LANGUAGE_PART,
        isSecondLanguageGroupPart:isSecondLanguageGroupPart
    }
}
const setActiveLangAdmin = function(activeLanguageNumberAdmin){
    return{
        type: SET_ACTIVE_LANG_ADMIN,
        activeLanguageNumberAdmin: activeLanguageNumberAdmin
    }
}
const setModalRegister = function(modalRegistration){
    return{
        type: SET_MODAL_REGISTER,
        modalRegistration: modalRegistration
    }
}
const setActiveCurr = function(activeCurrencyNumber){
    return{
        type: 'SET_ACTIVE_CURR',
        activeCurrencyNumber: activeCurrencyNumber
    }
}
const setActiveLang = function(activeLanguageNumber){
    
    return{
        type:'SET_ACTIVE_LANG',
        activeLanguageNumber:activeLanguageNumber
    }
}
const setLocals = function(languages, adminLanguages,currencies, countries) {

    return {
        type: 'SET_LOCALS',
        languages: languages,
        adminLanguages:adminLanguages,
        currencies: currencies,
        countries: countries
    }
}

const setUser = function(userName, avatarUrl, userData) {
    return {
        type: 'SET_USER',
        userName: userName,
        avatarUrl: avatarUrl,
        userData: userData
    }
}
const set_state = function(cities, date) {
    return {
        type: 'SET_STATE',
        cities: cities,
        date: date,
    };
}

const setCities = function(cities) {
    return {
        type: 'SET_CITIES',
        cities: cities
    }
}

const setAuto = function(autoValue, autoIcon) {
    return {
        type: 'SET_AUTO',
        autoValue: autoValue,
        autoIcon: autoIcon,
    }
}
const autoMenuCall = function(autoMenu) {
    return {
        type: 'AUTO_MENU_CALL',
        autoMenu: autoMenu,
    }
}


const setPages = function(pagesMenuValue) {
    return {
        type: 'SET_PAGES',
        pagesMenuValue: pagesMenuValue
    }
}

const setPagesVisible = function(pagesMenu) {
    return {
        type: 'SET_PAGES_VISIBLE',
        pagesMenu: pagesMenu
    }
}

const setSortMenu = function(sortMenuValue, sortMenuWay) {
    return {
        type: 'SET_SORT_MENU',
        sortMenuValue: sortMenuValue,
        sortMenuWay: sortMenuWay,
    }
}

const setSortMenuVisible = function(sortMenu) {
    return {
        type: 'SET_SORT_MENU_VISIBLE',
        sortMenu: sortMenu
    }
}

const setMaxPrice = function(pricePart, maxPrice) {
    return {
        type: 'SET_MAX_PRICE',
        pricePart: pricePart,
        tempPricePart: pricePart,
        maxPrice: maxPrice
    }
}

const setTempPricePart = function(tempPricePart, valueMenu) {
    return {
        type: 'SET_TEMP_PRICE_PART',
        tempPricePart: tempPricePart,
        valueMenu: valueMenu
    }
}

const setPricePart = function(pricePart, valueMenu) {
    return {
        type: 'SET_PRICE_PART',
        pricePart: pricePart,
        valueMenu: valueMenu
    }
}
const changePersonsNumberDispatch = function(persons) {
    return {
        type: 'CHANGE_PERSONS_NUMBER',
        persons: persons,
    };
}
const changePersonsNumberDispatchOld = function(personsOld) {
    return {
        type: 'CHANGE_PERSONS_NUMBER_OLD',
        personsOld: personsOld,
    };
}

const peopleMenuCall = function(peopleMenu) {
    return {
        type: 'PEOPLE_MENU_CALL',
        peopleMenu: peopleMenu,
    };
}

const languageValueChooseDispatch = function(languageValue, languageIcon) {
    return {
        type: 'LANGUAGE_VALUE_CHOOSE',
        languageValue: languageValue,
        languageIcon: languageIcon,
    };
}
const languageMenuIsVisibal = function(languageMenu) {
    return {
        type: 'LANGUAGE_MENU_IS_VISIBAL',
        languageMenu: languageMenu,
    };
}

const modalCountryDispatch = function(country, iso) {
    return {
        type: 'MODAL_COUNTRY',
        country: country,
        isoCountryMap: iso,
    };
}


export {
    set_state,
    SET_STATE,
    setCities,
    SET_CITIES,
    setAuto,
    SET_AUTO,
    setPages,
    SET_PAGES,
    setPagesVisible,
    SET_PAGES_VISIBLE,
    setSortMenu,
    SET_SORT_MENU,
    setSortMenuVisible,
    SET_SORT_MENU_VISIBLE,
    setMaxPrice,
    SET_MAX_PRICE,
    setTempPricePart,
    SET_TEMP_PRICE_PART,
    setPricePart,
    SET_PRICE_PART,
    changePersonsNumberDispatch,
    CHANGE_PERSONS_NUMBER,
    peopleMenuCall,
    PEOPLE_MENU_CALL,
    changePersonsNumberDispatchOld,
    CHANGE_PERSONS_NUMBER_OLD,
    languageValueChooseDispatch,
    LANGUAGE_VALUE_CHOOSE,
    languageMenuIsVisibal,
    LANGUAGE_MENU_IS_VISIBAL,
    autoMenuCall,
    AUTO_MENU_CALL,
    modalCountryDispatch,
    MODAL_COUNTRY,
    setUser,
    SET_USER,
    setLocals,
    SET_LOCALS,
    SET_ACTIVE_CURR,
    setActiveCurr,
    SET_ACTIVE_LANG,
    setActiveLang,
    SET_MODAL_REGISTER,
    setModalRegister,
    SET_ACTIVE_LANG_ADMIN,
    setActiveLangAdmin,
    CHANGE_LANGUAGE_PART,
    changeLanguagePart
}