import React, { Component } from 'react';
import './LanguageMenu.css'


export default class LanguageMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.isVisible) {
            return (
                <div className="drivers_properties_languageMenu" >
                    {this.props.languages.map((element, index) =>
                        <div className="languageMenu_element" onClick={() => this.props.languageValueChoose(element.languageName)}>
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
