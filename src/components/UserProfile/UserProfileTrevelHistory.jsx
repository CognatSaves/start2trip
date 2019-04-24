import React from 'react';
import './UserProfileTrevelHistory.css'
import { connect } from 'react-redux'
import Stars from '../stars/Stars';
import people1 from './img/001372a9a88e12c88b532a.jpg'
import people2 from './img/person.jpg'
import people3 from './img/mina.jpg'
import people4 from './img/gruzinskaja-kuhnja.jpg'




class UserProfileTrevelHistoryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trevelHistory: [
                { name: "Валера", img: people1, route: "ТБИЛИСИ-МЦХЕТА-ГОРИ", date: "02.21.2019", price: "180$" },
                { name: "Анжела", img: people2, route: "МИНСК-МЦХЕТА-КУТАИСИ", date: "02.16.2019", price: "280$" },
                { name: "Гоги", img: people3, route: "ТБИЛИСИ-МЦХЕТА-ГОРИ", date: "02.1.2019", price: "110$" },
                { name: "Маратик", img: people4, route: "ТБИЛИСИ-МЦХЕТА-ГОРИ", date: "02.2.2019", price: "80$" },
            ],

        }

    }


    render() {

        return (
            <div className="d-flex flex-wrap justify-content-center">
                {this.state.trevelHistory.map((element, index) =>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
                        <div className="trevelHistoryBody  d-flex flex-column">
                            <div className="d-flex flex-column mb-2">
                                <h5>Перевозчик</h5>
                                <div className="d-flex align-items-center">
                                    <img src={element.img} alt={element.img}/>
                                    <p>{element.name}</p>
                                    <Stars value={5 - index} commentNumber="30" valueDisplay={true} commentNumberDisplay={false} />
                                </div>
                            </div>
                            <div className="d-flex flex-column  mb-2">
                                <h5>Маршрут</h5>
                                <p>{element.route}</p>
                            </div>
                            <div className="d-flex flex-column  mb-2">
                                <h5>Дата</h5>
                                <p>{element.date}</p>
                            </div>
                            <div className="d-flex flex-column  mb-2">
                                <h5>Стоимость поезди</h5>
                                <p>{element.price}</p>
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