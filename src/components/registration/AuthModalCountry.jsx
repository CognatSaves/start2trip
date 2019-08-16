import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import Header from '../header/Header'
import { Modal, ModalBody } from 'reactstrap';
import mapWorldIcon from '../media/mapWorld.svg'
import crossIconModal from '../media/closeGray.svg'
import './AuthRedirect.css';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import RenderModalCountry from '../header/RenderModalCountry'
import { Helmet } from 'react-helmet';

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
            this.props.history.push('/login');
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
        }else{
            renderModal = false;
        }
        return (
            <React.Fragment>
                <div className="home_window" style={{ minHeight: "95vh" }}>
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
                    {renderModal?
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
                        <React.Fragment/>
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