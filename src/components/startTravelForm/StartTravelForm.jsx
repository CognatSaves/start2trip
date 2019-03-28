import React from 'react';
import './StartTravelForm.css';
import './StartTravelBlockStyles.css';
import { Link } from 'react-router-dom';
import grayCross from './pictures/close_gray.svg';

export default class StartTravelForm extends React.Component{
  
    render(){        
        return(
            <div className="travelFormBlock" style={{display: this.props.travelVisibility}} 
            onClick={(e)=>{if(e.currentTarget===e.target){this.props.changeTravelVisibility('none')} } }>
                <div className="startTravelForm" style={{display: this.props.travelVisibility}} onClick={()=>{}}>
                    <div className="startTravelForm_element">
                        <div className="startTravelForm_headerText">Забронировать поездку</div>
                        <button className="startTravelForm_crossPlace" onClick={()=>this.props.changeTravelVisibility('none')}>
                            <img src={grayCross} width="100%" height="100%" alt="grayCross"></img>
                        </button>
                    </div>
                    <div className="startTravelForm_text">Имя<text style={{color: "#ff6600"}}>*</text></div>
                    <input className="startTravelForm_inputStyle" placeholder="Ваше имя"></input>

                    <div className="startTravelForm_text">Email</div>
                    <input className="startTravelForm_inputStyle" placeholder="Ваша электронная почта"></input>

                    
                    <div className="startTravelForm_text">Номер телефона<text style={{color: "#ff6600"}}>*</text></div>
                    <input className="startTravelForm_inputStyle" placeholder="Ваш номер телефона"></input>
                    
                    <div className="startTravelForm_text">Адрес посадки</div>
                    <input className="startTravelForm_inputStyle" placeholder="Место посадки"></input>
                    
                    <div className="startTravelForm_text">Время посадки</div>
                    <input className="startTravelForm_inputStyle" placeholder="Время посадки"></input>
                    
                    <textarea className="startTravelForm_commentary" placeholder="Комментарий"></textarea>
                    
                    <div className="startTravelForm_element">
                        <input type="checkbox" className="startTravelForm_checkbox"></input>
                        <div className="startTravelForm_checkboxText">
                            <div style={{display: "flex", margin: "auto 0"}}>Я принимаю</div>
                            <Link to="/drivers" className="startTravelForm_link">условия соглашения</Link>
                        </div>
                    </div>                    
                    <button className="startTravelForm_button">
                        <div className="startTravelForm_buttonText" 
                        onClick={()=>{this.props.changeTravelVisibility('none'); this.props.changeSuccessVisibility('block')}}>
                            НАЧАТЬ ПУТЕШЕСТВИЕ
                        </div>
                    </button>                    
                </div>
            </div>
        )
               
    }

}
