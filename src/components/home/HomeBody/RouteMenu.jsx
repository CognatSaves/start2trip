import React from 'react';
import './RouteMenu.css'
import { connect } from 'react-redux';
import { setCities, set_state, clearFilters } from '../../../redusers/Action'
import { isMobileOnly } from 'react-device-detect'
import { setDriversList, setCarTypes, setWaitingDriverRequest } from '../../../redusers/ActionDrivers';
import { AppReduser } from '../../../redusers/AppReduser';
import requests from '../../../config';
import { setLengthTime } from '../../../redusers/ActionDrivers'

import addIcon from '../../media/addWhite.svg'
import stopPoint from '../../media/stopPoint-white.svg'
import comeback from '../../media/comeback-white.svg'
import whitOutMoney from '../../media/whitOutMoney-white.svg'
import driverIcon from '../../media/driverIcon-white.svg'


import LocationSearchInput from './Search'
import DatePicker from 'material-ui/DatePicker';
import {
  startRefresherGlobal, thenFuncGlobal,
  catchFuncGlobal, lengthTimeCalc,
  setLengthTimeFunc, createRequestElement,
} from '../../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CityRouteTable = (props) => {
  const { cities, changeCity, removeCity, addCity, isoCountryMap, /*readOnlyOn,*/ language, textInfo, alphabet } = props;
  // let workCities = [...cities];
  // let tempStart = workCities.shift();
  // workCities.pop();
  // console.log(cities, "cities");
  // console.log(workCities, "workCities");
  //
  return (
    <>
      {isMobileOnly ?
        <div className="addCities" id={'addCities.' + language}>
          {cities.map((element, index) =>
            <div className="startCity d-flex col-12 p-0" key={'CityRouteTable' + index + cities[index].point + language} id={'CityRouteTable' + index + cities[index].point + language}>
              <div className={/*readOnlyOn ? "col-12 p-0" :*/ (index <= 1 ? "col-12 p-0" : "col-10 pl-0 pr-1")}>
                <div className="addCitiesLocationDropDown col p-0">
                  <LocationSearchInput readOnlyOn={/*readOnlyOn ? true : false*/false} address={cities[index].point} changeCity={changeCity}
                    index={index} classDropdown="searchElement_style" spanText={alphabet[index]}
                    placeholder={index ? textInfo.locationSearchPlaceholder.first : textInfo.locationSearchPlaceholder.second}
                    classDiv={index > 1 && !cities[index].point ? "classDivMobail  _checkDiv startCity-CheckInput col-12"
                      : "classDivMobail  _checkDiv col-12"} classInput="city_input _checkInput" isoCountryMap={isoCountryMap} />
                </div>
              </div>
              {
                /*
                readOnlyOn ?
                <React.Fragment />
                :
                <div className="crossToolTip col-2 p-0" style={{ display: index <= 1 ? "none" : "" }} onClick={() => removeCity(index)}>
                  <i className="crossIcon"></i>
                </div>
                */
              }
              <div className="crossToolTip col-2 p-0" style={{ display: index <= 1 ? "none" : "" }} onClick={() => removeCity(index)}>
                <i className="crossIcon"></i>
              </div>
            </div>
          )}

        </div>
        :
        <div className="d-flex flex-wrap col-12 p-0" id={'addCities2.' + language}>
          {cities.map((element, index) =>
            <div className={index % 2 == 0 && index == cities.length - 1 ? "startCity d-flex col-6 p-0" : "startCity d-flex col-6 p-0"/*readOnlyOn ? (index % 2 == 0 && index == cities.length - 1 ? "startCity d-flex col-12 p-0" : "startCity d-flex col-6 p-0") : "startCity d-flex col-6 p-0"*/}
              key={element + index + cities[index].point + language}>
              <div className={index <= 1 ? (index % 2 ? "col-12 pl-0 pr-1" : "col-12 pl-0 pr-1") : ("col-10 pl-0 pr-1 "/*readOnlyOn ? "col-12 pl-0 pr-1" : "col-10 pl-0 pr-1 "*/)}>
                <div className="addCitiesLocationDropDown col p-0" key={'LocationSearchInput' + index + language}>
                  <LocationSearchInput readOnlyOn={/*readOnlyOn ? true : false*/false} address={cities[index].point} changeCity={changeCity}
                    index={index} classDropdown="searchElement_style" spanText={alphabet[index]}
                    placeholder={index ? textInfo.locationSearchPlaceholder.first : textInfo.locationSearchPlaceholder.second}
                    classDiv={index > 1 && !cities[index].point ? "classDiv  _checkDiv startCity-CheckInput col-12"
                      : "classDiv  _checkDiv col-12"} classInput="city_input _checkInput" isoCountryMap={isoCountryMap} />
                </div>
              </div>
              {
                /*
                readOnlyOn ?
                  <React.Fragment />
                  :
                  <div className="crossToolTip col p-0" style={{ display: index <= 1 ? "none" : "" }}
                    onClick={() => removeCity(index)}>
                    <i className="crossIcon"></i>
                    <span className="crossToolTipText" style={{ display: isMobileOnly ? "none" : "block" }} >
                      {textInfo.removePointText}</span>
                  </div>
                */

              }
              <div className="crossToolTip col p-0" style={{ display: index <= 1 ? "none" : "" }}
                onClick={() => removeCity(index)}>
                <i className="crossIcon"></i>
                <span className="crossToolTipText" style={{ display: isMobileOnly ? "none" : "block" }} >
                  {textInfo.removePointText}</span>
              </div>
            </div>
          )}

          {
            /*
            readOnlyOn ?
              <React.Fragment />
              :
              <>
                <div className=" d-flex routemenu_addCity col" onClick={() => { addCity() }}>
                  <div className="routemenu_city_add_text" style={{ background: "url(" + addIcon + ") no-repeat" }} >{textInfo.addPointText}</div>
                </div>
              </>
            */
          }
          <div className=" d-flex routemenu_addCity col" onClick={() => { addCity() }}>
            <div className="routemenu_city_add_text" style={{ background: "url(" + addIcon + ") no-repeat" }} >{textInfo.addPointText}</div>
          </div>

        </div>
      }
    </>
  )
}

