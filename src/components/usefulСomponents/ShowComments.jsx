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

    changeCommentary = (element) => {


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
        debugger
        commentForm.append('targetId', this.props.targetId);
        if (this.state.userKey !== "" && element.fakecustomer) {
            commentForm.append('key', this.state.userKey !== "" ? this.state.userKey : element.fakecustomer.key);
        }
        if (this.state.userName !== "" && element.fakecustomer) {
            commentForm.append('userName', this.state.userName !== "" ? this.state.userName : element.fakecustomer.name);
        }
        if (this.state.driverText !== "") {
            commentForm.append('driverText', this.state.driverText);
            commentForm.append('driverAnswerDate', new Date());
        }

        if (this.state.driverImg.length > 0) {
            for (let i = 0; i < this.state.driverImg.length; i++) {
                let imgFile = new File([this.state.driverImg[i]], "avatar.jpg");
                commentForm.append('driverImg', imgFile);
            }

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

    openModal = (element,date) =>{
        this.setState({
            openModal: true,
            element: element,
            date:date,
        })
        
    }

    closeModal = ()=>{
        this.setState({
            openModal: false,
            isEdit: false,
            img: "",
            blob: "",
        })
    }

    showPhoto = (clickedImageIndex,element)=>{
        debugger
        this.setState({ 
            isMaskVisible: true, 
            clickedImageIndex: clickedImageIndex, 
            images: element 
        })
    }

    // _handleImageChange = (e) => {
    //     e.preventDefault();
    //     let that = this
    //     let fullfile = e.target.files;
    //     let imageCounter = 0;
    //     for (let i = 0; i < fullfile.length; i++) {
    //         if (i === 0) {
    //             startRefresherGlobal(that, true)
    //         }

    //         let file = fullfile[i]

    //         if (!file.type.match('image')) continue;

    //         readAndCompressImage(file, that.props.globalReduser.compressConfig)
    //             .then(resizedImage => {

    //                 let sizFile = new File([resizedImage], file.name);
    //                 return sizFile;
    //             })
    //             .then(sizFile => {
    //                 let reader = new FileReader();
    //                 reader.onloadend = () => {
    //                     // 

    //                     var img = reader.result;
    //                     let driverImgPreviewUrl = that.state.driverImgPreviewUrl;
    //                     let driverImg = that.state.driverImg;
    //                     driverImgPreviewUrl.push(img);
    //                     driverImg.push(sizFile);

    //                     imageCounter++;

    //                     if (imageCounter === fullfile.length) {
    //                     }
    //                     that.setState({
    //                         driverImgPreviewUrl: driverImgPreviewUrl,
    //                         driverImg: driverImg,
    //                     });

    //                     thenFuncGlobal(that)
    //                 }
    //                 reader.readAsDataURL(sizFile)
    //             });
    //     }

    // }

    // deletePhoto = (index) => {
    //     let newDriverImg = [...this.state.driverImg]
    //     let newDriverImgPreviewUrl = [...this.state.driverImgPreviewUrl]
    //     newDriverImg.splice(index, 1);
    //     newDriverImgPreviewUrl.splice(index, 1);
    //     this.setState({
    //         driverImg: newDriverImg,
    //         driverImgPreviewUrl: newDriverImgPreviewUrl,
    //     })
    // }

    // imgModalShow = () => {
    //     this.setState({ imgModal: !this.state.imgModal });
    // };

    // changeImg = (newImg) => {
    //     this.setState({ img: newImg })
    // }

    // saveBlob = (blob) => {
    //     this.setState({ blob: blob })
    // }

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
            if (this.state.openModal){
                driverAnswerDate = new Date(this.state.element.driverAnswerDate)
            }
                
            debugger;
            return (
                <>
                {this.state.openModal&&
                 <CommentModal driverAnswerDate={driverAnswerDate} isEdit={this.state.isEdit} openModal={this.state.openModal} element={this.state.element}
                 closeModal={this.closeModal} date={this.state.date} profile={this.props.profile} isAuthor={isAuthor} isSuperUser={isSuperUser} />
                }
                   
                    {
                        this.state.images !== null ?
                            <PlacePhotoShow onClose={() => this.setState({ isMaskVisible: false,clickedImageIndex:0 , images:null })}
                                isMaskVisible={this.state.isMaskVisible} clickedImageIndex={this.state.clickedImageIndex} images={this.state.images} />
                            : <React.Fragment />
                    }
                    <div className="d-flex flex-wrap">
                        {this.props.selectedComments.map((element, index) => {

                            let date = element.date ? new Date(element.date) : new Date(element.createdAt);
                            let driverAnswerDate = new Date(element.driverAnswerDate)
                            return (
                                <CommentEl element={element} index={index} date={date} openModal={this.openModal}
                                    driverAnswerDate={driverAnswerDate} profile={this.props.profile}
                                    isAuthor={isAuthor} isSuperUser={isSuperUser} showPhoto={this.showPhoto}/>
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