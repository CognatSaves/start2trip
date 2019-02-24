import React, { Component } from 'react';
import './PeopleMenu.css'

export default class PeopleMenu extends React.Component{
    constructor(props) {
        super(props);
        
    }
    
    render(){

        if(this.props.isVisible){
            //возможно, следующие 2 if можно заменить на что-нибудь более удобоваримое
            let leftButtonColor = ["valueBlock_button valueBlock_buttonSize valueBlock_buttonColor_canUse","valueBlock_button valueBlock_buttonSize valueBlock_buttonColor_canUse"];
            if(this.props.persons[0]==1){
                leftButtonColor[0]="valueBlock_button valueBlock_buttonColor_cannotUse valueBlock_buttonSize"
            }
            if(this.props.persons[1]==0){
                leftButtonColor[1]="valueBlock_button valueBlock_buttonColor_cannotUse valueBlock_buttonSize"
            }
            return(
                <div className="drivers_properties_peopleMenu">
                    <div className="peopleMenu_element">
                        <div className="peopleMenu_element_part">
                            <div className="element_part_peopleType element_part_adults">
                                Взрослые
                            </div>
                            <div className="element_part_valueBlock">
                                <button className={leftButtonColor[0]} onClick={()=>this.props.changePersonsNumber(0,-1)}>
                                    <div className="valueBlock_button_symbol">&#8211;</div>                               
                                </button>
                                <div className="valueBlock_value">
                                    <div className="valueBlock_value_text">{this.props.persons[0]}</div>                                   
                                </div>
                                <button className="valueBlock_button valueBlock_buttonSize valueBlock_buttonColor_canUse" onClick={()=>this.props.changePersonsNumber(0,1)}>
                                    <div className="valueBlock_button_symbol">+</div>  
                                </button>
                            </div>
                        </div>
                        <div className="peopleMenu_element_part">
                            <div className="element_part_peopleType element_part_children" >
                                Дети
                            </div>
                            <div className="element_part_peopleType element_part_commentary">
                                от 2 до 12 лет
                            </div>
                            <div className="element_part_valueBlock">
                                <button className={leftButtonColor[1]} onClick={()=>this.props.changePersonsNumber(1,-1)}>
                                 <div className="valueBlock_button_symbol">&#8211;</div>  
                                </button>
                                <div className="valueBlock_value">
                                    <div className="valueBlock_value_text" >{this.props.persons[1]}</div>         
                                </div>
                                <button className="valueBlock_button valueBlock_buttonSize valueBlock_buttonColor_canUse" onClick={()=>this.props.changePersonsNumber(1,1)}>
                                    <div className="valueBlock_button_symbol">+</div>  
                                </button>
                            </div>
                        </div>
                        <div className="peopleMenu_element_stateBlock">
                            <button className="peopleMenu_stateBlock_applyButton peopleMenu_stateBlock_buttonStyle">Готово

                            </button>
                            <button className="peopleMenu_stateBlock_cancelButton peopleMenu_stateBlock_buttonStyle" onClick={()=>{this.props.close()}}>Отмена

                            </button>

                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <React.Fragment></React.Fragment>
            )
        }
    }
}