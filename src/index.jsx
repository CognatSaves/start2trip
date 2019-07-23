import React, { Suspense,lazy } from 'react';
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
import App from './App';
import Home from './components/home/Home.jsx';
import Places from './components/Places/Places.jsx';
import Tours from './components/Tours/Tours.jsx';
import Footer from './components/Footer/Footer'
import TourDescription from './components/TourDescription/TourDescription.jsx';
import AccountRedirector from './components/registration/AccountRedirector';
import TripConfirmation from './components/driverProfile/TripConfirmation';
import DriverConfirmation from './components/driverProfile/DriverConfirmation';
import axios from 'axios';
import requests from './config';
import { hydrate } from "react-dom"

import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { AppReduser } from './redusers/AppReduser';
import { DriversReduser } from './redusers/DriversReduser';
import { StateReduser } from './redusers/StateReduser';
import { CommentReduser } from './redusers/CommentReduser';
import { PlacesReduser } from './redusers/PlacesReduser';
import { ToursReduser } from './redusers/ToursReduser';
import { DriverProfileRegistrationReduser } from './redusers/DriverProfileRegistrationReduser';
import { UserProfileRegistrationReduser } from './redusers/UserProfileRegistrationReduser';
import { AgencyProfileRegistrationReduser } from './redusers/AgencyProfileRegistrationReduser';
import { GlobalReduser } from './redusers/GlobalReduser';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//require('require-context/register');
import Cookies from 'universal-cookie';
import { setLocals, modalCountryDispatch } from './redusers/Action';
import { setUser, setActiveCurr, setActiveLang, setModalRegister, setActiveLangAdmin } from './redusers/Action';


const cookies = new Cookies();
const DriverProfile = lazy(()=> import('./components/driverProfile/DriverProfile'));
const PlaceDescription = lazy(()=> import('./components/PlaceDescription/PlaceDescription'));
const RouteDescription = lazy(()=> import('./components/RouteDescription/RouteDescription'));
const ForgotPassword = lazy(()=> import('./components/registration/ForgotPassword'));
const ResetPassword = lazy(()=> import('./components/registration/ResetPassword'));
const PartnerRegister = lazy(()=> import('./components/registration/PartnerRegister'));
const Registration = lazy(()=> import('./components/registration/Registration'));
const AuthRedirect = lazy(()=> import('./components/registration/AuthRedirect'));


const redux = require('redux');

const reducers = redux.combineReducers({ AppReduser, DriversReduser, StateReduser, CommentReduser,
    PlacesReduser, ToursReduser, DriverProfileRegistrationReduser, UserProfileRegistrationReduser,
    GlobalReduser, AgencyProfileRegistrationReduser });

