import React from 'react';
import './TourInfo.css';
import { connect } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'

import LocationSearchInput from '../home/HomeBody/Search';
import DatePicker from 'material-ui/DatePicker';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class TourInfoClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: ["1 день", "2 дня", "3 дня", "4 дня", "5 дней", "6 дней", "7 дней"],
            tours: ["Экскурсионный тур", "Информационно-обозревательный тур", "Оздоровление", "Активный отдых", "Горный тур", "Круизы"],
        }
    }
    render() {

        let textInfo = this.props.storeState.languageTextMain.tourDescription.tourInfo;
        return (
            <div className="tourInfoBlock ">
                <div className="d-flex flex-md-row flex-column justify-content-around align-items-center tourInfoContent">
                    <p>{textInfo.headerText}</p>
                    {/* <LocationSearchInput placeholder={textInfo.searchPlaceholder} address={this.state.departurePoint} changeCity={this.changeCity} classInput="searchInputTourInfoContent col-12" classDropdown="searchDropdownTourInfoContent" classDiv="col-md-2 col-10 p-0"  isoCountryMap={this.props.storeState.isoCountryMap} /> */}    
                    <input className="searchInputTourInfoContent" onChange={(e)=>{this.props.departurePointChange(e.target.value)}} value={this.props.departurePoint} placeholder={textInfo.searchPlaceholder} list="places" name="myPlaces" />
                    <datalist id="places">
                        <option value="Chrome" />
                        <option value="Firefox" />
                        <option value="Internet Explorer" />
                        <option value="Opera" />
                        <option value="Safari" />
                        <option value="Microsoft Edge" />
                    </datalist>
                    <FormControl className="d-flex flex-wrap col-md-3 col-10">
                        <Select
                            value={this.props.duration}
                            className="dropdownClass tourInfoContentDate"
                            onChange={(event, index, value) => {
                                this.props.durationChange( event.target.value)
                            }}
                        >
                            <MenuItem value={textInfo.menuItemDaysValue} >{textInfo.menuItemDaysValue}</MenuItem>
                            {this.state.days.map((element, index) =>
                                <MenuItem value={element}>{element}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl className="d-flex flex-wrap col-md-2 col-10 p-0">
                        <Select
                            value={this.props.tourType}
                            className="dropdownClass tourInfoContentDate"
                            onChange={(event, index, value) => {
                                this.props.tourTypeChange(event.target.value)
                            }}
                        >
                            <MenuItem value={textInfo.menuItemValue}>{textInfo.menuItemValue}</MenuItem>
                            {this.state.tours.map((element, index) =>
                                <MenuItem value={element}>{element}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <span className="tourInfoContentBt" onClick={()=>{this.props.clickButtonChange();this.props.sendRequestFunc()}}>{textInfo.findText}</span>
                </div>
            </div>
        )
    }
}

const TourInfo = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    })
)(TourInfoClass);

export default TourInfo;