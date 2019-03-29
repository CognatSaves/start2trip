import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';

class AppClass extends Component {
  /*constructor(props){
    super(props);  
  }*/
  
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
  }
}

const App = connect(
  (state) =>({
    storeState: state.AppReduser
  })
)(AppClass);

export default App;