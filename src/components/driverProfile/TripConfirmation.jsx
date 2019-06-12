import React from 'react';
import {connect} from 'react-redux';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Header from '../header/Header';
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
const TripConfirmation = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
        commentState: state.CommentReduser
    }),
)(TripConfirmationClass);

export default TripConfirmation;