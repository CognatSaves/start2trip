import React from 'react';
import { connect } from 'react-redux';
import { isMobile, isMobileOnly } from 'react-device-detect';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import 'react-day-picker/lib/style.css';
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import { Collapse } from 'reactstrap'
import DayPicker, { DateUtils } from 'react-day-picker';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

import TourSeatsModalContent from './AgencyTourElements/TourSeatsModalContent'
import AgencyTourForm from './AgencyTourElements/AgencyTourForm'

const cookies = new Cookies();


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

            errorStringVisibility: false,
            errorString: ""
        }
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
                unselectedTourLanguages: [...this.props.storeState.untranslatedlanguages]
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
                        language: this.props.storeState.untranslatedlanguages[i].ISO
                    }
                }
            }
            for (let i = 0; i < element.local.length; i++) {
                for (let j = 0; j < local.length; j++) {
                    if (element.local[i].language === local[j].language) {
                        local[j] = { ...local[j], ...element.local[i] }
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
            for (let i = 0; i < this.props.storeState.untranslatedlanguages.length; i++) {
                let viewedLanguage = this.props.storeState.untranslatedlanguages[i];
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
            startRefresherGlobal(this,true)
            let that = this;
            var tourForm = new FormData();
            tourForm.append('onWork', !element.onWork);
            const request = new XMLHttpRequest();
            request.open('PUT', requests.userTourActivateRequest + '/' + element.id);
            request.setRequestHeader('Authorization', `Bearer ${jwt}`);
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    console.log(request.responseText);
                    getUserData((obj)=>{thenFuncGlobal(obj, that.setState({collapse: false,
                        languageTour: [...this.props.storeState.untranslatedlanguages]}))}, catchFuncGlobal,that);
                }
                if (request.readyState === XMLHttpRequest.DONE && request.status === 0) {
                    catchFuncGlobal(that)
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
            startRefresherGlobal(this,true)
            let that = this;
            const request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    console.log(request.responseText);
                    getUserData((obj)=>{thenFuncGlobal(obj, that.setState({collapse: false,
                        languageTour: [...this.props.storeState.untranslatedlanguages]}))}, catchFuncGlobal,that);
                }
                if (request.readyState === XMLHttpRequest.DONE && request.status === 0) {
                    catchFuncGlobal(that);
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
    toggle = (element, props) => {
        function removeErrorColorElems() {
            //function must remove all colorification from blocks that created by validator
            let errorTextBlock = document.querySelectorAll('.errorText');
            if (errorTextBlock[0]) {
                errorTextBlock[0].classList.remove('d-block');
                errorTextBlock[0].classList.remove('errorColor');
            }
            let errorElements = document.querySelectorAll('.errorColor');
            for (let i = 0; i < errorElements.length; i++) {
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
        if (jwt) {

            let body = JSON.stringify({
                tour: that.state.tourSeatsModalSelectedElement.id,
                tourSeatsData: that.state.tourSeatsBlocks
            })
            startRefresherGlobal(that,true)
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
                        })
                        thenFuncGlobal(that);

                        //that.tourSeatsModalShow();
                        /*that.setState({
                            tourSeatsModalSelectedElement:undefined,
                            tourSeatsSelectedDays: [],
                            tourSeatsBlocks:[],
                        })*/
                    }
                })
                .catch(error => {
                    catchFuncGlobal(that);
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
        console.log("*****************");
        console.log('tourId=', this.state.tourId);
        let buttonText = this.state.tourId && this.state.tourId.length > 0 ? textPage.additionalInformation.editTour : textPage.additionalInformation.addTour;
        console.log('buttonText=',buttonText);
        return (

            <>

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
                                <TourSeatsModalContent that={this} pseudoTableHeaderArray={pseudoTableHeaderArray}
                                    tableElementsWidth={tableElementsWidth} isErrorBlock={isErrorBlock} translation={textPageAgencyProfile.tourSeatsModalContent}
                                    selectActiveDays={this.selectActiveDays} textPageMonthArray={textPageMonthArray} />
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
                                <TourSeatsModalContent that={this} pseudoTableHeaderArray={pseudoTableHeaderArray}
                                    tableElementsWidth={tableElementsWidth} isErrorBlock={isErrorBlock} translation={textPageAgencyProfile.tourSeatsModalContent}
                                    selectActiveDays={this.selectActiveDays} textPageMonthArray={textPageMonthArray} />
                            </Dialog>
                        </>
                }


                <Collapse isOpen={this.state.collapse}>
                    <div className="tourSettingsBody">
                        <AgencyTourForm that={this} availableCurrencies={availableCurrencies}
                            textPageAgencyProfile={textPageAgencyProfile} textPage={textPage} />

                    </div>
                </Collapse>
                <div className="tourBodyElement">
                    <div className="p-0 d-flex  justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center flex-wrap col-12">
                        <div style={{ display: this.state.collapse ? "none" : "block" }} onClick={() => this.toggle()} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" >
                            <div className="filledTourImgAddBg">
                                <div className="d-flex flex-column justify-content-center align-items-center" key = {this.state.tourId}>
                                    <span />
                                    {
                                        this.state.tourId && this.state.tourId.length > 0 ? 
                                        <p>{textPage.additionalInformation.editTour}</p> : 
                                        <p>{textPage.additionalInformation.addTour}</p>
                                    }
                                    {
                                        /*
                                        <p>{buttonText}</p>
                                        */
                                    }

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