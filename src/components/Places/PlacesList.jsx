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
import tagBlue from './pictures/tag_blue.svg';

import requests from '../../config';


class PlacesListClass extends React.Component {
    constructor(props){
        super(props);
        this.placesSort=this.placesSort.bind(this);

        let that = this;
        //debugger;
        /*
        axios.get(requests.getPlacesList+"?country="+this.props.storeState.country+"&lang="+this.props.storeState.languages[this.props.storeState.activeLanguageNumber])
        .then(response => {
            console.log(response);
            return response.data;
        })
        .then(data => {
            if (data.error) {
                console.log("bad");
                throw data.error;
            }
            else {
                console.log('good');
                console.log(data);
            }
        })
        .catch(error => {
            console.log('get wasted answer');
        });
        */
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
        function findTagName(tagId, that){
            
            if(that.props.placesState.tags.length>0){
                //debugger;
                let tags = that.props.placesState.tags;
                let id=-1;

                for(let i=0; i<that.props.placesState.tags.length; i++){
                    if(that.props.placesState.tags[i].id===tagId){
                        id=i;
                        break;
                    }
                }
                if(id===-1){
                    return '';
                }

                for(let i=0; i<tags[id].tagLocs.length; i++){
                    let a = tags[id].tagLocs[i].language;
                    let b = that.props.storeState.languages[that.props.storeState.activeLanguageNumber].id;
                    if(a===b){
                        return tags[id].tagLocs[i].name;
                    }
                }
            }
            return '';
        }
        console.log('PlacesList render');
        console.log(this.props);
        //debugger;
        
        /*
        let sortedArray = this.placesSort([...this.props.placesState.places[0].places], this.props.placesState.sortMenuValue);
        let selectedPlaces = sortedArray.slice((this.props.placesState.page-this.props.placesState.showPages)*this.props.placesState.pagesMenuValue,
        this.props.placesState.page*this.props.placesState.pagesMenuValue);

        let srcArray = Array(selectedPlaces.length).fill(bookmarkEmpty);

        srcArray[0]=bookmarkSelected;
        srcArray[1]=bookmarkFilled;
        */
        let sortedArray = this.placesSort([...this.props.placesState.placesList], this.props.placesState.sortMenuValue);
        let selectedPlaces = sortedArray.slice((this.props.placesState.page-this.props.placesState.showPages)*this.props.placesState.pagesMenuValue,
        this.props.placesState.page*this.props.placesState.pagesMenuValue);

        console.log('selectedPlaces',selectedPlaces);
        return(
            <React.Fragment>
            <div className="drivers_block d-flex flex-wrap">
                {selectedPlaces.map((element,index)=>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3">
                    <div className={"drivers_block_element d-flex p-0 flex-column"} id={index}>                       
                        <div className="driversBlock_carImage" style={{ background: "url(" + (element.image ? (requests.serverAddress+element.image) : '') + ") no-repeat", backgroundSize: "cover", width: '100%' }}>
                            <Link to={`/place/${0},${element.id}`} className="driversBlock_carBlackout">
                                <div className="driversBlock_carBlackout_detailed">Подробнее</div>
                            </Link>
                        </div>
                        <div className="placesList_info d-flex flex-column">
                            <Link to={`/place/${0},${element.id}`} className="placesList_placeName d-flex">
                                <div>
                                    {element.placelocalization.name + (element.id===0 ? (element.placelocalization.name+" | "+element.placelocalization.name+" | "+element.placelocalization.name+" | "+element.placelocalization.name +" | "+element.placelocalization.name +" | "+element.name) : '')}
                                </div>
                            </Link>
                            
                            <div className="placesList_stars">
                                <Stars key={index+"/"+element.rating} value={element.rating} commentNumber={element.comments+" отзывов"} valueDisplay={true} commentNumberDisplay={true}/>
                            </div>
                            <div className="d-flex placesList_info_position placesList_info_position_tags">
                                <img src={tagBlue} height="12px" width="12px" alt="tagBlue"/>
                                <div className="placesList_info_position_textStyle">{element.tagsArray.map((tag, tagIndex)=><text>{ findTagName(tag, this) +(element.tagsArray.length-1>tagIndex ? ",":"")+" "}</text>) }</div>
                            </div>
                            <div className="d-flex placesList_info_position placesList_info_position_loc">
                                <img src={geoIcon} height="14px" width="14px" alt="tagBlue"/>
                                <div className="placesList_info_position_textStyle" style={{color: '#686868'}}>{element.placelocalization.location}</div>
                            </div>
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
        globalReduser: state.GlobalReduser
    }),
  )(PlacesListClass);
  
export default PlacesList;