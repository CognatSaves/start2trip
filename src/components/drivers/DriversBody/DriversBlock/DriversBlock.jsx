import React from 'react';
import './DriversBlock.css'
import './InfoBlock.css'
import './TripBlock.css'
import Manipulator from '../../../manipulator/Manipulator';
import { connect } from 'react-redux';
import driverPhoto from './pictures/driver1/drivers_body_photo.png';
import emptyLike from './pictures/like_contour.svg';
import filledLike from './pictures/like_blue.svg';
import selectedFilledLike from './pictures/like_orange.svg';
import jeep from './pictures/jeepBlue.svg';
import { Link } from 'react-router-dom';

import Stars from '../../../stars/Stars';
import { setPage, setMorePagesShow } from '../../../../redusers/ActionDrivers'
import ToyotaPrado from './pictures/ToyotaPrado.jpg';
import requests from '../../../../config';

class DriversBlockClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      openModal:false,
      country:this.props.country,
      cities:this.props.cities,
    }
  }
  setPage=(page)=> {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
    //console.log("SetPage has been called");
  }
  showMorePages=()=> {
    this.props.dispatch(setMorePagesShow());
  }
  driversSort=(array, type)=> {
    
    function sortPrice(a, b) {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
    }
    function sortRating(a, b) {
      if (a.rating > b.rating) return -1;
      if (a.rating < b.rating) return 1;
    }
    function sortComments(a, b) {
      if (a.comments > b.comments) return -1;
      if (a.comments < b.comments) return 1;
    }
    let tempArray = [];
    let tempPrice = this.props.storeState.pricePart * this.props.storeState.maxPrice / 100;
    array.forEach((element, index) => {
      if (element.price <= tempPrice && element.carCapacity >= this.props.storeState.persons[1] + this.props.storeState.persons[0] &&
        (element.carType === this.props.storeState.autoValue || this.props.storeState.autoValue === "Любое авто") &&
        (element.language.indexOf(this.props.storeState.languageValue) !== -1 || this.props.storeState.languageValue === "Любой язык")
      ) {
        tempArray.push(element);
      }
    });
    console.log(type, "type")

    switch (type) {
      case "Популярности":
        return tempArray.sort(sortComments);
      case "Рейтингу":
        return tempArray.sort(sortRating);
      case "Цене":
        let sortArrayPrice = tempArray.sort(sortPrice);
        if (this.props.storeState.sortMenuWay) {
          sortArrayPrice.reverse()
        }
        return sortArrayPrice
      case "Сначала дешевые":
        let sortArrayPriceLow = tempArray.sort(sortPrice);
        return sortArrayPriceLow
      case "Сначала дорогие":
        let sortArrayPriceHige = tempArray.sort(sortPrice);
        sortArrayPriceHige.reverse()
        return sortArrayPriceHige
      default: return tempArray;
    }
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
    let selectedElements = driversArray.slice(from,number);
    //let srcArray = Array(this.props.storeState.pagesMenuValue * this.props.driversState.showPages).fill(emptyLike);
    //srcArray[0] = selectedFilledLike;
    //srcArray[1] = filledLike;
    function setLanguagesNumbers(that,selectedElements){
      selectedElements.map((element,index) => {
        element.language.map((el, i) => {
          for(let t=0; t<that.props.storeState.languages.length; t++){
            if(el===that.props.storeState.languages[t].ISO){
              element.language[i]=t;
            }
          }
        })
        for(let k=0; k<that.props.driversState.carTypes.length; k++){
          if(element.carType===that.props.driversState.carTypes[k].id){
            element.carType=k;
          }
        }
      })
    }
    setLanguagesNumbers(this,selectedElements);


    console.log('selectedEl');
    console.log(selectedElements);
    
    console.log('DriversBlock render');
    console.log(this.props);
    
    return (
      <div className="drivers_block d-flex flex-wrap">
        {
          selectedElements.map((element, index) =>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3">
              <div className="driversBlock_driverCard d-flex flex-column ">
                <div className="driversBlock_carImage" style={{ background: "url(" + requests.serverAddress+element.carImage + ") no-repeat", backgroundSize: "cover" }}>
                  <Link to={`/driverProfile/${element.id}-${element.carId}-${this.state.country}-${this.state.cities}`} className="driversBlock_carBlackout">
                    <div className="driversBlock_carBlackout_detailed">Подробнее</div>
                  </Link>
                </div>

                <div className="driverBlock_driverInfoBlock d-flex flex-column">

                  <Link to={`/driverProfile/${element.id}-${element.carId}-${this.state.country}-${this.state.cities}`} className="driversBlock_driverInfoBlock_element driversBlock_carName">{element.carBrand}</Link>
                  <div className="driverBlock_carInfoLine d-flex">
                    <div className="driversBlock_driverCard_carIcon" style={{ background: "url(" + requests.serverAddress+this.props.driversState.carTypes[element.carType].carTypeImage + ") no-repeat", backgroundSize: "42px 30px", backgroundPosition: "-5px 0px" }} />
                    <div className="driversBlock_carInfoLine_value">{this.props.driversState.carTypes[element.carType].name_en + ", " + element.carCapacity + " места"}</div>
                  </div>
                  <div className="driversBlock_driverInfoBlock_element d-flex">
                    <div className="driversBlock_driverCard_photo" style={{ background: "url(" + requests.serverAddress+element.avatar + ") no-repeat"}} />
                    <div className="d-flex flex-column driversBlock_driverCard_driverInfo">
                      <Link to={`/driverProfile/${element.id}-${element.carId}-${this.state.country}-${this.state.cities}`} className="driversBlock_driversInfo_name">{element.name}</Link>
                      <Stars key={element.rating} value={element.rating} commentNumber={element.comments + " отзывов"} valueDisplay={true} commentNumberDisplay={true} />
                    </div>
                  </div>
                  <div className="driversBlock_driverInfoBlock_element d-flex">
                    <div className="driversBlock_languages_text" style={{ visibility: this.props.storeState.languages.length > 0 ? 'visible' : 'hidden' }}>Языки:</div>
                    {
                      element.language.map((langElement, index) =>
                        <div className="driversBlock_languages_flag" style={{ background: "url(" + (this.props.storeState.languages.length > 0 ? requests.serverAddress + this.props.storeState.languages[langElement].icon.url : '') + ")", backgroundSize: "15px 15px" }} />
                      )
                    }
                  </div>
                </div>
                <div className="driversBlock_driverInfoBlock_element driversBlock_commentary">Стоимость окончательная. Топливо включено</div>
                <button className="driversBlock_driverInfoBlock_element driversBlock_buttonStyle" onClick={() => this.props.changeTravelVisibility('block')}>{"ЗАБРОНИРОВАТЬ $" + element.price}</button>
              </div>

            </div>

          )
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
    driversState: state.DriversReduser
  }),
)(DriversBlockClass);

export default DriversBlock;
