import React from 'react';
import Stars from '../stars/Stars';
import geoIcon from '../media/geo_icon.svg';
export default class TourProgram extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        function createLocationString(places){
            let res = places[0];
            for(let i=1;i<places.length; i++){
                res = res + " - "+places[i];
            }
            return res;
        }
        let tour = this.props.tour;
        let lineDisplayArray = Array(tour.places.length).fill("block");
        lineDisplayArray[lineDisplayArray.length-1]="none";
        return(
        <div className="placeDescription_block d-flex flex-column" id="tourDescriptionId1">
            <div className="d-flex">
                <div className="placeDescription_description_name" >
                    {createLocationString(tour.places)}
                </div>
                <div className="d-flex" style={{marginLeft: "auto", height: "34px", marginBottom: "auto"}}>
                    <div className="d-flex placeDescription_description_placeCard"/>
                </div>
            </div>
            <div className="d-flex">
                <Stars value={tour.rating} commentNumber={tour.comments + " отзывов"} valueDisplay={true} commentNumberDisplay={true} />
            </div>
            <div className="d-flex" style={{ margin: "10px 5px 20px 0px" }}>
                <div className="placeDescription_description_tagCard" />
                <div className="placeDescription_description_tagElement">иномирье</div>
                <div className="placeDescription_description_tagElement">история</div>
                <div className="placeDescription_description_tagElement">развлечения</div>
            </div>
            <div className="d-flex flex-column placeDescription_description_info">
                {  
                    tour.places.map((element,index)=>
                        <div className="d-flex">
                            <div className="d-flex flex-column tourDescription_markerLine">
                                <div className="tourDescription_markerLine_markerBlock">
                                    <div style={{background: "url("+geoIcon+")", backgroundSize: "17px 24px", width: "17px", height: "24px"}}/>
                                </div>
                                <div className="tourDescription_markerLine_line" style={{ display: lineDisplayArray[index]}}></div>
                            </div> 
                            <div className="tourDescription_placeDescription">
                                <text style={{fontWeight: "600"}}>{element}</text>
                                <text>{" - " +tour.placesInfo[index]}</text>
                            </div>
                        </div>

                    )
                }
                <div className="d-flex" style={{paddingTop: "10px"}}>
                    <div className = "d-flex flex-column tourDescription_additionalInfoBlock">   
                        <div>В стоимость включено:</div>             
                        {
                            tour.placesInfo[tour.placesInfo.length-2].map((element,index)=>
                                <div className="d-flex tourDescription_additionalInfoBlock_element">
                                    <div className="tourDescription_pointStyle">.</div>
                                    <div>{element}</div>
                                </div>
                            )
                        }
                    </div>
                    <div className = "d-flex flex-column tourDescription_additionalInfoBlock">
                        <div>Дополнительные услуги:</div>             
                            {
                                tour.placesInfo[tour.placesInfo.length-1].map((element,index)=>
                                    <div className="d-flex tourDescription_additionalInfoBlock_element">
                                        <div className="tourDescription_pointStyle">.</div>
                                        <div>{element}</div>
                                    </div>
                                )
                            }

                    </div>
                </div>
            </div>
        </div>
        )
    }

}