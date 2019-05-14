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
import {setPage, setMorePagesShow} from '../../../../redusers/ActionDrivers'
import ToyotaPrado from './pictures/ToyotaPrado.jpg';


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
    array.forEach((element,index)=>{
        if(element.price<tempPrice && element.carCapacity>=this.props.storeState.persons[1]+this.props.storeState.persons[0] &&
            (element.carType===this.props.storeState.autoValue || this.props.storeState.autoValue==="Тип авто") && 
            (element.language.indexOf(this.props.storeState.languageValue)!==-1 || this.props.storeState.languageValue==="Язык")
          ){
          tempArray.push(element);
        }
    });
    switch (type){
      case "Популярности":
        return tempArray.sort(sortComments);
      case "Отзывам":
        return tempArray.sort(sortRating);
      case "Цене":
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
      <div className="drivers_block d-flex" style={{flexWrap: "wrap"}}>
        {
          /*
          selectedElements.map((element, index) =>
          <div className="drivers_block_element d-flex">
            <div className="block_element_left d-flex">
              <div className="block_element_photo">
                <img src={driverPhoto} width="100%" height="100%" alt={"photo" + element} />
              </div>
              <div className="block_element_infoBlock d-flex flex-column">
                <div className="block_element_infoBlock_top">
                  <Link to={`/driverProfile/${element.id},${element.id},${element.id}`} className="block_element_infoBlock_name d-flex">{element.name}</Link>
                  <Stars value={element.rating} commentNumber={element.comments+" отзывов"} valueDisplay="block" commentNumberDisplay="block"/>
                </div>
                <div className="d-flex flex-column">
                  <div className="block_element_infoBlock_element d-flex">
                    <div className="infoString">Возраст:</div>
                    <div className="visibleString">{element.age}</div>
                  </div>
                  <div className="block_element_infoBlock_element d-flex">
                    <div className="infoString">Языки:</div>
                    <div className="visibleString">{element.language}</div>
                  </div>
                  <div className="block_element_infoBlock_element d-flex">
                    <div className="infoString">За рулем:</div>
                    <div className="visibleString">{element.drivingAge+" лет"}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block_element_right d-flex flex-column">
                <div className="d-flex">
                  <div className="tripBlock_carImage" style={{background: "url("+sedan+") no-repeat", backgroundSize: "55px 50px"}}></div>
                  <div className="tripBlock_carData d-flex flex-column">
                    <div className="carInfo_line d-flex">
                      <div className="carBrand_style">{element.carBrand},</div>
                      <div className="fuelType_style">{element.fuelType}</div>
                    </div>
                    <div className="carInfo_line d-flex">
                      <div className="carProps_style">{element.carType+", "+element.carCapacity+" места"}</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex tripBlock_priceBlock">
                  <div className="tripBlock_carImage">{"$"+element.price}</div>
                  <button className="tripBlock_buttonBlock_button d-flex" onClick={() => this.props.changeTravelVisibility('block')}>ЗАБРОНИРОВАТЬ ПОЕЗДКУ</button>
                </div>
                <div className="tripBlock_buttonBlock_commentary">Стоимость окончательная. Топливо включено</div>
                <Link to={ `/driverProfile/${element.id},${element.id},${element.id}`} className="tripBlock_detailed">Подробнее</Link>
            </div>
            <div className="myHeart">
              <img src={srcArray[index]} width="auto" height="100%" alt="emptyLike"></img>
            </div>
          </div>
        )
        */
        }
        {
          selectedElements.map((element,index)=>         
          <div className="driversBlock_driverCard d-flex flex-column">
            <div className="driversBlock_carImage" style={{background: "url("+ToyotaPrado+") no-repeat", backgroundSize: "cover"}}>
              <Link to={ `/driverProfile/${element.id},${element.id},${element.id}`} className="driversBlock_carBlackout">
                <div className="driversBlock_carBlackout_detailed">Подробнее</div>
              </Link>
              {/* <div className="driversBlock_bookmark" >
                <div className="driversBlock_bookmark_tooltip">Добавить в закладки</div>
              </div>              */}
            </div>

            <div className="driverBlock_driverInfoBlock d-flex flex-column">

              <Link to={ `/driverProfile/${element.id},${element.id},${element.id}`} className="driversBlock_driverInfoBlock_element driversBlock_carName">{element.carBrand}</Link>
              <div className="driverBlock_carInfoLine d-flex">
                <div className="driversBlock_driverCard_carIcon" style={{background: "url("+jeep+") no-repeat", backgroundSize: "42px 30px", backgroundPosition: "-5px 0px"}}/>
                <div className="driversBlock_carInfoLine_value">{element.carType+", "+element.carCapacity+" места"}</div>
              </div>
              <div className="driversBlock_driverInfoBlock_element d-flex">
                <div className="driversBlock_driverCard_photo" style={{background: "url("+driverPhoto+") no-repeat", backgroundSize: "40px 40px"}}/>
                <div className="d-flex flex-column driversBlock_driverCard_driverInfo">
                  <Link to={ `/driverProfile/${element.id},${element.id},${element.id}`} className="driversBlock_driversInfo_name">{element.name}</Link>
                  <Stars key={element.rating} value={element.rating} commentNumber={element.comments+" отзывов"} valueDisplay={false} commentNumberDisplay={true}/>
                </div>
              </div>
              <div className="driversBlock_driverInfoBlock_element d-flex">
                <div className="driversBlock_languages_text">Языки:</div>
                  {
                    element.language.map((langElement,index)=>
                       <div className="driversBlock_languages_flag" style={{background: "url("+this.props.storeState.languages[langElement].icon+")", backgroundSize: "15px 15px"}}/>              
                    )
                  }
              </div>
              
            </div>
            <div className="driversBlock_driverInfoBlock_element driversBlock_commentary">Стоимость окончательная. Топливо включено</div>
            <button className="driversBlock_driverInfoBlock_element driversBlock_buttonStyle" onClick={() => this.props.changeTravelVisibility('block')}>{"ЗАБРОНИРОВАТЬ $"+element.price}</button>
          </div>               
          )
        }
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

