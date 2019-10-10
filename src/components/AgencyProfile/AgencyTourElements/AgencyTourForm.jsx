import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import { setUrlAddress } from "../../../redusers/ActionGlobal"
import 'react-day-picker/lib/style.css';
import { readAndCompressImage } from 'browser-image-resizer';
import requests from '../../../config';
import LocationSearchInput from '../../home/HomeBody/Search';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';

import ExcursionIncludesBlock from './ExcursionIncludesBlock'

import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const cookies = new Cookies();

export default class AgencyTourForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    formSubmit = (event) => {
        event.preventDefault();
        let { that } = this.props
        if (!that.state.tour.id) {
            this.applyChanges(true);//если новый, то true
        }
        else {
            this.applyChanges(false);
        }

    }

    applyChanges = (type) => {
        
        let { that } = this.props
        let jwt = that.props.globalReduser.readCookie('jwt');

        function checkCorrectTour(tourSave) {
            
            function checkCorrectLocal(local, index) {
                
                console.log('checkCorrectLocal');
                let result = true;
                let isNameGood = local.name && local.name.length > 0;
                let isDeparturePointGood = local.departurePoint && local.departurePoint.point.length > 0;
                let isPointsGood = local.points.length > 0;
                let isInfoGood = local.info.length > 0;
                if (isNameGood || isDeparturePointGood || isPointsGood || isInfoGood) {
                    //if anything is filled by any, even a little bit valid, data
                    //look throw that values and if find fields without data -> turn them red
                    if (!isNameGood) {
                        let obj = document.querySelectorAll('.inputTourName' + index);
                        if (obj[0]) {
                            obj[0].classList.add("errorColor");
                        }
                        if (obj[1]) {
                            obj[1].classList.add("errorColor");
                        }
                        result = false;
                    }
                    if (!isDeparturePointGood) {
                        let obj = document.querySelectorAll('.departurePointClass' + index);
                        if (obj[0]) {
                            obj[0].classList.add("errorColor");
                        }
                        result = false;
                    }
                    if (!isPointsGood) {
                        let obj = document.querySelectorAll('.routePointsClass' + index);
                        if (obj[0]) {
                            obj[0].classList.add("errorColor");
                        }
                        result = false;
                    }
                    if (!isInfoGood) {
                        let obj = document.querySelectorAll('.descriptionClass' + index);
                        if (obj[0]) {
                            obj[0].classList.add("errorColor");
                        }
                        if (obj[1]) {
                            obj[1].classList.add("errorColor");
                        }
                        result = false;
                    }
                }
                else {
                    //if every field is empty, then remove all red
                    let obj = document.querySelectorAll('.inputTourName' + index);
                    if (obj[0]) {
                        obj[0].classList.remove("errorColor");
                    }
                    if (obj[1]) {
                        obj[1].classList.remove("errorColor");
                    }
                    obj = document.querySelectorAll('.departurePointClass' + index);
                    if (obj[0]) {
                        obj[0].classList.remove("errorColor");
                    }
                    obj = document.querySelectorAll('.routePointsClass' + index);
                    if (obj[0]) {
                        obj[0].classList.remove("errorColor");
                    }
                    obj = document.querySelectorAll('.descriptionClass' + index);
                    if (obj[0]) {
                        obj[0].classList.remove("errorColor");
                    }
                    if (obj[1]) {
                        obj[1].classList.remove("errorColor");
                    }
                }
                return result;
            }
            let obj = "";
            let result = true;


            //////////////// local validation
            for (let i = 0; i < tourSave.local.length; i++) {
                let isLocalGood = checkCorrectLocal(tourSave.local[i], i);
                if (!isLocalGood) {
                    result = false;
                }
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
        let errorTextBlock = document.querySelectorAll('.errorText');

        if (errorTextBlock[0]) {
            errorTextBlock[0].classList.remove('d-block');
            errorTextBlock[0].classList.remove('errorColor');
        }
        if (jwt && jwt !== "-" && checkCorrectTour(that.state.tourSave)) {

            let notThisbutthat = that;
            
            that.startRefresher();

            var tourForm = new FormData();
            let tourSave = notThisbutthat.state.tourSave;
            for (let i = 0; i < tourSave.local.length; i++) {
                let preSlug = notThisbutthat.props.globalReduser.convFunc(tourSave.local[i].name, 'ru');
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
            if (that.state.tourId.length === 0) {//если нет id, то это свежак
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
                    notThisbutthat.getProfileData(notThisbutthat.thenFunc, notThisbutthat.catchFunc);
                }
                if (request.readyState === XMLHttpRequest.DONE && request.status === 400) {
                    notThisbutthat.catchFunc();
                }
            }
            request.send(tourForm);
        }
        else {

            let errorTextBlock = document.querySelectorAll('.errorText');
            if (errorTextBlock[0]) {
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

    handleChange = (value, name, params) => {
        let { that } = this.props
        let tourSave = that.state.tourSave;
        switch (name) {
            case "name": {
                if (params && params.number !== undefined) {
                    tourSave.local[params.number].name = value;
                    that.setState({
                        tourSave: tourSave
                    });
                }
                break;
            }
            case "info": {
                if (params && params.number !== undefined) {
                    tourSave.local[params.number].info = value;
                    that.setState({
                        tourSave: tourSave
                    })
                }
                break;
            }
            case "categories": {
                that.categoriesSelected = tourSave.categoriesSelected;
                that.categoriesUnselected = tourSave.categoriesUnselected;

                let objId = that.categoriesUnselected.findIndex(el => el.key === value);
                that.categoriesSelected.push(that.categoriesUnselected[objId]);
                that.categoriesUnselected.splice(objId, 1);
                that.setState({ tourSave: { ...tourSave, categoriesUnselected: that.categoriesUnselected, categoriesSelected: that.categoriesSelected } });
                break;
            }
            case "tags": {
                that.tagsSelected = tourSave.tagsSelected;
                that.tagsUnselected = tourSave.tagsUnselected;

                let objId = that.tagsUnselected.findIndex(el => el.key === value);
                that.tagsSelected.push(that.tagsUnselected[objId]);
                that.tagsUnselected.splice(objId, 1);
                that.setState({ tourSave: { ...tourSave, tagsUnselected: that.tagsUnselected, tagsSelected: that.tagsSelected } });
                break;
            }
            case "typeCar": {
                that.setState({ typeCar: value })
                break;
            }
            case "attractionsAlongTheRoute": {
                tourSave.local[params.number].points.push(
                    {
                        point: value,
                        lat: params.location.lat,
                        long: params.location.long
                    });
                that.setState({ tourSave: tourSave });
                break;
            }
            case "tourLanguages": {

                console.log(that, value, name, params);
                let selectedLanguages = tourSave.tourLanguages;
                let unselectedLanguages = that.state.unselectedTourLanguages;
                let valueIndex = unselectedLanguages.indexOf(value);
                if (valueIndex !== -1) {
                    unselectedLanguages.splice(valueIndex, 1);
                }
                selectedLanguages.push(value);
                tourSave.tourLanguages = selectedLanguages;
                that.setState({
                    tourSave: tourSave,
                    unselectedTourLanguages: unselectedLanguages
                });
            }
            default:
        }
    };

    handleRequestDelete = (element, name, params) => {
        let { that } = this.props
        let tourSave = that.state.tourSave;
        switch (name) {
            case "categories": {
                that.categoriesSelected = tourSave.categoriesSelected;
                that.categoriesUnselected = tourSave.categoriesUnselected;

                let objId = that.categoriesSelected.findIndex(el => el.key === element);
                that.categoriesUnselected.push(that.categoriesSelected[objId]);
                that.categoriesSelected.splice(objId, 1);
                that.setState({ tourSave: { ...tourSave, categoriesUnselected: that.categoriesUnselected, categoriesSelected: that.categoriesSelected } });
                break;
            }
            case "tags": {
                that.tagsSelected = tourSave.tagsSelected;
                that.tagsUnselected = tourSave.tagsUnselected;

                let objId = that.tagsSelected.findIndex(el => el.key === element);
                that.tagsUnselected.push(that.tagsSelected[objId]);
                that.tagsSelected.splice(objId, 1);
                that.setState({ tourSave: { ...tourSave, tagsUnselected: that.tagsUnselected, tagsSelected: that.tagsSelected } });
                break;
            }
            case "calendary": {

                that.calendary = that.state.tourSave.calendary;
                const calendaryToDelete = that.calendary.map((chip) => chip).indexOf(element);
                that.calendary.splice(calendaryToDelete, 1);
                that.setState({ tourSave: { ...tourSave, calendary: that.calendary } });
                break;
            }
            case "attractionsAlongTheRoute": {
                let objId = tourSave.local[params.number].points.findIndex(el => el === element);
                tourSave.local[params.number].points.splice(objId, 1);
                that.setState({ tourSave: { ...tourSave } });
                break;
            }
            case "tourLanguages": {

                console.log(that, element, name, params);
                let selectedLanguages = tourSave.tourLanguages;
                let unselectedLanguages = that.state.unselectedTourLanguages;
                let valueIndex = selectedLanguages.indexOf(element);
                if (valueIndex !== -1) {
                    selectedLanguages.splice(valueIndex, 1);
                }
                unselectedLanguages.push(element);
                tourSave.tourLanguages = selectedLanguages;
                that.setState({
                    tourSave: tourSave,
                    unselectedTourLanguages: unselectedLanguages
                });
            }
            default:
        }
    };

    _handleImageChange = (e, type) => {
        let { that } = this.props
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
                that.startRefresher();
            }

            let file = fullfile[i]

            if (!file.type.match('image')) continue;

            readAndCompressImage(file, that.props.globalReduser.compressConfig)
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
                            let tourSave = that.state.tourSave;
                            tourSave.image.push(img);
                            tourSave.imageFiles.push(sizFile);

                            imageCounter++;

                            if (imageCounter === fullfile.length) {
                                that.setState({
                                    isRefreshExist: false,
                                    isRefreshing: false
                                })
                            }
                            that.setState({
                                tourSave: tourSave,
                                file: file,
                                imagePreviewUrl: img,
                            });
                        }
                        else {
                            if (type === 'mainImage') {
                                var img = reader.result;
                                let tourSave = that.state.tourSave;
                                tourSave.mainImage = img;
                                tourSave.mainImageFile = sizFile;

                                that.setState({
                                    tourSave: tourSave,
                                    file: file,
                                    imagePreviewUrl: img,
                                });
                            }
                            if (type === 'blockListImage') {
                                var img = reader.result;
                                let tourSave = that.state.tourSave;
                                tourSave.blockListImage = img;
                                tourSave.blockListImageFile = sizFile;

                                that.setState({
                                    tourSave: tourSave,
                                    file: file,
                                    imagePreviewUrl: img,
                                });
                            }
                            that.setState({
                                isRefreshExist: false,
                                isRefreshing: false
                            })
                        }
                    }
                    reader.readAsDataURL(sizFile)
                });
        }

    }


    render() {

        let { textPage, that } = this.props
        return (

            <form name='myForm' onSubmit={this.formSubmit} id="newTourForm" className="tourContent col-12 p-0">
                {/* Добавление Локализаций */}
                <div className="languageTourTop d-flex flex-wrap col-12 p-0">
                    {that.state.languageTour.map((element, index) => {
                        if (element.isTransfer) {
                            return (
                                <div className={{ [index]: "languageTourTitleActive", }[that.state.languageTourOpen] + " languageTourTitle"} onClick={() => { that.setState({ languageTourOpen: index }) }}>
                                    <span style={{ backgroundImage: "url(" + requests.serverAddress + element.icon.url + ")" }}>{element.ISO}</span>
                                </div>
                            )
                        }
                    }

                    )}
                </div>
                {that.state.tourSave.local.map((element, index) =>
                    <div className={{ [index]: "languageTourItemActive", }[that.state.languageTourOpen] + " languageTourItem"}>
                        <div className=" tourContentTitle d-flex align-items-center mb-0">
                            <p>{textPage.tourContentTitle}</p>
                        </div>
                        <div className="d-flex flex-md-row flex-column align-items-md-center align-items-start mb-0">
                            <label htmlFor="nameNewTour" className="d-md-block d-none col-2">{textPage.nameNewTour.floatingLabelText}:</label>
                            <TextField
                                floatingLabelText={textPage.nameNewTour.floatingLabelText}
                                className={"d-md-none d-block inputClass " + ('inputTourName' + index)}
                                fullWidth="90%"
                                floatingLabelFocusStyle={{ color: "#304269" }}
                                underlineFocusStyle={{ borderColor: "#304269" }}
                                value={element.name}
                                onChange={(e) => {
                                    let obj = document.querySelectorAll('.inputTourName' + index);
                                    if (obj[0]) {
                                        obj[0].classList.remove("errorColor");
                                    }
                                    if (obj[1]) {
                                        obj[1].classList.remove("errorColor");
                                    }
                                    this.handleChange(e.currentTarget.value, 'name', { number: index })
                                }}
                            />
                            <input className={"d-md-block d-none col-md-4 col-12 " + ('inputTourName' + index)} id="nameNewTour" type="text"
                                value={element.name} onChange={(e) => {
                                    let obj = document.querySelectorAll('.inputTourName' + index);
                                    if (obj[0]) {
                                        obj[0].classList.remove("errorColor");
                                    }
                                    if (obj[1]) {
                                        obj[1].classList.remove("errorColor");
                                    }
                                    this.handleChange(e.currentTarget.value, 'name', { number: index })
                                }} />
                            <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.nameNewTour.description}</p>
                        </div>
                        <div className="d-flex flex-md-row flex-column align-items-md-center align-items-start">
                            <label htmlFor="newTourAttractions" className="d-md-block d-none col-2">{textPage.newTourAttractions.floatingLabelText}:</label>
                            <div className="d-flex col-md-4 col-12 p-md-0 py-2 px-0" key={element.departurePoint.point}>
                                <LocationSearchInput address={element.departurePoint &&
                                    element.departurePoint.point !== "" ? element.departurePoint.point : ''} placeholder={this.props.textPageAgencyProfile.departurePointPlaceholder}
                                    changeCity={(id, value, extraData) => {
                                        let tourSave = that.state.tourSave;
                                        tourSave.local[index].departurePoint = { point: value, lat: extraData.location.lat, long: extraData.location.long };
                                        let obj = document.querySelectorAll('.departurePointClass' + index);
                                        if (obj[0]) {
                                            obj[0].classList.remove("errorColor");
                                        }
                                        that.setState({ tourSave: tourSave })
                                    }}
                                    classDropdown="searchDropdownDriverTour" id="newTourAttractions" classInput={"w-100 searchInputClass " + ('departurePointClass' + index)} classDiv='w-100' />
                            </div>
                            <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.newTourAttractions.description}</p>
                        </div>
                        <div className="d-flex flex-md-row flex-column align-items-md-center align-items-start">
                            <label htmlFor="attractionsAlongTheRoute" className="d-md-block d-none col-2">{textPage.attractionsAlongTheRoute.floatingLabelText}:</label>
                            <div className="d-flex col-md-4 col-12 p-md-0 py-2 px-0" key={element.points.length}>
                                <LocationSearchInput address='' changeCity={(id, value, extraData) => {
                                    let obj = document.querySelectorAll('.routePointsClass' + index);
                                    if (obj[0]) {
                                        obj[0].classList.remove("errorColor");
                                    }
                                    this.handleChange(value, "attractionsAlongTheRoute", { number: index, location: extraData.location })
                                }}
                                    classDropdown="searchDropdownDriverTour" id="attractionsAlongTheRoute" classInput={"w-100 searchInputClass " + ('routePointsClass' + index)} classDiv='w-100'
                                    placeholder={this.props.textPageAgencyProfile.pointsPlaceholder} />
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
                            <textarea id="newTourDescription" className={"d-md-block d-none col-md-4 col-12 " + ("descriptionClass" + index)} name="" cols="30" rows="3"
                                onChange={(e) => {
                                    let obj = document.querySelectorAll('.descriptionClass' + index);
                                    if (obj[0]) {
                                        obj[0].classList.remove("errorColor");
                                    }
                                    if (obj[1]) {
                                        obj[1].classList.remove("errorColor");
                                    }
                                    this.handleChange(e.currentTarget.value, 'info', { number: index })
                                }} value={element.info} />
                            <TextField
                                floatingLabelText={textPage.newTourDescription.floatingLabelText}
                                className={"d-md-none d-block multiLineInputClass multiLineInputClassAdditional " + ("descriptionClass" + index)}
                                fullWidth="90%"
                                floatingLabelFocusStyle={{ color: "#304269" }}
                                underlineFocusStyle={{ borderColor: "#304269" }}
                                multiLine={true}
                                rows={1}
                                value={element.info}
                                onChange={(e) => {
                                    let obj = document.querySelectorAll('.descriptionClass' + index);
                                    if (obj[0]) {
                                        obj[0].classList.remove("errorColor");
                                    }
                                    if (obj[1]) {
                                        obj[1].classList.remove("errorColor");
                                    }
                                    this.handleChange(e.currentTarget.value, 'info', { number: index })
                                }}
                            />
                            <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.newTourDescription.description}</p>
                        </div>
                    </div>
                )}
                <div className="dividingStrip" />
                {/*  */}
                <div className="paddingL10 tourContentBorderTop d-flex flex-md-row flex-column align-items-start mt-3">
                    <div className="tourContentTitle d-flex align-items-center col-2 p-0">
                        <p className="mb-0">{textPage.schedule.title}</p>
                    </div>
                    <div className="d-flex flex-column col-md-8 col-12 p-0">
                        <div className="d-flex p-0">
                            <div className="tourContentCheckbox">
                                <label htmlFor="tourContentEveryday">
                                    <input id="tourContentEveryday" checked={that.state.tourSave.daily} onChange={() => { that.state.tourSave.daily = !that.state.tourSave.daily; that.setState({ tourSave: that.state.tourSave }); }} type="checkbox" />
                                    <span />
                                </label>
                            </div>
                            <div className="tourContentEveryday d-flex flex-md-row flex-column  align-items-md-center align-items-start col-md-5 col-10 p-0 mb-0">
                                <label htmlFor="newTourEveryday" onClick={() => { that.state.tourSave.daily = true; that.setState({ tourSave: that.state.tourSave }); }} className="mt-xl-0 mt-lg-0 mt-md-0 mt-3 pr-2">{textPage.schedule.newTourEveryday}</label>
                                <FormControl className="d-flex flex-wrap col-md-4 col-12 p-0 mt-2">

                                    <Select
                                        value={that.state.tourSave.time && that.state.tourSave.time.length > 0 ? that.state.tourSave.time : textPage.schedule.timePlaceholder}
                                        className="dropdownClass dropdownTime"
                                        style={{ width: "100%", display: that.state.tourSave.daily ? "" : "none" }}
                                        onChange={(event, index, value) => {
                                            let obj = document.querySelectorAll('.dropdownTime');
                                            obj[0].classList.remove("errorColor");
                                            obj[1].classList.remove("errorColor");
                                            that.state.tourSave.time = event.target.value; that.setState({ tourSave: that.state.tourSave });
                                        }}
                                    >
                                        <MenuItem value={textPage.schedule.timePlaceholder} disabled >{textPage.schedule.timePlaceholder}</MenuItem>
                                        {that.props.globalReduser.time.map((element, index) =>
                                            <MenuItem value={element}>{element}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="d-flex col-md-8 col-10 p-0">
                            <div className="tourContentCheckbox">
                                <label htmlFor="tourContentOther">
                                    <input id="tourContentOther" checked={!that.state.tourSave.daily} onChange={() => { that.state.tourSave.daily = !that.state.tourSave.daily; that.setState({ tourSave: that.state.tourSave }); }} type="checkbox" />
                                    <span className="tourContentOtherSpan" />
                                </label>
                            </div>
                            <div className="openMultipleDatepicker d-md-flex d-block flex-column justify-content-center ml-1 col-md-8 col-12 mb-0 p-0">
                                <label htmlFor="newTourDatepicker" onClick={() => { that.state.tourSave.daily = false; that.setState({ tourSave: that.state.tourSave }); }} className="mb-0 mr-2">{textPage.schedule.newTourDatepicker}</label>
                                <div className="d-flex flex-md-row flex-column  align-items-md-center align-items-start">
                                    <span style={{ display: !that.state.tourSave.daily ? "block" : "none", maxHeight: '40px', width: '100%' }} className="newTourDatepickerSpan" onClick={that.calendarModalShow}>{textPage.schedule.selectDates}</span>
                                    <FormControl className="d-flex flex-wrap col-md-4 col-12 p-0">
                                        <Select
                                            value={that.state.tourSave.time && that.state.tourSave.time.length > 0 ? that.state.tourSave.time : textPage.schedule.timePlaceholder}
                                            className="dropdownClass dropdownTime"
                                            style={{ width: "100%", display: !that.state.tourSave.daily ? "" : "none" }}
                                            onChange={(event, index, value) => {
                                                let obj = document.querySelectorAll('.dropdownTime');
                                                obj[0].classList.remove("errorColor");
                                                obj[1].classList.remove("errorColor");
                                                that.state.tourSave.time = event.target.value; that.setState({ tourSave: that.state.tourSave });
                                            }}
                                        >
                                            <MenuItem value={textPage.schedule.timePlaceholder} disabled>{textPage.schedule.timePlaceholder}</MenuItem>
                                            {that.props.globalReduser.time.map((element, index) =>
                                                <MenuItem value={element}>{element}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={!that.state.tourSave.daily ? "paddingL10 d-flex justify-content-center col-12" : " d-none"}>
                    <div className="d-flex flex-wrap flex-row align-items-start col-md-8 col-12 p-0 mb-2">

                        {that.state.tourSave.calendary.map((element, index) => {
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
                <div className="dividingStrip" />
                <div className="paddingL10 tourContentTitle tourContentBorderTop d-flex align-items-center mt-3 mb-0">
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
                            value={that.state.tourSave.price}
                            onChange={(e) => {

                                let obj = document.getElementById('newTourPrice');
                                obj.classList.remove("errorColor");
                                that.setState({ tourSave: { ...that.state.tourSave, price: e.currentTarget.value } });
                            }}
                        />
                        <input id="newTourPrice" className="d-md-block d-none col-md-8 col-12 mr-1" type="text"
                            value={that.state.tourSave.price} onChange={(e) => {

                                let obj = document.getElementById('newTourPrice');
                                obj.classList.remove("errorColor");
                                that.setState({ tourSave: { ...that.state.tourSave, price: e.currentTarget.value } });
                            }} />
                        <FormControl className="d-flex flex-wrap col-md-4 col-12 p-0">
                            {isMobileOnly ?
                                <InputLabel>{/*textPage.basicInfoLanguage.label*/this.props.textPageAgencyProfile.currencyPlaceholder}</InputLabel>
                                : <div />}
                            <Select
                                value={that.state.tourSave.currency && that.state.tourSave.currency.length > 0 ? that.state.tourSave.currency : this.props.textPageAgencyProfile.currencyPlaceholder}
                                className="dropdownClass dropdownCurrency"
                                onChange={(event, index, value) => {
                                    let obj = document.querySelectorAll('dropdownCurrency');
                                    if (obj && obj.length > 0) {
                                        obj[0].classList.remove("errorColor");
                                    }

                                    that.setState({ tourSave: { ...that.state.tourSave, currency: event.target.value } })
                                }}
                            >
                                <MenuItem value={this.props.textPageAgencyProfile.currencyPlaceholder} disabled>{this.props.textPageAgencyProfile.currencyPlaceholder}</MenuItem>
                                {this.props.availableCurrencies.map((element, index) =>
                                    <MenuItem value={element.id}>{element.ISO}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                    </div>
                </div>
                <div className="paddingL10 d-flex flex-row align-items-md-center align-items-start">
                    <label className="d-md-block d-none col-2 "></label>
                    <label htmlFor={"isPricePerPersonCheckbox"} style={{ margin: 'auto 0' }}>{this.props.textPageAgencyProfile.pricePerPersonPlaceholder}</label>
                    <Checkbox checked={that.state.tourSave.isPricePerPerson} id={"isPricePerPersonCheckbox"} onChange={() => {
                        let tourSave = that.state.tourSave;
                        tourSave.isPricePerPerson = !(tourSave.isPricePerPerson); that.setState({ tourSave: tourSave })
                    }} />
                    <p className=" d-md-block d-none m-0 col-md-6 col-5">{this.props.textPageAgencyProfile.pricePerPersonInfo}</p>
                </div>

                <div className="paddingL10 d-flex flex-md-row flex-column align-items-md-center align-items-start">
                    <label htmlFor="newTourPeople" className="d-md-block d-none col-2">{textPage.additionalInformation.newTourPeople}:</label>
                    <input id="newTourPeople" className="d-md-block d-none col-md-4 col-12" type="number"
                        value={that.state.tourSave.seats} onChange={(e) => {
                            let obj = document.getElementById('newTourPeople');
                            obj.classList.remove("errorColor");
                            that.setState({ tourSave: { ...that.state.tourSave, seats: e.currentTarget.value } })
                        }
                        } />
                    <TextField
                        floatingLabelText={textPage.additionalInformation.newTourPeople}
                        className="d-md-none d-block inputClass"
                        fullWidth="100%"
                        floatingLabelFocusStyle={{ color: "#304269" }}
                        underlineFocusStyle={{ borderColor: "#304269" }}
                        value={that.state.tourSave.seats}
                        onChange={(e) => {

                            let obj = document.getElementById('newTourPeople');
                            obj.classList.remove("errorColor");
                            that.setState({ tourSave: { ...that.state.tourSave, seats: e.currentTarget.value } });
                        }}
                    />
                </div>
                <div className="paddingL10 d-flex flex-md-row flex-column align-items-md-center align-items-start">
                    <label htmlFor="daysNumber" className="d-md-block d-none col-2">{this.props.textPageAgencyProfile.daysNumber}:</label>
                    <input id="daysNumber" className="d-md-block d-none col-md-4 col-12" type="number"
                        value={that.state.tourSave.daysNumber} onChange={(e) => {
                            let obj = document.getElementById('daysNumber');
                            obj.classList.remove("errorColor");

                            that.setState({ tourSave: { ...that.state.tourSave, daysNumber: e.currentTarget.value } })

                        }
                        } />
                </div>


                <ExcursionIncludesBlock that={this.props.that} translation={this.props.textPageAgencyProfile.excursionIncludesBlock} />

                <div className="paddingL10 d-flex flex-md-row flex-column align-items-md-center align-items-start">
                    <label className="d-md-block d-none col-2 " style={{ margin: 'auto 0' }}>{/*textPage.additionalInformation.categories.floatingLabelText*/"Языки, на которых будет проходить экскурсия"}:</label>
                    <FormControl className="col-md-4 col-12 p-0">
                        <Select
                            value={/*this.state.tourSave.directionId*/this.props.textPageAgencyProfile.tourLanguagesPlaceholder}
                            onChange={(event, index, value) => {

                                this.handleChange(event.target.value, "tourLanguages");
                            }}
                            style={{ width: '100%' }}
                            className="dropdownClass "
                        >
                            <MenuItem value={this.props.textPageAgencyProfile.tourLanguagesPlaceholder} disabled>{this.props.textPageAgencyProfile.tourLanguagesPlaceholder}</MenuItem>
                            {that.state.unselectedTourLanguages.map((element, index) =>
                                <MenuItem value={element}>{element.languageName}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <p className=" d-md-block d-none col-md-6 col-5" style={{ margin: 'auto 0' }}>{/*textPage.additionalInformation.directions.description*/"Здесь осуществляется установка языка, на котором проходит тур."}</p>
                </div>
                <div className="paddingL10 d-flex justify-content-end col-12 p-0">
                    <div className="d-flex flex-wrap col-md-10 col-12 p-0 mb-2">
                        {that.state.tourSave.tourLanguages.map((element, index) =>
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
                <div className="dividingStrip" />
                <div className="paddingL10 addPhotoTour d-flex flex-column align-items-start mt-3 tourContentBorderTop">
                    <div className="tourContentTitle d-flex align-items-center col-2 p-0" style={{ minWidth: '300px' }}>
                        <p className="mb-0">{this.props.textPageAgencyProfile.tourClassification}</p>
                    </div>
                    <div className="d-flex flex-md-row flex-column w-100">
                        <label className="d-md-block d-none col-2 " style={{ margin: 'auto 0' }}>{textPage.additionalInformation.directions.floatingLabelText}:</label>
                        <FormControl className="col-md-4 col-12 p-0">
                            {/*isMobileOnly ?
                            <InputLabel>{textPage.directionsValue}</InputLabel>
                            : <div />*/}
                            <Select
                                value={that.state.tourSave.directionId && that.state.tourSave.directionId.length > 0 ? that.state.tourSave.directionId : textPage.directionsValue}
                                onChange={(event, index, value) => {
                                    that.setState({ tourSave: { ...that.state.tourSave, directionId: event.target.value } })
                                }}
                                style={{ width: '100%' }}
                                className="dropdownClass "
                            >
                                <MenuItem value={textPage.directionsValue} disabled>{textPage.directionsValue}</MenuItem>
                                {that.state.directions.map((element, index) =>
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
                            {that.state.tourSave.categoriesUnselected.map((element, index) =>
                                <MenuItem value={element.key}>{element.value}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.additionalInformation.categories.description}</p>
                </div>
                <div className="paddingL10 d-flex justify-content-end col-12 p-0">
                    <div className="d-flex flex-wrap col-md-10 col-12 p-0 mb-2">
                        {that.state.tourSave.categoriesSelected.map((element, index) =>
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
                            {that.state.tourSave.tagsUnselected.map((element, index) =>
                                <MenuItem value={element.key}>{element.value}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.additionalInformation.tags.description}</p>
                </div>
                <div className="paddingL10 d-flex justify-content-end col-12 p-0">
                    <div className="d-flex flex-wrap col-md-10 col-12 p-0 mb-2">
                        {that.state.tourSave.tagsSelected.map((element, index) =>
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
                <div className="dividingStrip" />
                <div className="paddingL10 addPhotoTour d-flex flex-column align-items-start mt-3 tourContentBorderTop">
                    <div className="tourContentTitle d-flex align-items-center col-2 p-0">
                        <p className="mb-0">{this.props.textPageAgencyProfile.imagesLabel}</p>
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
                            {that.state.tourSave.image.map((element, index) =>
                                <div className="position-relative" >
                                    <img src={element} className="tourPhotoMini" alt="add_car" onClick={() => { that.setState({ imagePreviewUrl: that.state.tourSave.image[index] }) }} />
                                    <span onClick={() => { that.state.tourSave.image.splice(index, 1); that.state.tourSave.imageFiles.splice(index, 1); that.setState({ tourSave: { ...that.state.tourSave }, imagePreviewUrl: that.state.tourSave.image[0] }) }}></span>
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

                        {that.state.tourSave.mainImage.length > 0 ?
                            <div className="position-relative" style={{ width: '100%' }}>
                                <img src={that.state.tourSave.mainImage} className="tourPhotoMini" alt="add_mainImage" onClick={() => { that.setState({ imagePreviewUrl: that.state.tourSave.mainImage }) }} />
                                <span onClick={() => { that.state.tourSave.mainImage = ''; that.state.tourSave.mainImageFile = ""; that.setState({ tourSave: { ...that.state.tourSave }, imagePreviewUrl: '' }) }}></span>
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

                        {that.state.tourSave.blockListImage.length > 0 ?
                            <div className="position-relative" style={{ width: '100%' }}>
                                <img src={that.state.tourSave.blockListImage} className="tourPhotoMini" alt="add_blockListImage" onClick={() => { that.setState({ imagePreviewUrl: that.state.tourSave.blockListImage }) }} />
                                <span onClick={() => { that.state.tourSave.blockListImage = ''; that.state.tourSave.blockListImageFile = ""; that.setState({ tourSave: { ...that.state.tourSave }, imagePreviewUrl: '' }) }}></span>
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

                <div className="paddingL10 tourContentAddButton pb-4 d-flex justify-content-md-start  justify-content-end mt-3">
                    <span className="col-2 d-md-block d-none" />
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row">
                        <span className="mr-4" onClick={() => that.toggle()}>{textPage.additionalInformation.cancel}</span>
                            <button htmlFor="newTourForm" type="submit" className="mr-5" style={{ whiteSpace: 'nowrap' }}>{this.state.tourId &&
                                that.state.tourId.length > 0 ? textPage.additionalInformation.editTour : textPage.additionalInformation.addTour}</button>
                            
                        </div>
                        <text className="errorText">
                            {textPage.errorText}
                        </text>
                    </div>
                </div>
            </form>

        )
    }
}
