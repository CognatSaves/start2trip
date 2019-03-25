import React from 'react';
import ReactDOM from 'react-dom';
import './infowindow.css';

export class CurrentLocation extends React.Component {

  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      time: 0,
      travelMode: this.props.travelMode || this.props.google.maps.DirectionsTravelMode.DRIVING
    };
    console.log("current location constructor");
    console.log(this.props.travelMode);
    console.log(this.state.travelMode);
  }

  componentWillUpdate(prevProps, prevState) {
    function compare(a1, a2) {
      return a1.length === a2.length && a1.every((v, i) => v === a2[i])
    }

    if (prevProps.google !== window.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
    if (!(this.props.cities.some(city => city === "")) && this.props.mapUpdate) {
      /*console.log("mapUpdate standart way");
      console.log(this.props);
      console.log(prevProps.cities);
      console.log(this.props.cities);
      console.log(!(this.props.cities.some(city => city==="")));*/
      this.loadMap();
    }

    /*
    if(!(this.props.cities.some(city => city===""))){
      console.log("BBB")
      this.loadMap();
    }   
    */
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
    //console.log("loadMap");
    function createRequestElement(cities, google, travelMode) {
      let waypoints = [];
      for (let i = 1; i < cities.length - 1; i++) {
        waypoints[i - 1] = {
          location: cities[i],
          stopover: true
        }
      }
      let request =
      {
        origin: cities[0], //точка старта
        destination: cities[cities.length - 1], //точка финиша
        waypoints: waypoints,
        travelMode: "WALKING" //travelMode, //режим прокладки маршрута
      };
      return request;
    }


    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let { zoom } = this.props;
      console.log("Load Map: zoom");
      console.log(zoom);
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
      console.log("Load Map: map");
      console.log(this.map.getZoom());
      let request = createRequestElement(this.props.cities, google, this.state.travelMode);

      let service = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer({
      });

      var theMap = this.map;

      let tempTravelTime = 0;
      let tempTravelLength = 0;
      let obj = this;
      service.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);

          for (var i = 0; i < response.routes[0].legs.length; i++) {
            var STEPS = response.routes[0].legs[i].steps;
            var TempLeg = response.routes[0].legs[i];
            var step = TempLeg.steps.length;
            step = Number.parseInt(step / 2);

            tempTravelTime += TempLeg.duration.value;
            tempTravelLength += TempLeg.distance.value;
            var contentString2 =
              '<div class="infowindowClass">' +
              '<div class="infowindowClass_firstLine">' +
              '<div class="infowindowClass_carEmblem"></div>' +
              '<div class="infowindowClass_duration">' + TempLeg.duration.text + '</div>' +
              '</div>' +
              '<div class="infowindowClass_distance">' + TempLeg.distance.text + '</div>' +
              '</div>';

            var infowindow2 = new google.maps.InfoWindow({
              map: theMap,
              position: STEPS[step].start_location,
              content: contentString2,
            })

            infowindow2.open(theMap);
          }

          obj.props.setLengthTime(tempTravelLength, tempTravelTime);

        }
        else {
          alert("Туда не ведёт ни одна дорога! Будет отображена пустая карта, можете даже не искать)))");
        }
      });

      directionsDisplay.setMap(this.map);
      
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
    const style = Object.assign({}, this.props.mapStyles.map);
    return (
      <React.Fragment>
        <div style={style} ref="map">
          Loading...
        </div>
      </React.Fragment>
    );
  }
}
/*
  Предыдущий вариант render return. Наличие последней ф-ции ничего не давало,
  по крайней мере для используемого на данный момент функционала


  <div style={style} ref="map">
          Loading...
  </div>
  {this.renderChildren()}

 */
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
