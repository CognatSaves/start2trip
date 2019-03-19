import React from 'react';
import './Places.css';
import Header from '../header/Header';
import PlacesCountryInfo from './PlacesCountryInfo'
import PlacesPanel from './PlacesPanel';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import PlacesList from './PlacesList';
import { connect } from 'react-redux';
import Manipulator from '../manipulator/Manipulator';
import { setPage, setMorePagesShow } from '../../redusers/ActionPlaces';

class PlacesClass extends React.Component {
  constructor(props) {
    super(props);
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
        <div className="drivers_top_background col-12">
          <div className="wrapper d-flex flex-column">
            <Header colorWhite={true} />
            <PlacesCountryInfo />
          </div>
        </div>
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
            <div className="drivers_body d-flex">
              <div className="left_body_part col-9">
                <PlacesPanel />
                <PlacesList />
                <Manipulator number={this.props.placesState.places[0].places.length} page={this.props.placesState.page} setPage={this.setPageFunc}
                  elementsNumber={this.props.placesState.pagesMenuValue} showMorePages={this.showMorePages}
                />
              </div>
              <div className="right_body_part col-3">
                <DriversCommercial />
              </div>
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