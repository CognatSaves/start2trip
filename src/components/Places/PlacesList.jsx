import React from 'react';
import './PlacesList.css';
import { connect } from 'react-redux';
import { setPage, setMorePagesShow } from '../../redusers/ActionPlaces';
import {startRefresherGlobal, thenFuncGlobal, 
    catchFuncGlobal,findTagName,placesSort,tagFilterFunction} from '../../redusers/GlobalFunction'

import PlaceListElement from './PlaceListElement';
import Manipulator from '../manipulator/Manipulator';

// import requests from '../../config';

class PlacesListClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
        
        
        // console.log('PlacesList render');
        // console.log(this.props);
        let tagFilteredArray = tagFilterFunction([...this.props.placesState.placesList], this.props.placesState.selectedTags);
        // console.log('tagFilteredArray', tagFilteredArray);
        let sortedArray;
        // 
        // if(tagFilteredArray.length !== 0){

        sortedArray = placesSort(/*[...this.props.placesState.placesList]*/tagFilteredArray, this.props.placesState.sortMenuValue);
        // }

        let selectedPlaces = sortedArray.slice((this.props.placesState.page - this.props.placesState.showPages) * this.props.placesState.pagesMenuValue,
            this.props.placesState.page * this.props.placesState.pagesMenuValue);

        // console.log('selectedPlaces', selectedPlaces);
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.homeRoutesList;
        let pageNotFound = this.props.storeState.languageTextMain.home.pageNotFound;
        let isEmpty = (selectedPlaces.length === 0 && this.props.isStaying);
        let isLoading = (selectedPlaces.length === 0 && !this.props.isStaying);
        return (

            <>
                <div className="drivers_block d-flex flex-wrap">
                    {selectedPlaces.map((element, index) =>
                        <>
                            <PlaceListElement element={element} index={index} findTagName={(tag) => findTagName(tag, this)}

                            />
                        </>
                    )}
                    {
                        isLoading || isEmpty ?
                            <>
                                {isLoading ?
                                    <div className="placesList_loading">
                                        <span>{pageNotFound.loading}</span>
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
const PlacesList = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser,
        globalReduser: state.GlobalReduser
    }),
)(PlacesListClass);

export default PlacesList;