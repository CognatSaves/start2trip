import React from 'react';
import './DriverProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import DriverProfileNavigation from './DriverProfileNavigation'
import DriverProfileCar from './DriverProfileCar'
import DriverProfileBasicInformation from './DriverProfileBasicInformation'
import DriverProfileFeedback from './DriverProfileFeedback'
import DriverProfileTripSettingsTrip from './DriverProfileTripSettingsTrip'
import DriverProfileTripSettingsTour from './DriverProfileTripSettingsTour'
import DriverProfileSettings from './DriverProfileSettings'
import DriverProfileTrevelHistory from './DriverProfileTrevelHistory'

import people1 from './img/001372a9a88e12c88b532a.jpg'
import people2 from './img/person.jpg'
import people3 from './img/mina.jpg'
import people4 from './img/gruzinskaja-kuhnja.jpg'
import requests from '../../config';
import axios from 'axios';


class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    function getUserData(){
      function readCookie(name) {
        var name_cook = name+"=";
        var spl = document.cookie.split(";");           
        for(var i=0; i<spl.length; i++) {           
            var c = spl[i];               
            while(c.charAt(0) == " ") {               
                c = c.substring(1, c.length);                   
            }               
            if(c.indexOf(name_cook) == 0) {                   
                return c.substring(name_cook.length, c.length);                    
            }               
        }           
        return null;           
      }
      let jwt = readCookie('jwt');
      console.log('jwt');
      console.log(jwt);
      if(jwt && jwt!=="-"){
        
        axios.get(requests.profileRequest+'?ISO=RUS&countryISO=IRO', {
          headers: {
            //Authorization: `${jwt}`
            Authorization: `Bearer ${jwt}`
          }
        })
        .then(response =>{
          console.log('Data profile: ');
          console.log(response.data);

        })
        .catch(error => {
          console.log('error, here must be return to authorization window! or smth else');
        })
      }
    }
    getUserData();
    this.state = {
      trevelHistory: [
          { name: "Валера",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Чкалова 12",feedback: "Детское кресло.багаж 10кг собака и кошка,может ещё хомяк", img: people1, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"тур", price: "$180" },
          { name: "Анжела",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Красная 52",feedback: "", img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"поездка", price: "$180" },
          { name: "Гоги",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Чкалова 22",feedback: "Дополнительный багажник на крыше", img: people3, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"тур", price: "$180" },
          { name: "Маратик",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Главная 32",feedback: "Два ящика вина и доп.кресло на крыше", img: people4, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"поездка", price: "$180" },
          { name: "Валера",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Чкалова 12",feedback: "", img: people1, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"тур", price: "$180" },
          { name: "Анжела",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Красная 52",feedback: "Много остановок будем делать в пути", img: people2, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"поездка", price: "$180" },
          { name: "Гоги",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Чкалова 22",feedback: "Дополнительный багажник на крыше", img: people3, route: "Тбилиси-Мцхета-Гори-Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"тур", price: "$180" },
          { name: "Маратик",tel: "+375335552211",email: "Valera@gmail.com",place: "Тбилиси. ул.Главная 32",feedback: "Два ящика вина и доп.кресло на крыше", img: people4, route: "Тбилиси-Мцхета-Гори", date: "02.21.2019", time:"12:00", type:"поездка", price: "$180" },
          
      ],
      userData:[]
  }

  }


  render() {

    return (
      <React.Fragment>
        <Header driver={true} />
        <DriverProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="d-flex contentHeight col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12">
              
              {{
                0: <DriverProfileTrevelHistory trevelHistory={this.state.trevelHistory}/>,
                1: <DriverProfileTrevelHistory trevelHistory={this.state.trevelHistory}/>,
                2: <DriverProfileBasicInformation />,
                3: <DriverProfileCar />,
                4: <DriverProfileTripSettingsTrip />,
                5: <DriverProfileTripSettingsTour />,
                6: <DriverProfileFeedback />,
                7: <DriverProfileSettings />,
              }[this.props.storeState.pageRender]}
            </div>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const DriverProfileRegistration = connect(
  (state) => ({
    storeState: state.DriverProfileRegistrationtReduser,
  }),
)(DriverProfileRegistrationClass);

export default DriverProfileRegistration;