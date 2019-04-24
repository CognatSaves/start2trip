import React from 'react';
import './UserProfileTrevelHistory.css'
import { connect } from 'react-redux'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'




class UserProfileTrevelHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trevelHistory: ["", "", "", "", "",],

        }

    }


    render() {

        return (
            <div className="d-flex flex-wrap justify-content-center">
                {this.state.trevelHistory.map((element, index) =>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
                        <div className="trevelHistoryBody  d-flex flex-column">
                            <div className="d-flex flex-column">
                                <p>Перевозчик</p>
                                <p>Валера</p>
                                <Rater total={5} onRate={this.onRate} interactive={false} rating={3} />

                            </div>
                            <div className="d-flex flex-column">
                                <p>Маршрут</p>
                                <p>Тбилиси-Мцхета-Гори</p>

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