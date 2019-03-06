import React, { Component } from 'react';
import './DriverProfile.css';
import './DriverInfo.css';
import './DriverAdaptedRoute.css';
import { connect } from 'react-redux'
import Footer from '../Footer/Footer.jsx'
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import DriversProfileComments from './DriversProfileComments';
import Manipulator from '../manipulator/Manipulator';
import emptyStar from './pictures/star.svg';
import driverPhoto from './pictures/drivers_body_photo.png';
import sedan from './pictures/sedan.svg';
import lukas from './pictures/like_blue.svg';


import noSmoking from './pictures/no-smoking.svg';
import seat from './pictures/seat.svg';
import wifi from './pictures/wifi.svg';
import snowflake from './pictures/snowflake.svg';


import changeElement from '../drivers/DriversRoute/pictures/drivers_edit_route.png';
import pointIcon from '../drivers/DriversRoute/pictures/location.svg';
import Header from '../header/Header';

import superMachine from './pictures/the_car.jpg';
import superMachine2 from './pictures/superMachine2.png';
import superMachine3 from './pictures/superMachine3.webp';

import { Link } from 'react-router-dom';
import {setDriversRouteChange} from '../../redusers/ActionDrivers';
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'

const DriverAdaptedRoute = (props)=>
{
    const {element, date,cities,travelLength,travelTime,goToDrivers, changeTravelVisibility} = props;
    let isVisibleArray = Array(cities.length).fill("visible");
      isVisibleArray[isVisibleArray.length-1]="hidden";
      let routeElementWidth=100/(isVisibleArray.length+1);
      routeElementWidth=routeElementWidth+"%";
      
        return (
          <div className = "drivers_route">
            <div className="route_date" style={{margin: 0}}>
              <div className="route_date_text">Ваш индивидуальный маршрут на: {date}</div>
              <div className="route_change" to="/drivers" onClick={()=>goToDrivers()}>                              
                <div className="route_change_text">Изменить маршрут</div>
                <div className="route_change_emblem">
                  <img src={changeElement} width="100%" height="100%" alt="change"></img>
                </div>
              </div>
            </div>
            <div className="driversAdaptedRoute_routeBlock" >
                <div style={{display: "flex", flexDirection: "column", width: "60%", marginRight: "auto", marginTop: "2%"}}>
                    <div className="route_show" >
                    {cities.map((element, index) =>
                    <div className="route_show_element" style={{width: routeElementWidth}}>
                        <img src={pointIcon} height="100%" width="25%" alt={"icon"+index}/>
                        <div className="route_show_text" >{cities[index]}</div>
                        <div className="route_show_line" style={{visibility: isVisibleArray[index]}}></div>
                    </div>
                    )}
                    </div>
                    <div className="route_bottomBlock driverAdaptedRoute_bottomBlock">
                    <div className="route_time_text ">Время в пути без остановок:
                        <p1>{travelTime}</p1><p2>{travelLength}</p2>
                    </div>
                    <div className="route_comment">*Возврат в точку отправления в этот же день бесплатно</div>
                    </div> 
                </div>
                <div style={{display: "flex", flexDirection: "column", width: "30%", marginLeft: "auto", marginRight: "10%"}}>
                    <div className="driversAdaptedRoute_price">{"$"+element.price}</div>
                    <button className="driversAdaptedRoute_sendRequest" onClick={()=>changeTravelVisibility('block')}>ЗАБРОНИРОВАТЬ ПОЕЗДКУ</button>
                    <div className="driversAdaptedRoute_requestCommentary">Стоимость окончательная. Топливо включено</div>
                </div>
            </div>
                                 
          </div>
        );
}
const DriverInfo = (props) =>{
    const {element, changeCar, carImageNumber, carImages} = props;
    console.log("DriverInfo creation");
    console.log(changeCar);
    let arrowLeft = "<";
    let arrowRight=">";
    let driverInfo = "Несмотря на дым и грохот, обучиться стрельбы из гладкоствольного дульнозарядного мушкета может любой, если только он не клинический идиот. Как только человек осваивает основой прием заряжания, остается только направить на врага дуло и спустить курок, остальное в руках Божьих!";
    
    console.log("element");
    console.log(element);
    let carComfortVisibility = Array(element.carComfort.length).fill('flex');
    for(let i=0; i<carComfortVisibility.length; i++){
        if(element.carComfort[i]===false){
            carComfortVisibility[i]='none';
        }
    }
    console.log("carComfortVisibility");
    console.log(carComfortVisibility);
    let carComfortImages = [snowflake, seat, wifi, noSmoking];
    return(
        <div className="drivers_block_element driverInfo_background">
            <div className="block_element_left driverInfo_element_left">
                <div className="driverInfo_left_line" style={{marginBottom: "5%"}}>
                <div className="block_element_photo">
                    <img src={driverPhoto} width="auto" height="100%" alt={"photo" + element} />
                </div>
                <div className="block_element_infoBlock">
                    <div className="block_element_infoBlock_top">
                    <div className="block_element_infoBlock_name">{element.name}</div>
                    <div className="infoBlock_starsBlock">
                        <div className="infoBlock_starsBlock_value">5.0</div>
                        <div className="infoBlock_starsBlock_stars">
                        <div className="starsBlock_stars_element">
                            <div className="background_stars" />
                            <img src={emptyStar} width="15px" height="18px" alt="star1"></img>
                        </div>
                        <div className="starsBlock_stars_element">
                            <div className="background_stars" />
                            <img src={emptyStar} width="15px" height="18px" alt="star2"></img>
                        </div>
                        <div className="starsBlock_stars_element">
                            <div className="background_stars" />
                            <img src={emptyStar} width="15px" height="18px" alt="star3"></img>
                        </div>
                        <div className="starsBlock_stars_element">
                            <div className="background_stars" />
                            <img src={emptyStar} width="15px" height="18px" alt="star4"></img>
                        </div>
                        <div className="starsBlock_stars_element">
                            <div className="background_stars" />
                            <img src={emptyStar} width="15px" height="18px" alt="star5"></img>
                        </div>
                        </div>
                        <div className="infoBlock_starsBlock_number">10000 отзывов</div>
                    </div>
                    </div>
                    <div className="block_element_infoBlock_bot">
                    <div className="block_element_infoBlock_element">
                        <div className="infoString">Возраст:</div>
                        <div className="visibleString">{element.age}</div>
                    </div>
                    <div className="block_element_infoBlock_element">
                        <div className="infoString">Языки:</div>
                        <div className="visibleString">{element.language}</div>
                    </div>
                    <div className="block_element_infoBlock_element">
                        <div className="infoString">За рулём:</div>
                        <div className="visibleString">{element.drivingAge + " лет"}</div>
                    </div>
                    </div>

                </div>
                </div>
                <div className="driverInfo_left_line">
                    <div className="valueBlock_commentary">
                        {element.selfInfo}
                    </div>
                </div>
            </div>
            <div className="block_element_right driversInfo_element_right">
              <div className="element_right_line">
                <div className="driverInfo_carImage">
                  <img src={sedan} width="100%" height="auto" alt={"car" + element}></img>
                </div>
                <div className="tripBlock_carData driverInfo_carData">
                    <div className="driverInfo_carBrand">{element.carBrand+","}</div>
                    <div className="driverInfo_fuelType">{element.fuelType}</div>
                    <div className="driverInfo_carProps">{element.carType+", "+element.carCapacity+" места"}</div>
                </div>
              </div>
              <div className="element_right_line driverInfo_iconLine">
              {
                  carComfortVisibility.map((elem,index)=>
                      <div className="driverInfo_iconLine_icon" style={{display:carComfortVisibility[index]}}>
                        <img src={carComfortImages[index]} width="100%" height="100%" alt=""></img>
                      </div>                 
                  )
              }
              </div>
              <div className="element_right_line">
                <div className="driverInfo_carPhotoBlock">
                    <div className="album_photo">
                        <img class="carImageStyles" src={carImages[carImageNumber]} alt="car" style={{margin: "auto", borderRadius: "5px"}}></img>
                    </div>
                    
                    <button className="driverInfo_carPhotoBlock_switchCarPicture " style={{left: "-7%"}} onClick={()=>changeCar(-1)}>                   
                        <div style={{margin: "auto"}}>{arrowLeft}</div>
                    </button>
                    <button className="driverInfo_carPhotoBlock_switchCarPicture " style={{right: "-7%"}} onClick={()=>changeCar(-1)}>
                        <div style={{margin: "auto"}}>{arrowRight}</div>
                    </button>
                </div>
              </div>
            </div>
            <div className="myHeart driverInfo_myHeart">
              <img src={lukas} width="auto" height="100%" alt="emptyLike"></img>
            </div>
          </div>
    )
}

