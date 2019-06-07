import React, { Component } from 'react';

import CurrentLocation from './CurrentLocation';
const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '5px',
  }
};
export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      cities: this.props.cities.slice(0)
    }
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
        mapUpdate={this.props.mapUpdate}
        mapStyles={mapStyles}
      >                
      </CurrentLocation>
    );
  }
}