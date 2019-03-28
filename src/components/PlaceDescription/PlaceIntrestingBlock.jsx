import React from 'react';
import RenderFourEl from '../home/HomeBody/RenderFourEl.jsx';

export default class PlaceIntrestingBlock extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        let  tours  = this.props.tours;
        return (
            <div className="placeDescription_block d-flex flex-column" id="placeDescriptionId5">
                <div className="placeDescription_fragmentName">Вас может заинтересовать</div>
                <div className="render_otherPlaces" style={{ marginTop: "15px" }}>
                    <RenderFourEl tours={tours} priseDisplay={"none"} />
                </div>
            </div>
        )
    }

}