import React from 'react';
import { connect } from 'react-redux'
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';

import UnitedInputBlock from '../AgencyProfile/UnitedInputBlock';
import LocationSearchInput from '../home/HomeBody/Search'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class UserProfileBasicInformationClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.globalReduser.profile;
        let birthday;

        birthday = new Date(profile.birthday);
        this.state = {
            value: this.props.storeState.languageText.driverProfileRegistration.DriverProfileBasicInformation.MenuItem.value,
            profileData: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                birthday: birthday,
                city: profile.hometown.length !== 0 ? (profile.hometown + ', ' + profile.homecountry) : "",
            }
        }

    }
    
    applyChanges = () => {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            let that = this;
            //that.startRefresher();
            startRefresherGlobal(that);
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
            this.props.globalReduser.history.push('/login/');
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


    render() {
        
        let textPage = this.props.storeState.languageTextMain.userProfile.userProfileBasicInformation;
        return (
            <div className="basicInformationBody d-flex flex-column">
                <div className="basicInformationBodyBottom d-flex flex-column mb-5 p-0">
                    <div className="basicInformationBodyBottomHeader d-md-block d-none">
                        <p>{textPage.titlePage}</p>
                    </div>
                    <div className="basicInformationBodyBottomContent d-flex flex-column">
                        <form onSubmit={this.formSubmit} id="basicInformation" className="d-flex flex-column col-12" >
                            <UnitedInputBlock inputId={"basicInfoName"} inputValue={this.state.profileData.firstName}
                                labelText={textPage.firstName.floatingLabelText+':'} textFieldLabelText={textPage.firstName.floatingLabelText}
                                onChangeFunc={(e) => { this.inputChange(e.target.value, 'firstName')}} pElementText={textPage.firstName.description}
                            />
                            <UnitedInputBlock inputId={"basicInfoLastName"} inputValue={this.state.profileData.lastName}
                                labelText={textPage.lastName.floatingLabelText+":"} textFieldLabelText={textPage.lastName.floatingLabelText}
                                onChangeFunc={(e) => { this.inputChange(e.target.value, 'lastName') }} pElementClassName="d-none"
                            />
                            
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoBirthday" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">{textPage.basicInfoBirthday.floatingLabelText}:</label>
                                <DatePicker floatingLabelText={textPage.basicInfoBirthday.floatingLabelText} id="basicInfoBirthday" className="calendarModal col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0" value={this.state.profileData.birthday}
                                    onChange={(undefined, data) => { this.inputChange(this.props.globalReduser.convertDateToUTC(data), 'birthday'); }}
                                />
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">{textPage.basicInfoBirthday.description}</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoLocation" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">{textPage.basicInfoLocation.label}:</label>
                                <div className="d-flex col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                    <LocationSearchInput placeholder={textPage.basicInfoLocation.label} address={this.state.profileData.city} changeCity={this.changeCity} classInput="searchInputDriverInformation" id="basicInfoLocation" classDropdown="searchDropdownDriverInformation" classDiv="p-0 classDivDriverHomeCity" />
                                </div>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">{textPage.basicInfoLocation.description}</p>
                            </div>
                            <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center ">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"></label>
                                <button className="col-8 mb-5" htmlFor="basicInformation" type="submit">{textPage.buttonSubmit.text}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const UserProfileBasicInformation = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(UserProfileBasicInformationClass);

export default UserProfileBasicInformation;