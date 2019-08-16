import React from 'react';

import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class PartnerRegister extends React.Component {
    constructor(props) {
        super(props);

        let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
        console.log(this.props.history);
        let values = this.props.history.location.pathname.split('/');
        let cookieValue = values[2];
        cookies.set('partner', cookieValue, { path: '/', expires: date });
        switch (values[1]) {
            case 'register': {
                this.props.history.push('/login');
                break;
            }
            case 'start': {
                this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes');
                break;
            }
            default:
        }
    }
    render() {
        return (
            <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true} />
        )
    }
}