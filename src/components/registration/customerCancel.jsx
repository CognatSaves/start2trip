import React from 'react';
import './customerCancel.css';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import requests from '../../config'

import Header from '../header/Header'
import CreateComment from '../driverProfile/CreateComment';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { changeLanguagePart } from '../../redusers/Action';
const cookies = new Cookies();

class customerCancelClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSended: false,
            isRefreshExist: false,
            isRefreshing: false,
            isGoodAnswer: false,
            falde: null,
            onClickSpan: false,
        };
        props.dispatch(changeLanguagePart(false, true)); //эта ересь сообщает шапке, что мы в админке за пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
    }
    componentWillUnmount() {
        this.props.dispatch(changeLanguagePart(false, false))//эта ересь сообщает шапке, что мы валим из пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
    }

    startRolling = () => {

        this.setState({
            isRefreshExist: true,
            isRefreshing: true
        });
    }
    endRolling = (result) => {

        let that = this;
        this.setState({
            isRefreshing: false,
            isGoodAnswer: result
        });
        setTimeout(
            function () {
                that.setState({ isRefreshExist: false, isRefreshing: true })
            }, 2000
        )
    }

    sendMessege = () => {
        let body = JSON.stringify({
            id: this.props.match.params.id,
            clientId: this.props.match.params.clientId
        });
        let that = this;
        debugger;
        console.log(requests.customerCancel);

        fetch(requests.customerCancel, {
            method: 'POST', body: body,
            headers: { 'content-type': 'application/json' }
        })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                console.log('data');
                console.log(data);
                if (data.error) {
                    throw Error(data.error.errorMsg);
                }
                if (data.message) {
                    if (data.message === "Too many attempts, please try again in a minute.") {
                        //throw Error('не кликой. подумой! а то я сейчас кликну!');

                    }
                }
                that.setState({
                    isSended: true,
                    isGoodAnswer: true,
                    isRefreshExist: false,
                    falde: false,
                });
            })
            .catch(function (error) {
                console.log("bad");
                console.log('An error occurred:', error);
                that.setState({
                    isSended: true,
                    isGoodAnswer: false,
                    isRefreshExist: false,
                    falde: true
                });
            })
    }


    render() {
        let textInfo = this.props.storeState.languageTextMain.registration.customerCancel;

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
            if (coockisIso === undefined) {
                j = 1
            }
            windowImg = requests.serverAddressImg + this.props.storeState.countries[j].windowImg.url

        }
        let helmet = this.props.storeState.languageTextMain.helmets.customerCancel;
        return (
            <>

                <div className="home_window d-flex flex-column " style={{ background: "url(" + windowImg + ")no-repeat", minHeight: "93.5vh" }} >
                    <Header history={this.props.history} />
                    <Helmet>
                        <title>{helmet.title}</title>
                        <meta name="description" content={helmet.description} />
                        <meta property="og:site_name" content="Tripfer" />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content="https://tripfer.com/feedback" />
                        <meta property="og:title" content={helmet.title} />
                        <meta property="og:description" content={helmet.description} />
                    </Helmet>
                    <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />

                    <div className="customerCancelForm d-flex flex-column align-items-center align-self-center justify-content-center my-auto col-md-6 col-12" >
                        <h2>{textInfo.headerText}</h2>
                        {this.state.falde !== null || this.state.onClickSpan ?
                            <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/routes/"}>{textInfo.goHome}</Link>
                            :
                            <div className="d-flex justify-content-between align-items-center col-md-4 col-12">
                                <span onClick={() => { this.sendMessege(); this.setState({ onClickSpan: true }) }}>{textInfo.ok}</span>
                                <span onClick={() => { this.setState({ onClickSpan: true }) }}>{textInfo.cancel}</span>
                            </div>
                        }
                        <text className="col-md-9 col-12 p-0" style={this.state.falde ? { color: "red" } : { color: "green" }}>{this.state.falde === null ? "" : this.state.falde ? textInfo.error : textInfo.success}</text>
                    </div>
                </div>
            </>
        )
    }
}
const customerCancel = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,

    }),
)(customerCancelClass);

export default customerCancel;