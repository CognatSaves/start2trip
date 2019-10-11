import React from 'react';
import { connect } from 'react-redux';

import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class PartnerRegisterClass extends React.Component {
    constructor(props) {
        super(props);

        let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
        console.log(this.props.history);
        let values = this.props.history.location.pathname.split('/');
        let cookieValue = values[2];
        cookies.set('partner', cookieValue, { path: '/', expires: date });
        switch (values[1]) {
            case 'register': {
                this.props.history.push('/'+ cookies.get('userLangISO', { path: "/" }) +'/login/');
                break;
            }
            case 'start': {
                this.props.history.push('/countrySelection/');
                //this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/');
                break;
            }
            default:
        }
    }

    componentWillMount(){
        startRefresherGlobal(this)
    }
    componentWillUnmount(){
        thenFuncGlobal(this)
    }
    render() {
        return (
            <></>
            
        )
    }

}

const PartnerRegister = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,

    }),
)(PartnerRegisterClass);

export default PartnerRegister;