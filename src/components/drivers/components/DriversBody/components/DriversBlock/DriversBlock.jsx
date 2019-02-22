import React, { Component } from 'react';
import './DriversBlock.css'
import './InfoBlock.css'
import './TripBlock.css'
import DriversBlockManipulator from './components/DriversBlockManipulator.jsx';
import { connect } from 'react-redux'

class DriversBlockClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      page: 1,
    };
    this.setPage=this.setPage.bind(this);
  }
  setPage(page){
    if(page!=="..."){
      this.setState(
        {
          page:page
        }
      )
    }
  }
  render() {
    console.log("DriversBlock render");
    console.log("elements now:");
    console.log(this.props.driversState.drivers.length);
    let ageStep="____";
    let langStep="___''''''";
    let driverStep="___";
    let positionArray = [15, 240,465,690];


    let selectedElements = this.props.driversState.drivers.slice((this.state.page-1)*4,(this.state.page)*4);
  

    return (
      <div className = "drivers_block">
          {selectedElements.map((element, index) => 
            <div className = "drivers_block_element" style={{top: positionArray[index]}}>
              <div className="block_element_photo"/>
              <div className="block_element_infoBlock">
                <div className="block_element_infoBlock_name">{element.name}</div>
                <div className="block_element_infoBlock_age">
                  <div className="infoString">Возраст:</div>
                  <div className="visibleString">{element.age}</div>
                  <div className="hiddenString">{ageStep}</div>
                </div>
                <div className="block_element_infoBlock_language">
                  <div className="infoString">Языки:</div>
                  <div className="visibleString">{element.language}</div>
                  <div className="hiddenString">{langStep}</div>
                </div>
                <div className="block_element_infoBlock_drivingAge">
                  <div className="infoString">За рулём:</div>
                  <div className="visibleString">{element.drivingAge}</div>
                  <div className="hiddenString">{driverStep}</div>
                </div>                
              </div>
              <div className="block_element_tripBlock">
                <div className="tripBlock_carInfo">
                  <div className="tripBlock_carInfo_carImage"/>
                  <div className="tripBlock_carInfo_carData">                   
                    <div className="carBrand_style">{element.carBrand},</div>
                    <div className="hidden_enter_carBrand">_</div>
                    <div className="fuelType_style">{element.fuelType}</div>
                    <div className="carProps_style">{element.carProps}</div>
                  </div>
                  
                </div>
                <div className="tripBlock_buttonBlock">
                  <div className="tripBlock_buttonBlock_value">{element.price}</div>
                  <div className="tripBlock_buttonBlock_button">ЗАБРОНИРОВАТЬ ПОЕЗДКУ</div>
                  <div className="tripBlock_buttonBlock_commentary">Стоимость окончательная. Топливо включено</div>
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
    driversState: state.DriversReduser
  }),
  (dispatch) => ({
   // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
  })
)(DriversBlockClass);

export default DriversBlock;