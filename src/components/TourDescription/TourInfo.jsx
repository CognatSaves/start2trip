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
            departurePoint: "",
            tours: ["Экскурсионный тур", "Информационно-обозревательный тур", "Оздоровление", "Активный отдых", "Горный тур", "Круизы"],
            toursValue: props.storeState.languageTextMain.tourDescription.tourInfo.menuItemValue,
        }
    }
    changeCity = (index, value) => {
        this.setState({
            departurePoint: value
        })
    }
    render() {

        let textInfo = this.props.storeState.languageTextMain.tourDescription.tourInfo;
        return (
            <div className="tourInfoBlock ">
                <div className="d-flex flex-md-row flex-column justify-content-around align-items-center tourInfoContent">
                    <p>{textInfo.headerText}</p>
                    {/* <LocationSearchInput placeholder={textInfo.searchPlaceholder} address={this.state.departurePoint} changeCity={this.changeCity} classInput="searchInputTourInfoContent col-12" classDropdown="searchDropdownTourInfoContent" classDiv="col-md-2 col-10 p-0"  isoCountryMap={this.props.storeState.isoCountryMap} /> */}    
                    <input className="searchInputTourInfoContent " placeholder={textInfo.searchPlaceholder} list="places" name="myPlaces" />
                    <datalist id="places">
                        <option value="Chrome" />
                        <option value="Firefox" />
                        <option value="Internet Explorer" />
                        <option value="Opera" />
                        <option value="Safari" />
                        <option value="Microsoft Edge" />
                    </datalist>
                    <DatePicker hintText={textInfo.datePickerLabel} minDate={new Date()} id="basicInfoBirthday" className="calendarModal tourInfoContentDate col-md-2 col-10" value={this.props.departureDate}
                        onChange={(undefined, data) => { this.props.departureDateChange(data) }}
                    />
                    <FormControl className="d-flex flex-wrap col-md-2 col-10 p-0">
                        <Select
                            value={this.state.toursValue}
                            className="dropdownClass tourInfoContentDate"
                            onChange={(event, index, value) => {
                                this.setState({ toursValue: event.target.value });
                            }}
                        >
                            <MenuItem value={textInfo.menuItemValue} disabled={true} >{textInfo.menuItemValue}</MenuItem>
                            {this.state.tours.map((element, index) =>
                                <MenuItem value={element}>{element}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <span className="tourInfoContentBt">{textInfo.findText}</span>
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