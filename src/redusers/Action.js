const SET_STATE = 'SET_STATE';

const SET_CITIES = 'SET_CITIES';

const SET_AUTO = 'SET_AUTO';

const SET_PAGES = 'SET_PAGES';

const SET_SORT_MENU = 'SET_SORT_MENU';

const SET_MAX_PRICE = 'SET_MAX_PRICE';

const SET_TEMP_PRICE_PART = 'SET_TEMP_PRICE_PART';

const SET_PRICE_PART = 'SET_PRICE_PART';

const CHANGE_PERSONS_NUMBER = 'CHANGE_PERSONS_NUMBER';

const CHANGE_PERSONS_NUMBER_OLD = 'CHANGE_PERSONS_NUMBER_OLD';

const PEOPLE_MENU_CALL = 'PEOPLE_MENU_CALL';

const LANGUAGE_VALUE_CHOOSE = 'LANGUAGE_VALUE_CHOOSE';

const set_state = function (sourse, cities, date, calendaryVisibility, picture) {
  return {
    type: 'SET_STATE',
    sourse: sourse,
    cities: cities,
    date: date,
    calendaryVisibility: calendaryVisibility,
    picture: picture,
  };
}

const setCities = function (cities){
  return {
    type: 'SET_CITIES',
    cities: cities
  }
}

const setAuto = function (autoValue){
  return {
    type: 'SET_AUTO',
    autoValue: autoValue
  }
}

const setPages = function (pagesMenuValue){
  return {
    type: 'SET_PAGES',
    pagesMenuValue: pagesMenuValue
  }
}

const setSortMenu = function (sortMenuValue){
  return {
    type: 'SET_SORT_MENU',
    sortMenuValue: sortMenuValue
  }
}

const setMaxPrice = function (pricePart, maxPrice){
  return {
    type: 'SET_MAX_PRICE',
    pricePart: pricePart,
    tempPricePart: pricePart,
    maxPrice: maxPrice
  }
}

const setTempPricePart = function (tempPricePart, valueMenu){
  return {
    type: 'SET_TEMP_PRICE_PART',
    tempPricePart: tempPricePart,
    valueMenu: valueMenu
  }
}

const setPricePart = function (pricePart, valueMenu){
  return {
    type: 'SET_PRICE_PART',
    pricePart: pricePart,
    valueMenu: valueMenu
  }
}
const changePersonsNumberDispatch = function (persons) {
  return {
    type: 'CHANGE_PERSONS_NUMBER',
    persons: persons,
  };
}
const changePersonsNumberDispatchOld = function (personsOld) {
  return {
    type: 'CHANGE_PERSONS_NUMBER_OLD',
    personsOld: personsOld,
  };
}

const peopleMenuCall = function (peopleMenu) {
  return {
    type: 'PEOPLE_MENU_CALL',
    peopleMenu: peopleMenu,
  };
}

const languageValueChooseDispatch = function (languageValue,languageIcon,languageMenu) {
  return {
    type: 'LANGUAGE_VALUE_CHOOSE',
    languageValue: languageValue,
    languageIcon:languageIcon,
    languageMenu:languageMenu,
  };
}


export {
  set_state, SET_STATE, 
  setCities, SET_CITIES,
  setAuto, SET_AUTO,
  setPages, SET_PAGES,
  setSortMenu, SET_SORT_MENU,
  setMaxPrice, SET_MAX_PRICE,
  setTempPricePart, SET_TEMP_PRICE_PART,
  setPricePart, SET_PRICE_PART,
  changePersonsNumberDispatch, CHANGE_PERSONS_NUMBER, 
  peopleMenuCall, PEOPLE_MENU_CALL,
  changePersonsNumberDispatchOld, CHANGE_PERSONS_NUMBER_OLD,
  languageValueChooseDispatch, LANGUAGE_VALUE_CHOOSE,
}
