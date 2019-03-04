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


class DriversBlockClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      elementNumber: 10,
      showPages: 1
    };
    this.setPage = this.setPage.bind(this);
    this.showMorePages = this.showMorePages.bind(this);
  }
  setPage(page) {
    console.log("setPage called");
    console.log(page);
    console.log("elements now");
    console.log(this.props.driversState.drivers.length);
    if (page !== "...") {
      this.setState(
        {
          page: page,
          showPages: 1
        }
      )
    }
  }
  showMorePages(){
    console.log("DriversBlock showMorePages call");
    this.setState({
      showPages: this.state.showPages+1,
      page: this.state.page+1
    })
  }
  render() {
    console.log("DriversBlock render");
    console.log((this.state.page - this.state.showPages) * this.state.elementNumber);
    console.log((this.state.page) * this.state.elementNumber);
    let selectedElements = this.props.driversState.drivers.slice((this.state.page - this.state.showPages) * this.state.elementNumber, (this.state.page) * this.state.elementNumber);

    let srcArray = Array(this.state.elementNumber).fill(emptyLike);
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
                  <div className="block_element_infoBlock_name">{element.name}</div>
                  <div className="infoBlock_starsBlock">
                    <div className="infoBlock_starsBlock_value">5.0</div>
                    <div className="infoBlock_starsBlock_stars">
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star1"></img>
                      </div>
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star2"></img>
                      </div>
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star3"></img>
                      </div>
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star4"></img>
                      </div>
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star5"></img>
                      </div>
                    </div>
                    <div className="infoBlock_starsBlock_number">10000 отзывов</div>
                  </div>
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
                    <div className="visibleString">{element.drivingAge}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block_element_right">
              <div className="block_element_right_div">
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
                      <div className="carProps_style">{element.carProps}</div>
                    </div>
                  </div>
                </div>
                <div className="element_right_line">
                  <div className="tripBlock_priceBlock">
                    {element.price}
                    <button className="tripBlock_buttonBlock_button" onClick={() => this.props.changeTravelVisibility('block')}>ЗАБРОНИРОВАТЬ ПОЕЗДКУ</button>
                  </div>
                </div>
                <div className="tripBlock_buttonBlock_commentary">Стоимость окончательная. Топливо включено</div>
                <div className="tripBlock_detailed">Подробнее</div>
              </div>
            </div>
            <div className="myHeart">
              <img src={srcArray[index]} width="auto" height="100%" alt="emptyLike"></img>
            </div>
          </div>
        )}
        <Manipulator number = {this.props.driversState.drivers.length} page = {this.state.page} setPage = {this.setPage} 
        elementsNumber={this.state.elementNumber} showMorePages={this.showMorePages}/>
      </div>

    )
  }

}

const DriversBlock = connect(
  (state) => ({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  }),
  (dispatch) => ({
    // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
  })
)(DriversBlockClass);

export default DriversBlock;

