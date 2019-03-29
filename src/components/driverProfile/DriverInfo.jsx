import React from 'react';
import driverPhoto from './pictures/drivers_body_photo.png';
import Stars from '../stars/Stars';
import { connect } from 'react-redux';
import ToyotaPrado from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado.jpg';
import ToyotaPrado2 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado2.jpg';
import ToyotaPrado3 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado3.jpg';
import ToyotaPrado4 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado4.jpg';
import ToyotaPrado5 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado5.jpg';
import ToyotaPrado6 from '../drivers/DriversBody/DriversBlock/pictures/ToyotaPrado6.jpg';
import information from './pictures/information.svg';
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
        const { element} = this.props;
        return(
        <div className="drivers_block_element driverInfo_background d-flex " style={{marginBottom: 0}}>
            <div className="block_element_left driverInfo_element d-flex flex-column col-6">
                <div className="driverInfo_left_line">
                    <div className="block_element_photo">
                        <img src={driverPhoto} width="auto" height="auto" alt={"photo" + element} />
                    </div>
                    <div className="block_element_infoBlock">
                        <div style={{paddingBottom: "15px"}}>
                            <div className="block_element_infoBlock_name driversInfo_driverName">{element.name}</div>
                            <Stars value={element.rating} commentNumber={element.comments + " отзывов"} valueDisplay="block" commentNumberDisplay="block" />
                        </div>
                        <div className="block_element_infoBlock_bot">
                            <div className="d-flex ">
                                <div className="infoString infoString_driverInfoSize">Языки:</div>
                                <div className="d-flex">
                                {
                                    element.language.map((langElement,index)=>
                                    <div className="driversBlock_languages_flag" style={{background: "url("+this.props.storeState.languages[langElement].icon+") no-repeat", backgroundSize: "15px 15px", margin: "auto 5px auto 0"}}/>              
                                    )
                                }
                                </div>
                            </div>
                            <div className="d-flex ">
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
                <div className="d-flex">
                    <div className="block_element_infoBlock_name driversInfo_driverName d-flex" style={{marginRight: "auto", position: "relative"}}>
                        {"Toyota Land Cruiser Prado "}
                        <div className="driverInfo_informationIcon" style={{ background: "url("+information+")", backgroundSize: "18px 18px"}}>
                            <div className="driverInfo_informationBlock">
                                {
                                    element.carComfort.map((element, index)=>
                                        <div className="d-flex" style={{paddingBottom: "5px"}}>
                                            <div className="driverInfo_comfortIconStyle" style={{background: "url("+this.props.storeState.comfort[element].icon+") no-repeat", backgroundSize: "15px 15px"}}/>    
                                            <div className="d-flex" style={{height: "15px"}}>
                                                <div className="driverInfo_comfortTextStyle">{this.props.storeState.comfort[element].title}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="driverInfo_carTypeValue">Внедорожник, 4 места</div>
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