import React from 'react';
import Stars from '../stars/Stars';

export default class PlaceProgramm extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        return (
            <div className="placeDescription_block d-flex flex-column" id="placeDescriptionId1">
                <div className="d-flex">
                    <div className="placeDescription_description_name" >
                        {this.props.place.name}
                    </div>
                    <div className="d-flex" style={{ marginLeft: "auto", height: "34px", marginBottom: "auto" }}>
                        <div className="placeDescription_description_date">
                            da best day'n life
                        </div>
                        <div className="d-flex placeDescription_description_placeCard" />
                    </div>
                </div>
                <div className="d-flex">
                    <Stars value={this.props.place.rating} commentNumber={this.props.place.comments + " отзывов"} valueDisplay="block" commentNumberDisplay="block" />
                </div>
                <div className="d-flex" style={{ margin: "10px 5px 20px 0px" }}>
                    <div className="placeDescription_description_tagCard" />
                    <div className="placeDescription_description_tagElement">иномирье</div>
                    <div className="placeDescription_description_tagElement">история</div>
                    <div className="placeDescription_description_tagElement">развлечения</div>
                </div>
                <div className="d-flex placeDescription_description_info">
                    {this.props.place.info}
                </div>
            </div>
        )
    }
}