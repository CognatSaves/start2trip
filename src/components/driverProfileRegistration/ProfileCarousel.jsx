import React from 'react';


const PhotoSelect = (props) => {

    let { width, height, src, selectPhoto, photoIndex, carouselSize } = props;
    return (
        <div className={"placesDescription_photos_secondaryPhotoBox"} style={{ width: width, height: height }} onClick={() => { selectPhoto(photoIndex, carouselSize) }}>
            <img src={src} width={width} height={height} alt={"/picture " + photoIndex} />
        </div>
    )
}
export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoSlice: 0,
            selectedPhotoIndex: 0,
            stepType: 0// 0 - вверх, 1 - вниз
        }
        this.selectPhoto = this.selectPhoto.bind(this);
    }
    selectPhoto(photoIndex, size) {
        function calculatePhotoSlice(photoIndex, length, OldPhotoIndex, OldPhotoSlice, size) {
            let photoSlice = 0;
            if (OldPhotoIndex === length - 1 && OldPhotoIndex - photoIndex === 1) {
                return OldPhotoSlice;
            }

            if (OldPhotoIndex < photoIndex) {
                photoSlice = OldPhotoSlice + 1;
            }
            else {
                photoSlice = OldPhotoSlice - 1;
            }
            if (length <= size) {
                return 0;
            }
            else {
                while (photoSlice < 0) {
                    photoSlice++;
                }
                while (length - photoSlice < size) {
                    photoSlice--;
                }

                return photoSlice;
            }
        }

        let photoSlice = calculatePhotoSlice(photoIndex, this.props.photoArray.length, this.state.selectedPhotoIndex, this.state.photoSlice, size);
        this.setState({
            selectedPhotoIndex: photoIndex,
            photoSlice: photoSlice,
            stepType: this.state.selectedPhotoIndex - photoIndex > 0 ? 0 : 1
        })
    }
    render() {
        let XTransformValue = 0;
        let YTransformValue = 0;
        let boxXTransformValue = 0;/*this.props.selectedPhotoIndex*this.props.width;*/
        let boxYTransformValue = 0;
        let carouselWidth = 0;
        let carouselHeight = 0;
        let carouselSize = 0;


        switch (this.props.type) {
            case "vertical": {
                YTransformValue = -1 * this.state.photoSlice * this.props.heightCarouselEl;
                boxYTransformValue = this.state.selectedPhotoIndex * this.props.heightCarouselEl;
                carouselWidth = this.props.widthCarouselEl;
                carouselHeight = this.props.heightCarouselEl * this.props.photoArray.length;
                carouselSize = Math.ceil(this.props.height / this.props.heightCarouselEl);
                if (this.state.stepType === 1) {
                    let step = this.props.height - carouselSize * this.props.heightCarouselEl;
                    YTransformValue = YTransformValue + step;
                }
                return (
                    <div className="d-flex" id="tourDescriptionId2">
                        <div className="activePhotoCarousel" style={{ width: this.props.width + "px", height: this.props.height + "px" }}>
                            <img key={this.state.selectedPhotoIndex + "/change"} src={this.props.photoArray[this.state.selectedPhotoIndex]} width="100%" height="100%" alt="/Selected" />
                        </div>
                        <div className="" style={{ overflow: "hidden", height: this.props.height + "px" }} >
                            <div className="d-flex flex-column photoCarouselClass" style={{ width: carouselWidth, height: carouselHeight, transform: "translate3d(" + XTransformValue + "px," + YTransformValue + "px, 0px)" }}>
                                {
                                    this.props.photoArray.map((element, index) =>
                                        <PhotoSelect src={element} width={this.props.widthCarouselEl + "px"} height={this.props.heightCarouselEl + "px"} selectPhoto={this.selectPhoto} photoIndex={index}
                                            selectedPhotoIndex={this.state.selectedPhotoIndex} carouselSize={carouselSize} />
                                    )
                                }
                                <div className="carouselPhotoBox" style={{ width: this.props.widthCarouselEl + "px", height: this.props.heightCarouselEl + "px", transform: "translate3d(" + boxXTransformValue + "px," + boxYTransformValue + "px, 0px)" }} />
                            </div>
                        </div>
                    </div>
                )
            }
            default: {
                XTransformValue = -1 * this.state.photoSlice * this.props.widthCarouselEl;
                boxXTransformValue = this.state.selectedPhotoIndex * this.props.widthCarouselEl;
                carouselWidth = this.props.widthCarouselEl * this.props.photoArray.length;
                carouselHeight = this.props.heightCarouselEl;
                carouselSize = Math.ceil(this.props.width / this.props.widthCarouselEl);
                if (this.state.stepType === 1) {
                    let step = this.props.width - carouselSize * this.props.widthCarouselEl;
                    XTransformValue = XTransformValue + step;
                }
                return (
                    <div className="d-flex flex-column" id="tourDescriptionId2">
                        <div className="activePhotoCarousel" style={{ width: this.props.width + "px", height: this.props.height + "px" }}>
                            <img key={this.state.selectedPhotoIndex + "/change"} src={this.props.photoArray[this.state.selectedPhotoIndex]} width="100%" height="100%" alt="/Selected" />
                        </div>
                        <div className="" style={{ overflow: "hidden", width: this.props.width + "px" }} >
                            <div className="d-flex photoCarouselClass" style={{ width: carouselWidth, height: carouselHeight, transform: "translate3d(" + XTransformValue + "px," + YTransformValue + "px, 0px)" }}>
                                {
                                    this.props.photoArray.map((element, index) =>
                                        <PhotoSelect src={element} width={this.props.widthCarouselEl + "px"} height={this.props.heightCarouselEl + "px"} selectPhoto={this.selectPhoto} photoIndex={index}
                                            selectedPhotoIndex={this.state.selectedPhotoIndex} carouselSize={carouselSize} />
                                    )
                                }
                                <div className="carouselPhotoBox" style={{ width: this.props.widthCarouselEl + "px", height: this.props.heightCarouselEl + "px", transform: "translate3d(" + boxXTransformValue + "px," + boxYTransformValue + "px, 0px)" }} />
                            </div>
                        </div>
                    </div>
                )
            }

        }

    }
}