import React from 'react';
import './Drivers.css';

import DriversBody from './DriversBody/DriversBody';
import DriversRoute from './DriversRoute/DriversRoute';
import { connect } from 'react-redux'
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'
import Header from '../header/Header'

class DriversClass extends React.Component {
  constructor(props) {

    function maxPriceCalc(array) {
      let maxValue = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].price > maxValue) {
          maxValue = array[i].price;
        }
      }
      return maxValue;
    }
    super(props);
    let maxPrice = maxPriceCalc(this.props.driversState.drivers);
    this.state = {
      travelVisibility: 'none',
      successVisibility: 'none',
      maxPrice: maxPrice
    }
    this.changeTravelVisibility = this.changeTravelVisibility.bind(this);
    this.changeSuccessVisibility = this.changeSuccessVisibility.bind(this);
  }
  componentWillMount() {
    this.props.setMaxPrice(this.state.maxPrice);
  }
  changeTravelVisibility(value) {
    this.setState({
      travelVisibility: value
    })
  }
  changeSuccessVisibility(value) {
    this.setState({
      successVisibility: value
    })
  }
  render() {
    let array =["","","","","","","","","",""];
    return (
      <React.Fragment>  
    

      <div className="drivers_top_background">
      <Header history={this.props.history}/>
        <div className="container d-flex flex-column">
            <DriversRoute />
        </div>
      </div>
      
      <div className="wrapper d-flex flex-column">
        <div className="drivers_bottom_background d-flex flex-column" >
          <DriversBody changeTravelVisibility={this.changeTravelVisibility} />
        </div>
      </div>
      <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
        travelVisibility={this.state.travelVisibility} successVisibility={this.changeSuccessVisibility} />
      <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility} /> 



      
      

        
          
           
      {
       /* 
        <div className="col-12 d-flex flex-wrap">
        {
          array.map((element,index)=>
          <div className="col-xl-3 col-md-4 col-sm-6" style={{border: "1px solid"}}>
            <div className="col-12" style={{height: "200px",  backgroundColor: "red"}}/>
            <div className="col-12">AAA</div>
          </div>
          )
        }
        </div>
        */
        }
  
      </React.Fragment>
    );
  }
}
const Drivers = connect(
  (state) => ({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  }),
  (dispatch) => ({
    // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
    setMaxPrice: (maxPrice) => dispatch({ type: "SET_MAX_PRICE", maxPrice: maxPrice, pricePart: 100 })
  })
)(DriversClass);

export default Drivers;