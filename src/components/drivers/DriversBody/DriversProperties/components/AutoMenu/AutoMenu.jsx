import React from 'react';
import './AutoMenu.css'
import { connect } from 'react-redux';
import { setAuto } from "../../../../../../redusers/Action"
import requests from '../../../../../../config';

import sedan from '../../../../../media/sedan.svg';
import jeep from '../../../../../media/jeep.svg';
import microbus from '../../../../../media/microbus.svg';
import minivan from '../../../../../media/minivan.svg';

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
// import InputLabel from '@material-ui/core/InputLabel';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 300,
            width: 220,
            background: "#828ca5",
            color: "#fff",
            marginTop: '56px',
            boxShadow: "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
        },
    },
};

class AutoMenuClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carName: [],
            carValue: [],
            carTypeIds: []
        }
    }
    handleChange = (e, value) => {

        let carTypesArray = this.props.driversState.carTypes;
        let newArrayVariants = this.state.carValue;
        //let newEl = -1;
        let arrayIndex = carTypesArray.indexOf(value.props.value);
        let newEl = newArrayVariants.indexOf(arrayIndex);

        //console.log(index);

        if (newEl === -1) {
            newArrayVariants.push(arrayIndex);
        } else {
            newArrayVariants.splice(newEl, 1);
        }


        let carName = e.target.value;
        if (carName.length > newArrayVariants.length) {
            carName.splice(0, 1);
        }

        this.setState({ carName: carName, carValue: newArrayVariants })
        this.props.dispatch(setAuto(newArrayVariants))

    }
    render() {

        if (this.props.isVisible && this.props.driversState.carTypes.length > 0) {
            function createCarTypesString(carTypes, selectedIndexes) {
                let nameArray = [];
                for (let i = 0; i < selectedIndexes.length; i++) {
                    nameArray[i] =/*carTypes[selectedIndexes[i]].name_en;*/getCorrectTypeName(carTypes[selectedIndexes[i]], language);
                }
                return nameArray;
            }
            function getCorrectTypeName(carType, langISO) {
                if (langISO === 'RUS') {
                    return carType.name_ru;
                }
                else {
                    return carType.name_en;
                }
            }

            let language = this.props.storeState.languages.length > 0 ?
                this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO : 'ENG';
            let pictureArray = [sedan, jeep, minivan, microbus];
            let textInfoMain = this.props.storeState.languageTextMain.drivers.driversProperties;

            let nameArray = createCarTypesString(this.props.driversState.carTypes, this.state.carValue);

            return (
                <FormControl className="classFormControl">
                    <Select
                        multiple
                        value={nameArray.length > 0 ? nameArray : [textInfoMain.anyCar]/*this.state.carName.length>0 ? this.state.carName : [textInfoMain.anyCar]*/}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {this.props.driversState.carTypes.map((element, index) => (
                            <MenuItem key={index} value={element}>
                                <Checkbox color="#fff" checked={this.state.carValue.indexOf(index) > -1} />
                                <ListItemText primary={getCorrectTypeName(element, language)} />
                                <div className="autoMenu_element_picture">
                                    <img src={requests.serverAddressImg + element.carTypeImage} width="80%" height="80%" alt={"auto_" + index}></img>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )
        }
        else {
            return (
                <React.Fragment />
            )
        }
    }
}
const AutoMenu = connect(
    (state) => ({
        storeState: state.AppReduser,
        driversState: state.DriversReduser,
    }),
)(AutoMenuClass);

export default AutoMenu;