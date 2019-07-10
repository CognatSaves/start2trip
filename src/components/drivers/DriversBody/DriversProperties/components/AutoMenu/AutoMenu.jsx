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



const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 300,
            width: 220,
            background:"#828ca5",
            color:"#fff",
            marginTop:'56px',
            boxShadow:"0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
        },
    },
};

class AutoMenuClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carValue: ["Любой автомобиль"],
        }
    }
    handleChange = (e) => {
        if(e.target.value[0]==="Любой автомобиль"){
            e.target.value.splice(0,1);
        }
        if(e.target.value.length===0){
            e.target.value.splice(0,1,"Любой автомобиль");
        }
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
                     {/* <InputLabel htmlFor="select-multiple-checkbox">Любой автомобиль</InputLabel>  */}
                    <Select
                        multiple
                        value={this.state.carValue}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {/* <MenuItem disabled>Выберите типы</MenuItem> */}
                        {this.props.storeState.autoVariants.map((element, index) => (
                            <MenuItem key={element} value={element}>
                                <Checkbox color="#fff" checked={this.state.carValue.indexOf(element) > -1} />
                                <ListItemText primary={element} />
                                <div className="autoMenu_element_picture">
                                    <img src={pictureArray[index]} width="80%" height="80%" alt={"auto_" + index}></img>
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