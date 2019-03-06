import React, { Component } from 'react';
import './DriversProperties.css'
import LanguageMenu from './components/LanguageMenu/LanguageMenu.jsx'
import PeopleMenu from './components/PeopleMenu/PeopleMenu.jsx'
import SortMenu from './components/SortMenu/SortMenu.jsx'
import PagesMenu from './components/PagesMenu/PagesMenu.jsx'
import ValueMenu from './components/ValueMenu/ValueMenu.jsx'
import AutoMenu from './components/AutoMenu/AutoMenu.jsx'
import { connect } from 'react-redux';
import {
  setAuto, setPages, setSortMenu, setTempPricePart, languageMenuIsVisibal,
  changePersonsNumberDispatch, changePersonsNumberDispatchOld, peopleMenuCall, autoMenuCall} from "../../../../redusers/Action"

import userBlueIcon from '../DriversBlock/pictures/user_blue.svg'


class DriversPropertiesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMenu: false,
      pagesMenu: false,
      sortMenuValue: "Популярность",
      sortMenuVariants: ["Популярность", "Рейтинг", "Цена"],
      selectedPrice: this.props.maxValue
    }
    this.sortMenuCall = this.sortMenuCall.bind(this);
    this.sortMenuChoose = this.sortMenuChoose.bind(this);
    this.pagesMenuCall = this.pagesMenuCall.bind(this);
    this.pagesMenuChoose = this.pagesMenuChoose.bind(this);
    this.valueMenuCall = this.valueMenuCall.bind(this);
  }


  sortMenuCall() {
    this.setState({
      sortMenu: !this.state.sortMenu
    })
  }

  sortMenuChoose(value) {
    debugger
    this.props.dispatch(setSortMenu(value));
    this.setState({
      sortMenu: false,
    })
  }
  pagesMenuCall() {
    this.setState({
      pagesMenu: !this.state.pagesMenu
    })
  }
  valueMenuCall() {
    this.props.dispatch(setTempPricePart(this.props.storeState.pricePart));
  }

  pagesMenuChoose(value) {
    this.props.dispatch(setPages(value));
    this.setState({
      pagesMenu: false,
    })
  }





  render() {
    function valueTextGenerator(pricePart, maxPrice) {
      if (pricePart < 100) {
        let price = pricePart * maxPrice / 100;
        return "до " + price;
      }
      else {
        return "Цена";
      }
    }

    function personsCalculation(people) {
      let result = 0;
      people.forEach(function (item, i, people) {
        result += item;
      })
      let resultString = "";
      if ([2, 3, 4].some(el => el === result)) {
        resultString = result + " человека";
      }
      else {
        resultString = result + " человек";
      }
      return resultString;
    }

    let personsNumberString = personsCalculation(this.props.storeState.persons);

    let valueText = valueTextGenerator(this.props.storeState.pricePart, this.props.storeState.maxPrice);
    return (
      <div className="drivers_properties" >

        <div className="properties_leftBlock">
          <div className="drivers_properties_text">Подобрать:
          </div>
          <div className="properties_buttonStyle properties_leftButton" onClick={() => this.props.dispatch(languageMenuIsVisibal(!this.props.storeState.languageMenu))}>
            <div className="properties_value"><img src={this.props.storeState.languageIcon} width="15px" height="15px" />{this.props.storeState.languageValue}</div>
            <div className="properties_arrow"></div>
            <LanguageMenu isVisible={this.props.storeState.languageMenu} />
          </div>
          <div className="properties_buttonStyle properties_leftButton" onClick={() => this.props.dispatch(autoMenuCall(!this.props.storeState.autoMenu))}>
            <div className="properties_carPicture">
              <img src={this.props.storeState.autoIcon} width="100%" height="100%" alt="carImage" />
            </div>
            <div className="properties_value">{this.props.storeState.autoValue}</div>
            <div className="properties_arrow"></div>
            <AutoMenu isVisible={this.props.storeState.autoMenu} />
          </div>
          <div style={{ position: "relative" }}>
            <div className="properties_buttonStyle properties_leftButton" onClick={() => {
              if (!this.props.storeState.peopleMenu) {
                debugger
                this.props.dispatch(changePersonsNumberDispatchOld(this.props.storeState.persons))
              } else {
                debugger
                this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld))
              };
              this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu))
            }}>
              <div className="properties_value"><img src={userBlueIcon} width="12px" height="12px" />{personsNumberString}</div>
              <div className="properties_arrow"></div>
            </div>
            <PeopleMenu isVisible={this.props.storeState.peopleMenu} />
          </div>
          <div style={{ position: "relative" }} >
            <div className="properties_buttonStyle properties_leftButton" onClick={() => { this.valueMenuCall() }}>
              <div className="properties_value">{valueText}</div>
              <div className="properties_arrow"></div>
            </div>
            <ValueMenu isVisible={this.state.valueMenu} maxPrice={this.props.maxPrice} price={this.props.price} changePrice={this.props.changePrice} close={this.valueMenuCall} />
          </div>
        </div>
        <div className="properties_rightBlock">
          <div className="properties_buttonStyle properties_rightButton" onClick={() => this.sortMenuCall()}>
            <div className="properties_rightButton_characteristic">Сортировать:</div>
            <div className="properties_rightButton_value">{this.props.storeState.sortMenuValue}</div>
            <div className="properties_arrow"></div>
            <SortMenu isVisible={this.state.sortMenu} chooseFunc={this.sortMenuChoose} variants={this.props.storeState.sortMenuVariants} />
          </div>
          <div className="properties_buttonStyle properties_rightButton" onClick={() => this.pagesMenuCall()}>
            <div className="properties_rightButton_characteristic">{this.props.storeState.pagesMenuValue} / страниц</div>
            <div className="properties_arrow"></div>
            <PagesMenu isVisible={this.state.pagesMenu} chooseFunc={this.pagesMenuChoose} />
          </div>
        </div>
      </div>

    )
  }
}

const DriversProperties = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
)(DriversPropertiesClass);

export default DriversProperties;
// setTempPricePart: (tempPricePart)=>dispatch({type: "SET_TEMP_PRICE_PART", tempPricePart: tempPricePart})
// const DriversProperties = connect(
//   (state) => ({
//     storeState: state.AppReduser,
//   }),
//   (dispatch) => ({
//     setAuto: (autoValue) => dispatch({type: "SET_AUTO", autoValue: autoValue}),
//     setPages: (pagesMenuValue) => dispatch({type: "SET_PAGES", pagesMenuValue: pagesMenuValue}),
//     setSortMenu: (sortMenuValue) => dispatch({type: "SET_SORT_MENU", sortMenuValue: sortMenuValue})
//   })
// )(DriversPropertiesClass);

// export default DriversProperties;