import React from 'react';
import './Places.css';
import Header from '../header/Header';
import PlacesCountryInfo from './PlacesCountryInfo'
import PlacesPanel from './PlacesPanel';
import PopularPlaces from './PopularPlaces';
// import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import PlacesList from './PlacesList';
import PlacesTagList from './PlacesTagList';
import { connect } from 'react-redux';
import Manipulator from '../manipulator/Manipulator';
import { setPage, setMorePagesShow,setSelectedDirection } from '../../redusers/ActionPlaces';

import axios from 'axios';
import { setPlacesList } from '../../redusers/ActionPlaces';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';

import Cookies from 'universal-cookie';
import {Helmet} from 'react-helmet';
const cookies = new Cookies();

class PlacesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      country: "",
      language: "",
      isRefreshExist: false,
      selectedDirection: '' 
    }
  }
  setPageFunc=(page)=> {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
  }
  showMorePages=()=> {
    this.props.dispatch(setMorePagesShow());
  }
  sendRequestFunc = () => {
    function findSelectedDirectionId(directions, slug){
      for(let i=0; i<directions.length; i++){
        //for(let k=0; k<directions[i].loc.length; k++){
          if(directions[i].loc.slug===slug){
            return directions[i].id
          }
        //}
      }
      return 0;
    }
    let selectedDirection=this.props.match.params.direction;
    if(!selectedDirection){//защита от undefined
      selectedDirection='';
    }
    let country = cookies.get('country', { path: '/' });
    let lang =  cookies.get('userLang', { path: '/' });

    let shouldSendRequest = !this.state.isRefreshExist && 
      (
        this.state.selectedDirection!==(selectedDirection) ||
        this.state.country!==country ||
        (this.state.language !==lang )
      );

    if( shouldSendRequest){
      
      //let selectedDirection = this.props.match.params.direction;

      this.setState({
          country: country,
          language: lang,
          isRefreshExist: true,
          selectedDirection: selectedDirection
      });
      
      //let country = cookies.get('country', { path: '/' });
      let that = this;
      
      axios.get(requests.getPlacesList+"?country="+country+"&lang="+lang+(selectedDirection ? "&slug="+selectedDirection : ''))
      .then(response => {
          console.log(response);              
          return response.data;
      })
      .then(data => {
          
          if (data.error) {
              console.log("bad");
              throw data.error;
          }
          else {
              
            console.log('good');
            console.log(data);
            that.props.dispatch(setPlacesList(data.places, data.tags, data.directions,data.country));
            //следующие строки проверяют, смогли ли мы воспользоваться slug направления, если он, конечно, был
            
            
            if (selectedDirection.length>0){
              let id = findSelectedDirectionId( data.directions, selectedDirection);
              if(id!==0){
                that.props.dispatch(setSelectedDirection(id));
              }
              else{       
                //если не нашли - пускаем ещё раз крутилку - если не нашли, сервер не нашёл направление-> вернул всё
                that.props.globalReduser.history.push("/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+'/places');
              }   
            }
            else{
              that.props.dispatch(setSelectedDirection(''));
            }
            that.setState({
              isRefreshExist: false
            });

          }
      })
      .catch(error => {
          console.log('get wasted answer');
          this.props.globalReduser.history.push('/');
      });
    }
  }
  render() {
    function findSelectedDirectionName(directions, selectedDirection){          
      for(let i=0; i<directions.length; i++){
          //for(let j=0; j<directions[i].loc.length; j++){
            if(directions[i].loc.slug===selectedDirection){
              return directions[i].loc.name;
            }
          //}      
      }
      return '';     
    }
    
    console.log("Places render",this.props.placesState);   
    
    this.sendRequestFunc();
    /*
    console.log(this.props);
    console.log(this.state);
    console.log(document);
    console.log(window);*/
    let selectedDirection=this.props.match.params.direction;
    if(!selectedDirection){//защита от undefined
      selectedDirection='';
    }
    let countryName = this.props.storeState.countries.length>0 ?
     this.props.globalReduser.findCountryNameByISO(this,cookies.get('country', {path: '/'}),cookies.get('userLang', {path: '/'}))
     : '';
    if(countryName.length>0){
      
    }
    let name = findSelectedDirectionName(this.props.placesState.directions, selectedDirection);
    let helmet = this.props.storeState.languageTextMain.helmets.places;
    
    return (
      <React.Fragment>
        <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={/*this.state.isRefreshing*/true} isGoodAnswer={/*this.state.isGoodAnswer*/true}/>
        <Helmet>
          <title>{helmet.loading.title}</title>
          <meta name="description" content={helmet.loading.description} />
          <meta property="og:site_name" content="Tripfer" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={document.URL} />
          <meta property="og:title" content={helmet.loading.title} />
          <meta property="og:description" content={helmet.loading.description}/> 
        </Helmet>
        {
          countryName.length>0 ? 
          (  
            this.props.placesState.directions.length>0 && selectedDirection.length>0 ?     
            <Helmet>
              <title>{findSelectedDirectionName(this.props.placesState.directions, selectedDirection)+helmet.direction.title}</title>
              <meta name="description" content={findSelectedDirectionName(this.props.placesState.directions, selectedDirection)+helmet.direction.description} />
              <meta property="og:site_name" content="Tripfer" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content={document.URL} /*тут нужно добавить direction *//>
              <meta property="og:title" content={findSelectedDirectionName(this.props.placesState.directions, selectedDirection)+helmet.direction.title} />
              <meta property="og:description" content={findSelectedDirectionName(this.props.placesState.directions, selectedDirection)+helmet.direction.description} /> 
            </Helmet> : 
            <Helmet>
              <title>{countryName+helmet.country.title}</title>
              <meta name="description" content={countryName+helmet.country.description} />
              <meta property="og:site_name" content="Tripfer" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content={document.URL} />
              <meta property="og:title" content={countryName+helmet.country.title} />
              <meta property="og:description" content={countryName+helmet.country.description} /> 
            </Helmet>
          )
          : <React.Fragment/>
          
        }

        <div className="drivers_top_background col-12 p-0">
        <Header history={this.props.history}/>
        <div className="wrapper d-flex flex-column">            
          <PlacesCountryInfo />
        </div>
        </div>
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
            <div className="drivers_body d-flex">
              <div id="placesMainBlock" className="left_body_part col-12 p-0">
                <PopularPlaces/>
                <PlacesTagList/>
                <PlacesPanel />
                
                <PlacesList />
                <Manipulator number={this.props.placesState.placesList.length} page={this.props.placesState.page} setPage={this.setPageFunc}
                  elementsNumber={this.props.placesState.pagesMenuValue} showMorePages={this.showMorePages}
                />
              </div>
              {/* <div className="right_body_part col-3">
                <DriversCommercial />
              </div> */}
            </div>

          </div>
        </div>
      </React.Fragment>
    )
  }
}

const Places = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalReduser: state.GlobalReduser, 
    placesState: state.PlacesReduser
  }),

)(PlacesClass);

export default Places;