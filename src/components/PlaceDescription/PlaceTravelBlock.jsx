import React from 'react';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
import {setLengthTimeFunc} from '../../redusers/GlobalFunction'

// import CurrentLocation from '../home/HomeBody/CurrentLocation.jsx';

import MapContainer from '../home/HomeBody/MapContainer';
import LocationSearchInput from '../home/HomeBody/Search';
import DatePicker from 'material-ui/DatePicker';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class PlaceTravelBlockClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startPlace: { point: '', lat: '', long: '' },/*  this.props.place.capital+', '+this.props.place.country*/
            //endPoint: this.props.place.point.place,//this.props.place.location, //произошло переподключение
            endPlace: this.props.place.endPlace,
            date: '' /*new Date()*/,
            isStartHighlighted: false,
            isDateHighlighted: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return (JSON.stringify(this.props) !== JSON.stringify(nextProps)) || JSON.stringify(nextState) !== JSON.stringify(this.state);

    }

    lookAvailable = () => {

        console.log('look available');
        if (this.state.startPlace.point.length > 0 && this.state.date !== '') {
            let routeDate = this.props.globalhistory.getRoute([this.state.startPlace, this.state.endPlace], this.props.storeState.languages[this.props.storeState.activeLanguageNumber].isoAutocomplete);//this.getRoute(this.props.storeState.cities);

            let newStringCities = routeDate.route;
            let country = routeDate.country;
            let langISO = routeDate.langISO;
            let dateString = this.props.globalhistory.createDateTimeString(this.state.date, true);
            this.props.globalhistory.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/drivers/${newStringCities}?date=` + dateString/*+(langISO!=='en' ? `&lang=`+langISO : ``)*/);

        }
        else {
            this.setState({
                isStartHighlighted: this.state.startPlace.point.length > 0 ? false : true,
                isDateHighlighted: this.state.date !== '' ? false : true
            })
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

        let place = this.props.place;
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeTravelBlock;
        let cities = this.state.startPlace.point.length > 0 ? [this.state.startPlace, this.state.endPlace] : [this.state.endPlace];
        return (

            <div className="placeDescription_block d-flex flex-column" id={this.props.id} /*key={JSON.stringify(this.state.endPlace)}*/>
                <div className="placeDescription_fragmentName">{textInfo.fragmentName}</div>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-md-6 col-12 px-md-2 px-0 pt-2">
                        <div id="placeTravelBlock_startPointId" className={"placesDescription_travelBlock_element d-flex anidate "
                            + (this.state.isStartHighlighted ? 'placesDescription_travelBlock_highlighted' : '')}
                            onClick={() => { if (this.state.isStartHighlighted) { this.setState({ isStartHighlighted: false }) } }}>
                            <div className="placesDescription_travelBlock_icon placesDescription_position" />
                            <LocationSearchInput address={this.state.startPlace.point} changeCity={(index, value, extraData) => { this.setState({ startPlace: { point: value, lat: extraData.location.lat, long: extraData.location.long } }) }}
                                classDropdown="searchElement_style" classInput={"travelBlockSearch"} placeholder={textInfo.startPointPlaceholder}
                                isoCountryMap={this.props.storeState.isoCountryMap} />
                        </div>
                        {
                            /*
                            <div className="placesDescription_travelBlock_element d-flex">
                                <div className="placesDescription_travelBlock_icon placesDescription_geoIcon" />
                                <LocationSearchInput readOnlyOn={true} address={this.state.endPlace.point} changeCity={(index, value,extraData)=>{}} classDropdown="searchElement_style" classInput="travelBlockSearch" />
                            </div>
                            */
                        }
                        <div className="placesDescription_travelBlock_element d-flex">
                            <div className="placesDescription_travelBlock_icon placesDescription_geoIcon" />
                            <div className="d-flex routeTravelBlock_height">
                                <div className="my-auto">{this.state.endPlace.point}</div>
                            </div>
                        </div>

                        <div id="placeTravelBlock_datePicker" className={"placesDescription_travelBlock_element d-flex anidate "
                            + (this.state.isDateHighlighted ? 'placesDescription_travelBlock_highlighted' : '')}
                            onClick={() => { if (this.state.isDateHighlighted) { this.setState({ isDateHighlighted: false }) } }}>
                            <div className="placesDescription_travelBlock_icon placesDescription_calendary" />
                            <div className="">
                                <DatePicker hintText={textInfo.startDate} minDate={new Date()}
                                    onChange={(e, date) => { this.setState({ date: this.props.globalhistory.convertDateToUTC(date) }); }} className="routeDescrDate"/*"routemenu_date"*/ />
                            </div>
                        </div>
                        <button className="placesDescription_travelBlock_element placesDescription_travelBlock_applyButton d-flex"
                            onClick={() => this.lookAvailable()}>
                            <text style={{ margin: "auto", fontSize: '16px' }} >{textInfo.lookAvailable}</text>
                        </button>

                    </div>
                    {isMobileOnly ? <React.Fragment />
                        :
                        <>
                            <div className="placeDescription_fragmentName_mapBlock col-6" style={{ marginTop: "15px" }}>
                                <MapContainer newMapStyles={mapStyles} cities={cities} setLengthTime={setLengthTimeFunc} that={this} mapUpdate={true} textInfo={this.props.storeState.languageTextMain.home.routeMenu} />
                            </div>
                        </>}
                </div>

            </div>
        )
    }

}

const PlaceTravelBlock = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalhistory: state.GlobalReduser,
    }),
)(PlaceTravelBlockClass);

export default PlaceTravelBlock;