import React, { Suspense, lazy } from 'react';
import './Home.css';
import './text.css';
import { isMobileOnly } from 'react-device-detect';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import requests from '../../config'

import Drivers from '../drivers/Drivers'
import HomeBodyBottom from './HomeBodyBottom'
import Header from '../header/Header';
import HomeBody from './HomeBody/HomeBody.jsx'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const FirstEnterModal = lazy(() => import('./FirstEnterModal'));

class HomeClass extends React.Component {
  constructor(props) {
    super(props);
    let firstEnterCookie = this.props.globalReduser.readCookie('firstEnter');
    this.state = {
      firstEnter: firstEnterCookie ? false : true,

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

    return (
      <React.Fragment>
        {
          this.props.storeState.countries.length>0 ?
          <Helmet>
            <title>{helmet.country.title[0]+countryName+helmet.country.title[1]}</title>
            <meta name="description" content={helmet.country.description[0]+countryName+helmet.country.description[1]} />
            <meta property="og:site_name" content="Tripfer.com" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={document.URL} />
            <meta property="og:title" content={helmet.country.title[0]+countryName+helmet.country.title[1]} />
            <meta property="og:description" content={helmet.country.description[0]+countryName+helmet.country.description[1]} /> 
          </Helmet> : <React.Fragment/>
          
          
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

        <main className="d-flex flex-column container-fluid p-0">
          <Suspense fallback={<div>{textInfo.loading+'...'}</div>}>
            {
              this.state.firstEnter ?
                <FirstEnterModal whatRender="user" /> : <React.Fragment />
            }
          </Suspense>

          <div className="home_window">
            <Header history={this.props.history} />

            <div className="home_block col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
              {!isMobileOnly ?
                <div className="home_text col-xl-10 col-lg-10 col-md-12 col-sm-11 col-11 p-0">
                  <div className="text_firstLine">{textInfo.homeTextFirstLine}</div>
                  <div className="text_secondLine">{textInfo.homeTextSecondLine}</div>
                  <div className="text_changeBodyBlock">
                    <div className="text_changeBodyBlock_element changeBody_element_select changeBodyBlock_element_left">{textInfo.changeBodyBlock.left}</div>
                    <div className="text_changeBodyBlock_element changeBodyBlock_element_right">{textInfo.changeBodyBlock.right}</div>
                  </div>
                </div>
                :
                <div />}
              <div className="home_body d-flex justify-content-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                <HomeBody redirectToDrivers={() => this.redirectFunc('/' + requests.routeMap + "-" + cookies.get('userLangISO', { path: "/" }) + '/drivers/')} />
              </div>
            </div>

          </div>

          {
            selectedDirection ?
              <Route path={'/' + requests.routeMap + "/routes-:direction"} component={HomeBodyBottom} />
              :
              <Route path={'/' + requests.routeMap + "/routes"} component={HomeBodyBottom} />
          }
          <Route path={'/' + requests.routeMap + "/drivers/:cities"} component={Drivers} />
        </main>

      </React.Fragment>
    )
  }
}

const Home = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
    globalReduser: state.GlobalReduser
  }),
)(HomeClass);

export default Home;
