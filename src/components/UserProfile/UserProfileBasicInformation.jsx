import React from 'react';
import './UserProfileBasicInformation.css'
import { connect } from 'react-redux'
import LocationSearchInput from '../home/HomeBody/Search'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';




class UserProfileBasicInformationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(event) {
        debugger
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }


    render() {

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

                                />
                                <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " id="basicInfoName" type="text" />
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

                                />
                                <input className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " id="basicInfoLastName" type="text" />
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoBirthday" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Дата рождения:</label>
                                <DatePicker floatingLabelText="Дата рождения" id="basicInfoBirthday" className="calendarModal col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0" />
                                <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none m-0 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                            </div>
                            <div className="bottomContentNote d-flex align-items-center">
                                <label htmlFor="basicInfoLocation" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">Город:</label>
                                <div className="d-flex col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                                    <LocationSearchInput classInput="searchInputDriverInformation" id="basicInfoLocation" classDropdown="searchDropdownDriverInformation" />
                                </div>
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

const UserProfileBasicInformation = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(UserProfileBasicInformationClass);

export default UserProfileBasicInformation;