import React from 'react';
import './PlacesList.css';
import { connect } from 'react-redux';
// import ippodrom from './pictures/ippodrom.jpg';
// import Stars from '../stars/Stars';
// import geoIcon from '../home/HomeBody/pictures/geo_icon.svg';
// import bookmarkEmpty from './pictures/bookmark_contour.svg';
// import bookmarkFilled from './pictures/bookmark_blue.svg';
// import bookmarkSelected from './pictures/bookmark_orange.svg';
// import { Link } from 'react-router-dom';
// import tagBlue from './pictures/tag_blue.svg';
import PlaceListElement from './PlaceListElement';
import requests from '../../config';


class PlacesListClass extends React.Component {
    constructor(props){
        super(props);
        this.state={}
    }
    placesSort=(array,type)=>{
        
        // function sortRating(a,b){//1
        //     if(a.rating>b.rating) return -1;
        //     if(a.rating<b.rating) return 1;
        // }
        // function sortComments(a,b){//2
        //     if(a.comments>b.comments) return -1;
        //     if(a.comments<b.comments) return 1;
        // }
        // function sortName(a,b){//3
        //     if(a.name>b.placelocalization.name) return 1;
        //     if(a.name<b.placelocalization.name) return -1;
        // }
        
        switch (type){
            case 0:
                return array.sort((a, b) => { return a.rating > b.rating ? -1 : 1 });
            case 1:
                return array.sort((a, b) => { return a.comments > b.comments ? -1 : 1 });
            case 2:
                return array.sort((a, b) => { return a.placelocalization.name < b.placelocalization.name ? -1 : 1 });

            default: return array;
        }
        
    }
    
    render(){
        function tagFilterFunction(placesList, selectedTags){
            let res = [];
            if(selectedTags.length===0){
                return placesList;
            }
            for(let i=0; i<placesList.length; i++){
                for(let k=0; k<selectedTags.length; k++){
                    if(placesList[i].tagsArray.indexOf(selectedTags[k])!==-1){
                        res.push(placesList[i]);
                        break;
                    }
                }
            }
            return res;
        }
        function findTagName(tagId, that){
            
            if(that.props.placesState.tags.length>0){
                
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

                return tags[id].tagLoc.name;
            }
            return '';
        }
        console.log('PlacesList render');
        console.log(this.props);
        let tagFilteredArray =tagFilterFunction([...this.props.placesState.placesList], this.props.placesState.selectedTags);
        console.log('tagFilteredArray',tagFilteredArray);
        let sortedArray;
        // 
        // if(tagFilteredArray.length !== 0){
            
            sortedArray = this.placesSort(/*[...this.props.placesState.placesList]*/tagFilteredArray, this.props.placesState.sortMenuValue);
        // }
        
        let selectedPlaces = sortedArray.slice((this.props.placesState.page-this.props.placesState.showPages)*this.props.placesState.pagesMenuValue,
        this.props.placesState.page*this.props.placesState.pagesMenuValue);

        console.log('selectedPlaces',selectedPlaces);
        return(
            
            <React.Fragment>
            <div className="drivers_block d-flex flex-wrap">
                {selectedPlaces.map((element,index)=>
                <React.Fragment>
                    <PlaceListElement element={element} index={index} findTagName={(tag)=>findTagName(tag,this)}
                        
                    />
                </React.Fragment>
                )}
                {
                    selectedPlaces.length===0 ?
                    <React.Fragment>
                        <div className="placesList_noElementsBlock">
                            <span>Мы искали даже на Марсе, но ничего не найдено. Попробуйте изменить условия поиска.</span>
                        </div>
                    </React.Fragment>
                    :<React.Fragment/>
                }
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