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

    getProfileData = () => {
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
            }
            getUserData(requestValues, thenFuncGlobal, catchFuncGlobal,that);
        }
        else {

            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }
    }
    startRefresher = () => {
        startRefresherGlobal(this,true)
    }

    applyChanges = () => {
        let jwt = this.props.globalReduser.readCookie('jwt');

        if (jwt && jwt !== "-") {
            let that = this;
            that.startRefresher();

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
                        that.getProfileData();
                        thenFuncGlobal(that)
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
        thenFuncGlobal(this)
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
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoName" className="d-md-block d-none col-2">{textInfo.organizationData.organizationName + ":"}</label>
                                <TextField
                                    floatingLabelText={textInfo.organizationData.organizationName}
                                    className="d-md-none d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    initialValue={this.state.profileData.organizationName}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'organizationName'); }}
                                    value={this.state.profileData.organizationName}
                                />
                                <input className="d-md-block d-none col-md-4 col-12 " id="basicInfoName" type="text" value={this.state.profileData.organizationName}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'organizationName'); }} />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoName" className="d-md-block d-none col-2">{textInfo.organizationData.registrationNumber + ":"}</label>
                                <TextField
                                    floatingLabelText={textInfo.organizationData.registrationNumber}
                                    className="d-md-none d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    initialValue={this.state.profileData.registrationNumber}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'registrationNumber'); }}
                                    value={this.state.profileData.registrationNumber}
                                />
                                <input className="d-md-block d-none col-md-4 col-12 " id="basicInfoName" type="text" value={this.state.profileData.registrationNumber}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'registrationNumber'); }} />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoName" className="d-md-block d-none col-2">{textInfo.organizationData.legalAddress + ':'}</label>
                                <TextField
                                    floatingLabelText={textInfo.organizationData.legalAddress}
                                    className="d-md-none d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    initialValue={this.state.profileData.legalAddress}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'legalAddress'); }}
                                    value={this.state.profileData.legalAddress}
                                />
                                <input className="d-md-block d-none col-md-4 col-12 " id="basicInfoName" type="text" value={this.state.profileData.legalAddress}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'legalAddress'); }} />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoName" className="d-md-block d-none col-2">{textInfo.organizationData.bankAccount + ':'}</label>
                                <TextField
                                    floatingLabelText={textInfo.organizationData.bankAccount}
                                    className="d-md-none d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    initialValue={this.state.profileData.bankAccount}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'bankAccount'); }}
                                    value={this.state.profileData.bankAccount}
                                />
                                <input className="d-md-block d-none col-md-4 col-12 " id="basicInfoName" type="text" value={this.state.profileData.bankAccount}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'bankAccount'); }} />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoName" className="d-md-block d-none col-2">{textInfo.organizationData.bankCode + ":"}</label>
                                <TextField
                                    floatingLabelText={textInfo.organizationData.bankCode}
                                    className="d-md-none d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    initialValue={this.state.profileData.bankCode}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'bankCode'); }}
                                    value={this.state.profileData.bankCode}
                                />
                                <input className="d-md-block d-none col-md-4 col-12 " id="basicInfoName" type="text" value={this.state.profileData.bankCode}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'bankCode'); }} />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoName" className="d-md-block d-none col-2">{textInfo.organizationData.bankAddress + ":"}</label>
                                <TextField
                                    floatingLabelText={textInfo.organizationData.bankAddress}
                                    className="d-md-none d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    initialValue={this.state.profileData.bankAddress}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'bankAddress'); }}
                                    value={this.state.profileData.bankAddress}
                                />
                                <input className="d-md-block d-none col-md-4 col-12 " id="basicInfoName" type="text" value={this.state.profileData.bankAddress}
                                    onChange={(e) => { this.agencyDataChange(e.target.value, 'bankAddress'); }} />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-start">
                                <label htmlFor="basicInfoMultiLine" className="d-md-block d-none col-2">{textInfo.organizationData.dataAbout + ":"}</label>
                                <TextField
                                    floatingLabelText={textInfo.organizationData.dataAbout}
                                    className="d-md-none d-block multiLineInputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    multiLine={true}
                                    rows={1}
                                    value={this.state.profileData.dataAbout}
                                    onChange={(e) => { this.inputChange(e.target.value, 'dataAbout'); }}
                                />
                                <textarea className="d-md-block d-none col-md-4 col-12 " id="basicInfoMultiLine" name="" cols="30" rows="3" value={this.state.profileData.dataAbout}
                                    onChange={(e) => { let profileData = this.state.profileData; profileData.dataAbout = e.target.value; this.setState({ profileData: profileData }) }}></textarea>
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>


                            <p>{textInfo.contactPerson.header}</p>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoName" className="d-md-block d-none col-2">{textInfo.contactPerson.firstName + ":"}</label>
                                <TextField
                                    floatingLabelText={textInfo.contactPerson.firstName}
                                    className="d-md-none d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    initialValue={this.state.profileData.firstName}
                                    onChange={(e) => { this.inputChange(e.target.value, 'firstName'); }}
                                    value={this.state.profileData.firstName}
                                />
                                <input className="d-md-block d-none col-md-4 col-12 " id="basicInfoName" type="text" value={this.state.profileData.firstName}
                                    onChange={(e) => { this.inputChange(e.target.value, 'firstName'); }} />
                                <p className=" d-md-block d-none m-0 col-md-6 col-5"></p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoLastName" className="d-md-block d-none col-2">{textInfo.contactPerson.lastName + ":"}</label>
                                <TextField
                                    floatingLabelText={textInfo.contactPerson.lastName}
                                    className="d-md-none d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.profileData.lastName}
                                    onChange={(e) => { this.inputChange(e.target.value, 'lastName'); }}
                                />
                                <input className="d-md-block d-none col-md-4 col-12 " id="basicInfoLastName" type="text" value={this.state.profileData.lastName}
                                    onChange={(e) => { this.inputChange(e.target.value, 'lastName'); }}
                                />
                            </div>

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