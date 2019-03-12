import React from 'react';
import './PlacesList.css';
import { connect } from 'react-redux';
import ippodrom from './pictures/ippodrom.jpg';



class PlacesPanelClass extends React.Component {
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
        console.log("PlacesList render");
        let sortedArray = this.placesSort([...this.props.placesState.places[0].places], this.props.placesState.sortMenuValue);
        console.log("sortedArray");
        console.log(sortedArray);
        let selectedPlaces = sortedArray.slice((this.props.placesState.page-1)*this.props.placesState.pagesMenuValue,
        this.props.placesState.page*this.props.placesState.pagesMenuValue);
        console.log("selectedPlaces");
        console.log(selectedPlaces);

        return(
            <React.Fragment>
            <div className="drivers_block">
                {selectedPlaces.map((element,index)=>

                <div className="placesList_element" id={index}>
                   <div className="placesList_picture">
                        <img src={ippodrom} width="100%" height="100%" alt=""></img>
                   </div>
                   <div className="placesList_info">
                       <div className="placesList_info_row" style={{marginBottom: "auto"}}>
                            <div style={{display: "flex", flexDirection: "column", marginRight: "auto"}}>
                                <div>
                                    {element.name}
                                </div>
                                <div>
                                    stars
                                </div>
                            </div>
                            <div style= {{display: "flex", marginLeft: "auto"}}>
                                place check
                            </div>
                       </div>
                       <div className="placesList_info_row" style={{margin: "auto 0"}}>
                        TextBlock      
                       </div>
                       <div className="placesList_info_row" style={{marginTop: "auto"}}>
                            <div style={{marginRight: "auto"}}>
                                Position
                            </div>
                            <div style={{marginLeft: "auto"}}>
                                Подробнее
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
const PlacesPanel = connect(
    (state) => ({
        storeState: state.AppReduser, 
        placesState: state.PlacesReduser,
    }),
  )(PlacesPanelClass);
  
export default PlacesPanel;