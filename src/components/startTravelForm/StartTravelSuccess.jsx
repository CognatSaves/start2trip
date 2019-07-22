import React from "react";
import './StartTravelForm.css';
import './StartTravelSuccess.css';
import './StartTravelBlockStyles.css';
import successImage from './pictures/success.svg'

export default class StartTravelSuccess extends React.Component {
    render() {
        return (
            <div className="travelFormBlock"  style={{ display: this.props.successVisibility }}/*style={{ display: "none" }}*/
                /*onClick={(e) => { if (e.currentTarget === e.target) { this.props.changeSuccessVisibility('none') } }}*/>
                <div className="startTravelForm" style={{width: 'auto', height: '100%'}}>
                    <div className="d-flex flex-column" style={{margin: 'auto', background: '#fff', padding: '30px', borderRadius: '5px'}}>
                        <div className="successImageBlock">
                            <img src={successImage} width="100%" height="100%" alt="SUCCESS"></img>
                        </div>
                        <div className="successThanks">
                            <div className="successThanks_value">СПАСИБО</div>
                        </div>
                        <div className="success_blueLine" />
                        <div className="success_driverInfo">
                            <div className="success_driverInfo_textLine">
                                На вашу электронную почту было отправлено
                            </div>
                            <div className="success_driverInfo_textLine" style={{}}>
                                письмо для подтверждения заказа.
                            </div>
                        </div>
                        <button className="success_continueButton" onClick={() => this.props.changeSuccessVisibility('none')}>
                            <div className="success_continueButton_value">ГОТОВО</div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}