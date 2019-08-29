import React, { Component } from 'react';

import CurrentLocation from './CurrentLocation';
const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    zoom: 1,
    scaleControl: true,

  }
};
export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.cities.slice(0),
      mapUpdate: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    /*
    if (JSON.stringify(nextProps.cities) === JSON.stringify(this.props.cities)) {
      this.setState({ mapUpdate: false });
    } else {
      this.setState({ mapUpdate: true });
    }*/
    this.setState({ mapUpdate: false });
    return true
  }
  render() {

    console.log('map data');
    console.log(this.props.cities);
    console.log(this.props.setLengthTime);
    console.log(this.props.mapUpdate);
    //console.log(this.state.)
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={window.google}
        cities={this.props.cities}
        setLengthTime={this.props.setLengthTime}
        mapUpdate={this.state.mapUpdate}
        mapStyles={this.props.newMapStyles ? this.props.newMapStyles : mapStyles}
      >
      </CurrentLocation>
    );
  }
}