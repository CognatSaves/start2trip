import React from 'react';
import '../../Places/PlacesPanel.css';
import { connect } from 'react-redux';
import {  setPagesVisible  } from  '../../../redusers/Action';
import PagesMenu from '../../drivers/DriversBody/DriversProperties/components/PagesMenu/PagesMenu';
import {setPagesMenuValue, setSortMenuValue} from '../../../redusers/ActionPlaces'; 


class HomeRoutesPanelClass extends React.Component {
    render(){
        let buttonStyles = Array(this.props.placesState.sortMenuVariants.length).fill("");
        buttonStyles[this.props.placesState.sortMenuValue]="driverProfileComments_panel_selectedElement";
        let textInfo = this.props.storeState.languageTextMain.places;
        return(
            <React.Fragment>
            <div className="driverProfileComments_panel d-flex">
                <div className="placesPanel_sortText ">{textInfo.placesPanel.placesPanelSortText+':'}</div>
                {this.props.placesState.sortMenuVariants.map((element, index)=>
                    <button className={"driverProfileComments_panel_element "+buttonStyles[index]} onClick={()=>this.props.dispatch(setSortMenuValue(element))}>{textInfo.placesPanel.sortMenuVariantsText[index]}</button>
                )}
                
                <div className="properties_rightBlock ">
                    <div className="properties_buttonStyle properties_rightButton d-flex" onClick={() =>{} /*this.props.dispatch(setPagesVisible(!this.props.storeState.pagesMenu))*/}>
                        <div className="properties_rightButton_characteristic">{this.props.placesState.pagesMenuValue+' / '+textInfo.placesPanel.pagesMenuValueText}</div>
                        <div className="properties_arrow"></div>
                        <PagesMenu pagesMenuVariants={this.props.placesState.pagesMenuVariants} isVisible={this.props.storeState.pagesMenu} setPages={setPagesMenuValue}/>
                    </div>
                </div>
            </div>         
          </React.Fragment>
        ) 
    }
}
const HomeRoutesPanel = connect(
    (state) => ({
      storeState: state.AppReduser,
      placesState: state.PlacesReduser
    }),
  )(HomeRoutesPanelClass);
  
  export default HomeRoutesPanel;