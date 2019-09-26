import React from 'react';
import '../Places/PlacesPanel.css';
import '../drivers/DriversBody/DriversProperties/DriversProperties.css';
import LanguageMenu from '../drivers/DriversBody/DriversProperties/components/LanguageMenu/LanguageMenu.jsx'
import { connect } from 'react-redux';
import { setSortMenuValue } from '../../redusers/ActionGuides';

class GuidesPanelClass extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      departurePoints: []
    }
  }
  render() {
    function findSelectedPointByValue(points, value){
      for(let i=0; i<points.length; i++){
        if(points[i].point === value){
          return points[i];
        }
      }
      return {
        point: '',
        lat: '',
        long: ''
      };
    }
    console.log("GuidesPanel render");
    console.log(this.props)

    let buttonStyles = Array(this.props.guidesState.sortMenuVariants.length).fill("");
    buttonStyles[this.props.guidesState.sortMenuValue] = "driverProfileComments_panel_selectedElement";
    
    let textInfo = this.props.storeState.languageTextMain.places;

    if (JSON.stringify(this.props.departurePoints) !== JSON.stringify(this.state.departurePoints)) {

      this.setState({

          departurePoints: this.props.departurePoints,

      })
    }
    return (
      <div className={"driverProfileComments_panel d-flex"/*this.props.placesState.placesList.length > 0 ? "driverProfileComments_panel d-flex" : 'd-none'*/}>
        <div className="placesPanel_sortText d-md-block d-none">{textInfo.placesPanel.placesPanelSortText + ':'}</div>
        <div className="d-flex justify-content-between col-md-2 col-12 p-md-0">
          {this.props.guidesState.sortMenuVariants.map((element, index) =>
            <span className={"driverProfileComments_panel_element " + buttonStyles[index]} onClick={() => 
            this.props.dispatch(setSortMenuValue(element))}>{textInfo.placesPanel.sortMenuVariantsText[index]}</span>
          )}
        </div>
        <div className="d-flex" style={{marginLeft: 'auto'}}>
          {
            false ? 
              <div>
                <input className="searchInputTourInfoContent" onChange={(e) => {let point= findSelectedPointByValue(this.state.departurePoints, e.target.value); this.props.departurePointChange(point)}}
                value={this.props.departurePoint.point} placeholder={/*textInfo.searchPlaceholder*/'placeholder'} list="departurePoints" name="myDeparturePoints" />
                <datalist id="departurePoints">
                    {this.state.departurePoints.map((element, index) =>
                        <option value={element.point} >{element.point}</option>
                    )}
                </datalist>
              </div> : <React.Fragment/>
          }
          
          <div className="properties_leftBlock">
            <div className="properties_buttonStyle properties_leftButton d-flex  align-items-center" >
              <LanguageMenu isVisible={true} />
            </div>
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