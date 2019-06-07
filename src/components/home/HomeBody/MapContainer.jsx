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
      cities: this.props.cities.slice(0),
      mapUpdate:true,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cities == this.props.cities) {
      this.setState({mapUpdate:false});
    }else{
      this.setState({mapUpdate:true});
    }
  return true
  }
  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={window.google}
        cities={this.props.cities}
        setLengthTime={this.props.setLengthTime}
        mapUpdate={this.state.mapUpdate}
        mapStyles={mapStyles}
      >                
      </CurrentLocation>
    );
  }
}