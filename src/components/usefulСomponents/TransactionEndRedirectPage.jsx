import React from 'react';
import requests from '../../config';


export default class TransactionEndRedirectPage extends React.Component {
    constructor(props) {
        super(props);
        debugger;
        let body = JSON.stringify({
            l: 'let',
            a: [1,2]
        })
        //console.log('TransactionEndRedirectPage');
        // fetch(requests.serverAddress + '/paymenttransaction/end', {
        //     method: 'POST', body:body,
        //     headers: { 'content-type': 'application/json'}
        // })
    }
    render(){
        return(
            <div>
                TransactionEndRedirectPage!
            </div>
        )
    }
}