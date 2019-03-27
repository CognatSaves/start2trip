import React from 'react';
import Carousel from '../driverProfile/Carousel';

export default class PlacePhotos extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        return (
            <div className="placeDescription_block d-flex flex-column" id="placeDescriptionId2">
                <Carousel photoArray={this.props.photoArray} width={this.props.width} height={this.props.height}
                    widthCarouselEl={this.props.width/this.props.number}
                    heightCarouselEl={this.props.height/this.props.number} type={"horisontal"}
                />
            </div>
        )
    }
}