import React from 'react';
import './DriverProfile.css';
import './DriverInfo.css';
import './DriverAdaptedRoute.css';
import { connect } from 'react-redux'
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import DriversProfileComments from './DriversProfileComments';
import Manipulator from '../manipulator/Manipulator';
import Header from '../header/Header';
import { setDriversRouteChange } from '../../redusers/ActionDrivers';
import StartTravelForm from '../startTravelForm/StartTravelForm';
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess';
import DriverAdaptedRoute from './DriverAdaptedRoute';
import DriverInfo from './DriverInfo.jsx';
import DriverProfileTours from './DriverProfileTours';
import requests from '../../config';
import {setCities} from '../../redusers/Action'

class DriverProfileClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            travelVisibility: 'none',
            successVisibility: 'none',
            page: 1,
            showPages: 1,
            showPanelVariant: 0,
        }
        this.showMorePages = this.showMorePages.bind(this);
        this.setPage = this.setPage.bind(this);
        this.goToDrivers = this.goToDrivers.bind(this);

        this.changeTravelVisibility = this.changeTravelVisibility.bind(this);
        this.changeSuccessVisibility = this.changeSuccessVisibility.bind(this);
        this.changePanelVariant = this.changePanelVariant.bind(this);
        let body = JSON.stringify({
            id: 'id',
            carId: 'carId',
            cities: 'cities',
            country: 'country',
            date: 'date',
            distance: 'distance'
        })
        fetch(requests.getDriverData,{
            method: 'PUT', body: body,
            headers: { 'content-type': 'application/json'}
        })
        .then(response => {
            return response.json();
        })
        .then(function (data){
            if (data.error) {
                console.log("bad");
                throw data.error;
            }
            else{
                console.log('good');
                console.log(data);
            }

        })
        .catch(function (error){
            console.log('bad');
            console.log('An error occurred:',error);
        })
    }
    showMorePages() {
        this.setState({
            page: this.state.page + 1,
            showPages: this.state.showPages + 1
        })
    }
    setPage(page) {
        if (page !== "...") {
            this.setState(
                {
                    page: page,
                    showPages: 1
                }
            )
        }
    }
    goToDrivers() {
        this.props.dispatch(setDriversRouteChange(true));
        this.props.history.push('/drivers');
    }
    changeTravelVisibility(value) {
        this.setState({
            travelVisibility: value
        })
    }
    changeSuccessVisibility(value) {
        this.setState({
            successVisibility: value
        })
    }
    changePanelVariant(value) {
        this.setState({
            showPanelVariant: value
        })
    }
    parseStringToArray=(cities,country)=>{
    
        let newCities = [];
        let newString = cities.slice(5);
        let newArrayCities = newString.split("-to-");
        for(let i = 0; i<newArrayCities.length;i++){
          let stringWhithSpaces = newArrayCities[i].replace(/-/g, ' ');
          stringWhithSpaces = stringWhithSpaces + ' , ' +country;
          newCities[i]={point: stringWhithSpaces, lat: "", long: ""};
        }
        this.props.dispatch(setCities(newCities))
      }
    render() {
        let driver = this.props.driversState.drivers[this.props.match.params.id];
        let buttonNames = ["Отзывы (" + this.props.commentState.comments.length + ")", "Мои личные самые ценные туры"];

        let cities;
        let country;
        if(this.props.match){
            if(this.props.storeState.cities[0].point === ""){
              cities = this.props.match.params.cities;
              country = this.props.match.params.country;
              this.parseStringToArray(cities,country);
            }
        }
        return (
            <React.Fragment>
                <div className="drivers_top_background">
                    <Header history={this.props.history} />
                    <div className="wrapper d-flex flex-column">
                        <div className="drivers_top_block d-flex flex-column">
                            <DriverInfo element={driver} />
                            <DriverAdaptedRoute element={driver} date={this.props.storeState.date} cities={this.props.storeState.cities}
                                travelTime={this.props.driversState.travelTime} travelLength={this.props.driversState.travelLength} goToDrivers={this.goToDrivers}
                                changeTravelVisibility={this.changeTravelVisibility}
                            />
                        </div>
                    </div>
                </div>
                <div className="wrapper d-flex flex-column">
                    <div className="drivers_bottom_background d-flex flex-column" >
                        <div className="drivers_body d-flex">
                            <div className="left_body_part col-12">
                                <div className="driverProfileComments_panel d-flex">
                                    {
                                        buttonNames.map((element, index) =>
                                            <button className={this.state.showPanelVariant === index ? "driverProfileComments_panel_element driverProfileComments_panel_selectedElement" : "driverProfileComments_panel_element"} onClick={() => this.changePanelVariant(index)}>{element}</button>
                                        )
                                    }
                                </div>
                                {
                                    this.state.showPanelVariant === 0 &&
                                    <React.Fragment>
                                        <DriversProfileComments page={this.state.page} showPages={this.state.showPages} driver={driver} />
                                        <Manipulator number={this.props.commentState.comments.length} page={this.state.page} elementsNumber={5}
                                            setPage={this.setPage} showMorePages={this.showMorePages} />
                                    </React.Fragment>
                                }
                                {
                                    this.state.showPanelVariant === 1 &&
                                    <React.Fragment>
                                        <DriverProfileTours />
                                    </React.Fragment>
                                }
                            </div>
                            {/* <div className="right_body_part col-3">
                                <DriversCommercial />
                            </div> */}

                        </div>
                    </div>
                </div>
                <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
                    travelVisibility={this.state.travelVisibility} successVisibility={this.changeSuccessVisibility} />
                <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility} />
            </React.Fragment>

        )
    }
}

const DriverProfile = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
        commentState: state.CommentReduser
    }),
)(DriverProfileClass);

export default DriverProfile;