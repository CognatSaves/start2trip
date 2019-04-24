import React from 'react';
import './DriversProfileComments.css';
import tempPicture from './pictures/drivers_body_photo.png'
import Stars from '../stars/Stars';

export default class ShowComments extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    render(){
        function getMonthName(number){
            let monthArray = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
            return monthArray[number];
        }
        return(
            <div className="commentBlock_comments d-flex flex-column">
            {this.props.selectedComments.map((element,index)=>                       
                <div className="commentBlock_element d-flex" key={element+"/"+index}>
                    <div className="commentBlock_picture">
                        <img src={tempPicture} width="auto" height="100%" alt=""></img>
                    </div>
                    <div className="commentBlock_valueBlock d-flex flex-column">
                        <div className="d-flex">
                            <div className="valueBlock_firstElement_name">{element.name}</div>
                            <div className="valueBlock_firstElement_date">{element.date.getDate()+" "+getMonthName(element.date.getMonth())+" "+element.date.getFullYear()}</div>
                        </div>
                        <div style={{marginBottom: "20px"}}>
                            <Stars key={element.rating+"/"+element.index} value={element.rating} valueDisplay={true} commentNumberDisplay={false}/>
                        </div>
                        
                        <input className="put" id={"put"+element+index} type="checkbox"></input>
                        <div className="news">
                            <label htmlFor={"put"+element+index}>{element.value}</label>
                        </div>
                        
                        
                    </div>
                </div> 
            )}
            </div> 
        )
    }
}