import React from 'react';
import './DriversBlock.css'
import './InfoBlock.css'
import './TripBlock.css'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPage, setMorePagesShow, setDriverCarDescription } from '../../../../redusers/ActionDrivers'
import { set_state } from '../../../../redusers/Action'
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, findTagName, getCurrencies } from '../../../../redusers/GlobalFunction'

import requests from '../../../../config';

import Stars from '../../../stars/Stars';
import Manipulator from '../../../manipulator/Manipulator';
import Cookies from 'universal-cookie';
import MobileFilter from '../DriversProperties/MobileFilter/MobileFilter'
import tourGuide from '../../../media/tour-guide.svg';
const cookies = new Cookies();

class DriversBlockClass extends React.Component {
  constructor(props) {
    super(props);

    //let url = document.URL;
    let date = props.globalReduser.findGetParameter('date');
    let langISO = props.globalReduser.findGetParameter('lang');
    this.state = {
      openModal: false,
      country: this.props.country,
      lang: langISO !== null ? langISO : 'ENG'
    }
    props.dispatch(setPage(1));
    if (!date) {
      date = new Date(Date.now());
    }
    props.dispatch(set_state(props.storeState.cities, date))

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
        let sortArrayPriceLow = tempArray.sort((a, b) => { return a.price < b.price ? -1 : 1 });
        return sortArrayPriceLow
      case "Сначала дорогие":
        let sortArrayPriceHige = tempArray.sort((a, b) => { return a.price > b.price ? -1 : 1 });
        // sortArrayPriceHige.reverse()
        return sortArrayPriceHige
      default: return tempArray;
    }

  }
  setLanguagesNumbers = (that, selectedElements) => {

    selectedElements.map((element, index) => {
      element.language.map((el, i) => {
        for (let t = 0; t < that.props.storeState.untranslatedlanguages.length; t++) {
          if (el === that.props.storeState.untranslatedlanguages[t].ISO) {
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
    let driversArray = []
    if (this.props.driversState.driversList.length > 0) {
      driversArray = this.driversSort([...this.props.driversState.driversList], this.props.storeState.sortMenuValue);
    }

    let from = (this.props.driversState.page - this.props.driversState.showPages) * this.props.storeState.pagesMenuValue;
    let number = this.props.howMuchRenderEl ? this.props.howMuchRenderEl :( (this.props.driversState.page) * (this.props.storeState.pagesMenuValue));
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
    console.log('selectedEl--------------------------------');

    console.log(selectedElements);
    console.log(this.props.storeState.languages, "this.props.storeState.languagess");

    console.log('DriversBlock render');
    // console.log(this.props);
    let storeState = this.props.storeState;
    let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber]

    let textInfo = this.props.storeState.languageTextMain.drivers.driversBlock;
    let basicCurrency;
    if (storeState.currencies.length > 0) {
      for (let i = 0; i < storeState.currencies.length; i++) {
        if (storeState.currencies[i].costToDefault === 1) {
          basicCurrency = storeState.currencies[i];
        }
      }
    }
    let pageNotFound = this.props.storeState.languageTextMain.home.pageNotFound;
    let isLoading = (selectedElements.length === 0 && (this.props.driversState.waitingDriverRequest));
    let isEmpty = (selectedElements.length === 0 && !(this.props.driversState.waitingDriverRequest) && !(this.props.driversState.isFirstSave));

   

    return (
      <>

        <div className="drivers_block d-flex flex-wrap pb-5">
          {
            selectedElements.map((element, index) => {
              let linkAddress = "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/driverProfile/${element.id}-${element.carId}-${this.props.cities}?date=` + this.props.dateString;
              let isoCurrencies = cookies.get('userCurr', { path: "/" })
              let idIndex = getCurrencies("USD", "ISO", this)
              let price = null
              let priceold = null
              if (this.props.storeState.currencies.length > 0) {
                  let usd = element.price / this.props.storeState.currencies[idIndex].costToDefault
                  if (isoCurrencies === "USD") {
                      let idIndex = getCurrencies("USD", "ISO", this)
                      usd = Math.ceil(usd)
                      price = "" + this.props.storeState.currencies[idIndex].symbol + usd
                      priceold = Math.ceil(usd * 1.2)
                      priceold = "" + this.props.storeState.currencies[idIndex].symbol + (priceold);
                  } else {
                      let idIndex = getCurrencies(isoCurrencies, "ISO", this)
                      usd = usd * this.props.storeState.currencies[idIndex].costToDefault
                      usd = Math.ceil(usd)
                      price = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + usd) :
                          (usd + " " + this.props.storeState.currencies[idIndex].symbol)
                      priceold = Math.ceil(usd * 1.2)
                      priceold = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + priceold) :
                          (priceold + " " + this.props.storeState.currencies[idIndex].symbol)
                  }
              }
              return (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3">
                  <div className="driversBlock_driverCard d-flex flex-column ">
                    <div className="driversBlock_carImage" style={{ background: "url(" + requests.serverAddressImg + element.carImage + ") no-repeat", backgroundSize: "cover" }}>
                      <Link to={linkAddress} className="driversBlock_carBlackout">
                        <div className="driversBlock_carBlackout_detailed">{textInfo.detailed}</div>
                      </Link>
                    </div>

                    <div className="driverBlock_driverInfoBlock d-flex flex-column">
                    <div className="pb-2">
                      <div className="driversBlock_driverInfoBlock_element d-flex" style={{ position: 'relative' }}>
                        <div className="driversBlock_driverCard_photo" style={{ background: "url(" + requests.serverAddressImg + element.avatar + ") no-repeat" }} />
                        <div className="d-flex  driversBlock_driverCard_driverInfo">
                          <Link to={linkAddress} className="driversBlock_driversInfo_name">{element.name}</Link>

                        </div>
                        <div className="langi">

                          {

                            element.language.map((langElement, index) => {

                              return (
                                <div className="driversBlock_languages_flag" style={{ background: "url(" + (this.props.storeState.untranslatedlanguages.length > 0 ? requests.serverAddressImg + this.props.storeState.untranslatedlanguages[langElement].icon.url : '') + ")", backgroundSize: "15px 15px" }} />
                              )
                            }

                            )
                          }
                        </div>
                        {
                          element.guide &&
                          <div className="d-flex flex-column driverGuideBlock">
                            <div className="driverGuideImage" />
                            <div className="driverGuideText">{textInfo.guide}</div>
                          </div>
                        }
                      </div>
                      <div class="starsd"><Stars key={element.rating} value={Math.ceil(element.rating*10)/10} commentNumber={element.comments + " " + textInfo.comments} valueDisplay={true} commentNumberDisplay={true} /></div>
                    </div>
                    
                      <div className="driverBlock_carInfoLine">
                      <Link to={linkAddress} className="driversBlock_driverInfoBlock_element driversBlock_carName">{element.carBrand}</Link>
                      <div className="d-flex">
                      <div className="driversBlock_driverCard_carIcon" style={{ background: "url(" + requests.serverAddressImg + this.props.driversState.carTypes[element.carType].carTypeImage + ") no-repeat" }} />
                        <div className="driversBlock_carInfoLine_value">
                          {
                            fingCorrectCartypeName(this.props.driversState.carTypes[element.carType], storeState.languages[storeState.activeLanguageNumber].ISO)
                            + ", " + element.carCapacity + " " + textInfo.carCapacity
                          }
                        </div>
                      </div>
                      </div>
                     
                    </div>
                        <div className="d-flex align-items-end justify-content-between px-2 pb-2">
                        <div className="driversBlock_commentary">{textInfo.commentary}</div>
                          <div className="routesPrices d-flex flex-column align-items-end">
                                <span className="routesPricesSmall">{priceold}</span>
                                <span className="routesPricesBig">{price}</span>
                            </div>
                        </div>
                    

                    <button className="driversBlock_driverInfoBlock_element driversBlock_buttonStyle"
                      onClick={() => { if (this.props.isRouteDescription) { this.props.globalReduser.history.push(linkAddress) } else { this.props.changeTravelVisibility(element.price); this.props.dispatch(setDriverCarDescription(element)) } }}>
                      {textInfo.book /*+ " " + (activeCurrency.isLeft ? activeCurrency.symbol + ' ' : '')
                        + Math.ceil(element.price * activeCurrency.costToDefault) +
                        (!activeCurrency.isLeft ? ' ' + activeCurrency.symbol : '')*/}</button>
                  </div>

                </div>
              )
            }
            )
          }
          {
            isLoading || isEmpty ?
              <>
                {isLoading ?
                  <div className="placesList_loading">
                    <span>{pageNotFound.loading}</span>
                  </div> :
                  <div className="placesList_noElementsBlock">
                    <span>{pageNotFound.text1 + " " + pageNotFound.text2}<br />{pageNotFound.text3}</span>
                  </div>
                }
              </>
              : <React.Fragment />
          }
          <Manipulator number={driversArray.length} page={this.props.driversState.page} setPage={this.setPage}
            elementsNumber={this.props.storeState.pagesMenuValue} showMorePages={this.showMorePages} />
        </div>
        <MobileFilter />
      </>
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
