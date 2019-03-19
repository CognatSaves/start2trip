import React from 'react';
import './Home.css';
import './text.css';
import { Link } from 'react-router-dom';
import routeIcon from './HomeBody/pictures/route.svg'
import calendarHomeIcon from './HomeBody/pictures/calendarHome.svg'
import offerIcon from './HomeBody/pictures/offer.svg'
import enjoy_tripIcon from './HomeBody/pictures/enjoy_trip.svg'
import RenderFourEl from './HomeBody/RenderFourEl.jsx'
import georgiaImg from './HomeBody/pictures/georgia.png'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

//import HomeHeader from './HomeHeader/HomeHeader.jsx'
import Header from '../header/Header';
import HomeBody from './HomeBody/HomeBody.jsx'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.redirectFunc = this.redirectFunc.bind(this);
    this.state = {
      popularPlaces: [
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "32 отзыва", prise: "120$" },
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "12 отзывов", prise: "80$" },
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "55 отзыва", prise: "150$" },
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "22 отзыва", prise: "170$" },
      ]
    };
  }
  redirectFunc(where) {
    this.props.history.push(where);
  }
  render() {
    return (
      <React.Fragment>
        <div className="d-flex flex-column">
          <div className="home_window">
            <div className="home_block">
              <Header/>
              <div className="home_text col-12">
                <div className="text_firstLine">Cпланируйте свою экскурсию</div>
                <div className="text_secondLine">Предложения от местных гидов-водителей по вашему индивидуальному маршруту</div>
                <div className="text_changeBodyBlock">
                  <div className="text_changeBodyBlock_element changeBody_element_select changeBodyBlock_element_left">СПИСОК</div>
                  <div className="text_changeBodyBlock_element changeBodyBlock_element_right">КАРТА</div>
                </div>
              </div>
              <div className="home_body d-flex flex-row col-12">
                <HomeBody redirectToDrivers={() => this.redirectFunc('/drivers')} />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column homeBottom">
            <div className="d-flex flex-row align-items-center justify-content-start col-12"><h2 className="homeBottomTitle">ПУТЕШЕСТВИЯ СО START2TRIP</h2></div>
            <div className="d-flex flex-row align-items-start col-12 p-0">
              <div className="homeBottomIcomRout d-flex flex-column align-items-start col-3 p-0">
                <img className="mb-4" src={routeIcon} alt="routeIcon" width="60px" height="60px" />
                <p className="mb-2 homeBottomTitle"><span>01</span> Маршрут</p>
                <p className="homeBottomText">Стройте свой собственный маршрут путешествия, с возможностью включить в него известные достопримечательности.</p>
              </div>
              <div className="homeBottomIcomRout d-flex flex-column align-items-start col-3 p-0">
                <img className="mb-4" src={calendarHomeIcon} alt="calendarHomeIcon" width="70px" height="60px" />
                <p className="mb-2 homeBottomTitle"><span>02</span> Дата отправления</p>
                <p className="homeBottomText">Подбирайте удобную для Вас дату поездки.</p>
              </div>
              <div className="homeBottomIcomRout d-flex flex-column align-items-start col-3 p-0">
                <img className="mb-4" src={offerIcon} alt="offerIcon" width="60px" height="60px" />
                <p className="mb-2 homeBottomTitle"><span>03</span> Предложения</p>
                <p className="homeBottomText">Выбирайте из предложенного списка местного водителя-гида, который охотно познакомит Вас со страной изнутри.</p>
              </div>
              <div className="homeBottomIcomRout d-flex flex-column align-items-start col-3 p-0">
                <img className="mb-4" src={enjoy_tripIcon} alt="enjoy_tripIcon" width="70px" height="60px" />
                <p className="mb-2 homeBottomTitle"><span>04</span> Наслаждайтесь поездкой</p>
                <p className="homeBottomText">По Вашему запросу водитель сделает остановку в любом месте для фото или видео съемки, посещения достопримечательности.</p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-start col-12"><h2 className="homeBottomTitle">ПОПУЛЯРНЫЕ МЕСТА</h2></div>
            <RenderFourEl tours={this.state.popularPlaces} priseDisplay={"none"} />
            <div className="d-flex flex-row align-items-center justify-content-center col-12"><Link to="" className="homeBottomLink">ПЕРЕЙТИ К МЕСТАМ</Link></div>
            <div className="d-flex flex-row align-items-center justify-content-start col-12"><h2 className="homeBottomTitle">ОРГАНИЗОВАННЫЕ ТУРЫ</h2></div>
            <RenderFourEl tours={this.state.popularPlaces} priseDisplay={"block"} />
            <div className="d-flex flex-row align-items-center justify-content-center col-12"><Link to="" className="homeBottomLink">ПЕРЕЙТИ К ТУРАМ</Link></div>

            <div className="homeSubscribe d-flex flex-column align-items-center justify-content-center col-12">
              <h2 className="mb-3">Новостная рассылка</h2>
              <span className="mb-4">Новости, скидки, распродажи, конкурсы и немного искусства:</span>
              <div className="d-flex flex-row align-content-center col-6 mb-4">
                <InputGroup>
                  <Input className="homeSubscribeInput" placeholder="Aдрес электронной почты" />
                  <InputGroupAddon addonType="append"><Button className="homeSubscribeButton">ПОДПИСАТЬСЯ</Button></InputGroupAddon>
                </InputGroup>
              </div>
              <p>Нажимая "Подписаться", Вы соглашаетесь с правилами<Link to=""> использования сервиса </Link> и <Link to=""> обработки персональных данных.</Link></p>
            </div>
          </div>

          
        </div>

      </React.Fragment>
    )
  }
}


export default Home;
