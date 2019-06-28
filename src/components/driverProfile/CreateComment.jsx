import React from 'react';
import './DriversProfileComments.css';
import tempPicture from './pictures/drivers_body_photo.png'
import Stars from '../stars/Stars';
import { addComment } from '../../redusers/ActionComments';
import { connect } from 'react-redux'
import requests from '../../config';
import { setModalRegister } from '../../redusers/Action';
class CreateCommentClass extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    sendComment = (targetId) => {
        function isCorrectComment(comment) {
            if (comment.length === 0) {// == -> ===
                return false;
            }
            return true;
        }
        
        console.log('sendComment targetId=',targetId);
        let newComment = document.getElementById("createComment_textareaStyle").value;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(this.props.commentState.commentValue!==0 && isCorrectComment(newComment) && jwt && jwt !== '-'){
            
            this.props.startRolling();
            let body = JSON.stringify({targetId:this.props.targetId, text: newComment, mark: this.props.commentState.commentValue });
            let that = this;
            
            
            //console.log(this.props.commentState);
            let address = requests.createComment+"?target="+this.props.targetType;       
            fetch(address,{
                method: 'POST', body: body,
                headers: {'content-type': 'application/json', Authorization: `Bearer ${jwt}`}
            })
            .then(response => {
                return response.json();
            })
            .then(function (data){
                if (data.error) {
                    console.log("bad");
                    throw data.error;
                }
                else{
                    console.log('good');
                    console.log(data);
                    that.props.endRolling(true);
                    //that.getProfileData();
                }
            })
            .catch(function (error) {
                console.log("bad");
                console.log('An error occurred:', error);
                that.props.endRolling(false);
                //that.catchFunc();
            });
        }
        /*let newComment = document.getElementById("createComment_textareaStyle").value;
        if (isCorrectComment) {
            console.log("Add comment");
            this.props.dispatch(addComment({ name: this.props.userName, date: new Date(Date.now()), value: newComment, rating: this.props.commentState.commentValue }));
        }
        document.getElementById("createComment_textareaStyle").value = "";*/
    }
    render() {
        let jwt = this.props.globalReduser.readCookie('jwt');
        if(jwt){
            return (
                <div className="commentBlock_createComment d-flex flex-column">
                    <div className="createComment_element d-flex">
                        <div className="createComment_picture">
                            <img  style={{borderRadius: '30px'}} src={this.props.storeState.avatarUrl} width="100%" height="100%" alt=""></img>
                        </div>
                        <div className="d-flex flex-column pl-2 align-items-start">
                            <span className="pt-2 createComment-text">{this.props.createCommentString}</span>
                            <Stars key="SelectStars" valueDisplay={false} commentNumberDisplay={false} changable={true} changeStarsBlock={'placeCreateCommentStars'}/>
                        </div>
                    </div>

                    <textarea id="createComment_textareaStyle" className="createComment_textareaStyle" placeholder="Ваш отзыв"></textarea>
                    <div className="d-flex flex-row">
                        <text style={{margin: 'auto 0', color: 'green', fontSize: '14px'}}>Ваш комментарий станет видимым после проверки администратором.</text>
                        <button className="driversAdaptedRoute_sendRequest createComment_sendButton" onClick={() => this.sendComment(this.props.targetId)}>
                            <text>ОТПРАВИТЬ</text>
                        </button>
                    </div>
                    

                </div>
            )
        }
        else{
            return(
                <div className="commentBlock_createComment d-flex flex-column">
                    <div className="createComment_element d-flex">
                        <div className="createComment_picture">
                            <img  style={{borderRadius: '30px'}} src={requests.serverAddress+'/uploads/user.svg'} width="100%" height="100%" alt=""></img>
                        </div>
                        <div className="d-flex flex-column pl-2 align-items-start justify-content-center">
                            <div className="d-flex flex-row"/*style={{margin: 'auto 0'}}*/>
                                <div className="commentTextStyle" >{'Чтобы оставить отзыв, '}</div>
                                <div className="commentLinkStyle" onClick={()=>this.props.dispatch(setModalRegister(!this.props.storeState.modalRegistration))}>войдите</div>
                                <div className="commentTextStyle" >{' или '}</div>
                                <div className="commentLinkStyle" onClick={()=>this.props.dispatch(setModalRegister(!this.props.storeState.modalRegistration))}>зарегистрируйтесь</div>
                                <div className="commentTextStyle" >{'.'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
const CreateComment = connect(
    (state) => ({
        commentState: state.CommentReduser,
        globalReduser: state.GlobalReduser,
        storeState: state.AppReduser
    }),

)(CreateCommentClass);

export default CreateComment;