import React from 'react';
import requests from '../../config';
import Carousel, { Modal, ModalGateway } from 'react-images';
import './PlacePhotoShow.css';
export default class PlacePhotoShow extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        let imageArray = [];

        for(let i=0; i<this.props.images.length; i++){
            imageArray[i]={src: requests.serverAddressImg+this.props.images[i].url};
        }
        let modalIsOpen  = this.props.isMaskVisible;
        return(
            <React.Fragment>
                <ModalGateway>
                    {modalIsOpen ? (
                    <Modal onClose={this.props.onClose}>
                        <Carousel 
                        views={imageArray}
                        currentIndex={this.props.clickedImageIndex} />
                    </Modal>
                    ) : null}
                </ModalGateway> 
            </React.Fragment>       
        )
    }
}