import React from 'react';
import requests from '../../config';
import axios from 'axios';

class Registration extends React.Component{
    constructor(props){
        super(props);
        let that = this;
        function sendResult(type,data){
            //alert('send result');
            console.log('sendResult');
            console.log("window");
            console.log(window); 
            let date = new Date(Date.now()+1000*3600*24*60); 
            if(type===true){
                console.log("good");
                console.log('jwt');
                console.log(data.jwt);                
                let jwtstring = "jwt="+data.jwt+"; expires="+date.toString();
                let jwtstatus = "jwtstatus="+'correct'+"; expires="+date.toString();
                window.opener.localStorage.setItem('errorId', 0);
                window.opener.document.cookie=jwtstring;
                window.opener.document.cookie=jwtstatus;
                let avatarString="avatarUrl="+requests.serverAddress+data.user.avatarUrl+"; expires="+date.toString();
                let usernameString = "userName="+data.user.userName+"; expires="+date.toString();
                window.opener.document.cookie=avatarString;
                window.opener.document.cookie=usernameString;                            
            }
            else{
                console.log("Failed");
                let jwtstring = "jwt=-; expires="+date.toString();
                console.log("error");
                console.log(data);
                console.log(data.error);
                let jwtstatus = "jwtstatus="+data.error.message+"; expires="+date.toString();
                console.log('jwtstatus');
                console.log(jwtstatus);
                if(data.error){
                    if(data.error.errorId){
                        window.opener.localStorage.setItem('errorId', data.error.errorId);
                    }
                }             
                window.opener.document.cookie=jwtstring;
                window.opener.document.cookie=jwtstatus;
            }           
            window.close();
        }
        function socialWebRegistrationRequest(body){
            console.log("registration");
            fetch(requests.serverRegistrationRequest, {method: 'POST',body:body,
                headers:{'content-type': 'application/json'}})
                .then(response => {
                    console.log("response");
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {                
                    if(data.error){
                        console.log("You not registered");
                        throw data.error;
                    }
                    else{
                        console.log("You registered");  
                        that.state.sendResult(true,{jwt:data.jwt, user: data.user});       
                    }
                })
                .catch(function(error) {
                    console.log("bad");
                    console.log('An error occurred:', error);
                    that.state.sendResult(false,{error: error});
                });
        }
        function socialWebAuthorizationRequest(body){
            //alert('web registration');
            fetch(requests.serverAuthorizationRequest, {method: 'POST',body:body,
            headers:{'content-type': 'application/json'}})
            .then(response => {
                return response.json();
            })
            .then(function (data) {  
                if(data.error){
                    console.log("You not authorized");
                    throw data.error;
                }
                console.log("You authorized"); 
                console.log(data);              
                that.state.sendResult(true,{jwt:data.jwt, user: data.user});
            })
            .catch(function(error) {
                console.log('An error occurred:');
                console.log(error);
                that.state.sendResult(false,{error: error});
            });
            console.log(body);
        }
        function generatePassword(num) {
            var length = num,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        } 
        this.state={
            socialWebRegistrationRequest:socialWebRegistrationRequest,
            socialWebAuthorizationRequest:socialWebAuthorizationRequest,
            sendResult:sendResult
        }
        let urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('access_token');
        //alert("Registration component");
        console.log("Registration component");
        console.log(window.location.pathname);
        let type=window.opener.localStorage.getItem('type');
        let userType = Number.parseInt(window.opener.localStorage.getItem('userType'));
        if(window.location.pathname==="/registration/facebook"){
           // alert('token');
            //console.log('token');
           // console.log(token);
            if(token){
               // console.log('window.name');
               // console.log(window.name);
                if(type==="Registration"){ 
                    axios.get('https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token='+token)
                    .then(response => {
                  //  console.log("get answer from facebook");
                                                                        
                            let password = generatePassword(10);
                            let body = JSON.stringify({
                                username: response.data.email,
                                email: response.data.email,
                                password: password,
                                isCustomer: userType===1 ? true : false,
                                isDriver: userType===2 ? true : false,                         
                                isAgency: userType===3 ? true : false,
                                provider: 'facebook'
                                });
                            console.log()
                            this.state.socialWebRegistrationRequest(body);
                    })
                    .catch(function(error) {
                        console.log('An error occurred:', error);
                    });
                }
                if(type==="Authorization"){
                    console.log("Try to authorizate facebook");
                    axios.get('https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token='+token)
                    .then(response => {
                        let body = JSON.stringify({
                            token: token,
                            provider: 'facebook',
                            email: response.data.email
                        });
                        this.state.socialWebAuthorizationRequest(body);
                    })
                    .catch(function(error) {
                        console.log('An error occurred:', error);
                    });                                            
                }              
            }
        }
        if(window.location.pathname==="/registration/google"){
            if(token){
                let id_token = urlParams.get('raw[id_token]');
                if(type==="Registration"){                    
                    axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token='+token+'&id_token='+id_token) 
                    .then(response => {
                        let password = generatePassword(10);
                        let body = JSON.stringify({
                            username: response.data.email,
                            email: response.data.email,
                            password: password,
                            isCustomer: userType===1 ? true : false,
                            isDriver: userType===2 ? true : false,                         
                            isAgency: userType===3 ? true : false,
                            provider: 'google'
                        });
                        this.state.socialWebRegistrationRequest(body);
                    })
                    .catch(function(error) {
                        console.log('An error occurred:', error);
                    });
                }
                if(type==="Authorization"){
                    axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token='+token+'&id_token='+id_token)
                    .then(response => {
                        console.log("Try to authorizate google");
                        let body = JSON.stringify({
                            token: token,
                            id_token: id_token,
                            email: response.data.email,
                            provider: 'google'
                        });
                        this.state.socialWebAuthorizationRequest(body);
                    })
                    .catch(function(error) {
                        console.log('An error occurred:', error);
                    });
                }
            }
        }
        //console.log("requests string");
       // console.log(requests);
    }
    render(){
        return(
            <React.Fragment>
            </React.Fragment>
        )
    }
}
export default Registration;