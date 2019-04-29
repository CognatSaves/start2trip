import React from 'react';
import './DriverProfileBilling.css'
import { connect } from 'react-redux';




class DriverProfileBillingClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

         };


    }

    

    render() {

        return (
            <div>
             

            </div>
        );
    }
}

const DriverProfileBilling = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileBillingClass);

export default DriverProfileBilling;