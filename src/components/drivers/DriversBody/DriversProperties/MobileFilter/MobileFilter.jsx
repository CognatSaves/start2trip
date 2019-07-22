import React from 'react';
import './MobileFilter.css'
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap'
// import Slider from '../components/ValueMenu/Slider';
import { openFilterShow } from "../../../../../redusers/ActionDrivers"
import sedan from '../../../../media/sedan.svg';
import jeep from '../../../../media/jeep.svg';
import microbus from '../../../../media/microbus.svg';
import minivan from '../../../../media/minivan.svg';
// import languageWhite from '../../../../media/languageWhite.svg';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';

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
      price: this.props.storeState.pricePart,
      autoVariants: [],
      languagesVariants: [],

    }
  }

  changeTempPrice = (value) => {
    if (value === this.state.price) {

    } else {
      this.setState({ price: value });
    }
  }


  setPrice = () => {
    this.props.dispatch(setPricePart(this.state.price, false));
  }
  //   close = () => {
  //     this.props.dispatch(setTempPricePart(this.props.storeState.pricePart, false));
  // }

  changePersonsNumber = (index, value) => {
    let persons = this.props.storeState.persons.slice();
    persons[index] += value;
    if (persons[0] >= 1 && persons[1] >= 0) {
      this.props.dispatch(changePersonsNumberDispatch(persons));
    }
  }

  peopleMenuCall = (clear) => {
    if (clear) {
      this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld));
    }
    this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu));
  }

  // languageValueChoose = (value, icon) => {
  //   this.props.dispatch(languageValueChooseDispatch(value, icon));
  //   this.props.dispatch(languageMenuIsVisibal(false));
  // }
  checkedAuto = (index) => {

    let newArrayVariants = this.state.autoVariants;
    let newEl = newArrayVariants.indexOf(index)
    if (newEl === -1) {
      newArrayVariants.push(index)
    } else {
      newArrayVariants.splice(newEl, 1)
    }
    this.setState({ autoVariants: newArrayVariants })

  }
  checkedLanguages = (index) => {

    let newArrayVariants = this.state.languagesVariants;
    let newEl = newArrayVariants.indexOf(index)
    if (newEl === -1) {
      newArrayVariants.push(index)
    } else {
      newArrayVariants.splice(newEl, 1)
    }
    this.setState({ languagesVariants: newArrayVariants })

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
      <React.Fragment>
        {this.props.storeState.maxPrice === 0 ? <React.Fragment></React.Fragment> : <React.Fragment>
          <div className="mobileFilterModal" style={{ left: this.props.storeState.openFilter ? "0px" : "100%" }}>

            <div className="mobileFilterModalHeader d-flex justify-content-between">
              <span className="mobileFilterModalBack" onClick={() => { this.props.dispatch(openFilterShow(false)) }}>Фильтры</span>
              <span className="mobileFilterModalClear" onClick={() => { this.setState({ autoVariants: [], languagesVariants: [], price: this.props.storeState.maxPrice });  this.peopleMenuCall(true); this.props.dispatch(setAuto([])); this.props.dispatch(languageValueChooseDispatch([]));this.props.dispatch(setPricePart(this.props.storeState.maxPrice, false)); }}>Сбросить</span>
            </div>

            <div className="mobileFilterModalBody">

              <div className="mobileFilterModalBodyElement d-flex flex-column justify-content-center">
                <div className="mobileFilterModalContent d-flex justify-content-between align-items-center">
                  <span>Цена</span>
                  <p>{"До $" + this.state.price}</p>
                </div>
                <Slider
                  defaultValue={this.props.storeState.maxPrice}
                  getAriaValueText={this.changeTempPrice}
                  value={this.state.price}
                  onChange={(e,value)=>{this.setState({price:value})}}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={this.props.storeState.maxPrice / 25}
                  marks
                  min={0}
                  max={this.props.storeState.maxPrice}
                />

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
                    {this.props.storeState.autoVariants.map((element, index) => {

                      let checked = false
                      for (let i = 0; i < this.state.autoVariants.length; i++) {
                        if (this.state.autoVariants[i] === index) {
                          checked = true;
                        };
                      }
                      return (
                        <div className="autoMenu_element">
                          <div className="autoMenu_element_textBlock" >
                            <label htmlFor={index + "auto"} className="autoMenu_element_text" style={{ background: "url(" + pictureArray[index] + ") no-repeat" }}>{element}</label>
                            <Checkbox checked={checked} id={index + "auto"} onChange={() => this.checkedAuto(index)} />
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
                    {this.props.storeState.languages.map((element, index) => {
                      let checked = false
                      for (let i = 0; i < this.state.languagesVariants.length; i++) {
                        if (this.state.languagesVariants[i] === index) {
                          checked = true;
                        };
                      }
                      //onClick={() => this.languageValueChoose(element.languageName, element.icon)}
                      return (
                        <div className="languageMenu_element" >
                          <label htmlFor={index + "language"} className="textBlock_value" style={{ background: "url(" + element.icon + ") no-repeat" }}>{element.languageName}</label>
                          <Checkbox checked={checked} id={index + "language"} onChange={() => this.checkedLanguages(index)} />
                        </div>
                      )
                    })}
                  </div>
                </Collapse>

              </div>

            </div>

            <div className="mobileFilterModalFooterComplete">
              <span onClick={() => { this.peopleMenuCall(false); this.props.dispatch(setAuto(this.state.autoVariants)); this.props.dispatch(languageValueChooseDispatch(this.state.languagesVariants)); this.props.dispatch(openFilterShow(false)); this.setPrice(); }} >Показать результаты</span>
            </div>
          </div>
        </React.Fragment>}

      </React.Fragment>
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