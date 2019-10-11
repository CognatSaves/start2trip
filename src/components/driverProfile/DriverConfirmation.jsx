import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import requests from '../../config';

import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Header from '../header/Header';
import Cookies from 'universal-cookie';
import { changeLanguagePart } from '../../redusers/Action';
const cookies = new Cookies();

class DriverConfirmationClass extends React.Component {
    constructor(props) {
        super(props);
        let id = props.match.params.id;
        let carrierId = props.match.params.carrierId;
        let confirmation = JSON.parse(props.match.params.confirmation);


        if (confirmation) {
            console.log("-------------------------------")
            console.log(confirmation)
            startRefresherGlobal(this)
            this.state = {
                heAgrees: confirmation,
                id: id,
                carrierId: carrierId,
                confirmation: confirmation,
                notConfirmed: true
            }
            this.sendRequest(id, carrierId, confirmation);
        } else {
            console.log("-------------------------------")
            console.log(confirmation)
            this.state = {
                heAgrees: confirmation,
                id: id,
                carrierId: carrierId,
                confirmation: confirmation,
                notConfirmed: true
            }


        }
        props.dispatch(changeLanguagePart(false, true)); //эта ересь сообщает шапке, что мы в админке за пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
    }
    componentWillUnmount() {
        this.props.dispatch(changeLanguagePart(false, false))//эта ересь сообщает шапке, что мы валим из пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
    }
    sendRequest = (id, carrierId, confirmation) => {

        let body = JSON.stringify({
            id: id,
            carrierId: carrierId,
            frontendAddress: requests.frontendAddress,
            confirmation: confirmation
        });
        let that = this;
        fetch(requests.carrierConfirmation, {
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
                        heAgrees: data.confirmation,
                    })
                    thenFuncGlobal(that)
                }
            })
            .catch(function (error) {
                console.log('bad');

                that.setState({
                    notConfirmed: false
                })
                catchFuncGlobal(that)
                console.log('An error occurred:', error);
            });
    }

    render() {
        console.log('DriverConfirmation render');
        let textInfo = this.props.storeState.languageTextMain.drivers.driverConfirmation;
        let helmet = this.props.storeState.languageTextMain.helmets.driverConfirmation;
        let coockisIso = cookies.get('country', { path: '/' })
        let redirectAddress = coockisIso && coockisIso.length > 0 ?
            ("/" + cookies.get('country', { path: '/' }) + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/') :
            ('/countrySelection');
        return (
            <>
                <Helmet>
                    <title>{helmet.basic.title}</title>
                    <meta name="description" content={helmet.basic.description} />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={document.URL} />
                    <meta property="og:title" content={helmet.basic.title} />
                    <meta property="og:description" content={helmet.basic.description} />
                </Helmet>

                <>
                    {
                        this.props.storeState.isRefreshExist ?
                        <></>
                            :
                            <div className="forgotPasswordBody d-flex flex-column align-items-center">
                                <Header driver={true} history={this.props.history} />
                                {
                                    this.state.notConfirmed ?
                                        <>
                                            {
                                                this.state.heAgrees ?
                                                    <>
                                                        <div className="forgotPasswordContent forgotPasswordContent d-flex flex-column align-items-center col-md-7 col-11">
                                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                                <span className="pt-2 pb-1">{textInfo.good.header}</span>
                                                                <span1>
                                                                    {textInfo.good.header2[0]}
                                                                    <br />
                                                                    {textInfo.good.header2[1]}
                                                                </span1>
                                                            </div>
                                                            <div className="d-flex flex-md-row flex-column justify-content-center align-items-center col-md-8 col-12">
                                                                <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12"
                                                                    onClick={() => { this.props.history.push(redirectAddress) }}>
                                                                    <span>{textInfo.good.toStart}</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center align-items-center col-md-5 col-12">
                                                                <p>{'* ' + textInfo.infoBlock}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="forgotPasswordContent forgotPasswordContent d-flex flex-column align-items-center py-md-4 py-2 mb-0 mb-5 col-md-9 col-11">
                                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                                <span className="pt-2 pb-1">{textInfo.bad.header}</span>
                                                                <span1>
                                                                    {textInfo.bad.header2[0]}
                                                                    <br />
                                                                    {textInfo.bad.header2[1]}
                                                                </span1>
                                                            </div>
                                                            <div className="d-flex flex-md-row flex-column justify-content-center align-items-center col-md-8 col-12">
                                                                <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12" style={{ background: "#686868" }}
                                                                    onClick={() => {
                                                                        this.setState({ confirmation: false });
                                                                        this.sendRequest(this.state.id, this.state.carrierId, false);
                                                                        this.props.history.push(redirectAddress)
                                                                    }}>
                                                                    <span>{textInfo.bad.variants[0]}</span>
                                                                </div>
                                                                <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12"
                                                                    onClick={() => {
                                                                        this.setState({ confirmation: true, heAgrees: true });
                                                                        this.sendRequest(this.state.id, this.state.carrierId, true);
                                                                    }}>
                                                                    <span>{textInfo.bad.variants[1]}</span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center align-items-center col-md-5 col-12">
                                                                <p>{'* ' + textInfo.infoBlock}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            <div className="forgotPasswordContent forgotPasswordContent d-flex flex-column align-items-center col-md-7 col-11">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <span className="pt-2 pb-1">{textInfo.notFound.header}</span>
                                                    <span1>
                                                        {textInfo.notFound.value[0]}
                                                        <br />
                                                        {textInfo.notFound.value[1]}
                                                    </span1>
                                                </div>
                                                <div className="d-flex flex-md-row flex-column justify-content-center align-items-center col-md-8 col-12">
                                                    <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12" onClick={() => { this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/') }}><span>{textInfo.notFound.toStart}</span></div>
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>
                    }
                </>
            </>
        )
    }
}

const DriverConfirmation = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
        commentState: state.CommentReduser
    }),
)(DriverConfirmationClass);
export default DriverConfirmation;