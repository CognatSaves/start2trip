import React from 'react';
import Header from '../header/Header';
import requests from '../../config';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';

class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        let code = this.props.match.params.code;
        this.state = {
            passwords: ["",""],
            code: code,
            isSended: false,
            isRefreshExist: false,
            isGood: true,
            isRefreshing: true,
            isChanged: false
        }
        if(code.length===0){
            this.props.history.push('/');
        }
        this.passwordonchange = this.passwordonchange.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }
    passwordonchange(value, number){
        let passwords = this.state.passwords;
        passwords[number]=value;
        this.setState({
            isChanged: true,
            passwords: passwords
        });
    }
    sendRequest(){
        if(this.state.isChanged){
            if(this.state.passwords[0]===this.state.passwords[1] && this.state.passwords[0].length>0 ){
                this.setState({
                    isSended: false,
                    isRefreshExist: true,
                    isRefreshing: true,
                    isChanged: false
                })
                let body = JSON.stringify({
                    password: this.state.passwords[0],
                    passwordConfirmation: this.state.passwords[1],
                    code: this.state.code
                });
                let that = this;
                fetch(requests.resetPassword,{
                    method: 'POST', body: body
                })
                .then(response =>{
                    return response.json();
                })
                .then(function (data){
                    console.log('reset password server answer');
                    console.log(data);
                    if(data.error){
                        throw Error('самшит');
                    }
                    if(data.message){
                        if(data.message==="Too many attempts, please try again in a minute."){
                        //throw Error('не кликой. подумой! а то я сейчас кликну!');
                            //that.props.history.push('/');
                            setTimeout(()=>{
                                that.setState({
                                    isSended: true,
                                    isGood: false,
                                    isRefreshExist: false
                                });
                            }, 60000);
                        }
                    }
                    else{
                        that.setState({
                            isSended: true,
                            isGood: true,
                            isRefreshing: false
                        });
                        setTimeout(()=>{
                            that.setState({
                                isRefreshExist: false
                            });
                            that.props.history.push('/');
                        }, 1000);
                    }
                    
                })
                .catch(function (error){
                    console.log("bad");
                    console.log('An error occurred:', error);
                    that.setState({
                        isSended: true,
                        isGood: false,
                        isRefreshExist: false
                    });
                });
            } 
            else{
                alert('Unsimular passwords');
            }
        }
        else{
            alert('Измени хоть что!');
        }
    }
    render(){
        console.log('Reset password render');
        console.log(this.state);
        return(
            <React.Fragment>
                <Header driver={true} history={this.props.history}/>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={true}/>
                
                <div className="d-flex flex-column">
                    <div>Введите новый пароль для вашего аккаунта</div>
                    <div>Пароль</div>
                    <input value={this.state.passwords[0]} onChange={(e)=>this.passwordonchange(e.target.value,0)}></input>
                    <div>Повторите пароль</div>
                    <input value={this.state.passwords[1]} onChange={(e)=>this.passwordonchange(e.target.value,1)}></input>
                    <button onClick={()=>this.sendRequest()}>Отправить данные</button>
                    {
                        this.state.isSended ? 
                        <div>{this.state.isGood ? 'Пароль вашего аккаунта перезаписан' : 'Пароль вашего аккаунта перезаписать не удалось'}</div> :
                        <React.Fragment/>
                    }
                </div>
            </React.Fragment>
        )
    }
}
export default ResetPassword;