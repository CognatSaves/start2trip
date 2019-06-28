import React from 'react';
import requests from '../../config';
import Carousel, { Modal, ModalGateway } from 'react-images';
import './PlacePhotoShow.css';
const images = [
    { 
        src: 'https://images.unsplash.com/photo-1542359562-ed883d6b2ae5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjIxMTg3fQ'
    },
    { 
        src: 'https://images.unsplash.com/photo-1542608660-4ae68832767a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjIxMTg3fQ'
    }
];
export default class PlacePhotoShow extends React.Component{
    constructor(props){
        super(props);
        
        let imageArray = [];
        for(let i=0; i<this.props.images.length; i++){
            imageArray[i]={src: requests.serverAddress+props.images[i].url};
        }
        this.state={
            imageArray: imageArray
        };
    }
    render(){
        let modalIsOpen  = this.props.isMaskVisible;
        return(
            <React.Fragment>
            {
                /**
            <div style={{position: 'fixed',zIndex: '100', width: '100%',
                height: '100%', backgroundColor: "rgba(0,0,0,0.25)",
                display:this.props.isMaskVisible ? 'block' : 'none'}}
                onClick={()=>this.props.onClickFunc()}>
                    <img src={requests.serverAddress+this.props.images[this.props.clickedImageIndex].url} alt="/" style={{maxWidth: '1000px', maxHeight: '1000px'}}/>
                    {

                    }
            </div> 
                 */
            }
                <ModalGateway>
                    {modalIsOpen ? (
                    <Modal onClose={this.props.onClose}>
                        <Carousel 
                        views={this.state.imageArray}
                        currentIndex={this.props.clickedImageIndex}  />
                    </Modal>
                    ) : null}
                </ModalGateway> 
            </React.Fragment>       
        )
    }
}