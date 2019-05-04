import React from 'react';
import './UserProfileSettings.css'
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import ReactTelInput from 'react-telephone-input'
import flags from './img/flags.png'
import { thisExpression } from '@babel/types';





class UserProfileSettingsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thisPasswordType: true,
            newPasswordType: true,
            confirmPasswordType: true,
            privatePhone: "",

            // ---------------
            openModalStart: true,
            inputChecked:[true,false,false,false],
            lastValue:0,
            changeBtClose:false,




        }


    }
    inputChange(value, variable) {
        switch (variable) {
            case 'privatePhone': {
                this.setState({
                    settingsValues: value
                })
                break;
            }
            default:
        }
    }

    handleClose = () => {
        this.setState({ openModalStart: false });
    };

    ChangeinputChecked = (e,index) => {
        let next ;
        if(!index && index !== 0){
           next = this.state.lastValue+1;
           if(next == this.state.inputChecked.length-1){
               this.setState({changeBtClose:true})
           }
        }else{
            next = index;
            if(next < this.state.inputChecked.length){
                this.setState({changeBtClose:false})
            }
            if(next == this.state.inputChecked.length-1){
                this.setState({changeBtClose:true})
            }
        }
        
        let newArray = [false,false,false,false];
        newArray.splice(next,1,true);
       

        this.setState({ inputChecked: newArray ,lastValue:next });
    };








    render() {



        return (
            <React.Fragment>
                <div className="modalStartInformation" style={{display: this.state.openModalStart? "block":"none"}}>
                    <div className="d-flex align-items-center justify-content-end col-11 mt-3">
                        <span className="modalStartInformationSkip" onClick={this.handleClose}>Пропустить</span>
                    </div>

                    <div class="modalStartInformationContent">
                        <input type="radio" name="point" id="slide1" onClick={(e)=>{this.ChangeinputChecked(e,0)}} checked={this.state.inputChecked[0]}/>
                        <input type="radio" name="point" id="slide2" onClick={(e)=>{this.ChangeinputChecked(e,1)}} checked={this.state.inputChecked[1]}/>
                        <input type="radio" name="point" id="slide3" onClick={(e)=>{this.ChangeinputChecked(e,2)}} checked={this.state.inputChecked[2]}/>
                        <input type="radio" name="point" id="slide4" onClick={(e)=>{this.ChangeinputChecked(e,3)}} checked={this.state.inputChecked[3]}/>
                        <div class="slider">
                            <div class="slides slide1">
                                <i className="iconRout"></i>
                                <span>Маршрут</span>
                                <p>Стройте свой собственный марщрут путешествия,
                                с возможностью включить в
                                него известный достопримечательности.</p>

                            </div>
                            <div class="slides slide2">
                                <i className="iconCalendar"></i>
                                <span>Дата отправления</span>
                                <p>Подбирайте удобную для Вас дату поездки</p>
                            </div>
                            <div class="slides slide3">
                                <i className="iconOffer"></i>
                                <span>Предложения</span>
                                <p>Выбирайте из предложенного
                                    списка местного водителя-гида,
                                    который охотно познакомит Вас со страной изнутри.</p>
                            </div>
                            <div class="slides slide4">
                                <i className="iconEnjoy"></i>
                                <span>Наслаждайтесь поездкой</span>
                                <p>По Вашему запросу водитель сделает
                                    остановку в любом месте для фото или видео
                                    съемки, посещения достопримечательности.</p>
                            </div>
                        </div>
                        <div class="controls">
                            <label htmlFor="slide1"></label>
                            <label htmlFor="slide2"></label>
                            <label htmlFor="slide3"></label>
                            <label htmlFor="slide4"></label>
                        </div>
                    </div>
                    <div className="modalStartInformationDivNext d-flex align-items-center justify-content-center col-11 " onClick={ this.state.changeBtClose? this.handleClose : this.ChangeinputChecked}>
                        <span className="modalStartInformationNext">{this.state.changeBtClose?"Закрыть":"Далее"}</span>
                    </div>
                </div>
                <div className="driverProfilesettingsBody pb-1">

                    <div className="driverProfilesettingsBodyTitle d-xl-block d-lg-block d-md-block d-sm-none d-none">
                        <p>Настройки профиля</p>
                    </div>
                    <form onSabmit="" id="profileSettings" className="driverProfileSettingsContent d-flex flex-column col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                        <div className="driverProfileSettingsContentRow d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center">
                            <label htmlFor="sittingsEmail" className="col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 ">Email:</label>
                            <input id="sittingsEmail" className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                            <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                        </div>
                        <TextField
                            floatingLabelText="Email"
                            className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                            fullWidth="100%"
                            floatingLabelFocusStyle={{ color: "#304269" }}
                            underlineFocusStyle={{ borderColor: "#304269" }}
                        // errorText="This field is required"
                        />

                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-start">
                            <p className="driverProfileSettingsContentPasswordText d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11 ">Пароль:</p>
                            <div className="driverProfileSettingsContentPassword d-flex flex-column justify-content-end col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12  p-0">
                                <label htmlFor="sittingsCurrentPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">Текущий пароль</label>
                                <div className="driverProfileSettingsContentRow">
                                    <input id="sittingsCurrentPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none" type={this.state.thisPasswordType ? "password" : "text"} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
                                    <TextField
                                        type={this.state.thisPasswordType ? "password" : "text"}
                                        floatingLabelText="Текущий пароль"
                                        className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}
                                    // errorText="This field is required"
                                    />
                                    <span onClick={() => { this.setState({ thisPasswordType: !this.state.thisPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                                </div>

                                <label htmlFor="sittingsNewPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">Новый пароль</label>
                                <div className="driverProfileSettingsContentRow">
                                    <input id="sittingsNewPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none" type={this.state.newPasswordType ? "password" : "text"} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />
                                    <TextField
                                        type={this.state.newPasswordType ? "password" : "text"}
                                        floatingLabelText="Новый пароль"
                                        className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}
                                    // errorText="This field is required"
                                    />
                                    <span onClick={() => { this.setState({ newPasswordType: !this.state.newPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                                </div>
                                <label htmlFor="sittingsConfirmPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none">Подтвердите пароль</label>
                                <div className="driverProfileSettingsContentRow">
                                    <input id="sittingsConfirmPassword" className="d-xl-block d-lg-block d-md-block d-sm-none d-none mb-4" type={this.state.confirmPasswordType ? "password" : "text"} title="Must match the previous field" required />
                                    <TextField
                                        type={this.state.confirmPasswordType ? "password" : "text"}
                                        floatingLabelText="Подтвердите пароль"
                                        className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                        fullWidth="100%"
                                        floatingLabelFocusStyle={{ color: "#304269" }}
                                        underlineFocusStyle={{ borderColor: "#304269" }}
                                    // errorText="This field is required"
                                    />
                                    <span onClick={() => { this.setState({ confirmPasswordType: !this.state.confirmPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start ">
                            {/* TODO функционал выбора префикса по стране */}
                            <label htmlFor="sittingsPhoneNumber" className="d-xl-block d-lg-block d-md-block d-sm-none d-none col-xl-2 col-lg-2 col-md-2 col-sm-11 col-11">Телефон:</label>
                            <ReactTelInput
                                defaultCountry="ge"
                                classNames="myPhoneInput col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 p-0"
                                flagsImagePath={flags}
                                onChange={(telNumber, selectedCountry) => { this.inputChange(telNumber, 'privatePhone'); }}
                                onBlur={(value) => { console.log(value) }}
                                initialValue={this.state.settingsValues}

                            />
                            <p className=" d-xl-block d-lg-block d-md-block d-sm-none d-none pl-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum non quisquam temporibus ipsum doloribus enim?</p>
                        </div>
                        <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-center py-3">
                            <label className="col-2" />
                            <button htmlFor="profileSettings" type="submit">СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
                        </div>
                    </form>
                    <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start pb-3">
                        <p className="col-2"></p>
                        <div className="driverProfileSettingsContentUnsubscribe d-flex flex-column">
                            <p className="driverProfileSettingsContentUnsubscribeButton">Отписаться от рассылки</p>
                            <p>В результате отписки Вы больше не будете получать сообщения от Start2Trip</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const UserProfileSettings = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(UserProfileSettingsClass);

export default UserProfileSettings;