class RouteMenuClass extends React.Component {
  constructor(props) {

    function setCitiesFromUrl(pathname) {

      let newString = pathname.split('from-');
      let newArrayCities = newString[1].split("-to-");
      let langISO = cookies.get('userLang', { path: '/' });

      return true;

    }
    super(props);

    console.log(window);
    console.log(props.match);
    console.log(document);

    let result = props.globalhistory.findGetParameter("date");
    let dateValue;

    if (result) {
      dateValue = props.globalhistory.getDateFromDateString(result);
      dateValue = new Date(dateValue);
      let now = new Date(Date.now());
      if (dateValue < now) {
        //dateValue = new Date(Date.now())

        let day = dateValue.getDate(); let month = dateValue.getMonth(); let year = dateValue.getFullYear();
        let daynow = now.getDate(); let monthnow = now.getMonth(); let yearnow = now.getFullYear();

        if (day !== daynow || month !== monthnow || year !== yearnow) {
          //если равен, то значит человек заказывает сегодня на сегодня, это норм
          //всё одно у нас есть время создания заказа
          //проверку оставлю на бек
          let address = document.location.pathname;
          dateValue = now;
          props.globalhistory.history.push(address);
        }
      }
    }
    /*else{
      dateValue = '';
    }*/

    let pathnameMAss = document.location.pathname.split("/");
    //случай массива ['','geo-ru','routes',''], который возникает в случае, когда мы закрыли последний слеш, тоже надо учесть - отсюда 'или' ниже
    let ares = (pathnameMAss[pathnameMAss.length - 1].length > 0 && pathnameMAss.length > 3);/*>3 - "","geo", "drivers", ещё что-tо */
    let bres = (pathnameMAss.length > 4)//после ещё чего-то ещё слеш
    let resultpathname = (ares || bres) ? true : false;
    //вышестоящее условие звучит следующим образом - если в адресной строке больше или равно 4 элементов,
    //то мы находимся не в /geo/(drivers|route) просто,а в /geo/(drivers|route)/что-то там, что
    //означает, что можно попробовать построить маршрут
    // так как проверка идёт а-ля - загружено ли(и мы считаем, что загружено, если грузить не надо), то сравнение наоборот
    if (resultpathname) {//т.е. есть города в адресе

      setCitiesFromUrl(pathnameMAss[ares ? pathnameMAss.length - 1 : pathnameMAss.length - 2]);

    }
    if (!dateValue) {
      dateValue = new Date(Date.now())
    }
    /**/

    let resultString = (props.globalhistory.convertDateToUTC(dateValue)).toUTCString();
    console.log(resultString);
    this.state = {
      correctDate: dateValue,
      date: resultString,
      isLoaded: !resultpathname//переменная для загрузки 1 раза водителей - если есть города, то не загружено пока.
      //language: this.props.storeState.activeLanguageNumber
    }

    props.dispatch(set_state(props.storeState.cities, resultString))
    props.dispatch(clearFilters());
    this.chooseDate(dateValue)
  }

