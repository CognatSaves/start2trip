import React from 'react';
import '../Places/PlacesPanel.css';
import '../TourDescription/TourDescription.jsx';
import { connect } from 'react-redux';

import {changePlacesFixedClass} from '../../redusers/ActionPlaces';
class PlacePanelClass extends React.Component {
    constructor(props){
      super(props);
      this.setPanelFixed=this.setPanelFixed.bind(this);
      this.removePanelFixed=this.removePanelFixed.bind(this);
      
      window.onscroll = (e)=>this.setPanelFixed(e);
    }
    componentWillUnmount(){
        window.onscroll=null;
    }
    removePanelFixed(){
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      let headerHeight = document.getElementById("placeDescriptionId").scrollHeight;
      if(headerHeight>scrolled){
          this.props.dispatch(changePlacesFixedClass(""));
          window.onscroll = null;
          window.onscroll = (e)=>this.setPanelFixed(e);
        }
    }
    setPanelFixed(){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        let headerHeight = document.getElementById("placeDescriptionId").scrollHeight;
        if(headerHeight<scrolled){
            this.props.dispatch(changePlacesFixedClass("tourPanelFixed"));
            window.onscroll = null;
            window.onscroll = (e)=>this.removePanelFixed(e);
        }
    }
    shouldComponentUpdate(nextProps){ 
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){

        let variantsArray = ["Описание","Фотографии","Как добраться","Карта","Вас может заинтересовать","Отзывы"];
       
        return(
          <React.Fragment>
          <div className={"driverProfileComments_panel d-flex "+this.props.placesState.placePanelFixedClass}>
              {
                  variantsArray.map((element,index) => 
                      <a className={"driverProfileComments_panel_element tourPanel_element"} href={"#placeDescriptionId"+(index+1)}>{element}</a>
                  )
              }
          </div>
          </React.Fragment>
        )
    }
}
const PlacePanel = connect(
    (state) => ({
      placesState: state.PlacesReduser
    }),
  )(PlacePanelClass);
  
  export default PlacePanel;