import React from 'react';
import './PlacesList.css';
import { connect } from 'react-redux';
import ippodrom from './pictures/ippodrom.jpg';
import Stars from '../stars/Stars';
import geoIcon from '../home/HomeBody/pictures/geo_icon.svg';
import bookmarkEmpty from './pictures/bookmark_contour.svg';
import bookmarkFilled from './pictures/bookmark_blue.svg';
import bookmarkSelected from './pictures/bookmark_orange.svg';
import { Link } from 'react-router-dom';

class PlacesListClass extends React.Component {
    constructor(props){
        super(props);
        this.placesSort=this.placesSort.bind(this);
    }
    placesSort(array,type){
        function sortRating(a,b){//1
            if(a.rating>b.rating) return -1;
            if(a.rating<b.rating) return 1;
        }
        function sortComments(a,b){//2
            if(a.comments>b.comments) return -1;
            if(a.comments<b.comments) return 1;
        }
        function sortName(a,b){//3
            if(a.name>b.name) return 1;
            if(a.name<b.name) return -1;
        }
        
        switch (type){
            case 0:
                return array.sort(sortRating);
            case 1:
                return array.sort(sortComments);
            case 2:
                return array.sort(sortName);

            default: return array;
        }
    }
    render(){
        let sortedArray = this.placesSort([...this.props.placesState.places[0].places], this.props.placesState.sortMenuValue);
        let selectedPlaces = sortedArray.slice((this.props.placesState.page-this.props.placesState.showPages)*this.props.placesState.pagesMenuValue,
        this.props.placesState.page*this.props.placesState.pagesMenuValue);

        let srcArray = Array(selectedPlaces.length).fill(bookmarkEmpty);

        srcArray[0]=bookmarkSelected;
        srcArray[1]=bookmarkFilled;

        return(
            <React.Fragment>
            <div className="drivers_block">
                {selectedPlaces.map((element,index)=>

                <div className={"drivers_block_element d-flex p-0"} id={index}>
                   <div className="placesList_picture">
                        <img src={ippodrom} width="100%" height="100%" style={{borderRadius: "5px"}} alt=""></img>
                   </div>
                   <div className="placesList_info">
                       <div className="placesList_info_row">
                            <div className="d-flex flex-column" style={{marginRight: "auto"}}>
                                <Link to={`/place/${0},${element.id}`} className="placesList_placeName">
                                    {element.name}
                                </Link>
                                <div>
                                    <Stars key={index+"/"+element.rating} value={element.rating} commentNumber={element.comments+" отзывов"} valueDisplay="block" commentNumberDisplay="block"/>
                                </div>
                            </div>
                            <div className="d-flex placesList_placeCard" >
                                <img src={srcArray[index]} width="100%" height="100%" alt="bookmark"/>
                            </div>
                       </div>
                       <div className="placesList_info_row placesList_info_style" style={{margin: "20px 0 auto 0"}}>
                        {element.info}    
                       </div>
                       <div className="placesList_info_row" style={{marginTop: "auto"}}>
                            <div className="d-flex placesList_info_position" style={{marginRight: "auto"}}>
                                <img src={geoIcon} height="17px" width="17px" alt="geoIcon"/>
                                <text className="placesList_info_position_textStyle">{element.position}</text>
                            </div>
                            <Link to={`/place/${0},${element.id}`} className="placesList_readMoreButton">
                                Подробнее
                            </Link>
                       </div>
                   </div>
                </div>

                )}
            </div> 
            </React.Fragment>
        )
    }
}
const PlacesList = connect(
    (state) => ({
        storeState: state.AppReduser, 
        placesState: state.PlacesReduser,
    }),
  )(PlacesListClass);
  
export default PlacesList;