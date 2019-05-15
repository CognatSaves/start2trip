import React from 'react';
import './MobileFilter.css'
import { connect } from 'react-redux';
import Slider from '../components/ValueMenu/Slider';
import { openFilterShow } from "../../../../../redusers/ActionDrivers"
import { setPricePart, setTempPricePart } from '../../../../../redusers/Action';

class MobileFilterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  changeTempPrice = (value) => {
    this.props.dispatch(setTempPricePart(value, true));
  }
  setPrice = () => {
    let tempValue = this.props.storeState.tempPricePart;
    this.props.dispatch(setPricePart(tempValue, false));
  }
  render() {
    return (
      <div className="mobileFilterModal" style={{ right: this.props.storeState.openFilter ? "0px" : "100%" }}>
        <div className="mobileFilterModalHeader d-flex justify-content-between">
          <span className="mobileFilterModalBack" onClick={() => { this.props.dispatch(openFilterShow(false)); this.setPrice() }}>Фильтры</span>
          <span className="mobileFilterModalClear">Сбросить</span>
        </div>

        <div>
          <div>
            <div className=""><p>{"До $" + (this.props.storeState.maxPrice * this.props.storeState.tempPricePart / 100)}</p></div>
            <Slider changeMaxValue={this.changeTempPrice} defaultValue={[0, this.props.storeState.tempPricePart]} />
          </div>

        </div>
      </div>

    );
  }

}

const MobileFilter = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
  }),
)(MobileFilterClass);

export default MobileFilter;