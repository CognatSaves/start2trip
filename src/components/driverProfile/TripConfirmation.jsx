import React from 'react';
import {connect} from 'react-redux';
import requests from '../../config';
import '../registration/ForgotPassword.css'
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Header from '../header/Header';
import {Helmet} from 'react-helmet';
class TripConfirmationClass extends React.Component{
    constructor(props){
        super(props);
        
        console.log(this.props);
        let id = this.props.match.params.id;
        let userId = this.props.match.params.userId;
        let body = JSON.stringify({id: id, userId:userId, frontendAddress: requests.frontendAddress});
        let that = this;
        this.state = {
            text: 'Ожидайте ответа',
            isRefreshExist: true
        }
        fetch(requests.customerConfirmation,{
            method: 'POST', body: body,
            headers: {'content-type': 'application/json'}
        })
        .then(response => {
            return response.json();
        })
        .then(function (data){
            if (data.error) {
                console.log("bad");
                throw data.error;
            }
            else{
                console.log('good');
                console.log(data);
                that.setState({
                    text: 'Всё прекрасно',
                    isRefreshExist: false
                })
            }
        })
        .catch(function (error){
            console.log('bad');
            that.setState({
                text: 'Всё плохо',
                isRefreshExist: false
            })
            console.log('An error occurred:',error);
        });
        
    }
    render(){
        console.log('TripConfirmation render');
        
        console.log(this.state);
        let helmet = this.props.storeState.languageTextMain.helmets.tripConfirmation;
        
        return(
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
                    <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true}/>
                    :
                    <div className="home_window" style={{ minHeight: "95vh" }}>
                    <Header driver={true} history={this.props.history} />
                    <div className="forgotPasswordContent d-flex flex-column align-items-center col-md-8 col-12 mx-auto">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <span className="pt-2 pb-1">Ваш заказ подтверждён!</span>
                                <span1>{this.state.text}</span1>
                            </div>
                            <div className="d-flex flex-md-row flex-column justify-content-center align-items-center col-md-8 col-12">
                                    <div className="forgotPasswordBt d-flex justify-content-center align-items-center col-md-5 col-12" onClick={() => {this.props.history.push("/")}}><span>На главную</span></div>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center col-md-5 col-12">
                                <p>Вы можете посмотреть информацию о поездке в Вашем личном кабинете на нашем сайте.</p>
                            </div>
                        </div>
                    </div>
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