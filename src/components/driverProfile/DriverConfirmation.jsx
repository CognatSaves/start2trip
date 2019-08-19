import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import requests from '../../config';

import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Header from '../header/Header';


class DriverConfirmationClass extends React.Component {
    constructor(props) {
        super(props);
        let id = props.match.params.id;
        let carrierId = props.match.params.carrierId;
        let confirmation = JSON.parse(props.match.params.confirmation);

         
        if(confirmation){
            console.log("-------------------------------")
            console.log(confirmation)
            this.state = {
                isRefreshExist: true,
                heAgrees: null,
                id: id,
                carrierId: carrierId,
                confirmation: confirmation,
            }
            this.sendRequest(id, carrierId, confirmation);
        } else {
            console.log("-------------------------------")
            console.log(confirmation)
            /*this.setState({
                isRefreshExist: false,
                heAgrees: props.match.params.confirmation,
            })*/
            this.state = {
                isRefreshExist: false,
                heAgrees: confirmation,
                id: id,
                carrierId: carrierId,
                confirmation: confirmation,
            }


        }
    }
    
    sendRequest=(id,carrierId,confirmation)=>{
        
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
                        isRefreshExist: false
                    })
                }
            })
            .catch(function (error) {
                console.log('bad');
                that.setState({
                    isRefreshExist: false
                })
                console.log('An error occurred:', error);
            });
    }

    render() {
        console.log('DriverConfirmation render');
        let textInfo = this.props.storeState.languageTextMain.drivers.driverConfirmation;
        let helmet = this.props.storeState.languageTextMain.helmets.driverConfirmation;
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
                        <div className="forgotPasswordBody d-flex flex-column align-items-center">
                            <Header driver={true} history={this.props.history} />
                            {this.state.heAgrees ? <React.Fragment>
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
                                        <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12" onClick={() => { this.props.history.push("/") }}><span>{textInfo.good.toStart}</span></div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center col-md-5 col-12">
                                        <p>{'* ' + textInfo.infoBlock}</p>
                                    </div>
                                </div>
                            </React.Fragment>
                                :
                                <React.Fragment>
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
                                                    this.props.history.push("/")
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
                                </React.Fragment>}

                        </div>
                }
            </React.Fragment>
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