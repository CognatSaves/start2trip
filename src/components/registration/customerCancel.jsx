import React from 'react';
import './customerCancel.css';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import requests from '../../config'

import Header from '../header/Header'
import CreateComment from '../driverProfile/CreateComment';
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, } from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { changeLanguagePart } from '../../redusers/Action';
import Checkbox from '@material-ui/core/Checkbox';
const cookies = new Cookies();


class customerCancelClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            falde: null,
            onClickSpan: false,
            selectedIndex: this.props.storeState.languageTextMain.registration.customerCancel.answerVariants.length - 1,
            textValue: ''
        };
        props.dispatch(changeLanguagePart(false, true)); //эта ересь сообщает шапке, что мы в админке за пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
    }
    componentWillUnmount() {
        this.props.dispatch(changeLanguagePart(false, false))//эта ересь сообщает шапке, что мы валим из пользователя, т.е. работает 1я партия языков, но ломать адрес не надо
    }

    startRolling = () => {
        startRefresherGlobal(this)
    }
    endRolling = (result) => {
        thenFuncGlobal(this)
    }

    sendMessege = () => {
        
        let body = JSON.stringify({
            id: this.props.match.params.id,
            clientId: this.props.match.params.clientId,
            cancelCause: this.state.textValue
        });
        let that = this;

        console.log(requests.customerCancel);
        startRefresherGlobal(this)
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
                thenFuncGlobal(that)
                that.setState({
                    isSended: true,
                    falde: false,
                });
            })
            .catch(function (error) {
                console.log("bad");
                console.log('An error occurred:', error);
                catchFuncGlobal(that)
                that.setState({
                    isSended: true,
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

                    <div className="customerCancelForm d-flex flex-column align-items-center align-self-center justify-content-center my-auto col-md-6 col-12" >
                        <h2>{textInfo.headerText}</h2>
                        {this.state.falde !== null || this.state.onClickSpan ?
                            <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/"}>{textInfo.goHome}</Link>
                            :
                            <div className="customerCancelFormSpanDetector d-flex justify-content-between align-items-center col-md-4 col-12">
                                <span onClick={() => { this.sendMessege(); this.setState({ onClickSpan: true }) }}>{textInfo.ok}</span>
                                <span onClick={() => { this.setState({ onClickSpan: true }) }}>{textInfo.cancel}</span>
                            </div>
                        }
                        <text className="col-md-9 col-12 p-0" style={this.state.falde ? { color: "red" } : { color: "green" }}>{this.state.falde === null ? "" : this.state.falde ? textInfo.error : textInfo.success}</text>
                        <div className="d-flex flex-column">
                            <div>
                                {textInfo.headerText}

                            </div>
                            <div className="d-flex flex-column">
                            {
                                textInfo.answerVariants.map((element, index)=>{
                                    let checkboxId = element + '-'+index;
                                    let isChecked = (index===this.state.selectedIndex);
                                    return (
                                        <div className="d-flex flex-row align-items-center">
                                            <Checkbox id={checkboxId} checked={isChecked} 
                                                onChange={()=>{ this.setState({selectedIndex:index, textValue: index!==textInfo.answerVariants.length-1 ? textInfo.answerVariants[index] : ''})}} />
                                            <label style={{marginBottom: 0}} htmlFor={checkboxId}>{textInfo.answerVariants[index]}</label>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <textarea key={'textarea' + this.state.selectedIndex} value={this.state.textValue} onChange={(e) => { this.setState({ textValue: e.target.value }) }} />
                        </div>

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