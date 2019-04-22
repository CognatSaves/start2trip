import React from 'react';
import './DriverProfileCalendar.css'
import { connect } from 'react-redux';




class DriverProfileCalendarClass extends React.Component {
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

const DriverProfileCalendar = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(DriverProfileCalendarClass);

export default DriverProfileCalendar;