import React from 'react';
import Header from '../header/Header';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
class ForgotPassword extends React.Component{
    constructor(props){
        super(props);       
        this.state={
            email: '',
            isSended: false,
            isRefreshExist: false,
            isGood: true,
            isChanged: false
        };
        
        this.emailonchange = this.emailonchange.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }
    emailonchange(value){   
        this.setState({
            email: value,
            isChanged: true
        });
    }
    sendRequest(){
        if(this.state.isChanged){
            console.log('You want to send that kek');
            console.log(this.state.email);
            this.setState({
                isSended: false,
                isRefreshExist: true,
                isChanged: false
            })
            let body = JSON.stringify({
                email: this.state.email,
                url: requests.frontendAddress+'/reset-password'
            });
            let that = this;
            fetch(requests.forgotPassword, {
                method: 'POST', body: body
            })
            .then(response =>{
                return response.json();
            })
            .then(function (data){
                console.log('data');
                console.log(data);
                if(data.error){
                    throw Error(data.error.errorMsg);
                }
                if(data.message){
                    if(data.message==="Too many attempts, please try again in a minute."){
                    //throw Error('не кликой. подумой! а то я сейчас кликну!');
                        that.props.history.push('/');
                    }
                }
                that.setState({
                    isSended: true,
                    isGood: true,
                    isRefreshExist: false
                });
            })
            .catch(function (error){
                console.log("bad");
                console.log('An error occurred:', error);
                that.setState({
                    isSended: true,
                    isGood: false,
                    isRefreshExist: false
                });
            })
        }
        else{
            alert('Измени хоть что!');
        }
    }
    render(){
        console.log('Forgot password render');
        console.log(this.state);
        return(
            <React.Fragment>
                <Header driver={true} history={this.props.history}/>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={true} isGoodAnswer={true}/>
                <div className="d-flex flex-column">
                    <div>
                        Здесь вы можете восстановить ваш пароль
                    </div>
                    <div>
                        Введите адрес вашей почты
                    </div>
                    <input value={this.state.email} onChange={(e)=>this.emailonchange(e.target.value)}></input>
                    <button onClick={()=>this.sendRequest()}>Попытать счастья!</button>
                    {
                        this.state.isSended ? 
                        <div>{this.state.isGood ? 'Всё отправлено, ловите письмо' : 'Всё плохо'}</div> :
                        <React.Fragment/>
                    }
                </div>

            </React.Fragment>
        )
    }
}

export default ForgotPassword;