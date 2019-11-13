import React from 'react';
import './DriversProperties.css'
import { openFilterShow } from "../../../../redusers/ActionDrivers"
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
import {
  setTempPricePart, setSortMenuVisible, changePersonsNumberDispatch,
  changePersonsNumberDispatchOld, peopleMenuCall
} from "../../../../redusers/Action"
import { setPricePartTour } from "../../../../redusers/ActionTours"

import userBlueIcon from '../../../media/userWhite.svg'

//import { setPages } from '../../../../redusers/Action'
//import PagesMenu from './components/PagesMenu/PagesMenu.jsx'

import LanguageMenu from './components/LanguageMenu/LanguageMenu.jsx'
import PeopleMenu from './components/PeopleMenu/PeopleMenu.jsx'
import SortMenu from './components/SortMenu/SortMenu.jsx'
import ValueMenu from './components/ValueMenu/ValueMenu.jsx'
import AutoMenu from './components/AutoMenu/AutoMenu.jsx'
import DatePicker from 'material-ui/DatePicker';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class DriversPropertiesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPrice: this.props.maxValue,
      sortIsVisible: false,
      tours: [],
    }
  }

  valueMenuCall = (valueMenu) => {
    let pricePart = this.props.hideTypeOfTransport ? this.props.toursState.pricePart : this.props.storeState.pricePart
    // this.props.dispatch(setTempPricePart(this.props.storeState.pricePart, valueMenu));

    if (this.props.hideTypeOfTransport) {
      this.props.dispatch(setPricePartTour(pricePart, valueMenu));
    } else {
      this.props.dispatch(setTempPricePart(pricePart, valueMenu));
    }
  }

  render() {
    function valueTextGenerator(pricePart, maxPrice, activeCurrency, textInfo) {
      if (pricePart !== maxPrice) {
        return textInfo.peopleMenu.priceWord + " " + (activeCurrency.isLeft ? activeCurrency.symbol + ' ' : '')
          + Math.ceil(pricePart * activeCurrency.costToDefault) +
          (!activeCurrency.isLeft ? ' ' + activeCurrency.symbol : '');
      }
      else {
        return textInfo.price;
      }
    }

    function personsCalculation(people) {
      let result = 0;
      people.forEach(function (item, i, people) {
        result += item;
      })
      let resultString = "";
      resultString = result + " " + textInfo.person;
      return resultString;
    }
    let textInfo = this.props.storeState.languageTextMain.drivers.driversProperties;

    let personsNumberString = personsCalculation(this.props.storeState.persons);
    let storeState = this.props.storeState;
    let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber]
    let valueText = valueTextGenerator((this.props.hideTypeOfTransport ? this.props.toursState.tempPricePart : this.props.storeState.pricePart), (this.props.hideTypeOfTransport ? this.props.toursState.maxPrice : this.props.storeState.maxPrice), activeCurrency, textInfo);

    if(this.state.tours.length>0){
      debugger;
      console.log(this.state.tours);
    }
    if (this.props.toursState.categories.length > 0 && (this.state.tours.length === 0 || (this.state.tours[0].local.name !== this.props.toursState.categories[0].local.name))) {
      this.setState({
        tours: this.props.toursState.categories,
    })
    }

    console.log("driversProperties render");
    console.log(this.props.storeState.maxPrice);

    return (

      <div className="drivers_properties d-flex flex-wrap justify-content-md-between justify-content-sm-center justify-content-center col-12"  >
        <div className="properties_rightBlock d-flex align-items-center">
          <div className="properties_rightButton d-flex" onClick={() => this.props.dispatch(setSortMenuVisible(!this.props.storeState.sortMenu))}>
            <div className="properties_rightButton_characteristic d-sm-block d-none">{textInfo.characteristic + ':'}</div>
            {isMobileOnly ?
              <>
                <span className="mobailSortIcon" onClick={() => { this.setState({ sortIsVisible: !this.state.sortIsVisible }) }}>{textInfo.sortText}</span>
                <span className="footerMobileIconFilter" onClick={() => { this.props.dispatch(openFilterShow(true)) }}>{textInfo.filterText}</span>
              </>
              : <div />}
            <SortMenu isVisible={this.state.sortIsVisible} click={() => { this.setState({ sortIsVisible: false }) }} />
          </div>
        </div>

        <div className="properties_leftBlock">
          <div className="properties_buttonStyle properties_leftButton d-flex align-items-center" >
            {/* {this.props.hideTypeOfTransport &&
              <DatePicker hintText={textInfo.departureDate} minDate={new Date()} id="basicInfoBirthday" className="calendarModal tourInfoContentDate" value={this.props.departureDate}
                onChange={(undefined, data) => { this.props.departureDateChange(data) }}
              />
            } */}
            {this.props.hideTypeOfTransport &&
              <FormControl className="d-flex ">
                <Select
                  value={this.props.tourType}
                  className="tourType"
                  onChange={(event, index, value) => {
                    this.props.tourTypeChange(event.target.value)
                  }}
                >
                  <MenuItem value={"default"}>{textInfo.menuItemValue}</MenuItem>
                  {this.state.tours.map((element, index) =>
                    <MenuItem value={element.id}>{element.local.name}</MenuItem>
                  )}
                </Select>
              </FormControl>
            }
          </div>
          <div className="properties_buttonStyle properties_leftButton d-flex  align-items-center" >
            <LanguageMenu isVisible={true} />
          </div>
          {!this.props.hideTypeOfTransport &&
            <div className="properties_buttonStyle properties_leftButton d-flex" >
              <AutoMenu isVisible={true} />
            </div>
          }

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
            <div className="properties_buttonStyle properties_leftButton d-flex" onClick={() => { this.valueMenuCall(this.props.hideTypeOfTransport ? !this.props.toursState.valueMenu : !this.props.storeState.valueMenu) }}>
              <div className="properties_value d-flex">{valueText}</div>
              <div className="properties_arrow"></div>
            </div>
            <ValueMenu isVisible={this.props.hideTypeOfTransport ? this.props.toursState.valueMenu : this.props.storeState.valueMenu} tours={this.props.hideTypeOfTransport} storeState={this.props.hideTypeOfTransport ? this.props.toursState : this.props.storeState} />
          </div>
        </div>
      </div>
    )
  }
}

const DriversProperties = connect(
  (state) => ({
    storeState: state.AppReduser,
    toursState: state.ToursReduser
  }),
)(DriversPropertiesClass);

export default DriversProperties;