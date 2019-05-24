import React from 'react';
import {connect} from 'react-redux';
import '../driverProfileRegistration/DriverProfileSettings.css';
import TextField from 'material-ui/TextField';
import flags from '../driverProfileRegistration/img/flags.png';
import ReactTelInput from 'react-telephone-input'
import requests from '../../config';
import { setProfileData } from "../../redusers/ActionGlobal"
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import AgencyProfileSettings from '../AgencyProfile/AgencyProfileSettings'

class UserProfileSettingsClass extends React.Component {
   render(){
       return(
        <AgencyProfileSettings/>
       )
   }
}

const UserProfileSettings = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(UserProfileSettingsClass);

export default UserProfileSettings;



/*
{
 //Модалка для мобильной версии стартовая
}
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
{
    // Модалка для мобильной версии стартовая
}*/