import React from 'react';
import '../driverProfile/DriversProfileComments.css';
import { isMobileOnly } from 'react-device-detect';
import { connect } from 'react-redux';
import requests from '../../config';

import Stars from '../stars/Stars';
import PlacePhotos from '../PlaceDescription/PlacePhotos';
import { readAndCompressImage } from 'browser-image-resizer';
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, getCurrencies } from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class CommentElClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driverText: "",
            newText:"",
            userKey:"",
            userName:"",
            driverImg: [],
            driverImgPreviewUrl: [],
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

   
    render() {
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeProgramm;
        function getMonthName(number) {
            let monthArray = textInfo.monthArray;
            return monthArray[number];
        }
        let {element,index,date,driverAnswerDate,isAuthor,isSuperUser, isNeedAnswer} = this.props
        return (
            <>

                <div className="col-md-6 col-12 p-1">
                    <div style={{ height: "100%" }} className="commentBlock_comments  commentBlock_element" key={element + "/" + index}  >
                        <div className="commentBlock_valueBlock d-flex flex-column">
                            <div className="commentBlock_picture d-flex pb-2">
                                <img src={requests.serverAddressImg + (element.fakecustomer ? element.fakecustomer.avatar.url : element.avatar.url)} width="auto" height="100%" alt=""></img>
                                <div className="d-flex flex-column justify-content-center col pr-0">
                                    <div className="valueBlock_firstElement_name">{element.fakecustomer ? element.fakecustomer.name : element.name}</div>

                                    <Stars key={element.rating + "/" + element.index} value={Math.ceil(element.rating * 10) / 10} valueDisplay={true} commentNumberDisplay={false} />
                                    <div className="valueBlock_firstElement_date">{date.getDate() + " " + getMonthName(date.getMonth()) + " " + date.getFullYear()}</div>
                                </div>
                                <div style={{ cursor: "pointer", color: "#304269", fontWeight: "500" }} onClick={(e) => { this.props.openModal(element,date) }}>{textInfo.more}</div>
                            </div>
                            <input className="put" id={"put" + element + index} type="checkbox"></input>
                            <div className="news">
                                <label htmlFor={"put" + element + index}>{element.value}</label>
                            </div>
                            <PlacePhotos photoArray={element.userImg}
                                showMask={(clickedImageIndex, images) => {this.props.showPhoto(clickedImageIndex,element.userImg)  }} />
                        </div>
                        {
                            isNeedAnswer?
                            element.driverText ?
                                <div className="commentBlock_valueBlock d-flex flex-column my-2 pt-4 border-top">
                                    <div className="commentBlock_picture d-flex justify-content-end pb-2">
                                        <div className="d-flex flex-column justify-content-center align-items-end col pl-0">
                                            <div className="valueBlock_firstElement_name">{this.props.profile.name}</div>
                                            <div className="valueBlock_firstElement_date">{driverAnswerDate.getDate() + " " + getMonthName(driverAnswerDate.getMonth()) + " " + driverAnswerDate.getFullYear()}</div>
                                        </div>
                                        <img src={requests.serverAddressImg + this.props.profile.avatar} width="auto" height="100%" alt=""></img>
                                    </div>
                                    <div className="news">
                                        <label style={{ textAlign: "right" }} htmlFor={"put" + element + index}>{element.driverText}</label>
                                    </div>
                                    <PlacePhotos photoArray={element.driverImg}
                                        showMask={(clickedImageIndex, images) => { this.props.showPhoto(clickedImageIndex,element.driverImg) }} />
                                </div>
                                :
                                isAuthor || isSuperUser &&
                                <div className="commentBlock_valueBlock d-flex flex-column my-2 pt-4 border-top">
                                    <div className="commentBlock_picture d-flex justify-content-end pb-2">
                                        <div className="d-flex flex-column justify-content-center align-items-end col pl-0">
                                            <div className="valueBlock_firstElement_name">{this.props.profile.name}</div>
                                            {element.driverText ?
                                                <div className="valueBlock_firstElement_date">{driverAnswerDate.getDate() + " " + getMonthName(driverAnswerDate.getMonth()) + " " + driverAnswerDate.getFullYear()}</div>
                                                :
                                                <div className="valueBlock_firstElement_date">{new Date().getDate() + " " + getMonthName(new Date().getMonth()) + " " + new Date().getFullYear()}</div>
                                            }

                                        </div>
                                        <img src={requests.serverAddressImg + this.props.profile.avatar} width="auto" height="100%" alt=""></img>
                                    </div>
                                    <div className="news d-flex justify-content-end">
                                        <textarea id="createComment_textareaStyle" onChange={(e) => this.setState({ driverText: e.target.value })}
                                            value={this.state.driverText} style={{ margin: "0px", height: "80px" }}
                                            className="createComment_textareaStyle" placeholder={textInfo.yourAnswerPlaceholder}></textarea>
                                    </div>

                                    <div className="d-flex flex-md-row flex-column w-100">
                                        <div className="col-md-3 col-12 d-flex align-items-center pr-0">
                                            <label id="imageLabel" >{"Upload photo"}:</label>
                                            <label id="imageLabelError" className="imageLabelError" style={{ display: 'none' }} >{"error"}</label>
                                        </div>
                                        <div className="tourPhotoMiniContainer d-flex flex-wrap">
                                            <div className="addPhotoTourLabel">
                                                <label htmlFor={"addCarFileCommentEl"+element.value+index} ></label>
                                                <input type="file" id={"addCarFileCommentEl"+element.value+index} style={{ display: "none" }} multiple onChange={(e) => { this._handleImageChange(e) }} />
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
                </div>


            </>
        )


    }
}

const CommentEl = connect(
    (state) => ({
        commentState: state.CommentReduser,
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(CommentElClass);

export default CommentEl;