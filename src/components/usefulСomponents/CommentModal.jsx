import React from 'react';
import '../driverProfile/DriversProfileComments.css';
import { connect } from 'react-redux';
import requests from '../../config';

import Stars from '../stars/Stars';
import Dialog from '@material-ui/core/Dialog';
import AvatarEditorCustom from '../usefulСomponents/AvatarEditorCustom'
import { readAndCompressImage } from 'browser-image-resizer';
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, getCurrencies } from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class CommentModalClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }
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
                        let driverImg = that.props.driverImg;
                        driverImgPreviewUrl.push(img);
                        driverImg.push(sizFile);

                        imageCounter++;

                        if (imageCounter === fullfile.length) {
                        }
                        
                        that.props.changeDriverImg(driverImg)
                        that.setState({
                            driverImgPreviewUrl: driverImgPreviewUrl,
                        });

                        thenFuncGlobal(that)
                    }
                    reader.readAsDataURL(sizFile)
                });
        }

    }

    deletePhoto = (index) => {
        let newDriverImg = [...this.props.driverImg]
        let newDriverImgPreviewUrl = [...this.state.driverImgPreviewUrl]
        newDriverImg.splice(index, 1);
        newDriverImgPreviewUrl.splice(index, 1);
        this.props.changeDriverImg(newDriverImg)
        this.setState({
            driverImgPreviewUrl: newDriverImgPreviewUrl,
        })
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
        let { driverAnswerDate, isAuthor, isSuperUser, 
            element, isEdit ,date, openModal, profile ,
            isNeedAnswer} = this.props
        
        return (
            <>
                <Dialog
                    open={openModal}
                    onClose={this.props.closeModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    
                    <AvatarEditorCustom saveBlob={this.saveBlob} changeImg={this.changeImg} imgModalShow={this.imgModalShow} imgModal={this.state.imgModal}
                    img={this.state.img ? this.state.img : (requests.serverAddressImg + (element.fakecustomer ? element.fakecustomer.avatar.url : element.avatar.url))}  />
                    <div className="commentBlock_element" >
                        <i className="commentBlock_elementIconCross" onClick={this.props.closeModal} />
                        <div className="commentBlock_valueBlock d-flex flex-column ">
                            <div className="commentBlock_picture d-flex pb-2">
                                {isSuperUser && isEdit ?
                                    <div className="basicInformationBodyTopImgHover createComment_picture">
                                        <label className="basicInformationBodyTopImg" onClick={() => this.imgModalShow()}>{textInfo.newPhoto}</label>
                                        <img src={this.state.img ? this.state.img : (requests.serverAddressImg + (element.fakecustomer ? element.fakecustomer.avatar.url : element.avatar.url))} alt="imgPerson" />
                                    </div>
                                    :
                                    <img src={requests.serverAddressImg + (element.fakecustomer ? element.fakecustomer.avatar.url : element.avatar.url)} width="auto" height="100%" alt=""></img>}


                                <div className="d-flex flex-column justify-content-center col createComment_element">

                                    {isSuperUser && isEdit ?
                                        <>
                                            <input
                                                value={this.state.userName}
                                                defaultValue={this.state.userName !== "" ? this.state.userName : element.fakecustomer ? element.fakecustomer.name : element.name}
                                                style={this.state.trySend && this.state.userName === "" ? { background: "#a52525c7" } : {}}
                                                placeholder={element.fakecustomer ? element.fakecustomer.name : element.name}
                                                onChange={(e) => { this.setState({ userName: e.target.value }) }} type="text" />

                                            <input
                                                value={this.state.userKey}
                                                defaultValue={this.state.userKey !== "" ? this.state.userKey : element.fakecustomer ? element.fakecustomer.key : textInfo.key}
                                                style={this.state.trySend && this.state.userKey === "" ? { background: "#a52525c7" } : {}}
                                                placeholder={element.fakecustomer ? element.fakecustomer.key : textInfo.key}
                                                onChange={(e) => { this.setState({ userKey: e.target.value }) }} type="text" />
                                        </>
                                        :
                                        <div className="valueBlock_firstElement_name">{element.fakecustomer ? element.fakecustomer.name : element.name}</div>
                                    }
                                    <Stars key={isEdit} value={Math.ceil(element.rating * 10) / 10} valueDisplay={true} changable={isSuperUser && isEdit ? true : false} commentNumberDisplay={false} />

                                    <div className="valueBlock_firstElement_date">{date.getDate() + " " + getMonthName(date.getMonth()) + " " + date.getFullYear()}</div>
                                </div>
                            </div>
                            {isSuperUser && isEdit ?
                                <textarea id="createComment_textareaStyle" onChange={(e) => this.setState({ newText: e.target.value })}
                                    value={this.state.newText !== "" ? this.state.newText : element.value}
                                    className="createComment_textareaStyle" placeholder={textInfo.yourCommentPlaceholder}></textarea>
                                :
                                <div style={{ maxHeight: "100%" }} className="news">
                                    <label>{element.value}</label>
                                </div>

                            }
                            {isSuperUser &&
                                <div className="createComment_footerBt d-flex justify-content-end pb-2">
                                    <span style={isEdit ? { color: "#999" } : {}} onClick={() => {this.props.isNeedEdit() }}>{isEdit ? textInfo.cancel : textInfo.edit}</span>
                                    {isEdit ?
                                        <span className="pl-2" onClick={() => { this.props.changeCommentary(element,this.state) }}>{textInfo.save}</span>
                                        : <React.Fragment />
                                    }
                                </div>
                            }
                        </div>
                        {   
                         isNeedAnswer ?
                            element.driverText  ?
                                <div className="commentBlock_valueBlock d-flex flex-column my-2 pt-4 border-top">
                                    <div className="commentBlock_picture d-flex justify-content-end pb-2">
                                        <div className="d-flex flex-column justify-content-center align-items-end col pl-0">
                                            <div className="valueBlock_firstElement_name">{profile.name}</div>
                                            <div className="valueBlock_firstElement_date">{driverAnswerDate.getDate() + " " + getMonthName(driverAnswerDate.getMonth()) + " " + driverAnswerDate.getFullYear()}</div>
                                        </div>
                                        <img src={requests.serverAddressImg + profile.avatar} width="auto" height="100%" alt=""></img>
                                    </div>
                                    <div style={{ maxHeight: "100%" }} className="news d-flex justify-content-end">
                                        <label style={{ textAlign: "right" }} htmlFor={"put" + element}>{element.driverText}</label>
                                    </div>
                                </div>
                                :
                                isAuthor || isSuperUser &&
                                <div className="commentBlock_valueBlock d-flex flex-column my-2 pt-4 border-top">
                                    <div className="commentBlock_picture d-flex justify-content-end pb-2">
                                        <div className="d-flex flex-column justify-content-center align-items-end col pl-0">
                                            <div className="valueBlock_firstElement_name">{profile.name}</div>
                                            {element.driverText ?
                                                <div className="valueBlock_firstElement_date">{driverAnswerDate.getDate() + " " + getMonthName(driverAnswerDate.getMonth()) + " " + driverAnswerDate.getFullYear()}</div>
                                                :
                                                <div className="valueBlock_firstElement_date">{new Date().getDate() + " " + getMonthName(new Date().getMonth()) + " " + new Date().getFullYear()}</div>
                                            }

                                        </div>
                                        <img src={requests.serverAddressImg + profile.avatar} width="auto" height="100%" alt=""></img>
                                    </div>
                                    <div className="news">
                                        <textarea id="createComment_textareaStyle" onChange={(e) => this.setState({ driverText: e.target.value })}
                                            value={this.state.driverText} style={{ margin: "0px", height: "80px" }}
                                            className="createComment_textareaStyle" placeholder={textInfo.yourAnswerPlaceholder}></textarea>
                                    </div>
                                    {/* <div className="d-flex flex-md-row flex-column w-100">
                                        <div className=" col-xl-2 col-lg-2 col-md-2 col-12">
                                            <label id="imageLabel" >{"Upload photo"}:</label>
                                            <label id="imageLabelError" className="imageLabelError" style={{ display: 'none' }} >{"error"}</label>
                                        </div>
                                        <div className="tourPhotoMiniContainer d-flex flex-wrap">
                                            <div className="addPhotoTourLabel">
                                                <label htmlFor="addCarFile" ></label>
                                                <input type="file" id="addCarFile" style={{ display: "none" }} multiple onChange={(e) => { this._handleImageChange(e) }} />
                                            </div>
                                            {this.state.driverImgPreviewUrl.map((element, index) =>
                                                <div className="position-relative" >
                                                    <img src={element} className="tourPhotoMini" alt="add_car" />
                                                    <span onClick={() => { this.deletePhoto(index) }}></span>
                                                </div>
                                            )}
                                        </div>
                                    </div> */}

                                    <div className="d-flex flex-md-row flex-column w-100">
                                        <div className="col-md-3 col-12 d-flex align-items-center pr-0">
                                            <label id="imageLabel" >{textInfo.uploadPhoto}:</label>
                                            <label id="imageLabelError" className="imageLabelError" style={{ display: 'none' }} >{"error"}</label>
                                        </div>
                                        <div className="tourPhotoMiniContainer d-flex flex-wrap">
                                            <div className="addPhotoTourLabel">
                                                <label htmlFor={"addCarFileCommentEl"+element.value} ></label>
                                                <input type="file" id={"addCarFileCommentEl"+element.value} style={{ display: "none" }} multiple onChange={(e) => { this._handleImageChange(e) }} />
                                            </div>
                                            {this.state.driverImgPreviewUrl.map((element, index) =>
                                                <div className="position-relative" >
                                                    <img src={element} className="tourPhotoMini" alt="add_car" />
                                                    <span onClick={() => { this.deletePhoto(index) }}></span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <span onClick={() => { if (this.state.driverText !== "") { this.props.changeCommentary(element,this.state) } }} style={{ cursor: "pointer", color: "#304269", fontWeight: "500" }}>{textInfo.answer}</span>
                                    </div>
                                </div>
                            :<React.Fragment />
                        }

                    </div>

                </Dialog>
            </>
        )
    }
}

const CommentModal = connect(
    (state) => ({
        commentState: state.CommentReduser,
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(CommentModalClass);

export default CommentModal;