import React, { Component } from 'react';
import './Home.css';
import './text.css';

import HomeHeader from './components/HomeHeader/HomeHeader.jsx'
import HomeBody from './components/HomeBody/HomeBody.jsx'
import Footer from '../Footer/Footer.jsx'
import {Link, Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import { request } from 'https';
import { withRouter } from 'react-router';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.redirectFunc=this.redirectFunc.bind(this);
  }
  redirectFunc(where){
    this.props.history.push(where);
  }
  render(){
    console.log("Home render");
    console.log(this.props);
    return (
      <React.Fragment>
      
      <div className="home_window">

        <div className="home_block">
          <div className="home_header">
            <HomeHeader/>
          </div>
          <div className="home_text">
            <div className="text_firstLine">Cпланируйте свою экскурсию</div>
            <div className="text_secondLine">Предложения от местных гидов-водителей по вашему индивидуальному маршруту</div>
            <div className="text_changeBodyBlock">
              <div className="text_changeBodyBlock_element changeBody_element_select changeBodyBlock_element_left">СПИСОК</div>
              <div className="text_changeBodyBlock_element changeBodyBlock_element_right">КАРТА</div>
            </div>
          </div>
          <div className="home_body">
            <HomeBody redirectToDrivers={()=>this.redirectFunc('/drivers')}/>
          </div>
          
        </div>
        <Footer/>
      </div>
      
    
      
      
      </React.Fragment>
    )
  }
}


export default Home;