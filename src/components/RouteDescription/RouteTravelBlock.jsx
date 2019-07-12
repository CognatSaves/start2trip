import React from 'react';
import MapContainer from '../home/HomeBody/MapContainer';
import LocationSearchInput from '../home/HomeBody/Search';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  
class RouteTravelBlockClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            date: new Date()
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        return JSON.stringify(this.props)!==JSON.stringify(nextProps);
    }
    lookAvailable = () =>{
        console.log('look available');
        let routeDate = this.props.globalhistory.getRoute(this.props.points, this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO);//this.getRoute(this.props.storeState.cities);
        let newStringCities = routeDate.route;
        let country = routeDate.country;
        let langISO = routeDate.langISO;
        let dateString = this.props.globalhistory.createDateTimeString(this.state.date, true);
        this.props.globalhistory.history.push(`/drivers/${country}-${newStringCities}?date=`+dateString+(langISO!=='ENG' ? `&lang=`+langISO : ``));
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
        let points = this.props.points;
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeTravelBlock;
        
        return(
            <div className="placeDescription_block d-flex flex-column" id={this.props.id} key={JSON.stringify(points)}>
                <div className="placeDescription_fragmentName">{textInfo.fragmentName}</div>
                <div className="d-flex flex-row">
                    <div className="d-flex col-6 p-0 routeTravelBlock_pointPart" >
                        <div className="d-flex flex-wrap routeTravelBlock_pointBlock" >
                        {   
                            points.map((element, index)=>
                                <div className={"d-flex col-6 " + (index%2===0 ? 'routeTravelBlock_pointElement_left' : 'routeTravelBlock_pointElement_right')}>
                                    <div className="routeTravelBlock_pointValue d-flex flex-row">
                                        <div style={{paddingRight: '10px',margin: 'auto 0'}}>{alphabet[index]}</div>
                                        <div className="d-flex routeTravelBlock_height">
                                            <div style={{margin: 'auto 0'}}>{element.point}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                            <div className={"d-flex col-6 " + (points.length%2===0 ? 'routeTravelBlock_pointElement_left' : 'routeTravelBlock_pointElement_right')} >
                                <div className="routeTravelBlock_pointValue d-flex flex-row">
                                    <div className="placesDescription_travelBlock_icon placesDescription_calendary" />
                                    <DatePicker placeholderText="placeholder" hintText="Дата отправления" minDate={new Date()} onChange={(e, date) => { this.setState({date: date}); let datePicker = document.querySelector(".placeDescrDate"); datePicker.classList.remove("placeDescrDate-Check") }} className="placeDescrDate calendarModal" />
                                </div>
                            </div>
                            <div className={"d-flex "+((points.length+1)%2===0 ? 'col-12': 'col-6 routeTravelBlock_pointElement_right')}>
                                <button className="placesDescription_travelBlock_applyButton p-0" style={{marginBottom: '15px', width: '100%', border: 'none', borderRadius: '5px'}} onClick={()=>this.lookAvailable()}>
                                    <text style={{ margin: "auto", fontSize: '16px' }} >{textInfo.lookAvailable}</text>
                                </button>
                            </div>
                        </div>
                    </div>                
                    <div className="placeDescription_fragmentName_mapBlock col-6" style={{marginTop: "15px"}}>       
                        <MapContainer cities={points} setLengthTime={()=>{console.log('setLengthTime at work')}} mapUpdate={true} />
                    </div>
                    
                    
                </div>
                    
            </div>
        )
    }
}

const RouteTravelBlock = connect(
    (state) => ({
      storeState: state.AppReduser,
      globalhistory: state.GlobalReduser,
    }),
  )(RouteTravelBlockClass);
  
  export default RouteTravelBlock;