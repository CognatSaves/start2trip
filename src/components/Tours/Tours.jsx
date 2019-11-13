import React from 'react';
import '../Places/Places.css';
import { connect } from 'react-redux';
import { setPage, setSelectedDirection } from '../../redusers/ActionPlaces';
import { setPlacesList } from '../../redusers/ActionPlaces';
import { setToursList } from '../../redusers/ActionTours'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import requests from '../../config';
import Header from '../header/Header';
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'
import PlacesCountryInfo from '../Places/PlacesCountryInfo'
// import PlacesPanel from '../Places/PlacesPanel';
import PopularPlaces from '../Places/PopularPlaces';
import ToursList from './ToursList';
import TourInfo from '../TourDescription/TourInfo'
import DriversProperties from '../drivers/DriversBody/DriversProperties/DriversProperties'
// import PlacesTagList from '../Places/PlacesTagList';

import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, } from '../../redusers/GlobalFunction'
import MobileFilter from '../drivers/DriversBody/DriversProperties/MobileFilter/MobileFilter'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ToursClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: "",
      language: "",
      selectedDirection: '',
      departureDate: new Date(),
      departurePoint: "",
      duration: this.props.match.params.duration === undefined ? "default" : this.props.match.params.duration,
      tourType: "default",
      clickButton: false,
      travelVisibility: false,
      successVisibility: 'none',
      elementPrice: 0,
      elementActive: null,
      temp: 0,
      countryDescription: null,
      freeSeats: 0,
      isFirst: true,
      activeSlug: "",
    }
    //сначала уборка
    this.props.dispatch(setPlacesList([], [], [], {}));
    //потом уже дело
    this.props.dispatch(setPage(1));
  }
  sendRequestFunc = (isFirst) => {

    function findSelectedDirectionId(directions, slug) {
      for (let i = 0; i < directions.length; i++) {
        //for(let k=0; k<directions[i].loc.length; k++){
        if (directions[i].loc.slug === slug) {
          return directions[i].id
        }
        //}
      }
      return 0;
    }
    let selectedDirection = this.props.match.params.direction;
    if (!selectedDirection) {//защита от undefined
      selectedDirection = '';
    }
    let country = cookies.get('country', { path: '/' });
    let lang = cookies.get('userLang', { path: '/' });

    let shouldSendRequest = !this.props.storeState.isRefreshExist &&
      (
        this.state.selectedDirection !== (selectedDirection) ||
        this.state.country !== country ||
        (this.state.language !== lang) || !isFirst
      );

    if (shouldSendRequest) {


      //let selectedDirection = this.props.match.params.direction;

      this.setState({
        country: country,
        language: lang,
        selectedDirection: selectedDirection,
      });

      //let country = cookies.get('country', { path: '/' });
      let that = this;
      let pointSelect = "";
      let lat = this.props.match.params.lat
      let long = this.props.match.params.long

      if (this.props.toursState.departurePoint && this.props.toursState.departurePoint.length > 0) {
        for (let i = 0; i < this.props.toursState.departurePoint.length; i++) {
          if (this.props.toursState.departurePoint[i].point === this.state.departurePoint) {
            pointSelect = this.props.toursState.departurePoint[i];
            break;
          }
        }
      } else {
        if (lat !== undefined && lat !== "default" && long !== undefined && long !== "default") {

          pointSelect = { point: "", lat: lat, long: long }
        } else {
          pointSelect = this.state.departurePoint
        }
      }
      pointSelect = JSON.stringify(pointSelect)
      let durationCorrect = null;

      if (Number(this.state.duration)) {
        durationCorrect = this.state.duration
      }
      startRefresherGlobal(this)

      axios.get(requests.getTours + "?country=" + country + "&lang=" + lang + (selectedDirection ? "&slug=" + selectedDirection : '') + "&departurePoint=" + pointSelect + "&duration=" + durationCorrect + "&departureDate=" + this.state.departureDate)
        .then(response => {
          return response.data;
        })
        .then(function (data) {
          debugger;
          if (data.error) {
            console.log('bad tour request');
            throw data.error;
          }
          else {
            
            console.log('tour request data', data);
            that.props.dispatch(setToursList(data.tours, data.categories, data.tags, data.directions, data.daysNumber, data.departurePoint));

          }
          if (selectedDirection.length > 0) {
            let id = findSelectedDirectionId(data.directions, selectedDirection);
            if (id !== 0) {
              that.props.dispatch(setSelectedDirection(id));
            }
            else {

              //если не нашли - пускаем ещё раз крутилку - если не нашли, сервер не нашёл направление-> вернул всё
              that.props.globalReduser.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/tours/');
            }
          }
          else {
            that.props.dispatch(setSelectedDirection(''));
          }
          that.setState({
            temp: that.state.temp + 1,
            countryDescription: data.country
          });
          thenFuncGlobal(that)
        })
        .catch(error => {
          catchFuncGlobal(that)
          console.log('get wasted answer');
          this.props.globalReduser.history.push('/');
        });
    }
  }

  departureDateChange = (data) => {
    this.setState({ departureDate: data })

  }

  departurePointChange = (point) => {
    this.setState({ departurePoint: point })
  }

  durationChange = (duration) => {
    this.setState({ duration: duration })
  }

  tourTypeChange = (type) => {
    this.setState({ tourType: type })
  }

  changeTravelVisibility = (elementPrice, elementActive, freeSeats) => {

    this.setState({
      travelVisibility: !this.state.travelVisibility,
      elementPrice: elementPrice,
      elementActive: elementActive,
      freeSeats: freeSeats
    })
  }

  changeSuccessVisibility = (value) => {
    this.setState({
      successVisibility: value
    })
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

    this.sendRequestFunc(true);

    console.log("Tours render", this.props);


    let selectedDirection = this.props.match.params.direction;
    if (!selectedDirection) {//защита от undefined
      selectedDirection = '';
    }



    let countryName = this.props.storeState.countries.length > 0 ?
      this.props.globalReduser.findCountryNameByISO(this, cookies.get('country', { path: '/' }), cookies.get('userLang', { path: '/' }))
      : '';
    if (countryName.length > 0) {

    }
    let name = findSelectedDirectionName(this.props.placesState.directions, selectedDirection);
    let helmet = this.props.storeState.languageTextMain.helmets.places;

    // let a = this.props.placesState.placesList;
    let directions = [];
    let directionName;
    let countryISO;
    if (this.props.placesState.directions.length > 0) {
      for (let i = 0; i < this.props.placesState.directions.length; i++) {
        directions.push(this.props.placesState.directions[i].loc.slug)
      }
      countryISO = JSON.stringify(this.state.country);
    }
    if (this.props.placesState.directions.length > 0 && selectedDirection.length > 0) {
      directionName = JSON.stringify(findSelectedDirectionName(this.props.placesState.directions, selectedDirection));
    }
    directions = JSON.stringify(directions)
    let windowImg = null
    if (this.props.storeState.languages.length > 0) {

      let search = this.props.globalReduser.history.location.search.split("?date=")

      if (search[1] !== undefined) {
        let searchDate = new Date(search[1])
        if (this.state.departureDate.toISOString() !== searchDate.toISOString()) {
          
          this.departureDateChange(searchDate);
          this.props.globalReduser.history.push(this.props.globalReduser.history.location.pathname + "?date=" + this.props.globalReduser.createDateTimeString(searchDate, true))
        }
      }

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
      if(this.props.placesState.selectedDirection !== ""){
        let url = ''
        for(let k = 0; k<this.props.toursState.directions.length;k++){
          if(this.props.toursState.directions[k].id === this.props.placesState.selectedDirection){
            url = this.props.toursState.directions[k].bigImage.url
          }
        }
        windowImg = requests.serverAddressImg + url
      }else{
        windowImg = requests.serverAddressImg + this.props.storeState.countries[j].windowImg.url
      }
      
    }

    let storeState = this.props.storeState;
    let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber];

    let lat = this.props.match.params.lat
    let long = this.props.match.params.long



    if (this.props.toursState.departurePoint.length > 0 && this.state.isFirst && this.state.departurePoint === "" && lat !== undefined && lat !== "default" && long !== undefined && long !== "default") {
      for (let i = 0; i < this.props.toursState.departurePoint.length; i++) {
        if (this.props.toursState.departurePoint[i].lat.toFixed(5) === lat && this.props.toursState.departurePoint[i].long.toFixed(5) === long) {
          this.departurePointChange(this.props.toursState.departurePoint[i].point)
          this.setState({ isFirst: false })

          break;
        }
      }
    }

    return (
      <>
        <MobileFilter maxPrice={this.props.toursState.maxPrice} hideTypeOfTransport={true} tourTypeChange={this.tourTypeChange} tourType={this.state.tourType}  /*departureDateChange={this.departureDateChange} departureDate={this.state.departureDate} */ />

        {

          countryName.length > 0 ?
            (
              this.props.placesState.directions.length > 0 && selectedDirection.length > 0 ?

                <Helmet>
                  <title>{helmet.direction.title[0] + findSelectedDirectionName(this.props.placesState.directions, selectedDirection) + helmet.direction.title[1]}</title>
                  <meta name="description" content={findSelectedDirectionName(this.props.placesState.directions, selectedDirection) + helmet.direction.description} />
                  <meta property="og:site_name" content="Tripfer.com" />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content={document.URL} /*тут нужно добавить direction */ />
                  <meta property="og:title" content={helmet.direction.title[0] + findSelectedDirectionName(this.props.placesState.directions, selectedDirection) + helmet.direction.title[1]} />
                  <meta property="og:description" content={findSelectedDirectionName(this.props.placesState.directions, selectedDirection) + helmet.direction.description} />

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
                    "addressRegion": `+ directionName + `
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
                </Helmet> :
                <Helmet>
                  <title>{helmet.country.title[0] + countryName + helmet.country.title[1]}</title>
                  <meta name="description" content={helmet.country.description[0] + countryName + helmet.country.description[1] + countryName + helmet.country.description[2]} />
                  <meta property="og:site_name" content="Tripfer.com" />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content={document.URL} />
                  <meta property="og:title" content={helmet.country.title[0] + countryName + helmet.country.title[1]} />
                  <meta property="og:description" content={helmet.country.description[0] + countryName + helmet.country.description[1] + countryName + helmet.country.description[2]} />
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
            )
            : <React.Fragment />

        }

        <div className="drivers_top_background col-12 p-0" style={{ background: "url(" + windowImg + ")no-repeat" }}>
          <Header history={this.props.history} />
          <div className="wrapper d-flex flex-column">
            <PlacesCountryInfo placesState={this.state.countryDescription !== null ? { country: this.state.countryDescription } : { country: {} }} />
          </div>
        </div>
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" onClick={() => { let a = this }}>
            <div className="drivers_body d-flex">
              <div id="placesMainBlock" className="left_body_part col-12 p-0" >

                <PopularPlaces placesState={this.props.toursState} where={"tours"} />

                <TourInfo sendRequestFunc={this.sendRequestFunc}
                  departurePointChange={this.departurePointChange} departurePoint={this.state.departurePoint}
                  departureDateChange={this.departureDateChange} departureDate={this.state.departureDate}
                  durationChange={this.durationChange} duration={this.state.duration}
                />

                <DriversProperties hideTypeOfTransport={true}
                  tourTypeChange={this.tourTypeChange} tourType={this.state.tourType} />

                <ToursList isStaying={!this.props.storeState.isRefreshExist} departureDate={this.state.departureDate}
                  changeTravelVisibility={this.changeTravelVisibility} tourType={this.state.tourType} />


              </div>
              {/* <div className="right_body_part col-3">
                <DriversCommercial />
              </div> */}
            </div>

          </div>
        </div>
        <StartTravelForm {...this.props} changeTravelVisibility={this.changeTravelVisibility}
          changeSuccessVisibility={this.changeSuccessVisibility} travelVisibility={this.state.travelVisibility}
          elementPrice={this.state.elementPrice} elementActive={this.state.elementActive}
          freeSeats={this.state.freeSeats} activeCurrency={activeCurrency} isoCountryMap={this.props.storeState.isoCountryMap}
          textInfo={this.props.storeState.languageTextMain.startTravelForm}

        />
        <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
          textInfo={this.props.storeState.languageTextMain.startTravelForm}
        />
      </>
    )
  }
}

const Tours = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalReduser: state.GlobalReduser,
    placesState: state.PlacesReduser,
    toursState: state.ToursReduser
  }),

)(ToursClass);

export default Tours;