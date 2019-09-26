import React from 'react';
import '../Places/PlacesList.css';
import { connect } from 'react-redux';
import { setPage, setMorePagesShow } from '../../redusers/ActionPlaces';
import { setMaxPrice } from '../../redusers/ActionTours';

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
    getCurrencies = (currency, criterion) => {
        let idIndex = null
        switch (criterion) {
            case "id":
                this.props.storeState.currencies.map((item, index) => {
                    if (item.id.indexOf(currency) === 0) { idIndex = index }
                })
                break;
            case "ISO":
                this.props.storeState.currencies.map((item, index) => {
                    if (item.ISO.indexOf(currency) === 0) { idIndex = index }
                })
                break;
        }
        return idIndex
    }
    sortArrayByDate = (element, departureDate) => {
        let calendary = element.calendary;
        let isGood = false;
        let daily = element.daily;
        if (!daily) {
            if (calendary.length > 0) {
                let today = this.props.departureDate === null ? new Date() : new Date(this.props.departureDate)
                let day = today.getDate();
                let mounth = today.getMonth();
                let year = today.getFullYear();
                for (let i = 0; i < calendary.length; i++) {
                    let calendaryDate = new Date(calendary[i])
                    let calendaryDay = calendaryDate.getDate();
                    let calendaryMounth = calendaryDate.getMonth();
                    let calendaryYear = calendaryDate.getFullYear();
                    if (year <= calendaryYear && mounth <= calendaryMounth && day <= calendaryDay) {
                        if (departureDate === null) {
                            departureDate = calendaryDate;
                        } else if (departureDate.getDate() >= calendaryDay && departureDate.getMonth() >= calendaryMounth) {
                            departureDate = calendaryDate;
                        }
                    }
                }
            }
        }

        let date = departureDate
        if (departureDate !== null && !daily) {
            departureDate = departureDate.getDate() + "." + ((departureDate.getMonth() + 1) < 10 ? "0" + (departureDate.getMonth() + 1) : (departureDate.getMonth() + 1)) + "." + departureDate.getFullYear();
            isGood = true;
        } else if (daily) {
            let today = this.props.departureDate === null ? new Date() : new Date(this.props.departureDate);
            date = new Date(today.getFullYear(), today.getMonth(), today.getDate())
            departureDate = today.getDate() + "." + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "." + today.getFullYear();
            isGood = true;
        }
        return ({ isGood: isGood, departureDate: departureDate, date: date, element: element });
    }
    sortArrayByPrice = (el) => {
        let idIndex = this.getCurrencies(el.element.currency, "id")
        let usd = el.element.price / this.props.storeState.currencies[idIndex].costToDefault
        usd = Math.ceil(usd)
        if (usd > this.props.toursState.tempPricePart) {
            el.isGood = false
        }
        return el
    }
    sortArrayByPeople = (el) => {
        if (el.element.seats < (this.props.storeState.persons[0] + this.props.storeState.persons[1])) {
            el.isGood = false
        }
        return el
    }
    sortArrayByTourType = (el) => {
        if (this.props.tourType !== "default") {
            el.isGood = false
            for (let i = 0; i < el.element.categories.length; i++) {
                if (el.element.categories[i].id === this.props.tourType) {
                    el.isGood = true
                }
            }
        }
        return el
    }
    sortArrayByLanguage = (el) => {
        el.isGood = false
        for (let i = 0; i < el.element.language.length; i++) {
            for (let j = 0; j < this.props.storeState.languageValue.length; j++) {
                if (el.element.language[i] === this.props.storeState.languages[this.props.storeState.languageValue[j]].id) {
                    el.isGood = true
                    return el
                }
            }
        }

        return el
    }
    sortArrayByCriterion = (a, b, type) => {
        switch (type) {
            case "Популярности": {
                return a.element.comments > b.element.comments ? -1 : 1;
            }
            case "Рейтингу": {
                return a.element.rating > b.element.rating ? -1 : 1;
            }
            case "Цене": {
                let aIdIndex = this.getCurrencies(a.element.currency, "id")
                let aPrice = a.element.price / this.props.storeState.currencies[aIdIndex].costToDefault
                let bIdIndex = this.getCurrencies(b.element.currency, "id")
                let bPrice = b.element.price / this.props.storeState.currencies[bIdIndex].costToDefault
                if (this.props.storeState.sortMenuWay) {
                    return aPrice < bPrice ? -1 : 1
                } else {
                    return aPrice > bPrice ? -1 : 1
                }
            }
            case "Сначала дешевые": {
                let aIdIndex = this.getCurrencies(a.element.currency, "id")
                let aPrice = a.element.price / this.props.storeState.currencies[aIdIndex].costToDefault
                let bIdIndex = this.getCurrencies(b.element.currency, "id")
                let bPrice = b.element.price / this.props.storeState.currencies[bIdIndex].costToDefault
                return aPrice < bPrice ? -1 : 1
            }

            case "Сначала дорогие": {
                let aIdIndex = this.getCurrencies(a.element.currency, "id")
                let aPrice = a.element.price / this.props.storeState.currencies[aIdIndex].costToDefault
                let bIdIndex = this.getCurrencies(b.element.currency, "id")
                let bPrice = b.element.price / this.props.storeState.currencies[bIdIndex].costToDefault
                if (this.props.storeState.sortMenuWay) {
                    return aPrice < bPrice ? -1 : 1
                } else {
                    return aPrice > bPrice ? -1 : 1
                }
            }
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
        let tagFilteredArray = [], sortedArray = [], sortSelectedPlacesArray = [], selectedPlaces = [];
        let numberOfElements = 0;
        let isGoodElmentLength = 0;
        let noGoodElement = false;

        if (this.props.toursState.toursList.length > 0) {
            tagFilteredArray = tagFilterFunction([...this.props.toursState.toursList], []/*this.props.toursState.selectedTags*/);
            console.log('tagFilteredArray', tagFilteredArray);
            sortedArray = this.placesSort(/*[...this.props.placesState.placesList]*/tagFilteredArray, this.props.toursState.sortMenuValue);
        }
        if (sortedArray.length > 0 && this.props.storeState.currencies.length > 0) {

            sortedArray.map((element, index) => {
                let departureDate = null;
                let result = this.sortArrayByDate(element, departureDate);
                if (this.props.toursState.tempPricePart !== 0) {
                    result = this.sortArrayByPrice(result)
                }

                if ((this.props.storeState.persons[0] + this.props.storeState.persons[1]) > 1) {
                    result = this.sortArrayByPeople(result)
                }

                if (this.props.storeState.languages.length > 0 && this.props.storeState.languageValue.length > 0) {
                    result = this.sortArrayByLanguage(result)
                }

                result = this.sortArrayByTourType(result)

                sortSelectedPlacesArray.push(result)
            });

            sortSelectedPlacesArray = sortSelectedPlacesArray.sort((c, d) => {
                if (c.isGood && d.isGood) {
                    let a = new Date(c.date.getFullYear(), c.date.getMonth(), c.date.getDate());
                    let b = new Date(d.date.getFullYear(), d.date.getMonth(), d.date.getDate());
                    return a < b ? -1 : a > b ? 1 : this.sortArrayByCriterion(c, d, this.props.storeState.sortMenuValue);
                }
                return -1
            })

            if (sortSelectedPlacesArray.length > 0 && this.props.toursState.maxPrice === 0) {
                let arrayPrice = [];
                sortSelectedPlacesArray.map((el, index) => {
                    if (el.isGood) {
                        numberOfElements++
                        let idIndex = this.getCurrencies(el.element.currency, "id")
                        let usd = el.element.price / this.props.storeState.currencies[idIndex].costToDefault
                        usd = Math.ceil(usd)
                        arrayPrice.push(usd)
                    }
                });

                arrayPrice = arrayPrice.sort((a, b) => { return a > b ? -1 : 1 })
                this.props.dispatch(setMaxPrice(arrayPrice[0]))
            }
            selectedPlaces = sortSelectedPlacesArray.slice((this.props.toursState.page - this.props.toursState.showPages) * this.props.toursState.pagesMenuValue,
                this.props.toursState.page * this.props.toursState.pagesMenuValue);

            for (let i = 0; i < selectedPlaces.length; i++) {
                if (!selectedPlaces[i].isGood) {
                    isGoodElmentLength++
                }
            }

            if (selectedPlaces.length === isGoodElmentLength) {
                noGoodElement = true;
            }

        }


        console.log('selectedPlaces', selectedPlaces);
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.homeRoutesList;
        let pageNotFound = this.props.storeState.languageTextMain.home.pageNotFound;
        let isEmpty = (selectedPlaces.length === 0 && this.props.isStaying);
        let isLoading = (selectedPlaces.length === 0 && !this.props.isStaying);

        return (

            <>
                <div className="drivers_block d-flex flex-wrap">
                    {selectedPlaces.map((element, index) => {
                        if (element.isGood) {
                            return (
                                <>
                                    <ToursListElement element={element.element} index={index} findTagName={(tag) => findTagName(tag, this)}
                                        departureDate={element.departureDate} changeTravelVisibility={this.props.changeTravelVisibility}
                                    />
                                </>
                            )
                        }
                    })}
                    {
                        isLoading || isEmpty || noGoodElement ?
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
                <Manipulator number={numberOfElements} page={this.props.toursState.page} setPage={this.setPageFunc}
                    elementsNumber={this.props.toursState.pagesMenuValue} showMorePages={this.showMorePages}
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