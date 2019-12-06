import React from 'react';
import '../driverProfile/DriversProfileComments.css';
import { connect } from 'react-redux';
import requests from '../../config';

import PlacePhotoShow from '../PlaceDescription/PlacePhotoShow.jsx';
import CommentModal from './CommentModal'
import CommentEl from './CommentEl'
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
            driverText: "",
            driverImg: [],
            driverImgPreviewUrl: [],
            trySend: false,
            isEdit: false,
            isMaskVisible: false,
            clickedImageIndex: 0,
            images: null,
        }
    }

    changeCommentary = (element, elementState) => {


        startRefresherGlobal(this, true)
        let imgFile = undefined
        if (elementState.blob !== "") {
            imgFile = new File([elementState.blob], "avatar.jpg");
        }

        let that = this;

        var commentForm = new FormData();
        commentForm.append('text', elementState.newText !== "" ? elementState.newText : element.value);
        commentForm.append('mark', this.props.commentState.commentValue ? this.props.commentState.commentValue : element.rating);
        commentForm.append('id', element.id);
        
        commentForm.append('targetId', this.props.targetId);
        if (elementState.userKey !== "" || element.fakecustomer) {
            commentForm.append('key', elementState.userKey !== "" ? elementState.userKey : element.fakecustomer.key);
        }
        if (elementState.userName !== "" || element.fakecustomer) {
            commentForm.append('userName', elementState.userName !== "" ? elementState.userName : element.fakecustomer.name);
        }
        if (elementState.driverText !== "") {
            commentForm.append('driverText', elementState.driverText);
            commentForm.append('driverAnswerDate', new Date());
        }

        if (this.state.driverImg.length > 0) {
            for (let i = 0; i < this.state.driverImg.length; i++) {
                let imgFileDriver = new File([this.state.driverImg[i]], "avatar.jpg");
                commentForm.append('driverImg', imgFileDriver);
            }

        }else{
            commentForm.append('avatar', imgFile);
        }

        

        const request = new XMLHttpRequest();
        request.open('POST', requests.changeCommentary);
        request.onreadystatechange = function () {

            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                let responseText = JSON.parse(request.responseText);
                
                that.props.newComments(responseText)
                that.setState({
                    driverImg: [],
                })
                thenFuncGlobal(that);
            } else {
                catchFuncGlobal(that);
            }

        }
        request.send(commentForm);

    }

    openModal = (element, date) => {
        this.setState({
            openModal: true,
            element: element,
            date: date,
        })

    }

    closeModal = () => {
        this.setState({
            openModal: false,
            isEdit: false,
            img: "",
            blob: "",
        })
    }

    showPhoto = (clickedImageIndex, element) => {
        this.setState({
            isMaskVisible: true,
            clickedImageIndex: clickedImageIndex,
            images: element
        })
    }

    changeDriverImg = (driverImg) => {
        this.setState({ driverImg: driverImg })
    }


    render() {
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeProgramm;
        let textInfoComment = this.props.storeState.languageText.header


        let isSuperUser = false
        let isAuthor = false
        let userId = cookies.get('userId', { path: "/" })
        if (requests.isSuperUser(userId)) {
            isSuperUser = true
        } else if (this.props.profile) {
            if (this.props.profile.id === userId)
                isAuthor = true
        }

        if (this.props.selectedComments.length > 0) {
            let driverAnswerDate = null
            if (this.state.openModal) {
                driverAnswerDate = new Date(this.state.element.driverAnswerDate)
            }


            return (
                <>
                    {this.state.openModal &&
                        <CommentModal driverAnswerDate={driverAnswerDate} isEdit={this.state.isEdit} openModal={this.state.openModal} 
                            element={this.state.element}
                            driverImg={this.state.driverImg} changeDriverImg={this.changeDriverImg}
                            closeModal={this.closeModal} isNeedEdit={() => { this.setState({ isEdit: !this.state.isEdit }) }} date={this.state.date} profile={this.props.profile}
                            isAuthor={isAuthor} isSuperUser={isSuperUser} isNeedAnswer={this.props.isNeedAnswer} changeCommentary={this.changeCommentary} />
                    }

                    {
                        this.state.images !== null ?
                            <PlacePhotoShow isComment={true} onClose={() => this.setState({ isMaskVisible: false, clickedImageIndex: 0, images: null })}
                                isMaskVisible={this.state.isMaskVisible} clickedImageIndex={this.state.clickedImageIndex} images={this.state.images} />
                            : <React.Fragment />
                    }
                    <div className="d-flex flex-wrap">
                        {this.props.selectedComments.map((element, index) => {

                            let date = element.date ? new Date(element.date) : new Date(element.createdAt);
                            let driverAnswerDate = new Date(element.driverAnswerDate)
                            return (
                                <CommentEl element={element} index={index} date={date} openModal={this.openModal}
                                    driverImg={this.state.driverImg} changeDriverImg={this.changeDriverImg}
                                    driverAnswerDate={driverAnswerDate} profile={this.props.profile} changeCommentary={this.changeCommentary}
                                    isAuthor={isAuthor} isNeedAnswer={this.props.isNeedAnswer} isSuperUser={isSuperUser} showPhoto={this.showPhoto} />
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
        globalReduser: state.GlobalReduser,
    }),
)(ShowCommentsClass);

export default ShowComments;