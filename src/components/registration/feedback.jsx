import React from 'react';
import './feedback.css';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import requests from '../../config'

import Header from '../header/Header'
import CreateComment from '../driverProfile/CreateComment';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Cookies from 'universal-cookie';
import { changeLanguagePart } from '../../redusers/Action';
import axios from 'axios';
import { Link } from 'react-router-dom';
const cookies = new Cookies();

class feedbackClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshExist: true,
            isRefreshing: true,
            isGoodAnswer: true,
            isCommented: false
        };
        props.dispatch(changeLanguagePart(false, true)); //эта ересь сообщает шапке, что мы в админке за пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
        
        let address= requests.isCommentedTrip+'/?id='+this.props.match.params.id+"&clientId="+this.props.match.params.clientId;
        axios.get(address)
        .then(response =>{
            //console.log(response);
            return response.data;
        })
        .then(data => {
            
            console.log(data.isCommented);
            this.setState({
                isCommented: data.isCommented,
                isRefreshExist: false
            });
        })
        .catch(error=>{
            console.log('Error happened');
        });
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


    render() {
        let id = this.props.match.params.id;
        let clientId = this.props.match.params.clientId;
        let textInfo = this.props.storeState.languageTextMain.driverProfile.createComment;
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
                <Header history={this.props.history} />
                <div className="home_window d-flex justify-content-center align-items-center" style={{ background: "url(" + windowImg + ")no-repeat", minHeight: "87.5vh" }} >

                    <Helmet>
                        <title>{"Оставьте отзыв о Вашей поездке"}</title>
                        <meta name="description" content={"Оставьте отзыв о Вашей поездке"} />
                        <meta property="og:site_name" content="Tripfer" />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content="https://tripfer.com/feedback" />
                        <meta property="og:title" content={"Оставьте отзыв о Вашей поездке"} />
                        <meta property="og:description" content={"Оставьте отзыв о Вашей поездке"} />
                    </Helmet>
                    <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />
                    {
                        this.state.isCommented ?
                            <div className="col-md-6 col-12">
                                <div className="commentBlock_createComment d-flex flex-column feedbackbackground align-items-center">
                                    <text style={{marginBottom: '10px'}}>{textInfo.alreadyCommented}</text>
                                    <button className="driversAdaptedRoute_sendRequest feedback_returnButton">
                                        <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/routes/"}>{textInfo.toMain}</Link>
                                    </button>
                                </div>
                            </div>
                        :
                        <div className="col-md-6 col-12">
                            <CreateComment targetType={"driver"} myclass={"feedbackbackground"} clientId={clientId} targetId={id} createCommentString={textInfo.createCommentString}
                                startRolling={() => this.startRolling()} endRolling={(result) => this.endRolling(result)} />
                        </div>
                    }
                    

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