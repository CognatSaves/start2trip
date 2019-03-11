import React from 'react';
import './Places.css';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import PlacesCountryInfo from './PlacesCountryInfo'
import PlacesPanel from './PlacesPanel';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import PlacesList from './PlacesList';

import Manipulator from '../manipulator/Manipulator';
export default class Places extends React.Component {
    render(){
        return(
            <React.Fragment>
              <div className = "drivers_top_background">
                <Header colorClass="colorClass" colorClass2="colorClass2" backgroundColorClass="backgroundColorClass"
                 borderColorClass="borderColorClass" labelColorClass="labelColorClass" type={1}/>
                 <PlacesCountryInfo/>
              </div>
              <div className = "drivers_bottom_background" >
                <div className="drivers_body">
                  <div className="left_body_part">
                    <PlacesPanel/>
                    <PlacesList/>
                    <Manipulator/>
                  </div>
                  <div className="right_body_part">
                    <DriversCommercial/>
                  </div>
                </div>
                
                
              </div>
              <Footer/>           
          </React.Fragment>
        )
    }
}