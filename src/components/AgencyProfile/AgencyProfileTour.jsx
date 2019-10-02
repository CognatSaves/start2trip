import React from 'react';
import { connect } from 'react-redux';
import { isMobile, isMobileOnly } from 'react-device-detect';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import 'react-day-picker/lib/style.css';
import { readAndCompressImage } from 'browser-image-resizer';
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import { Collapse } from 'reactstrap'
import DayPicker, { DateUtils } from 'react-day-picker';
import LocationSearchInput from '../home/HomeBody/Search';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItemOld from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Dialog from 'material-ui/Dialog';
import Stars from '../stars/Stars'
import FlatButton from 'material-ui/FlatButton';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import calendar from '../media/calendar.svg';
const cookies = new Cookies();

const TourSeatsModalContent = (that, pseudoTableHeaderArray, tableElementsWidth, isErrorBlock,
    translation, selectActiveDays, textPageMonthArray) => {
    function dateLineConverter(value) {
        let elems = value.split('-'); //value = year-month-day
        return elems[2] + "." + elems[1] + "." + elems[0];
    }
    function monthMove(that, value) {
        let month = that.state.selectedMonth;
        let year = that.state.selectedYear;
        month = month + value;
        if (month > 11) {
            while (month > 11) {
                month = month - 11;
                year = year + 1;
            }
        }
        if (month < 0) {
            while (month < 0) {
                month = month + 11;
                year = year - 1;
            }
        }
        that.setState({
            selectedMonth: month,
            selectedYear: year
        })
    }
    console.log(that, pseudoTableHeaderArray, tableElementsWidth, isErrorBlock);
    if (that.state.tourSeatsModal) {
        selectActiveDays(that.state.selectedMonth, that.state.selectedYear);
    }

    return (
        <div className="d-flex flex-column col-12" style={{ maxHeight: isMobileOnly ? '500px' : '2000px'/*, ma*/ }}>
            <div className="d-flex flex-row tourSeatsModalHeader">
                <div className="tourSeatsModalName">
                    {/*translation.tour + " " + */(that.state.tourSeatsModalSelectedElement ? that.selectTourName(that.state.tourSeatsModalSelectedElement) : 'Error!')}
                </div>
                <div className="d-flex flex-row" style={{ marginLeft: 'auto' }}>
                    <text className="seatsModalMonthText seatsModalMonthMove" onClick={() => monthMove(that, -1)}>{'<'}</text>
                    <div className="seatsModalMonthText">
                        {textPageMonthArray[that.state.selectedMonth] + " " + that.state.selectedYear}
                    </div>
                    <text className="seatsModalMonthText seatsModalMonthMove" onClick={() => monthMove(that, 1)}>{'>'}</text>
                </div>
            </div>
            <div className="d-flex flex-column tableBlock tourSeatsModalTable">

                <div className="d-flex flex-column" style={{ textAlign: 'center' }}>
                    <div className="d-flex flex-row">
                        {
                            pseudoTableHeaderArray.map((element, index) => {
                                return (
                                    <div style={{ width: tableElementsWidth[index] }}>{translation.headerArray[index]}</div>
                                )
                            })
                        }
                    </div>
                    {
                        that.state.tourSeatsBlocks.map((element, index) => {
                            return (
                                <>
                                    <div className="d-flex flex-row" style={{ backgroundColor: isErrorBlock(element.id, that) ? 'red' : 'transparent' }}>
                                        <div style={{ width: tableElementsWidth[0] }}>{dateLineConverter(that.props.globalReduser.createDateTimeString(new Date(element.date), true))}</div>
                                        <div style={{ width: tableElementsWidth[1] }}>
                                            <input className="tourSeatsModalInput" type="number" value={element.freeSeats}
                                                onChange={(e) => {
                                                    let value = e.target.value;
                                                    if (value >= 0) {
                                                        let tourBlocks = that.state.tourSeatsBlocks;
                                                        tourBlocks[index].freeSeats = parseInt(value, 10);
                                                        that.setState({
                                                            tourSeatsBlocks: tourBlocks
                                                        })
                                                    }
                                                }} />
                                        </div>
                                        <div style={{ width: tableElementsWidth[2] }}>{element.reservedSeats}</div>
                                    </div>
                                </>
                            )
                        })

                    }
                </div>
            </div>
            <div className="d-flex flex-row justify-content-end">

                <button className="saveButtonTourSeatsModal buttonTourSeatsModal" onClick={() => that.tourSeatsApplyChanges()}>{translation.saveChangesButton}</button>
                <button className="closeButtonTourSeatsModal buttonTourSeatsModal" onClick={() => that.tourSeatsModalShow()}>{translation.closeWindow}</button>
            </div>

        </div>

    )
}
const ExcursionIncludesBlock = (props) => {
    function changeExcursionIncludesData(that, type) {

        let tourSave = that.state.tourSave;
        switch (type) {
            case "hotelMeeting": {
                tourSave.excursionIncludes.hotelMeeting = !tourSave.excursionIncludes.hotelMeeting;
                break;
            }
            case "hotelDelivery": {
                tourSave.excursionIncludes.hotelDelivery = !tourSave.excursionIncludes.hotelDelivery;
                break;
            }
            case "fare": {
                tourSave.excursionIncludes.fare = !tourSave.excursionIncludes.fare;
                break;
            }
            case "entryTickets": {
                tourSave.excursionIncludes.entryTickets = !tourSave.excursionIncludes.entryTickets;
                break;
            }
            case "food": {
                tourSave.excursionIncludes.food = !tourSave.excursionIncludes.food;
                break;
            }
            case "accommodation": {
                tourSave.excursionIncludes.accommodation = !tourSave.excursionIncludes.accommodation;
                break;
            }
            default:
        }
        that.setState({
            tourSave: tourSave
        })
    }
    //
    let { that, translation } = props;
    console.log(that);
    return (
        <div className="paddingL10 d-flex flex-md-row flex-column align-items-start">
            <label className="d-md-block d-none col-2 ">{translation.label + ":"}</label>
            <div className="d-flex flex-row col-md-6 col-12 p-0">
                <div className="d-flex flex-column" style={{ marginRight: '5px' }}>
                    <div className="d-flex flex-row">
                        <Checkbox id="hotelMeeting" checked={that.state.tourSave.excursionIncludes.hotelMeeting} onChange={() => changeExcursionIncludesData(that, 'hotelMeeting')} />
                        <label htmlFor={"hotelMeeting"} style={{ margin: 'auto 0' }}>{translation.hotelMeeting}</label>

                    </div>
                    <div className="d-flex flex-row">
                        <Checkbox id="hotelDelivery" checked={that.state.tourSave.excursionIncludes.hotelDelivery} onChange={() => changeExcursionIncludesData(that, 'hotelDelivery')} />
                        <label htmlFor={"hotelDelivery"} style={{ margin: 'auto 0' }}>{translation.hotelDelivery}</label>

                    </div>
                    <div className="d-flex flex-row">
                        <Checkbox id="fareId" checked={that.state.tourSave.excursionIncludes.fare} onChange={() => changeExcursionIncludesData(that, 'fare')} />
                        <label htmlFor={"fareId"} style={{ margin: 'auto 0' }}>{translation.fare}</label>

                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <Checkbox id="entryTickets" checked={that.state.tourSave.excursionIncludes.entryTickets} onChange={() => changeExcursionIncludesData(that, 'entryTickets')} />
                        <label htmlFor={"entryTickets"} style={{ margin: 'auto 0' }}>{translation.entryTickets}</label>

                    </div>
                    <div className="d-flex flex-row">
                        <Checkbox id="foodId" checked={that.state.tourSave.excursionIncludes.food} onChange={() => changeExcursionIncludesData(that, 'food')} />
                        <label htmlFor={"foodId"} style={{ margin: 'auto 0' }}>{translation.food}</label>

                    </div>
                    <div className="d-flex flex-row">
                        <Checkbox id="accommodation" checked={that.state.tourSave.excursionIncludes.accommodation} onChange={() => changeExcursionIncludesData(that, 'accommodation')} />
                        <label htmlFor={"accommodation"} style={{ margin: 'auto 0' }}>{translation.accommodation}</label>

                    </div>
                </div>
            </div>
        </div>
    )
}
class AgencyProfileTourClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.globalReduser.profile;
        let local = [];
        for (let i = 0; i < this.props.storeState.untranslatedlanguages.length; i++) {
            if (this.props.storeState.untranslatedlanguages[i].isTransfer) {
                local[i] = {
                    name: "",
                    departurePoint: {
                        point: "",
                        lat: "",
                        long: ""
                    },
                    points: [],
                    info: "",
                    language: this.props.storeState.untranslatedlanguages[i].ISO
                }
            }

        }
        let categoriesUnselected = [];
        for (let i = 0; i < profile.categories.length; i++) {
            categoriesUnselected[i] = {
                key: profile.categories[i].id,
                value: profile.categories[i].local.name
            }
        }
        let tagsUnselected = [];
        for (let i = 0; i < profile.tags.length; i++) {
            tagsUnselected[i] = {
                key: profile.tags[i].id,
                value: profile.tags[i].local.name
            }
        }
        this.state = {
            tourSave: {
                local: local,
                calendary: [],
                categoriesSelected: [],
                categoriesUnselected: categoriesUnselected,
                currency: "",
                daily: true,
                directionId: "",
                image: [],
                imageFiles: [],
                mainImage: '',
                mainImageFile: '',
                blockListImage: '',
                blockListImageFile: '',
                price: "",
                seats: "",
                time: "",
                tagsSelected: [],
                tagsUnselected: tagsUnselected,
                isPricePerPerson: false,
                daysNumber: 1,
                excursionIncludes: {
                    hotelMeeting: false,
                    hotelDelivery: false,
                    fare: false,//это транспортные расходы
                    entryTickets: false,
                    food: false,
                    accommodation: false//предоставление проживания
                },
                tourLanguages: []
            },

            collapse: false,
            calendarModal: false,
            tourSeatsModal: false,
            tourSeatsModalSelectedElement: undefined,
            selectedMonth: 0,//хранит значение от 0 до 11,
            //это стандартное значение месяцев
            selectedYear: 2019,
            tourSeatsSelectedDays: [],
            tourSeatsBlocks: [],
            tourSeatsErrorElementArray: [],
            unselectedTourLanguages: [],
            currencies: [...profile.currencies],

            directions: [...profile.directions],
            categories: [...profile.categories],
            tags: [...profile.tags],
            languageTour: [...this.props.storeState.untranslatedlanguages],
            languageTourOpen: 0,
            newTourEverydayTime: this.props.storeState.languageText.driverProfileRegistration.DriverProfileTripSettingsTour.newTourEverydayTime,
            newTourDatepickerTime: this.props.storeState.languageText.driverProfileRegistration.DriverProfileTripSettingsTour.newTourDatepickerTime,
            file: '',
            imagePreviewUrl: '',
            tempValue: 100,
            tour: {},
            tourId: "",

            isRefreshExist: false,
            isRefreshing: true,
            isGoodAnswer: true,
            errorStringVisibility: false,
            errorString: ""
        }
    }
    getProfileData = (thenFunc, catchFunc) => {
        console.log('getProfileData');
        let that = this;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== '-') {
            let requestValues = {
                readCookie: this.props.globalReduser.readCookie,
                setProfileData: function (data) {
                    that.props.dispatch(setProfileData(data))
                },
                requestAddress: requests.profileRequest
            };
            getUserData(requestValues, thenFunc, catchFunc);
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }
    }
    startRefresher = () => {
        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
    }
    thenFunc = () => {
        console.log('thenFunc');
        console.log(this.props.globalReduser);
        this.setState({
            isRefreshExist: true,
            isRefreshing: false,
            isGoodAnswer: true,
            collapse: false
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 1000);
    }
    catchFunc = () => {
        console.log('catchFunc');
        this.setState({
            isRefreshExist: true,
            isRefreshing: false,
            isGoodAnswer: false
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 2000);
    }
    fillForm = (element) => {
        let profile = this.props.globalReduser.profile;
        if (!element) {
            let local = [];
            for (let i = 0; i < this.props.storeState.untranslatedlanguages.length; i++) {
                if (this.props.storeState.untranslatedlanguages[i].isTransfer) {
                    local[i] = {
                        name: "",
                        departurePoint: {
                            point: "",
                            lat: "",
                            long: ""
                        },
                        points: [],
                        info: "",
                        language: profile.allLanguages[i].ISO
                    }
                }
            }
            let categoriesUnselected = [];
            for (let i = 0; i < profile.categories.length; i++) {
                categoriesUnselected[i] = {
                    key: profile.categories[i].id,
                    value: profile.categories[i].local.name
                }
            }
            let tagsUnselected = [];
            for (let i = 0; i < profile.tags.length; i++) {
                tagsUnselected[i] = {
                    key: profile.tags[i].id,
                    value: profile.tags[i].local.name
                }
            }
            let tourSave = {
                local: [...local],
                calendary: [],
                categoriesSelected: [],
                categoriesUnselected: categoriesUnselected,
                currency: "",
                daily: true,
                directionId: "",
                image: [],
                imageFiles: [],
                mainImage: '',
                mainImageFile: '',
                blockListImage: '',
                blockListImageFile: '',
                price: "",
                seats: "",
                time: "",
                tagsSelected: [],
                tagsUnselected: tagsUnselected,
                isPricePerPerson: false,
                daysNumber: 1,
                excursionIncludes: {
                    hotelMeeting: false,
                    hotelDelivery: false,
                    fare: false,//это транспортные расходы
                    entryTickets: false,
                    food: false,
                    accommodation: false//предоставление проживания
                },
                tourLanguages: []

            };
            this.setState({
                tourSave: tourSave,
                languageTourOpen: 0,
                file: '',
                imagePreviewUrl: '',
                tourId: "",
                unselectedTourLanguages: this.props.storeState.adminLanguages
            });
        }
        else {            
            let local = [];
            for (let i = 0; i < this.props.storeState.untranslatedlanguages.length; i++) {
                if (this.props.storeState.untranslatedlanguages[i].isTransfer) {
                    local[i] = {
                        name: "",
                        departurePoint: {
                            point: "",
                            lat: "",
                            long: ""
                        },
                        points: [],
                        info: "",
                        language: profile.allLanguages[i].ISO
                    }
                }
            }
            for (let i = 0; i < element.local.length; i++) {
                for(let j=0; j<local.length; j++){
                    if(element.local[i].language===local[j].language){
                        local[j]={...local[j],...element.local[i]}
                    }
                }
            }
            let categoriesUnselected = [];
            let categoriesSelected = [];
            for (let i = 0; i < profile.categories.length; i++) {
                for (let k = 0; k < element.categoryIds.length; k++) {
                    if (profile.categories[i].id === element.categoryIds[k]) {
                        categoriesSelected.push({
                            key: profile.categories[i].id,
                            value: profile.categories[i].local.name
                        });
                        k = element.categoryIds.length;
                    }
                    if (k === element.categoryIds.length - 1) {
                        categoriesUnselected.push({
                            key: profile.categories[i].id,
                            value: profile.categories[i].local.name
                        });
                    }
                }
            }
            let tagsSelected = [];
            let tagsUnselected = [];
            for (let i = 0; i < profile.tags.length; i++) {
                for (let k = 0; k < element.tags.length; k++) {
                    if (profile.tags[i].id === element.tags[k]) {
                        tagsSelected.push({
                            key: profile.tags[i].id,
                            value: profile.tags[i].local.name
                        });
                        k = element.tags.length;
                    }
                    if (k === element.tags.length - 1) {
                        tagsUnselected.push({
                            key: profile.tags[i].id,
                            value: profile.tags[i].local.name
                        });
                    }
                }
            }
            let image = [];
            let imageFiles = [];
            for (let i = 0; i < element.image.length; i++) {
                image[i] = requests.serverAddressImg + element.image[i].url;
                imageFiles[i] = new File([""], 'old');
            }
            let mainImage = (element.mainImage ? requests.serverAddressImg + element.mainImage.url : '');
            let mainImageFile = new File([""], 'old');
            let blockListImage = (element.mainImage ? requests.serverAddressImg + element.blockListImage.url : '');
            let blockListImageFile = new File([""], 'old');
            let calendary = [];
            for (let i = 0; i < element.calendary.length; i++) {
                calendary[i] = new Date(element.calendary[i]);
            }
            let selectedLanguages = []; let unselectedLanguages = [];
            for (let i = 0; i < this.props.storeState.adminLanguages.length; i++) {
                let viewedLanguage = this.props.storeState.adminLanguages[i];
                let value = element.tourLanguages.indexOf(viewedLanguage.id);
                if (value !== -1) {
                    selectedLanguages.push(viewedLanguage);
                }
                else {
                    unselectedLanguages.push(viewedLanguage);
                }
            }
            let tourSave = {
                local: [...local],
                calendary: calendary,
                categoriesSelected: categoriesSelected,
                categoriesUnselected: categoriesUnselected,
                currency: element.currency,
                daily: element.daily,
                directionId: element.directionId,
                image: image,
                imageFiles: imageFiles,
                mainImage: mainImage,
                mainImageFile: mainImageFile,
                blockListImage: blockListImage,
                blockListImageFile: blockListImageFile,
                price: element.price,
                seats: element.seats,
                time: element.time,
                tagsSelected: tagsSelected,
                tagsUnselected: tagsUnselected,
                isPricePerPerson: element.isPricePerPerson,
                daysNumber: element.daysNumber,
                excursionIncludes: {
                    hotelMeeting: element.hotelMeeting,
                    hotelDelivery: element.hotelDelivery,
                    fare: element.fare,//это транспортные расходы
                    entryTickets: element.entryTickets,
                    food: element.food,
                    accommodation: element.accommodation//предоставление проживания
                },
                tourLanguages: selectedLanguages

            };
            this.setState({
                tourSave: tourSave,
                languageTourOpen: 0,
                file: '',
                imagePreviewUrl: '',
                tourId: element.id,
                unselectedTourLanguages: unselectedLanguages
            });
        }
    }
    changeActive = (element) => {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            this.startRefresher();
            let that = this;
            var tourForm = new FormData();
            tourForm.append('onWork', !element.onWork);
            const request = new XMLHttpRequest();
            request.open('PUT', requests.userTourActivateRequest + '/' + element.id);
            request.setRequestHeader('Authorization', `Bearer ${jwt}`);
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    console.log(request.responseText);
                    that.getProfileData(that.thenFunc, that.catchFunc);
                }
                if (request.readyState === XMLHttpRequest.DONE && request.status === 0) {
                    that.catchFunc();
                }
            }
            request.send(tourForm);
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }
    }
    destroy = (element) => {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            this.startRefresher();
            let that = this;
            const request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    console.log(request.responseText);
                    that.getProfileData(that.thenFunc, that.catchFunc);
                }
                if (request.readyState === XMLHttpRequest.DONE && request.status === 0) {
                    that.catchFunc();
                }
            }
            request.open('DELETE', requests.userTourDestroyRequest + "/" + element.id);
            request.setRequestHeader('Authorization', `Bearer ${jwt}`);
            request.send();
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }
    }
    applyChanges(type) {
        let jwt = this.props.globalReduser.readCookie('jwt');

        function checkCorrectTour(tourSave) {
            function checkCorrectLocal(local, index){
                console.log('checkCorrectLocal');
                let result = true;
                let isNameGood = local.name && local.name.length>0;
                let isDeparturePointGood = local.departurePoint && local.departurePoint.point.length>0;
                let isPointsGood = local.points.length>0;
                let isInfoGood = local.info.length>0;
                if(isNameGood || isDeparturePointGood || isPointsGood || isInfoGood){
                    //if anything is filled by any, even a little bit valid, data
                    //look throw that values and if find fields without data -> turn them red
                    if(!isNameGood){
                        let obj = document.querySelectorAll('.inputTourName'+index);
                        if(obj[0]){
                            obj[0].classList.add("errorColor");
                        }
                        if(obj[1]){
                            obj[1].classList.add("errorColor");
                        }
                        result=false; 
                    }
                    if(!isDeparturePointGood){
                        let obj = document.querySelectorAll('.departurePointClass'+index);
                        if(obj[0]){
                            obj[0].classList.add("errorColor");
                        }
                        result=false; 
                    }
                    if(!isPointsGood){
                        let obj = document.querySelectorAll('.routePointsClass'+index);
                        if(obj[0]){
                            obj[0].classList.add("errorColor");
                        }
                        result=false; 
                    }
                    if(!isInfoGood){
                        let obj = document.querySelectorAll('.descriptionClass'+index);
                        if(obj[0]){
                            obj[0].classList.add("errorColor");
                        }
                        if(obj[1]){
                            obj[1].classList.add("errorColor");
                        }
                        result=false; 
                    }
                }
                else{   
                    //if every field is empty, then remove all red
                    let obj = document.querySelectorAll('.inputTourName'+index);
                    if(obj[0]){
                        obj[0].classList.remove("errorColor");
                    }
                    if(obj[1]){
                        obj[1].classList.remove("errorColor");
                    }
                    obj = document.querySelectorAll('.departurePointClass'+index);
                    if(obj[0]){
                        obj[0].classList.remove("errorColor");
                    }
                    obj = document.querySelectorAll('.routePointsClass'+index);
                    if(obj[0]){
                        obj[0].classList.remove("errorColor");
                    }
                    obj = document.querySelectorAll('.descriptionClass'+index);
                    if(obj[0]){
                        obj[0].classList.remove("errorColor");
                    }
                    if(obj[1]){
                        obj[1].classList.remove("errorColor");
                    }
                }              
                return result;
            }
            let obj = "";
            let result = true;
            
      
            //////////////// local validation
            for(let i=0; i<tourSave.local.length; i++){
                checkCorrectLocal(tourSave.local[i], i);
                console.log(result);
            }
            //////////////// main block validation
            if (!tourSave.time) {
                obj = document.querySelectorAll('.dropdownTime');
                obj[0].classList.add("errorColor");
                //obj = document.querySelectorAll('.dropdownClass');
                obj[1].classList.add("errorColor");
                result = false;
            }
            if (tourSave.price.length === 0 || isNaN(tourSave.price)) {
                obj = document.getElementById('newTourPrice');
                obj.classList.add("errorColor");
                result = false;
            }
            if (tourSave.currency.length === 0) {
                obj = document.querySelectorAll('.dropdownCurrency');             
                obj[0].classList.add("errorColor");                            
                result = false;
            }
            ////////////////////
            let value;
            try {
                value = parseInt(tourSave.seats, 10)
                if (value < 1) {
                    throw Error();
                }
            }
            catch (error) {//должно быть тоже самое, что и в следующем блоке
                obj = document.getElementById('newTourPeople');
                obj.classList.add("errorColor");
                result = false;
            }
            if (tourSave.seats.length === 0 || isNaN(tourSave.seats)) {
                obj = document.getElementById('newTourPeople');
                obj.classList.add("errorColor");
                result = false;
            }

            if (tourSave.daysNumber.length === 0 || isNaN(tourSave.daysNumber)) {
                obj = document.getElementById('daysNumber');
                obj.classList.add("errorColor");
                result = false;
            }
            //////////////////////
            try {
                value = parseInt(tourSave.daysNumber, 10)
                if (value < 1) {
                    throw Error();
                }
            }
            catch (error) {//должно быть тоже самое, что и в следующем блоке
                obj = document.getElementById('daysNumber');
                obj.classList.add("errorColor");
                result = false;
            }
            if (tourSave.daysNumber.length === 0 || isNaN(tourSave.daysNumber)) {
                obj = document.getElementById('daysNumber');
                obj.classList.add("errorColor");
                result = false;
            }
            /////////////////

            if (tourSave.imageFiles.length === 0) {
                obj = document.getElementById('imageLabelError');
                obj.style.display = 'block';
                //obj.classList.add("errorColor");
                result = false;
            }
            if (tourSave.mainImage.length === 0) {
                obj = document.getElementById('mainImageLabelError');
                obj.style.display = 'block';
                result = false;
            }
            if (tourSave.blockListImage.length === 0) {
                obj = document.getElementById('blockListImageLabelError');
                obj.style.display = 'block';
                result = false;
            }


            return result;
        }
        let errorTextBlock =  document.querySelectorAll('.errorText');
        
        if(errorTextBlock[0]){
            errorTextBlock[0].classList.remove('d-block');
            errorTextBlock[0].classList.remove('errorColor');         
        }  
        if (jwt && jwt !== "-" && checkCorrectTour(this.state.tourSave)) {
            
            let that = this;
            this.startRefresher();

            var tourForm = new FormData();
            let tourSave = this.state.tourSave;
            for (let i = 0; i < tourSave.local.length; i++) {
                let preSlug = that.props.globalReduser.convFunc(tourSave.local[i].name, 'ru');
                let preSlugNoSpaces = preSlug.replace(/ /g, '-');
                tourForm.append('local', JSON.stringify({ ...(tourSave.local[i]), preSlug: preSlugNoSpaces }));
            }
            for (let i = 0; i < tourSave.calendary.length; i++) {
                tourForm.append('calendary', tourSave.calendary[i]);
            }
            for (let i = 0; i < tourSave.categoriesSelected.length; i++) {
                tourForm.append('categories', tourSave.categoriesSelected[i].key);
            }
            for (let i = 0; i < tourSave.tagsSelected.length; i++) {
                tourForm.append('tags', tourSave.tagsSelected[i].key);
            }
            tourForm.append('currency', tourSave.currency);
            tourForm.append('daily', tourSave.daily);
            tourForm.append('directionId', tourSave.directionId);
            tourForm.append('price', tourSave.price);
            tourForm.append('seats', tourSave.seats);
            tourForm.append('time', tourSave.time);
            tourForm.append('daysNumber', tourSave.daysNumber);
            tourForm.append('isPricePerPerson', tourSave.isPricePerPerson);


            tourForm.append('hotelMeeting', tourSave.excursionIncludes.hotelMeeting);
            tourForm.append('hotelDelivery', tourSave.excursionIncludes.hotelDelivery);
            tourForm.append('fare', tourSave.excursionIncludes.fare);
            tourForm.append('entryTickets', tourSave.excursionIncludes.entryTickets);
            tourForm.append('food', tourSave.excursionIncludes.food);
            tourForm.append('accommodation', tourSave.excursionIncludes.accommodation);

            let selectedLanguagesIndexArray = [];
            for (let i = 0; i < tourSave.tourLanguages.length; i++) {
                //selectedLanguagesIndexArray.push(tourSave.tourLanguages[i].id);
                tourForm.append('tourLanguages', tourSave.tourLanguages[i].id);
            }

            for (let i = 0; i < tourSave.imageFiles.length; i++) {
                tourForm.append('image', tourSave.imageFiles[i]);
            }
            tourForm.append('mainImage', tourSave.mainImageFile);
            tourForm.append('blockListImage', tourSave.blockListImageFile);
            const request = new XMLHttpRequest();
            if (this.state.tourId.length === 0) {//если нет id, то это свежак
                request.open('PUT', requests.userTourCreateRequest);
                request.setRequestHeader('Authorization', `Bearer ${jwt}`);
            }
            else {
                for (let i = 0; i < tourSave.imageFiles.length; i++) {
                    if (tourSave.imageFiles[i].name === 'old') {
                        tourForm.append('imageUrl', tourSave.image[i]);
                    }
                    else {
                        tourForm.append('imageUrl', 'check file');
                    }

                }
                request.open('PUT', requests.userTourUpdateRequest + "/" + this.state.tourId);
                request.setRequestHeader('Authorization', `Bearer ${jwt}`);
            }
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    console.log(request.responseText);
                    that.getProfileData(that.thenFunc, that.catchFunc);
                }
                if (request.readyState === XMLHttpRequest.DONE && request.status === 400) {
                    that.catchFunc();
                }
            }
            request.send(tourForm);
        }
        else {
            
            let errorTextBlock =  document.querySelectorAll('.errorText');
            if(errorTextBlock[0]){
                errorTextBlock[0].classList.add('d-block');
                errorTextBlock[0].classList.add('errorColor');
                
            }
            if (jwt && jwt !== "-") {//если пользователь залогинен, но тур некорректен
                this.setState({
                    errorStringVisibility: true
                });
            }
            else {
                this.props.dispatch(setUrlAddress(window.location.pathname));
                this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
                return null;
            }
        }
    }
    formSubmit = (event) => {
        if (!this.state.tour.id) {
            this.applyChanges(true);//если новый, то true
        }
        else {
            this.applyChanges(false);
        }
        event.preventDefault();
    }
    toggle = (element, props) => {
        function removeErrorColorElems(){
            //function must remove all colorification from blocks that created by validator
            let errorTextBlock =  document.querySelectorAll('.errorText');
            if(errorTextBlock[0]){
                errorTextBlock[0].classList.remove('d-block');
                errorTextBlock[0].classList.remove('errorColor');         
            }
            let errorElements = document.querySelectorAll('.errorColor');
            for(let i=0; i<errorElements.length; i++){
                errorElements[i].classList.remove('errorColor');
            }
            let imageLabel;
            imageLabel = document.getElementById('imageLabelError');
            imageLabel.style.display = 'none';

            imageLabel = document.getElementById('mainImageLabelError');
            imageLabel.style.display = 'none';

            imageLabel = document.getElementById('blockListImageLabelError');
            imageLabel.style.display = 'none';

        }
        removeErrorColorElems();
        let collapseValue = props ? props.collapse : !this.state.collapse;
        this.setState(state => ({ collapse: collapseValue, tour: {} }));
        if (this.props.props && this.props.props.changeTourOpened) {//если AgencyProfileTour является потомком Driver...Tour, то ему передаётся ещё одна ф-ция, которуд надо вызвать
            this.props.props.changeTourOpened(collapseValue);
        }
        if (!element) {
            this.fillForm();
        }
        else {
            this.fillForm(element);
        }
        if (isMobileOnly) {
            window.scroll(
                {
                    top: 300,
                    left: 0,
                    behavior: 'smooth'
                });
        } else {
            window.scroll({
                top: 322,
                left: 0,
                behavior: 'smooth'
            });
        }


    }
    calendarModalShow = () => {
        this.setState({ calendarModal: !this.state.calendarModal });
    };
    tourSeatsModalShow = (element) => {
        let now = new Date();
        let year = now.getUTCFullYear();
        let month = now.getUTCMonth();
        if (!this.state.tourSeatsModal) {
            this.fillForm(element);
        }
        else {
            this.fillForm();
        }
        this.setState({
            selectedMonth: month,
            selectedYear: year,
            tourSeatsModal: !this.state.tourSeatsModal,
            tourSeatsModalSelectedElement: !this.state.tourSeatsModal ? element : undefined,
            tourSeatsSelectedDays: [],
            tourSeatsBlocks: [],
            tourSeatsErrorElementArray: []
        });
    }
    handleChange = (value, name, params) => {
        let tourSave = this.state.tourSave;
        switch (name) {
            case "name": {
                if (params && params.number !== undefined) {
                    tourSave.local[params.number].name = value;
                    this.setState({
                        tourSave: tourSave
                    });
                }
                break;
            }
            case "info": {
                if (params && params.number !== undefined) {
                    tourSave.local[params.number].info = value;
                    this.setState({
                        tourSave: tourSave
                    })
                }
                break;
            }
            case "categories": {
                this.categoriesSelected = tourSave.categoriesSelected;
                this.categoriesUnselected = tourSave.categoriesUnselected;

                let objId = this.categoriesUnselected.findIndex(el => el.key === value);
                this.categoriesSelected.push(this.categoriesUnselected[objId]);
                this.categoriesUnselected.splice(objId, 1);
                this.setState({ tourSave: { ...tourSave, categoriesUnselected: this.categoriesUnselected, categoriesSelected: this.categoriesSelected } });
                break;
            }
            case "tags": {
                this.tagsSelected = tourSave.tagsSelected;
                this.tagsUnselected = tourSave.tagsUnselected;

                let objId = this.tagsUnselected.findIndex(el => el.key === value);
                this.tagsSelected.push(this.tagsUnselected[objId]);
                this.tagsUnselected.splice(objId, 1);
                this.setState({ tourSave: { ...tourSave, tagsUnselected: this.tagsUnselected, tagsSelected: this.tagsSelected } });
                break;
            }
            case "typeCar": {
                this.setState({ typeCar: value })
                break;
            }
            case "attractionsAlongTheRoute": {
                tourSave.local[params.number].points.push(
                    {
                        point: value,
                        lat: params.location.lat,
                        long: params.location.long
                    });
                this.setState({ tourSave: tourSave });
                break;
            }
            case "tourLanguages": {

                console.log(this, value, name, params);
                let selectedLanguages = tourSave.tourLanguages;
                let unselectedLanguages = this.state.unselectedTourLanguages;
                let valueIndex = unselectedLanguages.indexOf(value);
                if (valueIndex !== -1) {
                    unselectedLanguages.splice(valueIndex, 1);
                }
                selectedLanguages.push(value);
                tourSave.tourLanguages = selectedLanguages;
                this.setState({
                    tourSave: tourSave,
                    unselectedTourLanguages: unselectedLanguages
                });
            }
            default:
        }
    };
    handleRequestDelete = (element, name, params) => {

        let tourSave = this.state.tourSave;
        switch (name) {
            case "categories": {
                this.categoriesSelected = tourSave.categoriesSelected;
                this.categoriesUnselected = tourSave.categoriesUnselected;

                let objId = this.categoriesSelected.findIndex(el => el.key === element);
                this.categoriesUnselected.push(this.categoriesSelected[objId]);
                this.categoriesSelected.splice(objId, 1);
                this.setState({ tourSave: { ...tourSave, categoriesUnselected: this.categoriesUnselected, categoriesSelected: this.categoriesSelected } });
                break;
            }
            case "tags": {
                this.tagsSelected = tourSave.tagsSelected;
                this.tagsUnselected = tourSave.tagsUnselected;

                let objId = this.tagsSelected.findIndex(el => el.key === element);
                this.tagsUnselected.push(this.tagsSelected[objId]);
                this.tagsSelected.splice(objId, 1);
                this.setState({ tourSave: { ...tourSave, tagsUnselected: this.tagsUnselected, tagsSelected: this.tagsSelected } });
                break;
            }
            case "calendary": {

                this.calendary = this.state.tourSave.calendary;
                const calendaryToDelete = this.calendary.map((chip) => chip).indexOf(element);
                this.calendary.splice(calendaryToDelete, 1);
                this.setState({ tourSave: { ...tourSave, calendary: this.calendary } });
                break;
            }
            case "attractionsAlongTheRoute": {
                let objId = tourSave.local[params.number].points.findIndex(el => el === element);
                tourSave.local[params.number].points.splice(objId, 1);
                this.setState({ tourSave: { ...tourSave } });
                break;
            }
            case "tourLanguages": {

                console.log(this, element, name, params);
                let selectedLanguages = tourSave.tourLanguages;
                let unselectedLanguages = this.state.unselectedTourLanguages;
                let valueIndex = selectedLanguages.indexOf(element);
                if (valueIndex !== -1) {
                    selectedLanguages.splice(valueIndex, 1);
                }
                unselectedLanguages.push(element);
                tourSave.tourLanguages = selectedLanguages;
                this.setState({
                    tourSave: tourSave,
                    unselectedTourLanguages: unselectedLanguages
                });
            }
            default:
        }
    };
    _handleImageChange = (e, type) => {
        e.preventDefault();
        let obj;
        if (type === 'image') {
            obj = document.getElementById('imageLabelError');
            obj.style.display = 'none';
        }
        if (type === 'mainImage') {
            obj = document.getElementById('mainImageLabelError');
            obj.style.display = 'none';
        }
        if (type === 'blockListImage') {
            obj = document.getElementById('blockListImageLabelError');
            obj.style.display = 'none';
        }
        let fullfile = e.target.files;
        let imageCounter = 0;
        for (let i = 0; i < fullfile.length; i++) {
            if (i === 0) {
                this.startRefresher();
            }

            let file = fullfile[i]

            if (!file.type.match('image')) continue;

            readAndCompressImage(file, this.props.globalReduser.compressConfig)
                .then(resizedImage => {

                    let sizFile = new File([resizedImage], file.name);
                    return sizFile;
                })
                .then(sizFile => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        // 

                        if (type === 'image') {
                            var img = reader.result;
                            let tourSave = this.state.tourSave;
                            tourSave.image.push(img);
                            tourSave.imageFiles.push(sizFile);

                            imageCounter++;

                            if (imageCounter === fullfile.length) {
                                this.setState({
                                    isRefreshExist: false,
                                    isRefreshing: false
                                })
                            }
                            this.setState({
                                tourSave: tourSave,
                                file: file,
                                imagePreviewUrl: img,
                            });
                        }
                        else {
                            if (type === 'mainImage') {
                                var img = reader.result;
                                let tourSave = this.state.tourSave;
                                tourSave.mainImage = img;
                                tourSave.mainImageFile = sizFile;

                                this.setState({
                                    tourSave: tourSave,
                                    file: file,
                                    imagePreviewUrl: img,
                                });
                            }
                            if (type === 'blockListImage') {
                                var img = reader.result;
                                let tourSave = this.state.tourSave;
                                tourSave.blockListImage = img;
                                tourSave.blockListImageFile = sizFile;

                                this.setState({
                                    tourSave: tourSave,
                                    file: file,
                                    imagePreviewUrl: img,
                                });
                            }
                            this.setState({
                                isRefreshExist: false,
                                isRefreshing: false
                            })
                        }
                    }
                    reader.readAsDataURL(sizFile)
                });
        }

    }
    selectTourName = (element) => {
        let name = '';
        if (element.local && Array.isArray(element.local)) {
            for (let i = 0; i < element.local.length; i++) {
                if (element.local[i].name && element.local[i].name.length > 0) {
                    name = element.local[i].name;
                    i = element.local.length;
                }
            }
        }
        return name;
    }
    handleDayClick = (day, { selected }) => {
        const { tourSave } = this.state;
        let calendary = tourSave.calendary
        if (selected) {
            const selectedIndex = calendary.findIndex(calendary =>
                DateUtils.isSameDay(calendary, day)
            );
            calendary.splice(selectedIndex, 1);
        } else {
            calendary.push(day);
        }
        this.setState({ tourSave: { ...tourSave, calendary: calendary } });
    }
    selectActiveDays = (month, year) => {
        function selectCalendaryDays(daily, calendary, month, year, element) {
            function addEl(value) {
                if (value < 10) {
                    return '0' + value;
                }
                else {
                    return value;
                }
            }
            let array = [];
            if (!daily) {
                for (let i = 0; i < calendary.length; i++) {
                    let clYear = calendary[i].getUTCFullYear(); let clMonth = calendary[i].getUTCMonth(); let clDate = calendary[i].getUTCDate();
                    if (month === clMonth && clYear === year) {
                        let tempString = clYear + "-" + addEl(clMonth + 1) + "-" + addEl(clDate);
                        array.push({
                            date: tempString,
                            freeSeats: element.seats,
                            reservedSeats: 0
                        });
                        daysCalendary.push(tempString);
                    }
                }
                calendary.sort((a, b) => { return a < b });
            }
            else {
                let daysNumber = new Date(year, month + 1, 0).getDate();//берём нулевой день в следующем месяце

                for (let i = 0; i < daysNumber; i++) {
                    let value = year + '-' + addEl(month + 1) + '-' + addEl(i + 1);
                    array.push({
                        date: value,
                        freeSeats: element.seats,
                        reservedSeats: 0
                    });
                    daysCalendary.push(value);
                }

            }
            return array;
        }


        const { tourSave } = this.state;
        let daysCalendary = [];
        let allDaysArray = selectCalendaryDays(this.state.tourSave.daily, this.state.tourSave.calendary, this.state.selectedMonth, this.state.selectedYear, this.state.tourSeatsModalSelectedElement);
        console.log(allDaysArray);
        //let resultArray = [];

        for (let i = 0; i < this.state.tourSeatsModalSelectedElement.tourSeatsData.length; i++) {
            let tsd = this.state.tourSeatsModalSelectedElement.tourSeatsData[i];
            let date = tsd.startDefault.slice(0, 10);
            for (let i = 0; i < allDaysArray.length; i++) {
                if (allDaysArray[i].date === date) {
                    allDaysArray[i] = {
                        date: date,
                        reservedSeats: tsd.reservedSeats,
                        freeSeats: tsd.seatsMax - tsd.reservedSeats,
                        id: tsd.id
                    }
                }
            }
            // console.log(tsd);
        }

        console.log(allDaysArray);
        if (JSON.stringify(this.state.tourSeatsSelectedDays) !== JSON.stringify(daysCalendary)) {
            this.setState({ tourSeatsSelectedDays: daysCalendary, tourSeatsBlocks: allDaysArray });
        }

    }
    handleTourSeatsDayClick = (day, { selected }) => {
        function checkDateSeatsNumber(date, that) {
            let selectedTour = that.state.tourSeatsModalSelectedElement;

            if (!selectedTour) {
                return undefined;
            }
            for (let i = 0; i < selectedTour.tourSeatsData.length; i++) {
                let dataDate = that.props.globalReduser.createDateTimeString(selectedTour.tourSeatsData[i].startDefault, true);
                if (date === dataDate) {
                    return { id: selectedTour.tourSeatsData[i].id, freeSeats: selectedTour.tourSeatsData[i].seatsMax - selectedTour.tourSeatsData[i].reservedSeats, reservedSeats: selectedTour.tourSeatsData[i].reservedSeats };
                }
            }

            if (selectedTour.daily) {
                return { freeSeats: selectedTour.seats, reservedSeats: 0 };
            }
            else {
                for (let i = 0; i < selectedTour.calendary.length; i++) {
                    let dataDate = that.props.globalReduser.createDateTimeString(selectedTour.calendary[i], true);
                    if (date === dataDate) {
                        return { freeSeats: selectedTour.seats, reservedSeats: 0 };
                    }
                }
            }
            return undefined;
        }


        const { tourSeatsSelectedDays, tourSeatsBlocks } = this.state;

        let calendary = tourSeatsSelectedDays
        let blocks = tourSeatsBlocks;
        if (selected) {

            const selectedIndex = calendary.findIndex(calendary =>
                DateUtils.isSameDay(calendary, day)
            );
            calendary.splice(selectedIndex, 1);
            blocks.splice(selectedIndex, 1);

        } else {
            calendary.push(day);
            let dateElement = this.props.globalReduser.createDateTimeString(day, true);
            let seatsNumber = checkDateSeatsNumber(dateElement, this);
            if (seatsNumber) {
                blocks.push({
                    date: day,
                    freeSeats: seatsNumber.freeSeats,
                    reservedSeats: seatsNumber.reservedSeats,
                    id: seatsNumber.id
                })
            }
            else {
                //может и хуйня это, но получше ничего не придумал(
                calendary.splice(calendary.length - 1, 1);
            }

        }

        this.setState({ tourSeatsSelectedDays: calendary, tourSeatsBlocks: blocks });
    }
    tourSeatsApplyChanges = () => {

        let that = this;
        let jwt = cookies.get('jwt', { path: '/' });
        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        })
        if (jwt) {

            let body = JSON.stringify({
                tour: that.state.tourSeatsModalSelectedElement.id,
                tourSeatsData: that.state.tourSeatsBlocks
            })
            let requestAddress = requests.setTourSeatsData;
            fetch(requestAddress, {
                method: 'PUT', body: body,
                headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}` }
            })
                .then(response => {
                    console.log('get answer');
                    return response.json();
                })
                .then(data => {

                    if (data.error) {
                        console.log('bad');
                        throw data.error;
                    }
                    else {
                        function setSelectedElementsValue(that, data) {
                            let selectedDateArray = [];
                            let tourSeatsBlocks = that.state.tourSeatsBlocks;
                            for (let i = 0; i < that.state.tourSeatsBlocks.length; i++) {
                                let date = new Date(that.state.tourSeatsBlocks[i].date);
                                let day = date.getDate();
                                let month = date.getMonth();
                                let year = date.getFullYear();
                                selectedDateArray[i] = {
                                    day: day,
                                    month: month,
                                    year: year
                                }
                            }

                            for (let i = 0; i < data.tourSeatsData.length; i++) {
                                let date = new Date(data.tourSeatsData[i].startDefault);
                                let day = date.getDate();
                                let month = date.getMonth();
                                let year = date.getFullYear();
                                for (let j = 0; j < selectedDateArray.length; j++) {
                                    if (day === selectedDateArray[j].day &&
                                        month === selectedDateArray[j].month && year === selectedDateArray[j].year) {
                                        tourSeatsBlocks[j].seatsMax = data.tourSeatsData[i].seatsMax;
                                        tourSeatsBlocks[j].reservedSeats = data.tourSeatsData[i].reservedSeats;
                                    }
                                }
                            }
                            that.setState({
                                tourSeatsBlocks: tourSeatsBlocks
                            })
                        }
                        console.log('good');
                        console.log(data);
                        //запись данных в профиль

                        let profile = that.props.globalReduser.profile;
                        let index = -1;
                        for (let i = 0; i < profile.tours.length; i++) {
                            if (profile.tours[i].id === data.tourId) {
                                profile.tours[i].tourSeatsData = data.tourSeatsData;
                                index = i;
                                break;
                            }
                        }
                        that.props.dispatch(setProfileData(profile));


                        //запись данных в открытые элементы
                        setSelectedElementsValue(that, data)
                        //сохранить результат и строку с ошибками
                        that.setState({
                            tourSeatsModalSelectedElement: profile.tours[index],
                            tourSeatsErrorElementArray: data.errorElementsArray,
                            isRefreshExist: true,
                            isRefreshing: false,
                            isGoodAnswer: true
                        })
                        that.thenFunc();

                        //that.tourSeatsModalShow();
                        /*that.setState({
                            tourSeatsModalSelectedElement:undefined,
                            tourSeatsSelectedDays: [],
                            tourSeatsBlocks:[],
                        })*/
                    }
                })
                .catch(error => {
                    that.catchFunc();
                    console.log('Error happened');
                });

        }
        else {
            //TODO обработать отсутствие jwt
        }
    }
    render() {
        function isErrorBlock(id, that) {
            for (let i = 0; i < that.state.tourSeatsErrorElementArray.length; i++) {
                let element = that.state.tourSeatsErrorElementArray[i];
                if (element.id === id) {
                    return true;
                }
            }
            return false;
        }
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="carAddNewCarPhotoCarImg" alt="add_car" />);
        }
        var today = new Date();
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.calendarModalShow}
            />,
        ];
        const actionTour = [
            <div />
        ]
        const customContentStyle = {
            width: '100%',
            maxWidth: 'none',
        };
        const desktopContentStyle = {
            width: '100%',
            maxWidth: '550px',
        }

        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileTripSettingsTour;
        
        let textPageAgencyProfile = this.props.storeState.languageText.agencyProfile.agencyProfileTour;
        console.log(textPageAgencyProfile.currencyPlaceholder);

        
        let textPageMonthArray = this.props.storeState.languageText.header.monthArray;
        let pseudoTableHeaderArray = ['День', 'Mест свободно', 'Mecт зaнятo'];//этот массив формирует размерность таблицы, не рекомендуется его удалять
        let tableElementsWidth = ['40%', '30%', '30%'];
        let availableCurrencies = this.props.globalReduser.currencyFilter(this.props.storeState);
        let selectedCurrNumber = this.props.globalReduser.findSelectedCurrency(this, availableCurrencies);
        return (

            <>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />

                <Dialog
                    actions={actions}
                    modal={false}
                    bodyStyle={{ padding: 0 }}
                    contentStyle={isMobile ? customContentStyle : ""}
                    open={this.state.calendarModal}
                    onRequestClose={this.calendarModalShow}
                >
                    <DayPicker
                        selectedDays={this.state.tourSave.calendary}
                        onDayClick={this.handleDayClick}
                    />

                </Dialog>
                {
                    isMobileOnly ?
                        <>
                            <Dialog fullScreen
                                actions={actionTour}
                                modal={false}
                                bodyStyle={{ padding: 0, width: '100%' }}
                                contentStyle={isMobile ? customContentStyle : desktopContentStyle}
                                open={this.state.tourSeatsModal}
                                onRequestClose={() => { }/*this.tourSeatsModalShow*/}
                            >
                                {
                                    TourSeatsModalContent(this, pseudoTableHeaderArray, tableElementsWidth, isErrorBlock,
                                        textPageAgencyProfile.tourSeatsModalContent, this.selectActiveDays, textPageMonthArray)

                                }
                                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
                            </Dialog>
                        </> :
                        <>
                            <Dialog
                                actions={actionTour}
                                modal={false}
                                bodyStyle={{ padding: 0, width: '100%' }}
                                contentStyle={isMobile ? customContentStyle : desktopContentStyle}
                                open={this.state.tourSeatsModal}
                                onRequestClose={() => { }/*this.tourSeatsModalShow*/}
                            >
                                {
                                    TourSeatsModalContent(this, pseudoTableHeaderArray, tableElementsWidth, isErrorBlock,
                                        textPageAgencyProfile.tourSeatsModalContent, this.selectActiveDays, textPageMonthArray)
                                }
                                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
                            </Dialog>
                        </>
                }


                <Collapse isOpen={this.state.collapse}>
                    <div className="tourSettingsBody">
                        <form name='myForm' onSubmit={this.formSubmit} id="newTourForm" className="tourContent col-12 p-0">
                            <div className="languageTourTop d-flex flex-wrap col-12 p-0">
                                {this.state.languageTour.map((element, index) => {
                                    if (element.isTransfer) {
                                        return (
                                            <div className={{ [index]: "languageTourTitleActive", }[this.state.languageTourOpen] + " languageTourTitle"} onClick={() => { this.setState({ languageTourOpen: index }) }}>
                                                <span style={{ backgroundImage: "url(" + requests.serverAddress + element.icon.url + ")" }}>{element.ISO}</span>
                                            </div>
                                        )
                                    }
                                }

                                )}
                            </div>
                            {this.state.tourSave.local.map((element, index) =>
                                <div className={{ [index]: "languageTourItemActive", }[this.state.languageTourOpen] + " languageTourItem"}>
                                    <div className=" tourContentTitle d-flex align-items-center mb-0">
                                        <p>{textPage.tourContentTitle}</p>
                                    </div>
                                    <div className="d-flex flex-md-row flex-column align-items-md-center align-items-start mb-0">
                                        <label htmlFor="nameNewTour" className="d-md-block d-none col-2">{textPage.nameNewTour.floatingLabelText}:</label>
                                        <TextField
                                            floatingLabelText={textPage.nameNewTour.floatingLabelText}
                                            className={"d-md-none d-block inputClass "+('inputTourName'+index)}
                                            fullWidth="100%"
                                            floatingLabelFocusStyle={{ color: "#304269" }}
                                            underlineFocusStyle={{ borderColor: "#304269" }}
                                            value={element.name}
                                            onChange={(e) => {
                                                let obj = document.querySelectorAll('.inputTourName'+index);
                                                if(obj[0]){
                                                    obj[0].classList.remove("errorColor");
                                                }
                                                if(obj[1]){
                                                    obj[1].classList.remove("errorColor");
                                                }  
                                                this.handleChange(e.currentTarget.value, 'name', { number: index })
                                            }}
                                        />
                                        <input className={"d-md-block d-none col-md-4 col-12 "+('inputTourName'+index)} id="nameNewTour" type="text"
                                            value={element.name} onChange={(e) => { 
                                                let obj = document.querySelectorAll('.inputTourName'+index);
                                                if(obj[0]){
                                                    obj[0].classList.remove("errorColor");
                                                }
                                                if(obj[1]){
                                                    obj[1].classList.remove("errorColor");
                                                }  
                                                this.handleChange(e.currentTarget.value, 'name', { number: index })
                                            }} />
                                        <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.nameNewTour.description}</p>
                                    </div>
                                    <div className="d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                        <label htmlFor="newTourAttractions" className="d-md-block d-none col-2">{textPage.newTourAttractions.floatingLabelText}:</label>
                                        <div className="d-flex col-md-4 col-12 p-0" key={element.departurePoint.point}>                                           
                                            <LocationSearchInput address={element.departurePoint &&
                                                element.departurePoint.point !== "" ? element.departurePoint.point : ''} placeholder={textPageAgencyProfile.departurePointPlaceholder}
                                                changeCity={(id, value, extraData) => {
                                                    let tourSave = this.state.tourSave;
                                                    tourSave.local[index].departurePoint = { point: value, lat: extraData.location.lat, long: extraData.location.long };
                                                    let obj = document.querySelectorAll('.departurePointClass'+index);
                                                    if(obj[0]){
                                                        obj[0].classList.remove("errorColor");
                                                    }
                                                    this.setState({ tourSave: tourSave })
                                                }}
                                                classDropdown="searchDropdownDriverTour" id="newTourAttractions" classInput={"w-100 searchInputClass "+('departurePointClass'+index)} classDiv='w-100' />
                                        </div>
                                        <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.newTourAttractions.description}</p>
                                    </div>
                                    <div className="d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                        <label htmlFor="attractionsAlongTheRoute" className="d-md-block d-none col-2">{textPage.attractionsAlongTheRoute.floatingLabelText}:</label>
                                        <div className="d-flex col-md-4 col-12 p-0" key={element.points.length}>
                                            <LocationSearchInput address='' changeCity={(id, value, extraData) => { 
                                                    let obj = document.querySelectorAll('.routePointsClass'+index);
                                                    if(obj[0]){
                                                        obj[0].classList.remove("errorColor");
                                                    }
                                                    this.handleChange(value, "attractionsAlongTheRoute", { number: index, location: extraData.location })
                                                }}
                                                classDropdown="searchDropdownDriverTour" id="attractionsAlongTheRoute" classInput={"w-100 searchInputClass "+('routePointsClass'+index)} classDiv='w-100'
                                                placeholder={textPageAgencyProfile.pointsPlaceholder} />
                                        </div>
                                        <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.attractionsAlongTheRoute.description}</p>
                                    </div>
                                    <div className="d-flex justify-content-end col-12 p-0">
                                        <div className="d-flex flex-wrap col-md-10 col-12 p-0 mb-2">
                                            {element.points.map((element, num) =>
                                                <Chip
                                                    key={element}
                                                    onRequestDelete={() => this.handleRequestDelete(element, "attractionsAlongTheRoute", { number: index })}
                                                    labelStyle={{ color: "#000" }}
                                                    labelColor="#f60"
                                                    textColor="#304269"
                                                    className="chipClass"
                                                >
                                                    {element.point}
                                                </Chip>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start mb-2">
                                        <label htmlFor="newTourDescription" className="d-md-block d-none col-2">{textPage.newTourDescription.floatingLabelText}:</label>
                                        <textarea id="newTourDescription" className={"d-md-block d-none col-md-4 col-12 "+("descriptionClass"+index)} name="" cols="30" rows="3"
                                            onChange={(e) => { 
                                                let obj = document.querySelectorAll('.descriptionClass'+index);
                                                if(obj[0]){
                                                    obj[0].classList.remove("errorColor");
                                                }
                                                if(obj[1]){
                                                    obj[1].classList.remove("errorColor");
                                                }
                                                this.handleChange(e.currentTarget.value, 'info', { number: index })
                                            }} value={element.info} />
                                        <TextField
                                            floatingLabelText={textPage.newTourDescription.floatingLabelText}
                                            className={"d-md-none d-block multiLineInputClass multiLineInputClassAdditional "+("descriptionClass"+index)}
                                            fullWidth="100%"
                                            floatingLabelFocusStyle={{ color: "#304269" }}
                                            underlineFocusStyle={{ borderColor: "#304269" }}
                                            multiLine={true}
                                            rows={1}
                                            value={element.info}
                                            onChange={(e) => {
                                                let obj = document.querySelectorAll('.descriptionClass'+index);
                                                if(obj[0]){
                                                    obj[0].classList.remove("errorColor");
                                                }
                                                if(obj[1]){
                                                    obj[1].classList.remove("errorColor");
                                                } 
                                                this.handleChange(e.currentTarget.value, 'info', { number: index })
                                            }}
                                        />
                                        <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.newTourDescription.description}</p>
                                    </div>
                                </div>
                            )}
                            <div className="paddingL10 d-flex border-top flex-md-row flex-column align-items-start mt-3">
                                <div className="tourContentTitle d-flex align-items-center col-2 p-0">
                                    <p className="mb-0">{textPage.schedule.title}</p>
                                </div>
                                <div className="d-flex flex-column col-md-8 col-12 p-0">
                                    <div className="d-flex p-0">
                                        <div className="tourContentCheckbox">
                                            <label htmlFor="tourContentEveryday">
                                                <input id="tourContentEveryday" checked={this.state.tourSave.daily} onChange={() => { this.state.tourSave.daily = !this.state.tourSave.daily; this.setState({ tourSave: this.state.tourSave }); }} type="checkbox" />
                                                <span />
                                            </label>
                                        </div>
                                        <div className="tourContentEveryday d-flex flex-md-row flex-column  align-items-md-center align-items-start col-md-5 col-10 p-0 mb-0">
                                            <label htmlFor="newTourEveryday" onClick={() => { this.state.tourSave.daily = true; this.setState({ tourSave: this.state.tourSave }); }} className="mt-xl-0 mt-lg-0 mt-md-0 mt-3 pr-2">{textPage.schedule.newTourEveryday}</label>
                                            <FormControl className="d-flex flex-wrap col-md-4 col-12 p-0 mt-2">

                                                <Select
                                                    value={this.state.tourSave.time && this.state.tourSave.time.length>0 ? this.state.tourSave.time : textPage.schedule.timePlaceholder}
                                                    className="dropdownClass dropdownTime"
                                                    style={{ width: "100%", display: this.state.tourSave.daily ? "" : "none" }}
                                                    onChange={(event, index, value) => {
                                                        let obj = document.querySelectorAll('.dropdownTime');
                                                        obj[0].classList.remove("errorColor");
                                                        obj[1].classList.remove("errorColor");
                                                        this.state.tourSave.time = event.target.value; this.setState({ tourSave: this.state.tourSave });
                                                    }}
                                                >
                                                    <MenuItem value={textPage.schedule.timePlaceholder} disabled >{textPage.schedule.timePlaceholder}</MenuItem>
                                                    {this.props.globalReduser.time.map((element, index) =>
                                                        <MenuItem value={element}>{element}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="d-flex col-md-8 col-10 p-0">
                                        <div className="tourContentCheckbox">
                                            <label htmlFor="tourContentOther">
                                                <input id="tourContentOther" checked={!this.state.tourSave.daily} onChange={() => { this.state.tourSave.daily = !this.state.tourSave.daily; this.setState({ tourSave: this.state.tourSave }); }} type="checkbox" />
                                                <span className="tourContentOtherSpan" />
                                            </label>
                                        </div>
                                        <div className="openMultipleDatepicker d-md-flex d-block flex-column justify-content-center ml-1 col-md-8 col-12 mb-0 p-0">
                                            <label htmlFor="newTourDatepicker" onClick={() => { this.state.tourSave.daily = false; this.setState({ tourSave: this.state.tourSave }); }} className="mb-0 mr-2">{textPage.schedule.newTourDatepicker}</label>
                                            <div className="d-flex flex-md-row flex-column  align-items-md-center align-items-start">
                                                <span style={{ display: !this.state.tourSave.daily ? "block" : "none", maxHeight: '40px', width: '100%' }} className="newTourDatepickerSpan" onClick={this.calendarModalShow}>{textPage.schedule.selectDates}</span>
                                                <FormControl className="d-flex flex-wrap col-md-4 col-12 p-0">
                                                    <Select
                                                        value={this.state.tourSave.time && this.state.tourSave.time.length>0 ? this.state.tourSave.time : textPage.schedule.timePlaceholder}
                                                        className="dropdownClass dropdownTime"
                                                        style={{ width: "100%", display: !this.state.tourSave.daily ? "" : "none" }}
                                                        onChange={(event, index, value) => {
                                                            let obj = document.querySelectorAll('.dropdownTime');
                                                            obj[0].classList.remove("errorColor");
                                                            obj[1].classList.remove("errorColor");
                                                            this.state.tourSave.time = event.target.value; this.setState({ tourSave: this.state.tourSave });
                                                        }}
                                                    >
                                                        <MenuItem value={textPage.schedule.timePlaceholder} disabled>{textPage.schedule.timePlaceholder}</MenuItem>
                                                        {this.props.globalReduser.time.map((element, index) =>
                                                            <MenuItem value={element}>{element}</MenuItem>
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={!this.state.tourSave.daily ? "paddingL10 d-flex justify-content-center col-12" : " d-none"}>
                                <div className="d-flex flex-wrap flex-row align-items-start col-md-8 col-12 p-0 mb-2">

                                    {this.state.tourSave.calendary.map((element, index) => {
                                        let day = element.getDate() < 10 ? "0" + element.getDate() : element.getDate();
                                        let month = element.getMonth() + 1 < 10 ? "0" + (element.getMonth() + 1) : element.getMonth() + 1;
                                        let year = element.getFullYear();
                                        let newDate = day + "." + month + "." + year;
                                        return (
                                            <Chip
                                                key={index}
                                                onRequestDelete={() => this.handleRequestDelete(element, "calendary")}
                                                labelStyle={{ color: "#000" }}
                                                labelColor="#f60"
                                                textColor="#304269"
                                                className="chipClass"
                                            >
                                                {newDate}
                                            </Chip>)
                                    })}

                                </div>
                            </div>
                            <div className="paddingL10 tourContentTitle border-top d-flex align-items-center mt-3 mb-0">
                                <p>{textPage.additionalInformation.title}</p>
                            </div>
                            <div className="paddingL10 d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                <label htmlFor="newTourPrice" className="d-md-block d-none col-2">{textPage.additionalInformation.newTourPrice.floatingLabelText}:</label>
                                <div className="d-flex flex-md-row flex-column col-md-4 col-12 p-0">
                                    <TextField
                                        floatingLabelText={textPage.additionalInformation.newTourPrice.floatingLabelText}
                                        className="d-md-none d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}
                                        value={this.state.tourSave.price}
                                        onChange={(e) => {

                                            let obj = document.getElementById('newTourPrice');
                                            obj.classList.remove("errorColor");
                                            this.setState({ tourSave: { ...this.state.tourSave, price: e.currentTarget.value } });
                                        }}
                                    />
                                    <input id="newTourPrice" className="d-md-block d-none col-md-8 col-12 mr-1" type="text"
                                        value={this.state.tourSave.price} onChange={(e) => {

                                            let obj = document.getElementById('newTourPrice');
                                            obj.classList.remove("errorColor");
                                            this.setState({ tourSave: { ...this.state.tourSave, price: e.currentTarget.value } });
                                        }} />
                                    <FormControl className="d-flex flex-wrap col-md-4 col-12 p-0">
                                        {isMobileOnly ?
                                            <InputLabel>{/*textPage.basicInfoLanguage.label*/textPageAgencyProfile.currencyPlaceholder}</InputLabel>
                                        : <div />}
                                        <Select                                  
                                            value={this.state.tourSave.currency && this.state.tourSave.currency.length>0 ? this.state.tourSave.currency : textPageAgencyProfile.currencyPlaceholder}
                                            className="dropdownClass dropdownCurrency"
                                            onChange={(event, index, value) => {
                                                let obj = document.querySelectorAll('dropdownCurrency');
                                                if (obj && obj.length>0) {
                                                    obj[0].classList.remove("errorColor");
                                                }

                                                this.setState({ tourSave: { ...this.state.tourSave, currency: event.target.value } })
                                            }}
                                        >
                                            <MenuItem value={textPageAgencyProfile.currencyPlaceholder} disabled>{textPageAgencyProfile.currencyPlaceholder}</MenuItem>
                                            {availableCurrencies.map((element, index) =>
                                                <MenuItem value={element.id}>{element.ISO}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                </div>
                            </div>
                            <div className="paddingL10 d-flex flex-row align-items-md-center align-items-start">
                                <label className="d-md-block d-none col-2 "></label>
                                <label htmlFor={"isPricePerPersonCheckbox"} style={{ margin: 'auto 0' }}>{textPageAgencyProfile.pricePerPersonPlaceholder}</label>
                                <Checkbox checked={this.state.tourSave.isPricePerPerson} id={"isPricePerPersonCheckbox"} onChange={() => {
                                    let tourSave = this.state.tourSave;
                                    tourSave.isPricePerPerson = !(tourSave.isPricePerPerson); this.setState({ tourSave: tourSave })
                                }} />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPageAgencyProfile.pricePerPersonInfo}</p>
                            </div>

                            <div className="paddingL10 d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                <label htmlFor="newTourPeople" className="d-md-block d-none col-2">{textPage.additionalInformation.newTourPeople}:</label>
                                <input id="newTourPeople" className="d-md-block d-none col-md-4 col-12" type="number"
                                    value={this.state.tourSave.seats} onChange={(e) => {
                                        let obj = document.getElementById('newTourPeople');
                                        obj.classList.remove("errorColor");
                                        this.setState({ tourSave: { ...this.state.tourSave, seats: e.currentTarget.value } })
                                    }
                                    } />
                            </div>
                            <div className="paddingL10 d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                <label htmlFor="daysNumber" className="d-md-block d-none col-2">{textPageAgencyProfile.daysNumber}:</label>
                                <input id="daysNumber" className="d-md-block d-none col-md-4 col-12" type="number"
                                    value={this.state.tourSave.daysNumber} onChange={(e) => {
                                        let obj = document.getElementById('daysNumber');
                                        obj.classList.remove("errorColor");

                                        this.setState({ tourSave: { ...this.state.tourSave, daysNumber: e.currentTarget.value } })

                                    }
                                    } />
                            </div>


                            <ExcursionIncludesBlock that={this} translation={textPageAgencyProfile.excursionIncludesBlock} />

                            <div className="paddingL10 d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                <label className="d-md-block d-none col-2 " style={{ margin: 'auto 0' }}>{/*textPage.additionalInformation.categories.floatingLabelText*/"Языки, на которых будет проходить экскурсия"}:</label>
                                <FormControl className="col-md-4 col-12 p-0">
                                    <Select
                                        value={/*this.state.tourSave.directionId*/textPageAgencyProfile.tourLanguagesPlaceholder}
                                        onChange={(event, index, value) => {

                                            this.handleChange(event.target.value, "tourLanguages");
                                        }}
                                        style={{ width: '100%' }}
                                        className="dropdownClass "
                                    >
                                        <MenuItem value={textPageAgencyProfile.tourLanguagesPlaceholder} disabled>{textPageAgencyProfile.tourLanguagesPlaceholder}</MenuItem>
                                        {this.state.unselectedTourLanguages.map((element, index) =>
                                            <MenuItem value={element}>{element.languageName}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <p className=" d-md-block d-none col-md-6 col-5" style={{ margin: 'auto 0' }}>{/*textPage.additionalInformation.directions.description*/"Здесь осуществляется установка языка, на котором проходит тур."}</p>
                            </div>
                            <div className="paddingL10 d-flex justify-content-end col-12 p-0">
                                <div className="d-flex flex-wrap col-md-10 col-12 p-0 mb-2">
                                    {this.state.tourSave.tourLanguages.map((element, index) =>
                                        <Chip
                                            key={element}
                                            onRequestDelete={() => { this.handleRequestDelete(element, "tourLanguages") }}
                                            labelStyle={{ color: "#000" }}
                                            labelColor="#f60"
                                            textColor="#304269"
                                            className="chipClass"
                                        >
                                            {element.languageName}
                                        </Chip>
                                    )}
                                </div>
                            </div>
                            {
                                //ниже лежат блоки с флагами - directions, categories, tags
                            }
                            <div className="paddingL10 addPhotoTour d-flex flex-column align-items-start mt-3 border-top">
                                <div className="tourContentTitle d-flex align-items-center col-2 p-0" style={{minWidth: '300px'}}>
                                    <p className="mb-0">{textPageAgencyProfile.tourClassification}</p>
                                </div>
                                <div className="d-flex flex-md-row flex-column w-100">
                                    <label className="d-md-block d-none col-2 " style={{ margin: 'auto 0' }}>{textPage.additionalInformation.directions.floatingLabelText}:</label>
                                    <FormControl className="col-md-4 col-12 p-0">
                                        {isMobileOnly ?
                                            <InputLabel>{textPage.directionsValue}</InputLabel>
                                            : <div />}
                                        <Select
                                            value={this.state.tourSave.directionId && this.state.tourSave.directionId.length>0 ? this.state.tourSave.directionId : textPage.directionsValue}
                                            onChange={(event, index, value) => {
                                                this.setState({ tourSave: { ...this.state.tourSave, directionId: event.target.value } })
                                            }}
                                            style={{ width: '100%' }}
                                            className="dropdownClass "
                                        >
                                            <MenuItem value={textPage.directionsValue} disabled>{textPage.directionsValue}</MenuItem>
                                            {this.state.directions.map((element, index) =>
                                                <MenuItem value={element.id}>{element.local.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <p className=" d-md-block d-none col-md-6 col-5" style={{ margin: 'auto 0' }}>{textPage.additionalInformation.directions.description}</p>
                                </div>
                            </div>

                            <div className="paddingL10 d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                <label className="d-md-block d-none col-2 " style={{ margin: 'auto 0' }}>{textPage.additionalInformation.categories.floatingLabelText}:</label>
                                <FormControl className="col-md-4 col-12 p-0">
                                    <Select
                                        value={textPage.categoriesValue}
                                        onChange={(event, index, value) => { this.handleChange(event.target.value, "categories") }}
                                        style={{ width: '100%' }}
                                        className="dropdownClass"
                                    >
                                        <MenuItem value={textPage.categoriesValue} disabled>{textPage.categoriesValue}</MenuItem>
                                        {this.state.tourSave.categoriesUnselected.map((element, index) =>
                                            <MenuItem value={element.key}>{element.value}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.additionalInformation.categories.description}</p>
                            </div>
                            <div className="paddingL10 d-flex justify-content-end col-12 p-0">
                                <div className="d-flex flex-wrap col-md-10 col-12 p-0 mb-2">
                                    {this.state.tourSave.categoriesSelected.map((element, index) =>
                                        <Chip
                                            key={element.key}
                                            onRequestDelete={() => { this.handleRequestDelete(element.key, "categories") }}
                                            labelStyle={{ color: "#000" }}
                                            labelColor="#f60"
                                            textColor="#304269"
                                            className="chipClass"
                                        >
                                            {element.value}
                                        </Chip>
                                    )}
                                </div>
                            </div>

                            <div className="paddingL10 d-flex flex-md-row flex-column align-items-md-center align-items-start">
                                <label className="d-md-block d-none col-2 " style={{ margin: 'auto 0' }}>{textPage.additionalInformation.tags.floatingLabelText}:</label>
                                <FormControl className="col-md-4 col-12 p-0">

                                    <Select
                                        value={textPage.tagsValue}
                                        className="dropdownClass"
                                        style={{ width: '100%' }}
                                        onChange={(event, index, value) => {
                                            this.handleChange(event.target.value, "tags")
                                        }}
                                    >
                                        <MenuItem value={textPage.tagsValue} disabled>{textPage.tagsValue}</MenuItem>
                                        {this.state.tourSave.tagsUnselected.map((element, index) =>
                                            <MenuItem value={element.key}>{element.value}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.additionalInformation.tags.description}</p>
                            </div>
                            <div className="paddingL10 d-flex justify-content-end col-12 p-0">
                                <div className="d-flex flex-wrap col-md-10 col-12 p-0 mb-2">
                                    {this.state.tourSave.tagsSelected.map((element, index) =>
                                        <Chip
                                            key={element}
                                            onRequestDelete={() => this.handleRequestDelete(element.key, "tags")}
                                            labelStyle={{ color: "#000" }}
                                            labelColor="#f60"
                                            textColor="#304269"
                                            className="chipClass"
                                        >
                                            {element.value}
                                        </Chip>
                                    )}
                                </div>
                            </div>
                            
                            {
                                //ниже лежат блоки с фотками
                            }
                            <div className="paddingL10 addPhotoTour d-flex flex-column align-items-start mt-3 border-top">
                                <div className="tourContentTitle d-flex align-items-center col-2 p-0">
                                    <p className="mb-0">{textPageAgencyProfile.imagesLabel}</p>
                                </div>
                                <div className="d-flex flex-md-row flex-column w-100">
                                    <div className=" col-xl-2 col-lg-2 col-md-2 col-12">
                                        <label id="imageLabel" >{textPage.additionalInformation.uploadPhoto}:</label>
                                        <label id="imageLabelError" className="imageLabelError" style={{ display: 'none' }} >{textPage.photos.imageLabelError}</label>
                                    </div>
                                    <div className="tourPhotoMiniContainer d-flex flex-wrap">
                                        <div className="addPhotoTourLabel">
                                            <label htmlFor="addCarFile" ></label>
                                            <input type="file" id="addCarFile" style={{ display: "none" }} multiple onChange={(e) => { this._handleImageChange(e, 'image') }} />
                                        </div>
                                        {this.state.tourSave.image.map((element, index) =>
                                            <div className="position-relative" >
                                                <img src={element} className="tourPhotoMini" alt="add_car" onClick={() => { this.setState({ imagePreviewUrl: this.state.tourSave.image[index] }) }} />
                                                <span onClick={() => { this.state.tourSave.image.splice(index, 1); this.state.tourSave.imageFiles.splice(index, 1); this.setState({ tourSave: { ...this.state.tourSave }, imagePreviewUrl: this.state.tourSave.image[0] }) }}></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="paddingL10 addPhotoTour d-flex flex-md-row flex-column align-items-start mt-3">
                                <div className=" col-xl-2 col-lg-2 col-md-2 col-12">
                                    <label id="imageLabel" >{textPage.photos.mainImageLabel}:</label>
                                    <label id="mainImageLabelError" className="imageLabelError" style={{ display: 'none' }} >{textPage.photos.imageLabelError}</label>
                                </div>
                                <div className="tourPhotoMiniContainer d-flex flex-wrap">

                                    {this.state.tourSave.mainImage.length > 0 ?
                                        <div className="position-relative" style={{ width: '100%' }}>
                                            <img src={this.state.tourSave.mainImage} className="tourPhotoMini" alt="add_mainImage" onClick={() => { this.setState({ imagePreviewUrl: this.state.tourSave.mainImage }) }} />
                                            <span onClick={() => { this.state.tourSave.mainImage = ''; this.state.tourSave.mainImageFile = ""; this.setState({ tourSave: { ...this.state.tourSave }, imagePreviewUrl: '' }) }}></span>
                                        </div>
                                        :
                                        <div className="addPhotoTourLabel">
                                            <label htmlFor="addCarFile2" ></label>
                                            <input type="file" id="addCarFile2" style={{ display: "none" }} multiple onChange={(e) => { this._handleImageChange(e, 'mainImage') }} />
                                        </div>
                                    }
                                </div>
                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.photos.mainImageInfo}</p>
                            </div>
                            <div className="paddingL10 addPhotoTour d-flex flex-md-row flex-column align-items-start mt-3">
                                <div className=" col-xl-2 col-lg-2 col-md-2 col-12">
                                    <label id="imageLabel" >{textPage.photos.blockListLabel}:</label>
                                    <label id="blockListImageLabelError" className="imageLabelError" style={{ display: 'none' }} >{textPage.photos.imageLabelError}</label>
                                </div>
                                <div className="tourPhotoMiniContainer d-flex flex-wrap">

                                    {this.state.tourSave.blockListImage.length > 0 ?
                                        <div className="position-relative" style={{ width: '100%' }}>
                                            <img src={this.state.tourSave.blockListImage} className="tourPhotoMini" alt="add_blockListImage" onClick={() => { this.setState({ imagePreviewUrl: this.state.tourSave.blockListImage }) }} />
                                            <span onClick={() => { this.state.tourSave.blockListImage = ''; this.state.tourSave.blockListImageFile = ""; this.setState({ tourSave: { ...this.state.tourSave }, imagePreviewUrl: '' }) }}></span>
                                        </div>
                                        :
                                        <div className="addPhotoTourLabel">
                                            <label htmlFor="addCarFile3" ></label>
                                            <input type="file" id="addCarFile3" style={{ display: "none" }} multiple onChange={(e) => { this._handleImageChange(e, 'blockListImage') }} />
                                        </div>
                                    }
                                </div>
                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.photos.blockListImageInfo}</p>
                            </div>

                            <div className="paddingL10 tourContentAddButton pb-4 d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center mt-3">
                                <span className="col-2 d-md-block d-none" />
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <button htmlFor="newTourForm" type="submit" className="col-8">{this.state.tourId &&
                                            this.state.tourId.length > 0 ? textPage.additionalInformation.editTour : textPage.additionalInformation.addTour}</button>               
                                        <span className="ml-3" onClick={() => this.toggle()}>{textPage.additionalInformation.cancel}</span>
                                    </div>     
                                    <text className="errorText">
                                        {textPage.errorText}
                                    </text>
                                </div>
                            </div>
                        </form>
                    </div>
                </Collapse>
                <div className="tourBodyElement">
                    <div className="p-0 d-flex  justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-wrap col-12">
                        <div style={{ display: this.state.collapse ? "none" : "block" }} onClick={() => this.toggle()} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" >
                            <div className="filledTourImgAddBg">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <span />
                                    <p>{this.state.tourId && this.state.tourId.length > 0 ? textPage.additionalInformation.editTour : textPage.additionalInformation.addTour}</p>
                                </div>
                            </div>
                        </div>
                        {this.props.globalReduser.profile.tours.map((element, index) =>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
                                <div className="filledCard d-flex flex-column p-0">
                                    <div className="filledCardInformation d-flex flex-column" style={{ position: 'relative' }}>
                                        <div className="filledCardInformationNameCar d-flex d-flex justify-content-end w-100 align-items-center">
                                            <div className="filledCardInformationNameCarDiv">
                                                <label className="cardInformationNameCarIcon"></label>
                                                <div className="filledCardInformationMenu" style={{ height: '130px' }}>
                                                    <p className="filledCardInformationDeleteCar" onClick={() => this.destroy(element)}>{textPage.filledCardInformationMenu.deleteTour}</p>
                                                    <p className="filledCardInformationNameCarEdit" onClick={() => this.toggle(element, { collapse: true })}>{textPage.filledCardInformationMenu.tourEdit}</p>
                                                    <p className="filledCardInformationNameCarEdit" onClick={() => this.changeActive(element)}>{element.onWork ? textPage.filledCardInformationMenu.tourDeactivate : textPage.filledCardInformationMenu.tourActivate}</p>
                                                    <p className="filledCardInformationNameCarEdit" onClick={() => this.tourSeatsModalShow(element)}>{textPageAgencyProfile.seatsModalLabel}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="filledCardImg" onClick={() => this.toggle(element, { collapse: true })}>
                                        <img src={element.blockListImage && element.blockListImage.url ? requests.serverAddress + element.blockListImage.url : ''} className="img-fluid" alt="imgCar" width="100%" height="100%" />
                                    </div>
                                    <div className="cardInformationType d-flex flex-column" style={{/*paddingBottom: 0*/ borderBottom: '1px solid', borderColor: '#666666' }}>
                                        <p> {this.selectTourName(element)}</p>
                                        {
                                            /*
                                            <Stars value={Math.ceil(element.rating * 10) / 10} commentNumber={element.commentNumber +" " + textPageAgencyProfile.comments} valueDisplay={true} commentNumberDisplay={true} />
                                            <div className="settingsTourHeader d-flex pr-1">
                                                <p>{textPage.cardInformation.emptySeats}:</p>
                                                <p>{element.seats}</p>
                                            </div>
                                            <div className="settingsTourPlace d-flex">
                                                <p>{element.local && element.local[0] && element.local[0].points ? element.local[0].points.points : ''}</p>
                                            </div>
                                            */
                                        }

                                    </div>
                                    <div className="cardInformationType d-flex flex-column p-0" /*style={{paddingTop: 0, paddingBottom: 0}}*/>
                                        <div className="d-flex flex-row" style={{ height: '40px' }}>
                                            <div className="d-flex col-6 cardHelpButtonBlocks agencyButtonTextStyle">{textPageAgencyProfile.tourOnSite}</div>
                                            <div className="d-flex flex-row col-6 cardHelpButtonBlocks">
                                                {
                                                    element.local.map((loc, index) => {

                                                        console.log(loc);
                                                        console.log(element);
                                                        if (loc.slug.length > 0) {
                                                            //return(<button>{requests.frontendAddress+'/'+element.countryISO+'-'+loc.langISOAuto+'/tours/'+loc.slug}</button>)
                                                            return (
                                                                <Link style={{ margin: '0 auto' }} to={'/' + element.countryISO + '-' + loc.langISOAuto + '/tours/' + loc.slug} target='_blank'>{loc.language}</Link>
                                                            )
                                                        }
                                                        else {
                                                            return (<React.Fragment />)
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row" onClick={() => this.tourSeatsModalShow(element)}>
                                            <div className="d-flex col-6 cardHelpButtonBlocks agencyButtonTextStyle">{textPageAgencyProfile.seatsTable}</div>
                                            <div className="d-flex flex-column col-6 p-0 agencyButtonStyle justify-content-center ">
                                                <button className="w-100 h-100">
                                                    <div className="agencyCalendarButton" style={{ margin: '0 auto' }}></div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ >
        );
    }
}
const AgencyProfileTour = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileTourClass);

export default AgencyProfileTour;