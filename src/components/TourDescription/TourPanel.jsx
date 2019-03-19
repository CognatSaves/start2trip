import React from 'react';
import '../Places/PlacesPanel.css';
import { connect } from 'react-redux';

export default class TourPanel extends React.Component{
    render(){
        let variantsArray = ["Программа тура","Фотографии","Карта тура","Похожие туры","Отзывы"];
        return(
            <React.Fragment>
            <div className="driverProfileComments_panel d-flex">
                {
                    variantsArray.map((element,index) => 
                        <button className={"driverProfileComments_panel_element"}>{element}</button>
                    )
                }

            </div>
            </React.Fragment>
        )
    }
}
