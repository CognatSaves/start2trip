import React from 'react';
import './Home.css';
import './text.css';
import georgiaImg from './HomeBody/pictures/georgia.png'
import Drivers from '../drivers/Drivers'
import HomeBodyBottom from './HomeBodyBottom'
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';

//import HomeHeader from './HomeHeader/HomeHeader.jsx'
import Header from '../header/Header';
import HomeBody from './HomeBody/HomeBody.jsx'
import { isMobileOnly, isTablet } from 'react-device-detect';
import FirstEnterModal from './FirstEnterModal';

class HomeClass extends React.Component {
  constructor(props) {
    super(props);
    this.redirectFunc = this.redirectFunc.bind(this);
    let firstEnterCookie = this.props.globalReduser.readCookie('firstEnter');
    this.state = {
      popularPlaces: [
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "32 отзыва", prise: "120$" },
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "12 отзывов", prise: "80$" },
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "55 отзыва", prise: "150$" },
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "22 отзыва", prise: "170$" },
      ],
      firstEnter: firstEnterCookie ? false : true
    };
  }
  redirectFunc(where) {
    this.props.history.push(where);

  }
  render() {
    //console.log(isMobileOnly , "isMobileOnly")
    //console.log(isTablet , "isTablet")
    return (
      <React.Fragment>
        <main className="d-flex flex-column container-fluid p-0">
          {
            this.state.firstEnter ?
            <FirstEnterModal/> : <React.Fragment/>
          }
          

          <div className="home_window">
            <Header history={this.props.history} />

            <div className="home_block col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              {!isMobileOnly ?
                <div className="home_text col-xl-10 col-lg-10 col-md-12 col-sm-11 col-11 p-0">
                  <div className="text_firstLine">Cпланируйте свою экскурсию</div>
                  <div className="text_secondLine">Предложения от местных гидов-водителей по вашему индивидуальному маршруту</div>
                  <div className="text_changeBodyBlock">
                    <div className="text_changeBodyBlock_element changeBody_element_select changeBodyBlock_element_left">СПИСОК</div>
                    <div className="text_changeBodyBlock_element changeBodyBlock_element_right">КАРТА</div>
                  </div>
                </div>
                :
                <div />}
              <div className="home_body d-flex justify-content-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                <HomeBody redirectToDrivers={() => this.redirectFunc('/drivers')} />
              </div>
            </div>

          </div>
          <Route path="/home" component={HomeBodyBottom} />
          <Route path="/drivers/:date,:cities" component={Drivers} />

        </main>

      </React.Fragment>
    )
  }
}

const Home = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
    globalReduser: state.GlobalReduser
  }),
)(HomeClass);

export default Home;
