import React from 'react';
import './DriversProfileComments.css';
import tempPicture from './pictures/drivers_body_photo.png'
import Stars from '../stars/Stars';
import { addComment } from '../../redusers/ActionComments';
import { connect } from 'react-redux'

class CreateCommentClass extends React.Component {
    constructor(props) {
        super(props);

        this.sendComment = this.sendComment.bind(this);
    }
    sendComment() {
        function isCorrectComment(comment) {
            if (comment.length === 0) {// == -> ===
                return false;
            }
            return true;
        }
        let newComment = document.getElementById("createComment_textareaStyle").value;
        if (isCorrectComment) {
            console.log("Add comment");
            this.props.dispatch(addComment({ name: this.props.userName, date: new Date(Date.now()), value: newComment, rating: this.props.commentState.commentValue }));
        }
        document.getElementById("createComment_textareaStyle").value = "";
    }
    render() {

        return (
            <div className="commentBlock_createComment d-flex flex-column">
                <div className="createComment_element d-flex">
                    <div className="createComment_picture">
                        <img src={tempPicture} width="auto" height="100%" alt=""></img>
                    </div>
                    <div className="d-flex flex-md-row flex-column pl-2 align-items-md-center align-items-start">
                        <span className="pt-2 createComment-text">{this.props.createCommentString}</span>
                        <Stars key="SelectStars" valueDisplay={false} commentNumberDisplay={false} changable={true} />
                    </div>
                </div>

                <textarea id="createComment_textareaStyle" className="createComment_textareaStyle" placeholder="Ваш отзыв"></textarea>

                <button className="driversAdaptedRoute_sendRequest createComment_sendButton" onClick={() => this.sendComment()}>
                    <text>ОТПРАВИТЬ</text>
                </button>

            </div>
        )
    }
}
const CreateComment = connect(
    (state) => ({
        commentState: state.CommentReduser
    }),

)(CreateCommentClass);

export default CreateComment;