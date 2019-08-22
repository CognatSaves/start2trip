import React, { Suspense, lazy } from 'react';
import './AuthRedirect.css';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { Helmet } from 'react-helmet';
import requests from '../../config'

import mapWorldIcon from '../media/mapWorld.svg'
import crossIconModal from '../media/closeGray.svg'

import RenderModalCountry from '../header/RenderModalCountry'
import Header from '../header/Header'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// const RenderModalCountry = lazy(() => import('../header/RenderModalCountry'));

class AuthModalCountryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.props.dispatch(setProfileData({}));
    }
    authorization = () => {
        return 0;
    }
    toggle = () => {//функция завершения работы
        //this.props.globalhistory.history.pop();


        let address = this.props.globalReduser.previousUrl;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {

            if (address.length === 0) {
                this.props.history.push('/');
            }
            else {

                //let urlAddress = new Url(address);
                this.props.dispatch(setUrlAddress(""));


                this.props.history.push(address);
            };

            console.log('toggle end');
        }
        else {
            console.log('Ошибка! JWT не установлен!');
            this.props.history.push('/login/');
        }
    }

    render() {
        let renderModal = true;
        // let textInfoMain = this.props.storeState.languageTextMain.header;
        // let textInfoAdmin = this.props.storeState.languageText.header;
        // let isAdmin = this.props.storeState.isSecondLanguageGroupPart;
        // let textInfo = isAdmin ? textInfoAdmin : textInfoMain;
        let helmet = this.props.storeState.languageTextMain.helmets.authModalCountry;
        if (/prerendercloud/.test(window.navigator.userAgent)) {
            console.log("Chrome headless detected");
            renderModal = false;
        }
        let windowImg = null
        if (this.props.storeState.languages.length > 0) {
            
            let coockisIso = cookies.get('country', { path: '/' })
            let j;
            for (let i = 0; i < this.props.storeState.countries.length; i++) {
                if (this.props.storeState.countries[i].ISO === coockisIso) {
                    j = i
                    break;
                }
            }
            
            if(coockisIso === undefined ){
                j = 1
            }
            windowImg = requests.serverAddressImg + this.props.storeState.countries[j].windowImg.url
        }
        return (
            <React.Fragment>
                <div className="home_window" style={{ background: "url(" + windowImg + ")no-repeat", minHeight: "95vh" }} >
                    <Header history={this.props.history} />
                    <Helmet>
                        <title>{helmet.basic.title}</title>
                        <meta name="description" content={helmet.basic.description} />
                        <meta property="og:site_name" content="Tripfer" />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={document.URL} />
                        <meta property="og:title" content={helmet.basic.title} />
                        <meta property="og:description" content={helmet.basic.description} />
                    </Helmet>
                    {renderModal ?
                        <Modal isOpen={true}>
                            <ModalBody>
                                <div className="d-flex flex-column col-12">
                                    <div className="d-flex  justify-content-center col-12 p-4">
                                        <img src={mapWorldIcon} height="150px" alt="mapWorldIcon" />
                                        <button className="modalCountryButtton"><img src={crossIconModal} width="20px" height="20px" alt="crossIconModal" /></button>
                                    </div>
                                    <div className="modalCountry d-flex flex-column align-items-center mb-5">
                                        <h4 className="mb-4">{"Выберите вашу страну"}</h4>
                                        <RenderModalCountry close={() => { }} />
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal>
                        :
                        <React.Fragment />
                    }
                </div>
            </React.Fragment>
        )
    }
}
const AuthModalCountry = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        //globalReduser: state.GlobalReduser,*/
    }),
)(AuthModalCountryClass);

export default AuthModalCountry;