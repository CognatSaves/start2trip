import React from 'react';
import Carousel from '../driverProfile/Carousel';


const PhotoSelect = (props) => {
    let {width, height, src, selectPhoto, photoIndex} = props;
    return (
        <div className={"placesDescription_photos_secondaryPhotoBox"} style={{margin: "0 auto", width: width, height: height}} onClick={()=>{selectPhoto(photoIndex)}}>
            <img src={src} width={width} height={height} alt="/"/>
        </div>
    )
}
export default class TourPhotos extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        /*console.log("Photos render");
        //let {photoArray, selectPhoto,selectedPhotoIndex, width, height, photoSlice} = props; 
        
        let transformValue=-1*this.props.photoSlice*this.props.width;
        let boxTransformValue = this.props.selectedPhotoIndex*this.props.width;   
        let carouselWidth = this.props.photoArray.length*this.props.width+"px";
    
        return (
            <div className="placeDescription_block d-flex flex-column" id="tourDescriptionId2">          
                <div className="placeDescription_fragmentName">Фотографии</div>
                <div  className="placesDescription_photos_firstPhotoBox">
                    <img key={this.props.selectedPhotoIndex+"/change"} src={this.props.photoArray[this.props.selectedPhotoIndex]} width="870px" height="500px" alt="/"/>
                </div>
                <div className="" style={{overflow: "hidden"}} >
                    <div className="d-flex photoCarouselClass" style={{width: carouselWidth, transform: "translate3d("+transformValue+"px, 0px, 0px)"}}>
                    {
                        this.props.photoArray.map((element,index) =>
                            <PhotoSelect src={element} width={this.props.width+"px"} height={this.props.height+"px"} selectPhoto={this.props.selectPhoto} photoIndex={index} selectedPhotoIndex={this.props.selectedPhotoIndex}/>
                        )
                    }
                    <div class="carouselPhotoBox" style={{width: this.props.width+"px", height: this.props.height+"px", transform: "translate3d("+boxTransformValue+"px, 0px, 0px)"}}/>
                    </div>
                </div>           
            </div>
        )*/
        return(

        )
    }
}