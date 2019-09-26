import React from 'react';
import '../Places/PlacesPanel.css';
import '../drivers/DriversBody/DriversProperties/DriversProperties.css';
import LanguageMenu from '../drivers/DriversBody/DriversProperties/components/LanguageMenu/LanguageMenu.jsx'
import { connect } from 'react-redux';
import { setSortMenuValue } from '../../redusers/ActionGuides';

class GuidesPanelClass extends React.Component {
  render() {
    console.log("GuidesPanel render");
    console.log(this.props)

    let buttonStyles = Array(this.props.guidesState.sortMenuVariants.length).fill("");
    buttonStyles[this.props.guidesState.sortMenuValue] = "driverProfileComments_panel_selectedElement";
    
    let textInfo = this.props.storeState.languageTextMain.places;

    return (
      <div className={"driverProfileComments_panel d-flex"/*this.props.placesState.placesList.length > 0 ? "driverProfileComments_panel d-flex" : 'd-none'*/}
       style={{backgroundColor: 'transparent'}}>
        <div className="placesPanel_sortText d-md-block d-none">{textInfo.placesPanel.placesPanelSortText + ':'}</div>
        <div className="d-flex justify-content-between col-md-2 col-12 p-md-0">
          {this.props.guidesState.sortMenuVariants.map((element, index) =>
            <span className={"driverProfileComments_panel_element " + buttonStyles[index]} onClick={() => 
            this.props.dispatch(setSortMenuValue(element))}>{textInfo.placesPanel.sortMenuVariantsText[index]}</span>
          )}
        </div>
        <div className="d-flex properties_leftBlock" style={{marginLeft: 'auto'}}>
          <div className="properties_buttonStyle properties_leftButton d-flex  align-items-center" >
            <LanguageMenu isVisible={true} />
          </div>
        </div>
      </div>
    )
  }
}
const GuidesPanel = connect(
  (state) => ({
    storeState: state.AppReduser
  }),
)(GuidesPanelClass);

export default GuidesPanel;