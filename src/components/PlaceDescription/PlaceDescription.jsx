import React from 'react';
import './PlaceDescription.css';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import PlaceInfo from './PlaceInfo.jsx';
import PlacePanel from './PlacePanel.jsx';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import RenderFourEl from '../home/HomeBody/RenderFourEl.jsx';
import CreateComment from '../driverProfile/CreateComment';
import ShowComments from '../driverProfile/ShowComments';
import Manipulator from '../manipulator/Manipulator';

import { connect } from 'react-redux';
import ippodrom from './pictures/ippodrom.jpg';
import tag from './pictures/tag_gray.svg';
import Stars from '../stars/Stars';
import bookmarkEmpty from '../Places/pictures/bookmark_contour.svg';
import bookmarkFilled from '../Places/pictures/bookmark_blue.svg';
import bookmarkSelected from '../Places/pictures/bookmark_orange.svg';
import geoIcon from './pictures/geo_icon.svg';
import calendar from './pictures/calendar.svg';
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
                    <div className="d-flex placeDescription_description_placeCard" >
                        <img src={bookmarkEmpty} width="100%" height="100%" alt="bookmark"/>
                    </div>
                </div>
            </div>
            <div className="d-flex">
            <Stars value={place.rating} commentNumber={place.comments+" отзывов"} valueDisplay="block" commentNumberDisplay="block"/>         
            </div>
            <div className="d-flex" style={{ margin: "10px 5px 20px 0px"}}>
                <div className="placeDescription_description_tagCard">
                    <img src={tag} className="placeDescription_description_tagCard" style={{position: "absolute"}} alt="tag"/>
                </div>
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
    let {width, height} = props;
    return (
        <div className="placesDescription_photos_secondaryPhotoBox" style={{margin: "0 auto", width: width, height: height}}>
            <img src={ippodrom} width={width} height={height} alt="/"/>
        </div>
    )
}
const Photos = (props) => {
    let widthAll = 870;
    let heightAll = 500;
    let n = 7;
    let array = Array(n).fill("");
    let width = widthAll/n+"px";
    let height = heightAll/n+"px";     
    return (
        <div className="placeDescription_block d-flex flex-column">
            <div className="placeDescription_fragmentName">Фотографии</div>
            <div className="placesDescription_photos_firstPhotoBox">
                <img src={ippodrom} width="870px" height="500px" alt="/"/>
            </div>
            <div className="d-flex">
            {
                array.map((element,index)=>
                    <PhotoSelect width={width} height={height} />
                )
            }
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
                        <div style={{width:"25px", height: "30px", backgroundColor: "red", margin: "auto 10px auto 0"}}/>
                        <div>Ваше местоположение</div>
                    </div>
                    <div className="placesDescription_travelBlock_element d-flex" style={{marginLeft: "auto"}}>
                        <img src={geoIcon} width="25px" height="30px" alt="/" style={{margin: "auto 10px auto 0"}}/>
                        {place.name}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="placesDescription_travelBlock_element d-flex" style={{marginRight: "auto"}}>
                        <img src={calendar} width="25px" height="30px" alt="/" style={{margin: "auto 10px auto 0"}}/>
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
    let {selectedComments, userName} = props;
    return(
        <div className="placeDescription_block d-flex flex-column">
            <div className="placeDescription_fragmentName">Отзывы</div>
            <div className="render_otherPlaces" style={{marginTop: "15px"}}>
                <CreateComment userName={userName} createCommentString={"Оцените данное место"}/>
                <ShowComments selectedComments={selectedComments}/>
            </div>
            <Manipulator/>
        </div>
    )
}
class PlaceDescriptionClass extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            userName: "Заинтересованный посетитель",
            popularPlaces: [
              { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "32 отзыва", prise: "120$" },
              { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "12 отзывов", prise: "80$" },
              { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "55 отзыва", prise: "150$" },
             ]
          };
    }
    render(){
        let countryId = this.props.match.params.country;
        let placeId=this.props.match.params.id;
        //console.log(this.props.placesState.places[countryId]);
        let country = this.props.placesState.places[countryId].country;

        let comments = [...this.props.commentState.comments].reverse();
        let selectedComments = comments.slice((/*this.props.page-this.props.showPages*/0) * 5, (/*this.props.page*/1) * 5);
        
        let place = this.props.placesState.places[countryId].places[placeId];
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
                            <Photos/>
                            <TravelBlock place={place}/>
                            <MapBlock/>
                            <CanBeIntrestingBlock tours={this.state.popularPlaces}/>
                            <CommentBlock selectedComments={selectedComments} userName={this.state.userName}/>
                        </div>
                        <div className="right_body_part col-3">
                        <DriversCommercial/>
                        </div>
                    </div>
                    
                    </div>
                </div>
                <Footer/> 
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