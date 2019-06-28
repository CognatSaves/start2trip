import React from 'react';
import Stars from '../stars/Stars';

export default class PlaceProgramm extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        function getMonthName(number){
            let monthArray = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
            return monthArray[number];
        }
        function findTagName(tagId,tagArray){
            
            for(let i=0; i<tagArray.length; i++){
                if(tagId===tagArray[i].id){
                    return tagArray[i].tagLoc.name
                }
            }
        }
        
        let date = new Date(this.props.place.createdAt);
        return (
            <div className="placeDescription_block d-flex flex-column col-12" id="placeDescriptionId1" style={{marginTop: '30px'}}>
                <div className="d-flex">
                    <div className="placeDescription_description_name" >
                        {this.props.place.name}
                    </div>
                    <div className="d-flex" style={{ marginLeft: "auto", height: "34px", marginBottom: "auto" }}>
                        <div className="placeDescription_description_date">
                            {date.getDate()+" "+getMonthName(date.getMonth())+" "+date.getFullYear()}
                        </div>
                        {
                            /*
                                <div className="d-flex placeDescription_description_placeCard" />
                            */
                        }
                        
                    </div>
                </div>
                <div className="d-flex">
                    <Stars value={Math.ceil(this.props.place.rating*10)/10} commentNumber={this.props.place.comments + " отзывов"} valueDisplay={true} commentNumberDisplay={true} />
                </div>
                <div className="d-flex" style={{ margin: "10px 5px 20px 0px" }}>
                    <div className="placeDescription_description_tagCard" />
                    {
                        this.props.place.tags.map((element,index)=>
                            <div className="placeDescription_description_tagElement">{findTagName(element,this.props.tagsArray)+(index+1!==this.props.place.tags.length ? ",":"")}</div>
                        )
                    }
                </div>
                <div className="d-flex placeDescription_description_info">
                    {this.props.place.info}
                </div>
            </div>
        )
    }
}