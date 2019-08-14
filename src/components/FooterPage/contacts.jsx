import React from 'react';
import { connect } from 'react-redux';
import './contacts.css'
import mailSvg from '../media/mail.svg'
import phone_callSvg from '../media/phone-call.svg'
import placeholderSvg from '../media/placeholder.svg'
import webSvg from '../media/web.svg'
import Header from '../header/Header';
import { isMobileOnly } from 'react-device-detect';
import {Helmet} from 'react-helmet';

class contactsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }


    }
    sendMessage=()=>{

    }
    render() {
        let text = this.props.storeState.languageTextMain.footerPage.contacts
        return (
            <React.Fragment>
                <Helmet>
                    <title>{'Наши контакты'}</title>
                    <meta name="description" content="Наши контакты" />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={document.URL} />
                    <meta property="og:title" content="Наши контакты" />
                    <meta property="og:description" content="Наши контакты" /> 
                </Helmet>
                <Header driver={true} history={this.props.history} />
                <div className="wrapper">
                    <div className="contacts d-flex" >
                        <div className="contacts_Title col-12 p-0">
                            <h2>{text.h2}</h2>
                            <div className="contacts_content_left d-flex flex-md-row flex-column justify-content-md-between">
                                <div className="col-md-6 col-12 pl-0">
                                    <h4>{text.h4}</h4>
                                    <p className="col-md-8 col-12 p-0">{text.text}</p>
                                    <form onSubmit={(e) => { e.preventDefault() }} id="contactsForm" className="d-flex flex-md-wrap flex-nowrap flex-md-row flex-column mt-4">
                                        <input className="col mr-md-2" placeholder={text.firstNamePlaceholder} type="text" />
                                        <input className="col ml-md-2 mt-md-0 mt-3" placeholder="Email" type="text" />
                                        <textarea className="col-12 mt-3" placeholder={text.messege} rows="1"></textarea>
                                        <div className="d-flex justify-content-end col-12 p-0 my-3">
                                            <input className="contacts_contentBt col-md-5 col-12" value={text.buttonSubmit} type="submit" />
                                        </div>
                                    </form>
                                </div>
                                <div className="d-flex flex-column justify-content-center col-md-4 col-12">
                                    <div className="contacts_content_right " >
                                        <div className="contacts_content_rightHeder">
                                            <span>{text.nameFirm}</span>
                                        </div>
                                        <div className="contacts_content_rightMiddle d-flex flex-column">
                                            <h5>{text.h5}</h5>
                                            <div className="d-flex">
                                                <label style={{background:"url("+phone_callSvg+")no-repeat"}} className="col-md-2 col-3 p-0" htmlFor="tel">{text.labelPhone}</label>
                                                <span id="tel">+1 347-771-1833</span>
                                            </div>
                                            <div className="d-flex">
                                                <label style={{background:"url("+mailSvg+")no-repeat"}} className="col-md-2 col-3 p-0" htmlFor="email">Email:</label>
                                                <span id="email">support@tripfer.com</span>
                                            </div>
                                            <div className="d-flex align-items-start">
                                                <label style={{background:"url("+webSvg+")no-repeat"}} className="col-md-2 col-3 p-0">{text.labelSocialNetwork}</label>
                                                <a href="" className="instagram" />
                                                <a href="" className="facebook" />
                                            </div>
                                        </div>
                                        <div className="contacts_content_rightFooter d-flex">
                                            <label style={{background:"url("+placeholderSvg+")no-repeat"}} className="col-md-2 col-3 p-0" htmlFor="adress">{text.labelAddress}</label>
                                            <span id="adress">{text.addressText1}{isMobileOnly ? <React.Fragment></React.Fragment> : <br/>} {text.addressText2}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const contacts = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(contactsClass);
export default contacts;