  changeCity = (index, value, extraData) => {

    let cities = this.props.storeState.cities;
    cities[index] = {
      point: value,
      lat: extraData.location.lat,
      long: extraData.location.long
    };

    this.props.dispatch(setCities(cities))
    let footer = document.querySelector(".footerMobile");
    if (footer && footer !== null) {
      footer.classList.remove("footerMobile-activeInput")
    }
    /*
        this.setState({
          isLoaded: true
        })*/
  }

  addCity = () => {

    let cities = this.props.storeState.cities;
    let flagCities = true;

    let massInput = document.querySelectorAll("._checkInput")
    for (let i = 0; i < massInput.length; i++) {
      let massDivInput = document.querySelectorAll("._checkDiv")
      massDivInput[i].classList.remove("startCity-CheckInput")
    }
    for (let i = 0; i < massInput.length; i++) {
      if (massInput[i].defaultValue == "") {
        let massDivInput = document.querySelectorAll("._checkDiv")
        massDivInput[i].classList.add("startCity-CheckInput")
        flagCities = false;
      }
    }
    if (cities[cities.length - 1].point == "") {
    } else if (flagCities) {
      cities[cities.length] = {
        point: '',
        lat: '',
        long: ''
      };

      this.props.dispatch(setCities(cities))

    }
  }

  removeCity = (index) => {
    let cities = this.props.storeState.cities;
    cities.splice(index, 1);

    this.props.dispatch(setCities(cities))
  }



  chooseDate = (value) => {


    let resultString = this.props.globalhistory.convertDateToUTC(value).toUTCString();
    if (this.state.date !== resultString) {
      this.props.dispatch(set_state(this.props.storeState.cities, resultString))
      this.setState({
        date: resultString,
        correctDate: value
      });
    }
  }

  validationInput = (massCities) => {

    let flag = true;
    let massInput = document.querySelectorAll("._checkInput")
    for (let i = 0; i < massInput.length; i++) {
      if (massInput[i].defaultValue.length === 0) {
        let massDivInput = document.querySelectorAll("._checkDiv")
        massDivInput[i].classList.add("startCity-CheckInput")
        flag = false;
      }
      if (massInput[i].defaultValue !== massCities[i].point || massCities[i].point.length === 0) {
        let massDivInput = document.querySelectorAll("._checkDiv")
        massDivInput[i].classList.add("startCity-error")
        flag = false;
      }
    }
    /*
    if(!this.props.validationInput(massCities)){
      flag=false;
    }*/
    if (this.state.date === undefined) {
      let datePicker = document.querySelector(".routemenu_date")
      datePicker.classList.add("routemenu_date-Check")
      flag = false;
    }
    return flag
  }

  goToNextPage = () => {

    let massCities = this.props.storeState.cities;
    let flagCities;

    flagCities = this.validationInput(massCities);
    if (flagCities) {
      //this.props.goToDrivers(this.props.storeState.cities, this.state.date)

      this.requestFunction((that, cities, date, languageISO) => {

        let routeDate = that.props.globalhistory.getRoute(cities, languageISO);
        let newStringCities = routeDate.route;
        // let country = routeDate.country;
        // let langISO = routeDate.langISO;
        let canMove;
        canMove = routeDate.canMove;
        let dateString = that.props.globalhistory.createDateTimeString(date, true);

        if (canMove) {
          let index = that.props.storeState.activeLanguageNumber;
          that.props.globalhistory.history.push('/' + this.props.storeState.country + `-` + that.props.storeState.languages[index].isoAutocomplete + `/drivers/${newStringCities}/?date=` + dateString/*+`&lang=`+languageISO*/);
          window.scroll({
            top: 500,
            left: 0,
            behavior: 'smooth'
          });
        }
      }
      );
    }
  }

