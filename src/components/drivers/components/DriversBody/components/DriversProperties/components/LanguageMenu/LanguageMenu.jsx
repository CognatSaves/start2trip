import React, { Component } from 'react';
import './LanguageMenu.css'

export default class LanguageMenu extends React.Component{
    constructor(props) {
        super(props);      
      }
    render(){        
        if(this.props.isVisible){
            return(
                <div className="drivers_properties_languageMenu" >
                    {this.props.languages.map((element,index)=>
                        <div className="languageMenu_element">                               
                            <div className="languageMenu_element_flag"/>
                                <div className="textBlock_value">
                                    {element.languageName}
                                </div>                                 
                        </div>
                    )}
                </div>
            )
        }
        else{
            return(
                <React.Fragment></React.Fragment>
            )
        }
    }
}
