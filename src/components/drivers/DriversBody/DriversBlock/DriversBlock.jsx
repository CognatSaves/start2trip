import React from 'react';
import './DriversBlock.css'
import './InfoBlock.css'
import './TripBlock.css'
import Manipulator from '../../../manipulator/Manipulator';
import { connect } from 'react-redux';
// import driverPhoto from './pictures/driver1/drivers_body_photo.png';
// import emptyLike from './pictures/like_contour.svg';
// import filledLike from './pictures/like_blue.svg';
// import selectedFilledLike from './pictures/like_orange.svg';
// import jeep from './pictures/jeepBlue.svg';
import { Link } from 'react-router-dom';

import Stars from '../../../stars/Stars';
import { setPage, setMorePagesShow } from '../../../../redusers/ActionDrivers'
// import ToyotaPrado from './pictures/ToyotaPrado.jpg';
import requests from '../../../../config';

class DriversBlockClass extends React.Component {
  constructor(props) {
    super(props);
    
    //let url = document.URL;
    let date = props.globalReduser.findGetParameter('date');
    let langISO = props.globalReduser.findGetParameter('lang');
    this.state = {
      openModal: false,
      country: this.props.country,
      cities: this.props.cities,
      date: date,
      lang: langISO!==null ? langISO : 'ENG'
    }
    
  }
  setPage = (page) => {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
    //console.log("SetPage has been called");
  }
  showMorePages = () => {
    this.props.dispatch(setMorePagesShow());
  }

  sortLanguage = (element) => {
    if (this.props.storeState.languageValue.length !== 0) {
      for (let i = 0; i < this.props.storeState.languageValue.length; i++) {
        if (element.language.indexOf(this.props.storeState.languageValue[i]) !== -1) {
          return true
        }
      }
    } else {
      return true
    }
  }

  sortAuto = (element) => {
    if (this.props.storeState.autoValue.length !== 0) {
      for (let i = 0; i < this.props.storeState.autoValue.length; i++) {
        if (element.carType === this.props.storeState.autoValue[i]) {
          return true
        }
      }
    } else {
      return true
    }
    return false
  }
  sortDrivers = (array) => {

    let tempArray = [];
    let tempPrice = this.props.storeState.pricePart;
    this.setLanguagesNumbers(this, array)
    array.forEach((element, index) => {

      if (element.price <= tempPrice && element.carCapacity >= this.props.storeState.persons[1] + this.props.storeState.persons[0] &&
        (this.sortLanguage(element)) && (this.sortAuto(element))
      ) {
        tempArray.push(element);
      }
    });
    return tempArray
  }

  driversSort = (array, type) => {

    let tempArray = this.sortDrivers(array);
    console.log(type, "type")

    switch (type) {
      case "Популярности":
        return tempArray.sort((a, b) => { return a.comments > b.comments ? -1 : 1 });
      case "Рейтингу":
        return tempArray.sort((a, b) => { return a.rating > b.rating ? -1 : 1 });
      case "Цене":
        let sortArrayPrice = tempArray.sort((a, b) => { return a.price > b.price ? -1 : 1 });
        if (this.props.storeState.sortMenuWay) {
          sortArrayPrice.reverse()
        }
        return sortArrayPrice
      case "Сначала дешевые":
        let sortArrayPriceLow = tempArray.sort((a, b) => { return a.price > b.price ? -1 : 1 });
        return sortArrayPriceLow
      case "Сначала дорогие":
        let sortArrayPriceHige = tempArray.sort((a, b) => { return a.price > b.price ? -1 : 1 });
        sortArrayPriceHige.reverse()
        return sortArrayPriceHige
      default: return tempArray;
    }

  }
  setLanguagesNumbers = (that, selectedElements) => {

    selectedElements.map((element, index) => {
      element.language.map((el, i) => {
        for (let t = 0; t < that.props.storeState.languages.length; t++) {
          if (el === that.props.storeState.languages[t].ISO) {
            element.language[i] = t;
          }
        }
      })
      for (let k = 0; k < that.props.driversState.carTypes.length; k++) {
        if (element.carType === that.props.driversState.carTypes[k].id) {
          element.carType = k;
        }
      }
    })
  }
  render() {
    /*let driversArray = this.driversSort([...this.props.driversState.drivers], this.props.storeState.sortMenuValue);
    
    let selectedElements = driversArray.slice((this.props.driversState.page - this.props.driversState.showPages) * this.props.storeState.pagesMenuValue,
      (this.props.driversState.page) * this.props.storeState.pagesMenuValue);

    let srcArray = Array(this.props.storeState.pagesMenuValue * this.props.driversState.showPages).fill(emptyLike);
    srcArray[0] = selectedFilledLike;
    srcArray[1] = filledLike;
    console.log('selectedEl');
    console.log(selectedElements);*/

    console.log('DriversBlock render');
    
    let driversArray = this.driversSort([...this.props.driversState.driversList], this.props.storeState.sortMenuValue);
    let from = (this.props.driversState.page - this.props.driversState.showPages) * this.props.storeState.pagesMenuValue;
    let number = (this.props.driversState.page) * this.props.storeState.pagesMenuValue;
    let selectedElements = driversArray.slice(from, number);
    //let srcArray = Array(this.props.storeState.pagesMenuValue * this.props.driversState.showPages).fill(emptyLike);
    //srcArray[0] = selectedFilledLike;
    //srcArray[1] = filledLike;


    function fingCorrectCartypeName(carType, selectedISO) {
      let res;
      switch (selectedISO) {
        case 'ENG':
          res = carType.name_en;
          break;
        case 'RUS':
          res = carType.name_ru;
          break;
        default: res = carType.name_en;
      }
      return res;
    }
    /*
    function findOneCarProp(element,carProps, storeState){
      let res;
      for(let j=0;j<carProps.length; j++){
          if(element===carProps[j].id){
              let selectedISO = storeState.languages[storeState.activeLanguageNumber] ? storeState.languages[storeState.activeLanguageNumber].ISO : '';
              switch (selectedISO){
                  case 'ENG':
                      res=carProps[j].name_en;
                      break;
                  case 'RUS':
                      res=carProps[j].name_ru;
                      break;
                  default: res=carProps[j].name_en;
              }
              return res;
              //res[i]=carTypes[j].name_ru;
          }
      }
      return '';
    }
    */
    // this.setLanguagesNumbers(this, selectedElements);
    console.log('selectedEl');
    console.log(selectedElements);
    console.log(this.props.storeState.languages, "this.props.storeState.languagess");

    console.log('DriversBlock render');
    console.log(this.props);
    let storeState = this.props.storeState;
    let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber]
    let textInfo = this.props.storeState.languageTextMain.drivers.driversBlock;

