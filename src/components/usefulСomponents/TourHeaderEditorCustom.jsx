import React from 'react';
import '../driverProfileRegistration/DriverProfileNavigation.css'
import { connect } from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { setUser } from '../../redusers/Action';
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, } from '../../redusers/GlobalFunction'
import { isMobile, isMobileOnly } from 'react-device-detect';
import requests from '../../config';
import Dialog from '@material-ui/core/Dialog';
import './AvatarEditorCustom.css'

import Slider from '@material-ui/core/Slider';
import AvatarEditor from 'react-avatar-editor'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AvatarEditorCustomClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            zoomDefaultValue: 1,
            zoomValue: 1,
            rotate: 0,

        };
    }

    _handleImageChange = (e) => {
        e.preventDefault();

        let file = e.target.files[0];

        if (file && file.type.match('image')) {
            startRefresherGlobal(this, true);

            readAndCompressImage(file, this.props.globalReduser.compressConfig)
                .then(resizedImage => {

                    let sizFile = new File([resizedImage], file.name);
                    return sizFile;
                })
                .then(sizFile => {
                    let that = this;
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        that.sendImgToServer(sizFile)
                    }
                    reader.readAsDataURL(sizFile)

                });

        }
    }

    sendImgToServer = (img) => {
        let imgFile = new File([img], isMobile?'blockListImage.jpg':'mainImage.jpg');
        let that = this;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            var carForm = new FormData();
            carForm.append(isMobile?'blockListImage':'mainImage', imgFile);
            carForm.append('tourId', this.props.tourId);
            carForm.append('authorId', this.props.authorId);
            carForm.append('typeImg', isMobile?'blockListImage':'mainImage');
            const request = new XMLHttpRequest();
            request.open('PUT', requests.userTourEditImgRequest);
            request.setRequestHeader('Authorization', `Bearer ${jwt}`);
            request.onreadystatechange = function () {

                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    let responseText = JSON.parse(request.responseText);
                    that.props.changeImg(responseText.tourImg,responseText.typeImg)
                    thenFuncGlobal(that,true);
                }else{
                    catchFuncGlobal(that,true);
                }

            }
            request.send(carForm);
        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }


    }

    onClickSave = () => {
        if (this.editor) {
            startRefresherGlobal(this, true);
            const canvas = this.editor.getImage()
            let img = canvas.toBlob((blob) => {

                this.sendImgToServer(blob)
            }, "image/jpg", 0.7);
        }
    }

    setEditorRef = (editor) => this.editor = editor

    render() {

        let textPage = this.props.AppReduser.languageText.usefulСomponents.avatarEditorCustom;


        return (
            <>
                <Dialog fullScreen={isMobile ? true : false} maxWidth={isMobile ? "" : "xl"} open={this.props.imgModal} onClose={this.props.imgModal}>
                    <div className="d-flex w-100 align-items-center justify-content-md-end justify-content-between avatarEditorCustomBottem">
                        {isMobile &&
                            <div className="pl-2">
                                <label htmlFor="addFile">{textPage.download}</label>
                                <input type="file" id="addFile" style={{ display: "none" }} onChange={this._handleImageChange} />
                            </div>
                        }
                        <span className="avatarEditorCustomClose" onClick={() => { this.props.imgModalShow() }} />
                    </div>
                    <div className="d-flex flex-column justify-content-center  align-items-center">
                            <AvatarEditor
                                ref={this.setEditorRef}
                                image={this.props.img}
                                width={isMobile ?350:1000}
                                height={isMobile ?210:280}
                                border={80}
                                crossOrigin={"anonymous"}
                                borderRadius={0}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={this.state.zoomValue}
                                rotate={this.state.rotate}
                            />

                        <div className="avatarEditorCustomCharacteristics d-flex flex-column justify-content-center align-items-center w-100 pt-3">
                            <div className="d-flex align-items-center w-75 px-3">
                                <span className="zoomSmall" />
                                <Slider
                                    defaultValue={this.state.zoomDefaultValue}
                                    value={this.state.zoomValue}
                                    onChange={(e, value) => { this.setState({ zoomValue: value }) }}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="off"
                                    step={0.1}
                                    marks
                                    min={1}
                                    max={2}
                                />
                                <span className="zoomBig" />
                            </div>

                        </div>
                    </div>
                    <div className="d-flex flex-md-row flex-column justify-content-between align-items-center avatarEditorCustomBottem px-2 py-2">
                        {!isMobile &&
                            <div>
                                <label htmlFor="addFile">{textPage.download}</label>
                                <input type="file" id="addFile" style={{ display: "none" }} onChange={this._handleImageChange} />
                            </div>
                        }
                        <span className="align-self-end " onClick={() => { this.props.imgModalShow(); this.onClickSave(); }}>{textPage.save}</span>
                    </div>

                </Dialog>




            </>
        );
    }
}

const AvatarEditorCustom = connect(
    (state) => ({
        globalhistory: state.GlobalReduser,
        globalReduser: state.GlobalReduser,
        AppReduser: state.AppReduser,
    }),
)(AvatarEditorCustomClass);

export default AvatarEditorCustom;