class DriverProfileClass extends React.Component{
    constructor(props){
        super(props);   
        this.state ={
            travelVisibility: 'none',
            successVisibility: 'none',
            page: 1,
            carImageNumber: 0,
            carImages: [superMachine, superMachine2, superMachine3],
        }    
        this.setPage=this.setPage.bind(this); 
        this.changeCar=this.changeCar.bind(this);
        this.goToDrivers=this.goToDrivers.bind(this);

        this.changeTravelVisibility=this.changeTravelVisibility.bind(this);
        this.changeSuccessVisibility=this.changeSuccessVisibility.bind(this);
    }
    setPage(page) {
        if (page !== "...") {
          this.setState(
            {
              page: page
            }
          )
        }
    }
    goToDrivers(){
        this.props.dispatch(setDriversRouteChange(true));
        this.props.history.push('/drivers');
    }
    changeCar(to){
        console.log("changeCar call!!!!!!!!!!!!!!!");
        let carImageNumber = this.state.carImageNumber+to;
        if(carImageNumber<0){
            carImageNumber=this.state.carImages.length-1;
        }
        if(carImageNumber>this.state.carImages.length-1){
            carImageNumber=0;
        }
        this.setState({
            carImageNumber: carImageNumber
        })
    }
    changeTravelVisibility(value){
        this.setState({
          travelVisibility: value
        })
    }
    changeSuccessVisibility(value){
    this.setState({
        successVisibility: value
    })
    }
    render(){
    console.log("DriverProfile render");
    let driver = this.props.driversState.drivers[this.props.match.params.id];
    console.log("this.props.commentState");
    console.log(this.props.commentState);
    return(
        <React.Fragment>
            <div className = "drivers_top_background">
                <div className="travelFormBlock">
                    <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
                    travelVisibility={this.state.travelVisibility} successVisibility={this.changeSuccessVisibility}/>
                    <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility}/>               
                </div>
                <Header colorClass="colorClass" colorClass2="colorClass2" backgroundColorClass="backgroundColorClass"
                borderColorClass="borderColorClass" labelColorClass="labelColorClass" type={1}/>
                <DriverInfo element={driver} changeCar={this.changeCar} carImageNumber={this.state.carImageNumber} carImages={this.state.carImages}/>
                <DriverAdaptedRoute element={driver} date={this.props.storeState.date} cities={this.props.storeState.cities}
                    travelTime={this.props.driversState.travelTime} travelLength={this.props.driversState.travelLength} goToDrivers={this.goToDrivers}
                    changeTravelVisibility={this.changeTravelVisibility}
                />
            </div>

            <div className = "drivers_bottom_background" >
                <div className = "drivers_body">
                    <div className="left_body_part">
                        <DriversProfileComments page={this.state.page} />
                        <Manipulator number = {this.props.commentState.comments.length} page={this.state.page} elementsNumber={5} setPage={this.setPage}/>
                    </div>
                    <div className="right_body_part">
                        <DriversCommercial/>
                    </div>
                    
                </div>
                
            </div>
            <Footer/>
        </React.Fragment>
            
        )
    }
}

const DriverProfile = connect(
    (state) =>({
      storeState: state.AppReduser,
      driversState: state.DriversReduser,
      commentState: state.CommentReduser
    }),
    /*
    (dispatch) => ({
     // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
    })*/
  )(DriverProfileClass);
  
  export default DriverProfile;