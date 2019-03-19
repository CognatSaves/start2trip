import React from 'react';
import Header from '../header/Header';
import TourInfo from './TourInfo.jsx';
import TourPanel from './TourPanel.jsx';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import Stars from '../stars/Stars';
import './TourDescription.css';
import carthage from '../Tours/pictures/Carthage.webp';
import antioch from './pictures/antioch.jpg';
import roma from './pictures/roma.jpg';
import alexandria from './pictures/alexandria.jpg';
import konstantinople from './pictures/konstantinople.jpg';
import geoIcon from './pictures/geo_icon.svg';
import { connect } from 'react-redux';

const Description = (props) => {
    let {tour}=props;
    let lineDisplayArray = Array(tour.places.length).fill("block");
    lineDisplayArray[lineDisplayArray.length-1]="none";
    return(
        <div className="placeDescription_block d-flex flex-column">
            <div className="d-flex">
                <div className="placeDescription_description_name" >
                    {"tour.name"}
                </div>
                <div className="d-flex" style={{marginLeft: "auto"}}>
                    <div className="d-flex placeDescription_description_placeCard"/>
                </div>
            </div>
            <div className="d-flex">
                <Stars value={tour.rating} commentNumber={tour.comments+" отзывов"} valueDisplay="block" commentNumberDisplay="block"/>         
            </div>
            <div className="d-flex" style={{ margin: "10px 5px 20px 0px"}}>
                <div className="placeDescription_description_tagCard"/>                               
                <div className="placeDescription_description_tagElement">иномирье</div>
                <div className="placeDescription_description_tagElement">история</div>
                <div className="placeDescription_description_tagElement">развлечения</div>
            </div>
            <div className="d-flex flex-column placeDescription_description_info">
                {  
                    tour.places.map((element,index)=>
                        <div className="d-flex">
                            <div className="d-flex flex-column tourDescription_markerLine">
                                <div className="tourDescription_markerLine_markerBlock">
                                    <div style={{background: "url("+geoIcon+")", backgroundSize: "17px 24px", width: "17px", height: "24px"}}/>
                                </div>
                                <div className="tourDescription_markerLine_line" style={{ display: lineDisplayArray[index]}}></div>
                            </div> 
                            <div className="tourDescription_placeDescription">
                                <text style={{fontWeight: "600"}}>{element}</text>
                                <text>{" - " +tour.placesInfo[index]}</text>
                            </div>
                        </div>
                        
                    )
                                      
                }
                <div className="d-flex" style={{paddingTop: "10px"}}>
                    <div className = "d-flex flex-column tourDescription_additionalInfoBlock">   
                        <div>В стоимость включено:</div>             
                        {
                            tour.placesInfo[tour.placesInfo.length-2].map((element,index)=>
                                <div className="d-flex tourDescription_additionalInfoBlock_element">
                                    <div className="tourDescription_pointStyle">.</div>
                                    <div>{element}</div>
                                </div>
                            )
                        }
                    </div>
                    <div className = "d-flex flex-column tourDescription_additionalInfoBlock">
                        <div>Дополнительные услуги:</div>             
                            {
                                tour.placesInfo[tour.placesInfo.length-1].map((element,index)=>
                                    <div className="d-flex tourDescription_additionalInfoBlock_element">
                                        <div className="tourDescription_pointStyle">.</div>
                                        <div>{element}</div>
                                    </div>
                                )
                            }

                    </div>
                </div>
            </div>
        </div>
    )
}
const PhotoSelect = (props) => {
    let {width, height, src, selectPhoto, photoIndex} = props;
    return (
        <div className={"placesDescription_photos_secondaryPhotoBox"} style={{margin: "0 auto", width: width, height: height}} onClick={()=>{selectPhoto(photoIndex)}}>
            <img src={src} width={width} height={height} alt="/"/>
        </div>
    )
}
const Photos = (props) => {
    let {photoArray, selectPhoto,selectedPhotoIndex, width, height, photoSlice} = props; 
    
    let transformValue=-1*photoSlice*width;
    let boxTransformValue = selectedPhotoIndex*width;   
    let carouselWidth = photoArray.length*width+"px";

    return (
        <div className="placeDescription_block d-flex flex-column">          
            <div className="placeDescription_fragmentName">Фотографии</div>
            <div  className="placesDescription_photos_firstPhotoBox">
                <img key={selectedPhotoIndex+"/change"} src={photoArray[selectedPhotoIndex]} width="870px" height="500px" alt="/"/>
            </div>
            <div className="" style={{overflow: "hidden"}} >
                <div className="d-flex photoCarouselClass" style={{width: carouselWidth, transform: "translate3d("+transformValue+"px, 0px, 0px)"}}>
                {
                    photoArray.map((element,index) =>
                        <PhotoSelect src={element} width={width+"px"} height={height+"px"} selectPhoto={selectPhoto} photoIndex={index} selectedPhotoIndex={selectedPhotoIndex}/>
                    )
                }
                <div class="carouselPhotoBox" style={{width: width+"px", height: height+"px", transform: "translate3d("+boxTransformValue+"px, 0px, 0px)"}}/>
                </div>
            </div>           
        </div>
    )
}
const MapBlock = (props) => {
    return (
    <div className="placeDescription_block d-flex flex-column">
        <div className="placeDescription_fragmentName">Карта тура</div>
        <div className="placeDescription_fragmentName_mapBlock" style={{marginTop: "15px"}}>
            <div className="placeDescription_fragmentName_mapBlock">
                Здесь может быть ваша карта
            </div>
        </div>
        <div className = "d-flex flex-column mapBlock_tourData col-12">
            <div className="d-flex">
                <div style={{marginRight: "auto"}}>A1</div>
                <div style={{marginLeft: "auto"}}>A2</div>
            </div>
            <div className="d-flex">
                <div style={{marginRight: "auto"}}>B1</div>
                <div style={{marginLeft: "auto"}}>B2</div>
            </div>
            <div className="d-flex">
                <div style={{marginRight: "auto"}}>C1</div>
               
            </div>
        </div>
    </div>
    )
}
class TourDescriptionClass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            photoSlice: 0,
            selectedPhotoIndex: 0,
            photoArray: [carthage, antioch, roma,alexandria, konstantinople,carthage,
            antioch, roma,alexandria, konstantinople,carthage, antioch, roma,
            alexandria, konstantinople,carthage, antioch, roma,alexandria,
            konstantinople],
        }
        this.selectPhoto=this.selectPhoto.bind(this);
    }
    selectPhoto(photoIndex){
        function calculatePhotoSlice(photoIndex, length,OldPhotoIndex, OldPhotoSlice){
            let photoSlice=0;
            if(OldPhotoIndex<photoIndex){
                photoSlice = OldPhotoSlice+1;
            }
            else{
                photoSlice = OldPhotoSlice-1;
            }
            if(length<=7){
                return 0;
            }
            else{
                while(photoSlice<0){
                    photoSlice++;
                }
                while(length-photoSlice<7){
                    photoSlice--;
                }
                return photoSlice;
            }
        }
        let photoSlice = calculatePhotoSlice(photoIndex, this.state.photoArray.length,this.state.selectedPhotoIndex,this.state.photoSlice);
        this.setState({
            selectedPhotoIndex: photoIndex,
            photoSlice: photoSlice
        })       
    }
    render(){
        let countryId = this.props.match.params.country;
        let tourId=this.props.match.params.id;
        let tour = this.props.toursState.tours[countryId].tours[tourId];
        
        let widthAll = 870;
        let heightAll = 500;
        let n = 7;

        let width = widthAll/n;
        let height = heightAll/n;
               
        return(
            <React.Fragment>
                <div className = "drivers_top_background placeDescription_background col-12">
                    <img src={carthage} width="100%" height="100%" style={{position: "absolute"}} alt="noImage"/>
                    <div style={{position: "absolute", width:"100%", height:"100%", backgroundColor: "rgba(0,0,0,0.5)"}}/>
                    <div className="wrapper d-flex flex-column">
                        <Header colorClass="colorClass" colorClass2="colorClass2" backgroundColorClass="backgroundColorClass"
                        borderColorClass="borderColorClass" labelColorClass="labelColorClass" type={1}/>
                        <TourInfo/>
                    </div>
                </div>
                <div className="wrapper d-flex flex-column">
                    <div className = "drivers_bottom_background d-flex flex-column" >
                    <div className="drivers_body d-flex">
                        <div className="left_body_part col-9">
                            <TourPanel/>
                            <Description tour={tour}/>
                            <Photos photoSlice={this.state.photoSlice} photoArray={this.state.photoArray} 
                            selectPhoto={this.selectPhoto} selectedPhotoIndex={this.state.selectedPhotoIndex} 
                            width={width} height={height}/>
                            <MapBlock/>
                        </div>
                        <div className="right_body_part col-3">
                        <DriversCommercial/>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const TourDescription = connect(
    (state) => ({
        toursState: state.ToursReduser,
        commentState: state.CommentReduser
    }),

    )(TourDescriptionClass);

export default TourDescription;