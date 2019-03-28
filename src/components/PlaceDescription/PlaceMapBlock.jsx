import React from 'react';
import CurrentLocation from '../home/HomeBody/CurrentLocation.jsx';
export default class TourMapBlock extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
    const mapStyles = {
        map: {
          position: 'absolute',
          width: '870px',
          height: '400px',
          borderRadius: '0 5px 5px 0',
        }
      };
    return (
    <div className="placeDescription_block d-flex flex-column" id="placeDescriptionId4">
        <div className="placeDescription_fragmentName">Карта</div>
        <div className="placeDescription_fragmentName_mapBlock" style={{marginTop: "15px"}}>
            <div className="placeDescription_fragmentName_mapBlock" style={{position: "relative"}}>
                <CurrentLocation
                    centerAroundCurrentLocation
                    google={window.google}
                    cities={["Софийский собор"]}
                    setLengthTime={()=>{}}
                    mapUpdate={true}
                    mapStyles={mapStyles}
                    travelMode={"WALKING"}/*оно меня не воспринимает :*( */
                >                
                </CurrentLocation>               
                <text style={{position: "absolute", color: "red", backgroundColor: "blue"}}>ВНИМАНИЕ! Карта является макетом! Все данные, выводимые на экран, забиты вручную.</text>               
            </div>
        </div>
    </div>
    )
    }
}