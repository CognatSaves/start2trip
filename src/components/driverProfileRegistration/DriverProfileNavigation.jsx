import React from 'react';
import './DriverProfileNavigation.css'
import { connect } from 'react-redux';
import { whichPageRender } from "../../redusers/ActionDriverProfileRegistration"
import imgPerson from './img/drivers_body_photo.png'
import Stars from '../stars/Stars'



class DriverProfileNavigationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationText: ["Профиль", "Автомобиль", "Поездки", "Туры", "Календарь", "Настройки", "Отзывы"],
        }
    }

    render() {
        return (
            <div className="driverBG">
                <div className="registrationWrapper col-12 p-0">

                    {{
                        0:<div className="basicInformationBodyTop bodyTopImg d-flex align-items-center">
                         <div className="basicInformationBodyTopImgHover">
                             <label className="basicInformationBodyTopImg" htmlFor="addFile">Обновить фотографию</label>
                             <img src={imgPerson} alt="imgPerson" />
                             {/* <label className="edditIcon" htmlFor="addFile"></label> */}
                             <input type="file" id="addFile" style={{ display: "none" }} />
                         </div>
                         <div className="bodyTopDriverInfo col-7">
                             <div className="d-flex flex-column align-items-start">
                                 <p className="mb-0 mr-2">Валерий</p>
                                 <Stars value={"4.5"}  valueDisplay="block" commentNumberDisplay="block" />
                             </div>
                             <div className="bodyTopDriverInfoPlace">
                                 <p className="mt-1 mb-xl-4 mb-lg-4 mb-md-4 mb-sm-2 mb-2 ">Грузия,Тбилиси</p>
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
                                 <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center justify-content-between col-xl-3 col-lg-3 col-md-3 col-sm-5 col-9 p-0">
                                     <p>ВСЕГО ПОЕЗДОК</p>
                                     <span>18</span>
                                 </div>
                                 <div className="d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-center col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 p-0">
                                     <span>8</span>
                                     <div className="d-flex flex-column ">
                                     <p>ПРЕДСТОЯЩИЕ </p>
                                     <p>ПОЕЗДКИ</p>
                                     </div>
                                 </div>
                                 <div className="bodyTopDriverInfoRideMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center justify-content-between col-xl-3 col-lg-3 col-md-3 col-sm-5 col-12 p-0">
                                     <p>ПРЕДСТОЯЩИЕ ПОЕЗДКИ</p>
                                     <span>8</span>
                                 </div>
                             </div>
                         </div>
                     </div>,
                        1:<div className="basicInformationBodyTop"> 2 img</div>,
                        2:<div className="basicInformationBodyTop"> 3 img</div>,
                        3:<div className="basicInformationBodyTop"> 4 img</div>,
                        4:<div className="basicInformationBodyTop"> 5 img</div>,
                        5:<div className="basicInformationBodyTop"> 6 img</div>,
                        6:<div className="basicInformationBodyTop"> 7 img</div>,
                    }[this.props.storeState.pageRender]}

                    <div className="navigationBody d-flex align-items-center">
                        {this.state.navigationText.map((element, index) =>
                            <div>
                                <p className={{ [index]: "navigationBodyActive", }[this.props.storeState.pageRender] + " mb-0"} onClick={() => { this.props.dispatch(whichPageRender(index)) }}>{element}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileNavigation = connect(
    (state) => ({
        storeState: state.DriverProfileRegistrationtReduser,
    }),
)(DriverProfileNavigationClass);

export default DriverProfileNavigation;