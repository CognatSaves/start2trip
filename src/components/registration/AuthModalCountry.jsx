import React from 'react';
import { connect } from 'react-redux';
import Header from '../header/Header'
import { Modal, ModalBody } from 'reactstrap';
import mapWorldIcon from '../media/mapWorld.svg'
import crossIconModal from '../media/closeGray.svg'
import './AuthRedirect.css';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import RenderModalCountry from '../header/RenderModalCountry'
import {Helmet} from 'react-helmet';
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
        // let textInfoMain = this.props.storeState.languageTextMain.header;
        // let textInfoAdmin = this.props.storeState.languageText.header;
        // let isAdmin = this.props.storeState.isSecondLanguageGroupPart;
        // let textInfo = isAdmin ? textInfoAdmin : textInfoMain;
        return (
            <React.Fragment>
                <div className="home_window" style={{ minHeight: "95vh" }}>
                    <Header history={this.props.history} />
                    <Helmet>
                        <title>Tripfer in countrySelect</title>
                        <meta name="description" content="Tripfer in header" />
                        <link rel="icon" sizes="any" type="image/svg+xml" href="favicon.svg" />
                    </Helmet>
                    <Modal isOpen={true}>
                        <ModalBody>
                            <div className="d-flex flex-column col-12">
                                <div className="d-flex  justify-content-center col-12 p-4">
                                    <img src={mapWorldIcon} height="150px" alt="mapWorldIcon" />
                                    <button className="modalCountryButtton"><img src={crossIconModal} width="20px" height="20px" alt="crossIconModal" /></button>
                                </div>
                                <div className="modalCountry d-flex flex-column align-items-center mb-5">
                                    <h4 className="mb-4">{"Выберите вашу страну"}</h4>
                                    <RenderModalCountry close={()=>{}}/>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}
const AuthModalCountry = connect(
    (state) => ({
        //storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        //globalReduser: state.GlobalReduser,*/
    }),
)(AuthModalCountryClass);

export default AuthModalCountry;