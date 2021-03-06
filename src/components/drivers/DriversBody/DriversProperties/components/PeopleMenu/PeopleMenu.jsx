import React from 'react';
import './PeopleMenu.css'
import { connect } from 'react-redux';
import { changePersonsNumberDispatch, peopleMenuCall } from "../../../../../../redusers/Action"

class PeopleMenuClass extends React.Component {
    /*constructor(props) {
        super(props);
    }*/
    changePersonsNumber(index, value) {
        let persons = this.props.storeState.persons.slice();
        persons[index] += value;
        if (persons[0] >= 1 && persons[1] >= 0) {
            this.props.dispatch(changePersonsNumberDispatch(persons));
        }
    }
    peopleMenuCall(clear) {
        if (clear) {
            this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld));
        }
        this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu));
    }

    render() {
        let peopleDisabledMinus = true;
        let peopleDisabledPlus = false;
        let childrenDisabledMinus = true;
        let childrenDisabledPlus = false;
        let textInfo = this.props.storeState.languageTextMain.drivers.driversProperties.peopleMenu;

        if (this.props.isVisible) {
            if (this.props.storeState.persons[0] === 1) {//заменил 2е на 3е равенства
                peopleDisabledMinus = true;
            }
            if (this.props.storeState.persons[0] >= 2) {
                peopleDisabledMinus = false;
            }
            if (this.props.storeState.persons[1] === 0) {
                childrenDisabledMinus = true;
            }
            if (this.props.storeState.persons[1] >= 1) {
                childrenDisabledMinus = false;
            }
            return (
                <div className="drivers_properties_peopleMenu">
                    <div className="peopleMenu_element">
                        <div className="peopleMenu_element_part">
                            <p>{textInfo.adults}</p>
                            <div className="element_part_valueBlock">
                                <button className="valueBlock_button minus" disabled={peopleDisabledMinus} onClick={() => this.changePersonsNumber(0, -1)}>&#8211;</button>
                                <div className="valueBlock_value_text">{this.props.storeState.persons[0]}</div>
                                <button className="valueBlock_button" disabled={peopleDisabledPlus} onClick={() => this.changePersonsNumber(0, 1)}>+</button>
                            </div>
                        </div>
                        <div className="peopleMenu_element_part">
                            <div className="element_part_children">
                                <p>{textInfo.children}</p>
                                <p className="cildren">{textInfo.childrenProps}</p>
                            </div>
                            <div className="element_part_valueBlock">
                                <button className="valueBlock_button minus" disabled={childrenDisabledMinus} onClick={() => this.changePersonsNumber(1, -1)}>&#8211;</button>
                                <div className="valueBlock_value_text" >{this.props.storeState.persons[1]}</div>
                                <button className="valueBlock_button" disabled={childrenDisabledPlus} onClick={() => this.changePersonsNumber(1, 1)}>+</button>
                            </div>
                        </div>
                        <div className="peopleMenu_element_stateBlock">
                            <button className="peopleMenu_stateBlock_cancelButton" onClick={() => { this.peopleMenuCall(true) }}>{textInfo.cancel}</button>
                            <button className="peopleMenu_stateBlock_applyButton" onClick={() => this.peopleMenuCall(false)}>{textInfo.done}</button>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <React.Fragment />
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