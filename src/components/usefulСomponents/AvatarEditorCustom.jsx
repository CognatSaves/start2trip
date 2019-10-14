import React from 'react';
import '../driverProfileRegistration/DriverProfileNavigation.css'
import { connect } from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { setUser} from '../../redusers/Action';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import { isMobile, isMobileOnly } from 'react-device-detect';
import requests from '../../config';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
            startRefresherGlobal(this,true);

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
        let imgFile = new File([img], "avatar.jpg");
        let that = this;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            var carForm = new FormData();
            carForm.append('avatar', imgFile);
            const request = new XMLHttpRequest();
            request.open('PUT', requests.userAvatarChangeRequest);
            request.setRequestHeader('Authorization', `Bearer ${jwt}`);
            request.onreadystatechange = function () {

                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    let responseText = JSON.parse(request.responseText);
                    let avatar = requests.serverAddressImg + responseText.avatar;
                    let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
                    cookies.set("avatarUrl", avatar, { path: '/', expires: date });
                    that.props.dispatch(setUser(that.props.AppReduser.userName, avatar));
                    thenFuncGlobal(that);
                }
                if (request.readyState === XMLHttpRequest.DONE && request.status === 0) {
                    catchFuncGlobal(that);
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
            startRefresherGlobal(this,true);
            const canvas = this.editor.getImage()
            let img = canvas.toBlob((blob) => {

                this.sendImgToServer(blob)
            }, "image/jpg", 0.7);
        }
    }

    setEditorRef = (editor) => this.editor = editor

    render() {

        let textPage = this.props.AppReduser.languageText.usefulСomponents.avatarEditorCustom;

        const customContentStyle = {
            width: '100%',
            maxWidth: 'none',
        };
        const desktopContentStyle = {
            width: '100%',
            maxWidth: '600px',
        }
        const actions = [

            <div className="d-flex justify-content-between align-items-center avatarEditorCustomBottem px-2 pb-2">
                <div>
                    <label htmlFor="addFile">{textPage.download}</label>
                    <input type="file" id="addFile" style={{ display: "none" }} onChange={this._handleImageChange} />
                </div>

                <FlatButton
                    label={textPage.save}
                    primary={true}
                    keyboardFocused={true}
                    onClick={() => { this.props.imgModalShow(); this.onClickSave(); }}
                />
            </div>,

        ];


        return (
            <>
                <Dialog
                    actions={actions}
                    modal={false}
                    bodyStyle={{ padding: 0 }}
                    contentStyle={isMobile ? customContentStyle : desktopContentStyle}
                    open={this.props.imgModal}
                    onRequestClose={this.props.imgModalShow}
                >
                    
                    <div className="d-flex flex-column justify-content-center  align-items-center col-12 p-3">
                        <div className="d-flex w-100 justify-content-end">
                            <span className="avatarEditorCustomClose" onClick={() => { this.props.imgModalShow() }} />
                        </div>
                        <div className="d-flex align-items-center col-7">
                            <AvatarEditor
                                ref={this.setEditorRef}
                                image={this.props.AppReduser.avatarUrl}
                                width={156}
                                height={156}
                                border={80}
                                crossOrigin={"anonymous"}
                                borderRadius={5}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={this.state.zoomValue}
                                rotate={this.state.rotate}
                            />

                        </div>
                        <div className="avatarEditorCustomCharacteristics d-flex flex-column justify-content-center align-items-center col-12 ">
                            <div className="d-flex justify-content-between px-3">
                                <span className="rotate" onClick={() => { this.setState({ rotate: (this.state.rotate + 90) }) }}></span>
                            </div>
                            <div className="d-flex align-items-center col-8 px-3">
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