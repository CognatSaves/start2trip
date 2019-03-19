import React from 'react';
import './ToursList.css';
import '../Places/PlacesList.css';
import { connect } from 'react-redux';
import Stars from '../stars/Stars';
import geoIcon from '../home/HomeBody/pictures/geo_icon.svg';
import bookmarkEmpty from '../Places/pictures/bookmark_contour.svg';
import bookmarkFilled from '../Places/pictures/bookmark_blue.svg';
import bookmarkSelected from '../Places/pictures/bookmark_orange.svg';
import { Link } from 'react-router-dom';


import userBlueIcon from '../drivers/DriversBody/DriversBlock/pictures/user_blue.svg';
import dromon from './pictures/dromon.jpg';

class ToursListClass extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        function createNames(tourArray){
            let res=[];
            for(let i=0;i<tourArray.length; i++){
                res[i]=tourArray[i].places[0];
                for(let j=1; j<tourArray[i].places.length; j++){
                    res[i]=res[i]+"-"+tourArray[i].places[j];
                }
            }
            return res;
        }
        let sortedArray = [...this.props.toursState.tours[0].tours];/*this.placesSort([...this.props.placesState.places[0].places], this.props.placesState.sortMenuValue);*/
        let selectedTours= sortedArray.slice(/*(this.props.placesState.page-this.props.placesState.showPages)*this.props.placesState.pagesMenuValue*/0,
        /*this.props.placesState.page*this.props.placesState.pagesMenuValue*/10);

        let srcArray = Array(selectedTours.length).fill(bookmarkEmpty);

        srcArray[0]=bookmarkSelected;
        srcArray[1]=bookmarkFilled;


        let namesArray = createNames(selectedTours);
        console.log('NamesArray');
        console.log(namesArray);
        return(
            <React.Fragment>
            <div className="drivers_block">
                {selectedTours.map((element,index)=>

                <div className={"drivers_block_element d-flex p-0"} id={index}>
                   <div className="placesList_picture">
                        <img src={dromon} width="100%" height="100%" style={{borderRadius: "5px"}} alt=""></img>
                   </div>
                   <div className="placesList_info d-flex flex-row">         
                        <div className="d-flex flex-column toursList_leftBlock">
                            <div className="placesList_info_row">
                                <div className="d-flex flex-column" style={{marginRight: "auto"}}>
                                    <Link to={`/`} className="placesList_placeName">
                                        {namesArray[index]}
                                    </Link>
                                    <div>
                                        <Stars key={index+"/"+element.rating} value={element.rating} commentNumber={element.comments+" отзывов"} valueDisplay="block" commentNumberDisplay="block"/>
                                    </div>
                                    <div className="toursList_leftBlock_startDate">
                                        Дата отправления: <text style={{fontWeight: "600"}}>{element.departureDate.toDateString()}</text>
                                    </div>
                                </div>
                        </div>
                        <div className="placesList_info_row placesList_info_style" style={{margin: "20px 0 auto 0"}}>
                            {element.info}    
                        </div>
                        </div>
                        <div className="d-flex flex-column toursList_rightBlock">
                            <div>
                                <div className="d-flex toursList_rightBlock_firstLine">
                                    <div className="d-flex" style={{margin: "0 auto"}}>
                                        <div className="toursList_rightBlock_userIcon" style={{background: "url("+userBlueIcon+")", backgroundSize: "10px 10px"}}/>
                                        <div className="toursList_rightBlock_available">{"Свободных мест: "+ element.passengersAvailable}</div>
                                    </div>
                                    <div className="toursList_rigntBlock_bookmark" style={{background: "url("+srcArray[index]+")", backgroundSize: "20px 25px"}}/>
                                </div>                              
                            </div>
                            <div className="toursList_rightBlock_price">{"$"+element.price}</div>
                            <button className="toursList_rightBlock_bookTourButton">Заказать тур</button>
                            <div className="toursList_rightBlock_priceInfo">Стоимость на человека</div>
                            <div className="d-flex" style={{marginTop: "auto"}}>
                                <Link to={`/place/${0},${element.id}`} className="placesList_readMoreButton">
                                    Подробнее
                                </Link>
                            </div>
                        </div>
                   </div>
                </div>

                )}
            </div>  
            </React.Fragment>
        ) 
    }

}

const ToursList = connect(
    (state) => ({
        storeState: state.AppReduser, 
        placesState: state.PlacesReduser,
        toursState: state.ToursReduser
    }),
  )(ToursListClass);
  
export default ToursList;
