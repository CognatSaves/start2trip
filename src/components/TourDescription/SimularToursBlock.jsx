import React from 'react';
import RenderFourEl from '../home/HomeBody/RenderFourEl.jsx';

export default class SimularToursBlock extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps){ 
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        console.log("SimularTours render");
        let  tours  = this.props.tours;
        return (
        <div className="placeDescription_block d-flex flex-column" id="tourDescriptionId4">
            <div className="placeDescription_fragmentName">Похожие туры</div>
            <div className="render_otherPlaces" style={{ marginTop: "15px" }}>
                <RenderFourEl tours={tours}/>
            </div>
        </div>
        )
    }
}