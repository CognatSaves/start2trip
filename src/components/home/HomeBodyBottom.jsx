import React from 'react';
import './Home.css';
import './text.css';
import georgiaImg from '../media/georgia.png'

import { connect } from 'react-redux';

import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import axios from 'axios';
import requests from '../../config';
import { setRoutesList,setSelectedDirection } from '../../redusers/ActionPlaces';
import HomePopularPlaces from './HomeBottom/HomePopularPlaces';
import HomeRoutesList from './HomeBottom/HomeRoutesList';
import HomePlacesPanel from './HomeBottom/HomePlacesPanel';
import Manipulator from '../manipulator/Manipulator';
import { setPage, setMorePagesShow } from '../../redusers/ActionPlaces';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class HomeBodyBottomClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popularPlaces: [
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "32 отзыва", prise: "120$" },
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "12 отзывов", prise: "80$" },
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "55 отзыва", prise: "150$" },
        { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "22 отзыва", prise: "170$" },
      ],
      country: "",
      language: "",
      isRefreshExist: false,
      selectedDirection: ""
    };
    //this.sendRequestFunc();
  }
  redirectFunc=(where)=> {
    this.props.history.push(where);
    
  }
  shouldComponentUpdate(nextProps, nextState){
    
    console.log(this.props);
    console.log(this.state);
    return true;
  }
  setPageFunc = (page) => {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
  }
  showMorePages = () => {
    this.props.dispatch(setMorePagesShow());
  }
  sendRequestFunc = () =>{
    let selectedDirection=this.props.match.params.direction;
    if(!selectedDirection){//защита от undefined
      selectedDirection="";
    }

    let country = cookies.get('country', { path: '/' });
    let lang =  cookies.get('userLang', { path: '/' });

    let shouldSendRequest = !this.state.isRefreshExist && 
      (
        this.state.selectedDirection!==(selectedDirection) ||
        this.state.country!==country ||
        (this.state.language !==lang )
      );
    if( shouldSendRequest)
    {    
      this.setState({
        country: country,
        language: lang,
        isRefreshExist: true,
        selectedDirection: selectedDirection
      });
      let that = this;
      axios.get(requests.getRoutes+"?country="+country+"&lang="+lang+(selectedDirection ? "&slug="+selectedDirection : ''))
      .then(response => {
        console.log(response);              
        return response.data;
      })
      .then(data =>{
              
        if (data.error) {
          console.log("bad");
          throw data.error;
        }
        else{
          function findSelectedDirectionId(directions, slug){
            for(let i=0; i<directions.length; i++){
              for(let k=0; k<directions[i].loc.length; k++){
                if(directions[i].loc[k].slug===slug){
                  return directions[i].id
                }
              }
            }
            return 0;
          }
          console.log('good');
          console.log(data);
          that.props.dispatch(setRoutesList(data.routes, data.directions, data.country));
          if (selectedDirection){
            let id = findSelectedDirectionId( data.directions, selectedDirection);
            if(id!==0){
              that.props.dispatch(setSelectedDirection(id));
            }
            else{
              //если не нашли - пускаем ещё раз крутилку - если не нашли, сервер не нашёл направление-> вернул всё
              that.props.globalReduser.history.push('/home');
            }   
          }
          that.setState({
            isRefreshExist: false
          });
        }
        
      })
      .catch(error => { 
        console.log('get wasted answer');
        //this.props.globalhistory.history.push('/');       
      });
    }
  }
  render() {

    console.log('HomeBodyBottom render state=', this.state, 'props=', this.props);
    
    this.sendRequestFunc();
    return(
      <React.Fragment>
        <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={true} isGoodAnswer={true}/>
        
        <div className="home_block col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
          <HomePopularPlaces/>
          <HomePlacesPanel/>
          <HomeRoutesList/>
          <Manipulator number={this.props.placesState.routesList.length} page={this.props.placesState.page} setPage={this.setPageFunc}
            elementsNumber={this.props.placesState.pagesMenuValue} showMorePages={this.showMorePages}
          />
        </div>
        
      </React.Fragment>
    )
  }
}

const HomeBodyBottom = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
    placesState:state.PlacesReduser
  }),
)(HomeBodyBottomClass);

export default HomeBodyBottom;


