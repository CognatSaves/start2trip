import React from 'react';
import { connect } from 'react-redux';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Header from '../header/Header';
import {Helmet} from 'react-helmet';
class DriverConfirmationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Ожидаем ответа',
            isRefreshExist: true,
            heAgrees: null,
            id:this.props.match.params.id,
            carrierId:this.props.match.params.carrierId,
            confirmation:this.props.match.params.confirmation,
        }

         let id = this.props.match.params.id;
         let carrierId = this.props.match.params.carrierId;
         let confirmation = this.props.match.params.confirmation;
         
        
        if(confirmation){
            console.log("-------------------------------")
         console.log(confirmation)
            this.sendRequest(id,carrierId,confirmation);
        }else{
            console.log("-------------------------------")
         console.log(confirmation)
            this.setState({
                heAgrees: this.props.match.params.confirmation,
            })
        }
    }
    //TODO 
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
                    let text = "";
                    if (data.confirmation) {
                        text = "Всё прекрасно, вы подтвердили поездку"
                    }
                    else {
                        text = "Всё прекрасно, вы лишили человека поездки. Теперь вам приятно?"
                    }
                    that.setState({
                        text: text,
                        heAgrees: data.confirmation,
                        isRefreshExist: false
                    })
                }
            })
            .catch(function (error) {
                console.log('bad');
                that.setState({
                    text: 'Всё плохо',
                    isRefreshExist: false
                })
                console.log('An error occurred:', error);
            });
    }

    render() {
        console.log('DriverConfirmation render');

        return (
            <React.Fragment>
                <Helmet>
                    <title>{"Подтверждение поездки"}</title>
                    <meta name="description" content="Подтверждение поездки" />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://tripfer.com/" />
                    <meta property="og:title" content="Подтверждение поездки" />
                    <meta property="og:description" content="Подтверждение поездки на сайте tripfer.com" />            
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
                                        <span className="pt-2 pb-1">Вы подтвердили заказ!</span>
                                        <span1>{this.state.text}<br/>
                                        За неявку на подтвержденный заказ Вы получаете сразу 3 штрафных балла.</span1>
                                    </div>
                                    <div className="d-flex flex-md-row flex-column justify-content-center align-items-center col-md-8 col-12">
                                        <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12" onClick={() => { this.props.history.push("/") }}><span>На главную</span></div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center col-md-5 col-12">
                                        <p>* По достижении 5 баллов Вы будете навсегда отключены из системы.</p>
                                    </div>
                                </div>
                            </React.Fragment> : <React.Fragment>
                            <div className="forgotPasswordContent forgotPasswordContent d-flex flex-column align-items-center py-md-4 py-2 mb-0 mb-5 col-md-9 col-11">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <span className="pt-2 pb-1">Вы действительно хотите отказаться от заказа?</span>
                                        <span1>В случае Вашего отказа от поездки Вам будет начислен 1 штрафной балл из 5 возможных.<br />
                                        За неявку на подтвержденный заказ Вы получаете сразу 3 штрафных балла.
                                        </span1>
                                    </div>
                                    <div className="d-flex flex-md-row flex-column justify-content-center align-items-center col-md-8 col-12">
                                        <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12" style={{background:"#686868"}} onClick={() => { this.setState({confirmation:false}); this.sendRequest(this.state.id,this.state.carrierId,this.state.confirmation); this.props.history.push("/") }}><span>Да</span></div>
                                        <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12" onClick={() => { this.setState({confirmation:true, heAgrees: true });this.sendRequest(this.state.id,this.state.carrierId,this.state.confirmation);}}><span>Нет</span></div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center col-md-5 col-12">
                                        <p>* По достижении 5 баллов Вы будете навсегда отключены из системы.</p>
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