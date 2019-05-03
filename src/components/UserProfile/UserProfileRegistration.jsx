import React from 'react';
import './UserProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import UserProfileNavigation from './UserProfileNavigation'
import UserProfileBasicInformation from './UserProfileBasicInformation'
import UserProfileSettings from './UserProfileSettings'
import UserProfileTrevelHistory from './UserProfileTrevelHistory'
import people1 from './img/001372a9a88e12c88b532a.jpg'
import people2 from './img/person.jpg'
import people3 from './img/mina.jpg'
import people4 from './img/gruzinskaja-kuhnja.jpg'



class UserProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trevelHistory: [
        { name: "Валера",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Чкалова 12",feedback: "Детское кресло.багаж 10кг собака и кошка,может еще хомяк", rating:4, img: people1, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"тур", price: "$180" },
        { name: "Анжела",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Красная 52",feedback: "", rating:4, img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"поездка", price: "$180" },
        { name: "Гоги",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Чкалова 22",feedback: "Дополнительный багажник на крыше", rating:3, img: people3, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"тур", price: "$180" },
        { name: "Маратик",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Главная 32",feedback: "Два ящика вина и доп.кресло на крыше", rating:2.5, img: people4, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"поездка", price: "$180" },
        { name: "Валера",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Чкалова 12",feedback: "", rating:4, img: people1, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"тур", price: "$180" },
        { name: "Анжела",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Красная 52",feedback: "Много остановок будем делать в пути", rating:5, img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"поездка", price: "$180" },
        { name: "Гоги",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Чкалова 22",feedback: "Дополнительный багажник на крыше", rating:3.5, img: people3, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"тур", price: "$180" },
        { name: "Маратик",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Главная 32",feedback: "Два ящика вина и доп.кресло на крыше", rating:4, img: people4, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"поездка", price: "$180" },
      ],

  }
  }


  render() {

    return (
      <React.Fragment>
        <Header driver={true} history={this.props.history}/>
        <UserProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="contentHeight d-flex col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12">
              
              {{
                0: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                1: <UserProfileTrevelHistory trevelHistory={this.state.trevelHistory} />,
                2: <UserProfileBasicInformation />,
                3: <UserProfileSettings />,
              }[this.props.storeState.pageRender]}
            </div>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const UserProfileRegistration = connect(
  (state) => ({
    storeState: state.UserProfileRegistrationtReduser,
  }),
)(UserProfileRegistrationClass);

export default UserProfileRegistration;