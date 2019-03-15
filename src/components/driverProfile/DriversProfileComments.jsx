import React, {Component} from 'react';
import './DriversProfileComments.css';
import tempPicture from './pictures/drivers_body_photo.png'
import emptyStar from './pictures/star.svg';
import { connect } from 'react-redux'
import Stars from '../stars/Stars';
import {addComment} from '../../redusers/ActionComments';
import CreateComment from './CreateComment.jsx';
import ShowComments from './ShowComments.jsx';

class DriversProfileCommentsClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userName: "Заинтересованный посетитель"
        }
    }

    render(){
        
        let comments = [...this.props.commentState.comments].reverse();
        let selectedComments = comments.slice((this.props.page-this.props.showPages) * 5, (this.props.page) * 5);
        console.log("DriversProfileComments");
        console.log(this.props.page);
        console.log(this.props.showPages);
        console.log(selectedComments);
        let createCommentString = this.state.userName+", как ты оцениваешь "+this.props.driver.name;
        return(
            <React.Fragment>
                <div className="driverProfileComments_panel d-flex">
                    <button className="driverProfileComments_panel_element driverProfileComments_panel_selectedElement">{"Отзывы ("+comments.length+")"}</button>
                    <button className="driverProfileComments_panel_element">Блог</button>
                </div>
                <div className="driverProfileComments_commentBlock d-flex flex-column">
                    <CreateComment userName={this.state.userName} createCommentString={createCommentString}/> 
                    <ShowComments selectedComments={selectedComments}/>            
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