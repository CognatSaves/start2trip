import React from 'react';
import './pageNotFound.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
import axios from 'axios';
import requests from './config';

import Header from './components/header/Header';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class pageNotFoundClass extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    // componentWillMount(){
        
    //     axios.get(requests.errorMessage)
    //         .then(response => {
    //           console.log('');
    //         })
    //         .catch(error => {
    //           console.log('error');
    //         })
    // }
    render() {
        let pageNotFound = this.props.storeState.languageTextMain.home.pageNotFound;
        return (
            <>
                <Header history={this.props.history} />
                <div className="pageNotFound d-flex flex-column justify-content-between align-items-center" >
                    <span style={{height:"50%" }}>{pageNotFound.title}</span>
                    <div className="d-flex flex-column justify-content-center align-items-center h-50">
                        <span>{pageNotFound.text1}{isMobileOnly ? <br /> : <React.Fragment />}{pageNotFound.text2}</span>
                        <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/"}>{pageNotFound.link}</Link>
                    </div>

                </div>
            </>
        )
    }
}

const pageNotFound = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalhistory: state.GlobalReduser,
    }),
)(pageNotFoundClass);

export default pageNotFound;