/*
let textInfo = this.props.storeState.languageTextMain.home.homeBodyBottom;
   
return (
      <React.Fragment>
      
        <div className="homeBottom container-fluid p-0">
        <div className="d-flex  align-items-center justify-content-md-start justify-content-center pl-xl-0  pl-lg-0 pl-md-4 col-12"><h2 className="homeBottomTitle">{textInfo.homeBottomHeader}</h2></div>
        <div className="d-flex flex-wrap align-items-start justify-content-center justify-content-md-start pl-xl-0  pl-lg-0 pl-md-4 pl-sm-4 col-12 p-0">
          <div className="homeBottomIcomRout d-flex flex-column align-items-sm-start align-items-center col-xl-3 col-lg-3 col-md-6 col-sm-6 col-9 p-0">
            <img className="mb-3" src={routeIcon} alt="routeIcon" width="60px" height="60px" />
            <p className="mb-2 homeBottomTitle"><span>01</span>{' '+textInfo.homeBottomTitle[0]}</p>
            <p className="homeBottomText">{textInfo.homeBodyText[0]}</p>
          </div>
          <div className="homeBottomIcomRout d-flex flex-column align-items-sm-start align-items-center col-xl-3 col-lg-3 col-md-6 col-sm-6 col-9 p-0">
            <img className="mb-3" src={calendarHomeIcon} alt="calendarHomeIcon" width="70px" height="60px" />
            <p className="mb-2 homeBottomTitle"><span>02</span>{' '+textInfo.homeBottomTitle[1]}</p>
            <p className="homeBottomText">{textInfo.homeBodyText[1]}</p>
          </div>
          <div className="homeBottomIcomRout d-flex flex-column align-items-sm-start align-items-center col-xl-3 col-lg-3 col-md-6 col-sm-6 col-9 p-0">
            <img className="mb-3" src={offerIcon} alt="offerIcon" width="60px" height="60px" />
            <p className="mb-2 homeBottomTitle"><span>03</span>{' '+textInfo.homeBottomTitle[2]}</p>
            <p className="homeBottomText">{textInfo.homeBodyText[2]}</p>
          </div>
          <div className="homeBottomIcomRout d-flex flex-column align-items-sm-start align-items-center col-xl-3 col-lg-3 col-md-6 col-sm-6 col-11 p-0">
            <img className="mb-3" src={enjoy_tripIcon} alt="enjoy_tripIcon" width="70px" height="60px" />
            <p className="mb-2 homeBottomTitle"><span>04</span>{' '+textInfo.homeBottomTitle[3]}</p>
            <p className="homeBottomText">{textInfo.homeBodyText[3]}</p>
          </div>
        </div>
        {
        /*

          В случае открытия -> подключить переводы из textInfo


        <div className="d-flex  align-items-center justify-content-md-start justify-content-center pl-xl-0  pl-lg-0 pl-md-4 col-12"><h2 className="homeBottomTitle">ПОПУЛЯРНЫЕ МЕСТА</h2></div>
        <RenderFourEl tours={this.state.popularPlaces} priseDisplay={"none"} />
        <div className="d-flex  align-items-center justify-content-center col-12"><Link to="/places" className="homeBottomLink">ПЕРЕЙТИ К МЕСТАМ</Link></div>
        <div className="d-flex  align-items-center justify-content-md-start justify-content-center pl-xl-0  pl-lg-0 pl-md-4 col-12"><h2 className="homeBottomTitle">ОРГАНИЗОВАННЫЕ ТУРЫ</h2></div>
        <RenderFourEl tours={this.state.popularPlaces} priseDisplay={"block"} />
        <div className="d-flex  align-items-center justify-content-center col-12"><Link to="/tours" className="homeBottomLink">ПЕРЕЙТИ К ТУРАМ</Link></div>

        <div className="homeSubscribe d-flex flex-column align-items-center justify-content-center col-12">
          <h2 className="mb-3">Новостная рассылка</h2>
          <span className="mb-4">Новости, скидки, распродажи, конкурсы и немного искусства:</span>
          <div className="d-flex flex-md-row flex-sm-row flex-column align-content-center col-xl-6 col-lg-6 col-md-7 col-sm-10 col-11 p-0 mb-4">
          <input className="homeSubscribeInput" placeholder="Aдрес электронной почты" type="text" name="" id=""/>
          <button className="homeSubscribeButton">ПОДПИСАТЬСЯ</button>
            {
            //<InputGroup>
              //<Input className="homeSubscribeInput col-10" placeholder="Aдрес электронной почты" />
              //<InputGroupAddon addonType="append"><Button className="homeSubscribeButton">ПОДПИСАТЬСЯ</Button></InputGroupAddon>
            //</InputGroup> 
            }
          </div>
          <p>Нажимая "Подписаться", Вы соглашаетесь с правилами<Link to=""> использования сервиса </Link> и <Link to=""> обработки персональных данных.</Link></p>
        </div>
        */

        /*
      }
      </div>
      
      </React.Fragment>
    )
  */