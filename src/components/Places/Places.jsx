import React from 'react';
import './Places.css';
import Header from '../header/Header';
import PlacesCountryInfo from './PlacesCountryInfo'
import PlacesPanel from './PlacesPanel';
import PopularPlaces from './PopularPlaces';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import PlacesList from './PlacesList';
import { connect } from 'react-redux';
import Manipulator from '../manipulator/Manipulator';
import { setPage, setMorePagesShow } from '../../redusers/ActionPlaces';

import Tbilisy from './pictures/tbilisi_desk.jpg'
import Batumi from './pictures/Batumi.-Podorozh-do-sertsya-Gruziyi-700x420.jpg'
import kytaisy from './pictures/Kolhidskiy-fontan.-Kutaisi.jpg'
import Rustavi from './pictures/Rustavi_Museum_(A._Muhranoff,_2011).jpg'
import samegrello from './pictures/thumb_536_1370_437_0_0_auto.jpg'
import Andshi from './pictures/Вид_на_деревушку_Адиши,_Грузия.jpg'

class PlacesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={
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
    }
    this.setPageFunc = this.setPageFunc.bind(this);
    this.showMorePages = this.showMorePages.bind(this);
  }
  setPageFunc(page) {
    if (page !== "...") {
      this.props.dispatch(setPage(page));
    }
  }
  showMorePages() {
    this.props.dispatch(setMorePagesShow());
  }
  render() {
    console.log("Places render");
    console.log(this.props.placesState);
    return (
      <React.Fragment>
        <div className="drivers_top_background col-12 p-0">
        <Header history={this.props.history}/>
          <div className="wrapper d-flex flex-column">
            
            <PlacesCountryInfo />
          </div>
        </div>
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
            <div className="drivers_body d-flex">
              <div className="left_body_part col-12">
                <PopularPlaces arrayRender={this.state.popularPlaseArrayRender}/>
                <PlacesPanel />
                <PlacesList />
                <Manipulator number={this.props.placesState.places[0].places.length} page={this.props.placesState.page} setPage={this.setPageFunc}
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
    placesState: state.PlacesReduser
  }),

)(PlacesClass);

export default Places;