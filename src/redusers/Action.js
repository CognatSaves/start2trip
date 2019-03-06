const SET_STATE = 'SET_STATE';

const CHANGE_PERSONS_NUMBER = 'CHANGE_PERSONS_NUMBER';

const CHANGE_PERSONS_NUMBER_OLD = 'CHANGE_PERSONS_NUMBER_OLD';

const PEOPLE_MENU_CALL = 'PEOPLE_MENU_CALL';

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


export {
  set_state, SET_STATE, 
  changePersonsNumberDispatch, CHANGE_PERSONS_NUMBER, 
  peopleMenuCall, PEOPLE_MENU_CALL,
  changePersonsNumberDispatchOld, CHANGE_PERSONS_NUMBER_OLD,
  
}
