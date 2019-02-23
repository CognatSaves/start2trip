import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/home/Home.jsx';
import Drivers from './components/drivers/Drivers.jsx';


import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {AppReduser} from './redusers/AppReduser';
import {DriversReduser} from './redusers/DriversReduser';
import {StateReduser} from './redusers/StateReduser';
import {Link, Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
require('require-context/register');


const redux = require('redux');

const reducers = redux.combineReducers({ AppReduser, DriversReduser, StateReduser });

const store = redux.createStore(reducers);

ReactDOM.render(
<Provider store = {store}>
    <BrowserRouter>
    <React.Fragment>
        <Switch>                
            <Route path="/home" component={Home}/>
            <Route path="/drivers" component={Drivers}/>
            <Redirect from="/" to="/home"/>
        </Switch>       
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
