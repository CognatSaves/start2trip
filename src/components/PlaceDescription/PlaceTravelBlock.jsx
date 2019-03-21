import React from 'react';


export default class PlaceTravelBlock extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        let  place = this.props.place;
        return (
            <div className="placeDescription_block d-flex flex-column" id="placeDescriptionId3">
                <div className="placeDescription_fragmentName">Как добраться</div>
                <div className="d-flex flex-column" style={{ marginTop: "15px" }}>
                    <div className="d-flex">
                        <div className="placesDescription_travelBlock_element d-flex" style={{ marginRight: "auto" }}>
                            <div className="placesDescription_travelBlock_icon placesDescription_position" />
                            <div>Ваше местоположение</div>
                        </div>
                        <div className="placesDescription_travelBlock_element d-flex" style={{ marginLeft: "auto" }}>
                            <div className="placesDescription_travelBlock_icon placesDescription_geoIcon" />
                            {place.name}
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="placesDescription_travelBlock_element d-flex" style={{ marginRight: "auto" }}>
                            <div className="placesDescription_travelBlock_icon placesDescription_calendary" />
                            Дата отправления
                        </div>
                        <div className="placesDescription_travelBlock_element placesDescription_travelBlock_applyButton d-flex" style={{ marginLeft: "auto" }}>
                            <text style={{ margin: "auto" }}>СМОТРЕТЬ ПРЕДЛОЖЕНИЯ</text>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}