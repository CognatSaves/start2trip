import React from 'react';
import '../../Places/PlacesPanel.css';
import { connect } from 'react-redux';
import { setSortMenuValue } from '../../../redusers/ActionPlaces';

// import {  setPagesVisible  } from  '../../../redusers/Action';
// import PagesMenu from '../../drivers/DriversBody/DriversProperties/components/PagesMenu/PagesMenu';

class HomeRoutesPanelClass extends React.Component {
  render() {
    let buttonStyles = Array(this.props.placesState.sortMenuVariants.length).fill("");
    buttonStyles[this.props.placesState.sortMenuValue] = "driverProfileComments_panel_selectedElement";
    let textInfo = this.props.storeState.languageTextMain.places;
    return (
      <>
        <div className={this.props.placesState.routesList.length > 0 ? "driverProfileComments_panel d-flex" : 'd-none'}>
          <div className="placesPanel_sortText d-md-block d-none">{textInfo.placesPanel.placesPanelSortText + ':'}</div>
          <div className="d-flex justify-content-between col-md-3 col-12 p-md-0">
            {this.props.placesState.sortMenuVariants.map((element, index) =>
              <span className={"driverProfileComments_panel_element " + buttonStyles[index]} onClick={() => this.props.dispatch(setSortMenuValue(element))}>{textInfo.placesPanel.sortMenuVariantsText[index]}</span>
            )}
          </div>
        </div>
      </>
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