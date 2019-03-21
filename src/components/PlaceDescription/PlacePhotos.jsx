import React from 'react';



const PhotoSelect = (props) => {
    let {width, height, src, selectPhoto, photoIndex} = props;
    return (
        <div className={"placesDescription_photos_secondaryPhotoBox"} style={{margin: "0 auto", width: width, height: height}} onClick={()=>{selectPhoto(photoIndex)}}>
            <img src={src} width={width} height={height} alt="/"/>
        </div>
    )
}

export default class PlacePhotos extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
    let photoArray = this.props.photoArray;
    let selectPhoto = this.props.selectPhoto;
    let selectedPhotoIndex = this.props.selectedPhotoIndex;
    let width = this.props.width;
    let height = this.props.height;
    let photoSlice=this.props.photoSlice;

    let transformValue = -1 * photoSlice * width;
    let boxTransformValue = selectedPhotoIndex * width;
    let carouselWidth = photoArray.length * width + "px";

    return (
        <div className="placeDescription_block d-flex flex-column" id="placeDescriptionId2">
            <div className="placeDescription_fragmentName">Фотографии</div>
            <div className="placesDescription_photos_firstPhotoBox">
                <img key={selectedPhotoIndex + "/change"} src={photoArray[selectedPhotoIndex]} width="870px" height="500px" alt="/" />
            </div>
            <div className="" style={{ overflow: "hidden" }} >
                <div className="d-flex photoCarouselClass" style={{ width: carouselWidth, transform: "translate3d(" + transformValue + "px, 0px, 0px)" }}>
                    {
                        photoArray.map((element, index) =>
                            <PhotoSelect src={element} width={width + "px"} height={height + "px"} selectPhoto={selectPhoto} photoIndex={index} selectedPhotoIndex={selectedPhotoIndex} />
                        )
                    }
                    <div class="carouselPhotoBox" style={{ width: width + "px", height: height + "px", transform: "translate3d(" + boxTransformValue + "px, 0px, 0px)" }} />
                </div>
            </div>
        </div>
    )
    }
}