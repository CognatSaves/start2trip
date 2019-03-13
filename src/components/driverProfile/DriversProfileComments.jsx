import React, {Component} from 'react';
import './DriversProfileComments.css';
import tempPicture from './pictures/drivers_body_photo.png'
import emptyStar from './pictures/star.svg';
import { connect } from 'react-redux'
import Stars from '../stars/Stars';
import {addComment} from '../../redusers/ActionComments';
import {setCommentValue} from '../../redusers/ActionComments';

class DriversProfileCommentsClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userName: "Человек1",//фиктивная переменная до создания регистрации и прочего с ней связанного
            selectedRate: 2.5//также временная переменная - перенести в редусер
        }
        this.sendComment=this.sendComment.bind(this);
    }
    sendComment(){
        function isCorrectComment(comment){
            if(comment.length==0){
                return false;
            }
            return true;
        }
        let newComment = document.getElementById("createComment_textareaStyle").value;
        let temp = new Date(Date.now);
        if(isCorrectComment){
            console.log("Add comment");
            console.log(this.props.commentState.commentValue);
            this.props.dispatch(addComment({name: this.state.userName, date: new Date(Date.now()), value:newComment, rating: this.props.commentState.commentValue}));
            //this.props.dispatch(setCommentValue(3));
        }
        document.getElementById("createComment_textareaStyle").value="";
    }
    commentSort(array){

    }
    render(){
        function getMonthName(number){
            let monthArray = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
            return monthArray[number];
        }
        let comments = [...this.props.commentState.comments].reverse();
        let selectedComments = comments.slice((this.props.page-this.props.showPages) * 5, (this.props.page) * 5);
        console.log("DriversProfileComments");
        console.log(selectedComments);
        return(
            <React.Fragment>
                <div className="driverProfileComments_panel d-flex">
                    <button className="driverProfileComments_panel_element driverProfileComments_panel_selectedElement">{"Отзывы ("+comments.length+")"}</button>
                    <button className="driverProfileComments_panel_element">Блог</button>
                </div>
                <div className="driverProfileComments_commentBlock d-flex flex-column">
                    <div className="commentBlock_createComment d-flex flex-column">
                        <div className="createComment_element d-flex">
                            <div className="createComment_picture">
                                <img src={tempPicture} width="auto" height="100%" alt=""></img>
                            </div>
                            <div className="createComment_textBlock">{this.state.userName}, как ты оцениваешь {this.props.driver.name}</div>
                            <div style={{margin: "auto 0"}}>
                                <Stars key="SelectStars" valueDisplay="none" commentNumberDisplay="none" changable={true}/>
                            </div>
                            
                        </div>
                        
                        <textarea id="createComment_textareaStyle" className="createComment_textareaStyle" placeholder="Ваш отзыв"></textarea>
                                                
                        <button className="createComment_sendButton" onClick={()=>this.sendComment()}>
                            <text>Отправить</text>
                        </button>
                        
                    </div> 
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
                                <Stars key={element.rating+"/"+element.index} value={element.rating} valueDisplay="block" commentNumberDisplay="none"/>
                                <input className="put" id={"put"+element+index} type="checkbox"></input>
                                <div class="news">
                                    <label for={"put"+element+index}>{element.value}</label>
                                </div>
                                
                                
                            </div>
                        </div> 
                    )}
                    </div>               
                </div>
            </React.Fragment>
        )
    }
}
const DriversProfileComments = connect(
    (state) =>({
      commentState: state.CommentReduser
    }),

  )(DriversProfileCommentsClass);
  
  export default DriversProfileComments;