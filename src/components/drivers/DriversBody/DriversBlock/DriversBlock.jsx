import React, { Component } from 'react';
import './DriversBlock.css'
import './InfoBlock.css'
import './TripBlock.css'
import DriversBlockManipulator from './DriversBlockManipulator.jsx';
import { connect } from 'react-redux';
import driverPhoto from './pictures/driver1/drivers_body_photo.png';
import car1 from './pictures/driver1/drivers_car_image.png';
class DriversBlockClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={    
      page: 1,
    };
    this.setPage=this.setPage.bind(this);
  }
  setPage(page){
    console.log("setPage called");
    console.log(page);
    console.log("elements now");
    console.log(this.props.driversState.drivers.length);
    if(page!=="..."){
      this.setState(
        {
          page:page
        }
      )
    }
  }
  render() {
    let ageStep="____";
    let langStep="___''''''";
    let driverStep="___";
    let positionArray = [15, 240,465,690];


    let selectedElements = this.props.driversState.drivers.slice((this.state.page-1)*4,(this.state.page)*4);
  

    return (
      <div className = "drivers_block">
        {selectedElements.map((element, index) => 
          <div className = "drivers_block_element">
            <div className="block_element_left">
              <div className="block_element_photo">
                <img src={driverPhoto} width="100%" height="100%" alt={"photo"+element}></img>
              </div>
              <div className="block_element_infoBlock">
                <div className="block_element_infoBlock_name">{element.name}</div>
                <div className="infoBlock_starsBlock">

                </div>
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
            <div className="block_element_right">
              <div className="element_right_line">
                <div className="tripBlock_carImage">
                  <img src={car1} width="100%" height="100%" alt={"car"+element}></img>
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
                  <div className="tripBlock_priceBlock_price">
                    {element.price}
                  </div>
                </div>
                <div className="tripBlock_buttonBlock">
                  <button className="tripBlock_buttonBlock_button">
                    <div className="buttonBlock_button_value">ЗАБРОНИРОВАТЬ ПОЕЗДКУ</div>
                  </button>
                  <div className="tripBlock_buttonBlock_commentary">Стоимость окончательная. Топливо включено</div>
                </div>
              </div>
              <div className="tripBlock_detailed">Подробнее</div>
            </div>
          </div>     
        )}
        <DriversBlockManipulator number = {this.props.driversState.drivers.length} page = {this.state.page} setPage = {this.setPage}/>
      </div>

    )
  }

}

const DriversBlock = connect(
  (state) =>({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  }),
  (dispatch) => ({
   // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
  })
)(DriversBlockClass);

export default DriversBlock;

