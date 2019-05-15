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


class DriversBlockClass extends React.Component {
  constructor(props) {
    super(props);
    this.setPage = this.setPage.bind(this);
    this.showMorePages = this.showMorePages.bind(this);
    this.driversSort = this.driversSort.bind(this);
  }
  setPage(page) {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
    //console.log("SetPage has been called");
  }
  showMorePages() {
    this.props.dispatch(setMorePagesShow());
  }
  driversSort(array, type) {
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
      if (element.price < tempPrice && element.carCapacity >= this.props.storeState.persons[1] + this.props.storeState.persons[0] &&
        (element.carType === this.props.storeState.autoValue || this.props.storeState.autoValue === "Тип авто") &&
        (element.language.indexOf(this.props.storeState.languageValue) !== -1 || this.props.storeState.languageValue === "Язык")
      ) {
        tempArray.push(element);
      }
    });
    console.log(type, "type")

    switch (type) {
      case "Популярности":
        let sortArrayComments = tempArray.sort(sortComments);
        if (this.props.storeState.sortMenuWay) {
          sortArrayComments.reverse()
        }
        return sortArrayComments
      case "Рейтингу":
        let sortArrayRating = tempArray.sort(sortRating);
        if (this.props.storeState.sortMenuWay) {
          sortArrayRating.reverse()
        }
        return sortArrayRating
      case "Цене":
        let sortArrayPrice = tempArray.sort(sortPrice);
        if (this.props.storeState.sortMenuWay) {
          sortArrayPrice.reverse()
        }
        return sortArrayPrice
      default: return tempArray;
    }
  }
  render() {
    let driversArray = this.driversSort([...this.props.driversState.drivers], this.props.storeState.sortMenuValue);
    let selectedElements = driversArray.slice((this.props.driversState.page - this.props.driversState.showPages) * this.props.storeState.pagesMenuValue,
      (this.props.driversState.page) * this.props.storeState.pagesMenuValue);

    let srcArray = Array(this.props.storeState.pagesMenuValue * this.props.driversState.showPages).fill(emptyLike);
    srcArray[0] = selectedFilledLike;
    srcArray[1] = filledLike;
    console.log('selectedEl');
    console.log(selectedElements);
    return (
      <div className="drivers_block d-flex flex-wrap">
        {
          selectedElements.map((element, index) =>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
              <div className="driversBlock_driverCard d-flex flex-column ">
                <div className="driversBlock_carImage" style={{ background: "url(" + ToyotaPrado + ") no-repeat", backgroundSize: "cover" }}>
                  <Link to={`/driverProfile/${element.id},${element.id},${element.id}`} className="driversBlock_carBlackout">
                    <div className="driversBlock_carBlackout_detailed">Подробнее</div>
                  </Link>
                </div>

                <div className="driverBlock_driverInfoBlock d-flex flex-column">

                  <Link to={`/driverProfile/${element.id},${element.id},${element.id}`} className="driversBlock_driverInfoBlock_element driversBlock_carName">{element.carBrand}</Link>
                  <div className="driverBlock_carInfoLine d-flex">
                    <div className="driversBlock_driverCard_carIcon" style={{ background: "url(" + jeep + ") no-repeat", backgroundSize: "42px 30px", backgroundPosition: "-5px 0px" }} />
                    <div className="driversBlock_carInfoLine_value">{element.carType + ", " + element.carCapacity + " места"}</div>
                  </div>
                  <div className="driversBlock_driverInfoBlock_element d-flex">
                    <div className="driversBlock_driverCard_photo" style={{ background: "url(" + driverPhoto + ") no-repeat", backgroundSize: "40px 40px" }} />
                    <div className="d-flex flex-column driversBlock_driverCard_driverInfo">
                      <Link to={`/driverProfile/${element.id},${element.id},${element.id}`} className="driversBlock_driversInfo_name">{element.name}</Link>
                      <Stars key={element.rating} value={element.rating} commentNumber={element.comments + " отзывов"} valueDisplay={true} commentNumberDisplay={true} />
                    </div>
                  </div>
                  <div className="driversBlock_driverInfoBlock_element d-flex">
                    <div className="driversBlock_languages_text">Языки:</div>
                    {
                      element.language.map((langElement, index) =>
                        <div className="driversBlock_languages_flag" style={{ background: "url(" + this.props.storeState.languages[langElement].icon + ")", backgroundSize: "15px 15px" }} />
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
