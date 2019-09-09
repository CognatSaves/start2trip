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
            debugger;
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
        if(this.props.toursState.toursList.length>0){
            
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



        console.log('selectedPlaces', selectedPlaces);
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.homeRoutesList;
        let pageNotFound = this.props.storeState.languageTextMain.home.pageNotFound;
        let isEmpty = (selectedPlaces.length === 0 && this.props.isStaying);
        let isLoading = (selectedPlaces.length === 0 && !this.props.isStaying);
        return (

            <React.Fragment>
                <div className="drivers_block d-flex flex-wrap">
                    {selectedPlaces.map((element, index) =>
                        <React.Fragment>
                            <ToursListElement element={element} index={index} findTagName={(tag) => findTagName(tag, this)}

                            />
                        </React.Fragment>
                    )}
                    {
                        isLoading || isEmpty ?
                            <React.Fragment>
                                {isLoading ?
                                    <div className="placesList_loading">
                                        <span>{'Загружаемся!'}</span>
                                    </div> :
                                    <div className="placesList_noElementsBlock">
                                        <span>{pageNotFound.text1 + " " + pageNotFound.text2}<br />{pageNotFound.text3}</span>
                                    </div>
                                }
                            </React.Fragment>
                            : <React.Fragment />
                    }
                </div>
                <Manipulator number={sortedArray.length} page={this.props.placesState.page} setPage={this.setPageFunc}
                    elementsNumber={this.props.placesState.pagesMenuValue} showMorePages={this.showMorePages}
                />
            </React.Fragment>

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