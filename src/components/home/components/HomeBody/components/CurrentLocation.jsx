import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '850px',
    height: '640px'
  }
};

export class CurrentLocation extends React.Component {

  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      time:0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
    if(prevProps.cities !== this.props.google){
      this.loadMap();
    }
  }
  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }
  loadMap() {
    function createRequestElement(cities, google){
      let waypoints = [];
      for (let i=1; i<cities.length-1;i++){
        waypoints[i-1]={
          location: cities[i],
          stopover:true
        }
      }
      let request =
        {
          origin: cities[0], //точка старта
          destination: cities[cities.length-1], //точка финиша
          waypoints:waypoints,
          travelMode: google.maps.DirectionsTravelMode.DRIVING //режим прокладки маршрута
        };
      return request;
    }

    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );

      this.map = new maps.Map(node, mapConfig);
      let request = createRequestElement(this.props.cities,google);

      let service = new google.maps.DirectionsService();
      let directionsDisplay=new google.maps.DirectionsRenderer();

      service.route(request, function(response, status) {
        console.log("status");
        console.log(status);
        console.log(response);
        if (status == google.maps.DirectionsStatus.OK) {
          //it must be some markers with distance, but ...
          console.log("Distance");
          for(var i=0;i<response.routes[0].legs.length; i++){
            console.log(response.routes[0].legs[i].distance.text);
          }
          console.log("response");
          console.log(response);
          directionsDisplay.setDirections(response);

        }
      });
      directionsDisplay.setMap(this.map);

      var uluru = {lat: 37, lng: 55};
      var contentString = '<div id="content" style="color: black">Help Me!</div>';;
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
/*
      var marker = new google.maps.Marker({
        position: uluru,
        map: this.map,
        title: 'Uluru (Ayers Rock)'
      });

        infowindow.open(this.map, marker);
*/
      console.log("map");
      console.log(this.map);


      /*
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode( { address: "Москва"}, function(results, status) {
        if (status == 'OK') {
          console.log("geocoder result");
          console.log(results[0].geometry.bounds);
          var temp = results[0].geometry.bounds;
          var posit = {lat:(temp.j.j+temp.j.l)/2, lng:(temp.l.j+temp.l.l)/2};
          console.log(posit);

          var marker = new google.maps.Marker({
            position: uluru,
            map: this.map,
            title: 'Uluru (Ayers Rock)'
          });

          infowindow.open(this.map, marker);
        } else {

          alert('Geocode was not successful for the following reason: ' + status);
        }
      });*/
    }
  }
  renderChildren() {

    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }
  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <React.Fragment>
        <div style={style} ref="map">
          Loading...
        </div>
        {this.renderChildren()}
      </React.Fragment>
    );
  }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 6,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};
