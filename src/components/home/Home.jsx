import React, { Suspense, lazy } from 'react';
import './Home.css';
import './text.css';
import { isMobileOnly } from 'react-device-detect';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import requests from '../../config'

import Drivers from '../drivers/Drivers'
import Header from '../header/Header';
import HomeBody from './HomeBody/HomeBody.jsx'
import Cookies from 'universal-cookie';

import readyRoutesIcon from '../media/readyRoutes.png'
import toursIcon from '../media/tours.png'
import guidesIcon from '../media/guides.png'
import interestingPlacesIcon from '../media/interestingPlaces.png'


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
    let renderArray = [
      {img:readyRoutesIcon,link:"/routes/",
      title:textInfo.renderArray.first.title,
      text:textInfo.renderArray.first.text},
      {img:toursIcon,link:"/tours/",
      title:textInfo.renderArray.second.title,
      text:textInfo.renderArray.second.text},
      {img:guidesIcon,link:"/guides/",
      title:textInfo.renderArray.third.title,
      text:textInfo.renderArray.third.text},
      {img:interestingPlacesIcon,link:"/places/",
      title:textInfo.renderArray.fourth.title,
      text:textInfo.renderArray.fourth.text},
    ];
    let routeUrl = null;
    routeUrl = this.props.history.location.pathname.split('/')
    return (
      <>
      {
        routeUrl[2]==="drivers"||routeUrl[2]===""?
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
          <Suspense fallback={<div>{textInfo.loading + '...'}</div>}>
            {
              this.state.firstEnter ?
                <FirstEnterModal whatRender="user" /> : <React.Fragment />
            }
          </Suspense>

          <div className="home_window" style={{ background: "url(" + windowImg + ")no-repeat" }}>
            <Header history={this.props.history} />

            <div className="home_block col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
              {!isMobileOnly ?
                <div className="home_text col-xl-10 col-lg-10 col-md-12 col-sm-11 col-11 p-0">
                  <h1 className="text_firstLine">{textInfo.homeTextFirstLine}</h1>
                  <div className="text_secondLine">{textInfo.homeTextSecondLine[0]}<br/>{textInfo.homeTextSecondLine[1]}</div>
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
            (routeUrl[2]!=="drivers")&&
            <div className="homeBottomNew">
            <div style={{ minHeight: "80vh" }} className="d-flex flex-column justify-content-center align-items-center">
              <div className="homeBottomNewText d-flex flex-column align-items-center col-md-10 col-12 pb-4 ">
                <h3>{textInfo.homeBottomNewText.h3[0]}<br/>{textInfo.homeBottomNewText.h3[1]}</h3>
                <p>{textInfo.homeBottomNewText.p[0]}<br/>{textInfo.homeBottomNewText.p[1]}<br/>{textInfo.homeBottomNewText.p[2]}<br/>{textInfo.homeBottomNewText.p[3]}<strong>{textInfo.homeBottomNewText.p[4]}</strong>,<strong>{textInfo.homeBottomNewText.p[5]}</strong>{textInfo.homeBottomNewText.p[6]}<strong>{textInfo.homeBottomNewText.p[7]}</strong></p>
              </div>
              <div className="d-flex flex-md-row flex-column justify-content-center align-items-md-stretch align-items-center col-md-10 col-12">
                {renderArray.map((element, index) => 
                  <div className="homeBottomNewEl position-relative d-flex flex-column col-md-3 col-11 p-2 " >
                    <div className="homeBottomNewElContent d-flex flex-column align-items-center p-2 pt-4 h-100">
                      <i style={{background: "url(" + element.img + ")no-repeat"}}></i>
                      <h5 className="align-self-start">{element.title}</h5>
                      <p>{element.text}</p>
                    </div>
                    <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + element.link}><span>{textInfo.look}</span></Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          }
          

          {/* {
            selectedDirection ?
              <Route path={'/' + requests.routeMap + "/routes-:direction"} component={HomeBodyBottom} />
              :
              <Route path={'/' + requests.routeMap + "/routes"} component={HomeBodyBottom} />
          } */}
          <Route path={'/' + requests.routeMap + "/drivers/:cities"} component={Drivers} />
        </main>

      </>
        :
        <></>
      }
      </>
      
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
