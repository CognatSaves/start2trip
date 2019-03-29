import React from 'react';
import { Link } from 'react-router-dom';

import Manipulator from '../manipulator/Manipulator';
import dromon from './pictures/dromon.jpg';
import Stars from '../stars/Stars';

import userBlueIcon from '../drivers/DriversBody/DriversBlock/pictures/user_blue.svg';

export default class ToursListBlock extends React.Component{
    render(){
        function createDateString(date) {
            function getMonthName(number) {
                let monthArray = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
                return monthArray[number];
            }
            function getDateName(number) {
                let dayArray = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
                return dayArray[number];
            }
            return getDateName(date.getDay()) + ", " + date.getDate() + " " + getMonthName(date.getMonth()) + " " + date.getFullYear();
        }
        return(
            <div className="drivers_block">
                    {this.props.selectedTours.map((element, index) =>

                        <div className={"drivers_block_element d-flex p-0"} id={index}>
                            <div className="placesList_picture">
                                <img src={dromon} width="100%" height="100%" style={{ borderRadius: "5px" }} alt=""></img>
                            </div>
                            <div className="placesList_info d-flex ">
                                <div className="d-flex flex-column toursList_leftBlock">
                                    <div className="placesList_info_row">
                                        <div className="d-flex flex-column" style={{ marginRight: "auto" }}>
                                            <Link to={`/tour/${0},${element.id}`} className="placesList_placeName">
                                                {this.props.namesArray[index]}
                                            </Link>
                                            <div>
                                                <Stars key={index + "/" + element.rating} value={element.rating} commentNumber={element.comments + " отзывов"} valueDisplay="block" commentNumberDisplay="block" />
                                            </div>
                                            <div className="toursList_leftBlock_startDate">
                                                Дата отправления: <text style={{ fontWeight: "600" }}>{createDateString(element.departureDate)}</text>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="placesList_info_row placesList_info_style" style={{ margin: "20px 0 auto 0" }}>
                                        {element.info}
                                    </div>
                                </div>
                                <div className="d-flex flex-column toursList_rightBlock">
                                    <div>
                                        <div className="d-flex toursList_rightBlock_firstLine">
                                            <div className="d-flex" style={{ margin: "0 auto" }}>
                                                <div className="toursList_rightBlock_userIcon" style={{ background: "url(" + userBlueIcon + ")", backgroundSize: "10px 10px" }} />
                                                <div className="toursList_rightBlock_available">{"Свободных мест: " + element.passengersAvailable}</div>
                                            </div>
                                            <div className="toursList_rigntBlock_bookmark" style={{ background: "url(" + this.props.srcArray[index] + ")", backgroundSize: "20px 25px" }} />
                                        </div>
                                    </div>
                                    <div className="toursList_rightBlock_price">{"$" + element.price}</div>
                                    <button className="toursList_rightBlock_bookTourButton">Заказать тур</button>
                                    <div className="toursList_rightBlock_priceInfo">Стоимость на человека</div>
                                    <div className="d-flex" style={{ marginTop: "auto" }}>
                                        <Link to={`/tour/${0},${element.id}`} className="placesList_readMoreButton">
                                            Подробнее
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                    <Manipulator number={this.props.manipulatorNumber} elementsNumber={this.props.manipulatorElementsNumber} page={this.props.manipulatorPage}
                        setPage={this.props.manipulatorSetPage} showMorePages={this.props.manipulatorShowMorePage}
                    />
                </div>
        )
    }

}