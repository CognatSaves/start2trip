import React from 'react';
import './DriverProfileFeedback.css';
import { connect } from 'react-redux'
import tempPicture from './img/drivers_body_photo.png'
import Stars from '../stars/Stars';

class DriverProfileFeedbackClass extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }

        
    }

    render(){
        let comments = [...this.props.commentState.comments].reverse();
        let selectedComments = comments.slice((1-4) * 5, (1) * 5);
        
        function getMonthName(number){
            let monthArray = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
            return monthArray[number];
            
        }
        return(
            <div className="commentBlock_comments d-flex flex-column">
            {selectedComments.map((element,index)=>                       
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
                            <Stars key={element.rating+"/"+element.index} value={element.rating} valueDisplay="block" commentNumberDisplay="none"/>
                        </div>
                        
                        <input className="put" id={"put"+element+index} type="checkbox"></input>
                        <div class="news">
                            <label htmlFor={"put"+element+index}>{element.value}</label>
                        </div>
                        
                        
                    </div>
                </div> 
            )}
            </div> 
        )
    }
}

const DriverProfileFeedback = connect(
    (state) =>({
      commentState: state.CommentReduser
    }),

  )(DriverProfileFeedbackClass);
  
  export default DriverProfileFeedback;