    return (
      <div className="drivers_block d-flex flex-wrap">
        {
          selectedElements.map((element, index) =>{
            let linkAddress = `/driverProfile/${element.id}-${element.carId}-${this.state.country}-${this.state.cities}?date=`+this.state.date+"&lang="+this.state.lang+"&countryISO="+this.props.storeState.country;
            return(
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3">
                <div className="driversBlock_driverCard d-flex flex-column ">
                  <div className="driversBlock_carImage" style={{ background: "url(" + requests.serverAddress + element.carImage + ") no-repeat", backgroundSize: "cover" }}>
                    <Link to={linkAddress} className="driversBlock_carBlackout">
                      <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                    </Link>
                  </div>

                  <div className="driverBlock_driverInfoBlock d-flex flex-column">

                    <Link to={linkAddress} className="driversBlock_driverInfoBlock_element driversBlock_carName">{element.carBrand}</Link>
                    <div className="driverBlock_carInfoLine d-flex">
                      <div className="driversBlock_driverCard_carIcon" style={{ background: "url(" + requests.serverAddress + this.props.driversState.carTypes[element.carType].carTypeImage + ") no-repeat", backgroundSize: "42px 30px", backgroundPosition: "-5px 0px" }} />
                      <div className="driversBlock_carInfoLine_value">
                        {
                          fingCorrectCartypeName(this.props.driversState.carTypes[element.carType], storeState.languages[storeState.activeLanguageNumber].ISO)
                          + ", " + element.carCapacity + " " + textInfo.carCapacity
                        }
                      </div>
                    </div>
                    <div className="driversBlock_driverInfoBlock_element d-flex">
                      <div className="driversBlock_driverCard_photo" style={{ background: "url(" + requests.serverAddress + element.avatar + ") no-repeat" }} />
                      <div className="d-flex flex-column driversBlock_driverCard_driverInfo">
                        <Link to={linkAddress} className="driversBlock_driversInfo_name">{element.name}</Link>
                        <Stars key={element.rating} value={element.rating} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={true} commentNumberDisplay={true} />
                      </div>
                    </div>
                    <div className="driversBlock_driverInfoBlock_element d-flex">
                      <div className="driversBlock_languages_text" style={{ visibility: this.props.storeState.languages.length > 0 ? 'visible' : 'hidden' }}>{textInfo.languages + ':'}</div>
                      {
                        element.language.map((langElement, index) =>
                          <div className="driversBlock_languages_flag" style={{ background: "url(" + (this.props.storeState.languages.length > 0 ? requests.serverAddress + this.props.storeState.languages[langElement].icon.url : '') + ")", backgroundSize: "15px 15px" }} />
                        )
                      }
                    </div>
                  </div>
                  <div className="driversBlock_driverInfoBlock_element driversBlock_commentary">{textInfo.commentary}</div>
                  <button className="driversBlock_driverInfoBlock_element driversBlock_buttonStyle"
                    onClick={() => this.props.changeTravelVisibility(element.price)}>
                    {textInfo.book + " " + (activeCurrency.isLeft ? activeCurrency.symbol : '')
                      + Math.ceil(element.price * activeCurrency.costToDefault) +
                      (!activeCurrency.isLeft ? activeCurrency.symbol : '')}</button>
                </div>

              </div>
            )}
          )
        }
        {
          selectedElements.length === 0 ?
            <React.Fragment>
              <div>Ничего не найдено. Попробуйте изменить условия поиска или дату отправления</div>
            </React.Fragment>
            : <React.Fragment />
        }
        <Manipulator number={driversArray.length} page={this.props.driversState.page} setPage={this.setPage}
          elementsNumber={this.props.storeState.pagesMenuValue} showMorePages={this.showMorePages} />
      </div>

    )
  }

}

const DriversBlock = connect(
  (state) => ({
    storeState: state.AppReduser,
    driversState: state.DriversReduser,
    globalReduser: state.GlobalReduser
  }),
)(DriversBlockClass);

export default DriversBlock;
