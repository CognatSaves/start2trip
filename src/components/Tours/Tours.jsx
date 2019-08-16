import React from 'react';
import '../Places/Places.css';
import { connect } from 'react-redux';
import { setPage, setMorePagesShow } from '../../redusers/ActionPlaces';

import Header from '../header/Header';
import ToursCountryInfo from './ToursCountryInfo';
import DriversProperties from '../drivers/DriversBody/DriversProperties/DriversProperties';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import ToursList from './ToursList';

// TODO dispatch old
class ToursClass extends React.Component {
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
    let maxPrice = maxPriceCalc(this.props.toursState.tours[0].tours);
    this.state = {
      maxPrice: maxPrice
    }
  }
  componentWillMount() {
    this.props.setMaxPrice(this.state.maxPrice);
  }
  setPageFunc = (page) => {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
  }
  showMorePages = () => {
    this.props.dispatch(setMorePagesShow());
  }
  render() {
    return (
      <React.Fragment>
        <div className="drivers_top_background col-12">
          <div className="wrapper d-flex flex-column">
            <Header history={this.props.history} />
            <ToursCountryInfo />
          </div>
        </div>
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
            <div className="drivers_body d-flex">
              <div className="left_body_part col-9">
                <DriversProperties />
                <ToursList />
              </div>
              <div className="right_body_part col-3">
                <DriversCommercial />
              </div>
            </div>

          </div>
        </div>
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
    setMaxPrice: (maxPrice) => dispatch({ type: "SET_MAX_PRICE", maxPrice: maxPrice, pricePart: 1000 })
  })
)(ToursClass);

export default Tours;