import React from 'react';
import {connect} from 'react-redux';
import requests from '../../config';
class TripConfirmationClass extends React.Component{
    constructor(props){
        super(props);
        //debugger;
        console.log(this.props);
        let id = this.props.match.params.id;
        let userId = this.props.match.params.userId;
        let body = JSON.stringify({id: id, userId:userId, frontendAddress: requests.frontendAddress});
        let that = this;
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
                    text: 'Всё прекрасно'
                })
            }
        })
        .catch(function (error){
            console.log('bad');
            that.setState({
                text: 'Всё плохо'
            })
            console.log('An error occurred:',error);
        });
        this.state = {
            text: 'Ожидайте ответа'
        }
    }
    render(){
        console.log('TripConfirmation render');
        return(
            <div>
                {this.state.text}
            </div>
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