import React from 'react';
import '../../Places/PlacesList.css';
import { connect } from 'react-redux';

import RouteListElement from './RouteListElement';


class HomeRoutesListClass extends React.Component{
    // constructor(props){
    //     super(props);

    // }
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
        //     if(a.name>b.name) return 1;
        //     if(a.name<b.name) return -1;
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
        console.log('PlacesList render');
        console.log(this.props);
        
        if(this.props.placesState.routesList.length>0){
            
        }
        let tagFilteredArray =[...this.props.placesState.routesList];//no tag filtering bcs no tags
        console.log('tagFilteredArray',tagFilteredArray);

        let sortedArray = this.placesSort(tagFilteredArray, this.props.placesState.sortMenuValue);
         
        let selectedRoutes = sortedArray.slice((this.props.placesState.page-this.props.placesState.showPages)*this.props.placesState.pagesMenuValue,
        this.props.placesState.page*this.props.placesState.pagesMenuValue);

        console.log('selectedRoutes',selectedRoutes);
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.homeRoutesList;
        return(
            
            <React.Fragment>
            <div className="drivers_block d-flex flex-wrap">
                {selectedRoutes.map((element,index)=>
                <React.Fragment>
                    <RouteListElement element={element} index={index} /*findTagName={(tag)=>findTagName(tag,this)}*//>
                </React.Fragment>
                )}
                {
                    selectedRoutes.length===0 ?
                    <React.Fragment>
                        <div className="placesList_noElementsBlock">
                            <span>{textInfo.noElementsText}</span>
                        </div>
                    </React.Fragment>
                    :<React.Fragment/>
                }
            </div> 
            </React.Fragment>
            
        )
    }
}
const HomeRoutesList = connect(
    (state) => ({
        storeState: state.AppReduser, 
        placesState: state.PlacesReduser,
        globalReduser: state.GlobalReduser
    }),
  )(HomeRoutesListClass);
  
export default HomeRoutesList;