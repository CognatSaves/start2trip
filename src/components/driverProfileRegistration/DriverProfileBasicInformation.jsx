import React from 'react';
import './DriverProfileBasicInformation.css'
import { connect } from 'react-redux'
import LocationSearchInput from '../home/HomeBody/Search'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';




class DriverProfileBasicInformationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            language: ["Грузинский", "Русский", "Корейский", "Хинди"],

        }
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(event) {
        debugger
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    handleChange = (event, index, value) => this.setState({ value });


    render() {

        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: "#304269", //Button cansel / ok
                primary2Color: "#f60", //Focus date
                // primary3Color: "#f60", // Null
                // accent1Color: "#f60", // Null
                // accent2Color: "#f60", // Null
                // accent3Color: "#f60", // Null
                textColor: "#333",
                // alternateTextColor: white, // Color text
                // canvasColor: "#f60", // bacgraund color 
                // borderColor: "#f60", // border-bottom color
                // disabledColor: "#f60", // PleseHolder
                pickerHeaderColor: "#304269", // Calendar header collor
                // clockCircleColor: "#f60", // Null
                // shadowColor: "#f60", // BoxShadow
            },
            fontFamily: 'Roboto',
        });

        return (
            <div className="basicInformationBody d-flex flex-column">
                <div className="basicInformationBodyBottom d-flex flex-column mb-5 p-0">
                    <div className="basicInformationBodyBottomHeader d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        <p>Редактировать профиль</p>
                    </div>
                    <div className="basicInformationBodyBottomContent d-flex flex-column">
                        <MuiThemeProvider muiTheme={muiTheme}>
                            <form onSubmit={this.formSubmit} id="basicInformation" className="d-flex flex-column col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                                <div className="bottomContentNote d-flex align-items-center">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Имя:</label>
                                    <TextField
                                        hintText="Пожалуйста введите ваше Имя"
                                        floatingLabelText="Имя"
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                    <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " type="text" />
                                    <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                </div>
                                <div className="bottomContentNote d-flex align-items-center">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Фамилия:</label>
                                    <TextField
                                        hintText="Пожалуйста введите Фамилию"
                                        floatingLabelText="Фамилия"
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                    <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " type="text" />
                                </div>
                                <div className="bottomContentNote d-flex align-items-center">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Дата рождения:</label>
                                    <DatePicker floatingLabelText="Дата рождения" className="calendarModal col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0" />
                                    <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                </div>
                                <div className="bottomContentNote d-flex align-items-center">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Номер паспорта:</label>
                                    <TextField
                                        hintText="Пожалуйста введите номер"
                                        floatingLabelText="Номер паспорта"
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block inputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}

                                    />
                                    <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " type="text" />
                                    <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                </div>
                                <div className="bottomContentNote d-flex align-items-center">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Дата выдачи:</label>
                                    <DatePicker floatingLabelText="Дата выдачи паспорта" className="calendarModal col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0" />
                                    <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                </div>
                                <div className="bottomContentNote d-flex align-items-center">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Город:</label>
                                    <div className="d-flex col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                        <LocationSearchInput classInput="searchInputDriverInformation" classDropdown="searchDropdownDriverInformation" />
                                    </div>
                                    <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                </div>
                                <div className="bottomContentNote d-flex align-items-center">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Языки:</label>
                                    <DropDownMenu
                                        value={this.state.value}
                                        hintText="Язык"
                                        className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                                        onChange={this.handleChange}
                                        style={{ width: "100%" }}
                                        className="dropdownClass"
                                        autoWidth={false}
                                        selectedMenuItemStyle={{ color: "#f60" }}
                                    >
                                        {this.state.language.map((element, index) =>
                                            <MenuItem value={index} primaryText={element} />
                                        )}
                                    </DropDownMenu>
                                    <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                </div>
                                <div className="bottomContentNote d-flex align-items-start">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">О себе:</label>
                                    <TextField
                                        hintText="Расскажите о себе"
                                        floatingLabelText="О себе"
                                        className="d-xl-none d-lg-none d-md-none d-sm-block d-block multiLineInputClass"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}
                                        multiLine={true}
                                        rows={2}
                                    />
                                    <textarea className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " name="" id="" cols="30" rows="3"></textarea>
                                    <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                                </div>
                                <div className="d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center justify-content-center ">
                                    <label className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"></label>
                                    <button className="col-8 mb-5" htmlFor="basicInformation" type="submit">Сохранить Изменения</button>
                                </div>
                            </form>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileBasicInformation = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileBasicInformationClass);

export default DriverProfileBasicInformation;