import React, { Component } from 'react';
import './DriversBlock.css'
import './InfoBlock.css'
import './TripBlock.css'
import Manipulator from '../../../manipulator/Manipulator';
import { connect } from 'react-redux';
import driverPhoto from './pictures/driver1/drivers_body_photo.png';
import emptyStar from './pictures/star.svg';
import emptyLike from './pictures/like_contour.svg';
import filledLike from './pictures/like_blue.svg';
import selectedFilledLike from './pictures/like_orange.svg';
import sedan from './pictures/sedan.svg';
import jeep from './pictures/jeep.svg';
import { Link } from 'react-router-dom';

import Stars from '../../../stars/Stars';
import {setPage, setMorePagesShow} from '../../../../redusers/ActionDrivers'


class DriversBlockClass extends React.Component {
  constructor(props) {
    super(props);
    this.setPage = this.setPage.bind(this);
    this.showMorePages = this.showMorePages.bind(this);
    this.driversSort=this.driversSort.bind(this);
  }
  setPage(page) {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
    //console.log("SetPage has been called");
  }
  showMorePages(){
    this.props.dispatch(setMorePagesShow());
  }
  driversSort(array,type){
    function sortPrice(a,b){
      if(a.price>b.price) return 1;
      if (a.price<b.price) return -1;
    }
    function sortRating(a,b){
      if(a.rating>b.rating) return -1;
      if(a.rating<b.rating) return 1;
    }
    function sortComments(a,b){
      if(a.comments>b.comments) return -1;
      if(a.comments<b.comments) return 1;
    }
    let tempArray =[];
    let tempPrice = this.props.storeState.pricePart*this.props.storeState.maxPrice/100; 
    console.log("language");
    console.log(this.props.storeState.languageValue);
    array.forEach((element,index)=>{
        if(element.price<tempPrice && element.carCapacity>=this.props.storeState.persons[1]+this.props.storeState.persons[0] &&
            (element.carType===this.props.storeState.autoValue || this.props.storeState.autoValue==="Тип авто") && 
            (element.language.indexOf(this.props.storeState.languageValue)!==-1 || this.props.storeState.languageValue==="Язык")
          ){
          tempArray.push(element);
        }
    });
    switch (type){
      case "Популярность":
        return tempArray.sort(sortComments);
      case "Рейтинг":
        return tempArray.sort(sortRating);
      case "Цена":
        return tempArray.sort(sortPrice);
      default: return array;
    }
  }
  render() {

    let driversArray = this.driversSort([...this.props.driversState.drivers], this.props.storeState.sortMenuValue);
    let selectedElements = driversArray.slice((this.props.driversState.page - this.props.driversState.showPages) * this.props.storeState.pagesMenuValue,
     (this.props.driversState.page) * this.props.storeState.pagesMenuValue);


    let srcArray = Array(this.props.storeState.pagesMenuValue*this.props.driversState.showPages).fill(emptyLike);

    srcArray[0]=selectedFilledLike;
    srcArray[1]=filledLike;
    return (
      <div className="drivers_block">
        {selectedElements.map((element, index) =>
          <div className="drivers_block_element">
            <div className="block_element_left">
              <div className="block_element_photo">
                <img src={driverPhoto} width="100%" height="100%" alt={"photo" + element} />
              </div>
              <div className="block_element_infoBlock">
                <div className="block_element_infoBlock_top">
                  <Link to={`/driverProfile/${element.id},${element.id},${element.id}`} className="block_element_infoBlock_name">{element.name}</Link>
                  <Stars value={element.rating} commentNumber={element.comments+" отзывов"} valueDisplay="block" commentNumberDisplay="block"/>
                </div>
                <div className="block_element_infoBlock_bot">
                  <div className="block_element_infoBlock_element">
                    <div className="infoString">Возраст:</div>
                    <div className="visibleString">{element.age}</div>
                  </div>
                  <div className="block_element_infoBlock_element">
                    <div className="infoString">Языки:</div>
                    <div className="visibleString">{element.language}</div>
                  </div>
                  <div className="block_element_infoBlock_element">
                    <div className="infoString">За рулём:</div>
                    <div className="visibleString">{element.drivingAge+" лет"}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block_element_right">
                <div className="element_right_line">
                  <div className="tripBlock_carImage">
                    <img src={sedan} width="100%" height="100%" alt={"car" + element}></img>
                  </div>
                  <div className="tripBlock_carData">
                    <div className="carInfo_line">
                      <div className="carBrand_style">{element.carBrand},</div>
                      <div className="fuelType_style">{element.fuelType}</div>
                    </div>
                    <div className="carInfo_line">
                      <div className="carProps_style">{element.carType+", "+element.carCapacity+" места"}</div>
                    </div>
                  </div>
                </div>
                <div className="element_right_line tripBlock_priceBlock">
                  <div className="tripBlock_carImage">{"$"+element.price}</div>
                  <button className="tripBlock_buttonBlock_button" onClick={() => this.props.changeTravelVisibility('block')}>ЗАБРОНИРОВАТЬ ПОЕЗДКУ</button>
                </div>
                <div className="tripBlock_buttonBlock_commentary">Стоимость окончательная. Топливо включено</div>
                <Link to={ `/driverProfile/${index},${index},${index}`} className="tripBlock_detailed">Подробнее</Link>
            </div>
            <div className="myHeart">
              <img src={srcArray[index]} width="auto" height="100%" alt="emptyLike"></img>
            </div>
          </div>
        )}
        <Manipulator number = {driversArray.length} page = {this.props.driversState.page} setPage = {this.setPage} 
        elementsNumber={this.props.storeState.pagesMenuValue} showMorePages={this.showMorePages}/>
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

