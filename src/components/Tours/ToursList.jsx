import React from 'react';
import './ToursList.css';
import '../Places/PlacesList.css';
import { connect } from 'react-redux';
import Stars from '../stars/Stars';
import geoIcon from '../home/HomeBody/pictures/geo_icon.svg';
import bookmarkEmpty from '../Places/pictures/bookmark_contour.svg';
import bookmarkFilled from '../Places/pictures/bookmark_blue.svg';
import bookmarkSelected from '../Places/pictures/bookmark_orange.svg';
import { Link } from 'react-router-dom';

import Manipulator from '../manipulator/Manipulator';
import userBlueIcon from '../drivers/DriversBody/DriversBlock/pictures/user_blue.svg';
import dromon from './pictures/dromon.jpg';

import { setToursPage, setToursMorePagesShow } from '../../redusers/ActionTours';
class ToursListClass extends React.Component {
    constructor(props) {
        super(props);
        this.toursSort = this.toursSort.bind(this);
        this.setPage = this.setPage.bind(this);
        this.showMorePages = this.showMorePages.bind(this);
    }
    setPage(page) {
        if (page !== "...") {
            this.props.dispatch(setToursPage(page));
        }
    }
    showMorePages() {
        this.props.dispatch(setToursMorePagesShow());
    }
    toursSort(array, type) {
        function sortPrice(a, b) {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
        }
        function sortRating(a, b) {
            if (a.rating > b.rating) return -1;
            if (a.rating < b.rating) return 1;
        }
        function sortComments(a, b) {
            if (a.comments > b.comments) return -1;
            if (a.comments < b.comments) return 1;
        }
        let tempArray = [];
        let tempPrice = this.props.storeState.pricePart * this.props.storeState.maxPrice / 100;
        array.forEach((element, index) => {
            if (element.price < tempPrice && element.passengersAvailable >= this.props.storeState.persons[1] + this.props.storeState.persons[0] &&
                (/*element.carType===this.props.storeState.autoValue || this.props.storeState.autoValue==="Тип авто"*/true) &&
                (/*element.language.indexOf(this.props.storeState.languageValue)!==-1 || this.props.storeState.languageValue==="Язык"*/ true)
            ) {
                tempArray.push(element);
            }
        });
        switch (type) {
            case "Популярность":
                return tempArray.sort(sortComments);
            case "Рейтинг":
                return tempArray.sort(sortRating);
            case "Цена":
                return tempArray.sort(sortPrice);
            default: return array;
        }
    }
    render() {
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

        function createNames(tourArray) {
            let res = [];
            for (let i = 0; i < tourArray.length; i++) {
                res[i] = tourArray[i].places[0];
                for (let j = 1; j < tourArray[i].places.length; j++) {
                    res[i] = res[i] + "-" + tourArray[i].places[j];
                }
            }
            return res;
        }


        let sortedArray = this.toursSort([...this.props.toursState.tours[0].tours], this.props.storeState.sortMenuValue);
        let selectedTours = sortedArray.slice((this.props.toursState.toursPage - this.props.toursState.toursShowPages) * this.props.storeState.pagesMenuValue,
            this.props.toursState.toursPage * this.props.storeState.pagesMenuValue);

        let srcArray = Array(selectedTours.length).fill(bookmarkEmpty);

        srcArray[0] = bookmarkSelected;
        srcArray[1] = bookmarkFilled;


        let namesArray = createNames(selectedTours);
        return (
            <React.Fragment>
                <div className="drivers_block">
                    {selectedTours.map((element, index) =>

                        <div className={"drivers_block_element d-flex p-0"} id={index}>
                            <div className="placesList_picture">
                                <img src={dromon} width="100%" height="100%" style={{ borderRadius: "5px" }} alt=""></img>
                            </div>
                            <div className="placesList_info d-flex flex-row">
                                <div className="d-flex flex-column toursList_leftBlock">
                                    <div className="placesList_info_row">
                                        <div className="d-flex flex-column" style={{ marginRight: "auto" }}>
                                            <Link to={`/tour/${0},${element.id}`} className="placesList_placeName">
                                                {namesArray[index]}
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
                                            <div className="toursList_rigntBlock_bookmark" style={{ background: "url(" + srcArray[index] + ")", backgroundSize: "20px 25px" }} />
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
                    <Manipulator number={this.props.toursState.tours[0].tours.length} elementsNumber={this.props.storeState.pagesMenuValue} page={this.props.toursState.toursPage}
                        setPage={this.setPage} showMorePages={this.showMorePages}
                    />
                </div>
            </React.Fragment>
        )
    }

}

const ToursList = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser,
        toursState: state.ToursReduser
    }),
)(ToursListClass);

export default ToursList;
