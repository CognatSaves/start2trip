import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home.js';
import Drivers from './components/drivers/Drivers.js';
import { connect } from 'react-redux'
import {Link, Route, BrowserRouter, Redirect} from 'react-router-dom';

class AppClass extends Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
    return(
      <div>
      <button>
        <Link to="/home">
          To home
        </Link>
      </button>

      </div>
      
    )


    /*
    console.log("AppClass Render");
    console.log(this.props);
    switch (this.props.storeState.picture){
      case "home":
        return (
          <div className="center">
            <Home goToDrivers={this.goToDrivers}/>
          </div>
        );
      case "drivers":
        return (
          <div className="center">
            <Drivers/>
          </div>
        )
      default:
        return (
          <div>State Error</div>
        )
  }*/
  }
}

//export default App;


const App = connect(
  (state) =>({
    storeState: state.AppReduser
  }),
  (dispatch) => ({
   // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
  })
)(AppClass);

export default App;