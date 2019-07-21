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

// import Tbilisy from './pictures/tbilisi_desk.jpg'
// import Batumi from './pictures/Batumi.-Podorozh-do-sertsya-Gruziyi-700x420.jpg'
// import kytaisy from './pictures/Kolhidskiy-fontan.-Kutaisi.jpg'
// import Rustavi from './pictures/Rustavi_Museum_(A._Muhranoff,_2011).jpg'
// import samegrello from './pictures/thumb_536_1370_437_0_0_auto.jpg'
// import Andshi from './pictures/Вид_на_деревушку_Адиши,_Грузия.jpg'


import axios from 'axios';
import { setPlacesList } from '../../redusers/ActionPlaces';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class PlacesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      /*
      popularPlaseArrayRender : [
        { title: "Tbilisy", img: Tbilisy },
        { title: "Batumi", img: Batumi },
        { title: "kytaisy", img: kytaisy },
        { title: "Rustavi", img: Rustavi },
        { title: "samegrello", img: samegrello },
        { title: "Tbilisy", img: Tbilisy },
        { title: "Rustavi", img: Rustavi },
        { title: "samegrello", img: samegrello },
        { title: "Tbilisy", img: Tbilisy },
        { title: "Andshi", img: Andshi },
        { title: "Batumi", img: Batumi },
        { title: "kytaisy", img: kytaisy },
        { title: "Rustavi", img: Rustavi },
        { title: "samegrello", img: samegrello },
        { title: "Tbilisy", img: Tbilisy },
        { title: "Rustavi", img: Rustavi },
        { title: "samegrello", img: samegrello },
        { title: "Tbilisy", img: Tbilisy },
        { title: "Andshi", img: Andshi },

      ],
      */
      country: "",
      language: "",
      isRefreshExist: true,
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
  render() {
    console.log("Places render");
    console.log(this.props.placesState);
    
    let selectedDirection=this.props.match.params.direction;
    if( this.props.storeState.languages.length>0 &&
       (
         this.state.selectedDirection!==selectedDirection ||
         this.state.country!==this.props.storeState.country ||
         this.state.language !==this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO
        )
      ){
      
      //let selectedDirection = this.props.match.params.direction;

      this.setState({
          country: this.props.storeState.country,
          language: this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO,
          isRefreshExist: true,
          selectedDirection: selectedDirection
      });
      
      let country = cookies.get('country', { path: '/' });
      axios.get(requests.getPlacesList+"?country="+(country ? country : this.props.storeState.country)+"&lang="+this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO+(selectedDirection ? "&slug="+selectedDirection : ''))
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
              function findSelectedDirectionId(directions, slug){
                for(let i=0; i<directions.length; i++){
                  for(let k=0; k<directions[i].loc.length; k++){
                    if(directions[i].loc[k].slug===slug){
                      return directions[i].id
                    }
                  }
                }
                return 0;
              }
              console.log('good');
              console.log(data);
              this.props.dispatch(setPlacesList(data.places, data.tags, data.directions,data.country));
              //следующие строки проверяют, смогли ли мы воспользоваться slug направления, если он, конечно, был
              
              if (selectedDirection){
                let id = findSelectedDirectionId( data.directions, selectedDirection);
                if(id!==0){
                  this.props.dispatch(setSelectedDirection(id));
                }
                else{
                  
                  //если не нашли - пускаем ещё раз крутилку - если не нашли, сервер не нашёл направление-> вернул всё
                  this.props.globalReduser.history.push('/places');
                }   
              }
              this.setState({
                isRefreshExist: false
              });

          }
      })
      .catch(error => {
          console.log('get wasted answer');
          this.props.globalReduser.history.push('/');
      });
    }
    
    console.log(this.props);
    console.log(this.state);
    console.log(document);
    console.log(window);
    return (
      <React.Fragment>
        <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={/*this.state.isRefreshing*/true} isGoodAnswer={/*this.state.isGoodAnswer*/true}/>
            
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