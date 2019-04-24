import React from 'react';
import './DriverProfileNavigation.css'
import { connect } from 'react-redux';
import { whichPageRender } from "../../redusers/ActionDriverProfileRegistration"
import imgPerson from './img/drivers_body_photo.png'
import Stars from '../stars/Stars'
// import basicInformationBG from './img/diverBG.png'
import calendarBG from './img/calendar.png'
import carBg from './img/carBg.png'
import toursBG from './img/poezdki_tours.png'
// import driverBG from './img/diverBG.png'
// import driverBG from './img/diverBG.png'
// import driverBG from './img/diverBG.png'



class DriverProfileNavigationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationText: ["Профиль", "Автомобиль", "Настройки поездок", "Туры", "Календарь", "История поездок", "Предстоящие поездки", "Отзывы", "Настройки",],
            shiftLeft: [0, 6, 129, 219, 311, 430, 430],
        }
    }
    shiftLeft = (event) => {

        event.currentTarget.parentElement.scrollLeft = event.currentTarget.offsetLeft - 120;
    }

    render() {
        return (
            <React.Fragment>
                <div className="registrationWrapper driverBG col-12 p-0" style={{
                    // 0: { backgroundImage: "url(" + basicInformationBG + ")" },
                    1: { backgroundImage: "url(" + carBg + ")" },
                    2: { backgroundImage: "url(" + toursBG + ")" },
                    3: { backgroundImage: "url(" + toursBG + ")" },
                    4: { backgroundImage: "url(" + calendarBG + ")" },
                    5: { backgroundImage: "url(" + carBg + ")" },
                    // 6: { backgroundImage: "url(" + basicInformationBG + ")" },
                    // 7: { backgroundImage: "url(" + basicInformationBG + ")" },
                    // 8: { backgroundImage: "url(" + basicInformationBG + ")" },
                }[this.props.storeState.pageRender]}>
                    <div className={"basicInformationBodyTop d-flex align-items-center " + {
                        0: "basicInformationBG",
                        1: "carBg",
                        2: "toursBG",
                        3: "bodyTopImg",
                        4: "calendarBG",
                        5: "settingsBG",
                        6: "bodyTopImg",
                        7: "settingsBG",
                        8: "bodyTopImg",
                    }[this.props.storeState.pageRender]}>
                        <div className="basicInformationBodyTopImgHover">
                            <label className="basicInformationBodyTopImg" htmlFor="addFile">Обновить фотографию</label>
                            <img src={imgPerson} alt="imgPerson" />
                            {/* <label className="edditIcon" htmlFor="addFile"></label> */}
                            <input type="file" id="addFile" style={{ display: "none" }} />
                        </div>
                        <div className="bodyTopDriverInfo col-7">
                            <div className="bodyTopDriverInfoName d-flex flex-column align-items-start">
                                <p className="mb-0 mr-2">Валерий</p>
                                <Stars value={"4.5"} valueDisplay={true} commentNumberDisplay={true} commentNumber="30 отзывов" />
                            </div>
                            <div className="bodyTopDriverInfoPlace">
                                <p>Тбилиси</p>
                                {/* TODO Location */}
                            </div>
                            <div className="bodyTopDriverInfoRide p-0 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-column flex-column">
                                <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 p-0">
                                    <span>18</span>
                                    <div className="d-flex flex-column">
                                        <p>ВСЕГО </p>
                                        <p>ПОЕЗДОК</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center col-xl-3 col-lg-3 col-md-3 col-sm-5 col-9 p-0">
                                    <p>ВСЕГО ПОЕЗДОК:</p>
                                    <span className="pl-1">18</span>
                                </div>
                                <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 p-0">
                                    <span>8</span>
                                    <div className="d-flex flex-column ">
                                        <p>ПРЕДСТОЯЩИЕ </p>
                                        <p>ПОЕЗДКИ</p>
                                    </div>
                                </div>
                                <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center col-xl-3 col-lg-3 col-md-3 col-sm-5 col-12 p-0">
                                    <p>ПРЕДСТОЯЩИЕ ПОЕЗДКИ:</p>
                                    <span className="pl-1">8</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navigationBody d-flex align-items-center">
                        {this.state.navigationText.map((element, index) =>
                            <p className={{ [index]: "navigationBodyActive", }[this.props.storeState.pageRender] + " navigationButton mb-0 "} onClick={(event) => { this.props.dispatch(whichPageRender(index)); this.shiftLeft(event) }}>{element}</p>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const DriverProfileNavigation = connect(
    (state) => ({
        storeState: state.DriverProfileRegistrationtReduser,
    }),
)(DriverProfileNavigationClass);

export default DriverProfileNavigation;