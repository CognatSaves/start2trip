import React, { Component } from 'react';
import './PeopleMenu.css'

export default class PeopleMenu extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let peopleDisabledMinus = true ;
        let peopleDisabledPlus = false ;
        let childrenDisabledMinus = true ;
        let childrenDisabledPlus = false ;
        if (this.props.isVisible) {
            //возможно, следующие 2 if можно заменить на что-нибудь более удобоваримое
            if (this.props.persons[0] == 1) {
                peopleDisabledMinus = true;
            }
            if (this.props.persons[0] == 2) {
                peopleDisabledMinus = false;
            }
            if (this.props.persons[1] == 0) {
                childrenDisabledMinus = true;
            }
            if (this.props.persons[1] == 1) {
                childrenDisabledMinus = false;
            }
            return (
                <div className="drivers_properties_peopleMenu">
                    <div className="peopleMenu_element">
                        <div className="peopleMenu_element_part">
                            <p>Взрослые</p>
                            <div className="element_part_valueBlock">
                                <button className="valueBlock_button" disabled={peopleDisabledMinus} onClick={() => this.props.changePersonsNumber(0, -1)}>&#8211;</button>
                                <div className="valueBlock_value_text">{this.props.persons[0]}</div>
                                <button className="valueBlock_button" disabled={peopleDisabledPlus} onClick={() => this.props.changePersonsNumber(0, 1)}>+</button>
                            </div>
                        </div>
                        <div className="peopleMenu_element_part">
                            <div className="element_part_children">
                                <p>Дети</p>
                                <p className="cildren">от 2 до 12 лет</p>
                            </div>
                            <div className="element_part_valueBlock">
                                <button className="valueBlock_button" disabled={childrenDisabledMinus} onClick={() => this.props.changePersonsNumber(1, -1)}>&#8211;</button>
                                <div className="valueBlock_value_text" >{this.props.persons[1]}</div>
                                <button className="valueBlock_button" disabled={childrenDisabledPlus} onClick={() => this.props.changePersonsNumber(1, 1)}>+</button>
                            </div>
                        </div>
                        <div className="peopleMenu_element_stateBlock">
                            <button className="peopleMenu_stateBlock_cancelButton" onClick={() => { this.props.close() }}>Отмена</button>
                            <button className="peopleMenu_stateBlock_applyButton">Готово</button>
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