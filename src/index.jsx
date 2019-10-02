import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
//import css
import './index.css';
import './components/driverProfile/DriverProfile.css'
import './components/driverProfile/DriverInfo.css';
import './components/driverProfile/DriverAdaptedRoute.css';
import './components/PlaceDescription/PlaceDescription.css'
import './components/RouteDescription/RouteDescription.css';
import './components/driverProfile/DriversProfileComments.css';

//import css
// import App from './App.jsx';
import Home from './components/home/Home.jsx';
import Places from './components/Places/Places.jsx';
import Tours from './components/Tours/Tours.jsx';
import Guides from './components/Guides/Guides.jsx';
import GuideDescription from './components/GuideDescription/GuideDescription.jsx';
import Footer from './components/Footer/Footer'
import TourDescription from './components/TourDescription/TourDescription.jsx';
import AccountRedirector from './components/registration/AccountRedirector';
import TripConfirmation from './components/driverProfile/TripConfirmation';
import DriverConfirmation from './components/driverProfile/DriverConfirmation';
// import DriverProfile from './components/driverProfile/DriverProfile';
import AuthModalCountry from './components/registration/AuthModalCountry';
import pageNotFound from './pageNotFound'
import axios from 'axios';
import requests from './config';
// import { hydrate } from "react-dom"

import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { AppReduser } from './redusers/AppReduser';
import { DriversReduser } from './redusers/DriversReduser';
import { CommentReduser } from './redusers/CommentReduser';
import { PlacesReduser } from './redusers/PlacesReduser';
import { ToursReduser } from './redusers/ToursReduser';
import { GuidesReduser } from './redusers/GuidesReduser';
import { GlobalReduser } from './redusers/GlobalReduser';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//require('require-context/register');
import Cookies from 'universal-cookie';
import { setLocals, modalCountryDispatch } from './redusers/Action';
import { setActiveCurr, setActiveLang, setActiveLangAdmin, setActiveLangISO } from './redusers/Action';
import { setCarTypes } from './redusers/ActionDrivers';
import config from './config.js'


const cookies = new Cookies();
const DriverProfile = lazy(() => import('./components/driverProfile/DriverProfile'));
const PlaceDescription = lazy(() => import('./components/PlaceDescription/PlaceDescription'));
const RouteDescription = lazy(() => import('./components/RouteDescription/RouteDescription'));
const ForgotPassword = lazy(() => import('./components/registration/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/registration/ResetPassword'));
const PartnerRegister = lazy(() => import('./components/registration/PartnerRegister'));
const Registration = lazy(() => import('./components/registration/Registration'));
const AuthRedirect = lazy(() => import('./components/registration/AuthRedirect'));
// const AuthModalCountry = lazy(() => import('./components/registration/AuthModalCountry'));
const AboutService = lazy(() => import('./components/FooterPage/aboutService'));
const affiliateProgram = lazy(() => import('./components/FooterPage/affiliateProgram'));
const contacts = lazy(() => import('./components/FooterPage/contacts'));
const LicenseAgreement = lazy(() => import('./components/FooterPage/LicenseAgreement'));
const feedback = lazy(() => import('./components/registration/feedback'));
const customerCancel = lazy(() => import('./components/registration/customerCancel'));

const redux = require('redux');

const reducers = redux.combineReducers({
  AppReduser, DriversReduser, CommentReduser,
  PlacesReduser, ToursReduser, GlobalReduser,
  GuidesReduser
});

const store = redux.createStore(reducers);

const redirectPage = cookies.get('country', { path: '/' }) + "-" + cookies.get('userLangISO', { path: '/' });

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#304269", //Button cansel / ok
    primary2Color: "#f60", //Focus date
    textColor: "#333",
    // alternateTextColor: white, // Color text
    // canvasColor: "#f60", // bacgraund color 
    // borderColor: "#f60", // border-bottom color
    // disabledColor: "#f60", // PleseHolder
    pickerHeaderColor: "#304269", // Calendar header collor
    // shadowColor: "#f60", // BoxShadow
  },
  fontFamily: 'Roboto',
});