const store = redux.createStore(reducers);

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
function getLocals(){
    let redusers = store.getState();
    let props = {};

    axios.get(requests.getLocals, props)
      .then(response => {
        let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
        let languages = response.data.languages;
        let currencies = response.data.currencies;
        let countries = response.data.countries;
        let adminLanguages = response.data.adminLanguages;
        
        store.dispatch(setLocals(languages, adminLanguages, currencies, countries));

        let lang = redusers.GlobalReduser.readCookie('userLang');
        let curr = redusers.GlobalReduser.readCookie('userCurr');
        let country = redusers.GlobalReduser.readCookie('country');
        
        if (!lang) {
          for (let i = 0; i < languages.length; i++) {
            if (languages[i].ISO === 'RUS') {
              cookies.set('userLang', languages[i].ISO, { path: '/', expires: date });
              cookies.set('userLangISO',languages[i].isoAutocomplete, { path: '/', expires: date });

              setLocalsFunc('userLang',i);

            }
          }
          lang = redusers.GlobalReduser.readCookie('userLang');
          if (!lang) {
            cookies.set('userLang', languages[0].ISO, { path: '/', expires: date });
            cookies.set('userLangISO',languages[0].isoAutocomplete, { path: '/', expires: date });
            setLocalsFunc('userLang',0);

          }
        }
        else {
          let i = 0;
          for (; i < languages.length; i++) {
            if (lang === languages[i].ISO) {
              cookies.set('userLang', languages[i].ISO, { path: '/', expires: date });
              cookies.set('userLangISO',languages[i].isoAutocomplete, { path: '/', expires: date });
              setLocalsFunc('userLang',i);
              break;
            }
          }
          if (i === languages.length) {
            cookies.set('userLang', languages[0].ISO, { path: '/', expires: date });
            cookies.set('userLangISO',languages[0].isoAutocomplete, { path: '/', expires: date });
            setLocalsFunc('userLang',0);
          }
        }
        if (!curr) {
          for (let i = 0; i < currencies.length; i++) {
            if (currencies[i].ISO === "USD") {
              cookies.set('userCurr', currencies[i].ISO, { path: '/', expires: date });
              store.dispatch(setActiveCurr(i));
            }
          }
          curr = this.props.globalReduser.readCookie('userCurr');
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
        if(!country){
          //тут должна быть переадресация на страницу с выбором страны!!!(в else должно быть схожее, посмотри)
        }
        else{
          
          let index = -1;
          for(let i=0; i<countries.length; i++){
            if(country===countries[i].ISO){
              index =i;
              break;
            }
          }
          if(index!==-1){
            
            let adminLang = redusers.GlobalReduser.readCookie('adminLang');
            let adminIndex=-1;
            if(!adminLang){
              adminLang=countries[index].adminDefaultLang;
            }
            let engIndex=-1;
            for(let k=0 ; k<adminLanguages.length; k++){
              if(adminLanguages[k].ISO===adminLang){
                adminIndex=k;
                break;
              }
              if(adminLanguages[k].ISO==='ENG'){
                engIndex=k;
              }
            }
            if(adminIndex===-1){
              adminIndex=engIndex;
              if(adminIndex===-1){
                adminIndex=0;
              }
            }
            store.dispatch(modalCountryDispatch(countries[index].ISO,countries[index].isoMap));
            store.dispatch(setActiveLangAdmin(adminIndex));
          }
          else{
            //здесь должна быть переадресация
          }        
        }
      })
      .catch(error => {
        console.log(error);
      })
}
function setLocalsFunc(type, index){
    let redusers = store.getState();
    let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
    switch (type) {
      case 'userLang': {
        function loadScript (url, onload){
          return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.type = 'text/javascript';
              script.onload = resolve;
              script.onerror = reject;
              script.src = url;
              
              if (document.head) {
                
                //document.getElementById('langScript').remove();
                script.id='langScript';
                //document.head.appendChild(script);
                store.dispatch(setActiveLang(index));
                cookies.set('userLang', redusers.AppReduser.languages[index].ISO, { path: '/', expires: date });
              }
          });
        }
        let string = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBxjEYepkLXhQuXcf_1sUakshHN5Jrozc8&libraries=places&callback=initialize";
        let langString= string+"&language="+redusers.AppReduser.languages[index].isoAutocomplete;
        loadScript(langString);
        
        break;
      }
      case 'adminLang':{
        console.log('adminLang called');
        store.dispatch(setActiveLangAdmin(index));
        cookies.set('adminLang',redusers.AppReduser.adminLanguages[index].ISO, { path: '/', expires: date });
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
            <React.Fragment>
                <MuiThemeProvider muiTheme={muiTheme}>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Switch>
                    
                        <Route path="/home/:direction" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/drivers" component={Home} />
                        <Route path="/driverProfile/:id-:carId-:country-:cities" component={DriverProfile} />
                        <Route path="/tripConfirmation/:id-:userId" component={TripConfirmation}/>
                        <Route path="/driverConfirmation/:id-:carrierId-:confirmation" component={DriverConfirmation}/>
                        <Route path="/places/:direction" component={Places} />
                        <Route path="/places" component={Places} />
                        <Route path="/place/:slug" component={PlaceDescription} />
                        <Route path="/route/:slug" component={RouteDescription}/>

                        <Route path="/tours" component={Tours} />
                        <Route path="/tour/:country,:id" component={TourDescription} />

                        <Route path="/account" component={AccountRedirector}/>
                        
                        
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <Route path="/reset-password/:code" component={ResetPassword} />
        
                        <Route path="/(register|start)/" component={PartnerRegister} /> 
                        <Route path="/registration" component={Registration} />                       
                        <Route path="/login" component={AuthRedirect}/>
                        <Route path="/:ISO" component={App}/>
                        <Redirect from="/" to="/home" />
                        
                    </Switch>
                    </Suspense>
                    <Footer />
                </MuiThemeProvider>
            </React.Fragment>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
