import React from 'react';
import './DriverProfileCalendar.css'
import { connect } from 'react-redux';
import TimePicker from 'react-bootstrap-time-picker';



class DriverProfileCalendarClass extends React.Component {
    constructor(props) {
        super(props);
        this.handleTimeChange = this.handleTimeChange.bind(this);

        this.state = { time: 0 };


    }

    handleTimeChange(time) {
        console.log(time);     // <- prints "3600" if "01:00" is picked
        this.setState({ time });
      }
    

    render() {

        return (
            <div>
               <TimePicker onChange={this.handleTimeChange} value={this.state.time} />

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