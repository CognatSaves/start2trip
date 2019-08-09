import React from 'react';
import './pageNotFound.css'
import Header from './components/header/Header';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Cookies from 'universal-cookie';
import { isMobileOnly } from 'react-device-detect';
const cookies = new Cookies();

class pageNotFoundClass extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    
    render(){
        let textInfoMain = this.props.storeState.languageTextMain.header;
        return(
            <React.Fragment>
            <Header  history={this.props.history} />
            <div className="pageNotFound d-flex flex-column justify-content-between align-items-center" >
                <span style={isMobileOnly?{paddingTop:"12%"}:{paddingTop:"8%"}}>{textInfoMain.pageNotFound.title}</span>
                <div className="d-flex flex-column justify-content-center align-items-center">
        <span>{textInfoMain.pageNotFound.text1}{isMobileOnly?<br />:<React.Fragment /> }{textInfoMain.pageNotFound.text2}</span>
                <Link to={"/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+"/routes"}>{textInfoMain.pageNotFound.link}</Link>
                </div>
                
            </div>
            </React.Fragment>
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
