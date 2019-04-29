import React from 'react';
import './DriverProfileHistory.css'
import { connect } from 'react-redux';
import DriverProfileTrevelHistory from './DriverProfileTrevelHistory'

import people1 from './img/001372a9a88e12c88b532a.jpg'
import people2 from './img/person.jpg'
import people3 from './img/mina.jpg'
import people4 from './img/gruzinskaja-kuhnja.jpg'



class DriverProfileHistoryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trevelHistory: [
        { name: "Валера", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Чкалова 12", feedback: "Детское кресло.багаж 10кг собака и кошка,может ещё хомяк", img: people1, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Анжела", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Красная 52", feedback: "", img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },
        { name: "Гоги", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Чкалова 22", feedback: "Дополнительный багажник на крыше", img: people3, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Маратик", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Главная 32", feedback: "Два ящика вина и доп.кресло на крыше", img: people4, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },
        { name: "Валера", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Чкалова 12", feedback: "", img: people1, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Анжела", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Красная 52", feedback: "Много остановок будем делать в пути", img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },
        { name: "Гоги", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Чкалова 22", feedback: "Дополнительный багажник на крыше", img: people3, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "тур", price: "$180" },
        { name: "Маратик", tel: "+375335552211", email: "Valera@gmail.com", place: "Тбилиси. ул.Главная 32", feedback: "Два ящика вина и доп.кресло на крыше", img: people4, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time: "12:00", type: "поездка", price: "$180" },

      ],
    }

  }


  render() {

    return (
      <React.Fragment>
        <div className="driverProfileHistory">
      
          {{
            0: <DriverProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
            // 1: <DriverProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
          }[this.props.storeState.pageRender]}
        </div>
      </React.Fragment>
    );
  }
}

const DriverProfileHistory = connect(
  (state) => ({
    storeState: state.DriverProfileRegistrationtReduser,
  }),
)(DriverProfileHistoryClass);

export default DriverProfileHistory;