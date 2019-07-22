import React from 'react';

import { connect } from 'react-redux'
// import tempPicture from './img/drivers_body_photo.png'
import Stars from '../stars/Stars';
import requests from '../../config';

class DriverProfileFeedbackClass extends React.Component{
    constructor(props){
        super(props);
        let profile = this.props.globalReduser.profile;
        this.state={
            comments: profile.comments
        }

        
    }

    render(){
        /*let comments = [...this.props.commentState.comments].reverse();
        let selectedComments = comments.slice((1-4) * 5, (1) * 5);
        */
        function getMonthName(number){
            let monthArray = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
            return monthArray[number];
            
        }

        // TODO добавить кнопку показать еще и пагинацию
        return(
            <div className="profileFeedbackBlock_comments d-flex flex-column">
            {this.state.comments.map((element,index)=>                       
                <div className="commentBlock_element d-flex" key={element+"/"+index}>
                    <div className="commentBlock_picture">
                        <img src={requests.serverAddress+element.clearedAuthor.url} width="auto" height="100%" alt=""></img>
                    </div>
                    <div className="commentBlock_valueBlock d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <div className="valueBlock_firstElement_name">{element.clearedAuthor.firstName}</div>
                            <div className="valueBlock_firstElement_date">{element.updatedAt/*element.date.getDate()+" "+getMonthName(element.date.getMonth())+" "+element.date.getFullYear()*/}</div>
                        </div>
                        <div style={{marginBottom: "20px"}}>
                            <Stars key={element.mark+"/"+element.index} value={element.mark} valueDisplay={true} commentNumberDisplay={false}/>
                        </div>
                        <input className="put" id={"put"+element+index} type="checkbox"></input>
                        <div className="news">
                            <label htmlFor={"put"+element+index}>{element.text}</label>
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
      commentState: state.CommentReduser,
      profileReduser: state.DriverProfileRegistrationReduser,
      globalReduser: state.GlobalReduser
    }),

  )(DriverProfileFeedbackClass);
  
  export default DriverProfileFeedback;