function getLocals() {
  //эта функция подгружает языки и прочее с сервера, попутно устанавливает
  //кое-какие значения, например языки
  let redusers = store.getState();
  let props = {};

  //этот блок проверяет, находимся ли мы на страницах вида /geo-ru/... ,
  //откуда может взять язык
  let urlLang = "null";
  let documentUrl = window.document.URL.split("/");
  documentUrl = documentUrl[3].split("-");
  if (documentUrl[0] !== "") {
    if (documentUrl.length === 1) {
      urlLang = documentUrl[0]
    } else {
      urlLang = documentUrl[1]
    }

  }
  //*****//
  //этот блок считывает языковые куки
  let adminLang = cookies.get('adminLang', { path: '/' });
  let userLang = cookies.get('userLang', { path: '/' });
  let cookiesLangISO = cookies.get('userLangISO', { path: '/' })
  let userBrowserLanguage = window.navigator.language;
  //здесь выбираем приоритетное значение - если выше мы смогли взять язык из адреса,
  //то используем его, если нет, то будем, в случае отсутствия кук, записывать туда
  //значения браузера

  let userBrowserLanguageISO = ((urlLang && urlLang.length === 2) ? urlLang : userBrowserLanguage.substr(0, 2));
  let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
  //*****//
  //здесь проверка - заходим, если какой-то (хоть какой) из кук нет
  if (!adminLang || !userLang || !cookiesLangISO) {

    let langSelector = 'ENG'; let smallLangSelector = 'en';

    //если у нас язык браузера пользователя русский, то будем подставлять ему
    //в куки русский, иначе английский
    if (userBrowserLanguageISO === 'ru') {
      langSelector = 'RUS';
      smallLangSelector = 'ru'
    }
    //проверки по очереди -если надо, устанавливаем куки и в переменную, куда 
    //считывали, ставим установленное значение, так как она нам понадобится

    if (!adminLang) {
      cookies.set('adminLang', langSelector, { path: '/', expires: date });
      adminLang = langSelector;
    }
    if (!userLang || !cookiesLangISO) {
      cookies.set('userLang', langSelector, { path: '/', expires: date });
      userLang = langSelector;
      cookies.set('userLangISO', smallLangSelector, { path: '/', expires: date });
      cookiesLangISO = smallLangSelector;
    }
  }




  let langSelector = 'ENG'; let smallLangSelector = 'en';
  if (userBrowserLanguageISO === 'ru') {
    langSelector = 'RUS';
    smallLangSelector = 'ru';
  }
  //если значение в куке не совпадает с языком в адресной строке, то мы
  //используем язык из адресной строки, он имеет более высокий приоритет
  if (userLang !== langSelector || smallLangSelector !==cookiesLangISO/* && urlLang.length === 2 - эта проверка выполнена раньше*/) {
    //если происходит несовпадение, то нужно заполнить валидным значением
    //сейчас(19.08.19) у нас 2 языка, делаем как и выше - если у нас русский('ru'),
    //то ставим его, иначе английский
    //если вообще не то, то редирект на 404 - так как надо ставить 3хбукв на основе
    //2хбукв, то придётся ставить однозначные соответствия



    //если у нас язык браузера пользователя русский, то будем подставлять ему
    //в куки русский, иначе английский
    //если не русский и не английский, то значит, англйский)))
    //потому что всё равно выкинет на 404
    //впоследствии надо будет разместить где-то массив пар 2хбкв и 3хбкв

    cookies.set('userLang', langSelector, { path: '/', expires: date });
    userLang = langSelector;
    cookies.set('userLangISO', smallLangSelector, { path: '/', expires: date });
    cookiesLangISO = smallLangSelector;
  }


  store.dispatch(setActiveLangISO(userLang, adminLang));



  //console.log(window.navigator);

  axios.get(requests.getLocals, props)
    .then(response => { 
      let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
      let languages = response.data.languages;
      let currencies = response.data.currencies;
      let countries = response.data.countries;
      let adminLanguages = response.data.adminLanguages;
      let carTypes = response.data.carTypes;

      store.dispatch(setLocals(languages, adminLanguages, currencies, countries,response.data.untranslatedlanguages));
      store.dispatch(setCarTypes(carTypes));

      let lang = redusers.GlobalReduser.readCookie('userLang');
      let curr = redusers.GlobalReduser.readCookie('userCurr');
      let country = redusers.GlobalReduser.readCookie('country');

      if (!lang) {

        for (let i = 0; i < languages.length; i++) {
          if (languages[i].ISO === 'ENG') {
            cookies.set('userLang', languages[i].ISO, { path: '/', expires: date });
            cookies.set('userLangISO', languages[i].isoAutocomplete, { path: '/', expires: date });

            setLocalsFunc('userLang', i);

          }
        }
        lang = redusers.GlobalReduser.readCookie('userLang');
        if (!lang) {
          cookies.set('userLang', languages[0].ISO, { path: '/', expires: date });
          cookies.set('userLangISO', languages[0].isoAutocomplete, { path: '/', expires: date });
          setLocalsFunc('userLang', 0);

        }
      }
      else {
        let i = 0;
        for (; i < languages.length; i++) {
          if (lang === languages[i].ISO) {
            cookies.set('userLang', languages[i].ISO, { path: '/', expires: date });
            cookies.set('userLangISO', languages[i].isoAutocomplete, { path: '/', expires: date });
            setLocalsFunc('userLang', i);
            break;
          }
        }
        if (i === languages.length) {
          cookies.set('userLang', languages[0].ISO, { path: '/', expires: date });
          cookies.set('userLangISO', languages[0].isoAutocomplete, { path: '/', expires: date });
          setLocalsFunc('userLang', 0);
        }
      }
      if (!curr) {
        for (let i = 0; i < currencies.length; i++) {
          if (currencies[i].ISO === "USD") {
            cookies.set('userCurr', currencies[i].ISO, { path: '/', expires: date });
            store.dispatch(setActiveCurr(i));
          }
        }
        curr = redusers.GlobalReduser.readCookie('userCurr');
        if (!curr) {
          cookies.set('userCurr', currencies[0].ISO, { path: '/', expires: date });
          store.dispatch(setActiveCurr(0));
        }
      }
      else {
        let i = 0;
        for (; i < currencies.length; i++) {
          if (curr === currencies[i].ISO) {
            cookies.set('userCurr', currencies[i].ISO, { path: '/', expires: date });
            store.dispatch(setActiveCurr(i));
            break;
          }
        }
        if (i === currencies.length) {
          cookies.set('userCurr', currencies[0].ISO, { path: '/', expires: date });
          store.dispatch(setActiveCurr(i));
        }
      }
      if (!country) {
        //тут должна быть переадресация на страницу с выбором страны!!!(в else должно быть схожее, посмотри)
      }
      else {

        let index = -1;
        for (let i = 0; i < countries.length; i++) {
          if (country === countries[i].ISO) {
            index = i;
            break;
          }
        }
        if (index !== -1) {

          let adminLang = redusers.GlobalReduser.readCookie('adminLang');
          let adminIndex = -1;
          if (!adminLang) {
            adminLang = countries[index].adminDefaultLang;
          }
          let engIndex = -1;
          for (let k = 0; k < adminLanguages.length; k++) {
            if (adminLanguages[k].ISO === adminLang) {
              adminIndex = k;
              break;
            }
            if (adminLanguages[k].ISO === 'ENG') {
              engIndex = k;
            }
          }
          if (adminIndex === -1) {
            adminIndex = engIndex;
            if (adminIndex === -1) {
              adminIndex = 0;
            }
          }
          store.dispatch(modalCountryDispatch(countries[index].ISO, countries[index].isoMap));
          store.dispatch(setActiveLangAdmin(adminIndex));
        }
        else {
          //здесь должна быть переадресация
        }
      }
    })
    .catch(error => {
      console.log(error);
    })
}
function setLocalsFunc(type, index) {
  let redusers = store.getState();
  let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
  switch (type) {
    case 'userLang': {
      function loadScript(url, onload) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.onload = resolve;
          script.onerror = reject;
          script.src = url;

          if (document.head) {

            //document.getElementById('langScript').remove();
            script.id = 'langScript';
            //document.head.appendChild(script);
            store.dispatch(setActiveLang(index));
            cookies.set('userLang', redusers.AppReduser.languages[index].ISO, { path: '/', expires: date });
            cookies.set('userLangISO', redusers.AppReduser.languages[index].isoAutocomplete, { path: '/', expires: date });
          }
        });
      }
      let string = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBxjEYepkLXhQuXcf_1sUakshHN5Jrozc8&libraries=places&callback=initialize";
      let langString = string + "&language=" + redusers.AppReduser.languages[index].isoAutocomplete;
      loadScript(langString);

      break;
    }
    case 'adminLang': {
      console.log('adminLang called');
      store.dispatch(setActiveLangAdmin(index));
      cookies.set('adminLang', redusers.AppReduser.adminLanguages[index].ISO, { path: '/', expires: date });
      break;
    }
    case 'userCurr': {
      store.dispatch(setActiveCurr(index));
      cookies.set('userCurr', redusers.AppReduser.currencies[index].ISO, { path: '/', expires: date });
      break;
    }
    default:
  }
}
getLocals();




ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Suspense fallback={<div>{store.getState().AppReduser.languageTextMain.home.loading + "..."}</div>}>
            <Switch>
              <Route path={"/" + config.routeMap + "/routes/:slug/"} component={RouteDescription} />
              <Route path={"/" + config.routeMap + "/routes-:direction/"} component={Home} />
              <Route path={"/" + config.routeMap + "/routes/"} component={Home} />

              <Route path={"/" + config.routeMap + "/drivers/"} component={Home} />
              <Route path={"/" + config.routeMap + "/driverProfile/:id-:carId-:cities/"} component={DriverProfile} />

              <Route path={"/" + config.routeMap + "/places/:slug/"} component={PlaceDescription} />
              <Route path={"/" + config.routeMap + "/places-:direction/"} component={Places} />
              <Route path={"/" + config.routeMap + "/places/"} component={Places} />

              <Route path={"/" + config.routeMap + "/tours/:slug/"} component={TourDescription} />
              <Route path={"/" + config.routeMap + "/tours-:direction/"} component={Tours} />
              <Route path={"/" + config.routeMap + "/tours/"} component={Tours} />

              <Route path={"/"+config.routeMap+'/guides/:id,:slug'} component={GuideDescription}/>
              <Route path={"/"+config.routeMap+"/guides/"} component={Guides}/>
              

              <Route path="/account/" component={AccountRedirector} />
              <Route path="/forgot-password/" component={ForgotPassword} />
              <Route path="/reset-password/:code/" component={ResetPassword} />

              <Route path={"/(ru|en)/terms-:userType/"} component={LicenseAgreement} />
              <Route path={"/(ru|en)/terms/"} component={LicenseAgreement} />
              <Route path={"/(ru|en)/contacts/"} component={contacts} />
              <Route path={"/(ru|en)/affiliate-program/"} component={affiliateProgram} />
              <Route path={"/(ru|en)/about-service/"} component={AboutService} />

              <Route path="/driverConfirmation/:id-:carrierId-:confirmation/" component={DriverConfirmation} />
              <Route path="/tripConfirmation/:id-:userId" component={TripConfirmation} />
              <Route path={"/(register|start)/"} component={PartnerRegister} />
              <Route path={"/registration/"} component={Registration} />
              <Route path={"/(ru|en)/login/"} component={AuthRedirect} />
              <Route path="/countrySelection/" component={AuthModalCountry} />
              <Route path="/feedback-:id-:clientId/" component={feedback} />
              <Route path="/customer-cancel-:id-:clientId/" component={customerCancel} />


              <Redirect from='/-en' to='/countrySelection' />
              <Redirect from='/-ru' to='/countrySelection' />
              {



                window.location.pathname === "/" ?
                  <Redirect from="/" to={"/" + (redirectPage === "undefined-undefined" || redirectPage === "undefined-en" || redirectPage === "undefined-ru" || redirectPage === "-en" || redirectPage === "-ru" ? "countrySelection/" : redirectPage + "/routes/")} />
                  :
                  <Route path="*" component={pageNotFound} status={404} />
              }

            </Switch>
          </Suspense>
          <Footer />
        </MuiThemeProvider>
      </>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// <Route path={"/" + config.routeMap + "/tours/"} component={Tours} />
// <Route path={"/" + config.routeMap + "/tour/:country,:id/"} component={TourDescription} />
serviceWorker.unregister();
