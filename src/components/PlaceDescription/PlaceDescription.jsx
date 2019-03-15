import React from 'react';
import './PlaceDescription.css';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import PlaceInfo from './PlaceInfo.jsx';
import PlacePanel from './PlacePanel.jsx';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import { connect } from 'react-redux';
import ippodrom from './pictures/ippodrom.jpg';



class PlaceDescriptionClass extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <div className = "drivers_top_background placeDescription_background col-12">
                    <img src={ippodrom} width="100%" height="100%" style={{position: "absolute"}} alt="noImage"/>
                    <div style={{position: "absolute", width:"100%", height:"100%", backgroundColor: "rgba(0,0,0,0.5)"}}/>
                    <div className="wrapper d-flex flex-column">
                        <Header colorClass="colorClass" colorClass2="colorClass2" backgroundColorClass="backgroundColorClass"
                        borderColorClass="borderColorClass" labelColorClass="labelColorClass" type={1}/>
                        <PlaceInfo/>
                    </div>
                </div>
                <div className="wrapper d-flex flex-column">
                    <div className = "drivers_bottom_background d-flex flex-column" >
                    <div className="drivers_body d-flex">
                        <div className="left_body_part col-9">
                            <PlacePanel/>
                        </div>
                        <div className="right_body_part col-3">
                        <DriversCommercial/>
                        </div>
                    </div>
                    
                    </div>
                </div>
                <Footer/> 
            </React.Fragment>
        )
    }
}

const PlaceDescription = connect(
    (state) => ({
        placesState: state.PlacesReduser
    }),

    )(PlaceDescriptionClass);

export default PlaceDescription;