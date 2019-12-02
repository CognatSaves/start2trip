import React from 'react';
import { connect } from 'react-redux'
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { isMobileOnly } from 'react-device-detect'
import getUserData from './DriverProfileRequest';
import requests from '../../config';

import flags from '../media/flags.png'

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import ReactTelInput from 'react-telephone-input'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import UnitedInputBlock from '../AgencyProfile/UnitedInputBlock';
import LocationSearchInput from '../home/HomeBody/Search'
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class DriverProfileBasicInformationClass extends React.Component {
    constructor(props) {
        super(props);
        // function languageArraysConstr(language, allLanguages) {
        //     let langList = [];
        //     let chipData = [];
        //     for (let i = 0; i < allLanguages.length; i++) {
        //         let j = 0; let max = language.length;
        //         for (; j < max; j++) {
        //             if (language[j] === allLanguages[i].ISO) {
        //                 chipData.push(allLanguages[i].languageName);
        //                 j = max + 5;
        //             }
        //         }
        //         if (j === max) {
        //             langList.push(allLanguages[i].languageName);
        //         }
        //     }
        //     return { langList: langList, chipData: chipData };
        // }
        let profile = this.props.globalReduser.profile;
        //console.log('profile');
        // let birthday; let passportDate;

        // birthday = new Date(profile.birthday);
        // passportDate = new Date(profile.passportDate);
        

        // let languageArrays = languageArraysConstr(profile.language, this.props.storeState.untranslatedlanguages);
        debugger;
        let profileConstructorResult = this.profileConstructor(profile, this.props.storeState.untranslatedlanguages);
        this.state = {
            value: this.props.storeState.languageText.driverProfileRegistration.DriverProfileBasicInformation.MenuItem.value,
            chipData: profileConstructorResult.chipData,
            language: profileConstructorResult.language,
            profileData: profileConstructorResult.profileData,
            isWorkPhone:true,
        }
    }
    profileConstructor = (profile, untranslatedlanguages) => {
        function languageArraysConstr(language, allLanguages) {
            let langList = [];
            let chipData = [];
            for (let i = 0; i < allLanguages.length; i++) {
                let j = 0; let max = language.length;
                for (; j < max; j++) {
                    if (language[j] === allLanguages[i].ISO) {
                        chipData.push(allLanguages[i].languageName);
                        j = max + 5;
                    }
                }
                if (j === max) {
                    langList.push(allLanguages[i].languageName);
                }
            }
            return { langList: langList, chipData: chipData };
        }
        let langArray = profile.language;
        if(profile.language.length>0 && profile.language[0].ISO){
            let isoLangArray = [];
            for(let i=0; i<profile.language.length; i++){
                isoLangArray.push(profile.language[i].ISO);
            }
            langArray=isoLangArray;
        }
        let languageArrays = languageArraysConstr(langArray, untranslatedlanguages);
        let birthday = new Date(profile.birthday);
        let passportDate = new Date(profile.passportDate);
        
        let result = {
            chipData: languageArrays.chipData,
            language: languageArrays.langList,
            profileData: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                birthday: birthday,
                passportNumber: profile.passportNumber,
                passportDate: passportDate,
                city: profile.hometown.length !== 0 ? (profile.hometown + ', ' + profile.homecountry) : "",
                workPhone: profile.workPhone,
                dataAbout: profile.dataAbout
            }
        }
        return result;
    }
    applyChanges = () => {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            let that = this;
            startRefresherGlobal(this,true)

            function parseCity(city) {
                let res = city.split(', ');
                let ht = "";
                for (let i = 0; i < res.length - 1; i++) {
                    ht = ht + res[i];
                    if (i !== res.length - 2) {
                        ht = ht + ", ";
                    }
                }
                return { hometown: ht, homecountry: res[res.length - 1] };
            }
            let value = { ...this.state.profileData, language: this.state.chipData };
            let pcity = parseCity(value.city);
            value.hometown = pcity.hometown;
            value.homecountry = pcity.homecountry;
            value.city = undefined;
            let body = JSON.stringify(value);

            fetch(requests.profileUpdateRequest, {
                method: 'PUT', body: body,
                headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}` }
            })
                .then(response => {
                    return response.json();
                })
                .then(function (data) {
                    if (data.error) {
                        console.log("bad");
                        throw data.error;
                    }
                    else {
                        debugger;
                        function profileUpdate(newProfile, data){
                            let profile = {...newProfile};
                            profile.language=data.language;
                            profile.firstName = data.firstName;
                            profile.lastName = data.lastName;
                            profile.birthday = data.birthday;
                            profile.passportNumber = data.passportNumber;
                            profile.passportData = data.passportDate;
                            profile.hometown = data.hometown;
                            profile.homecountry = data.homecountry;
                            profile.workPhone = data.workPhone;
                            profile.dataAbout = data.dataAbout;
                            return profile;
                        }
                        let profileConstructorResult = that.profileConstructor(data, that.props.storeState.untranslatedlanguages);
                        that.setState({
                            chipData: profileConstructorResult.chipData,
                            language: profileConstructorResult.language,
                            profileData: profileConstructorResult.profileData,
                        });
                        ///let newProfile = that.props.globalReduser.profile;
                        let newProfile = profileUpdate(that.props.globalReduser.profile, data);
                        that.props.dispatch(setProfileData(newProfile));
                        thenFuncGlobal(that);
                        console.log("good");
                        //getUserData(thenFuncGlobal, catchFuncGlobal,that);
                    }
                })
                .catch(function (error) {
                    console.log("bad");
                    console.log('An error occurred:', error);
                    catchFuncGlobal(that);
                });
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.globalReduser.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
        }
    }
    inputChange = (value, variable) => {
        let profileData = this.state.profileData;
        switch (variable) {
            case 'firstName': {
                profileData.firstName = value;
                break;
            }
            case 'lastName': {
                profileData.lastName = value;
                break;
            }
            case 'birthday': {
                profileData.birthday = value;
                break;
            }
            case 'passportNumber': {
                profileData.passportNumber = value;
                break;
            }
            case 'passportDate': {
                profileData.passportDate = value;
                break;
            }
            case 'workPhone': {
                profileData.workPhone = value;
                break;
            }
            case 'dataAbout': {
                profileData.dataAbout = value;
                break;
            }
            default:
        }
        this.setState({
            profileData: profileData
        })
    }
    formSubmit = (event) => {
        event.preventDefault();
        if(this.state.profileData.workPhone !== "+" && this.state.profileData.workPhone !== ""){
            this.setState({isWorkPhone:true})
            this.applyChanges();
        }else{
            this.setState({isWorkPhone:false})
        }
       
    }
    handleChange = (event, index, value) => {
        this.chipData = this.state.chipData;
        this.chipData.push(value);

        this.language = this.state.language;
        const languageToDelete = this.language.map((language) => language).indexOf(value);
        this.language.splice(languageToDelete, 1);
        this.setState({ language: this.language });
    };
    handleRequestDelete = (element) => {
        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip).indexOf(element);
        this.chipData.splice(chipToDelete, 1);
        this.setState({ chipData: this.chipData });

        this.language = this.state.language;
        this.language.push(element);
    };
    changeCity = (index, value) => {
        this.setState({
            profileData: { ...this.state.profileData, city: value }
        })
    }
    componentDidMount(){
        //thenFuncGlobal(this)
    }
    render() {
        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileBasicInformation;
        return (
            <div className="basicInformationBody d-flex flex-column">
                <div className="basicInformationBodyBottom d-flex flex-column mb-5 p-0">
                    <div className="basicInformationBodyBottomHeader d-md-block d-none">
                        <p>{textPage.titlePage}</p>
                    </div>
                    <div className="basicInformationBodyBottomContent d-flex flex-column">
                        <form onSubmit={this.formSubmit} id="basicInformation" className="d-flex flex-column col-12" >
                            
                            <UnitedInputBlock inputId={"basicInfoName"} inputValue={this.state.profileData.firstName}
                                labelText={textPage.firstName.floatingLabelText+":"} textFieldLabelText={textPage.firstName.floatingLabelText}
                                onChangeFunc={(e) => { this.inputChange(e.target.value, 'firstName')}} pElementText={textPage.firstName.description}
                            />
                            <UnitedInputBlock inputId={"basicInfoLastName"} inputValue={this.state.profileData.lastName}
                                labelText={textPage.lastName.floatingLabelText+":"} textFieldLabelText={textPage.lastName.floatingLabelText}
                                onChangeFunc={(e) => { this.inputChange(e.target.value, 'lastName')}} pElementClassName={"d-none"}
                            />
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoBirthday" className="d-md-block d-none col-2">{textPage.basicInfoBirthday.floatingLabelText}:</label>
                                <DatePicker floatingLabelText={textPage.basicInfoBirthday.floatingLabelText} id="basicInfoBirthday" className="calendarModal col-md-4 col-12 p-0" value={this.state.profileData.birthday}
                                    onChange={(undefined, data) => { this.inputChange(this.props.globalReduser.convertDateToUTC(data), 'birthday'); }}
                                />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.basicInfoBirthday.description}</p>
                            </div>
                            <UnitedInputBlock inputId={"basicInfoNumber"} inputValue={this.state.profileData.passportNumber}
                                labelText={textPage.basicInfoNumber.floatingLabelText+":"} textFieldLabelText={textPage.basicInfoNumber.floatingLabelText}
                                onChangeFunc={(e) => { this.inputChange(e.target.value, 'passportNumber') }} pElementText={textPage.basicInfoNumber.description}
                            />
                            
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoDay" className="d-md-block d-none col-2">{textPage.basicInfoDay.floatingLabelText}:</label>
                                <DatePicker floatingLabelText={textPage.basicInfoDay.floatingLabelText} id="basicInfoDay" className="calendarModal col-md-4 col-12 p-0" value={this.state.profileData.passportDate}
                                    onChange={(undefined, data) => { this.inputChange(this.props.globalReduser.convertDateToUTC(data), 'passportDate'); }}
                                />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.basicInfoDay.description}</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoLocation" className="d-md-block d-none col-2">{textPage.basicInfoLocation.label}:</label>
                                <div className="d-flex col-md-4 col-12 p-0">
                                    <LocationSearchInput placeholder={textPage.basicInfoLocation.label} address={this.state.profileData.city} changeCity={this.changeCity} classInput="searchInputDriverInformation" id="basicInfoLocation" classDropdown="searchDropdownDriverInformation" classDiv="p-0 classDivDriverHomeCity" />
                                </div>
                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.basicInfoLocation.description}</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoTelNumber" className="d-md-block d-none col-2">{textPage.basicInfoTelNumber.label}:</label>
                                <ReactTelInput
                                    defaultCountry={this.props.storeState.isoCountryMap}
                                    classNames={this.state.isWorkPhone?"myPhoneInput":"myPhoneInput errorColor"}
                                    flagsImagePath={flags}
                                    onChange={(telNumber, selectedCountry) => { this.inputChange(telNumber, 'workPhone'); }}
                                    initialValue={this.state.profileData.workPhone}
                                />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.basicInfoTelNumber.description}</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoLanguage" className="d-md-block d-none col-2">{textPage.basicInfoLanguage.label}:</label>
                                <FormControl className="d-flex flex-wrap col-md-4 col-12 p-0 mt-2">
                                    {isMobileOnly ?
                                        <InputLabel>{textPage.basicInfoLanguage.label}</InputLabel>
                                        : <div />}
                                    <Select
                                        value={this.state.value}
                                        className="dropdownClass"
                                        onChange={(event, index, value) => {
                                            let obj = document.querySelectorAll('.dropdownClass');
                                            obj[0].classList.remove("errorColor");
                                            this.handleChange(event, index, event.target.value);
                                        }}
                                    >

                                        <MenuItem value={textPage.MenuItem.value} disabled={true} >{textPage.MenuItem.value}</MenuItem>
                                        {this.state.language.map((element, index) =>
                                            <MenuItem value={element}>{element}</MenuItem>
                                        )}

                                    </Select>
                                </FormControl>

                                <p className=" d-md-block d-none m-0 col-md-6 col-5">{textPage.basicInfoLanguage.description}</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <label style={{ display: this.state.chipData.length ? "block" : "none" }} htmlFor="basicInfoLanguage" className="d-md-flex d-none col-2"></label>
                                <div className="d-flex flex-wrap align-items-сenter col-xl-10 col-lg-10 col-md-10 col-12 p-0 mt-1 mb-2">

                                    {this.state.chipData.map((element, index) =>
                                        <Chip
                                            key={element}
                                            onRequestDelete={() => this.handleRequestDelete(element)}
                                            labelStyle={{ color: "#000" }}
                                            labelColor="#f60"
                                            textColor="#304269"
                                            className="chipClass"
                                        >
                                            {element}
                                        </Chip>
                                    )}

                                </div>
                            </div>
                            
                            <UnitedInputBlock inputId={"basicInfoMultiLine"} inputValue={this.state.profileData.dataAbout}
                                isTextarea={true} 
                                labelText={textPage.basicInfoMultiLine.floatingLabelText+':'} textFieldLabelText={textPage.basicInfoMultiLine.floatingLabelText}
                                onChangeFunc={(e) => { this.inputChange(e.target.value, 'dataAbout') }} pElementText={textPage.basicInfoMultiLine.description}
                            />                         
                            <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center ">
                                <label className="d-md-block d-none col-2"></label>
                                <button className="col-8 mb-5" htmlFor="basicInformation" type="submit">{textPage.buttonSubmit.text}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileBasicInformation = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(DriverProfileBasicInformationClass);

export default DriverProfileBasicInformation;