import React from 'react';
import '../Places/PlacesPanel.css';
import { connect } from 'react-redux';
import {  setPagesVisible  } from '../../redusers/Action';
import PagesMenu from '../drivers/DriversBody/DriversProperties/components/PagesMenu/PagesMenu';
import {setPagesMenuValue, setSortMenuValue} from '../../redusers/ActionPlaces'; 

class PlacePanelClass extends React.Component {
    render(){

        let buttonStyles = Array(this.props.placesState.sortMenuVariants.length).fill("");
        buttonStyles[this.props.placesState.sortMenuValue]="driverProfileComments_panel_selectedElement";
        
        return(
            <React.Fragment>
            <div className="driverProfileComments_panel d-flex">
                {this.props.placesState.sortMenuVariants.map((element, index)=>
                    <button className={"driverProfileComments_panel_element "+buttonStyles[index]} onClick={()=>this.props.dispatch(setSortMenuValue(element))}>{element}</button>
                )}               
            </div>         
          </React.Fragment>
        )
    }
}
const PlacePanel = connect(
    (state) => ({
      storeState: state.AppReduser,
      placesState: state.PlacesReduser
    }),
  )(PlacePanelClass);
  
  export default PlacePanel;