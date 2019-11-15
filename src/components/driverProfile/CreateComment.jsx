import React from 'react';
import { setModalRegister } from '../../redusers/Action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import requests from '../../config';

import AvatarEditorCustom from '../usefulСomponents/AvatarEditorCustom'
import DatePicker from 'material-ui/DatePicker';
import { readAndCompressImage } from 'browser-image-resizer';
import { addComment } from '../../redusers/ActionComments';
// import tempPicture from './pictures/drivers_body_photo.png'

import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, getCurrencies } from '../../redusers/GlobalFunction'
import Stars from '../stars/Stars';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class CreateCommentClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNotFilled: false,
            isAllCorrect: false,
            imgModal: false,
            img: "",
            blob: "",
            userName: "",
            userKey: "",
            newText: "",
            driverImg: [],
            driverImgPreviewUrl: [],
            date: new Date(),
            trySend: false,

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

            startRefresherGlobal(this, true);



            // let body = JSON.stringify({ targetId: this.props.targetId, text: newComment, mark: this.props.commentState.commentValue, clientId: this.props.clientId });
            let that = this;
            let address = requests.createComment + "?target=" + this.props.targetType;

            var commentForm = new FormData();
            commentForm.append('targetId', this.props.targetId);
            commentForm.append('text', newComment);
            commentForm.append('mark', this.props.commentState.commentValue);
            
            commentForm.append('clientId', this.props.clientId);
            if (this.state.driverImg.length > 0) {
                for (let i = 0; i < this.state.driverImg.length; i++) {
                    let imgFile = new File([this.state.driverImg[i]], "avatar.jpg");
                    commentForm.append('userImg', imgFile);
                }

            }

            //console.log(this.props.commentState);

            if (this.props.clientId) {



                const request = new XMLHttpRequest();
                request.open('POST', address);
                // request.setRequestHeader('content-type', 'application/json')
                request.onreadystatechange = function () {

                    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        let responseText = JSON.parse(request.responseText);
                        that.setState({
                            isAllCorrect: true,
                            isNotFilled: false,
                            img: "",
                            blob: "",
                            userName: "",
                            userKey: "",
                            newText: "",
                            driverImg: [],
                            driverImgPreviewUrl: [],
                            date: new Date(),
                        })

                        thenFuncGlobal(that);
                    } else {
                        catchFuncGlobal(that);
                    }

                }
                request.send(commentForm);

              
            } else {

                const request = new XMLHttpRequest();
                request.open('POST', address);
                // request.setRequestHeader('content-type', 'application/json')
                request.setRequestHeader('Authorization', `Bearer ${jwt}`)
                request.onreadystatechange = function () {

                    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        let responseText = JSON.parse(request.responseText);
                        that.setState({
                            isAllCorrect: true,
                            isNotFilled: false,
                            img: "",
                            blob: "",
                            userName: "",
                            userKey: "",
                            newText: "",
                            driverImg: [],
                            driverImgPreviewUrl: [],
                            date: new Date(),
                        })

                        thenFuncGlobal(that);
                    } else {
                        catchFuncGlobal(that);
                    }

                }
                request.send(commentForm);

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

    changeCommentary = (targetId) => {

        startRefresherGlobal(this, true)
        let imgFile = undefined
        if (this.state.blob !== "") {
            imgFile = new File([this.state.blob], "avatar.jpg");
        }
        let jwt = this.props.globalReduser.readCookie('jwt');

        let that = this;
        
        var commentForm = new FormData();
        commentForm.append('text', this.state.newText);
        commentForm.append('mark', this.props.commentState.commentValue);
        commentForm.append('key', this.state.userKey);
        commentForm.append('userName', this.state.userName);
        commentForm.append('targetType', this.props.targetType);
        commentForm.append('targetId', targetId);
        commentForm.append('date', this.state.date);

        if (this.state.driverImg.length > 0) {
            for (let i = 0; i < this.state.driverImg.length; i++) {
                let imgFile = new File([this.state.driverImg[i]], "avatar.jpg");
                commentForm.append('userImg', imgFile);
            }

        }

        commentForm.append('avatar', imgFile);

        const request = new XMLHttpRequest();
        request.open('POST', requests.fakeCommentCreation);
        request.setRequestHeader('Authorization', `Bearer ${jwt}`)
        request.onreadystatechange = function () {

            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                let responseText = JSON.parse(request.responseText);
                that.props.newComments(responseText)
                
                that.setState({
                    img: "",
                    blob: "",
                    userName: "",
                    userKey: "",
                    newText: "",
                    driverImg: [],
                    driverImgPreviewUrl: [],
                    date: new Date(),
                })
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

    _handleImageChange = (e) => {
        
        e.preventDefault();
        let that = this
        let fullfile = e.target.files;
        let imageCounter = 0;
        for (let i = 0; i < fullfile.length; i++) {
            if (i === 0) {
                startRefresherGlobal(that, true)
            }

            let file = fullfile[i]

            if (!file.type.match('image')) continue;

            readAndCompressImage(file, that.props.globalReduser.compressConfig)
                .then(resizedImage => {

                    let sizFile = new File([resizedImage], file.name);
                    return sizFile;
                })
                .then(sizFile => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        // 

                        var img = reader.result;
                        let driverImgPreviewUrl = that.state.driverImgPreviewUrl;
                        let driverImg = that.state.driverImg;
                        driverImgPreviewUrl.push(img);
                        driverImg.push(sizFile);

                        imageCounter++;

                        if (imageCounter === fullfile.length) {
                        }
                        that.setState({
                            driverImgPreviewUrl: driverImgPreviewUrl,
                            driverImg: driverImg,
                        });

                        thenFuncGlobal(that)
                    }
                    reader.readAsDataURL(sizFile)
                });
        }

    }

    deletePhoto = (index) => {
        let newDriverImg = [...this.state.driverImg]
        let newDriverImgPreviewUrl = [...this.state.driverImgPreviewUrl]
        newDriverImg.splice(index, 1);
        newDriverImgPreviewUrl.splice(index, 1);
        this.setState({
            driverImg: newDriverImg,
            driverImgPreviewUrl: newDriverImgPreviewUrl,
        })
    }

    render() {
        let jwt = this.props.globalReduser.readCookie('jwt');
        let textInfo = this.props.storeState.languageTextMain.driverProfile.createComment;

        let isSuperUser = false
        let userId = cookies.get('userId', { path: "/" })
        if (requests.isSuperUser(userId)) {
            isSuperUser = true
        }

        if (jwt || this.props.clientId) {
            return (
                <>
                    <AvatarEditorCustom saveBlob={this.saveBlob} changeImg={this.changeImg} img={this.state.img ? this.state.img : (this.props.storeState.avatarUrl ? this.props.storeState.avatarUrl : requests.serverAddressImg + '/uploads/user.svg')} imgModalShow={this.imgModalShow} imgModal={this.state.imgModal} />
                    <div className={"commentBlock_createComment d-flex flex-column " + this.props.myclass}>
                        <div className="createComment_element d-flex col-12 p-0">
                            <div className="basicInformationBodyTopImgHover createComment_picture">
                                <label className="basicInformationBodyTopImg" onClick={() => this.imgModalShow()}>{textInfo.newPhoto}</label>
                                <img src={this.state.img ? this.state.img : (this.props.storeState.avatarUrl ? this.props.storeState.avatarUrl : requests.serverAddressImg + '/uploads/user.svg')} alt="imgPerson" />
                            </div>

                            <div className="d-flex flex-column pl-2 align-items-start col-4" onClick={() => { if (this.state.isNotFilled || this.state.isAllCorrect) { this.setState({ isNotFilled: false, isAllCorrect: false }) } }}>
                                {isSuperUser ?
                                    <input value={this.state.userName} style={this.state.trySend && this.state.userName === "" ? { background: "#a52525c7" } : {}} placeholder={textInfo.name} onChange={(e) => { this.setState({ userName: e.target.value }) }} type="text" />
                                    :
                                    <span className="pt-2 createComment-text">{this.props.createCommentString}</span>
                                }

                                <Stars key="SelectStars" valueDisplay={false} commentNumberDisplay={false} changable={true} changeStarsBlock={'placeCreateCommentStars'} />
                            </div>
                            <div className='col pl-0'>
                                <div className='d-flex align-items-center justify-content-end '>
                                    <div className="pr-3">
                                        {isSuperUser &&
                                            <>
                                                <DatePicker onChange={(nul, date) => { this.setState({ date: date }); }}
                                                    floatingspanText="Дата комментария" className="" value={this.state.date} />
                                                <input value={this.state.userKey} style={this.state.trySend && this.state.userKey === "" ? { background: "#a52525c7" } : {}} placeholder={textInfo.key} onChange={(e) => { this.setState({ userKey: e.target.value }) }} type="text" />
                                            </>
                                        }
                                    </div>

                                </div>

                            </div>
                        </div>

                        <textarea id="createComment_textareaStyle" value={this.state.newText} onChange={(e) => { this.setState({ newText: e.target.value }) }} className="createComment_textareaStyle" placeholder={textInfo.yourCommentPlaceholder}
                            onClick={() => { if (this.state.isNotFilled || this.state.isAllCorrect) { this.setState({ isNotFilled: false, isAllCorrect: false }) } }}></textarea>
                        <div className="d-flex flex-md-row flex-column w-100">
                            <div className="col-md-2 col-12 d-flex align-items-center pr-0">
                                <label id="imageLabel" >{"Upload photo"}:</label>
                                <label id="imageLabelError" className="imageLabelError" style={{ display: 'none' }} >{"error"}</label>
                            </div>
                            <div className="tourPhotoMiniContainer d-flex flex-wrap">
                                <div className="addPhotoTourLabel">
                                    <label htmlFor="addCarFileCreateComment" ></label>
                                    <input type="file" id="addCarFileCreateComment" style={{ display: "none" }} multiple onChange={(e) => { this._handleImageChange(e) }} />
                                </div>
                                {this.state.driverImgPreviewUrl.map((element, index) =>
                                    <div className="position-relative" >
                                        <img src={element} className="tourPhotoMini" alt="add_car" />
                                        <span onClick={() => { this.deletePhoto(index) }}></span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="d-flex flex-row">
                            <text style={{ margin: 'auto auto auto 0', color: 'green', fontSize: '14px', display: this.state.isAllCorrect ? 'flex' : 'none' }}>{textInfo.infoText}</text>
                            <text style={{ margin: 'auto auto auto 0', color: 'red', fontSize: '14px', display: this.state.isNotFilled ? 'flex' : 'none' }}>{textInfo.nonFilledText}</text>
                            {this.props.clientId && this.state.isAllCorrect ?
                                <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/"} className="createComment_Link">{textInfo.createCommentLinkHome}</Link>
                                :
                                <button className="driversAdaptedRoute_sendRequest createComment_sendButton" onClick={() => {
                                    if (isSuperUser) {
                                        if (this.state.userKey !== "" && this.state.userName !== "" || this.state.userKey !== "") {
                                            this.changeCommentary(this.props.targetId)
                                        } else {
                                            this.setState({ trySend: true })
                                        }
                                    } else { this.sendComment(this.props.targetId) }
                                }}>
                                    <text>{textInfo.sendText}</text>
                                </button>
                            }
                        </div>

                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <AvatarEditorCustom img={this.props.storeState.avatarUrl ? this.props.storeState.avatarUrl : requests.serverAddressImg + '/uploads/user.svg'} imgModalShow={this.imgModalShow} imgModal={this.state.imgModal} />
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
                </>
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