import React, {Component} from 'react';
import './DriversProfileComments.css';
import tempPicture from './pictures/drivers_body_photo.png'
import emptyStar from './pictures/star.svg';
import { connect } from 'react-redux'
import Stars from '../stars/Stars';

class DriversProfileCommentsClass extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        let selectedComments = this.props.commentState.comments.slice((this.props.page - 1) * 5, (this.props.page) * 5);
        return(
            <React.Fragment>
                <div className="driverProfileComments_panel">
                    <button className="driverProfileComments_panel_element driverProfileComments_panel_selectedElement">Отзывы (очень много)</button>
                    <button className="driverProfileComments_panel_element">Блог</button>
                </div>
                <div className="driverProfileComments_commentBlock">
                    <div className="commentBlock_createComment">
                        <div className="createComment_element">
                            <div className="createComment_picture">
                                <img src={tempPicture} width="auto" height="100%" alt=""></img>
                            </div>
                            <div className="createComment_textBlock">Человек1, как ты оцениваешь Человека2</div>
                            <Stars valueDisplay="none" commentNumberDisplay="none"/>
                        </div>
                        
                        <textarea className="createComment_textareaStyle" placeholder="Ваш отзыв"></textarea>
                                                
                        <button className="createComment_sendButton"><div className="createComment_sendButton_value">Отправить</div></button>
                        
                    </div> 
                    <div className="commentBlock_comments">
                    {selectedComments.map((element,index)=>                       
                        <div className="commentBlock_element" key={element+"/"+index}>
                            <div className="commentBlock_picture">
                                <img src={tempPicture} width="auto" height="100%" alt=""></img>
                            </div>
                            <div className="commentBlock_valueBlock">
                                <div className="valueBlock_firstElement">
                                    <div className="valueBlock_firstElement_name">{element.name}</div>
                                    <div className="valueBlock_firstElement_date">{element.date}</div>
                                </div>
                                <Stars valueDisplay="none" commentNumberDisplay="none"/>
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