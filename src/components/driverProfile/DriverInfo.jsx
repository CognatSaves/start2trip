import React from 'react';
import noSmoking from './pictures/no-smoking.svg';
import seat from './pictures/seat.svg';
import wifi from './pictures/wifi.svg';
import snowflake from './pictures/snowflake.svg';
import driverPhoto from './pictures/drivers_body_photo.png';
import sedan from './pictures/sedan.svg';
import lukas from './pictures/like_blue.svg';
import Stars from '../stars/Stars';
export default class DriverInfo extends React.Component{
    shouldComponentUpdate(nextProps){ 
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
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
            <div className="block_element_left driverInfo_element_left col-7">
                <div className="driverInfo_left_line">
                    <div className="block_element_photo">
                        <img src={driverPhoto} width="auto" height="auto" alt={"photo" + element} />
                    </div>
                    <div className="block_element_infoBlock">
                        <div className="block_element_infoBlock_top">
                            <div className="block_element_infoBlock_name">{element.name}</div>
                            <Stars value={element.rating} commentNumber={element.comments + " отзывов"} valueDisplay="block" commentNumberDisplay="block" />
                        </div>
                        <div className="block_element_infoBlock_bot">
                            <div className="block_element_infoBlock_element d-flex flex-row">
                                <div className="infoString">Возраст:</div>
                                <div className="visibleString">{element.age}</div>
                            </div>
                            <div className="block_element_infoBlock_element  d-flex flex-row">
                                <div className="infoString">Языки:</div>
                                <div className="visibleString">{element.language}</div>
                            </div>
                            <div className="block_element_infoBlock_element  d-flex flex-row">
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
            <div className="block_element_right driverInfo_element_right col-5">
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
            </div>
            <div className="myHeart">
                <img src={lukas} width="auto" height="100%" alt="emptyLike"></img>
            </div>
        </div>

        )
    }
}