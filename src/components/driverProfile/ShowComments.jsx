import React from 'react';
import './DriversProfileComments.css';
import { isMobileOnly } from 'react-device-detect';
import { connect } from 'react-redux';
import requests from '../../config';

import Stars from '../stars/Stars';
import Dialog from '@material-ui/core/Dialog';
import AvatarEditorCustom from '../usefulСomponents/AvatarEditorCustom'
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, getCurrencies } from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class ShowCommentsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            element: null,
            date: null,
            imgModal: false,
            img: "",
            blob: "",
            userName: "",
            userKey: "",
            newText: "",
            trySend: false,
            isEdit: false,
        }
    }

    changeCommentary = (element) => {

        debugger;
        startRefresherGlobal(this, true)
        let imgFile = undefined
        if (this.state.blob !== "") {
            imgFile = new File([this.state.blob], "avatar.jpg");
        }

        let that = this;

        var commentForm = new FormData();
        commentForm.append('text', this.state.newText !== "" ? this.state.newText : element.value);
        commentForm.append('mark', this.props.commentState.commentValue ? this.props.commentState.commentValue : element.rating);
        commentForm.append('id', element.id);
        if (this.state.userKey !== "" && element.fakecustomer) {
            commentForm.append('key', this.state.userKey !== "" ? this.state.userKey : element.fakecustomer.key);
        }
        if (this.state.userName !== "" && element.fakecustomer) {
            commentForm.append('userName', this.state.userName !== "" ? this.state.userName : element.fakecustomer.userName);
        }
        commentForm.append('avatar', imgFile);

        const request = new XMLHttpRequest();
        request.open('POST', requests.changeCommentary);
        request.onreadystatechange = function () {

            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                let responseText = JSON.parse(request.responseText);
                debugger
                that.props.newComments(responseText)
                thenFuncGlobal(that);
            } else {
                catchFuncGlobal(that);
            }

        }
        request.send(commentForm);

    }

    imgModalShow = () => {
        this.setState({ imgModal: !this.state.imgModal });
    };

    changeImg = (newImg) => {
        this.setState({ img: newImg })
    }

    saveBlob = (blob) => {
        this.setState({ blob: blob })
    }

    render() {
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeProgramm;
        let textInfoComment = this.props.storeState.languageText.header
        function getMonthName(number) {
            let monthArray = textInfo.monthArray;
            return monthArray[number];
        }

        let isSuperUser = false
        let userId = cookies.get('userId', { path: "/" })
        if (("5d8c748f2af67f052213a249" === userId
            || "5cc6b6bbab3b7e111009d58e" === userId
            || "5d3015c437976716c39c488d" === userId
            || "5d654ed89523424ba6a6b333" === userId)) {
            isSuperUser = true
        }

        if (this.props.selectedComments.length > 0) {
            return (
                <>
                    <Dialog
                        open={this.state.openModal}
                        onClose={() => {
                            this.setState({
                                openModal: !this.state.openModal,
                                isEdit: false, img: "",
                                blob: "",
                                userName: "",
                                userKey: "",
                                newText: "",
                            })
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        {this.state.openModal ? <>
                            <AvatarEditorCustom saveBlob={this.saveBlob} changeImg={this.changeImg} img={this.state.img ? this.state.img : (requests.serverAddressImg + (this.state.element.fakecustomer ? this.state.element.fakecustomer.avatar.url : this.state.element.avatar.url))} imgModalShow={this.imgModalShow} imgModal={this.state.imgModal} />
                            <div className="commentBlock_element" >
                                <i className="commentBlock_elementIconCross" onClick={() => {
                                    this.setState({
                                        openModal: !this.state.openModal,
                                        isEdit: false, img: "",
                                        blob: "",
                                        userName: "",
                                        userKey: "",
                                        newText: "",
                                    })
                                }} />
                                <div className="commentBlock_valueBlock d-flex flex-column">
                                    <div className="commentBlock_picture d-flex pb-2">
                                        {isSuperUser && this.state.isEdit ?
                                            <div className="basicInformationBodyTopImgHover createComment_picture">
                                                <label className="basicInformationBodyTopImg" onClick={() => this.imgModalShow()}>{textInfo.newPhoto}</label>
                                                <img src={this.state.img ? this.state.img : (requests.serverAddressImg + (this.state.element.fakecustomer ? this.state.element.fakecustomer.avatar.url : this.state.element.avatar.url))} alt="imgPerson" />
                                            </div>
                                            :
                                            <img src={requests.serverAddressImg + (this.state.element.fakecustomer ? this.state.element.fakecustomer.avatar.url : this.state.element.avatar.url)} width="auto" height="100%" alt=""></img>}


                                        <div className="d-flex flex-column justify-content-center col createComment_element">

                                            {isSuperUser && this.state.isEdit ?
                                                <>
                                                    <input
                                                        value={this.state.userName}
                                                        defaultValue={this.state.userName !== "" ? this.state.userName : this.state.element.fakecustomer ? this.state.element.fakecustomer.name : this.state.element.name}
                                                        style={this.state.trySend && this.state.userName === "" ? { background: "#a52525c7" } : {}}
                                                        placeholder={this.state.element.fakecustomer ? this.state.element.fakecustomer.name : this.state.element.name}
                                                        onChange={(e) => { this.setState({ userName: e.target.value }) }} type="text" />

                                                    <input
                                                        value={this.state.userKey}
                                                        defaultValue={this.state.userKey !== "" ? this.state.userKey : this.state.element.fakecustomer ? this.state.element.fakecustomer.key : textInfo.key}
                                                        style={this.state.trySend && this.state.userKey === "" ? { background: "#a52525c7" } : {}}
                                                        placeholder={this.state.element.fakecustomer ? this.state.element.fakecustomer.key : textInfo.key}
                                                        onChange={(e) => { this.setState({ userKey: e.target.value }) }} type="text" />
                                                </>
                                                :
                                                <div className="valueBlock_firstElement_name">{this.state.element.fakecustomer ? this.state.element.fakecustomer.name : this.state.element.name}</div>
                                            }
                                            <Stars key={this.state.isEdit} value={this.state.element.rating} valueDisplay={true} changable={isSuperUser && this.state.isEdit ? true : false} commentNumberDisplay={false} />

                                            <div className="valueBlock_firstElement_date">{this.state.date.getDate() + " " + getMonthName(this.state.date.getMonth()) + " " + this.state.date.getFullYear()}</div>
                                        </div>
                                    </div>
                                    {isSuperUser && this.state.isEdit ?
                                        <textarea id="createComment_textareaStyle" onChange={(e) => this.setState({ newText: e.target.value })}
                                            value={this.state.newText !== "" ? this.state.newText : this.state.element.value}
                                            className="createComment_textareaStyle" placeholder={textInfo.yourCommentPlaceholder}></textarea>
                                        :
                                        <div className="">
                                            <label>{this.state.element.value}</label>
                                        </div>

                                    }
                                    {isSuperUser &&
                                        <div className="createComment_footerBt d-flex justify-content-end">
                                            <span style={this.state.isEdit ? { color: "#999" } : {}} onClick={() => { this.setState({ isEdit: !this.state.isEdit }); }}>{this.state.isEdit ? textInfo.cancel : textInfo.edit}</span>
                                            {this.state.isEdit ?
                                                <span className="pl-2" onClick={() => { this.changeCommentary(this.state.element) }}>{textInfo.save}</span>
                                                : <React.Fragment />
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </> : <React.Fragment />}



                    </Dialog>
                    <div className="d-flex flex-wrap">
                        {this.props.selectedComments.map((element, index) => {
                            //let obj = element.name || element.createdAt ? element : {name: element.user.name} 
                            // let openModal = false

                            let date = element.date ? new Date(element.date) : new Date(element.createdAt);

                            return (
                                <div className="col-lg-3 col-md-6 col-12 p-1">
                                    <div className="commentBlock_comments  commentBlock_element" key={element + "/" + index} onClick={(e) => { if (!isMobileOnly) { this.setState({ element: element, date: date, openModal: true }) } }} >
                                        <div className="commentBlock_valueBlock d-flex flex-column">
                                            <div className="commentBlock_picture d-flex pb-2">
                                                <img src={requests.serverAddressImg + (element.fakecustomer ? element.fakecustomer.avatar.url : element.avatar.url)} width="auto" height="100%" alt=""></img>
                                                <div className="d-flex flex-column justify-content-center col pr-0">
                                                    <div className="valueBlock_firstElement_name">{element.fakecustomer ? element.fakecustomer.name : element.name}</div>

                                                    <Stars key={element.rating + "/" + element.index} value={element.rating} valueDisplay={true} commentNumberDisplay={false} />
                                                    <div className="valueBlock_firstElement_date">{date.getDate() + " " + getMonthName(date.getMonth()) + " " + date.getFullYear()}</div>

                                                </div>
                                            </div>
                                            <input className="put" id={"put" + element + index} type="checkbox"></input>
                                            <div className="news">
                                                <label htmlFor={"put" + element + index}>{element.value}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                        )}
                        {
                            this.props.selectedComments.length === 0 ?
                                <>
                                    <div>{textInfoComment.noCommentsText}</div>
                                </>
                                : <React.Fragment />
                        }
                    </div>
                </>
            )
        }
        else {
            return (
                <div className="commentBlock_comments d-flex flex-column">
                    <div className="commentBlock_noCommentsText d-flex">
                        {textInfoComment.noCommentsText}
                    </div>
                </div>
            )
        }

    }
}

const ShowComments = connect(
    (state) => ({
        commentState: state.CommentReduser,
        storeState: state.AppReduser,
    }),
)(ShowCommentsClass);

export default ShowComments;