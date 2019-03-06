import React, { Component } from 'react';
import './DriversProperties.css'
import LanguageMenu from './components/LanguageMenu/LanguageMenu.jsx'
import PeopleMenu from './components/PeopleMenu/PeopleMenu.jsx'
import SortMenu from './components/SortMenu/SortMenu.jsx'
import PagesMenu from './components/PagesMenu/PagesMenu.jsx'
import ValueMenu from './components/ValueMenu/ValueMenu.jsx'
import AutoMenu from './components/AutoMenu/AutoMenu.jsx'
import { connect } from 'react-redux';
import sedan from './components/AutoMenu/pictures/sedan.svg';
import { setAuto, setPages, setSortMenu, setTempPricePart,
   changePersonsNumberDispatch, changePersonsNumberDispatchOld, peopleMenuCall, languageValueChooseDispatch } from "../../../../redusers/Action"
import languageBlueIcon from '../DriversBlock/pictures/language_blue.svg'
import userBlueIcon from '../DriversBlock/pictures/user_blue.svg'


class DriversPropertiesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMenu: false,
      pagesMenu: false,
      autoMenu: false,
      sortMenuValue: "Популярность",
      sortMenuVariants: ["Популярность", "Рейтинг", "Цена"],
      autoIcon: sedan,
      selectedPrice: this.props.maxValue
    }
    this.languageMenuCall = this.languageMenuCall.bind(this);
    this.sortMenuCall = this.sortMenuCall.bind(this);
    this.sortMenuChoose = this.sortMenuChoose.bind(this);
    this.pagesMenuCall = this.pagesMenuCall.bind(this);
    this.pagesMenuChoose = this.pagesMenuChoose.bind(this);

    this.valueMenuCall = this.valueMenuCall.bind(this);
    this.autoMenuCall = this.autoMenuCall.bind(this);

    this.autoValueChoose = this.autoValueChoose.bind(this);
    //this.languageValueChoose = this.languageValueChoose.bind(this);
  }

  languageMenuCall() {
    this.setState({
      languageMenu: !this.state.languageMenu
    })
  }

  sortMenuCall() {
    this.setState({
      sortMenu: !this.state.sortMenu
    })
  }

  sortMenuChoose(value) {
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
  valueMenuCall(valueMenu){
    this.props.dispatch(setTempPricePart(this.props.storeState.pricePart, valueMenu));
  }

  pagesMenuChoose(value) {
    this.props.dispatch(setPages(value));
    this.setState({
      pagesMenu: false,
    })
  }

  autoMenuCall() {
    this.setState({
      autoMenu: !this.state.autoMenu
    })
  }

  autoValueChoose(value, icon) {
    this.props.dispatch(setAuto(value));
    this.setState({
      autoMenu: false,
      autoIcon: icon
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
          <div className="properties_buttonStyle properties_leftButton" onClick={() => this.props.dispatch(languageValueChooseDispatch(this.props.storeState.languageValue,this.props.storeState.languageIcon,true))}>
            <div className="properties_value"><img src={this.props.storeState.languageIcon} width="15px" height="15px" />{this.props.storeState.languageValue}</div>
            <div className="properties_arrow"></div>
            <LanguageMenu isVisible={this.props.storeState.languageMenu}  />
          </div>
          <div className="properties_buttonStyle properties_leftButton" onClick={() => this.autoMenuCall()}>
            <div className="properties_carPicture">
              <img src={this.state.autoIcon} width="100%" height="100%" alt="carImage" />
            </div>
            <div className="properties_value">{this.props.storeState.autoValue}</div>
            <div className="properties_arrow"></div>
            <AutoMenu isVisible={this.state.autoMenu} autoVariants={this.state.autoVariants} autoValueChoose={this.autoValueChoose} />
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
            <div className="properties_buttonStyle properties_leftButton" onClick={() => { this.valueMenuCall(true) }}>
              <div className="properties_value">{valueText}</div>
              <div className="properties_arrow"></div>
            </div>
            <ValueMenu isVisible={this.props.storeState.valueMenu} maxPrice={this.props.maxPrice} price={this.props.price} changePrice={this.props.changePrice}  />
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