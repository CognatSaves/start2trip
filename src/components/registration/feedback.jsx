import React from 'react';
import './feedback.css';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import requests from '../../config'

import Header from '../header/Header'
import CreateComment from '../driverProfile/CreateComment';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class feedbackClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshExist: false,
            isRefreshing: false,
            isGoodAnswer: false,
        };
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


    render() {
        let id = this.props.match.params.id;
        let clientId = this.props.match.params.clientId;
        let textInfo = this.props.storeState.languageTextMain.driverProfile.createComment;
        let windowImg = null
        if (this.props.storeState.languages.length > 0) {
            debugger
            let coockisIso = cookies.get('country', { path: '/' })
            let j;
            for (let i = 0; i < this.props.storeState.countries.length; i++) {
                if (this.props.storeState.countries[i].ISO === coockisIso) {
                    j = i
                    break;
                }
            }
            windowImg = requests.serverAddressImg + this.props.storeState.countries[j].windowImg.url
        }
        return (
            <React.Fragment>
                <Header history={this.props.history} />
                <div className="home_window d-flex justify-content-center align-items-center" style={{ background: "url(" + windowImg + ")no-repeat", minHeight: "87.5vh" }} >

                    <Helmet>
                        <title>{"Оставте отзыв о Вашей поездке"}</title>
                        <meta name="description" content={"Оставте отзыв о Вашей поездке"} />
                        <meta property="og:site_name" content="Tripfer" />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content="https://tripfer.com/feedback" />
                        <meta property="og:title" content={"Оставте отзыв о Вашей поездке"} />
                        <meta property="og:description" content={"Оставте отзыв о Вашей поездке"} />
                    </Helmet>
                    <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
                    <div className="col-md-6 col-12">
                        <CreateComment targetType={"driver"} myclass={"feedbackbackground"} clientId={clientId} targetId={id} createCommentString={textInfo.createCommentString}
                            startRolling={() => this.startRolling()} endRolling={(result) => this.endRolling(result)} />
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
const feedback = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,

    }),
)(feedbackClass);

export default feedback;