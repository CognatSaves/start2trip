import React from 'react';
import {connect} from 'react-redux';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Header from '../header/Header';
class DriverConfirmationClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: 'Ожидаем ответа',
            isRefreshExist: true
        }
        
        let id = this.props.match.params.id;
        let carrierId = this.props.match.params.carrierId;
        let confirmation = this.props.match.params.confirmation;
        let body = JSON.stringify({
            id: id,
            carrierId: carrierId,
            frontendAddress: requests.frontendAddress,
            confirmation: confirmation
        });
        let that=this;
        fetch(requests.carrierConfirmation,{
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
                let text = "";
                if(data.confirmation){
                    text = "Всё прекрасно, вы подтвердили поездку"
                }
                else{
                    text = "Всё прекрасно, вы лишили человека поездки. Теперь вам приятно?"
                }
                that.setState({
                    text:text,
                    isRefreshExist:false
                })
            }
        })
        .catch(function (error){
            console.log('bad');
            that.setState({
                text: 'Всё плохо',
                isRefreshExist:false
            })
            console.log('An error occurred:',error);
        });
    }
    render(){
        console.log('DriverConfirmation render');
        
        return(
            <React.Fragment>
                {
                    this.state.isRefreshExist ?
                    <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true}/>
                    :
                    <div className="forgotPasswordBody d-flex flex-column align-items-center">
                        <Header driver={true} history={this.props.history} />
                        <div className="forgotPasswordSuccess forgotPasswordContent d-flex flex-column align-items-center col-md-7 col-11">
                            {this.state.text}
                        </div>
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