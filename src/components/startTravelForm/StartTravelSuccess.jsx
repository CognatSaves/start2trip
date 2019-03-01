import React, {Component} from "react";
import './StartTravelForm.css';
import './StartTravelSuccess.css';
import successImage from './pictures/success.svg'

export default class StartTravelSuccess extends React.Component{
    render(){
        return(
            <div className="startTravelForm" style={{display: this.props.successVisibility}}>
                <div className="successImageBlock">
                    <img src={successImage} width="100%" height="100%" alt="SUCCESS"></img>
                </div>
                <div className="successThanks">
                    <div className="successThanks_value">СПАСИБО</div>
                </div>
                <div className="success_blueLine"/>
                <div className="success_driverInfo">
                    <div className="success_driverInfo_textLine">
                        Водитель свяжется с Вами
                    </div>
                    <div className="success_driverInfo_textLine">
                        в течении 10 минут!
                    </div>
                </div>
                <button className="success_continueButton" onClick={()=>this.props.changeSuccessVisibility('none')}>
                    <div className="success_continueButton_value">ГОТОВО</div>
                </button>
            </div>
        )
    }
}