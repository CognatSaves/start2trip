import React from 'react';
import './MobileFilter.css'
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap'
import Slider from '../components/ValueMenu/Slider';
import { openFilterShow } from "../../../../../redusers/ActionDrivers"
import sedan from './pictures/sedan.svg';
import jeep from './pictures/jeep.svg';
import microbus from './pictures/microbus.svg';
import minivan from './pictures/minivan.svg';
import languageWhite from './pictures/languageWhite.svg';
import {
  setPricePart,
  setTempPricePart,
  changePersonsNumberDispatch,
  peopleMenuCall,
  languageValueChooseDispatch,
  languageMenuIsVisibal,
  setAuto,
} from '../../../../../redusers/Action';

class MobileFilterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsePeople: false,
      collapseLanguageMenu: false,
      collapseAuto: false,

    }
  }

  changeTempPrice = (value) => {
    this.props.dispatch(setTempPricePart(value, true));
  }

  setPrice = () => {
    let tempValue = this.props.storeState.tempPricePart;
    this.props.dispatch(setPricePart(tempValue, false));
  }
  close = () => {
    this.props.dispatch(setTempPricePart(this.props.storeState.pricePart, false));
}

  changePersonsNumber=(index, value)=> {
    let persons = this.props.storeState.persons.slice();
    persons[index] += value;
    if (persons[0] >= 1 && persons[1] >= 0) {
      this.props.dispatch(changePersonsNumberDispatch(persons));
    }
  }

  peopleMenuCall=(clear)=> {
    if (clear) {
      this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld));
    }
    this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu));
  }

  languageValueChoose=(value, icon)=> {
    this.props.dispatch(languageValueChooseDispatch(value, icon));
    this.props.dispatch(languageMenuIsVisibal(false));
  }

  render() {
    let peopleDisabledMinus = true;
    let peopleDisabledPlus = false;
    let childrenDisabledMinus = true;
    let childrenDisabledPlus = false;

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

    let pictureArray = [sedan, jeep, minivan, microbus];
    return (
      <div className="mobileFilterModal" style={{ right: this.props.storeState.openFilter ? "0px" : "100%" }}>

        <div className="mobileFilterModalHeader d-flex justify-content-between">
          <span className="mobileFilterModalBack" onClick={() => { this.props.dispatch(openFilterShow(false))}}>Фильтры</span>
          <span className="mobileFilterModalClear" onClick={() => {this.close(); this.peopleMenuCall(true); this.props.dispatch(setAuto("Любое авто", pictureArray[0])); this.props.dispatch(languageValueChooseDispatch("Любой язык", languageWhite)) }}>Сбросить</span>
        </div>

        <div className="mobileFilterModalBody">

          <div className="mobileFilterModalBodyElement d-flex flex-column justify-content-center">
            <div className="mobileFilterModalContent d-flex justify-content-between align-items-center">
              <span>Цена</span>
              <p>{"До $" + (this.props.storeState.maxPrice * this.props.storeState.tempPricePart / 100)}</p>
            </div>

            <Slider changeMaxValue={this.changeTempPrice} defaultValue={[0, this.props.storeState.tempPricePart]} />
          </div>

          <div className="mobileFilterModalBodyElement">
            <div className="mobileFilterCollapseBt">
              <span onClick={() => { this.setState({ collapsePeople: !this.state.collapsePeople }) }}>Количество человек</span>
            </div>

            <Collapse isOpen={this.state.collapsePeople}>
              <div className="">
                <div className="modalBodyElementPeople">
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
                </div>
              </div>
            </Collapse>

          </div>

          <div className="mobileFilterModalBodyElement">
            <div className="mobileFilterCollapseBt">
              <span onClick={() => { this.setState({ collapseAuto: !this.state.collapseAuto }) }}>Тип авто</span>
            </div>

            <Collapse isOpen={this.state.collapseAuto}>
              <div className="modalBodyElementAuto" >
                {this.props.storeState.autoVariants.map((element, index) =>{
                  let checked = false
                if(this.props.storeState.autoValue === element){
                  checked = true;
                };
                return(
                  <div className="autoMenu_element">
                    <div className="autoMenu_element_textBlock" onClick={()=>{this.props.dispatch(setAuto(element, pictureArray[index]))}}>
                      <label htmlFor={index} className="autoMenu_element_text" style={{background:"url("+pictureArray[index]+") no-repeat"}}>{element}</label>
                      <input type="checkbox" checked={checked} id={index}/>
                    </div>
                  </div>
                )
                })}
              </div>
            </Collapse>

          </div>

          <div className="mobileFilterModalBodyElement">
            <div className="mobileFilterCollapseBt">
              <span onClick={() => { this.setState({ collapseLanguageMenu: !this.state.collapseLanguageMenu }) }}>Язык</span>
            </div>

            <Collapse isOpen={this.state.collapseLanguageMenu}>
              <div className="modalBodyElementlanguage" >
                {this.props.storeState.languages.map((element, index) =>{
                  let checked = false
                if(this.props.storeState.languageValue === element.languageName){
                  checked = true;
                };
                return(
                  <div className="languageMenu_element" onClick={() => this.languageValueChoose(element.languageName, element.icon)}>
                    <label htmlFor={index} className="textBlock_value" style={{background:"url("+element.icon+") no-repeat"}}>{element.languageName}</label>
                    <input type="checkbox" checked={checked} id={index}/>
                  </div>
                )
              })}
              </div>
            </Collapse>

          </div>

        </div>

        <div className="mobileFilterModalFooterComplete">
          <span onClick={() =>{this.setPrice(); this.peopleMenuCall(false) }} >Готово</span>
        </div>
      </div>

    );
  }

}

const MobileFilter = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
  }),
)(MobileFilterClass);

export default MobileFilter;