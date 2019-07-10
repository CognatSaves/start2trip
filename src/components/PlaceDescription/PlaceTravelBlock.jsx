import React from 'react';
import CurrentLocation from '../home/HomeBody/CurrentLocation.jsx';
import MapContainer from '../home/HomeBody/MapContainer';
import LocationSearchInput from '../home/HomeBody/Search';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';

class PlaceTravelBlockClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            startPoint:  this.props.place.capital+', '+this.props.place.country,
            endPoint: this.props.place.location,
            date: new Date()
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        return (JSON.stringify(this.props)!==JSON.stringify(nextProps)) || JSON.stringify(nextState)!==JSON.stringify(this.state);
    }
    
    lookAvailable = () => {
        
        console.log('look available');
        let routeDate =this.props.globalhistory.getRoute([{point: this.state.startPoint},{point: this.state.endPoint}]);
        let country =this.props.place.country;
        console.log('routeDate',routeDate);
        console.log('country',country);
        
        
    }
    render(){
        const mapStyles = {
            map: {
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '0 5px 5px 0',
            }
          };
        let  place = this.props.place;
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeTravelBlock;
        
        return (
            <div className="placeDescription_block d-flex flex-column" id={this.props.id} key={JSON.stringify(this.state.endPoint)}>
                <div className="placeDescription_fragmentName">{textInfo.fragmentName}</div>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-6" style={{ marginTop: "15px" }}>
                        
                            <div className="placesDescription_travelBlock_element d-flex" /*style={{ marginRight: "auto" }}*/>
                                <div className="placesDescription_travelBlock_icon placesDescription_position" />
                                <LocationSearchInput /*readOnlyOn={false}*/ address={this.state.startPoint} changeCity={(index, value,extraData)=>this.setState({startPoint: value})}
                                 id="startPointId" classDropdown="searchElement_style" classInput={"travelBlockSearch"} />   
                            </div>
                            <div className="placesDescription_travelBlock_element d-flex" /*style={{ marginLeft: "auto" }}*/>
                                <div className="placesDescription_travelBlock_icon placesDescription_geoIcon" />
                                <LocationSearchInput readOnlyOn={true} address={this.state.endPoint} changeCity={(index, value,extraData)=>{}} classDropdown="searchElement_style" classInput={"travelBlockSearch" } />
                            </div>
                       
                        

                            <div className="placesDescription_travelBlock_element d-flex" /*style={{ marginRight: "auto" }}*/>
                                <div className="placesDescription_travelBlock_icon placesDescription_calendary" />
                                <div className=""/*"col-sm-6 col-12 p-0 pr-1"*/>
                                    <DatePicker defaultDate={this.state.date} hintText="Дата отправления" minDate={new Date()} onChange={(e, date) => { this.setState({date: date}); let datePicker = document.querySelector(".placeDescrDate"); datePicker.classList.remove("placeDescrDate-Check") }} className="placeDescrDate"/*"routemenu_date"*/ />
                                </div>
                            </div>
                            <button className="placesDescription_travelBlock_element placesDescription_travelBlock_applyButton d-flex"
                            /*style={{ marginLeft: "auto" }}*/ onClick={()=>this.lookAvailable()}>
                                <text style={{ margin: "auto", fontSize: '16px' }} >{textInfo.lookAvailable}</text>
                            </button>
                       
                    </div>
                    <div className="placeDescription_fragmentName_mapBlock col-6" style={{marginTop: "15px"}}>       
                        <MapContainer cities={[...[{point: this.state.startPoint},{point:this.state.endPoint}]]} setLengthTime={()=>{console.log('setLengthTime at work')}} mapUpdate={true} />
                    </div>
                </div>
                    
            </div>
        )
    }

}

const PlaceTravelBlock = connect(
    (state) => ({
      storeState: state.AppReduser,
      globalhistory: state.GlobalReduser,
    }),
  )(PlaceTravelBlockClass);
  
  export default PlaceTravelBlock;