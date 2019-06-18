import React from 'react';
import './Places.css';
import Header from '../header/Header';
import PlacesCountryInfo from './PlacesCountryInfo'
import PlacesPanel from './PlacesPanel';
import PopularPlaces from './PopularPlaces';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import PlacesList from './PlacesList';
import PlacesTagList from './PlacesTagList';
import { connect } from 'react-redux';
import Manipulator from '../manipulator/Manipulator';
import { setPage, setMorePagesShow } from '../../redusers/ActionPlaces';

import Tbilisy from './pictures/tbilisi_desk.jpg'
import Batumi from './pictures/Batumi.-Podorozh-do-sertsya-Gruziyi-700x420.jpg'
import kytaisy from './pictures/Kolhidskiy-fontan.-Kutaisi.jpg'
import Rustavi from './pictures/Rustavi_Museum_(A._Muhranoff,_2011).jpg'
import samegrello from './pictures/thumb_536_1370_437_0_0_auto.jpg'
import Andshi from './pictures/Вид_на_деревушку_Адиши,_Грузия.jpg'


import axios from 'axios';
import { setPlacesList } from '../../redusers/ActionPlaces';
import requests from '../../config';
class PlacesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={
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
      country: "",
      language: "" 
    }
    this.setPageFunc = this.setPageFunc.bind(this);
    this.showMorePages = this.showMorePages.bind(this);
  }
  setPageFunc(page) {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
  }
  showMorePages() {
    this.props.dispatch(setMorePagesShow());
  }
  render() {
    console.log("Places render");
    console.log(this.props.placesState);
    if( this.props.storeState.languages.length>0 && (this.state.country!==this.props.storeState.country || this.state.language !==this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO ) ){
      //debugger;
      this.setState({
          country: this.props.storeState.country,
          language: this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO
      });
      axios.get(requests.getPlacesList+"?country="+this.props.storeState.country+"&lang="+this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO)
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
              this.props.dispatch(setPlacesList(data.places, data.tags, data.directions));
          }
      })
      .catch(error => {
          console.log('get wasted answer');
      });
    }
    return (
      <React.Fragment>
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
                <PopularPlaces arrayRender={/*this.state.popularPlaseArrayRender*/this.props.placesState.directions}/>
                <PlacesTagList/>
                <PlacesPanel />
                
                <PlacesList />
                <Manipulator number={this.props.placesState.places[0].places.length} page={this.props.placesState.page} setPage={this.setPageFunc}
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