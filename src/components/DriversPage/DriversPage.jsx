import React from 'react';
import '../Places/Places.css';
import { connect } from 'react-redux';
import { setPage, setSelectedDirection, setGuidesList } from '../../redusers/ActionGuides';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import requests from '../../config';
import Header from '../header/Header';

import PlacesCountryInfo from '../Places/PlacesCountryInfo';
import DriversPagePanel from './DriversPagePanel';
import DriversPageList from './DriversPageList';
/*
import PlacesPanel from './PlacesPanel';
import PopularPlaces from './PopularPlaces';
import PlacesList from './PlacesList';
import PlacesTagList from './PlacesTagList';
*/
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class DriversPageClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      language: "",
      departurePoint: ''
    }
    //сначала уборка
    this.props.dispatch(setGuidesList([], [], [], {}));
    //потом уже дело
    this.props.dispatch(setPage(1));
  }
  departurePointChange =(point)=>{
    this.setState({ departurePoint: point })
  }
  sendRequestFunc = () => {

    let country = cookies.get('country', { path: '/' });
    let lang = cookies.get('userLang', { path: '/' });

    let shouldSendRequest = !this.props.storeState.isRefreshExist &&
      (
        this.state.country !== country ||
        (this.state.language !== lang)
      );

    if (shouldSendRequest) {


      //let selectedDirection = this.props.match.params.direction;

      this.setState({
        country: country,
        language: lang,
      });
      startRefresherGlobal(this)

      //let country = cookies.get('country', { path: '/' });
      let that = this;
      let body = JSON.stringify({
        country: country,
        language: lang
      });

      /*
      fetch(requests.findGuides, {
        method: 'PUT', body: body,
        headers: { 'content-type': 'application/json' }
      })
      .then(response=>{
        return response.json();
      })
      .then(function (data){
        if(data.error){
          console.log('bad');
          throw data.error;
        }
        else{
          console.log("good");
          console.log(data);
          
          that.props.dispatch(setGuidesList(data.guides, data.country, data.departurePoints));
          thenFuncGlobal(that)
        }
      })
      .catch(function(error){
        console.log('bad');
        console.log('An error occurred:', error);
        catchFuncGlobal(that)
      })
      */

      console.log(requests.getDriversList);
      fetch(requests.getDriversList,{
        method: 'PUT', body: body,
        headers: { 'content-type': 'application/json' }
      })
      .then(response=>{
        return response.json();
      })
      .then(function(data){
        
        if(data.error){
          console.log('bad');
          throw data.error;
        }
        else{
          
          console.log("good");
          console.log(data);
          
          that.props.dispatch(setGuidesList(data.drivers, data.country, []));
          thenFuncGlobal(that)
        }
      })
      .catch(function(error){
        
        console.log('bad');
        console.log('An error occurred:', error);
        catchFuncGlobal(that)
      })
    }
  }
  
  render() {
    function findSelectedDirectionName(directions, selectedDirection) {
      for (let i = 0; i < directions.length; i++) {
        //for(let j=0; j<directions[i].loc.length; j++){
        if (directions[i].loc.slug === selectedDirection) {
          return directions[i].loc.name;
        }
        //}      
      }
      return '';
    }

    console.log("Guides render", this.props, this.state);

    this.sendRequestFunc();

    
    let selectedDirection = this.props.match.params.direction;
    if (!selectedDirection) {//защита от undefined
      selectedDirection = '';
    }
    let countryName = this.props.storeState.countries.length > 0 ?
      this.props.globalReduser.findCountryNameByISO(this, cookies.get('country', { path: '/' }), cookies.get('userLang', { path: '/' }))
      : '';
    //let name = findSelectedDirectionName(this.props.guidesState.directions, selectedDirection);
    let helmet = this.props.storeState.languageTextMain.helmets.driverPage;

    //let a = this.props.placesState.placesList;
    let directions = [];
    let directionName;
    let countryISO;

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
      if (coockisIso === undefined) {
        j = 1
      }
      windowImg = requests.serverAddressImg + this.props.storeState.countries[j].windowImg.url
    }

    return (
        <>
            {

                countryName.length > 0 ?
                  <Helmet>
                    <title>{helmet.country.title[0] + countryName + helmet.country.title[1]}</title>
                    <meta name="description" content={helmet.country.description[0] + countryName + helmet.country.description[1]} />
                    <meta property="og:site_name" content="Tripfer.com" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={document.URL} />
                    <meta property="og:title" content={helmet.country.title[0] + countryName + helmet.country.title[1]} />
                    <meta property="og:description" content={helmet.country.description[0] + countryName + helmet.country.description[1]} />
                    <script type="application/ld+json">
                      {`
                            {
                            "@context": "https://schema.org",
                          "@type": "Place",
                          "url": `+ JSON.stringify(document.URL) + `,
                          "address":[
                          {
                            "@type": "PostalAddress",
                          "addressCountry":`+ countryISO + `,
                          "addressRegion":`+ directions + `
                          }
                        ],
                        "photo":[
                          {
                            "@type": "ImageObject",
                          "thumbnail":"https://tripfer.com/uploads/bf77b09a0d3d4564b6c7eb9eb2f4a51d.jpg"
                          }
                          ]
                        }
                        `}
                    </script>
                    {/* TODO img */}
                  </Helmet>                   
                  : <React.Fragment />

            }

            <div className="drivers_top_background col-12 p-0" style={{ background: "url(" + windowImg + ")no-repeat" }}>
                <Header history={this.props.history} />
                <div className="wrapper d-flex flex-column">
                    <PlacesCountryInfo placesState={this.props.guidesState} />
                </div>
            </div>
            <div className="wrapper d-flex flex-column">
                <div className="drivers_bottom_background d-flex flex-column" >
                    <div className="drivers_body d-flex">
                        <div id="placesMainBlock" className="left_body_part col-12 p-0">
                            <DriversPagePanel guidesState={this.props.guidesState} departurePoints={this.props.guidesState.departurePoints}
                              departurePoint={this.state.departurePoint} departurePointChange={this.departurePointChange}
                            />
                            <DriversPageList isStaying={!this.props.storeState.isRefreshExist} departurePoint={this.state.departurePoint}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
  }
}

const DriversPage = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalReduser: state.GlobalReduser,
    guidesState: state.GuidesReduser,
    placesState: state.PlacesReduser
  }),

)(DriversPageClass);

export default DriversPage;