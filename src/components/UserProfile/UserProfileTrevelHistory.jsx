import React from 'react';
import './UserProfileTrevelHistory.css'
import { connect } from 'react-redux'
// import StarRatings from './react-star-ratings';




class UserProfileTrevelHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trevelHistory: ["", "", "", "", "",],
            rating:0,
        }

    }

    // changeRating( newRating, name ) {
    //     this.setState({
    //       rating: newRating
    //     })
    // }


    render() {

        return (
            <div className="d-flex flex-wrap justify-content-center">
                {this.state.trevelHistory.map((element, index) =>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
                        <div className="trevelHistoryBody  d-flex flex-column">
                            <div className="d-flex flex-column">
                                <p>Перевозчик</p>
                                <p>Валера</p>
                                {/* <StarRatings
                                    rating={2.403}
                                    starDimension="40px"
                                    starSpacing="15px"
                                /> */}

                            </div>
                            <div className="d-flex flex-column">
                                <p>Маршрут</p>
                                <p>Тбилиси-Мцхета-Гори</p>
                                {/* <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="#304269"
                                    changeRating={this.changeRating}
                                    numberOfStars={6}
                                    name='rating'
                                /> */}
                            </div>
                            <div className="d-flex flex-column">
                                <p>Дата</p>
                                <p>Ср,21 Февраля 2019</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p>Стоимость поезди</p>
                                <p>188$</p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        );
    }
}

const UserProfileTrevelHistory = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(UserProfileTrevelHistoryClass);

export default UserProfileTrevelHistory;