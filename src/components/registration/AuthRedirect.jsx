import React from 'react';
import './AuthRedirect.css';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { Helmet } from 'react-helmet';
import requests from '../../config'

import Header from '../header/Header'
import RenderModalRegistration from '../header/RenderModalRegistration';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const ModalRegistration = (props) => {
    let { modalRegistration, toggle, className, authorization } = props;
    return (
        <Modal isOpen={modalRegistration} toggle={/*toggle*/{}} className={className + " p-0"}>

            <ModalBody>
                <RenderModalRegistration close={toggle} authorization={authorization} />
            </ModalBody>

        </Modal>
    )
}
class AuthRedirectClass extends React.Component {
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
            debugger;
            if (address.length === 0) {
                let country = cookies.get('country',{path: '/'});
                let lang = cookies.get('userLangISO', {path: '/'});
                if(country && lang){
                    this.props.history.push('/'+country+'-'+lang+'/routes/');
                }
                else{
                    this.props.history.push('/countrySelection/');
                }
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
            this.props.history.push('/'+ cookies.get('userLangISO', { path: "/" }) +'/login/');
        }
    }
    render() {
        let helmet = this.props.storeState.languageTextMain.helmets.authRedirect;
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
                <Helmet>
                    <title>{helmet.basic.title}</title>
                    <meta name="description" content={helmet.basic.description} />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={document.URL} />
                    <meta property="og:title" content={helmet.basic.title} />
                    <meta property="og:description" content={helmet.basic.description} />
                </Helmet>
                <div className="home_window" style={{ background: "url(" + windowImg + ")no-repeat", minHeight: "95vh" }}>
                    <Header history={this.props.history} />
                    <ModalRegistration modalRegistration={/*this.state.modalRegistration*/true} toggle={this.toggle} className={'authRedirect_background'} authorization={this.authorization} />
                </div>
            </React.Fragment>
        )
    }
}
const AuthRedirect = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        //globalReduser: state.GlobalReduser,*/
    }),
)(AuthRedirectClass);

export default AuthRedirect;