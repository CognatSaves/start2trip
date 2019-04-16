import React from 'react';
import './DriverProfileCalendar.css'
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



class DriverProfileCalendarClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }


    }



    render() {
        const muiTheme = getMuiTheme({
            palette: {
                 primary1Color: "#304269", //Button cansel / ok
                 primary2Color: "#f60", //Focus date
                // primary3Color: "#f60", // Null
                // accent1Color: "#f60", // Null
                // accent2Color: "#f60", // Null
                // accent3Color: "#f60", // Null
                textColor: "#304269",
                // alternateTextColor: white, // Color text
                // canvasColor: "#f60", // bacgraund color 
                // borderColor: "#f60", // border-bottom color
                // disabledColor: "#f60", // PleseHolder
                 pickerHeaderColor: "#304269", // Calendar header collor
                // clockCircleColor: "#f60", // Null
                // shadowColor: "#f60", // BoxShadow
            },
            fontFamily: 'Roboto',
        });

        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <DatePicker hintText="Portrait Dialog" />
                </MuiThemeProvider>

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