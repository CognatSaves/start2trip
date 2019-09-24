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
            days: [],
            departurePoint: [],
            departurePointOld: null,
            durationOld: null,
            departureDateOld: null,


        }
    }
    render() {

        if (this.props.toursState.categories.length > 0 && (this.state.days.length === 0)) {

            let sortArrayDaysNumber = this.props.toursState.daysNumber.sort((a, b) => { return a < b ? -1 : 1 })
            this.setState({

                days: sortArrayDaysNumber,
                departurePoint: this.props.toursState.departurePoint,

            })
        }
        let textInfo = this.props.storeState.languageTextMain.tourDescription.tourInfo;
        return (
            <div className="tourInfoBlock ">
                <div className="d-flex flex-md-row flex-column justify-content-around align-items-center tourInfoContent">
                    <p>{textInfo.headerText}</p>
                    {/* <LocationSearchInput placeholder={textInfo.searchPlaceholder} address={this.state.departurePoint} changeCity={this.changeCity} classInput="searchInputTourInfoContent col-12" classDropdown="searchDropdownTourInfoContent" classDiv="col-md-2 col-10 p-0"  isoCountryMap={this.props.storeState.isoCountryMap} /> */}
                    <input className="searchInputTourInfoContent col-md-3 col-10" onChange={(e) => {this.props.departurePointChange(e.target.value) }} value={this.props.departurePoint} placeholder={textInfo.searchPlaceholder} list="places" name="myPlaces" />
                    <datalist id="places">
                        {this.state.departurePoint.map((element, index) =>
                            <option value={element.point} >{element.point}</option>
                        )}
                    </datalist>
                    <DatePicker hintText={textInfo.datePickerLabel} minDate={new Date()} id="basicInfoBirthday" className="calendarModal tourInfoContentDate col-md-4 col-10 p-md-2 p-0" value={this.props.departureDate}
                        onChange={(undefined, data) => {
                            if (Math.abs(data - this.state.departureDateOld) > 7 * 86400000) {
                                this.props.sendRequestFunc(false);
                            }
                            this.props.departureDateChange(data);
                            this.setState({ departureDateOld: this.props.departureDate })
                        }}
                    />
                    <FormControl className="d-flex col-md-3 col-10 p-md-2 p-0">
                        <Select
                            value={this.props.duration}
                            className="dropdownClass tourInfoContentDate"
                            onChange={(event, index, value) => {
                                this.props.durationChange(event.target.value)
                            }}
                        >
                            <MenuItem value={textInfo.menuItemDaysValue} >{textInfo.menuItemDaysValue}</MenuItem>
                            {this.state.days.map((element, index) =>
                                <MenuItem value={element}>{(element + " " + textInfo.menuItemDays)}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    {/* <FormControl className="d-flex flex-wrap col-md-2 col-10 p-0">
                        <Select
                            value={this.props.tourType}
                            className="dropdownClass tourInfoContentDate"
                            onChange={(event, index, value) => {
                                this.props.tourTypeChange(event.target.value)
                            }}
                        >
                            <MenuItem value={textInfo.menuItemValue}>{textInfo.menuItemValue}</MenuItem>
                            {this.state.tours.map((element, index) =>
                                <MenuItem value={element.id}>{element.catLoc.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl> */}
                    <span className="tourInfoContentBt" onClick={() => {
                        if (this.props.departurePoint !== this.state.departurePointOld || this.props.duration !== this.state.durationOld || (Math.abs(this.props.departureDate - this.state.departureDateOld) > 7 * 86400000)) {
                            this.props.sendRequestFunc(false);
                            this.setState({
                                departurePointOld: this.props.departurePoint,
                                durationOld: this.props.duration,
                                departureDateOld: this.props.departureDate
                            })
                        }
                    }}>{textInfo.findText}</span>
                </div>
            </div>
        )
    }
}

const TourInfo = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        toursState: state.ToursReduser,
    })
)(TourInfoClass);

export default TourInfo;