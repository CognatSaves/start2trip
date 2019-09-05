import React from 'react';
import './TourInfo.css';
import { connect } from 'react-redux'

import LocationSearchInput from '../home/HomeBody/Search'


class TourInfoClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departurePoint:"",
        }
    }
    changeCity = (index, value) => {
        this.setState({
            departurePoint: value
        })
    }
    render() {
       
       
        return (
            <div className="tourInfoBlock ">
                <div className="d-flex justify-content-around align-items-center tourInfoContent">
                    <p>Подобрать тур:</p>
                    <LocationSearchInput placeholder={"Место отправления"} address={this.state.departurePoint} changeCity={this.changeCity} classInput="searchInputTourInfoContent" classDropdown="searchDropdownTourInfoContent" classDiv="" />

                    <input type="text"/>
                    <input type="text"/>
                    <span className="tourInfoContentBt">Найти</span>
                </div>
            </div>
        )
    }
}

const TourInfo = connect(
    (state) => ({
        globalReduser: state.GlobalReduser
    })
)(TourInfoClass);

export default TourInfo;