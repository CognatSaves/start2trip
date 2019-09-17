import React from 'react';
import '../Places/PlacesList.css';
import { connect } from 'react-redux';
import { setPage, setMorePagesShow } from '../../redusers/ActionPlaces';

import ToursListElement from './ToursListElement';
import Manipulator from '../manipulator/Manipulator';

// import requests from '../../config';

class ToursListClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    placesSort = (array, type) => {

        switch (type) {
            case 0:
                return array.sort((a, b) => { return a.rating > b.rating ? -1 : 1 });
            case 1:
                return array.sort((a, b) => { return a.comments > b.comments ? -1 : 1 });
            case 2:
                return array.sort((a, b) => { return a.placelocalization.name < b.placelocalization.name ? -1 : 1 });

            default: return array;
        }

    }
    showMorePages = () => {
        this.props.dispatch(setMorePagesShow());
    }
    setPageFunc = (page) => {
        if (page !== "...") {
            this.props.dispatch(setPage(page));
        }
    }
    sortArrayByDate=(element,departureDate)=>{
         let calendary = element.calendary;
         let isGood = false;
         let daily = element.daily;
         if(!daily){
            if(calendary.length >0){
                let today = this.props.departureDate === null? new Date() : new Date(this.props.departureDate)
                let day = today.getDate();
                let mounth = today.getMonth();
                let year = today.getFullYear();
                for(let i=0; i < calendary.length; i++){
                    let calendaryDate = new Date(calendary[i])
                    let calendaryDay = calendaryDate.getDate();
                    let calendaryMounth = calendaryDate.getMonth();
                    let calendaryYear = calendaryDate.getFullYear();
                    if(year<=calendaryYear&&mounth<=calendaryMounth&&day<=calendaryDay){
                        if(departureDate === null){
                            departureDate = calendaryDate;
                        }else if(departureDate.getDate()>=calendaryDay&&departureDate.getMonth()>=calendaryMounth){
                            departureDate = calendaryDate;
                        }
                    }
                }
            }
        }
        
        let date = departureDate
        if(departureDate !== null&& !daily){
        departureDate = departureDate.getDate()+"."+((departureDate.getMonth()+1)<10?"0"+(departureDate.getMonth()+1):(departureDate.getMonth()+1))+"."+departureDate.getFullYear();
        isGood = true;
        }else if(daily){
            let today = this.props.departureDate === null? new Date() : new Date(this.props.departureDate);
            departureDate = today.getDate()+"."+((today.getMonth()+1)<10?"0"+(today.getMonth()+1):(today.getMonth()+1))+"."+today.getFullYear();
            isGood = true;
        }
        return({isGood:isGood,departureDate:departureDate,date:date,element:element});
    }

    render() {
        function tagFilterFunction(placesList, selectedTags) {
            let res = [];
            if (selectedTags.length === 0) {
                return placesList;
            }
            for (let i = 0; i < placesList.length; i++) {
                for (let k = 0; k < selectedTags.length; k++) {
                    if (placesList[i].tagsArray.indexOf(selectedTags[k]) !== -1) {
                        res.push(placesList[i]);
                        break;
                    }
                }
            }
            return res;
        }
        function findTagName(tagId, that) {

            if (that.props.toursState.tags.length > 0) {

                let tags = that.props.toursState.tags;
                let id = -1;

                for (let i = 0; i < that.props.toursState.tags.length; i++) {
                    if (that.props.toursState.tags[i].id === tagId) {
                        id = i;
                        break;
                    }
                }
                if (id === -1) {
                    return '';
                }

                return tags[id].tagLoc.name;
            }
            return '';
        }
        console.log('PlacesList render');
        console.log(this.props);
        if (this.props.toursState.toursList.length > 0) {

        }
        let tagFilteredArray = tagFilterFunction([...this.props.toursState.toursList], []/*this.props.toursState.selectedTags*/);
        console.log('tagFilteredArray', tagFilteredArray);
        let sortedArray;
        // 
        // if(tagFilteredArray.length !== 0){

        sortedArray = this.placesSort(/*[...this.props.placesState.placesList]*/tagFilteredArray, this.props.toursState.sortMenuValue);
        // }

        let selectedPlaces = sortedArray.slice((this.props.toursState.page - this.props.toursState.showPages) * this.props.toursState.pagesMenuValue,
            this.props.toursState.page * this.props.toursState.pagesMenuValue);
        let sortSelectedPlacesArray = [];
        selectedPlaces.map((element, index) =>{
            let departureDate = null;
            let result = this.sortArrayByDate(element,departureDate);
            sortSelectedPlacesArray.push(result)
        });
        sortSelectedPlacesArray = sortSelectedPlacesArray.sort((a,b)=>{
            a = new Date(a.date);
            b = new Date(b.date);
            return a<b ? -1 : a>b ? 1 : 0;
        })
        console.log(sortSelectedPlacesArray)

        console.log('selectedPlaces', selectedPlaces);
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.homeRoutesList;
        let pageNotFound = this.props.storeState.languageTextMain.home.pageNotFound;
        let isEmpty = (selectedPlaces.length === 0 && this.props.isStaying);
        let isLoading = (selectedPlaces.length === 0 && !this.props.isStaying);
        return (

            <>
                <div className="drivers_block d-flex flex-wrap">
                    {sortSelectedPlacesArray.map((element, index) =>{
                          if(element.isGood){
                        return(
                        <>
                            <ToursListElement element={element.element} index={index} findTagName={(tag) => findTagName(tag, this)}
                            departureDate={element.departureDate}
                            />
                        </>
                        )}
                    })}
                    {
                        isLoading || isEmpty ?
                            <>
                                {isLoading ?
                                    <div className="placesList_loading">
                                        <span>{'Загружаемся!'}</span>
                                    </div> :
                                    <div className="placesList_noElementsBlock">
                                        <span>{pageNotFound.text1 + " " + pageNotFound.text2}<br />{pageNotFound.text3}</span>
                                    </div>
                                }
                            </>
                            : <React.Fragment />
                    }
                </div>
                <Manipulator number={sortedArray.length} page={this.props.placesState.page} setPage={this.setPageFunc}
                    elementsNumber={this.props.placesState.pagesMenuValue} showMorePages={this.showMorePages}
                />
            </>

        )
    }
}
const ToursList = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser,
        globalReduser: state.GlobalReduser,
        toursState: state.ToursReduser
    }),
)(ToursListClass);

export default ToursList;