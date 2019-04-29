import React from 'react';
import './DriverProfileBasicInformation.css'
import './DriverProfileCalendar.css'
import { connect } from 'react-redux'
import LocationSearchInput from '../home/HomeBody/Search'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import flags from './img/flags.png'
import ReactTelInput from 'react-telephone-input'



class DriverProfileBasicInformationClass extends React.Component {
    constructor(props) {
        super(props);
        function languageArraysConstr(language, allLanguages){
            let langList=[];
            let chipData=[];
            for(let i=0;i<allLanguages.length; i++){
                //debugger;
                let j=0;let max=language.length;
                for(; j<max;j++){
                    if(language[j]===allLanguages[i].ISO){
                        chipData.push(allLanguages[i].languageName);
                        j=max+5;
                    }
                }
                if(j===max){
                    langList.push(allLanguages[i].languageName);
                }
            }
            return {langList: langList, chipData: chipData};
        }
        function adaptDate(rawdate){
            let date = new Date(profile.birthday);
            return new Date(date.getMonth()+'.'+date.getDate()+'.'+date.getFullYear())
        }
        let profile = this.props.profileReduser.profile;
        console.log('profile in DriverProfileBasicInformation') ;
        console.log(profile);
        let birthday = adaptDate(profile.birthday);
        let passportDate = adaptDate(profile.passportDate);
        let languageArrays = languageArraysConstr(profile.language, profile.allLanguages);
        //debugger;
        this.state = {
            value: "Выберите языки",
            chipData: languageArrays.chipData,
            language: languageArrays.langList,
            profileData: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                birthday: birthday,
                passportNumber: profile.passportNumber,
                passportDate:passportDate,
                city: profile.hometown+', '+profile.homecountry,
                dataAbout: profile.dataAbout
            }
        }
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(event) {
        debugger
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    handleChange = (event, index, value) => {
        // this.setState({ value })
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
        this.setState({ city: value })
    }


    render() {
        let text = "text";
        console.log('chipData');
        console.log(this.state.chipData);
        //console.log
        return (
            <div className="basicInformationBody d-flex flex-column">
                <div className="basicInformationBodyBottom d-flex flex-column mb-5 p-0">
                    <div className="basicInformationBodyBottomHeader d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        <p>Редактировать профиль</p>
                    </div>
                    <div className="basicInformationBodyBottomContent d-flex flex-column">
                        <form onSubmit={this.formSubmit} id="basicInformation" className="d-flex flex-column col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoName" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Имя:</label>
                                <TextField
                                    floatingLabelText="Имя"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.profileData.firstName}

                                />
                                <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " id="basicInfoName" type="text" value={this.state.profileData.firstName}/>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoLastName" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Фамилия:</label>
                                <TextField
                                    floatingLabelText="Фамилия"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.profileData.lastName}
                                />
                                <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " id="basicInfoLastName" type="text" value={this.state.profileData.lastName}/>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoBirthday" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Дата рождения:</label>
                                <DatePicker floatingLabelText="Дата рождения" id="basicInfoBirthday" className="calendarModal col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0" value={this.state.profileData.birthday} />
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Номер паспорта:</label>
                                <TextField
                                    floatingLabelText="Номер паспорта"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.profileData.passportNumber}
                                />
                                <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " id="basicInfoNumber" type="text" value={this.state.profileData.passportNumber}/>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoDay" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Дата выдачи:</label>
                                <DatePicker floatingLabelText="Дата выдачи паспорта" id="basicInfoDay" className="calendarModal col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0" value={this.state.profileData.passportDate}/>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoLocation" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Город:</label>
                                <div className="d-flex col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                    <LocationSearchInput address={this.state.profileData.city} changeCity={this.changeCity} classInput="searchInputDriverInformation" id="basicInfoLocation" classDropdown="searchDropdownDriverInformation" />
                                </div>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Рабочий телефон:</label>
                                <ReactTelInput
                                    defaultCountry="ge"
                                    classNames="myPhoneInput"
                                    flagsImagePath={flags}
                                    onChange={(telNumber, selectedCountry) => { console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry); }}
                                    onBlur={(value) => { console.log(value) }}
                                />
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoLanguage" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Языки:</label>
                                <DropDownMenu
                                    value={this.state.value}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                    className="dropdownClass col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                                    onChange={this.handleChange}
                                    style={{ width: "100%" }}
                                    autoWidth={false}
                                    selectedMenuItemStyle={{ color: "#f60" }}
                                    id="basicInfoLanguage"
                                >
                                    <MenuItem value="Выберите языки" disabled={true} primaryText="Выберите языки" />
                                    {this.state.language.map((element, index) =>
                                        <MenuItem value={element} primaryText={element} />
                                    )}
                                </DropDownMenu>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <label style={{ display: this.state.chipData.length ? "block" : "none" }} htmlFor="basicInfoLanguage" className="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-0"></label>
                                <div className="d-flex flex-wrap align-items-сenter col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 p-0 mt-1 mb-2">

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
                            <div className="bottomContentNote d-flex align-items-start">
                                <label htmlFor="basicInfoMultiLine" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">О себе:</label>
                                <TextField
                                    floatingLabelText="О себе"
                                    className="d-xl-none d-lg-none d-md-none d-sm-block d-block multiLineInputClass"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    multiLine={true}
                                    rows={1}
                                    value={this.state.profileData.dataAbout}
                                />
                                <textarea className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " id="basicInfoMultiLine" name="" cols="30" rows="3" value={this.state.profileData.dataAbout}></textarea>
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center ">
                                <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"></label>
                                <button className="col-8 mb-5" htmlFor="basicInformation" type="submit">Сохранить Изменения</button>
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
        profileReduser: state.DriverProfileRegistrationtReduser,
    }),
)(DriverProfileBasicInformationClass);

export default DriverProfileBasicInformation;