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
    // setLengthTime = (travelLength, travelTime) => {
    //     //alert('setLengthTime');
    //     //TODO переводы
    //     function getLengthString(travelLength) {
    //         let length = travelLength;
    //         length = Math.ceil(length / 1000);
    //         let lengthString = length + " км";
    //         return lengthString;
    //     }
    //     function getTimeString(travelTime) {
    //         let hours = travelTime / 3600 ^ 0;
    //         let minutes = (travelTime - hours * 3600) / 60 ^ 0;
    //         let days = hours / 24 ^ 0;
    //         hours = hours - days * 24;
    //         let timeString = "";
    //         if (days !== 0) {
    //             timeString += days + " дн. " + hours + " ч.";
    //         }
    //         else {
    //             if (hours !== 0) {
    //                 timeString += hours + " ч. ";
    //             }
    //             timeString += minutes + " мин.";
    //         }
    //         return timeString;
    //     }
    //     let lengthString = getLengthString(travelLength);
    //     let timeString = getTimeString(travelTime);
    //     if (/*(this.props.driversState.travelLength.length===0 || this.props.driversState.travelLength === "-" ) &&
    //      (this.props.driversState.travelTime.length===0 || this.props.driversState.travelTime === "-")*/
    //         this.props.driversState.travelLength !== lengthString || this.props.driversState.travelTime !== timeString) {
    //         this.props.dispatch(setLengthTime(timeString, lengthString, travelTime, travelLength));
    //     }


    // }
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
                            <div className={"routeTravelBlock_element d-flex col-md-6 col-12 p-0"}>
                                <div className={"routeTravelBlock_pointValue specialDate anidate  d-flex flex-row "
                                    + (this.state.isDateHighlighted ? 'placesDescription_travelBlock_highlighted' : '')}
                                    onClick={() => { if (this.state.isDateHighlighted) { this.setState({ isDateHighlighted: false }) } }}>
                                    <div className="placesDescription_travelBlock_icon placesDescription_calendary" />
                                    <DatePicker /*disabled={this.props.isTours}*/ hintText={textInfo.startDate} defaultDate={this.props.isTours ? new Date(this.props.departureDate) : new Date()}
                                        minDate={new Date()}
                                        shouldDisableDate={(date) => {
                                            function calendaryCheck(dateWork, selectedDate){
                                                //this function makes calendary check
                                                //we must find element here, if we want show date
                                                //return true, if not finded, other way - false
                                                let day = selectedDate.getDate();
                                                let month = selectedDate.getMonth()+1;
                                                let year = selectedDate.getFullYear();
                                                let flag = true;
                                                for(let i=0; i<dateWork.length; i++){
                                                    let newDate = new Date(dateWork[i]);
                                                    let newDay = newDate.getDate();
                                                    let newMonth = newDate.getMonth()+1;
                                                    let newYear = newDate.getFullYear();
                                                    if (newDay === day && newMonth === month && newYear === year) {
                                                        flag = false;
                                                        i=this.props.dateWork.length;
                                                    }
                                                }
                                                return flag;
                                            }
                                            function tourSeatsDataCheck(tourSeatsData, selectedDate, isMulticustomeralTour){
                                                //this function makes tourSeatsData check
                                                //we must not find object here or find it and there must be free seats
                                                //return true, if date is not valid, otherwise - false
                                                
                                                let day = selectedDate.getDate();
                                                let month = selectedDate.getMonth()+1;
                                                let year = selectedDate.getFullYear();
                                                let selectedDateString = year + '-'+(month<10 ? '0'+month : month) + '-' + (day<10 ? '0'+day : day);
                                                //let isMulticustomeralTour = 
                                                for(let i=0; i<tourSeatsData.length; i++){
                                                    if(tourSeatsData[i].startDefault === selectedDateString){
                                                        if(isMulticustomeralTour){
                                                            //if multicustomeral, we must have at least 1 free seat
                                                            if(tourSeatsData[i].seatsLeft>0){
                                                                return false
                                                            }
                                                            else{
                                                                return true;
                                                            }
                                                        }
                                                        else{
                                                            //if singlecustomeral, there must be another users, that book that tour on that day
                                                            //server protect us from that(send zeros on needed places), but bonus check is needed
                                                            if(tourSeatsData[i].seatsLeft>0 && tourSeatsData[i].seatsReserved===0){
                                                                return false
                                                            }
                                                            else{
                                                                return true;
                                                            }
                                                        }
                                                    }   
                                                }
                                                return false;
                                            }
                                            if(this.props.isTours){
                                                debugger;
                                                if(!this.props.daily){
                                                    //calendary check
                                                    let calendaryCheckValue = calendaryCheck(this.props.dateWork,date);
                                                    if(calendaryCheckValue){
                                                        //if calendaryCheckValue === true, then this tour can not be driven that day 
                                                        return calendaryCheckValue;
                                                    }
                                                }
                                                let tourSeatsDataCheckValue = tourSeatsDataCheck(this.props.elementActive.tour.tourSeatsData, date, this.props.elementActive.tour.isPricePerPerson);
                                                if(tourSeatsDataCheckValue){
                                                    //if tourSeatsDataCheckValue === true, then this tour can not be driven that day
                                                    return tourSeatsDataCheckValue;
                                                }
                                                //next function returns true, if date is valid, otherwise false; but here we have reversed check, then set "!"
                                                let busyDaysCheckValue = !(this.props.globalhistory.busyDaysArrayVerification(this.props.busyDays, date, this.props.elementActive.tour.daysNumber));
                                                return busyDaysCheckValue;
                                                      
                                            }
                                            else{
                                                //if !isTours, than this is a Route component
                                                //here you can select any date
                                                return false;
                                            }
                                            /**
                                                let flag = true;
                                                debugger;
                                                let tourSeatsData = this.props.elementActive.tour.tourSeatsData;
                                                if (!this.props.daily && this.props.isTours) {
                                                    console.log(this.props.busyDays);
                                                    for (let i = 0; i < this.props.dateWork.length; i++) {
                                                        //dateWork - calendary of tour
                                                        let newDate = new Date(this.props.dateWork[i])
                                                        let newDay = newDate.getDate();
                                                        let newMonth = newDate.getMonth();
                                                        let newYear = newDate.getFullYear();
                                                        let day = date.getDate();
                                                        let month = date.getMonth();
                                                        let year = date.getFullYear()
                                                        if (newDay === day && newMonth === month && newYear === year) {
                                                            flag = false;
                                                            i=this.props.dateWork.length;
                                                        }
                                                    }
                                                    if(flag){
                                                        //if flag === false, then go to exit. If not - we must check tourSeatsData elems, that shows us,
                                                        //is that tour in selected date have more free seats than 0
                                                        
                                                    }
                                                } else {
                                                    flag = false;
                                                }
                                                return flag
                                            */
                                        }}
                                        onChange={(e, date) => {
                                            if(!this.props.isTours){
                                                this.props.changeDate(date)
                                            }
                                            let utcDate = this.props.globalhistory.convertDateToUTC(date);
                                            this.setState({ date: utcDate });
                                            if (this.props.isTours) {
                                                this.props.tourDescriptionDateTransferFunction(utcDate)
                                            }

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