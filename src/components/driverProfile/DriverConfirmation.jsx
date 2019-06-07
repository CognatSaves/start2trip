import React from 'react';
import {connect} from 'react-redux';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';

class DriverConfirmationClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: 'Ожидаем ответа',
            isRefreshExist: true
        }
        //debugger;
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
                    <div>
                        {this.state.text}
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