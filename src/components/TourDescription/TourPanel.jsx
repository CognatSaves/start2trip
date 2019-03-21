import React from 'react';
import '../Places/PlacesPanel.css';
import './TourDescription.css';
import { connect } from 'react-redux';

import {changePanelFixedClass} from '../../redusers/ActionTours';

class TourPanelClass extends React.Component{
    constructor(props){
        super(props);

        this.setPanelFixed=this.setPanelFixed.bind(this);
        this.removePanelFixed=this.removePanelFixed.bind(this);
        
        window.onscroll = (e)=>this.setPanelFixed(e);
    }
    shouldComponentUpdate(nextProps){ 
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    removePanelFixed(){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        let headerHeight = document.getElementById("tourDescriptionId").scrollHeight;
        if(headerHeight>scrolled){
            this.props.dispatch(changePanelFixedClass(""));
            window.onscroll = null;
            window.onscroll = (e)=>this.setPanelFixed(e);
        }
    }
    setPanelFixed(){
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        let headerHeight = document.getElementById("tourDescriptionId").scrollHeight;
        if(headerHeight<scrolled){
            this.props.dispatch(changePanelFixedClass("tourPanelFixed"));
            window.onscroll = null;
            window.onscroll = (e)=>this.removePanelFixed(e);
        }
    }
    render(){
        let variantsArray = ["Программа тура","Фотографии","Карта тура","Похожие туры","Отзывы"];
        return(
            <React.Fragment>
            <div className={"driverProfileComments_panel d-flex "+this.props.toursState.tourPanelFixedClass}>
                {
                    variantsArray.map((element,index) => 
                        <button className={"driverProfileComments_panel_element"}><a href={"#tourDescriptionId"+(index+1)}>{element}</a></button>
                    )
                }
            </div>
            </React.Fragment>
        )
    }
}
const TourPanel = connect(
    (state) => ({
        toursState: state.ToursReduser,
    }),

)(TourPanelClass);

export default TourPanel;