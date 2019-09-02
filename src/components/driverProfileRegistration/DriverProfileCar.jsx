import React from 'react'
import 'react-telephone-input/lib/withStyles'
import { connect } from 'react-redux'
import { Collapse } from 'reactstrap'
import { isMobileOnly } from 'react-device-detect'
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import config from '../../config';
import requests from '../../config';
import getUserData from './DriverProfileRequest';

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import { readAndCompressImage } from 'browser-image-resizer';

// import RefreshIndicator from 'material-ui/RefreshIndicator';

import DriverRefreshIndicator from './DriverRefreshIndicator';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class DriverProfileCarClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.globalReduser.profile;
        console.log('DriverProfileCarClass constructor');
        this.state = {
            comfort: [false, false, false, false],
            carImg: [],
            imgFiles: [],
            file: '',
            imagePreviewUrl: '',
            collapse: false,
            newCarCard: { nameCar: "", yearCar: "", plateNumberCar: "", typeCar: "", fuelType: "", fuelConsumption: "", carClass: "", onWork: true, numberOfSeats: "" },
            car: {},
            isRefreshExist: false,
            isRefreshing: true,
            isGoodAnswer: true,
            badDataTextVisibility: false
        }
    }

    getProfileData = (thenFunc, catchFunc) => {
        console.log('getProfileData');
        let that = this;
        let requestValues = {
            readCookie: this.props.globalReduser.readCookie,
            setProfileData: function (data) {
                that.props.dispatch(setProfileData(data))
            },
            requestAddress: requests.profileRequest
        };
        getUserData(requestValues, thenFunc, catchFunc);
    }
    startRefresher = () => {
        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
    }
    thenFunc = () => {
        console.log('thenFunc');
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
    applyChanges = (type) => {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(this.state.badDataTextVisibility===true){
            this.setState({
                badDataTextVisibility: false
            })
        }

        function checkCorrectData(newCarCard, imgFiles, that) {
            let result = true;
            let obj;

            if (newCarCard.nameCar.length === 0) {
                obj = document.getElementById('profileCarBrand');
                obj.classList.add("errorColor");
                obj = document.querySelectorAll('.inputClass');
                obj[0].classList.add("errorColor");
                result = false;
            }
            if (newCarCard.yearCar.length === 0 || isNaN(newCarCard.yearCar)) {
                obj = document.getElementById('profileCarYear');
                obj.classList.add("errorColor");
                obj = document.querySelectorAll('.inputClass');
                obj[1].classList.add("errorColor");
                result = false;
            }
            if (newCarCard.plateNumberCar.length === 0) {
                obj = document.getElementById('profileCarNumber');
                obj.classList.add("errorColor");
                obj = document.querySelectorAll('.inputClass');
                obj[2].classList.add("errorColor");
                result = false;
            }
            
            if (newCarCard.fuelConsumption.length === 0 || isNaN(newCarCard.fuelConsumption) || Number(newCarCard.fuelConsumption) <= 0) {
                obj = document.getElementById('profileCarFuelConsumption');
                obj.classList.add("errorColor");

                obj = document.querySelectorAll('.inputClass');
                obj[3].classList.add("errorColor");
                result = false;
            }
            if (newCarCard.numberOfSeats.length === 0 || isNaN(newCarCard.numberOfSeats) || Number(newCarCard.numberOfSeats) <= 0) {
                obj = document.getElementById('profileCarNumberOfSeats');
                obj.classList.add("errorColor");

                obj = document.querySelectorAll('.inputClass');
                obj[4].classList.add("errorColor");
                result = false;
            }

            //let fuelConsumption =  Number(newCarCard.fuelConsumption);
            //let b = (fuelConsumption<=0);
            
            if (newCarCard.typeCar.length === 0) {
                obj = document.querySelectorAll('.dropdownClass');
                obj[0].classList.add("errorColor");
                result = false;
            }
            if (newCarCard.fuelType.length === 0) {
                obj = document.querySelectorAll('.dropdownClass');
                obj[2].classList.add("errorColor");
                result = false;
            }
            if (newCarCard.carClass.length === 0) {
                obj = document.querySelectorAll('.dropdownClass');
                obj[1].classList.add("errorColor");
                result = false;
            }
            if (imgFiles.length === 0) {
                obj = document.getElementById('labelCarEmpty');
                obj.style.visibility = 'visible';
                result = false;
            }
            if(!result){
                that.setState({
                    badDataTextVisibility: true
                })
            }
            return result;
        }

        if (jwt && jwt !== "-" && checkCorrectData(this.state.newCarCard, this.state.imgFiles, this)) {
            let that = this;
            this.startRefresher();
            var carForm = new FormData();
            carForm.append('carBrand', this.state.newCarCard.nameCar);
            carForm.append('manufactureYear', this.state.newCarCard.yearCar);
            carForm.append('carNumber', this.state.newCarCard.plateNumberCar);
            carForm.append('seats', this.state.newCarCard.numberOfSeats);
            carForm.append('fueltype', this.state.newCarCard.fuelType);
            carForm.append('cartype', this.state.newCarCard.typeCar);
            carForm.append('carclass', this.state.newCarCard.carClass);
            carForm.append('fuelConsumption', this.state.newCarCard.fuelConsumption);
            carForm.append('onWork', true);
            let comfort = this.state.comfort;
            carForm.append('climatControl', comfort[0]);
            carForm.append('leatherInterior', comfort[1]);
            carForm.append('freeWiFi', comfort[2]);
            carForm.append('smokingPermit', comfort[3]);
            for (let i = 0; i < this.state.imgFiles.length; i++) {
                carForm.append('image', this.state.imgFiles[i]);
            }
            const request = new XMLHttpRequest();
            if (type) {
                request.open('PUT', requests.userCarsCreateRequest);
                request.setRequestHeader('Authorization', `Bearer ${jwt}`);
            }
            else {
                let fileTypeArray = [];
                for (let i = 0; i < this.state.imgFiles.length; i++) {
                    if (this.state.imgFiles[i].name === "filename") {
                        fileTypeArray[i] = "old";
                        carForm.append('fileType', 'old');
                        carForm.append('address', this.state.carImg[i]);
                    }
                    else {
                        fileTypeArray[i] = "new";
                        carForm.append('fileType', 'new');
                        carForm.append('address', 'check new file');
                    }
                }
                request.open('PUT', requests.userCarUpdateRequest + '/' + this.state.car.id);
                request.setRequestHeader('Authorization', `Bearer ${jwt}`);

            }
            request.onreadystatechange = function () {


                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    console.log(request.responseText);
                    that.getProfileData(that.thenFunc, that.catchFunc);
                }
                if (request.readyState === XMLHttpRequest.DONE && request.status === 0) {
                    that.catchFunc();
                }
            }
            request.send(carForm);
            //document.location.reload(true);
        }
        else {
            if (jwt && jwt !== "-") {

            }
            else {
                this.props.dispatch(setUrlAddress(window.location.pathname));
                this.props.history.push('/'+ cookies.get('userLangISO', { path: "/" }) +'/login/');
                //return null;
            }
        }

    }
    formSubmit = (event) => {

        console.log('formSubmit');
        if (!this.state.car.id) {
            this.applyChanges(true);//если новый, то true
        }
        else {
            this.applyChanges(false);
        }
        event.preventDefault();
    }

    toggle = (element) => {
        if (!element) {
            this.setState(state => ({
                collapse: !state.collapse, imagePreviewUrl: '',
                newCarCard: { nameCar: "", yearCar: "", plateNumberCar: "", typeCar: "", fuelType: "", fuelConsumption: "", carClass: "", onWork: true, numberOfSeats: "" },
                comfort: [false, false, false, false], carImg: [], imgFiles: [], car: {}
            }));
        }
        else {
            let carImg = []; let imgFiles = [];
            for (let i = 0; i < element.image.length; i++) {
                carImg[i] = requests.serverAddressImg + element.image[i].url;
                imgFiles[i] = new File([""], "filename");
            }
            this.setState(state => ({
                collapse: true, imagePreviewUrl: carImg[0] ? carImg[0] : '',
                newCarCard: {
                    nameCar: element.carBrand, yearCar: element.manufactureYear, plateNumberCar: element.carNumber,
                    typeCar: element.cartype, fuelType: element.fueltype, numberOfSeats: element.seats, carClass: element.carclass,
                    fuelConsumption: element.fuelConsumption
                },
                comfort: [...element.conveniences], carImg: carImg, imgFiles: imgFiles, car: element
            }));
        }
        if (isMobileOnly) {
            window.scroll({
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
    changeActive = (element) => {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            this.startRefresher();
            let that = this;
            var carForm = new FormData();
            carForm.append('onWork', !element.onWork);
            const request = new XMLHttpRequest();
            request.open('PUT', requests.userCarActivateRequest + '/' + element.id);
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
            request.onmessage =
                request.send(carForm);
            //document.location.reload(true);
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/'+ cookies.get('userLangISO', { path: "/" }) +'/login/');
            //return null;
        }
    }
    destroy = (element) => {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            this.startRefresher();
            let that = this;
            console.log('try to destroy a car');
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
            request.open('DELETE', requests.userCarDestroyRequest + "/" + element.id);
            request.setRequestHeader('Authorization', `Bearer ${jwt}`);
            request.send();
            //document.location.reload(true);
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/'+ cookies.get('userLangISO', { path: "/" }) +'/login/');
            //return null;
        }
    }

    _handleImageChange = (e) => {
        //debugger;
        e.preventDefault();

        let obj = document.getElementById('labelCarEmpty');
        obj.style.visibility = 'hidden';

        let fullfile = e.target.files;
        let imageCounter = 0;
        for (let i = 0; i < fullfile.length; i++) {
            if (i === 0) {
                this.startRefresher();
            }
            let file = fullfile[i]
            if (!file.type.match('image')) continue;
            readAndCompressImage(file, /*config*/this.props.globalReduser.compressConfig)
                .then(resizedImage => {
                    let sizFile = new File([resizedImage], file.name);
                    return sizFile;
                })
                .then(sizFile => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        var img = reader.result;
                        let imgFiles = this.state.imgFiles;
                        imgFiles.push(sizFile);
                        imageCounter++;


                        if (imageCounter === fullfile.length) {
                            this.setState({
                                isRefreshExist: false,
                                isRefreshing: false
                            })
                        }
                        this.setState({
                            file: sizFile,
                            imagePreviewUrl: img,
                            imgFiles: imgFiles
                        });
                        this.setState(state => { const carImg = this.state.carImg.push(img); return carImg });
                    }
                    reader.readAsDataURL(sizFile)
                });
        }
    }

    handleChange = (event, index, value, key) => {
        if (key === 'fuelTypes') {
            this.setState({
                newCarCard: { ...this.state.newCarCard, fuelType: value, badDataTextVisibility: false }
            })
        }
        if (key === 'carTypes') {
            this.setState({
                newCarCard: { ...this.state.newCarCard, typeCar: value, badDataTextVisibility: false }
            })
        }
        if (key === 'carClasses') {
            this.setState({
                newCarCard: { ...this.state.newCarCard, carClass: value, badDataTextVisibility: false }
            })
        }
    }

    render() {
        function findCarTypeNames(cars, carTypes, storeState) {
            let res = [];
            for (let i = 0; i < cars.length; i++) {
                for (let j = 0; j < carTypes.length; j++) {
                    if (cars[i].cartype === carTypes[j].id) {
                        let selectedISO = storeState.languages[storeState.activeLanguageNumber] ? storeState.languages[storeState.activeLanguageNumber].ISO : '';
                        switch (selectedISO) {
                            case 'ENG':
                                res[i] = carTypes[j].name_en;
                                break;
                            case 'RUS':
                                res[i] = carTypes[j].name_ru;
                                break;
                            default: res[i] = carTypes[j].name_en;
                        }
                        //res[i]=carTypes[j].name_ru;
                    }
                }
            }
            return res;
        }
        function findOneCarProp(element, carProps, storeState) {
            let res;
            for (let j = 0; j < carProps.length; j++) {
                if (element === carProps[j].id) {
                    let selectedISO = storeState.languages[storeState.activeLanguageNumber] ? storeState.languages[storeState.activeLanguageNumber].ISO : '';
                    switch (selectedISO) {
                        case 'ENG':
                            res = carProps[j].name_en;
                            break;
                        case 'RUS':
                            res = carProps[j].name_ru;
                            break;
                        default: res = carProps[j].name_en;
                    }
                    return res;
                    //res[i]=carTypes[j].name_ru;
                }
            }
            return '';
        }
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="carAddNewCarPhotoCarImg" alt="add_car" />);
        }
        let cars = this.props.globalReduser.profile.cars;
        console.log("DriverProfileCar render");
        console.log('state', this.state);
        //console.log();
        console.log('props', this.props);
        let carTypes = findCarTypeNames(cars, this.props.globalReduser.profile.carTypes, this.props.storeState);

        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileCar;
        return (
            <div className="_ThisTagIsNeeded">
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />

                <Collapse isOpen={this.state.collapse} className="col-12">
                    <div className="carAddNewCar d-flex flex-column align-items-end">
                        <div className="tourContentTitle d-flex align-items-center mb-0 col-12" >
                        {
                            //TODO что это за переменная carContentTitle? Её нет в списках
                        }
                            <p style={{ marginTop: '1rem' }}>{textPage.carContentTitle}</p>
                        </div>

                        <form onSubmit={this.formSubmit} id="newCar" className="col-12 carAddNewCarInformation d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column-reverse flex-column-reverse align-items-xl-start align-items-lg-start align-items-md-start align-items-sm-center align-items-center">
                            <div className="carAddNewCarPhotoCar col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 pt-3">
                                <div style={this.state.imagePreviewUrl ? {} : { background: "#686868", height: "300px", borderRadius: "5px" }}>
                                    {$imagePreview}
                                </div>
                                <label htmlFor="addCarFile" ></label>
                                <input type="file" id="addCarFile" style={{ display: "none" }} multiple onChange={this._handleImageChange} />
                                <div className="carPhotoMiniContainer d-flex overflow-auto">
                                    {this.state.carImg.map((element, index) =>
                                        <div className="position-relative">
                                            <img src={element} className="carPhotoMini" alt="add_car" onClick={() => { this.setState({ imagePreviewUrl: this.state.carImg[index] }) }} />
                                            <span onClick={() => { this.state.carImg.splice(index, 1); this.state.imgFiles.splice(index, 1); this.setState({ imgFiles: this.state.imgFiles, carImg: this.state.carImg, imagePreviewUrl: this.state.carImg[0] }) }}></span>
                                        </div>
                                    )}
                                </div>
                                <div id="labelCarEmpty" className="labelCarEmpty" style={{ visibility: 'hidden' }}>{textPage.noPhotoText}</div>

                            </div>

                            <div className="d-flex flex-column col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 pt-3">
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start mt-2">
                                    <label htmlFor="profileCarBrand" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">{textPage.profileCarBrand.floatingLabelText}:</label>
                                    <input id="profileCarBrand" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.nameCar} onChange={(e) => {
                                        let obj = document.getElementById('profileCarBrand');
                                        obj.classList.remove("errorColor");
                                        obj = document.querySelectorAll('.inputClass');
                                        obj[0].classList.remove("errorColor");
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, nameCar: e.currentTarget.value },
                                            badDataTextVisibility: false
                                        })
                                    }} type="text" />
                                    <TextField
                                        value={this.state.newCarCard.nameCar}
                                        onChange={(e) => {
                                            let obj = document.getElementById('profileCarBrand');
                                            obj.classList.remove("errorColor");
                                            obj = document.querySelectorAll('.inputClass');
                                            obj[0].classList.remove("errorColor");
                                            this.setState({
                                                newCarCard: { ...this.state.newCarCard, nameCar: e.currentTarget.value,},
                                                badDataTextVisibility: false 
                                            })
                                        }}
                                        floatingLabelText={textPage.profileCarBrand.floatingLabelText}
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                </div>
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                    <label htmlFor="profileCarYear" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">{textPage.profileCarYear.floatingLabelText}:</label>
                                    <input type="number" id="profileCarYear" className="d-xl-block d-lg-block d-md-block d-sm-none d-none" value={this.state.newCarCard.yearCar} onChange={(e) => {
                                        let obj = document.getElementById('profileCarYear');
                                        obj.classList.remove("errorColor");
                                        obj = document.querySelectorAll('.inputClass');
                                        obj[1].classList.remove("errorColor");
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, yearCar: e.currentTarget.value},
                                            badDataTextVisibility: false 
                                        })
                                    }} />
                                    <TextField
                                        value={this.state.newCarCard.yearCar}
                                        type="number"
                                        onChange={(e) => {
                                            let obj = document.getElementById('profileCarYear');
                                            obj.classList.remove("errorColor");
                                            obj = document.querySelectorAll('.inputClass');
                                            obj[1].classList.remove("errorColor");
                                            this.setState({
                                                newCarCard: { ...this.state.newCarCard, yearCar: e.currentTarget.value},
                                                badDataTextVisibility: false
                                            })
                                        }}
                                        floatingLabelText={textPage.profileCarYear.floatingLabelText}
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                </div>
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                    <label htmlFor="profileCarNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">{textPage.profileCarNumber.floatingLabelText}:</label>
                                    <input id="profileCarNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.plateNumberCar} onChange={(e) => {
                                        let obj = document.getElementById('profileCarNumber');
                                        obj.classList.remove("errorColor");
                                        obj = document.querySelectorAll('.inputClass');
                                        obj[2].classList.remove("errorColor");
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, plateNumberCar: e.currentTarget.value},
                                            badDataTextVisibility: false
                                        })
                                    }} type="text" />
                                    <TextField
                                        value={this.state.newCarCard.plateNumberCar}
                                        onChange={(e) => {
                                            let obj = document.getElementById('profileCarNumber');
                                            obj.classList.remove("errorColor");
                                            obj = document.querySelectorAll('.inputClass');
                                            obj[2].classList.remove("errorColor");
                                            this.setState({
                                                newCarCard: { ...this.state.newCarCard, plateNumberCar: e.currentTarget.value},
                                                badDataTextVisibility: false
                                            })
                                        }}
                                        floatingLabelText={textPage.profileCarNumber.floatingLabelText}
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                </div>
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flsex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">{textPage.typeCar.label}:</label>
                                    <DropDownMenu
                                        value={this.state.newCarCard.typeCar}
                                        textColor="#fff"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                        //className=""
                                        onChange={(event, index, value) => {
                                            let obj = document.querySelectorAll('.dropdownClass');
                                            obj[0].classList.remove("errorColor");
                                            this.handleChange(event, index, value, 'carTypes');
                                        }
                                        }
                                        style={{ width: "100%" }}
                                        className="dropdownClass"
                                        autoWidth={false}
                                        selectedMenuItemStyle={{ color: "#f60" }}
                                        name="typeCar"
                                    >
                                        {
                                            this.props.globalReduser.profile.carTypes.map((element, index) =>
                                                <MenuItem value={element.id} primaryText={findOneCarProp(element.id, this.props.globalReduser.profile.carTypes, this.props.storeState)} />
                                            )
                                        }
                                    </DropDownMenu>
                                </div>
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flsex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">{textPage.carClass.label}:</label>
                                    <DropDownMenu
                                        value={this.state.newCarCard.carClass}
                                        textColor="#fff"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                        //className=""
                                        onChange={(event, index, value) => {
                                            let obj = document.querySelectorAll('.dropdownClass');
                                            obj[1].classList.remove("errorColor");
                                            this.handleChange(event, index, value, 'carClasses');
                                        }
                                        }
                                        style={{ width: "100%" }}
                                        className="dropdownClass"
                                        autoWidth={false}
                                        selectedMenuItemStyle={{ color: "#f60" }}
                                        name="carClass"
                                    >
                                        {
                                            this.props.globalReduser.profile.carClasses.map((element, index) =>
                                                <MenuItem value={element.id} primaryText={findOneCarProp(element.id, this.props.globalReduser.profile.carClasses, this.props.storeState)} />
                                            )
                                        }
                                    </DropDownMenu>
                                </div>
                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">{textPage.typeFuel.label}:</label>
                                    <DropDownMenu
                                        value={this.state.newCarCard.fuelType}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                        //className=""
                                        onChange={(event, index, value) => {
                                            let obj = document.querySelectorAll('.dropdownClass');
                                            obj[2].classList.remove("errorColor");
                                            this.handleChange(event, index, value, 'fuelTypes');
                                        }
                                        }
                                        style={{ width: "100%" }}
                                        className="dropdownClass"
                                        autoWidth={false}
                                        selectedMenuItemStyle={{ color: "#f60" }}
                                        name="typeFuel"
                                    >
                                        {
                                            this.props.globalReduser.profile.fuelTypes.map((element, index) =>
                                                <MenuItem value={element.id} primaryText={findOneCarProp(element.id, this.props.globalReduser.profile.fuelTypes, this.props.storeState)} />
                                            )
                                        }
                                    </DropDownMenu>
                                </div>

                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                    <label htmlFor="profileCarFuelConsumption" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">{textPage.profileCarFuelConsumption.label}:</label>
                                    <input id="profileCarFuelConsumption" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.fuelConsumption} onChange={(e) => {
                                        let obj = document.getElementById('profileCarFuelConsumption');
                                        obj.classList.remove("errorColor");

                                        obj = document.querySelectorAll('.inputClass');
                                        obj[3].classList.remove("errorColor");
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, fuelConsumption: e.currentTarget.value},
                                            badDataTextVisibility: false
                                        })
                                    }} type="number" />
                                    <TextField
                                        value={this.state.newCarCard.fuelConsumption}
                                        type="number"
                                        onChange={(e) => {
                                            let obj = document.getElementById('profileCarFuelConsumption');
                                            obj.classList.remove("errorColor");

                                            obj = document.querySelectorAll('.inputClass');
                                            obj[3].classList.remove("errorColor");
                                            this.setState({
                                                newCarCard: { ...this.state.newCarCard, fuelConsumption: e.currentTarget.value},
                                                badDataTextVisibility: false
                                            })
                                        }}
                                        floatingLabelText={textPage.profileCarFuelConsumption.label}
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                </div>

                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start">
                                    <label htmlFor="profileCarNumberOfSeats" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">{textPage.profileCarNumberOfSeats.label}:</label>
                                    <input id="profileCarNumberOfSeats" className="d-xl-block d-lg-block d-md-block d-sm-none d-none " value={this.state.newCarCard.numberOfSeats} onChange={(e) => {
                                        let obj = document.getElementById('profileCarNumberOfSeats');
                                        obj.classList.remove("errorColor");

                                        obj = document.querySelectorAll('.inputClass');
                                        obj[4].classList.remove("errorColor");
                                        
                                        this.setState({
                                            newCarCard: { ...this.state.newCarCard, numberOfSeats: e.currentTarget.value},
                                            badDataTextVisibility: false
                                        })
                                    }} type="number" />
                                    <TextField
                                        type="number"
                                        value={this.state.newCarCard.numberOfSeats}
                                        onChange={(e) => {
                                            let obj = document.getElementById('profileCarNumberOfSeats');
                                            obj.classList.remove("errorColor");
                                            
                                            obj = document.querySelectorAll('.inputClass');
                                            obj[3].classList.remove("errorColor");
                                            this.setState({
                                                newCarCard: { ...this.state.newCarCard, numberOfSeats: e.currentTarget.value},
                                                badDataTextVisibility: false
                                            })
                                        }}
                                        floatingLabelText={textPage.profileCarNumberOfSeats.label}
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                </div>

                                <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start mt-2 mb-3">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-4 p-0">{textPage.carAddNewCarComfort.label}:</label>
                                    <div className="carAddNewCarComfortCheckBox d-flex flex-column pt-1">
                                        <label htmlFor="comfort1">{textPage.carAddNewCarComfort.comfort1}
                                            <input onClick={(e) => { let comfort = this.state.comfort; comfort[0] = !comfort[0]; this.setState({ comfort: comfort }); }} type="checkbox" id="comfort1" checked={this.state.comfort[0]} />
                                            <span />
                                        </label>
                                        <label htmlFor="comfort2">{textPage.carAddNewCarComfort.comfort2}
                                            <input onClick={(e) => { let comfort = this.state.comfort; comfort[1] = !comfort[1]; this.setState({ comfort: comfort }); }} type="checkbox" id="comfort2" checked={this.state.comfort[1]} />
                                            <span />
                                        </label>
                                        <label htmlFor="comfort3">{textPage.carAddNewCarComfort.comfort3}
                                            <input onClick={(e) => { let comfort = this.state.comfort; comfort[2] = !comfort[2]; this.setState({ comfort: comfort }); }} type="checkbox" id="comfort3" checked={this.state.comfort[2]} />
                                            <span />
                                        </label>
                                        <label htmlFor="comfort4">{textPage.carAddNewCarComfort.comfort4}
                                            <input onClick={(e) => { let comfort = this.state.comfort; comfort[3] = !comfort[3]; this.setState({ comfort: comfort }); }} type="checkbox" id="comfort4" checked={this.state.comfort[3]} />
                                            <span />
                                        </label>
                                        <label htmlFor="comfort5">{textPage.carAddNewCarComfort.comfort5}
                                            <input onClick={(e) => { let comfort = this.state.comfort; comfort[3] = !comfort[3]; this.setState({ comfort: comfort }); }} type="checkbox" id="comfort5" checked={!this.state.comfort[3]} />
                                            <span />
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <div className="carAddNewCarButton d-flex col-md-8 col-12 pt-3 align-items-center justify-content-sm-start justify-content-center mb-5">
                            
                        
                    
                                <span className="d-xl-block d-lg-block d-md-block d-sm-block d-none col-4 p-0" />
                                <div className="d-flex flex-column">
                                    <div className="d-flex">
                                        <button htmlFor="newCar" type="submit" onClick={(e) => this.formSubmit(e)}>{textPage.carAddNewCarButton.button}</button>
                                        <span className="ml-3" style={{margin: 'auto 0' }} onClick={() => this.toggle()}>{textPage.carAddNewCarButton.span}</span>
                                    </div>                                  
                                    <text style={{color: 'red', fontSize: '14px' , visibility: this.state.badDataTextVisibility ? 'visible' : 'hidden'}}>{textPage.badDataText}</text>
                                </div>             
                        </div>
                    </div>
                </Collapse>
                {
                    /*
                <div className="d-none d-sm-block">
                    <p className="d-block d-sm-none" style={{marginTop: '1rem', marginBottom: '0'}}>Ваши автомобили</p>
                </div>
                    */
                }
                <div className="filledCardBody p-0 d-flex justify-content-md-start justify-content-center flex-wrap col-12 " >
                    <div onClick={() => this.toggle()} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" style={{ display: this.state.collapse ? "none" : "block" }}>

                        <div className="filledCardImgAdd" >
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <span />
                                <p>{textPage.filledCard.button}</p>
                            </div>
                        </div>
                    </div>
                    {cars.map((element, index) =>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2 filledCardHover ">
                            <div className="filledCard d-flex flex-column p-0">
                                <div className="filledCardInformation d-flex flex-column">
                                    <div className="filledCardInformationNameCar d-flex justify-content-end align-items-center px-1">
                                        <label className="cardInformationNameCarIcon"></label>
                                        <div className="filledCardInformationMenu">
                                            <p className="filledCardInformationDeleteCar" onClick={() => this.destroy(element)}>{textPage.filledCardInformationMenu.deleteCar}</p>
                                            <p className="filledCardInformationNameCarEdit" onClick={() => this.toggle(element)}>{textPage.filledCardInformationMenu.carEdit}</p>
                                            <p className="filledCardInformationNameCarEdit" onClick={() => this.changeActive(element)}>{element.onWork ? textPage.filledCardInformationMenu.carDeactivate : textPage.filledCardInformationMenu.carActivate}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="filledCardImg" onClick={() => this.toggle(element)}>
                                    <img src={element.image[0] ? config.serverAddressImg + element.image[0].url : ""} className="img-fluid" alt="imgCar" width="100%" height="100%" />
                                </div>
                                <div className="cardInformationType d-flex flex-column">
                                    <p>{element.carBrand}</p>
                                    <div className="cardInformation d-flex">
                                        <p>{carTypes[index]}</p>
                                        <span>, {element.seats} {textPage.cardInformation.span}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}

const DriverProfileCar = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(DriverProfileCarClass);

export default DriverProfileCar;


