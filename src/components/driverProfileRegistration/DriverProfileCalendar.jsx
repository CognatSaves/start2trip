import React from 'react';
import './DriverProfileCalendar.css'
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';



class DriverProfileCalendarClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chipData: [
                { key: 0, label: 'Angular' },
                { key: 1, label: 'JQuery' },
                { key: 2, label: 'Polymer' },
                { key: 3, label: 'ReactJS' },
            ]
        }
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            },
        };


    }
    handleRequestDelete = (key) => {

        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({ chipData: this.chipData });
    };



    render() {
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: "#304269", //Button cansel / ok
                primary2Color: "#f60", //Focus date
                // primary3Color: "#f60", // Null
                // accent1Color: "#f60", // Null
                // accent2Color: "#f60", // Null
                // accent3Color: "#f60", // Null
                textColor: "#fff",
                // alternateTextColor: white, // Color text
                // canvasColor: "#f60", // bacgraund color 
                // borderColor: "#f60", // border-bottom color
                // disabledColor: "#f60", // PleseHolder
                pickerHeaderColor: "#304269", // Calendar header collor
                // clockCircleColor: "#f60", // Null
                // shadowColor: "#f60", // BoxShadow
            },
            fontFamily: 'Roboto',
            fontSize: "18px",
        });


        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                <div style={this.styles.wrapper}>
                    {this.state.chipData.map((element, index) =>
                        <Chip
                            key={element.key}
                            onRequestDelete={() => this.handleRequestDelete(element.key)}
                            labelStyle={{color:"#fff"}}
                            labelColor="#f60"
                            textColor="#fff"
                            style={this.styles.chip}
                            className="chipClass"
                        >
                            {element.label}
                        </Chip>
                    )}

                </div>
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