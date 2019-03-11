import React from 'react';
import './PlacesList.css';
import { connect } from 'react-redux';
import ippodrom from './pictures/ippodrom.jpg';

class PlacesPanelClass extends React.Component {
    render(){
        return(
            <React.Fragment>
            <div className="drivers_block">
                <div className="placesList_element">
                   <div className="placesList_picture">
                        <img src={ippodrom} width="100%" height="100%" alt=""></img>
                   </div>
                   <div className="placesList_info">
                       <div className="placesList_info_row" style={{marginBottom: "auto"}}>
                            <div style={{display: "flex", flexDirection: "column", marginRight: "auto"}}>
                                <div>
                                    Большой ипподром
                                </div>
                                <div>
                                    stars
                                </div>
                            </div>
                            <div style= {{display: "flex", marginLeft: "auto"}}>
                                place check
                            </div>
                       </div>
                       <div className="placesList_info_row" style={{margin: "auto 0"}}>
                        TextBlock      
                       </div>
                       <div className="placesList_info_row" style={{marginTop: "auto"}}>
                            <div style={{marginRight: "auto"}}>
                                Position
                            </div>
                            <div style={{marginLeft: "auto"}}>
                                Подробнее
                            </div>
                       </div>
                   </div>
                </div>
                <div className="placesList_element">
                    <div className="placesList_picture">
                        <img src={ippodrom} width="100%" height="100%" alt=""></img>
                   </div>
                   <div className="placesList_info">
                       AAA
                   </div>     
                </div>
                <div className="placesList_element">
                    <div className="placesList_picture">
                        <img src={ippodrom} width="100%" height="100%" alt=""></img>
                   </div>
                   <div className="placesList_info">
                       AAA
                   </div>
                </div>
                <div className="placesList_element">
                    <div className="placesList_picture">
                        <img src={ippodrom} width="100%" height="100%" alt=""></img>
                   </div>
                   <div className="placesList_info">
                       AAA
                   </div>
                </div>
                <div className="placesList_element">
                    <div className="placesList_picture">
                        <img src={ippodrom} width="100%" height="100%" alt=""></img>
                   </div>
                   <div className="placesList_info">
                       AAA
                   </div>
                </div>

            </div> 
            </React.Fragment>
        )
    }
}
const PlacesPanel = connect(
    (state) => ({
      storeState: state.AppReduser,
    }),
  )(PlacesPanelClass);
  
export default PlacesPanel;