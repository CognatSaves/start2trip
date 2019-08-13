import React from 'react';
import { connect } from 'react-redux';
import { languageValueChooseDispatch, languageMenuIsVisibal } from "../../../../../../redusers/Action"
import './LanguageMenu.css'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import requests from '../../../../../../config';
import { number } from 'prop-types';


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


class LanguageMenuClass extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            languageName: [],
            LanguageValue: [],
        }
    }
    handleChange = (e, value) => {
        /*
        if (e.target.value[0] === textInfoMain.anyLanguage) {
            e.target.value.splice(0, 1);
        }
        if (e.target.value.length === 0) {
            e.target.value.splice(0, 1, textInfoMain.anyLanguage);
        }*/
        
        let newArrayVariants = this.state.LanguageValue;
        let newEl = newArrayVariants.indexOf(Number(value.key))
        if (newEl === -1) {
            newArrayVariants.push(Number(value.key))
        } else {
            newArrayVariants.splice(newEl, 1)
        }
        let languageName = e.target.value;
        if(languageName.length>newArrayVariants.length){//значит спереди стоит слово - любой язык
            languageName.splice(0,1);
        }
        this.setState({ languageName: languageName, LanguageValue: newArrayVariants })
        this.languageValueChoose(newArrayVariants)
    }
    languageValueChoose(value) {
        this.props.dispatch(languageValueChooseDispatch(value));
      }
    render() {
        let textInfoMain = this.props.storeState.languageTextMain.drivers.driversProperties;
        if (this.props.isVisible) {
            return (
                // <div className="drivers_properties_languageMenu" >
                //     {this.props.storeState.languages.map((element, index) =>
                //         <div className="languageMenu_element" onClick={() => this.languageValueChoose(element.languageName,element.icon)}>
                //             <img src={element.icon} alt="icon" width="15px" height="15px" />
                //             <div className="textBlock_value">
                //                 {element.languageName}
                //             </div>
                //         </div>
                //     )}
                // </div>

                <FormControl className="classFormControlLanguage">
                    {/* <InputLabel htmlFor="select-multiple-checkbox">Любой автомобиль</InputLabel>  */}
                    <Select
                        multiple
                        value={this.state.languageName.length>0 ? this.state.languageName : [textInfoMain.anyLanguage]/*this.state.languageName*/}

                        //this.state.languageName.length>0 ? this.state.languageName : ['Тут никого нет']
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {/* <MenuItem disabled>Выберите типы</MenuItem> */}
                        {this.props.storeState.languages.map((element, index) => (
                            <MenuItem key={index} value={element.languageName}>
                                <Checkbox color="#fff" checked={this.state.languageName.indexOf(element.languageName) > -1} />
                                <ListItemText primary={element.languageName} />
                                <div className="autoMenu_element_picture">
                                    <img src={requests.serverAddressImg + element.icon.url} width="50%" height="50%" alt={"auto_" + index}></img>
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

const LanguageMenu = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(LanguageMenuClass);

export default LanguageMenu;