import React from 'react';
import './PlaceDescription.css';
import Header from '../header/Header';
import PlaceInfo from './PlaceInfo.jsx';
import PlacePanel from './PlacePanel.jsx';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import RenderFourEl from '../home/HomeBody/RenderFourEl.jsx';
import CreateComment from '../driverProfile/CreateComment';
import ShowComments from '../driverProfile/ShowComments';
import Manipulator from '../manipulator/Manipulator';

import { connect } from 'react-redux';

import ippodrom from './pictures/ippodrom.jpg';
import ippodrom2 from './pictures/ippodrom2.jpg';
import ippodrom3 from './pictures/ippodrom3.jpg';
import ippodrom4 from './pictures/ippodrom4.jpg';

import Stars from '../stars/Stars';
import georgiaImg from '../home/HomeBody/pictures/georgia.png';

const Description = (props) => {
    let {place}=props;
    return(
        <div className="placeDescription_block d-flex flex-column">
            <div className="d-flex">
                <div className="placeDescription_description_name" >
                    {place.name}
                </div>
                <div className="d-flex" style={{marginLeft: "auto"}}>
                    <div className="placeDescription_description_date">
                        da best day'n life
                    </div>
                    <div className="d-flex placeDescription_description_placeCard"/>
                </div>
            </div>
            <div className="d-flex">
                <Stars value={place.rating} commentNumber={place.comments+" отзывов"} valueDisplay="block" commentNumberDisplay="block"/>         
            </div>
            <div className="d-flex" style={{ margin: "10px 5px 20px 0px"}}>
                <div className="placeDescription_description_tagCard"/>                               
                <div className="placeDescription_description_tagElement">иномирье</div>
                <div className="placeDescription_description_tagElement">история</div>
                <div className="placeDescription_description_tagElement">развлечения</div>
            </div>
            <div className="d-flex placeDescription_description_info">
                {place.info}
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
const TravelBlock = (props) => {
    let {place} = props;
    return (
        <div className="placeDescription_block d-flex flex-column">
            <div className="placeDescription_fragmentName">Как добраться</div>
            <div className="d-flex flex-column" style={{marginTop: "15px"}}>
                <div className="d-flex">
                    <div className="placesDescription_travelBlock_element d-flex" style={{marginRight: "auto"}}>
                        <div className="placesDescription_travelBlock_icon placesDescription_position"/>
                        <div>Ваше местоположение</div>
                    </div>
                    <div className="placesDescription_travelBlock_element d-flex" style={{marginLeft: "auto"}}>
                        <div className="placesDescription_travelBlock_icon placesDescription_geoIcon"/>
                        {place.name}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="placesDescription_travelBlock_element d-flex" style={{marginRight: "auto"}}>
                        <div className="placesDescription_travelBlock_icon placesDescription_calendary"/>
                        Дата отправления
                    </div>
                    <div className="placesDescription_travelBlock_element placesDescription_travelBlock_applyButton d-flex" style={{marginLeft: "auto"}}>
                        <text style={{margin: "auto"}}>СМОТРЕТЬ ПРЕДЛОЖЕНИЯ</text>
                    </div>
                </div>
            </div>
        </div>
    )
}
const MapBlock = (props) => {
    return (
    <div className="placeDescription_block d-flex flex-column">
        <div className="placeDescription_fragmentName">Карта</div>
        <div className="placeDescription_fragmentName_mapBlock" style={{marginTop: "15px"}}>
            <div className="placeDescription_fragmentName_mapBlock">
                Здесь может быть ваша карта
            </div>
        </div>
    </div>
    )
}
const CanBeIntrestingBlock = (props) =>{
    let {tours} = props;
    return (
        <div className="placeDescription_block d-flex flex-column">
            <div className="placeDescription_fragmentName">Вас может заинтересовать</div>
            <div className="render_otherPlaces" style={{marginTop: "15px"}}>
                <RenderFourEl tours={tours} priseDisplay={"none"} />
            </div>
        </div>
    )
}
const CommentBlock = (props) => {
    let {comments, userName, page, setPage, showMorePages, showPages} = props;
    let selectedComments = comments.slice((page-showPages) * 5, (page) * 5);
    return(
        <div className="placeDescription_block d-flex flex-column">
            <div className="placeDescription_fragmentName">Отзывы</div>
            <div className="render_otherPlaces" style={{marginTop: "15px"}}>
                <CreateComment userName={userName} createCommentString={"Оцените данное место"}/>
                <ShowComments selectedComments={selectedComments}/>
            </div>
            <Manipulator number ={comments.length} page={page} elementsNumber={5} 
                            setPage={setPage} showMorePages={showMorePages}/>
        </div>
    )
}
class PlaceDescriptionClass extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            userName: "Заинтересованный посетитель",
            page: 1,
            showPages:1,
            popularPlaces: [
              { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "32 отзыва", prise: "120$" },
              { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "12 отзывов", prise: "80$" },
              { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "55 отзыва", prise: "150$" },
             ],
             selectedPhotoIndex: 0,
             photoSlice: 0,
             photoArray: [ippodrom,ippodrom4,ippodrom2,ippodrom3,ippodrom,ippodrom4,ippodrom2,ippodrom3,ippodrom,ippodrom4,ippodrom2,ippodrom3,ippodrom,ippodrom4,ippodrom2,ippodrom3,ippodrom,ippodrom4,ippodrom2,ippodrom3],
            };
          this.selectPhoto=this.selectPhoto.bind(this);
          this.showMorePages = this.showMorePages.bind(this);    
          this.setPage=this.setPage.bind(this);
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
    showMorePages(){
        this.setState({
            page: this.state.page+1,
            showPages: this.state.showPages+1
        })
    }
    setPage(page) {
        if (page !== "...") {
          this.setState(
            {
              page: page,
              showPages: 1
            }
          )
        }
    }
    render(){

        let countryId = this.props.match.params.country;
        let placeId=this.props.match.params.id;

        let comments = [...this.props.commentState.comments].reverse();
        
        let place = this.props.placesState.places[countryId].places[placeId];

        let widthAll = 870;
        let heightAll = 500;
        let n = 7;

        let width = widthAll/n;
        let height = heightAll/n; 
       
        return(
            <React.Fragment>
                <div className = "drivers_top_background placeDescription_background col-12">
                    <img src={ippodrom} width="100%" height="100%" style={{position: "absolute"}} alt="noImage"/>
                    <div style={{position: "absolute", width:"100%", height:"100%", backgroundColor: "rgba(0,0,0,0.5)"}}/>
                    <div className="wrapper d-flex flex-column">
                        <Header colorClass="colorClass" colorClass2="colorClass2" backgroundColorClass="backgroundColorClass"
                        borderColorClass="borderColorClass" labelColorClass="labelColorClass" type={1}/>
                        <PlaceInfo/>
                    </div>
                </div>
                <div className="wrapper d-flex flex-column">
                    <div className = "drivers_bottom_background d-flex flex-column" >
                    <div className="drivers_body d-flex">
                        <div className="left_body_part col-9">
                            <PlacePanel/>
                            <Description place={place}/>
                            <Photos photoSlice={this.state.photoSlice} photoArray={this.state.photoArray} 
                            selectPhoto={this.selectPhoto} selectedPhotoIndex={this.state.selectedPhotoIndex} 
                            width={width} height={height}/>
                            <TravelBlock place={place}/>
                            <MapBlock/>
                            <CanBeIntrestingBlock tours={this.state.popularPlaces}/>
                            <CommentBlock comments={comments} userName={this.state.userName} page={this.state.page} setPage={this.setPage} 
                            showMorePages={this.showMorePages} showPages={this.state.showPages}/>
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

const PlaceDescription = connect(
    (state) => ({
        placesState: state.PlacesReduser,
        commentState: state.CommentReduser
    }),

    )(PlaceDescriptionClass);

export default PlaceDescription;