import React, { Component } from 'react';
import './PeopleMenu.css'
import { connect } from 'react-redux';
import {changePersonsNumberDispatch,peopleMenuCall} from "../../../../../../redusers/Action"

class PeopleMenuClass extends React.Component {
    constructor(props) {
        super(props);

    }
    changePersonsNumber(index, value){
        let persons = this.props.storeState.persons.slice();
        persons[index]+=value;
        if(persons[0]>=1 && persons[1]>=0){
            this.props.dispatch(changePersonsNumberDispatch(persons));
        }
    }
    peopleMenuCall(clear){
        if(clear){
            this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld));
        }
        this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu));
      }

    render() {
        let peopleDisabledMinus = true ;
        let peopleDisabledPlus = false ;
        let childrenDisabledMinus = true ;
        let childrenDisabledPlus = false ;
        if (this.props.isVisible) {
            //возможно, следующие 2 if можно заменить на что-нибудь более удобоваримое
            if (this.props.storeState.persons[0] == 1) {
                peopleDisabledMinus = true;
            }
            if (this.props.storeState.persons[0] >= 2) {
                peopleDisabledMinus = false;
            }
            if (this.props.storeState.persons[1] == 0) {
                childrenDisabledMinus = true;
            }
            if (this.props.storeState.persons[1] >= 1) {
                childrenDisabledMinus = false;
            }
            return (
                <div className="drivers_properties_peopleMenu">
                    <div className="peopleMenu_element">
                        <div className="peopleMenu_element_part">
                            <p>Взрослые</p>
                            <div className="element_part_valueBlock">
                                <button className="valueBlock_button minus" disabled={peopleDisabledMinus} onClick={() => this.changePersonsNumber(0, -1)}>&#8211;</button>
                                <div className="valueBlock_value_text">{this.props.storeState.persons[0]}</div>
                                <button className="valueBlock_button" disabled={peopleDisabledPlus} onClick={() => this.changePersonsNumber(0, 1)}>+</button>
                            </div>
                        </div>
                        <div className="peopleMenu_element_part">
                            <div className="element_part_children">
                                <p>Дети</p>
                                <p className="cildren">от 2 до 12 лет</p>
                            </div>
                            <div className="element_part_valueBlock">
                                <button className="valueBlock_button minus" disabled={childrenDisabledMinus} onClick={() => this.changePersonsNumber(1, -1)}>&#8211;</button>
                                <div className="valueBlock_value_text" >{this.props.storeState.persons[1]}</div>
                                <button className="valueBlock_button" disabled={childrenDisabledPlus} onClick={() => this.changePersonsNumber(1, 1)}>+</button>
                            </div>
                        </div>
                        <div className="peopleMenu_element_stateBlock">
                            <button className="peopleMenu_stateBlock_cancelButton" onClick={() => { this.peopleMenuCall(true) }}>Отмена</button>
                            <button className="peopleMenu_stateBlock_applyButton" onClick={()=>this.peopleMenuCall(false)}>Готово</button>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <React.Fragment></React.Fragment>
            )
        }
    }
}

const PeopleMenu = connect(
    (state) => ({
      storeState: state.AppReduser,
    }),
  )(PeopleMenuClass);
  
  export default PeopleMenu;