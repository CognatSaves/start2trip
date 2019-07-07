import React from 'react';
import './AutoMenu.css'
import { connect } from 'react-redux';
import { setAuto } from "../../../../../../redusers/Action"
import sedan from './pictures/sedan.svg';
import jeep from './pictures/jeep.svg';
import microbus from './pictures/microbus.svg';
import minivan from './pictures/minivan.svg';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


const ITEM_HEIGHT = 98;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            background:"#828ca5",
            color:"#fff",
        },
    },
};
class AutoMenuClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carValue: [],
        }
    }
    handleChange = (e) => {
        this.setState({ carValue: e.target.value })
    }
    render() {

        if (this.props.isVisible) {
            let pictureArray = [sedan, jeep, minivan, microbus];
            return (
                // <div className="drivers_properties_autoMenu" >
                //     {this.props.storeState.autoVariants.map((element,index)=>
                //         <div className="autoMenu_element">
                //             <div className="autoMenu_element_textBlock" onClick={()=>this.props.dispatch(setAuto(element,pictureArray[index]))}>
                //                 <div className="autoMenu_element_picture">
                //                     <img src={pictureArray[index]} width="100%" height="100%" alt={"auto_"+index}></img>
                //                 </div>
                //                 <div className="autoMenu_element_text">{element}</div>
                //             </div>
                //         </div>
                //     )}
                // </div>
                <FormControl className="classFormControl">
                    {/* <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel> */}
                    <Select
                        multiple
                        value={this.state.carValue}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {this.props.storeState.autoVariants.map((element, index) => (
                            <MenuItem key={element} value={element}>
                                <Checkbox color="#fff" checked={this.state.carValue.indexOf(element) > -1} />
                                <ListItemText primary={element} />
                                <div className="autoMenu_element_picture">
                                    <img src={pictureArray[index]} width="100%" height="100%" alt={"auto_" + index}></img>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        }
        else {
            return (
                <React.Fragment></React.Fragment>
            )
        }
    }
}
const AutoMenu = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(AutoMenuClass);

export default AutoMenu;