import React from 'react';
import './PlacesPanel.css';
import { connect } from 'react-redux';
import {  setPagesVisible  } from '../../redusers/Action';
import PagesMenu from '../drivers/DriversBody/DriversProperties/components/PagesMenu/PagesMenu';
import {setPagesMenuValue, setSortMenuValue} from '../../redusers/ActionPlaces'; 
class PlacesPanelClass extends React.Component {
    render(){
        console.log("PlacesPanel render");
        console.log(this.props.placesState)

        let buttonStyles = Array(this.props.placesState.sortMenuVariants.length).fill("");
        buttonStyles[this.props.placesState.sortMenuValue]="driverProfileComments_panel_selectedElement";
        
        return(
            <React.Fragment>
            <div className="driverProfileComments_panel">
                <div className="placesPanel_sortText ">Сортировать по:</div>
                {this.props.placesState.sortMenuVariants.map((element, index)=>
                    <button className={"driverProfileComments_panel_element "+buttonStyles[index]} onClick={()=>this.props.dispatch(setSortMenuValue(element))}>{element}</button>
                )}
                
                <div className="properties_rightBlock ">
                    <div className="properties_buttonStyle properties_rightButton" onClick={() => this.props.dispatch(setPagesVisible(!this.props.storeState.pagesMenu))}>
                        <div className="properties_rightButton_characteristic">{this.props.placesState.pagesMenuValue} / страниц</div>
                        <div className="properties_arrow"></div>
                        <PagesMenu pagesMenuVariants={this.props.placesState.pagesMenuVariants} isVisible={this.props.storeState.pagesMenu} setPages={setPagesMenuValue}/>
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
      placesState: state.PlacesReduser
    }),
  )(PlacesPanelClass);
  
  export default PlacesPanel;