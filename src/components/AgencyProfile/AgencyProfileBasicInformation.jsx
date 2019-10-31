import React from 'react';
import { connect } from 'react-redux';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import requests from '../../config';

import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import flags from '../media/flags.png'
import ReactTelInput from 'react-telephone-input'
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';
import UnitedInputBlock from './UnitedInputBlock';

const cookies = new Cookies();

class AgencyProfileBasicInformationClass extends React.Component {
    constructor(props) {
        super(props);
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
        let profile = this.props.globalReduser.profile;
        //console.log('profile');
        let birthday;
        let passportDate;

        birthday = new Date(profile.birthday);
        passportDate = new Date(profile.passportDate);
        let languageArrays = languageArraysConstr(profile.language, this.props.storeState.untranslatedlanguages);
        this.state = {
            value: "Выберите языки",
            chipData: languageArrays.chipData,
            language: languageArrays.langList,
            profileData: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                city: profile.hometown.length !== 0 ? (profile.hometown + ', ' + profile.homecountry) : "",
                workPhone: profile.workPhone,
                dataAbout: profile.dataAbout,

                bankAccount: profile.bankAccount,
                bankAddress: profile.bankAddress,
                bankCode: profile.bankCode,
                legalAddress: profile.legalAddress,
                organizationName: profile.organizationName,
                registrationNumber: profile.registrationNumber
            }
        }

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
                        console.log("good");
                        getUserData(thenFuncGlobal, catchFuncGlobal,that);
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
    agencyDataChange = (value, variable) => {
        let profileData = this.state.profileData;
        switch (variable) {
            case 'bankAccount': {
                profileData.bankAccount = value;
                break;
            }
            case 'bankAddress': {
                profileData.bankAddress = value;
                break;
            }
            case 'bankCode': {
                profileData.bankCode = value;
                break;
            }
            case 'legalAddress': {
                profileData.legalAddress = value;
                break;
            }
            case 'organizationName': {
                profileData.organizationName = value;
                break;
            }
            case 'registrationNumber': {
                profileData.registrationNumber = value;
                break;
            }
            default:
        }
        this.setState({
            profileData: profileData
        });
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
        });
    }
    formSubmit = (event) => {
        event.preventDefault();
        this.applyChanges();
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
        let textInfo = this.props.storeState.languageText.agencyProfile.agencyProfileBasicInformation;

        return (
            <div className="basicInformationBody d-flex flex-column">
                <div className="basicInformationBodyBottom d-flex flex-column mb-5 p-0">
                    <div className="basicInformationBodyBottomHeader d-md-block d-none">
                        <p>{textInfo.header}</p>
                    </div>
                    <div className="basicInformationBodyBottomContent d-flex flex-column">
                        <form onSubmit={this.formSubmit} id="basicInformation" className="d-flex flex-column col-12" >
                            <p>{textInfo.organizationData.header}</p>
                            <UnitedInputBlock inputId={"basicInfoName"} inputValue={this.state.profileData.organizationName}
                                labelText={textInfo.organizationData.organizationName + ":"} textFieldLabelText={textInfo.organizationData.organizationName}
                                onChangeFunc={(e)=>{this.agencyDataChange(e.target.value, 'organizationName')}}
                            />
                            <UnitedInputBlock inputId={"basicInfoName"} inputValue={this.state.profileData.registrationNumber}
                                labelText={textInfo.organizationData.registrationNumber + ":"} textFieldLabelText={textInfo.organizationData.registrationNumber}
                                onChangeFunc={(e) => { this.agencyDataChange(e.target.value, 'registrationNumber')}}
                            />
                            <UnitedInputBlock inputId={"basicInfoName"} inputValue={this.state.profileData.legalAddress}
                                labelText={textInfo.organizationData.legalAddress + ':'} textFieldLabelText={textInfo.organizationData.legalAddress}
                                onChangeFunc={(e) => { this.agencyDataChange(e.target.value, 'legalAddress')}}
                            />
                            <UnitedInputBlock inputId={"basicInfoName"} inputValue={this.state.profileData.bankAccount} 
                                labelText={textInfo.organizationData.bankAccount + ':'} textFieldLabelText={textInfo.organizationData.bankAccount}
                                onChangeFunc={(e) => { this.agencyDataChange(e.target.value, 'bankAccount')}}
                            />
                            <UnitedInputBlock inputId={"basicInfoName"} inputValue={this.state.profileData.bankCode}
                                labelText={textInfo.organizationData.bankCode + ":"} textFieldLabelText={textInfo.organizationData.bankCode}
                                onChangeFunc={(e) => { this.agencyDataChange(e.target.value, 'bankCode')}}
                            />                           
                            <UnitedInputBlock inputId={"basicInfoName"} inputValue={this.state.profileData.bankAddress}
                                labelText={textInfo.organizationData.bankAddress + ":"} textFieldLabelText={textInfo.organizationData.bankAddress}
                                onChangeFunc={(e) => { this.agencyDataChange(e.target.value, 'bankAddress') }}
                            />
                            <UnitedInputBlock inputId={"basicInfoMultiLine"} textFieldClassName={"d-md-none d-block multiLineInputClass"}
                                inputValue={this.state.profileData.dataAbout} isTextarea={true} textareaParams = {{cols: 30, rows: 3, name: ""}}
                                labelText={textInfo.organizationData.dataAbout + ":"} textFieldLabelText={textInfo.organizationData.dataAbout}
                                onChangeFunc={(e) => { this.inputChange(e.target.value, 'dataAbout') }}
                            />
                            <p>{textInfo.contactPerson.header}</p>
                            <UnitedInputBlock inputId={"basicInfoName"} inputValue={this.state.profileData.firstName}
                                labelText={textInfo.contactPerson.firstName + ":"} textFieldLabelText={textInfo.contactPerson.firstName}
                                onChangeFunc={(e) => { this.inputChange(e.target.value, 'firstName') }}
                            />
                            <UnitedInputBlock inputId={"basicInfoLastName"} inputValue={this.state.profileData.lastName}
                                labelText={textInfo.contactPerson.lastName + ":"} textFieldLabelText={textInfo.contactPerson.lastName}
                                onChangeFunc={(e) => { this.inputChange(e.target.value, 'lastName') }}
                            />
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoNumber" className="d-md-block d-none col-2">{textInfo.contactPerson.workPhone + ":"}</label>
                                <ReactTelInput
                                    defaultCountry={this.props.storeState.isoCountryMap}
                                    classNames="myPhoneInput"
                                    flagsImagePath={flags}
                                    onChange={(telNumber, selectedCountry) => { this.inputChange(telNumber, 'workPhone'); }}
                                    initialValue={this.state.profileData.workPhone}
                                />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoLanguage" className="d-md-block d-none col-2">{textInfo.contactPerson.basicInfoLanguageText + ":"}</label>
                                <DropDownMenu
                                    value={this.state.value}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                    className="dropdownClass col-md-4 col-12"
                                    onChange={this.handleChange}
                                    style={{ width: "100%" }}
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                    id="basicInfoLanguage"
                                >
                                    <MenuItem value={textInfo.contactPerson.basicInfoLanguageText} disabled={true} primaryText={textInfo.contactPerson.basicInfoLanguageText} />
                                    {this.state.language.map((element, index) =>
                                        <MenuItem value={element} primaryText={element} />
                                    )}
                                </DropDownMenu>
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>
                            <div className="d-flex align-items-center">
                                <label style={{ display: this.state.chipData.length ? "block" : "none" }} htmlFor="basicInfoLanguage" className="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-0"></label>
                                <div className="d-flex flex-wrap align-items-сenter col-md-10 col-12 p-0 mt-1 mb-2">

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
                            <div className="d-flex justify-content-md-start justify-content-center ">
                                <label className="d-md-block d-none col-2"></label>
                                <button className="col-8 mb-5" htmlFor="basicInformation" type="submit">{textInfo.saveText}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const AgencyProfileBasicInformation = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileBasicInformationClass);

export default AgencyProfileBasicInformation;