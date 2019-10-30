import {
  isMobileOnly
} from 'react-device-detect';
import {
  setMorePagesShow
} from '../redusers/ActionPlaces'
import {
  startRefresher,
  thenFunc,
  catchFunc,
  isRefreshExistToFalse
} from '../redusers/Action';
import {
  setLengthTime,
  setDriversList,
  setWaitingDriverRequest,
} from '../redusers/ActionDrivers'
import requests from '../config';
import Cookies from 'universal-cookie';




const checkBtUp = (e, that) => {

  let scrollEvent = e.currentTarget.pageYOffset;
  if (isMobileOnly) {
    if (that.state.previousPageYOffset > scrollEvent) {
      document.querySelector(".footerMobile").classList.remove("footerMobile_active");
      if (scrollEvent > 730) {
        document.querySelector(".btUp").classList.add("btUp-active");
      } else {
        if (document.querySelector(".btUp") !== null) {
          document.querySelector(".btUp").classList.remove("btUp-active");
        }
      }
    } else {
      if (document.querySelector(".btUp") !== null) {
        document.querySelector(".btUp").classList.remove("btUp-active");
      }
      if ((document.scrollingElement.offsetHeight - e.currentTarget.top.pageYOffset) < document.scrollingElement.clientHeight + 80) {
        that.props.dispatch(setMorePagesShow());
        // document.querySelector(".footerMobile").classList.remove("footerMobile_active");
      } else {
        // document.querySelector(".footerMobile").classList.add("footerMobile_active");
      }


    }
  } else {
    if ((document.scrollingElement.offsetHeight - e.currentTarget.top.pageYOffset) < document.scrollingElement.clientHeight + 80) {
      that.props.dispatch(setMorePagesShow());

    }
    if (that.state.previousPageYOffset > scrollEvent) {
      if (document.querySelector(".footerButtonUp") !== null) {
        if (scrollEvent > 400) {
          document.querySelector(".footerButtonUp").classList.add("footerButtonUp-active");
        } else {
          document.querySelector(".footerButtonUp").classList.remove("footerButtonUp-active");
        }

      }
    }
  }
  that.setState({
    previousPageYOffset: scrollEvent
  })

}

const lengthTimeCalc = (response) => {

  let res = {
    duration: 0,
    distance: 0
  };
  for (let i = 0; i < response.routes[0].legs.length; i++) {
    res.duration += response.routes[0].legs[i].duration.value;
    res.distance += response.routes[0].legs[i].distance.value;
  }
  res.distance = res.distance / 1000; //конверсия в км
  res.duration = res.duration / 60; //конверсия в минуты
  return res;
}

const setLengthTimeFunc = (that, travelLength, travelTime, textInfo) => {

  function getLengthString(travelLength, textInfo) { //дистанция в км
    let length = travelLength;
    length = Math.ceil(length);
    let lengthString = length + " " + textInfo.km;
    return lengthString;
  }

  function getTimeString(travelTime, textInfo) { //время в минутах
    let hours = travelTime / 60 ^ 0;
    let minutes = (travelTime - hours * 60) ^ 0;
    let days = hours / 24 ^ 0;
    hours = hours - days * 24;
    let timeString = "";
    if (days !== 0) {
      timeString += days + " " + textInfo.days + " " + hours + " " + textInfo.hours;
    } else {
      if (hours !== 0) {
        timeString += hours + " " + textInfo.hours + " ";
      }
      timeString += minutes + " " + textInfo.minutes;
    }
    return timeString;
  }

  let lengthString = getLengthString(travelLength, textInfo);
  let timeString = getTimeString(travelTime, textInfo);
  
  if (that.props.dispatch === undefined) {
  } else {
    that.props.dispatch(setLengthTime(timeString, lengthString, travelTime, travelLength));
  }
}

const createRequestElement = (cities, travelMode) => {

  let waypoints = [];
  for (let i = 1; i < cities.length - 1; i++) {
    waypoints[i - 1] = {
      location: cities[i].point,
      stopover: true
    }
  }
  let request = {
    origin: cities[0].point, //точка старта
    destination: cities[cities.length - 1].point, //точка финиша
    waypoints: waypoints,
    travelMode: travelMode, //режим прокладки маршрута
  };
  return request;
}

const startRefresherGlobal = (that, isNeedRefreshIndicator) => {
  let props = that.props

  if (props === undefined) {
    that.dispatch(startRefresher(isNeedRefreshIndicator))
  } else {
    that.props.dispatch(startRefresher(isNeedRefreshIndicator))
  }


}

const thenFuncGlobal = (that, endFunc) => {
  let props = that.props;
  let tempThat;
  if (props === undefined) {
    tempThat = that;
  } else {
    tempThat = that.props;
  }
  tempThat.dispatch(thenFunc());
  setTimeout(() => {
    tempThat.dispatch(isRefreshExistToFalse());
    if (endFunc) {
      endFunc();
    }
  }, tempThat.storeState?(tempThat.storeState.isNeedRefreshIndicator?700:0):0);
  

}

const catchFuncGlobal = (that) => {

  let props = that.props
  let tempThat;
  if (props === undefined) {
    tempThat = that;
  } else {
    tempThat = that.props;
  }
  tempThat.dispatch(catchFunc());
  setTimeout(() => {
    tempThat.dispatch(isRefreshExistToFalse())
  }, tempThat.storeState?(tempThat.storeState.isNeedRefreshIndicator?700:0):0);
  
}

const findCurrencyEl =(that, iso)=> {
  for (let i = 0; i < that.props.globalReduser.profile.currencies.length; i++) {
      if (iso === that.props.globalReduser.profile.currencies[i].ISO) {
          return i;
      }
  }
}

const createCorrectRoute=(route, length, time)=> {
  let routeString = route[0].point;
  for (let i = 1; i < route.length; i++) {
      routeString += ' - ' + route[i].point;
  }
  routeString += ' (' + length + ', ' + time + ")";
  return routeString;
}

const dateStringConversion=(datestr)=> {
  let date = new Date(datestr);
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  let year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  let minutes = date.getMinutes();
  return (day < 10 ? '0' + day : day) + "." + (month < 10 ? '0' + month : month) + "." + year + ", " + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes);
}




export {
  checkBtUp,
  startRefresherGlobal,
  thenFuncGlobal,
  catchFuncGlobal,
  lengthTimeCalc,
  setLengthTimeFunc,
  createRequestElement,
  findCurrencyEl,
  createCorrectRoute,
  dateStringConversion,
}