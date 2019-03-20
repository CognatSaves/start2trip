import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/home/Home.jsx';
import Drivers from './components/drivers/Drivers.jsx';
import DriverProfile from './components/driverProfile/DriverProfile.jsx';
import Places from './components/Places/Places.jsx';
import PlaceDescription from './components/PlaceDescription/PlaceDescription.jsx';
import Tours from './components/Tours/Tours.jsx';
import Footer from './components/Footer/Footer'
import TourDescription from './components/TourDescription/TourDescription.jsx';

import './components/header/StandartHeaderStyles.css';

import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { AppReduser } from './redusers/AppReduser';
import { DriversReduser } from './redusers/DriversReduser';
import { StateReduser } from './redusers/StateReduser';
import { CommentReduser } from './redusers/CommentReduser';
import { PlacesReduser } from './redusers/PlacesReduser';
import { ToursReduser } from './redusers/ToursReduser';
import { Link, Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
require('require-context/register');


const redux = require('redux');

const reducers = redux.combineReducers({ AppReduser, DriversReduser, StateReduser, CommentReduser, PlacesReduser, ToursReduser });

const store = redux.createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.Fragment>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/drivers" component={Drivers} />
                    <Route path="/driverProfile/:id,:temp1,:temp2" component={DriverProfile} />
                    <Route path="/places" component={Places} />
                    <Route path="/place/:country,:id" component={PlaceDescription} />
                    <Route path="/tours" component={Tours} />
                    <Route path="/tour/:country,:id" component={TourDescription} />
                    <Redirect from="/" to="/home" />
                </Switch>
                <Footer />
            </React.Fragment>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));


/*  <Route path="/" component={App}/>

*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
