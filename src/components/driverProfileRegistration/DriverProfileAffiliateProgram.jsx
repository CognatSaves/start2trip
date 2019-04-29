import React from 'react';
import './DriverProfileAffiliateProgram.css'
import { connect } from 'react-redux';




class DriverProfileAffiliateProgramClass extends React.Component {
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

const DriverProfileAffiliateProgram = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileAffiliateProgramClass);

export default DriverProfileAffiliateProgram;