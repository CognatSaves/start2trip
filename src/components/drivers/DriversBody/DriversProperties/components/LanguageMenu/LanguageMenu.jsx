import React, { Component } from 'react';
import { connect } from 'react-redux';
import {languageValueChooseDispatch,languageMenuIsVisibal} from "../../../../../../redusers/Action"
import './LanguageMenu.css'

 class LanguageMenuClass extends React.Component {
    constructor(props) {
        super(props);
    }
    languageValueChoose(value, icon) {
        this.props.dispatch(languageValueChooseDispatch(value,icon));
        this.props.dispatch(languageMenuIsVisibal(false));
      }
    render() {
        if (this.props.isVisible) {
            return (
                <div className="drivers_properties_languageMenu" >
                    {this.props.storeState.languages.map((element, index) =>
                        <div className="languageMenu_element" onClick={() => this.languageValueChoose(element.languageName,element.icon)}>
                            <img src={element.icon} alt="icon" width="15px" height="15px" />
                            <div className="textBlock_value">
                                {element.languageName}
                            </div>
                        </div>
                    )}
                </div>
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