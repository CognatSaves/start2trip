import React from 'react';
import MapContainer from '../home/HomeBody/MapContainer';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
import { setLengthTime } from '../../redusers/ActionDrivers'
import requests from '../../config';
import {setLengthTimeFunc} from '../../redusers/GlobalFunction'

import groupPeopleSvg from '../media/multiple-users-silhouette.svg'
import peopleSvg from '../media/man-user.svg'
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
            window.scroll(
                {
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
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
    routeDateChange = (date) =>{
        if(!this.props.isTours){
            this.props.changeDate(date)
        }
        let utcDate = date ? this.props.globalhistory.convertDateToUTC(date) : date;
        this.setState({ date: utcDate, isDateHighlighted: utcDate ? false : true });
        if (this.props.isTours) {
            this.props.tourDescriptionDateTransferFunction(utcDate)
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
        let textInfo = this.props.textInfo.placeTravelBlock;

        console.log(this.props.driversState);
        if(this.props.isTours && this.props.departureDate){
            debugger;
            let result = this.props.shouldDisableTourDateFunc({
                daily:this.props.daily, dateWork:this.props.dateWork, date: this.props.departureDate, 
                tourSeatsData:this.props.elementActive.tour.tourSeatsData, 
                isPricePerPerson: this.props.elementActive.tour.isPricePerPerson,
                busyDaysArrayVerification: (busyDays, date, daysNumber) => this.props.globalhistory.busyDaysArrayVerification(busyDays, date, daysNumber),
                busyDays: this.props.busyDays, daysNumber: this.props.elementActive.tour.daysNumber
            })
            console.log(result);
            if(result){
                this.routeDateChange(undefined);
            }
        }
        return (
            <div className="placeDescription_block d-flex flex-column" id={this.props.id} key={JSON.stringify(points)}>

                <div className="placeDescription_fragmentName">{textInfo.fragmentName}</div>

                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-md-6 col-12 pl-0 routeTravelBlock_pointPart ">

                        <div className="d-flex flex-wrap routeTravelBlock_pointBlock" >

                            <div style={{ paddingBottom: '10px' }} className="col-md-12 col p-0">
                                <div className="route_time_text col-12 p-0">
                                    {/* <div className="d-flex align-items-center justify-content-between">
                                        <div class="marsh mt-auto">{textInfo.route + ':'}</div>
                                    </div> */}
                                    {this.props.isTours &&
                                        <div className="d-flex">
                                            <div className="pr-4 route_time_howLong">{this.props.textInfo.daysNumber + " " + this.props.daysNumber}</div>
                                            <div className="route_howMuchPeople" style={{ background: "url(" + (this.props.isPricePerPerson ? peopleSvg : groupPeopleSvg) + ") no-repeat" }}>{(this.props.isPricePerPerson ? this.props.textInfo.seats[0] : this.props.textInfo.seats[1]) + " " + this.props.seats + (this.props.isPricePerPerson ? this.props.textInfo.seats[2] : "")}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {
                                points.map((element, index) =>
                                    <div className={"routeTravelBlock_element d-flex col-md-6 col-12 p-0"}>
                                        <div className="routeTravelBlock_pointValue d-flex flex-row">
                                            <div style={{ paddingRight: '10px', margin: 'auto 0' }}>{this.props.globalhistory.alphabet[index]}</div>
                                            <div className="d-flex routeTravelBlock_height">
                                                <div style={{ margin: 'auto 0' }}>{element.point}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className={"routeTravelBlock_element d-flex col-md-6 col-12 p-0"} key={JSON.stringify(this.state.date)}>
                                <div className={"routeTravelBlock_pointValue specialDate anidate  d-flex flex-row "
                                    + (this.state.isDateHighlighted ? 'placesDescription_travelBlock_highlighted' : '')}
                                    onClick={() => { if (this.state.isDateHighlighted) { this.setState({ isDateHighlighted: false }) } }}>
                                    <div className="placesDescription_travelBlock_icon placesDescription_calendary" />
                                    <DatePicker /*disabled={this.props.isTours}*/ hintText={textInfo.startDate} defaultDate={this.props.isTours ? this.props.departureDate  : new Date()}
                                        minDate={new Date()}
                                        shouldDisableDate={(date) => {
                                            if(this.props.isTours){
                                                /*
                                                    let dateCropped = date.toISOString().substring(0,10);
                                                    let departureDateCropped = this.props.tourDepartureDate.toISOString().substring(0,10);
                                                    if(dateCropped === departureDateCropped){
                                                        debugger;
                                                    }
                                                */
                                                let result = this.props.shouldDisableTourDateFunc({
                                                    daily:this.props.daily, dateWork:this.props.dateWork, date: date, 
                                                    tourSeatsData:this.props.elementActive.tour.tourSeatsData, 
                                                    isPricePerPerson: this.props.elementActive.tour.isPricePerPerson,
                                                    busyDaysArrayVerification: (busyDays, date, daysNumber) => this.props.globalhistory.busyDaysArrayVerification(busyDays, date, daysNumber),
                                                    busyDays: this.props.busyDays, daysNumber: this.props.elementActive.tour.daysNumber
                                                })
                                                return result;                                                     
                                            }
                                            else{
                                                //if !isTours, than this is a Route component
                                                //here you can select any date
                                                return false;
                                            }                                           
                                        }}
                                        onChange={(e, date) => {
                                            /*
                                            if(!this.props.isTours){
                                                this.props.changeDate(date)
                                            }
                                            let utcDate = this.props.globalhistory.convertDateToUTC(date);
                                            this.setState({ date: utcDate });
                                            if (this.props.isTours) {
                                                this.props.tourDescriptionDateTransferFunction(utcDate)
                                            }
                                            */
                                            this.routeDateChange(date);
                                        }} className="routeDescrDate routeTravelBlockDate " />
                                </div>
                            </div>
                            <div className={"routeTravelBlock_element d-flex " + ((points.length + 1) % 2 === 0 ? 'col-12 p-0' : 'col-md-6 col-12')}>
                                <button className="placesDescription_travelBlock_applyButton p-0"
                                    style={{/*marginBottom: '15px',*/ width: '100%', border: 'none', borderRadius: '5px' }}
                                    onClick={() => {
                                        if (!this.props.isTours) {
                                            this.lookAvailable({ noDate: this.state.date ? false : true })
                                        }
                                        else {

                                            this.props.changeTravelVisibility(this.props.elementActive.tour.price,
                                                { ...this.props.elementActive, date: new Date(this.props.departureDate) })
                                        }
                                    }}>
                                    <text style={{ margin: "auto", fontSize: '16px' }} >{(this.props.isPricePerPerson ? textInfo.lookAvailable[0] : textInfo.lookAvailable[1]) + (this.props.isTours ? this.props.price : "")}</text>
                                </button>
                            </div>
                            {!this.props.isTours &&
                                <div className="d-flex col-12 " >
                                    <text className="routeTravelBlock_change" onClick={() => { this.lookAvailable({ noDate: true }) }}>{textInfo.goToEdit}</text>
                                </div>
                            }
                        </div>
                        <div className="d-flex">
                            <div class="param">{textInfo.time + ': '}<span>{this.props.driversState.travelTime}</span></div>
                            <div class="param par">{textInfo.length + ': '}<span>{this.props.driversState.travelLength}</span></div>
                        </div>
                    </div>
                    {isMobileOnly ?
                        <React.Fragment /> :
                        <>
                            <div className="placeDescription_fragmentName_mapBlock col-6" style={{ marginTop: "15px" }}>
                                <MapContainer newMapStyles={mapStyles} cities={points} setLengthTime={setLengthTimeFunc} that={this} mapUpdate={true}  textInfo={this.props.storeState.languageTextMain.home.routeMenu}/>
                            </div>
                        </>}

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