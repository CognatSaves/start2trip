import React, { Suspense,lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home/Home.jsx';
// import DriverProfile from './components/driverProfile/DriverProfile.jsx';
import Places from './components/Places/Places.jsx';
// import PlaceDescription from './components/PlaceDescription/PlaceDescription.jsx';
import Tours from './components/Tours/Tours.jsx';
import Footer from './components/Footer/Footer'
import TourDescription from './components/TourDescription/TourDescription.jsx';
// import Registration from './components/registration/Registration';
// import AuthRedirect from './components/registration/AuthRedirect';
import AccountRedirector from './components/registration/AccountRedirector';
// import PartnerRegister from './components/registration/PartnerRegister';
// import ForgotPassword from './components/registration/ForgotPassword';
// import ResetPassword from './components/registration/ResetPassword';
import TripConfirmation from './components/driverProfile/TripConfirmation';
import DriverConfirmation from './components/driverProfile/DriverConfirmation';
// import RouteDescription from './components/RouteDescription/RouteDescription';


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
