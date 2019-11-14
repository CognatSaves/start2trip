import React from 'react';
import './DriversProfileComments.css';
import { connect } from 'react-redux';
import requests from '../../config';

import Stars from '../stars/Stars';
import Dialog from '@material-ui/core/Dialog';
import AvatarEditorCustom from '../usefulСomponents/AvatarEditorCustom'
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
                                driverText: "",
                                driverImg: [],
                                driverImgPreviewUrl: [],
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
                                        driverText: "",
                                        driverImg: [],
                                        driverImgPreviewUrl: [],
                                    })
                                }} />
                                <div className="commentBlock_valueBlock d-flex flex-column ">
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
                                            <Stars key={this.state.isEdit} value={Math.ceil(this.state.element.rating * 10) / 10} valueDisplay={true} changable={isSuperUser && this.state.isEdit ? true : false} commentNumberDisplay={false} />

                                            <div className="valueBlock_firstElement_date">{this.state.date.getDate() + " " + getMonthName(this.state.date.getMonth()) + " " + this.state.date.getFullYear()}</div>
                                        </div>
                                    </div>
                                    {isSuperUser && this.state.isEdit ?
                                        <textarea id="createComment_textareaStyle" onChange={(e) => this.setState({ newText: e.target.value })}
                                            value={this.state.newText !== "" ? this.state.newText : this.state.element.value}
                                            className="createComment_textareaStyle" placeholder={textInfo.yourCommentPlaceholder}></textarea>
                                        :
                                        <div style={{ maxHeight: "100%" }} className="news">
                                            <label>{this.state.element.value}</label>
                                        </div>

                                    }
                                    {isSuperUser &&
                                        <div className="createComment_footerBt d-flex justify-content-end pb-2">
                                            <span style={this.state.isEdit ? { color: "#999" } : {}} onClick={() => { this.setState({ isEdit: !this.state.isEdit }); }}>{this.state.isEdit ? textInfo.cancel : textInfo.edit}</span>
                                            {this.state.isEdit ?
                                                <span className="pl-2" onClick={() => { this.changeCommentary(this.state.element) }}>{textInfo.save}</span>
                                                : <React.Fragment />
                                            }
                                        </div>
                                    }
                                </div>
                                {
                                    this.state.element.driverText ?
                                        <div className="commentBlock_valueBlock d-flex flex-column my-2 pt-4 border-top">
                                            <div className="commentBlock_picture d-flex justify-content-end pb-2">
                                                <div className="d-flex flex-column justify-content-center align-items-end col pl-0">
                                                    <div className="valueBlock_firstElement_name">{this.props.profile.name}</div>
                                                    <div className="valueBlock_firstElement_date">{driverAnswerDate.getDate() + " " + getMonthName(driverAnswerDate.getMonth()) + " " + driverAnswerDate.getFullYear()}</div>
                                                </div>
                                                <img src={requests.serverAddressImg + this.props.profile.avatar} width="auto" height="100%" alt=""></img>
                                            </div>
                                            <div style={{ maxHeight: "100%" }} className="news d-flex justify-content-end">
                                                <label style={{ textAlign: "right" }} htmlFor={"put" + this.state.element}>{this.state.element.driverText}</label>
                                            </div>
                                        </div>
                                        :
                                        isAuthor || isSuperUser &&
                                        <div className="commentBlock_valueBlock d-flex flex-column my-2 pt-4 border-top">
                                            <div className="commentBlock_picture d-flex justify-content-end pb-2">
                                                <div className="d-flex flex-column justify-content-center align-items-end col pl-0">
                                                    <div className="valueBlock_firstElement_name">{this.props.profile.name}</div>
                                                    {this.state.element.driverText ?
                                                        <div className="valueBlock_firstElement_date">{driverAnswerDate.getDate() + " " + getMonthName(driverAnswerDate.getMonth()) + " " + driverAnswerDate.getFullYear()}</div>
                                                        :
                                                        <div className="valueBlock_firstElement_date">{new Date().getDate() + " " + getMonthName(new Date().getMonth()) + " " + new Date().getFullYear()}</div>
                                                    }

                                                </div>
                                                <img src={requests.serverAddressImg + this.props.profile.avatar} width="auto" height="100%" alt=""></img>
                                            </div>
                                            <div className="news">
                                                <textarea id="createComment_textareaStyle" onChange={(e) => this.setState({ driverText: e.target.value })}
                                                    value={this.state.driverText} style={{ margin: "0px", height: "80px" }}
                                                    className="createComment_textareaStyle" placeholder={textInfo.yourAnswerPlaceholder}></textarea>
                                            </div>
                                            <div className="d-flex flex-md-row flex-column w-100">
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
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <span onClick={() => { if (this.state.driverText !== "") { this.changeCommentary(this.state.element) } }} style={{ cursor: "pointer", color: "#304269", fontWeight: "500" }}>{textInfo.answer}</span>
                                            </div>
                                        </div>

                                }

                            </div>
                        </> : <React.Fragment />}



                    </Dialog>
                </>
            )
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