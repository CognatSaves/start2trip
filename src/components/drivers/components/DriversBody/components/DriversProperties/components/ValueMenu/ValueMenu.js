import React, { Component } from 'react';
import './ValueMenu.css'


export default class ValueMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isMove: [false,false]
        }
        this.changeSelectBlockState=this.changeSelectBlockState.bind(this);
    }
    changeSelectBlockState(blockId, state, containerId){
        console.log("changeSelectBlockState call");
        console.log(state);
        console.log(blockId);
        let isMove = this.state.isMove.slice();
        isMove[blockId]=state;
        this.setState({
            isMove: isMove
        })
    }
    render(){
        console.log("valueMenu render");
        console.log(this.state);
        let idLeft = "selectBlock_leftBall";
        let idRight = "selectBlock_rightBall";
        let containerId = "drivers_properties_valueMenu";
        if(this.props.isVisible){
            return(
                <div id={containerId} className="drivers_properties_valueMenu">
                        <div className="valueMenu_borderElement valueMenu_leftBorder">от 100</div>
                        <div className="valueMenu_borderElement valueMenu_rightBorder">до 1999</div>
                        <div className="valueMenu_selectBlock">
                            <div className="valueMenu_selectBlock_sliderLine"></div>
                            <div id={idLeft} className="valueMenu_selectBlock_selectBall valueMenu_selectBlock_leftBall" 
                            onMouseDown={(event)=>this.changeSelectBlockState(0,true, idLeft, containerId)}
                            onMouseMove={(event)=>console.log(event.clientX+" / "+event.clientY)} >                            
                            </div>
                            <div className="valueMenu_selectBlock_selectBall valueMenu_selectBlock_rightBall" onClick={()=>alert("Не трожь, подумой!")}></div>
                        </div>
                           
                        <div className="valueMenu_stateBlock">
                            <button className="valueMenu_stateBlock_buttonStyle valueMenu_stateBlock_applyButton">Готово</button>
                            <button className="valueMenu_stateBlock_buttonStyle valueMenu_stateBlock_cancelButton">Отмена</button>
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