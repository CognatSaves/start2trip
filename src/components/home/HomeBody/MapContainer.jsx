import React, { Component } from 'react';
import {InfoWindow } from 'google-maps-react';

import CurrentLocation from './CurrentLocation';

export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      cities: this.props.cities.slice(0)
    }
  }
  render() {
    console.log("MapContainer render");
    console.log(this.props.mapUpdate);
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={window.google}
        cities={this.props.cities}
        setLengthTime={this.props.setLengthTime}
        mapUpdate={this.props.mapUpdate}
      >                
      </CurrentLocation>
    );
  }
}