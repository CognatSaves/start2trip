import React from 'react';
import MapContainer from '../home/HomeBody/MapContainer';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
import { setLengthTime } from '../../redusers/ActionDrivers'

// import LocationSearchInput from '../home/HomeBody/Search';

import DatePicker from 'material-ui/DatePicker';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class RouteTravelBlockClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            isDateHighlighted: false
        }
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
    }
    lookAvailable = (additionalParams) => {
        console.log('look available');

        let routeDate = this.props.globalhistory.getRoute(this.props.points, this.props.storeState.languages[this.props.storeState.activeLanguageNumber].isoAutocomplete);//this.getRoute(this.props.storeState.cities);
        let newStringCities = routeDate.route;
        let country = routeDate.country;
        let langISO = routeDate.langISO;
        if (additionalParams && additionalParams.noDate) {
            this.props.globalhistory.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/drivers/${newStringCities}/`);
        }
        else {
            if (this.state.date !== '') {
                let dateString = this.props.globalhistory.createDateTimeString(this.state.date, true);
                this.props.globalhistory.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/drivers/${newStringCities}?date=` + dateString);
            }
            else {
                this.setState({
                    isDateHighlighted: true
                })
            }
        }


    }
    setLengthTime = (travelLength, travelTime) => {
        //alert('setLengthTime');
        function getLengthString(travelLength) {
            let length = travelLength;
            length = Math.ceil(length / 1000);
            let lengthString = length + " км";
            return lengthString;
        }
        function getTimeString(travelTime) {
            let hours = travelTime / 3600 ^ 0;
            let minutes = (travelTime - hours * 3600) / 60 ^ 0;
            let days = hours / 24 ^ 0;
            hours = hours - days * 24;
            let timeString = "";
            if (days !== 0) {
                timeString += days + " дн. " + hours + " ч.";
            }
            else {
                if (hours !== 0) {
                    timeString += hours + " ч. ";
                }
                timeString += minutes + " мин.";
            }
            return timeString;
        }
        let lengthString = getLengthString(travelLength);
        let timeString = getTimeString(travelTime);
        if (/*(this.props.driversState.travelLength.length===0 || this.props.driversState.travelLength === "-" ) &&
         (this.props.driversState.travelTime.length===0 || this.props.driversState.travelTime === "-")*/
            this.props.driversState.travelLength!==lengthString || this.props.driversState.travelTime!==timeString) {          
            this.props.dispatch(setLengthTime(timeString, lengthString));
        }


    }
    render() {
        const mapStyles = {
            map: {
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '5px',
            }
        };

        let points = [...this.props.points];
        if (points.length > 0) {

        }
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeTravelBlock;

        console.log(this.props.driversState);
        return (
            <div className="placeDescription_block d-flex flex-column" id={this.props.id} key={JSON.stringify(points)}>
                <div className="placeDescription_fragmentName">{textInfo.fragmentName}</div>
                <div className="d-flex flex-row">
                    <div className="d-flex col-md-6 col-12 pl-0 routeTravelBlock_pointPart ">

                        <div className="d-flex flex-wrap routeTravelBlock_pointBlock" >
                            <div style={{ paddingBottom: '10px' }}>
                                <div className="route_time_text col-12">
                                    <div class="marsh">{textInfo.route + ':'}</div>
                                    <div class="param">{textInfo.time + ':'}<span>{this.props.driversState.travelTime}</span></div>
                                    <div class="param par">{textInfo.length + ':'}<span>{this.props.driversState.travelLength}</span></div>
                                </div>
                            </div>
                            {
                                points.map((element, index) =>
                                    <div className={"routeTravelBlock_element d-flex col-md-6 col-12 "}>
                                        <div className="routeTravelBlock_pointValue d-flex flex-row">
                                            <div style={{ paddingRight: '10px', margin: 'auto 0' }}>{this.props.globalhistory.alphabet[index]}</div>
                                            <div className="d-flex routeTravelBlock_height">
                                                <div style={{ margin: 'auto 0' }}>{element.point}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className={"routeTravelBlock_element d-flex col-md-6 col-12 "}>
                                <div className={"routeTravelBlock_pointValue specialDate anidate  d-flex flex-row "
                                    + (this.state.isDateHighlighted ? 'placesDescription_travelBlock_highlighted' : '')}
                                    onClick={() => { if (this.state.isDateHighlighted) { this.setState({ isDateHighlighted: false }) } }}>
                                    <div className="placesDescription_travelBlock_icon placesDescription_calendary" />
                                    <DatePicker hintText={textInfo.startDate} minDate={new Date()}
                                    onChange={(e, date) => { this.setState({ date: this.props.globalReduser.convertDateToUTC(date) }); }} className="routeDescrDate" />
                                </div>
                            </div>
                            <div className={"routeTravelBlock_element d-flex " + ((points.length + 1) % 2 === 0 ? 'col-12' : 'col-md-6 col-12')}>
                                <button className="placesDescription_travelBlock_applyButton p-0"
                                    style={{/*marginBottom: '15px',*/ width: '100%', border: 'none', borderRadius: '5px' }}
                                    onClick={() => this.lookAvailable()}>
                                    <text style={{ margin: "auto", fontSize: '16px' }} >{textInfo.lookAvailable}</text>
                                </button>
                            </div>
                            <div className="d-flex col-12 " >
                                <text className="routeTravelBlock_change" onClick={() => this.lookAvailable({ noDate: true })}>{textInfo.goToEdit}</text>
                            </div>
                        </div>
                    </div>
                    {isMobileOnly ?
                        <React.Fragment /> :
                        <React.Fragment>
                            <div className="placeDescription_fragmentName_mapBlock col-6" style={{ marginTop: "15px" }}>
                                <MapContainer newMapStyles={mapStyles} cities={points} setLengthTime={this.setLengthTime} mapUpdate={true} />
                            </div>
                        </React.Fragment>}

                </div>

            </div>
        )
    }
}

const RouteTravelBlock = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalhistory: state.GlobalReduser,
        driversState: state.DriversReduser,
    }),
)(RouteTravelBlockClass);

export default RouteTravelBlock;