  requestFunction = (allGoodAfterfunc) => {

    this.setState({ isLoaded: true });
    this.props.dispatch(setWaitingDriverRequest(true));
    let that = this;

    let cities = this.props.storeState.cities;
    let filteredCities = this.props.globalhistory.firstLastCityCompare(cities);//проверка 1-го и последнего городов

    let request = createRequestElement(filteredCities, window.google.maps.DirectionsTravelMode.DRIVING);
    let service = new window.google.maps.DirectionsService();


    let date = this.state.date;
    let langISO = this.props.storeState.languages.length > 0 ? this.props.storeState.languages[this.props.storeState.activeLanguageNumber].isoAutocomplete : 'en';
    let country = cookies.get('country', { path: '/' });//this.props.storeState.country;

    service.route(request, function (response, status) {

      if (status !== window.google.maps.DirectionsStatus.OK) {
        //необходима обработка случая, когда не смог построить маршрут)))
        return false;
      }
      let textInfo = that.props.storeState.languageTextMain.home.routeMenu;

      // console.log(response);
      // console.log(status);

      let routeProps = lengthTimeCalc(response);

      setLengthTimeFunc(that, routeProps.distance, routeProps.duration, textInfo);


      let body = JSON.stringify({
        cities: filteredCities,
        country: country,
        date: date,
        distance: routeProps.distance,
        duration: routeProps.duration
      });
      startRefresherGlobal(that)
      fetch(requests.getDrivers, {
        method: 'PUT', body: body,
        headers: { 'content-type': 'application/json' }
      })
        .then(response => {

          return response.json();
        })
        .then(function (data) {

          if (data.error) {
            console.log("bad");

            throw data.error;
          }
          else {

            console.log("good");
            console.log(data);
            //that.props.dispatch(setCarTypes(data.carTypes));
            that.props.dispatch(setDriversList(data.drivers));


            that.props.dispatch(setWaitingDriverRequest(false));
            if (allGoodAfterfunc) {
              allGoodAfterfunc(that, cities, date, langISO);
            }
            thenFuncGlobal(that)
          }
        })
        .catch(function (error) {
          console.log("bad");
          console.log('An error occurred:', error);
          catchFuncGlobal(that)
          that.props.dispatch(setWaitingDriverRequest(false));
        });
    })
  }

