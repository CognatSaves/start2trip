import React from 'react';
import { setModalRegister } from '../../redusers/Action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import requests from '../../config';

import { addComment } from '../../redusers/ActionComments';
// import tempPicture from './pictures/drivers_body_photo.png'

import Stars from '../stars/Stars';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class CreateCommentClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNotFilled: false,
            isAllCorrect: false,

        };
    }
    sendComment = (targetId) => {
        function isCorrectComment(comment, commentValue) {
            if (comment.length === 0 || commentValue === 0) {// == -> ===
                //alert('Некорректный комментарий!');
                return false;
            }
            return true;
        }

        console.log('sendComment targetId=', targetId);
        let newComment = document.getElementById("createComment_textareaStyle").value;
        let jwt = this.props.globalReduser.readCookie('jwt');
        let isCorrect = isCorrectComment(newComment, this.props.commentState.commentValue);
        if (isCorrect && ((jwt && jwt !== '-') || this.props.clientId)) {

            this.props.startRolling();
            let body = JSON.stringify({ targetId: this.props.targetId, text: newComment, mark: this.props.commentState.commentValue, clientId: this.props.clientId });
            let that = this;


            //console.log(this.props.commentState);
            let address = requests.createComment + "?target=" + this.props.targetType;
            if (this.props.clientId) {
                fetch(address, {
                    method: 'POST', body: body,
                    headers: { 'content-type': 'application/json' }
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data.error) {
                            console.log("bad");
                            throw data.error;
                        }
                        else {
                            console.log('good');
                            console.log(data);
                            that.props.endRolling(true);
                            //that.getProfileData();
                            that.setState({
                                isAllCorrect: true,
                                isNotFilled: false
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        that.props.endRolling(false);
                        //that.catchFunc();
                    });
            } else {
                fetch(address, {
                    method: 'POST', body: body,
                    headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}` }
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data.error) {
                            console.log("bad");
                            throw data.error;
                        }
                        else {
                            console.log('good');
                            console.log(data);
                            that.props.endRolling(true);
                            //that.getProfileData();
                            that.setState({
                                isAllCorrect: true,
                                isNotFilled: false
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        that.props.endRolling(false);
                        //that.catchFunc();
                    });
            }

        }
        else {
            if (!isCorrect) {
                this.setState({
                    isAllCorrect: false,
                    isNotFilled: true
                });
            }
        }
    }
    render() {
        let jwt = this.props.globalReduser.readCookie('jwt');
        let textInfo = this.props.storeState.languageTextMain.driverProfile.createComment;

        if (jwt || this.props.clientId) {
            return (
                <div className={"commentBlock_createComment d-flex flex-column " + this.props.myclass}>
                    <div className="createComment_element d-flex">
                        <div className="createComment_picture">
                            <img style={{ borderRadius: '50%' }} src={this.props.storeState.avatarUrl ? this.props.storeState.avatarUrl : requests.serverAddressImg + '/uploads/user.svg'} width="100%" height="100%" alt=""></img>
                        </div>
                        <div className="d-flex flex-column pl-2 align-items-start" onClick={() => { if (this.state.isNotFilled || this.state.isAllCorrect) { this.setState({ isNotFilled: false, isAllCorrect: false }) } }}>
                            <span className="pt-2 createComment-text">{this.props.createCommentString}</span>
                            <Stars key="SelectStars" valueDisplay={false} commentNumberDisplay={false} changable={true} changeStarsBlock={'placeCreateCommentStars'} />
                        </div>
                    </div>

                    <textarea id="createComment_textareaStyle" className="createComment_textareaStyle" placeholder={textInfo.yourCommentPlaceholder}
                        onClick={() => { if (this.state.isNotFilled || this.state.isAllCorrect) { this.setState({ isNotFilled: false, isAllCorrect: false }) } }}></textarea>
                    <div className="d-flex flex-row">
                        <text style={{ margin: 'auto auto auto 0', color: 'green', fontSize: '14px', display: this.state.isAllCorrect ? 'flex' : 'none' }}>{textInfo.infoText}</text>
                        <text style={{ margin: 'auto auto auto 0', color: 'red', fontSize: '14px', display: this.state.isNotFilled ? 'flex' : 'none' }}>{textInfo.nonFilledText}</text>
                        {this.props.clientId && this.state.isAllCorrect ?
                            <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/routes/"} className="createComment_Link">{textInfo.createCommentLinkHome}</Link>
                            :
                            <button className="driversAdaptedRoute_sendRequest createComment_sendButton" onClick={() => this.sendComment(this.props.targetId)}>
                                <text>{textInfo.sendText}</text>
                            </button>
                        }
                    </div>


                </div>
            )
        }
        else {
            return (
                <div className={"commentBlock_createComment d-flex flex-column " + this.props.myclass}>
                    <div className="createComment_element d-flex">
                        <div className="createComment_picture">
                            <img src={requests.serverAddressImg + '/uploads/user.svg'} width="100%" height="100%" alt=""></img>
                        </div>
                        <div className="d-flex align-items-center flex-row flex-wrap mx-2">
                            <div className="commentTextStyle" >{textInfo.nonRegisteredElement[0]}</div>
                            <div className="commentLinkStyle" onClick={() => this.props.dispatch(setModalRegister(!this.props.storeState.modalRegistration))}>{textInfo.nonRegisteredElement[1]}</div>
                            <div className="commentTextStyle" >{textInfo.nonRegisteredElement[2]}</div>
                            <div className="commentLinkStyle" onClick={() => this.props.dispatch(setModalRegister(!this.props.storeState.modalRegistration))}>{textInfo.nonRegisteredElement[3]}</div>
                            <div className="commentTextStyle" >.</div>
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