import React from 'react';
import '../registration/ForgotPassword.css'
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { changeLanguagePart } from '../../redusers/Action';
import requests from '../../config';

import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Header from '../header/Header';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class TripConfirmationClass extends React.Component {
    constructor(props) {
        super(props);

        //TODO обработка отказа (Trello)
        console.log(this.props);
        let id = this.props.match.params.id;
        let userId = this.props.match.params.userId;
        let body = JSON.stringify({ id: id, userId: userId, frontendAddress: requests.frontendAddress });
        let that = this;
        this.state = {
            isServerGood: true,
            text: 'Ожидайте ответа',
            isRefreshExist: true
        }
        fetch(requests.customerConfirmation, {
            method: 'POST', body: body,
            headers: { 'content-type': 'application/json' }
        })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.error) {
                    console.log("bad");
                    throw data.error;
                }
                else {
                    console.log('good');
                    console.log(data);
                    that.setState({
                        text: 'Всё прекрасно',
                        isRefreshExist: false,
                        
                    })
                }
            })
            .catch(function (error) {
                console.log('bad');
                that.setState({
                    text: 'Всё плохо',
                    isRefreshExist: false,
                    isServerGood: false
                })
                console.log('An error occurred:', error);
            });
        props.dispatch(changeLanguagePart(false, true)); //эта ересь сообщает шапке, что мы в админке за пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
    }
    componentWillUnmount() {
        this.props.dispatch(changeLanguagePart(false, false))//эта ересь сообщает шапке, что мы валим из пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
    }
    
    render() {
        console.log('TripConfirmation render');

        console.log(this.state);
        let helmet = this.props.storeState.languageTextMain.helmets.tripConfirmation;
        let textInfo = this.props.storeState.languageTextMain.drivers.tripConfirmation;
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
                {
                    this.state.isRefreshExist ?
                        <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true} />
                        :
                        (
                            this.state.isServerGood ?
                            <div className="home_window" style={{ background: "url(" + windowImg + ")no-repeat", minHeight: "93.5vh" }}>
                                <Header driver={true} history={this.props.history} />
                                <div className="forgotPasswordContent d-flex flex-column align-items-center col-md-8 col-12 mx-auto">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <span className="pt-2 pb-1">{textInfo.good.title}</span>
                                        {
                                            /*
                                            Объект this.state.text содержит информацию по поводу того, как обработался
                                            запрос. Но выводить его на экран не нужно, надо добавить отрисовку неудачи
                                            <span1>{this.state.text}</span1>
                                            */
                                        }
                                        
                                    </div>
                                    <div className="d-flex flex-md-row flex-column justify-content-center align-items-center col-md-8 col-12">
                                        <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12"
                                        onClick={() => { this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/') }}>
                                        <span>{textInfo.good.buttonText}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center col-md-5 col-12">
                                        <p>{textInfo.good.info}</p>
                                    </div>
                                </div>
                            </div> : 
                            <div className="home_window" style={{ background: "url(" + windowImg + ")no-repeat", minHeight: "93.5vh" }}>
                                <Header driver={true} history={this.props.history} />
                                <div className="forgotPasswordContent d-flex flex-column align-items-center col-md-8 col-12 mx-auto">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <span className="pt-2 pb-1">{textInfo.bad.title}</span>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center col-md-5 col-12">
                                        <p>{textInfo.bad.info}</p>
                                    </div>
                                    <div className="d-flex flex-md-row flex-column justify-content-center align-items-center col-md-8 col-12">
                                        <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12"
                                        onClick={() => { this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/') }}>
                                        <span>{textInfo.bad.buttonText}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }


            </React.Fragment>
        )
    }
}
const TripConfirmation = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
        commentState: state.CommentReduser
    }),
)(TripConfirmationClass);

export default TripConfirmation;