import React from 'react';
import MapContainer from '../home/HomeBody/MapContainer';
import LocationSearchInput from '../home/HomeBody/Search';
import DatePicker from 'material-ui/DatePicker';
import requests from '../../config'
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
class RouteTravelBlockClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            date: '',
            isDateHighlighted: false
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        return JSON.stringify(this.props)!==JSON.stringify(nextProps) || JSON.stringify(this.state)!==JSON.stringify(nextState);
    }
    lookAvailable = () =>{
        console.log('look available');
        if(this.state.date!==''){
            let routeDate = this.props.globalhistory.getRoute(this.props.points, this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO);//this.getRoute(this.props.storeState.cities);
            let newStringCities = routeDate.route;
            let country = routeDate.country;
            let langISO = routeDate.langISO;
            let dateString = this.props.globalhistory.createDateTimeString(this.state.date, true);
            this.props.globalhistory.history.push("/"+(this.props.storeState.country.toLowerCase())+`/drivers/${country}-${newStringCities}?date=`+dateString+(langISO!=='ENG' ? `&lang=`+langISO : ``));
        }
        else{
            this.setState({
                isDateHighlighted: true
            })
        }
    }
    render(){
        const mapStyles = {
            map: {
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '5px',
            }
        };
        let points = [...this.props.points];
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeTravelBlock;
       
        return(
            <div className="placeDescription_block d-flex flex-column" id={this.props.id} key={JSON.stringify(points)}>
                <div className="placeDescription_fragmentName">{textInfo.fragmentName}</div>
                <div className="d-flex flex-row">
                    <div className="d-flex col-md-6 col-12 routeTravelBlock_pointPart ">
                        <div className="d-flex flex-wrap routeTravelBlock_pointBlock" >
                        {   
                            points.map((element, index)=>
                                <div className={"routeTravelBlock_element d-flex col-md-6 col-12 "}>
                                    <div className="routeTravelBlock_pointValue d-flex flex-row">
                                        <div style={{paddingRight: '10px',margin: 'auto 0'}}>{this.props.globalhistory.alphabet[index]}</div>
                                        <div className="d-flex routeTravelBlock_height">
                                            <div style={{margin: 'auto 0'}}>{element.point}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                            <div className={"routeTravelBlock_element d-flex col-md-6 col-12 "}>
                                <div className={"routeTravelBlock_pointValue d-flex flex-row "
                                + (this.state.isDateHighlighted ? 'placesDescription_travelBlock_highlighted' : '')}
                                onClick={()=>{if(this.state.isDateHighlighted){this.setState({isDateHighlighted: false})}}}>
                                    <div className="placesDescription_travelBlock_icon placesDescription_calendary" />
                                    <DatePicker hintText={textInfo.startDate} minDate={new Date()} onChange={(e, date) => { this.setState({date: date});  }} className="routeDescrDate" />
                                </div>
                            </div>
                            <div className={"routeTravelBlock_element d-flex "+((points.length+1)%2===0 ? 'col-12': 'col-md-6 col-12') }>
                                <button className="placesDescription_travelBlock_applyButton p-0"
                                 style={{/*marginBottom: '15px',*/ width: '100%', border: 'none', borderRadius: '5px'}}
                                 onClick={()=>this.lookAvailable()}>
                                    <text style={{ margin: "auto", fontSize: '16px' }} >{textInfo.lookAvailable}</text>
                                </button>
                            </div>
                        </div>
                    </div>     
                    {isMobileOnly?
                    <React.Fragment/>:
                    <React.Fragment>           
                        <div className="placeDescription_fragmentName_mapBlock col-6" style={{marginTop: "15px"}}>       
                            <MapContainer newMapStyles={mapStyles} cities={points} setLengthTime={()=>{console.log('setLengthTime at work')}} mapUpdate={true} />
                        </div>
                    </React.Fragment>}
                    
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