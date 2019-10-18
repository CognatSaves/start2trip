import React from 'react';
import '../home/Home.css';
import '../home/text.css';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import requests from '../../config'

import PlacesCountryInfo from '../Places/PlacesCountryInfo'
import HomeBodyBottom from '../home/HomeBodyBottom'
import Header from '../header/Header';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class ReadyRoutesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryDescription: null,
      
    };

  }
  redirectFunc = (where) => {

    this.props.history.push(where);

  }
  render() {

    //console.log(isMobileOnly , "isMobileOnly")
    //console.log(isTablet , "isTablet")
    console.log('Home render');
    console.log('this.props')
    console.log(this.props);
    console.log('this.state');
    console.log(this.state);



    let textInfo = this.props.storeState.languageTextMain.home.home;
    //let country = cookies.get('country', {path: '/'});
    let selectedDirection = this.props.match.params.direction;

    let countryName = this.props.storeState.countries.length > 0 ?
      this.props.globalReduser.findCountryNameByISO(this, cookies.get('country', { path: '/' }), cookies.get('userLang', { path: '/' }))
      : '';
    let helmet = this.props.storeState.languageTextMain.helmets.home;

    let windowImg = null
    if (this.props.storeState.languages.length > 0) {

      let coockisIso = cookies.get('country', { path: '/' })
      let j;
      for (let i = 0; i < this.props.storeState.countries.length; i++) {
        if (this.props.storeState.countries[i].ISO === coockisIso) {
          j = i
          break;
        }
      }
      windowImg = requests.serverAddressImg + this.props.storeState.countries[j].windowImg.url
     
    }
    // let routeUrl = null;
    // routeUrl = this.props.history.location.pathname.split('/')
    return (

        <>
        {
          this.props.storeState.countries.length > 0 ?
            <Helmet>
              <title>{helmet.country.title[0] + countryName + helmet.country.title[1]}</title>
              <meta name="description" content={helmet.country.description[0] + countryName + helmet.country.description[1]} />
              <meta property="og:site_name" content="Tripfer.com" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content={document.URL} />
              <meta property="og:title" content={helmet.country.title[0] + countryName + helmet.country.title[1]} />
              <meta property="og:description" content={helmet.country.description[0] + countryName + helmet.country.description[1]} />
            </Helmet> : <React.Fragment />


        }
        {
          /*
          <Helmet>
          <title>{helmet.basic.title[0]+countryName+helmet.basic.title[1]}</title>
          <meta name="description" content={helmet.basic.description} />
          <meta property="og:site_name" content="Tripfer" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={document.URL} />
          <meta property="og:title" content={helmet.basic.title} />
          <meta property="og:description" content={helmet.basic.description} /> 
        </Helmet>
          */
        }

        <main className="mainHomePage d-flex flex-column container-fluid p-0">
         

          <div className="home_window" style={{ background: "url(" + windowImg + ")no-repeat" }}>
            <Header history={this.props.history} />
            <div className="wrapper d-flex flex-column">
            <PlacesCountryInfo placesState={this.state.countryDescription !== null ? { country: this.state.countryDescription } : { country: {} }} />
          </div>
          </div>

          {
            selectedDirection ?
              <Route path={'/' + requests.routeMap + "/routes-:direction"} component={HomeBodyBottom} />
              :
              <Route path={'/' + requests.routeMap + "/routes"} component={HomeBodyBottom} />
          }
        </main>

      </>
      
    )
  }
}

const ReadyRoutes = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
    globalReduser: state.GlobalReduser
  }),
)(ReadyRoutesClass);

export default ReadyRoutes;
