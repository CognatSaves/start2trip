import React from 'react';
import './Places.css';
import Header from '../header/Header';
import PlacesCountryInfo from './PlacesCountryInfo'
import PlacesPanel from './PlacesPanel';
import PopularPlaces from './PopularPlaces';
// import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import PlacesList from './PlacesList';
import PlacesTagList from './PlacesTagList';
import { connect } from 'react-redux';
import Manipulator from '../manipulator/Manipulator';
import { setPage, setMorePagesShow,setSelectedDirection } from '../../redusers/ActionPlaces';

// import Tbilisy from './pictures/tbilisi_desk.jpg'
// import Batumi from './pictures/Batumi.-Podorozh-do-sertsya-Gruziyi-700x420.jpg'
// import kytaisy from './pictures/Kolhidskiy-fontan.-Kutaisi.jpg'
// import Rustavi from './pictures/Rustavi_Museum_(A._Muhranoff,_2011).jpg'
// import samegrello from './pictures/thumb_536_1370_437_0_0_auto.jpg'
// import Andshi from './pictures/Вид_на_деревушку_Адиши,_Грузия.jpg'


import axios from 'axios';
import { setPlacesList } from '../../redusers/ActionPlaces';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class PlacesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      /*
      popularPlaseArrayRender : [
        { title: "Tbilisy", img: Tbilisy },
        { title: "Batumi", img: Batumi },
        { title: "kytaisy", img: kytaisy },
        { title: "Rustavi", img: Rustavi },
        { title: "samegrello", img: samegrello },
        { title: "Tbilisy", img: Tbilisy },
        { title: "Rustavi", img: Rustavi },
        { title: "samegrello", img: samegrello },
        { title: "Tbilisy", img: Tbilisy },
        { title: "Andshi", img: Andshi },
        { title: "Batumi", img: Batumi },
        { title: "kytaisy", img: kytaisy },
        { title: "Rustavi", img: Rustavi },
        { title: "samegrello", img: samegrello },
        { title: "Tbilisy", img: Tbilisy },
        { title: "Rustavi", img: Rustavi },
        { title: "samegrello", img: samegrello },
        { title: "Tbilisy", img: Tbilisy },
        { title: "Andshi", img: Andshi },

      ],
      */
      country: "",
      language: "",
      isRefreshExist: false,
      selectedDirection: '' 
    }
  }
  setPageFunc=(page)=> {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
  }
  showMorePages=()=> {
    this.props.dispatch(setMorePagesShow());
  }
  sendRequestFunc = () => {
    function findSelectedDirectionId(directions, slug){
      for(let i=0; i<directions.length; i++){
        //for(let k=0; k<directions[i].loc.length; k++){
          if(directions[i].loc.slug===slug){
            return directions[i].id
          }
        //}
      }
      return 0;
    }
    let selectedDirection=this.props.match.params.direction;
    if(!selectedDirection){//защита от undefined
      selectedDirection='';
    }
    let country = cookies.get('country', { path: '/' });
    let lang =  cookies.get('userLang', { path: '/' });

    let shouldSendRequest = !this.state.isRefreshExist && 
      (
        this.state.selectedDirection!==(selectedDirection) ||
        this.state.country!==country ||
        (this.state.language !==lang )
      );

    if( shouldSendRequest){
      
      //let selectedDirection = this.props.match.params.direction;

      this.setState({
          country: country,
          language: lang,
          isRefreshExist: true,
          selectedDirection: selectedDirection
      });
      
      //let country = cookies.get('country', { path: '/' });
      let that = this;
      
      axios.get(requests.getPlacesList+"?country="+country+"&lang="+lang+(selectedDirection ? "&slug="+selectedDirection : ''))
      .then(response => {
          console.log(response);              
          return response.data;
      })
      .then(data => {
          
          if (data.error) {
              console.log("bad");
              throw data.error;
          }
          else {
              
            console.log('good');
            console.log(data);
            that.props.dispatch(setPlacesList(data.places, data.tags, data.directions,data.country));
            //следующие строки проверяют, смогли ли мы воспользоваться slug направления, если он, конечно, был
            
            
            if (that.state.selectedDirection && that.state.selectedDirection.length>0){
              let id = findSelectedDirectionId( data.directions, that.state.selectedDirection);
              if(id!==0){
                that.props.dispatch(setSelectedDirection(id));
              }
              else{       
                //если не нашли - пускаем ещё раз крутилку - если не нашли, сервер не нашёл направление-> вернул всё
                that.props.globalReduser.history.push('/places');
              }   
            }
            
            that.setState({
              isRefreshExist: false
            });

          }
      })
      .catch(error => {
          console.log('get wasted answer');
          this.props.globalReduser.history.push('/');
      });
    }
  }
  render() {
    
    
    console.log("Places render",this.props.placesState);   
    
    this.sendRequestFunc();
    /*
    console.log(this.props);
    console.log(this.state);
    console.log(document);
    console.log(window);*/
    return (
      <React.Fragment>
        <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={/*this.state.isRefreshing*/true} isGoodAnswer={/*this.state.isGoodAnswer*/true}/>
            
        <div className="drivers_top_background col-12 p-0">
        <Header history={this.props.history}/>
        <div className="wrapper d-flex flex-column">            
          <PlacesCountryInfo />
        </div>
        </div>
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
            <div className="drivers_body d-flex">
              <div id="placesMainBlock" className="left_body_part col-12 p-0">
                <PopularPlaces/>
                <PlacesTagList/>
                <PlacesPanel />
                
                <PlacesList />
                <Manipulator number={this.props.placesState.placesList.length} page={this.props.placesState.page} setPage={this.setPageFunc}
                  elementsNumber={this.props.placesState.pagesMenuValue} showMorePages={this.showMorePages}
                />
              </div>
              {/* <div className="right_body_part col-3">
                <DriversCommercial />
              </div> */}
            </div>

          </div>
        </div>
      </React.Fragment>
    )
  }
}

const Places = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalReduser: state.GlobalReduser, 
    placesState: state.PlacesReduser
  }),

)(PlacesClass);

export default Places;