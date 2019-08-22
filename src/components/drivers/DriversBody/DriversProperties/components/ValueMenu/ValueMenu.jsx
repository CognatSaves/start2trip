import React from 'react';
import './ValueMenu.css'
import { connect } from 'react-redux';
import { setPricePart, setTempPricePart } from '../../../../../../redusers/Action';

import Slider from '@material-ui/core/Slider';

class ValueMenuClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: this.props.storeState.pricePart,
            maxPrice: this.props.storeState.maxPrice
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
        let storeState = this.props.storeState;
        let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber]
        if(this.state.maxPrice!==this.props.storeState.maxPrice){
            this.setState({
                price: this.props.storeState.maxPrice,
                maxPrice: this.props.storeState.maxPrice
            })
        }
        if (this.props.isVisible) {
            return (
                <div id={containerId} className="drivers_properties_valueMenu">
                    <div className="valueMenu_borderElement"><p>{"До " + (activeCurrency.isLeft ? activeCurrency.symbol : '')
                      + Math.ceil(this.state.price * activeCurrency.costToDefault) +
                      (!activeCurrency.isLeft ? activeCurrency.symbol : '')}</p></div>
                    <Slider
                        defaultValue={this.props.storeState.pricePart}
                        value={this.state.price}
                        onChange={(e, value) => { this.setState({ price: value }) }}
                        getAriaValueText={this.valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="off"
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