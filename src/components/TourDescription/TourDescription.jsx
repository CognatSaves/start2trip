import React from 'react';
import Header from '../header/Header';
import TourInfo from './TourInfo.jsx';
import TourPanel from './TourPanel.jsx';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import Stars from '../stars/Stars';

import carthage from '../Tours/pictures/Carthage.webp';
import geoIcon from './pictures/geo_icon.svg';
import { connect } from 'react-redux';

const Description = (props) => {
    let {tour}=props;
    return(
        <div className="placeDescription_block d-flex flex-column">
            <div className="d-flex">
                <div className="placeDescription_description_name" >
                    {"tour.name"}
                </div>
                <div className="d-flex" style={{marginLeft: "auto"}}>
                    <div className="placeDescription_description_date">
                        da best day'n life
                    </div>
                    <div className="d-flex placeDescription_description_placeCard"/>
                </div>
            </div>
            <div className="d-flex">
                <Stars value={tour.rating} commentNumber={tour.comments+" отзывов"} valueDisplay="block" commentNumberDisplay="block"/>         
            </div>
            <div className="d-flex" style={{ margin: "10px 5px 20px 0px"}}>
                <div className="placeDescription_description_tagCard"/>                               
                <div className="placeDescription_description_tagElement">иномирье</div>
                <div className="placeDescription_description_tagElement">история</div>
                <div className="placeDescription_description_tagElement">развлечения</div>
            </div>
            <div className="d-flex flex-column placeDescription_description_info">
                {
                    
                    tour.places.map((element,index)=>
                        <div className="d-flex">
                            <div className="d-flex flex-column" style={{position: "relative", width: "17px", marginRight: "3px"}}>
                                <div style={{position: "absolute", width: "17px", height: "24px", backgroundColor: "#fff"}}>
                                    <div style={{background: "url("+geoIcon+")", backgroundSize: "17px 24px", width: "17px", height: "24px"}}/>
                                </div>
                                <div style={{height: "100%", borderRight: "1px solid #304269", width: "9px"}}></div>
                            </div> 
                            <div style={{width: "820px"}}>{element+"/"}</div>
                        </div>
                        
                    )
                                      
                }
                <div className="d-flex">
                    <div className = "d-flex flex-column">   
                        <div>В стоимость включено</div>             
                        {
                            
                        }
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}


class TourDescriptionClass extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let countryId = this.props.match.params.country;
        let tourId=this.props.match.params.id;
        let tour = this.props.toursState.tours[countryId].tours[tourId];
        return(
            <React.Fragment>
                <div className = "drivers_top_background placeDescription_background col-12">
                    <img src={carthage} width="100%" height="100%" style={{position: "absolute"}} alt="noImage"/>
                    <div style={{position: "absolute", width:"100%", height:"100%", backgroundColor: "rgba(0,0,0,0.5)"}}/>
                    <div className="wrapper d-flex flex-column">
                        <Header colorClass="colorClass" colorClass2="colorClass2" backgroundColorClass="backgroundColorClass"
                        borderColorClass="borderColorClass" labelColorClass="labelColorClass" type={1}/>
                        <TourInfo/>
                    </div>
                </div>
                <div className="wrapper d-flex flex-column">
                    <div className = "drivers_bottom_background d-flex flex-column" >
                    <div className="drivers_body d-flex">
                        <div className="left_body_part col-9">
                            <TourPanel/>
                            <Description tour={tour}/>
                        </div>
                        <div className="right_body_part col-3">
                        <DriversCommercial/>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const TourDescription = connect(
    (state) => ({
        toursState: state.ToursReduser,
        commentState: state.CommentReduser
    }),

    )(TourDescriptionClass);

export default TourDescription;