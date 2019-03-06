import React, { Component } from 'react';
import './Drivers.css';

import DriversBody from './DriversBody/DriversBody.jsx';
import DriversRoute from './DriversRoute/DriversRoute.jsx';
import Footer from '../Footer/Footer.jsx'
import { connect } from 'react-redux'
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'
import Header from '../header/Header'

class DriversClass extends React.Component {
    constructor(props) {
        function maxPriceCalc(array){
          let maxValue = 0;
          for(let i=0; i<array.length; i++){
            if(array[i].price>maxValue){
              maxValue=array[i].price;
            }
          }
          console.log("maxValueCalc");
          console.log(maxValue);
          return maxValue;
        }
        super(props);
        let maxPrice=maxPriceCalc(this.props.driversState.drivers);
        console.log("Drivers constructor");
        console.log(maxPrice);
        this.state={
          travelVisibility: 'none',
          successVisibility: 'none',
          maxPrice: maxPrice
        }
        //this.props.setMaxPrice(maxPrice);
        this.changeTravelVisibility=this.changeTravelVisibility.bind(this);
        this.changeSuccessVisibility=this.changeSuccessVisibility.bind(this);
        this.changePrice = this.changePrice.bind(this);
    }
    componentWillMount(){
      this.props.setMaxPrice(this.state.maxPrice);
    }
    changeTravelVisibility(value){
      this.setState({
        travelVisibility: value
      })
    }
    changeSuccessVisibility(value){
      this.setState({
        successVisibility: value
      })
    }
    changePrice(price){
      this.setState({
        price: price
      })
    }
    render() {
      console.log("Drivers render");
      console.log(this.props);
      console.log(this.state);
      
        return (
          <React.Fragment>
              <div className = "drivers_top_background">
                <div className="travelFormBlock">
                  <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
                  travelVisibility={this.state.travelVisibility} successVisibility={this.changeSuccessVisibility}/>
                  <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility}/>               
                </div>
                <Header colorClass="colorClass" colorClass2="colorClass2" backgroundColorClass="backgroundColorClass"
                 borderColorClass="borderColorClass" labelColorClass="labelColorClass" type={1}/>
                <DriversRoute />
              </div>
              <div className = "drivers_bottom_background" >
                <DriversBody changeTravelVisibility={this.changeTravelVisibility} maxPrice={this.state.maxPrice} 
                price={this.state.price} changePrice={this.changePrice}/>
                
              </div>
              <Footer/>           
          </React.Fragment>
        );
    }
}
const Drivers = connect(
  (state) =>({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  }),
  (dispatch) => ({
   // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
    setMaxPrice: (maxPrice)=>dispatch({type: "SET_MAX_PRICE", maxPrice: maxPrice, pricePart: 100})
  })
)(DriversClass);

export default Drivers;