  render() {
    console.log(AppReduser);

    console.log(this.props.storeState);

    if (!this.state.isLoaded && this.props.storeState.languages.length > 0) {

      function isFindAllElems(cities) {
        let answer = true;
        let citiesCopy = [...cities];
        for (let i = 0; i < cities.length; i++) {
          let res = Number.parseFloat(cities[i].lat);
          if (!res) {
            //this.setCities()
            /*citiesCopy[i]={
              point: '',
              lat: '',
              long: ''
            }*/
            if (cities[i].point.length > 0) {//если строка осталась заполненой, но координат нет
              //, предполагаем, что они ещё не пришли - надо ждать
              answer = false;
            }
            else {
              //если затёрто, но блок сохранён - значит не нашли
              isEmptyBlockExist = true;
            }
          }
        }

        /*if(!answer){
          this.props.dispatch(setCities(citiesCopy));
        }*/
        return answer;
      }
      console.log(this.props.match);
      console.log(window);

      let isEmptyBlockExist = false;
      let isFindAll = isFindAllElems(this.props.storeState.cities);
      if (this.props.storeState.cities.length > 0) {

        if (isFindAll && !isEmptyBlockExist && this.state.date) {//нашил все города без затёртых - всё корректно

          this.requestFunction();
        }
        /*
        else{
          if( isEmptyBlockExist)//есть затёртые - ничего искать не надо, всё, шабаш
          {
            this.setState({
              isLoaded: true//нет городов - нечего загружать
            })
          }
        }*/
        else {
          if (isFindAll && !isEmptyBlockExist) {//всё на месте, кроме даты - пускать нельзя
            this.setState({
              isLoaded: true
            })
          }
        }
      }
      else {
        this.setState({
          isLoaded: true//нет городов - нечего загружать
        })
      }
      /*else{
        if(!isFindAll){//если с считыванием городов косяк, то сворачиваемся
          this.setState({
            isLoaded: true
          })
        }
      }*/
    }

    let textInfo = this.props.storeState.languageTextMain.home.routeMenu;
    console.log('Route Menu render, lang=', this.props.storeState.activeLanguageNumber);

    let result = this.props.globalhistory.findGetParameter("date");

    //данный кусок кода выставляет первичное значение даты. Очень хотелось воспользоваться 
    //функцией, которая не желает быть вызванной в конструкторе.
    //но в результате данный клок будет отрабатывать только один раз - в самом начале   
    if (this.state.date.length === 0) {
      let dateValue;
      if (result) {
        dateValue = this.props.globalhistory.getDateFromDateString(result);
        dateValue = new Date(dateValue);
      }
      if (!dateValue) {

        dateValue = new Date(Date.now())
      }

      this.chooseDate(dateValue);
    }

    let massFooterContent = [
      { img: stopPoint, text: textInfo.routeMenuFooter[0] },
      { img: comeback, text: textInfo.routeMenuFooter[1] },
      { img: whitOutMoney, text: textInfo.routeMenuFooter[2] },
      { img: driverIcon, text: textInfo.routeMenuFooter[3] }
    ]

    //функция имеет внутри себя проверку на то, чтобы не было зацикливания, а именно
    // если в редусере лежит то же, что мы туда кладём, то ничего класть мы не будем
    return (
      <>
        <div className="routemenu_container d-flex flex-column col-12">
          {
            isMobileOnly ?
              <>
                <div key={"cityRouteTable" + this.props.storeState.activeLanguageNumber} id={"idCityRouteTable." + this.props.storeState.activeLanguageNumber}>
                  <CityRouteTable textInfo={textInfo} language={this.props.storeState.activeLanguageNumber}
                    /*readOnlyOn={this.props.showBtPrice}*/ cities={this.props.storeState.cities}
                    changeCity={this.changeCity} removeCity={this.removeCity}
                    isoCountryMap={this.props.storeState.isoCountryMap}
                    alphabet={this.props.globalhistory.alphabet} />
                </div>

                {
                  /*this.props.showBtPrice ? <React.Fragment />
                  :
                  <div className=" d-flex routemenu_addCity" onClick={() => { this.addCity() }}>
                    <div className="routemenu_city_add_text" style={{ background: "url(" + addIcon + ") no-repeat" }} >{textInfo.addPointText}</div>
                  </div>
                  */
                }
                <div className=" d-flex routemenu_addCity" onClick={() => { this.addCity() }}>
                  <div className="routemenu_city_add_text" style={{ background: "url(" + addIcon + ") no-repeat" }} >{textInfo.addPointText}</div>
                </div>
              </>
              :
              <>
                <div key={"cityRouteTable2" + this.props.storeState.activeLanguageNumber} id={"idCityRouteTable2." + this.props.storeState.activeLanguageNumber}>
                  <CityRouteTable textInfo={textInfo} language={this.props.storeState.activeLanguageNumber}
                    /*readOnlyOn={this.props.showBtPrice}*/ cities={this.props.storeState.cities} changeCity={this.changeCity}
                    removeCity={this.removeCity} addCity={this.addCity}
                    isoCountryMap={this.props.storeState.isoCountryMap}
                    alphabet={this.props.globalhistory.alphabet} />
                </div>
              </>
          }

          <div className="routemenu_setDate">
            {
              this.state.date.length > 0 ? //это выражение ожидает установки даты - пока в this.state.correctDate не установится значение, мы не можем назначить defaultDate.
                //просто все дальнейшие изменения даты будут вызваны DatePicker-ом
                <div className="col-sm-6 col-12 p-0 pr-1">
                  <DatePicker defaultDate={this.state.correctDate} hintText={textInfo.datePickerText} minDate={new Date(Date.now() - 100000)}
                    onChange={(e, date) => {  /*UTC conv inside chooseDate */ this.chooseDate(date); let datePicker = document.querySelector(".routemenu_date");
                      datePicker.classList.remove("routemenu_date-Check")
                    }} className="routemenu_date" />
                </div> :
                <React.Fragment />
            }


            {/*
              this.props.showBtPrice ?
              <React.Fragment />
              :
              <>
                <div className="col-sm-6 col-12 p-0 ">
                  <div className="routemenu_search " onClick={() => { this.goToNextPage() }}>
                    <div className="routemenu_search_button " >
                      <p className="routemenu_search_text">{textInfo.searchText}</p>
                    </div>
                  </div>
                </div>
              </>
              */
            }
            <div className="col-sm-6 col-12 p-0 ">
              <div className="routemenu_search " onClick={() => { this.goToNextPage() }}>
                <div className="routemenu_search_button " >
                  <p className="routemenu_search_text">{textInfo.searchText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="routemenu_footer  col-12 p-0">
          {!isMobileOnly &&
            <div className="routemenu_comment d-flex flex-sm-row flex-column-reverse align-items-center">
              <div className="routemenu_comment_text col-sm-6 col-12 p-0">{textInfo.infoText.first}</div>
            </div>
          }

          {isMobileOnly &&
            <div className="d-flex flex-wrap py-3">
              {massFooterContent.map((el, index) =>
                <div className="routemenu_footerIcon d-flex flex-column align-items-center py-3 col-6">
                  <i style={{ background: "url(" + el.img + ")no-repeat" }} />
                  <span>{el.text}</span>
                </div>
              )}
            </div>
          }
        </div>

      </ >
    );
  }
}

const RouteMenu = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
  }),
)(RouteMenuClass);

export default RouteMenu;