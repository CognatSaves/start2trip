import React from 'react';
import './ValueMenu.css'
import Slider from './Slider';
import { connect } from 'react-redux';
import { setPricePart, setTempPricePart } from '../../../../../../redusers/Action';

class ValueMenuClass extends React.Component {
    constructor(props) {
        super(props);
        this.changeTempPrice = this.changeTempPrice.bind(this);
        this.close = this.close.bind(this);
        this.setPrice = this.setPrice.bind(this);
    }
    changeTempPrice(value) {
        this.props.dispatch(setTempPricePart(value, true));
    }
    setPrice() {
        let tempValue = this.props.storeState.tempPricePart;
        this.props.dispatch(setPricePart(tempValue, false));
    }
    close() {
        this.props.dispatch(setTempPricePart(this.props.storeState.pricePart, false));
    }

    render() {
        let containerId = "drivers_properties_valueMenu";
        if (this.props.isVisible) {
            return (
                <div id={containerId} className="drivers_properties_valueMenu">
                    <div className="valueMenu_borderElement valueMenu_rightBorder"><p>{"До $"+(this.props.storeState.maxPrice * this.props.storeState.tempPricePart / 100)}</p></div>
                    <Slider changeMaxValue={this.changeTempPrice} defaultValue={[0, this.props.storeState.tempPricePart]} />
                    <div className="valueMenu_stateBlock">
                        <button className="valueMenu_stateBlock_cancelButton" onClick={() => this.close()}>Отмена</button>
                        <button className="valueMenu_stateBlock_applyButton" onClick={() => this.setPrice()}>Готово</button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <React.Fragment></React.Fragment>
            )
        }
    }
}
const ValueMenu = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(ValueMenuClass);

export default ValueMenu;