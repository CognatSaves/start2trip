import React from 'react';
import './DriversProperties.css'
import LanguageMenu from './components/LanguageMenu/LanguageMenu.jsx'
import PeopleMenu from './components/PeopleMenu/PeopleMenu.jsx'
import SortMenu from './components/SortMenu/SortMenu.jsx'
import PagesMenu from './components/PagesMenu/PagesMenu.jsx'
import ValueMenu from './components/ValueMenu/ValueMenu.jsx'
import AutoMenu from './components/AutoMenu/AutoMenu.jsx'
import userBlueIcon from '../DriversBlock/pictures/userWhite.svg'
import { connect } from 'react-redux';
import {
  setPagesVisible, setTempPricePart, languageMenuIsVisibal, setSortMenuVisible,
  changePersonsNumberDispatch, changePersonsNumberDispatchOld, peopleMenuCall, autoMenuCall
} from "../../../../redusers/Action"
import {setPages} from '../../../../redusers/Action'



class DriversPropertiesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPrice: this.props.maxValue
    }
    this.valueMenuCall = this.valueMenuCall.bind(this);
  }

  valueMenuCall(valueMenu) {
    this.props.dispatch(setTempPricePart(this.props.storeState.pricePart, valueMenu));
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
    
    console.log("driversProperties render");
    console.log(this.props.storeState.maxPrice);
    return (
      
      <div className="drivers_properties d-flex flex-wrap justify-content-between col-12" >
       <div className="properties_rightBlock d-flex">
          <div className="properties_rightButton d-flex" onClick={() => this.props.dispatch(setSortMenuVisible(!this.props.storeState.sortMenu))}>
            <div className="properties_rightButton_characteristic">Сортировать по:</div>
            {/* <div className="properties_rightButton_value">{this.props.storeState.sortMenuValue}</div>
            <div className="properties_arrow"></div> */}
            <SortMenu isVisible={this.props.storeState.sortMenu} />
          </div>
          {/* <div className="properties_buttonStyle properties_rightButton d-flex" onClick={() => this.props.dispatch(setPagesVisible(!this.props.storeState.pagesMenu))}>
            <div className="properties_rightButton_characteristic">{this.props.storeState.pagesMenuValue} / страниц</div>
            <div className="properties_arrow"></div>
            <PagesMenu pagesMenuVariants={this.props.storeState.pagesMenuVariants} isVisible={this.props.storeState.pagesMenu} setPages={setPages}/>
          </div> */}
        </div>
      
        <div className="properties_leftBlock d-flex">
          <div className="properties_buttonStyle properties_leftButton d-flex" onClick={() => this.props.dispatch(languageMenuIsVisibal(!this.props.storeState.languageMenu))}>
            <div className="properties_value d-flex"><img src={this.props.storeState.languageIcon} width="15px" height="15px" alt="L"/>{this.props.storeState.languageValue}</div>
            <div className="properties_arrow"></div>
            <LanguageMenu isVisible={this.props.storeState.languageMenu} />
          </div>
          <div className="properties_buttonStyle properties_leftButton d-flex" onClick={() => this.props.dispatch(autoMenuCall(!this.props.storeState.autoMenu))}>
            <div className="properties_carPicture">
              <img src={this.props.storeState.autoIcon} width="100%" height="100%" alt="carImage" />
            </div>
            <div className="properties_value d-flex">{this.props.storeState.autoValue}</div>
            <div className="properties_arrow"></div>
            <AutoMenu isVisible={this.props.storeState.autoMenu} />
          </div>
          <div style={{ position: "relative" }}>
            <div className="properties_buttonStyle properties_leftButton d-flex" onClick={() => {
              if (!this.props.storeState.peopleMenu) {
                this.props.dispatch(changePersonsNumberDispatchOld(this.props.storeState.persons))
              } else {
                this.props.dispatch(changePersonsNumberDispatch(this.props.storeState.personsOld))
              };
              this.props.dispatch(peopleMenuCall(!this.props.storeState.peopleMenu))
            }}>
              <div className="properties_value d-flex"><img src={userBlueIcon} width="12px" height="12px" alt="P"/>{personsNumberString}</div>
              <div className="properties_arrow"></div>
            </div>
            <PeopleMenu isVisible={this.props.storeState.peopleMenu} />
          </div>
          <div style={{ position: "relative" }} >
            <div className="properties_buttonStyle properties_leftButton d-flex" onClick={() => { this.valueMenuCall(true) }}>
              <div className="properties_value d-flex">{valueText}</div>
              <div className="properties_arrow"></div>
            </div>
            <ValueMenu isVisible={this.props.storeState.valueMenu}/>
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