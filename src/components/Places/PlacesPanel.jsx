import React from 'react';
import './PlacesPanel.css';


export default class PlacesPanel extends React.Component {
    render(){
        return(
            <React.Fragment>
            <div className="driverProfileComments_panel">
                <div className="placesPanel_sortText ">Сортировать по:</div>
                <button className="driverProfileComments_panel_selectedElement ">Популярности</button>
                <button className="driverProfileComments_panel_element ">Отзывам</button>
                <button className="driverProfileComments_panel_element ">Названию</button>
                <div className="properties_rightBlock ">
                    <button className="properties_buttonStyle properties_rightButton placesPanel_buttonStyle">
                        <div className="properties_rightButton_characteristic">10 / страниц</div>
                        <div className="properties_arrow"/>
                    </button>
                </div>
            </div>         
          </React.Fragment>
        )
    }
}