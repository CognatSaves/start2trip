import React from 'react';
import noSmoking from './pictures/no-smoking.svg';
import seat from './pictures/seat.svg';
import wifi from './pictures/wifi.svg';
import snowflake from './pictures/snowflake.svg';
import driverPhoto from './pictures/drivers_body_photo.png';
import sedan from './pictures/sedan.svg';
import lukas from './pictures/like_blue.svg';
import Stars from '../stars/Stars';
import { connect } from 'react-redux';
import ToyotaPrado from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado.jpg';
import ToyotaPrado2 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado2.jpg';
import ToyotaPrado3 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado3.jpg';
import ToyotaPrado4 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado4.jpg';
import ToyotaPrado5 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado5.jpg';
import ToyotaPrado6 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado6.jpg';

import Carousel from './Carousel';

class DriverInfoClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            photoArray: [ToyotaPrado, ToyotaPrado6, ToyotaPrado2, ToyotaPrado, ToyotaPrado6, ToyotaPrado2, ToyotaPrado3, ToyotaPrado4, ToyotaPrado5, ToyotaPrado6, ToyotaPrado],
            
        }     
    }   
    render(){
        console.log("DriverInfo render");
        const { element, changeCar, carImageNumber, carImages } = this.props;

        let arrowLeft = "<";
        let arrowRight = ">";
    
        let carComfortVisibility = Array(element.carComfort.length).fill('flex');
        for (let i = 0; i < carComfortVisibility.length; i++) {
            if (element.carComfort[i] === false) {
                carComfortVisibility[i] = 'none';
            }
        }
        let carComfortImages = [snowflake, seat, wifi, noSmoking];
        return(
        <div className="drivers_block_element driverInfo_background d-flex flex-row">
            <div className="block_element_left driverInfo_element d-flex flex-column col-6">
                <div className="driverInfo_left_line">
                    <div className="block_element_photo">
                        <img src={driverPhoto} width="auto" height="auto" alt={"photo" + element} />
                    </div>
                    <div className="block_element_infoBlock">
                        <div style={{paddingBottom: "15px"}}>
                            <div className="block_element_infoBlock_name" style={{lineHeight: "18px", paddingBottom: "10px"}}>{element.name}</div>
                            <Stars value={element.rating} commentNumber={element.comments + " отзывов"} valueDisplay="block" commentNumberDisplay="block" />
                        </div>
                        <div className="block_element_infoBlock_bot">
                            <div className="d-flex flex-row">
                                <div className="infoString infoString_driverInfoSize">Языки:</div>
                                <div className="d-flex">
                                {
                                    element.language.map((langElement,index)=>
                                    <div className="driversBlock_languages_flag" style={{background: "url("+this.props.storeState.languages[langElement].icon+") no-repeat", backgroundSize: "15px 15px", margin: "auto 5px auto 0"}}/>              
                                    )
                                }
                                </div>
                            </div>
                            <div className="d-flex flex-row">
                                <div className="infoString infoString_driverInfoSize">За рулём:</div>
                                <div className="visibleString">{element.drivingAge + " лет"}</div>
                            </div>
                        </div>

                    </div>
                    <div className="driverInfo_bookmarkElement"></div>
                </div>
                <div className="driverInfo_left_line">
                    <div className="valueBlock_commentary">
                        {element.selfInfo}
                    </div>
                </div>
            </div>
            <div className="driverInfo_element d-flex flex-column col-6" style={{paddingLeft: "20px"}}>
            {
                /*
                <div className="d-flex flex-row">
                    <div className="driverInfo_carImage" style={{ background: "url(" + sedan + ") no-repeat", backgroundSize: "60px 55px" }} />
                    <div className="tripBlock_carData driverInfo_carData d-flex flex-row">
                        <div className="driverInfo_carBrand">{element.carBrand + ","}</div>
                        <div className="driverInfo_fuelType">{element.fuelType}</div>
                        <div className="driverInfo_carProps">{element.carType + ", " + element.carCapacity + " места"}</div>
                    </div>
                </div>
                <div className="element_right_line driverInfo_iconLine d-flex flex-row">
                    {
                        carComfortVisibility.map((elem, index) =>
                            <div className="driverInfo_iconLine_icon" style={{ display: carComfortVisibility[index] }}>
                                <img src={carComfortImages[index]} height="100%" width="100%" alt=""></img>
                            </div>
                        )
                    }
                </div>
                <div className="element_right_line">
                    <div className="driverInfo_carPhotoBlock">
                        <div className="album_photo">
                            <img class="carImageStyles" src={carImages[carImageNumber]} alt="car" style={{ margin: "auto", borderRadius: "5px" }}></img>
                        </div>

                        <button className="driverInfo_carPhotoBlock_switchCarPicture " style={{ left: "-20px" }} onClick={() => changeCar(-1)}>
                            <div style={{ margin: "auto" }}>{arrowLeft}</div>
                        </button>
                        <button className="driverInfo_carPhotoBlock_switchCarPicture " style={{ right: "-20px" }} onClick={() => changeCar(-1)}>
                            <div style={{ margin: "auto" }}>{arrowRight}</div>
                        </button>
                    </div>
                </div>
                */

                /*
                <div className="myHeart">
                    <img src={lukas} width="auto" height="100%" alt="emptyLike"></img>
                </div>

                */
            }
                <div className="d-flex" style={{paddingBottom: "10px"}}>
                    <div className="block_element_infoBlock_name" style={{marginRight: "auto", lineHeight: "18px", height: "18px"}}>Toyota Land Cruiser Prado</div>
                    <div style={{marginLeft: "auto", lineHeight: "18px", height: "18px"}}>Внедорожник, 4 места</div>
                </div>
                <Carousel photoArray={this.state.photoArray} width={460} height={294}
                            widthCarouselEl={102} heightCarouselEl={64} type={"vertical"}
                            />
                
                
            </div>
            
        </div>

        )
    }
}
const DriverInfo = connect(
    (state) => ({
      storeState: state.AppReduser,
      driversState: state.DriversReduser
    }),
  )(DriverInfoClass);
  
  export default DriverInfo;