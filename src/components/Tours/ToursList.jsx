import React from 'react';
import '../Places/PlacesList.css';
import { connect } from 'react-redux';
import { setPage, setMorePagesShow } from '../../redusers/ActionPlaces';
import { setMaxPrice } from '../../redusers/ActionTours';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,
    findTagName,getCurrencies,placesSort,tagFilterFunction} from '../../redusers/GlobalFunction'

import ToursListElement from './ToursListElement';
import Manipulator from '../manipulator/Manipulator';

// import requests from '../../config';

class ToursListClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfElements: 0,
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
  
    sortArrayByDate = (element, departureDate) => {
        function findFreeSeatsNumber(element, selectedDate,selectedDateFull){
            let tourSeatsData = element.tourSeatsData;
            for(let i=0; i<tourSeatsData.length; i++){
                if(tourSeatsData.length>0 ){
                    
                }
                if(tourSeatsData[i].startDefault === selectedDate){
                     
                    return {freeSeats:tourSeatsData[i].seatsLeft, seatsReserved: tourSeatsData[i].seatsReserved};
                }
            }
            return {freeSeats:element.seats, seatsReserved: 0};
        }
        function dateSeatsVerification(element, departureDate, that){
            //this function goes throw overlooked days array and find the first available date for now
            let isGoodVariant = false;
            let step = 0;let isGood = true;let findFreeSeatsNumberResult;
            let selectedDay;let selectedYear; let selectedMonth;let selectedDate;
            let dateNow = new Date();
            let timeElems = element.time.split(':');
            dateNow.setHours(dateNow.getHours()+2);
            //dateNow.setHours(timeElems[0]);
            //dateNow.setMinutes(timeElems[1]);
            
            while(!isGoodVariant){
                
                let move = 86400000 * step;
                selectedDay = departureDate === null ? new Date(Date.now()+move) : new Date(new Date(departureDate).getTime()+move);
                selectedDay.setHours(timeElems[0]);
                selectedDay.setMinutes(timeElems[1]);
                selectedYear = selectedDay.getFullYear();selectedMonth = selectedDay.getMonth(); selectedDate =  selectedDay.getDate();            
                //console.log(dateNow<selectedDay);
                //let temp = selectedDay.setHours(selectedDay.getHours()+2);
                //let tempDate = new Date(temp);
                // console.log(dateNow>selectedDay);
                
                //this small check is for day skip if, on example 
                if(step===0 && dateNow>selectedDay ){
                    step++;
                    continue;
                }
                let tempDepartureDate = selectedYear + '-' + (selectedMonth + 1 < 10 ? "0" + (selectedMonth + 1) :selectedMonth + 1) + '-' + (selectedDate<10 ? '0'+selectedDate : selectedDate); 
                findFreeSeatsNumberResult = findFreeSeatsNumber(element, tempDepartureDate,selectedDay);
                let canBook = element.isPricePerPerson || findFreeSeatsNumberResult.seatsReserved===0;
                if(findFreeSeatsNumberResult.freeSeats>= (that.props.storeState.persons[0] + that.props.storeState.persons[1]) && canBook){

                    if(that.props.globalReduser.busyDaysArrayVerification(element.busyDays, selectedDay, element.daysNumber)){
                        isGoodVariant=true;
                        isGood=true;
                    }

                }
                step++;
                if(step>16 && !isGoodVariant){
                    //if it takes too long - then, maybe, we can not find the correct                   
                    isGoodVariant=true;
                    isGood=false;
                }
            }
            let date; let departureDateString;
            if(isGood){
                date = new Date(selectedYear, selectedMonth, selectedDate);
                departureDateString = (selectedDate<10 ? '0'+selectedDate : selectedDate) + "." +
                (selectedMonth + 1 < 10 ? "0" + (selectedMonth + 1) :(selectedMonth + 1))
                 + "." + selectedYear;
            }           
            return {
                isGood: isGood,
                freeSeats: findFreeSeatsNumberResult.freeSeats,
                selectedYear: selectedYear,
                selectedMonth:selectedMonth,
                selectedDate:selectedDate,
                date:date,
                departureDate:departureDateString
            }
        }
        
        let calendary = element.calendary;
        let isGood = false;let freeSeats;
        let daily = element.daily;let date;let savedDepartureDate;
        if (!daily) {
            if (calendary.length > 0) {
                let today = this.props.departureDate === null ? new Date() : new Date(this.props.departureDate)
                let day = today.getDate();
                let month = today.getMonth();
                let year = today.getFullYear();
                
                for (let i = 0; i < calendary.length; i++) {
                    
                    let calendaryDate = new Date(calendary[i])
                    let calendaryDay = calendaryDate.getDate();
                    let calendaryMonth = calendaryDate.getMonth();
                    let calendaryYear = calendaryDate.getFullYear();
                    if (year <= calendaryYear && month <= calendaryMonth && day <= calendaryDay) {
                        let isValidDepartureDate= false;
                        if (departureDate === null) {
                            isValidDepartureDate=true;
                            //departureDate = calendaryDate;
                        } else if (departureDate.getFullYear() >= calendaryYear && departureDate.getMonth() >= calendaryMonth && departureDate.getDate() >= calendaryDay) {
                            isValidDepartureDate=true;
                            //departureDate = calendaryDate;
                        }
                        if(isValidDepartureDate){
                            let dateSeatsVerificationResult = dateSeatsVerification(element, calendaryDate, this);
                            if(dateSeatsVerificationResult.isGood){
                                //if we find the correct variant from not daily tour
                                date = dateSeatsVerificationResult.date;
                                departureDate = calendaryDate;
                                savedDepartureDate=dateSeatsVerificationResult.departureDate;
                                isGood = dateSeatsVerificationResult.isGood;
                                freeSeats = dateSeatsVerificationResult.freeSeats;
                            }
                        }
                    }
                }
            }
        }

        //let date = departureDate;
        /*
        if (departureDate !== null && !daily) {
            
            departureDate = departureDate.getDate() + "." + ((departureDate.getMonth() + 1) < 10 ? "0" + (departureDate.getMonth() + 1) : (departureDate.getMonth() + 1)) + "." + departureDate.getFullYear();
            isGood = true;
        } 
        */
        else/*(daily)*/ {
            //variant for everyday tours
            
            let dateSeatsVerificationResult = dateSeatsVerification(element, this.props.departureDate, this);
            date = dateSeatsVerificationResult.date;
            savedDepartureDate = dateSeatsVerificationResult.departureDate;
            isGood = dateSeatsVerificationResult.isGood;
            freeSeats = dateSeatsVerificationResult.freeSeats;           
        }
        return ({ isGood: isGood, departureDate: savedDepartureDate, date: date, element: {...element,freeSeats:freeSeats} });
    }
    sortArrayByPrice = (el) => {
        let idIndex = getCurrencies(el.element.currency, "id",this)
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
                if (el.element.language[i] === this.props.storeState.untranslatedlanguages[this.props.storeState.languageValue[j]].id) {
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
                let aIdIndex = getCurrencies(a.element.currency, "id",this)
                let aPrice = a.element.price / this.props.storeState.currencies[aIdIndex].costToDefault
                let bIdIndex = getCurrencies(b.element.currency, "id",this)
                let bPrice = b.element.price / this.props.storeState.currencies[bIdIndex].costToDefault
                if (this.props.storeState.sortMenuWay) {
                    return aPrice < bPrice ? -1 : 1
                } else {
                    return aPrice > bPrice ? -1 : 1
                }
            }
            case "Сначала дешевые": {
                let aIdIndex = getCurrencies(a.element.currency, "id",this)
                let aPrice = a.element.price / this.props.storeState.currencies[aIdIndex].costToDefault
                let bIdIndex = getCurrencies(b.element.currency, "id",this)
                let bPrice = b.element.price / this.props.storeState.currencies[bIdIndex].costToDefault
                return aPrice < bPrice ? -1 : 1
            }

            case "Сначала дорогие": {
                let aIdIndex = getCurrencies(a.element.currency, "id",this)
                let aPrice = a.element.price / this.props.storeState.currencies[aIdIndex].costToDefault
                let bIdIndex = getCurrencies(b.element.currency, "id",this)
                let bPrice = b.element.price / this.props.storeState.currencies[bIdIndex].costToDefault
                if (this.props.storeState.sortMenuWay) {
                    return aPrice < bPrice ? -1 : 1
                } else {
                    return aPrice > bPrice ? -1 : 1
                }
            }
            default:{
                
            }
        }
    }

    render() {

        
        // console.log('PlacesList render');
        // console.log(this.props);
        let tagFilteredArray = [], sortedArray = [], sortSelectedPlacesArray = [], selectedPlaces = [];
        let isGoodElmentLength = 0;
        let numberOfElements = 0;
        let noGoodElement = false;

        if (this.props.toursState.toursList.length > 0) {
            tagFilteredArray = tagFilterFunction([...this.props.toursState.toursList], []/*this.props.toursState.selectedTags*/);
            // console.log('tagFilteredArray', tagFilteredArray);
            sortedArray = placesSort(/*[...this.props.placesState.placesList]*/tagFilteredArray, this.props.toursState.sortMenuValue);
        }
        if (sortedArray.length > 0 && this.props.storeState.currencies.length > 0) {

            sortedArray.map((element, index) => {
                let departureDate = null;
                let result = this.sortArrayByDate(element, departureDate);

                if ((this.props.storeState.persons[0] + this.props.storeState.persons[1]) > 1 && result.isGood) {
                    result = this.sortArrayByPeople(result)
                }

                if (this.props.storeState.languages.length > 0 && this.props.storeState.languageValue.length > 0  && result.isGood) {
                    result = this.sortArrayByLanguage(result)
                }
                if( result.isGood){
                    result = this.sortArrayByTourType(result)
                }
                if (this.props.toursState.tempPricePart !== 0 && result.isGood) {
                    result = this.sortArrayByPrice(result)
                }

                if (result.isGood) {
                    sortSelectedPlacesArray.push(result)
                }

            });

            sortSelectedPlacesArray = sortSelectedPlacesArray.sort((c, d) => {
                if (c.isGood && d.isGood) {
                    let a = new Date(c.date.getFullYear(), c.date.getMonth(), c.date.getDate());
                    let b = new Date(d.date.getFullYear(), d.date.getMonth(), d.date.getDate());
                    return a < b ? -1 : a > b ? 1 : this.sortArrayByCriterion(c, d, this.props.storeState.sortMenuValue);
                }
                return -1
            })

            if (sortSelectedPlacesArray.length > 0 && (this.props.toursState.maxPrice === 0)) {
                let arrayPrice = [];
                sortSelectedPlacesArray.map((el, index) => {
                    if (el.isGood) {
                        let idIndex = getCurrencies(el.element.currency, "id",this)
                        let usd = el.element.price / this.props.storeState.currencies[idIndex].costToDefault
                        usd = Math.ceil(usd)
                        arrayPrice.push(usd)
                    }
                });
                arrayPrice = arrayPrice.sort((a, b) => { return a > b ? -1 : 1 })
                this.props.dispatch(setMaxPrice(arrayPrice[0]))
            }
            for (let i = 0; i < sortSelectedPlacesArray.length; i++) {
                if (sortSelectedPlacesArray[i].isGood) {
                    numberOfElements++
                }
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


        // console.log('selectedPlaces', selectedPlaces);
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
                                        elementActive={element}
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