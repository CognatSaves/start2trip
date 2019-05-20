import React from 'react';
import '../driverProfileRegistration/DriverProfileHistory.css'
import { connect } from 'react-redux';
import UserProfileTrevelHistory from './UserProfileTrevelHistory'

import people1 from './img/001372a9a88e12c88b532a.jpg'
import people2 from './img/person.jpg'
import people3 from './img/mina.jpg'
import people4 from './img/gruzinskaja-kuhnja.jpg'



class UserProfileHistoryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trevelHistory: [
        { name: "Валера", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Чкалова 12", feedback: "Детское кресло.багаж 10кг собака и кошка,может еще хомяк", img: people1, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Анжела", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Красная 52", feedback: "", img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },
        { name: "Гоги", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Чкалова 22", feedback: "Дополнительный багажник на крыше", img: people3, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Маратик", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Главная 32", feedback: "Два ящика вина и доп.кресло на крыше", img: people4, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },
        { name: "Валера", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Чкалова 12", feedback: "", img: people1, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Анжела", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Красная 52", feedback: "Много остановок будем делать в пути", img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },
        { name: "Гоги", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Чкалова 22", feedback: "Дополнительный багажник на крыше", img: people3, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Маратик", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Главная 32", feedback: "Два ящика вина и доп.кресло на крыше", img: people4, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },

      ],
      trevelHistory1: [
        { name: "Альгерд", tel: "+375337752211", email: "Algerd@gmail.com", place: "Тбилиси. ул.Чкалова 12", feedback: "Детское кресло.багаж 10кг собака и кошка,может еще хомяк", img: people1, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Анжела", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Красная 52", feedback: "", img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },
        { name: "Гоги", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Чкалова 22", feedback: "Дополнительный багажник на крыше", img: people3, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Анжела", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Красная 52", feedback: "", img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },
      ],
      isPreHistory:true,
    }

  }


  render() {

    return (
      <React.Fragment>
        <div className="driverProfileHistory">
          <div className="driverProfileHistoryTop d-flex">
              <div className={this.state.isPreHistory ? "d-flex align-items-center driverProfileHistoryTop-active":" d-flex align-items-center"} onClick={()=>{this.setState({isPreHistory:true})}}>
                <span>Предстоящие</span>
              </div>
              <div className={this.state.isPreHistory ? "d-flex align-items-center":"driverProfileHistoryTop-active d-flex align-items-center"} onClick={()=>{this.setState({isPreHistory:false})}}>
                <span>История</span>
              </div>
          </div>
          {{
            true: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
            false: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory1} />,
          }[this.state.isPreHistory]}
        </div>
      </React.Fragment>
    );
  }
}

const UserProfileHistory = connect(
  (state) => ({
    storeState: state.DriverProfileRegistrationReduser,
  }),
)(UserProfileHistoryClass);

export default UserProfileHistory;