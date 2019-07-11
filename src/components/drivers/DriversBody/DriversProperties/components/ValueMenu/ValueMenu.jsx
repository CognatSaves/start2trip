import React from 'react';
import './ValueMenu.css'
// import Slider from './Slider';
import { connect } from 'react-redux';
import { setPricePart, setTempPricePart } from '../../../../../../redusers/Action';
import Slider from '@material-ui/core/Slider';

class ValueMenuClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: this.props.storeState.pricePart,
        }
    }
    changeTempPrice = (value) => {
        this.props.dispatch(setTempPricePart(value, true));
    }
    setPrice = () => {
        this.props.dispatch(setPricePart(this.state.price, false));
    }
    close = () => {
        this.props.dispatch(setTempPricePart(this.props.storeState.pricePart, false));
    }
    valuetext = (value) => {
        if (value === this.state.price) {

        } else {
            this.setState({ price: value });
        }
    }

    render() {

        let containerId = "drivers_properties_valueMenu";
        if (this.props.isVisible) {
            return (
                <div id={containerId} className="drivers_properties_valueMenu">
                    <div className="valueMenu_borderElement"><p>{"До $" + this.state.price}</p></div>
                    <Slider
                        defaultValue={this.props.storeState.pricePart}
                        getAriaValueText={this.valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={this.props.storeState.maxPrice / 25}
                        marks
                        min={0}
                        max={this.props.storeState.maxPrice}
                    />
                    {/* <Slider changeMaxValue={this.changeTempPrice} defaultValue={[0, this.props.storeState.tempPricePart]} /> */}
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