import React from 'react';
import '../Places/Places.css';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import ToursCountryInfo from './ToursCountryInfo';
import DriversProperties from '../drivers/DriversBody/DriversProperties/DriversProperties';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import ToursList from './ToursList';

import { connect } from 'react-redux';
import Manipulator from '../manipulator/Manipulator';
import {setPage, setMorePagesShow} from '../../redusers/ActionPlaces';



class ToursClass extends React.Component {
    constructor(props){
      function maxPriceCalc(array){
        let maxValue = 0;
        for(let i=0; i<array.length; i++){
          if(array[i].price>maxValue){
            maxValue=array[i].price;
          }
        }
        return maxValue;
      }
      super(props);
      let maxPrice=maxPriceCalc(this.props.toursState.tours[0].tours);
      this.state={
        maxPrice: maxPrice
      }
      this.setPageFunc=this.setPageFunc.bind(this);
      this.showMorePages=this.showMorePages.bind(this);
    }
    componentWillMount(){
      this.props.setMaxPrice(this.state.maxPrice);
    }
    setPageFunc(page){
      if(page !== "..."){
        this.props.dispatch(setPage(page));
      }
    }
    showMorePages(){
      this.props.dispatch(setMorePagesShow());
    }
    render(){
      return(
        <React.Fragment>
        <div className = "drivers_top_background col-12">
            <div className="wrapper d-flex flex-column">
                <Header colorClass="colorClass" colorClass2="colorClass2" backgroundColorClass="backgroundColorClass"
                borderColorClass="borderColorClass" labelColorClass="labelColorClass" type={1}/>
                <ToursCountryInfo/>
            </div>
        </div>
        <div className="wrapper d-flex flex-column">
            <div className = "drivers_bottom_background d-flex flex-column" >
              <div className="drivers_body d-flex">
                <div className="left_body_part col-9">
                  <DriversProperties/>
                  <ToursList/>
                  <Manipulator/>
                </div>
                <div className="right_body_part col-3">
                  <DriversCommercial/>
                </div>
              </div>
            
            </div>  
          </div>
          <Footer/>  
        </React.Fragment>
      )
    }
}

const Tours = connect(
  (state) => ({
    storeState: state.AppReduser,
    toursState: state.ToursReduser
  }),
  (dispatch) => ({
     setMaxPrice: (maxPrice)=>dispatch({type: "SET_MAX_PRICE", maxPrice: maxPrice, pricePart: 100})
  })
)(ToursClass);

export default Tours;