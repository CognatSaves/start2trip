import React from 'react';
import './ToursList.css';
import '../Places/PlacesList.css';
import { connect } from 'react-redux';

import geoIcon from '../home/HomeBody/pictures/geo_icon.svg';
import bookmarkEmpty from '../Places/pictures/bookmark_contour.svg';
import bookmarkFilled from '../Places/pictures/bookmark_blue.svg';
import bookmarkSelected from '../Places/pictures/bookmark_orange.svg';
import { Link } from 'react-router-dom';

import Manipulator from '../manipulator/Manipulator';

import { setToursPage, setToursMorePagesShow } from '../../redusers/ActionTours';
import ToursListBlock from './ToursListBlock';

class ToursListClass extends React.Component {
    constructor(props) {
        super(props);
        this.toursSort = this.toursSort.bind(this);
        this.setPage = this.setPage.bind(this);
        this.showMorePages = this.showMorePages.bind(this);
    }
    setPage(page) {
        if (page !== "...") {
            this.props.dispatch(setToursPage(page));
        }
    }
    showMorePages() {
        this.props.dispatch(setToursMorePagesShow());
    }
    toursSort(array, type) {
        function sortPrice(a, b) {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
        }
        function sortRating(a, b) {
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;
        }
        function sortComments(a, b) {
            if (a.comments > b.comments) return -1;
            if (a.comments < b.comments) return 1;
        }
        let tempArray = [];
        let tempPrice = this.props.storeState.pricePart * this.props.storeState.maxPrice / 100;
        array.forEach((element, index) => {
            if (element.price <= tempPrice && element.passengersAvailable >= this.props.storeState.persons[1] + this.props.storeState.persons[0] &&
                (/*element.carType===this.props.storeState.autoValue || this.props.storeState.autoValue==="Тип авто"*/true) &&
                (/*element.language.indexOf(this.props.storeState.languageValue)!==-1 || this.props.storeState.languageValue==="Язык"*/ true)
            ) {
                tempArray.push(element);
            }
        });
        switch (type) {
            case "Популярность":
                return tempArray.sort(sortComments);
            case "Рейтинг":
                return tempArray.sort(sortRating);
            case "Цена":
                return tempArray.sort(sortPrice);
            default: return array;
        }
    }
    render() {
        

        function createNames(tourArray) {
            let res = [];
            for (let i = 0; i < tourArray.length; i++) {
                res[i] = tourArray[i].places[0];
                for (let j = 1; j < tourArray[i].places.length; j++) {
                    res[i] = res[i] + "-" + tourArray[i].places[j];
                }
            }
            return res;
        }

        let sortedArray = this.toursSort([...this.props.toursState.tours[0].tours], this.props.storeState.sortMenuValue);
        let selectedTours = sortedArray.slice((this.props.toursState.toursPage - this.props.toursState.toursShowPages) * this.props.storeState.pagesMenuValue,
            this.props.toursState.toursPage * this.props.storeState.pagesMenuValue);

        let srcArray = Array(selectedTours.length).fill(bookmarkEmpty);

        srcArray[0] = bookmarkSelected;
        srcArray[1] = bookmarkFilled;


        let namesArray = createNames(selectedTours);

        console.log(sortedArray);
        console.log(selectedTours);
        return (
            <ToursListBlock selectedTours={selectedTours} namesArray={namesArray} srcArray={srcArray}
                manipulatorNumber={this.props.toursState.tours[0].tours.length} manipulatorElementsNumber={this.props.storeState.pagesMenuValue}
                manipulatorPage={this.props.toursState.toursPage} manipulatorSetPage={this.setPage} 
                manipulatorShowMorePage={this.showMorePages}
            />
        )
    }

}

const ToursList = connect(
    (state) => ({
        storeState: state.AppReduser,
        //placesState: state.PlacesReduser,
        toursState: state.ToursReduser
    }),
)(ToursListClass);

export default ToursList;
