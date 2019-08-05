import React from 'react';
import { connect } from 'react-redux';
import './contacts.css'
import mailSvg from '../media/mail.svg'
import phone_callSvg from '../media/phone-call.svg'
import placeholderSvg from '../media/placeholder.svg'
import webSvg from '../media/web.svg'
import Header from '../header/Header';


class contactsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }


    }

    render() {
        return (
            <React.Fragment>
                <Header driver={true} history={this.props.history} />
                <div className="wrapper">
                    <div className="contacts d-flex" >
                        <div className="contacts_Title col-12 p-0">
                            <h2>Контакты</h2>
                            <div className="contacts_content_left d-flex flex-md-row flex-column justify-content-md-between">
                                <div className="col-md-6 col-12 pl-0">
                                    <h4>Обратная связь</h4>
                                    <p className="col-md-8 col-12 p-0">Оставьте свое сообщение в этой форме, и мы получим его на email и обязательно ответим!</p>
                                    <form onSubmit={(e) => { e.preventDefault() }} id="contactsForm" className="d-flex flex-md-wrap flex-nowrap flex-md-row flex-column mt-4">
                                        <input className="col mr-md-2" placeholder="Имя" type="text" />
                                        <input className="col ml-md-2 mt-md-0 mt-3" placeholder="Email" type="text" />
                                        <textarea className="col-12 mt-3" placeholder="Ваше сообщение" rows="1"></textarea>
                                        <div className="d-flex justify-content-end col-12 p-0 my-3">
                                            <input className="contacts_contentBt col-md-5 col-12" value="Отправить сообщение" type="submit" />
                                        </div>
                                    </form>
                                </div>
                                <div className="d-flex flex-column justify-content-center col-md-4 col-12">
                                    <div className="contacts_content_right " >
                                        <div className="contacts_content_rightHeder">
                                            <span>ООО "Трипферком", УНП 193278785</span>
                                        </div>
                                        <div className="contacts_content_rightMiddle d-flex flex-column">
                                            <h5>Контакты</h5>
                                            <div className="d-flex">
                                                <label style={{background:"url("+phone_callSvg+")no-repeat"}} className="col-md-2 col-3 p-0" htmlFor="tel">Тел:</label>
                                                <span id="tel">+1 347-771-1833</span>
                                            </div>
                                            <div className="d-flex">
                                                <label style={{background:"url("+mailSvg+")no-repeat"}} className="col-md-2 col-3 p-0" htmlFor="email">Email:</label>
                                                <span id="email">support@tripfer.com</span>
                                            </div>
                                            <div className="d-flex align-items-start">
                                                <label style={{background:"url("+webSvg+")no-repeat"}} className="col-md-2 col-3 p-0">Соц.Сети:</label>
                                                <a href="" className="instagram" />
                                                <a href="" className="facebook" />
                                            </div>
                                        </div>
                                        <div className="contacts_content_rightFooter d-flex">
                                            <label style={{background:"url("+placeholderSvg+")no-repeat"}} className="col-md-2 col-3 p-0" htmlFor="adress">Адрес:</label>
                                            <span id="adress">220015, г.Минск, ул.Янки Мавра,<br/> д. 41, офис.410</span>
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