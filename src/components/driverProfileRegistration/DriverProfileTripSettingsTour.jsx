import React from 'react';
import './DriverProfileTripSettingsTour.css'
import { connect } from 'react-redux';
import 'react-day-picker/lib/style.css';

import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"

import requests from '../../config';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItemOld from 'material-ui/MenuItem';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextField from 'material-ui/TextField';
import DriverRefreshIndicator from './DriverRefreshIndicator';
import AgencyProfileTour from '../AgencyProfile/AgencyProfileTour';
import Checkbox from '@material-ui/core/Checkbox';
import { Collapse } from 'reactstrap'

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class DriverProfileTripSettingsTourClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.globalReduser.profile;
        this.state = {
            isRefreshExist: false,
            isRefreshing: false,
            isGoodAnswer: false,
            guide: profile.guide,
            guideHourPrice: profile.guideHourPrice,
            guidePriceCurrency: profile.guidePriceCurrency,
            currencies: [...profile.currencies],
            isTourOpened: false 
        };
    }
    thenFunc = () => {
        console.log('thenFunc');
        this.setState({
            isRefreshExist: true,
            isRefreshing: false,
            isGoodAnswer: true,
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 1000);
    }
    catchFunc = () => {
        console.log('catchFunc');
        this.setState({
            isRefreshExist: true,
            isRefreshing: false,
            isGoodAnswer: false,
        });
        setTimeout(() => {
            this.setState({
                isRefreshExist: false
            })
        }, 2000);
    }
    guideStateChanged = () => {
        console.log('guideStateChanged call');
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-" && !this.state.isRefreshExist) {
            this.setState({
                isRefreshExist: true,
                isRefreshing: true
            })
            let body = JSON.stringify({
                guide: !this.state.guide,
                guideStatusChange: true
            });
            let that = this;
            fetch(requests.profileUpdateRequest,{
                method: 'PUT', body: body,
                headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}`} 
            })
            .then(response => {
                return response.json();
            })
            .then(function(data){
                if(data.error){
                    console.log("bad");
                    throw data.error;
                }
                else{
                    console.log('good');
                    let guideValue = !that.state.guide
                    that.setState({
                        guide: guideValue
                    })
                    let profile = that.props.globalReduser.profile;
                    profile.guide = guideValue;
                    that.props.dispatch(setProfileData(profile));
                    that.thenFunc();
                }
            })
            .catch(function (error){
                console.log('bad');
                console.log('An error occurred:',error);
                that.catchFunc();
            })
        }
        else {

            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.globalReduser.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');

        }
    }
    guideParamsChanged = () => {
        console.log('guideParamsChanged');
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt && jwt !== '-' && !this.state.isRefreshExist){
            this.setState({
                isRefreshExist: true,
                isRefreshing: true
            });
            let body = JSON.stringify({
                guideHourPrice: this.state.guideHourPrice,
                guidePriceCurrency: this.state.guidePriceCurrency
            });
            let that = this;
            fetch(requests.profileUpdateRequest,{
                method: 'PUT', body: body,
                headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}`}
            })
            .then(response =>{return response.json()})
            .then(function(data){
                if(data.error){
                    console.log('bad');
                    throw data.error;
                }
                else{
                    console.log('good');
                    let profile = that.props.globalReduser.profile;
                    profile.guideHourPrice = that.state.guideHourPrice;
                    profile.guidePriceCurrency = that.state.guidePriceCurrency;
                    that.props.dispatch(setProfileData(profile));
                    that.thenFunc();
                }
            })
            .catch(function (error){
                console.log('bad');
                console.log('An error occurred:',error);
                that.catchFunc();
            })
        }
    }
    isTourOpenedChange = (value) => {
        
        this.setState({
            isTourOpened: value
        })
    }
    render() {
        console.log('DriverProfileTripSettingsTour render');
        
        console.log(this.state);
        let availableCurrencies = this.props.globalReduser.currencyFilter(this.props.storeState);
        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileTripSettingsTour;
       return(

            <>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist}
                    isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />

                <Collapse isOpen={!this.state.isTourOpened}>
                    <div className="profileFeedbackBlock_comments d-flex flex-column" style={{marginBottom: '10px'}}>
                    <div className="driverProfilesettingsBodyTitle  d-md-block d-none">
                        <p>{textPage.pageLabel}</p>
                    </div>
                    <div className="d-flex flex-row flex-wrap">
                        <div>
                            <div className = 'd-flex flex-row' style={{padding: '15px'}}> 
                                <label htmlFor={"guideId"} style={{margin: 'auto 0'}}>{textPage.guideLabel}</label>
                                <Checkbox id="guideId" checked={this.state.guide} onClick={()=>this.guideStateChanged()}/>
                            </div>
                        </div>
                        {
                            this.state.guide ? 
                            <>
                                <div className="d-flex flex-column" style={{padding: '15px'}}>
                                    <div className="d-flex flex-md-row flex-column tourContent">
                                        <label htmlFor="guideHourPrice" className="d-md-block d-none" style={{margin: 'auto 0', paddingRight: '15px'}}>{textPage.hourPrice}:</label>
                                        <div className="d-flex flex-md-row flex-column p-0">
                                            <TextField
                                                floatingLabelText={textPage.hourPrice}
                                                className="d-md-none d-block inputClass"
                                                fullWidth="100%"
                                                floatingLabelFocusStyle={{ color: "#304269" }}
                                                underlineFocusStyle={{ borderColor: "#304269" }}
                                                value={this.state.guideHourPrice}
                                                onChange={(e) => {

                                                    let obj = document.getElementById('guideHourPrice');
                                                    obj.classList.remove("errorColor");
                                                    let floatValue = parseFloat(e.currentTarget.value)
                                                    if(floatValue>=0){
                                                        this.setState({ guideHourPrice: floatValue });
                                                    }
                                                    else{
                                                        this.setState({ guideHourPrice: 0 });
                                                    }
                                                }}
                                            />
                                            <input id="guideHourPrice" className="d-md-block d-none mr-1" type="number"
                                                value={this.state.guideHourPrice} onChange={(e) => {

                                                    let obj = document.getElementById('guideHourPrice');
                                                    obj.classList.remove("errorColor");
                                                    let floatValue = parseFloat(e.currentTarget.value)
                                                    if(floatValue>=0){
                                                        this.setState({ guideHourPrice: floatValue });
                                                    }
                                                    else{
                                                        this.setState({ guideHourPrice: 0 });
                                                    }
                                                }} />
                                            <FormControl className="" style={{minWidth: '100px'}}>
                                                <Select 
                                                    value={this.state.guidePriceCurrency}
                                                    className="dropdownClass"
                                                    onChange={(event, index, value) => {
                                                        let obj = document.querySelectorAll('.dropdownClass');
                                                        obj[0].classList.remove("errorColor");
                                                        this.setState({ guidePriceCurrency: event.target.value })
                                                    }}
                                                >
                                                        {availableCurrencies.map((element, index) =>
                                                        <MenuItem value={element.id}>{element.ISO}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>           
                                        <div className="carAddNewCarButton justify-content-center" style={{margin: 'auto 15px'}}>
                                            <button onClick={()=>this.guideParamsChanged()}>{textPage.saveButton}</button>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column" style={{fontSize: '12px'}}>
                                        <text>{textPage.info.info1}</text>
                                        <text>{textPage.info.info2}</text>
                                    </div>
                                </div>
                                
                            </>                           
                            :   <React.Fragment/>
                        }
                    </div>
                </div>
                </Collapse>
                
                
                {
                    this.state.guide && <AgencyProfileTour props={{...this.props, changeTourOpened: (value)=>this.isTourOpenedChange(value)}}/>
                }              
            </>
       )
    }
}

const DriverProfileTripSettingsTour = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(DriverProfileTripSettingsTourClass);

export default DriverProfileTripSettingsTour;
