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

        if (this.props.toursState.departurePoint.length > 0 && this.state.days.length === 0 && this.props.toursState.daysNumber.length > 0) {
            //эта функция отрабатывает ровно 1 раз, но только когда пришли this.props.toursState.daysNumber. 
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
                    <input className="searchInputTourInfoContent col-md-3 col-10" onChange={(e) => { this.props.departurePointChange(e.target.value) }} value={this.props.departurePoint}
                        placeholder={textInfo.searchPlaceholder} list="places" name="myPlaces" />
                    <datalist id="places">
                        {this.props.toursState.departurePoint.map((element, index) =>
                            <option value={element.point} >{textInfo.tourNumber +": " + element.elementsNumber}</option>
                        )}
                    </datalist>
                    <DatePicker hintText={textInfo.datePickerLabel} minDate={new Date()} id="basicInfoBirthday" className="calendarModal tourInfoContentDate col-md-4 col-10 p-md-2 p-0" value={this.props.departureDate}
                        onChange={(undefined, data) => {

                            this.props.departureDateChange(data);
                            if (Math.abs(data - this.state.departureDateOld) > 7 * 86400000) {
                                //this must be here, because otherway this func will be called earlier than we save new value
                                setTimeout(() => this.props.sendRequestFunc(false), 0);
                                //this.props.sendRequestFunc(false);
                            }
                            let pathname = this.props.globalReduser.history.location.pathname
                            this.props.globalReduser.history.push(pathname + "?date=" + this.props.globalReduser.createDateTimeString(data, true))
                            this.setState({ departureDateOld: this.props.departureDate })
                        }}
                    />
                    <FormControl className="d-flex col-md-3 col-10 p-md-2 p-0">
                        <Select
                            value={this.props.duration}
                            className="dropdownClass tourInfoContentDays"
                            onChange={(event, index, value) => {
                                this.props.durationChange(event.target.value)
                            }}
                        >
                            <MenuItem value={"default"} >{textInfo.menuItemDaysValue}</MenuItem>
                            {this.state.days.map((element, index) =>
                                <MenuItem value={element}>{(element + " " + textInfo.menuItemDays)}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <span className="tourInfoContentBt col-md-2 col-10 " onClick={() => {
                        if (this.props.departurePoint !== this.state.departurePointOld || this.props.duration !== this.state.durationOld || (Math.abs(this.props.departureDate - this.state.departureDateOld) > 7 * 86400000)) {
                            this.props.sendRequestFunc(false);
                            this.setState({
                                departurePointOld: this.props.departurePoint,
                                durationOld: this.props.duration,
                                departureDateOld: this.props.departureDate
                            })
                            let departurePointLat = "default";
                            let departurePointLong = "default";
                            for (let i = 0; i < this.state.departurePoint.length; i++) {
                                if (this.state.departurePoint[i].point === this.props.departurePoint) {
                                    departurePointLat = this.state.departurePoint[i].lat.toFixed(5)
                                    departurePointLong = this.state.departurePoint[i].long.toFixed(5)
                                    break;
                                }
                            }

                            let pathname = this.props.globalReduser.history.location.pathname.split("/")
                            pathname = pathname[0] + "/" + pathname[1] + "/" + pathname[2] + "/"
                            if (departurePointLat !== "default" && departurePointLong !== "default" || this.props.duration !== "default") {
                                this.props.globalReduser.history.push(pathname + "params=" + departurePointLat + "-" + departurePointLong + "-" + this.props.duration + "/" + "?date=" + this.props.globalReduser.createDateTimeString(this.props.departureDate, true))
                            } else {
                                this.props.globalReduser.history.push(pathname + "?date=" + this.props.globalReduser.createDateTimeString(this.props.departureDate, true))
                            }

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