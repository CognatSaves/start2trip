import React from 'react';
import './DriversProperties.css'
import LanguageMenu from './components/LanguageMenu/LanguageMenu.jsx'
import PeopleMenu from './components/PeopleMenu/PeopleMenu.jsx'
import SortMenu from './components/SortMenu/SortMenu.jsx'
//import PagesMenu from './components/PagesMenu/PagesMenu.jsx'
import ValueMenu from './components/ValueMenu/ValueMenu.jsx'
import AutoMenu from './components/AutoMenu/AutoMenu.jsx'
import userBlueIcon from '../../../media/userWhite.svg'
import { openFilterShow } from "../../../../redusers/ActionDrivers"
import { connect } from 'react-redux';
import {
  /*setPagesVisible,*/ setTempPricePart,/* languageMenuIsVisibal, */setSortMenuVisible,
  changePersonsNumberDispatch, changePersonsNumberDispatchOld, peopleMenuCall/*, autoMenuCall*/
} from "../../../../redusers/Action"
//import { setPages } from '../../../../redusers/Action'
import { isMobileOnly } from 'react-device-detect';



class DriversPropertiesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPrice: this.props.maxValue,
      sortIsVisible: false,
    }
  }

  valueMenuCall = (valueMenu) => {
    this.props.dispatch(setTempPricePart(this.props.storeState.pricePart, valueMenu));
  }

  render() {
    function valueTextGenerator(pricePart, maxPrice) {
      if (pricePart !== maxPrice) {
        return "до " + pricePart;
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
      /*if ([2, 3, 4].some(el => el === result)) {
        resultString = result + " человека";
      }
      else {
        resultString = result + " человек";
      }*/
      resultString = result + " "+textInfo.person;
      return resultString;
    }
    let textInfo = this.props.storeState.languageTextMain.drivers.driversProperties;
    
    let personsNumberString = personsCalculation(this.props.storeState.persons);

    let valueText = valueTextGenerator(this.props.storeState.pricePart, this.props.storeState.maxPrice);

    console.log("driversProperties render");
    console.log(this.props.storeState.maxPrice);
    return (

      <div className="drivers_properties d-flex flex-wrap justify-content-md-between justify-content-sm-center justify-content-center col-12" >
        <div className="properties_rightBlock d-flex align-items-center">
          <div className="properties_rightButton d-flex" onClick={() => this.props.dispatch(setSortMenuVisible(!this.props.storeState.sortMenu))}>
            <div className="properties_rightButton_characteristic d-sm-block d-none">{textInfo.characteristic+':'}</div>
            {isMobileOnly ?
              <React.Fragment>
                <span className="mobailSortIcon" onClick={() => { this.setState({ sortIsVisible: !this.state.sortIsVisible }) }}>{textInfo.sortText}</span>
                <span className="footerMobileIconFilter" onClick={() => { this.props.dispatch(openFilterShow(true)) }}>{textInfo.filterText}</span>
              </React.Fragment>
              : <div />}
            <SortMenu isVisible={this.state.sortIsVisible} click={() => { this.setState({ sortIsVisible: false }) }} />
          </div>
        </div>

        <div className="properties_leftBlock">
          <div className="properties_buttonStyle properties_leftButton d-flex" >
            <LanguageMenu isVisible={true} />
          </div>
          <div className="properties_buttonStyle properties_leftButton d-flex" >
            <AutoMenu isVisible={true} />
          </div>

          <div className="d-flex align-items-center" style={{ position: "relative" }}>
            <div className="properties_buttonStyle properties_leftButton d-flex" onClick={() => {
              if (!this.props.storeState.peopleMenu) {
                this.props.dispatch(changePersonsNumberDispatchOld(this.props.storeState.persons))
              } else {
                this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld))
              };
              this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu))
            }}>
              <div className="properties_value d-flex"><img src={userBlueIcon} width="12px" height="12px" alt="P" />{personsNumberString}</div>
              <div className="properties_arrow"></div>
            </div>
            <PeopleMenu isVisible={this.props.storeState.peopleMenu} />
          </div>
          <div className="d-flex align-items-center" style={{ position: "relative" }} >
            <div className="properties_buttonStyle properties_leftButton d-flex" onClick={() => { this.valueMenuCall(true) }}>
              <div className="properties_value d-flex">{valueText}</div>
              <div className="properties_arrow"></div>
            </div>
            <ValueMenu isVisible={this.props.storeState.valueMenu} />
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