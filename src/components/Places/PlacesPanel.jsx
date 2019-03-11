import React from 'react';
import './PlacesPanel.css';
import { connect } from 'react-redux';
import {  setPagesVisible  } from '../../redusers/Action';
import PagesMenu from '../drivers/DriversBody/DriversProperties/components/PagesMenu/PagesMenu';

class PlacesPanelClass extends React.Component {
    render(){
        return(
            <React.Fragment>
            <div className="driverProfileComments_panel">
                <div className="placesPanel_sortText ">Сортировать по:</div>
                <button className="driverProfileComments_panel_element driverProfileComments_panel_selectedElement ">Популярности</button>
                <button className="driverProfileComments_panel_element ">Отзывам</button>
                <button className="driverProfileComments_panel_element ">Названию</button>
                <div className="properties_rightBlock ">
                    <div className="properties_buttonStyle properties_rightButton" onClick={() => this.props.dispatch(setPagesVisible(!this.props.storeState.pagesMenu))}>
                        <div className="properties_rightButton_characteristic">{this.props.storeState.pagesMenuValue} / страниц</div>
                        <div className="properties_arrow"></div>
                        <PagesMenu isVisible={this.props.storeState.pagesMenu} />
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