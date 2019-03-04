import React, { Component } from 'react';
import './DriverProfile.css';
import './DriverInfo.css';
import './DriverAdaptedRoute.css';
import { connect } from 'react-redux'
import Footer from '../Footer/Footer.jsx'
import DriversRoute from '../drivers/DriversRoute/DriversRoute';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import DriversProfileComments from './DriversProfileComments';
import Manipulator from '../manipulator/Manipulator';
import emptyStar from './pictures/star.svg';
import driverPhoto from './pictures/drivers_body_photo.png';
import sedan from './pictures/sedan.svg';
import lukas from './pictures/like_blue.svg';
import noSmoking from './pictures/no-smoking.svg';
import { relative } from 'path';
import superMachine from './pictures/the_car.jpg';
import changeElement from '../drivers/DriversRoute/pictures/drivers_edit_route.png';
import pointIcon from '../drivers/DriversRoute/pictures/location.svg';



const DriverAdaptedRoute = (props)=>
{
    const {date,cities,travelLength,travelTime} = props;
    let isVisibleArray = Array(cities.length).fill("visible");
      isVisibleArray[isVisibleArray.length-1]="hidden";
      let routeElementWidth=100/(isVisibleArray.length+1);
      routeElementWidth=routeElementWidth+"%";
      
        return (
          <div className = "drivers_route">
            <div className="route_date">
              <div className="route_date_text">Ваш индивидуальный маршрут на: {date}</div>
              <div className="route_change" onClick={()=>{alert("Here must be transfer to /drivers with changeRoute selected")}}>               
                <div className="route_change_text">Изменить маршрут</div>
                <div className="route_change_emblem">
                  <img src={changeElement} width="100%" height="100%" alt="change"></img>
                </div>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                <div style={{display: "flex", flexDirection: "column", width: "70%", marginRight: "auto"}}>
                    <div className="route_show">
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
                <div style={{display: "flex", flexDirection: "column", width: "30%", marginLeft: "auto"}}>
                    <div className="driversAdaptedRoute_price">$188</div>
                    <button className="driversAdaptedRoute_sendRequest">ЗАБРОНИРОВАТЬ ПОЕЗДКУ</button>
                    <div className="driversAdaptedRoute_requestCommentary">Стоимость окончательная. Топливо включено</div>
                </div>
            </div>
                                 
          </div>
        );
}
const DriverInfo = (props) =>{
    const {element} = props;
    let arrowLeft = "<";
    let arrowRight=">";
    let driverInfo = "Несмотря на дым и грохот, обучиться стрельбы из гладкоствольного дульнозарядного мушкета может любой, если только он не клинический идиот. Как только человек осваивает основой прием заряжания, остается только направить на врага дуло и спустить курок, остальное в руках Божьих!";
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
                        <div className="visibleString">{element.drivingAge}</div>
                    </div>
                    </div>

                </div>
                </div>
                <div className="driverInfo_left_line">
                    <div className="valueBlock_commentary">
                        {driverInfo}
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
                    <div className="driverInfo_carProps">{element.carProps}</div>
                </div>
              </div>
              <div className="element_right_line driverInfo_iconLine">
                  <div className="driverInfo_iconLine_icon">
                    <img src={noSmoking} width="100%" height="100%" alt=""></img>
                  </div>
                  <div className="driverInfo_iconLine_icon">
                    <img src={noSmoking} width="100%" height="100%" alt=""></img>
                  </div>
                  <div className="driverInfo_iconLine_icon">
                    <img src={noSmoking} width="100%" height="100%" alt=""></img>
                  </div>
                  <div className="driverInfo_iconLine_icon">
                    <img src={noSmoking} width="100%" height="100%" alt=""></img>
                  </div>
                  <div className="driverInfo_iconLine_icon">
                    <img src={noSmoking} width="100%" height="100%" alt=""></img>
                  </div>
              </div>
              <div className="element_right_line">
                <div className="driverInfo_carPhotoBlock">
                    <img src={superMachine} width="100%" height="100%" alt="car" style={{margin: "auto"}}></img>
                    <div className="driverInfo_carPhotoBlock_switchCarPicture switchCarPicture_selected" style={{left: "-5%"}}>                   
                        <div style={{margin: "auto"}}>{arrowLeft}</div>
                    </div>
                    <div className="driverInfo_carPhotoBlock_switchCarPicture switchCarPicture_unselected" style={{right: "-5%"}}>
                        <div style={{margin: "auto"}}>{arrowRight}</div>
                    </div>
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
            page: 1,
            comments: [
                {
                    name: "Очень важный человек1",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек2",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек3",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек4",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек5",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек6",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек7",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек8",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек9",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек10",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек11",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек12",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек13",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                },
                {
                    name: "Очень важный человек14",
                    date: "99 никогдабря 0001",
                    value: "Мороз и солнце; день чудесный! Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры.Навстречу северной Авроры,Звездою севера явись!Вечор, ты помнишь, вьюга злилась,На мутном небе мгла носилась;Луна, как бледное пятно,Сквозь тучи мрачные желтела,И ты печальная сидела —А нынче... погляди в окно:"    
                }
               ]
        }    
        this.setPage=this.setPage.bind(this); 
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
    render(){
        console.log("DriverProfile render");
        let driver = this.props.driversState.drivers[0];

        return(
            <React.Fragment>
                <div className = "drivers_top_background">
                    <div className="header_placeholder"></div>
                    <DriverInfo element={driver}/>
                    <DriverAdaptedRoute date={this.props.storeState.date} cities={this.props.storeState.cities}
                        travelTime={this.props.driversState.travelTime} travelLength={this.props.driversState.travelLength}
                    />
                </div>

                <div className = "drivers_bottom_background" >
                    <div className = "drivers_body">
                        <div className="left_body_part">
                            <DriversProfileComments page={this.state.page} comments={this.state.comments}/>
                            <Manipulator number = {this.state.comments.length} page={this.state.page} elementsNumber={5} setPage={this.setPage}/>
                        </div>
                        <div className="right_body_part">
                            <DriversCommercial/>
                        </div>
                        
                    </div>
                    <Footer/>
                </div>

            </React.Fragment>
            
        )
    }
}

const DriverProfile = connect(
    (state) =>({
      storeState: state.AppReduser,
      driversState: state.DriversReduser
    }),
    (dispatch) => ({
     // setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities})
    })
  )(DriverProfileClass);
  
  export default DriverProfile;