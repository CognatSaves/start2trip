import React, { Component } from 'react';
import './AutoMenu.css'

export default class LanguageMenu extends React.Component{
    constructor(props) {
        super(props);      
      }
    render(){        
        if(this.props.isVisible){
            return(
                <div className="drivers_properties_autoMenu" >
                    {this.props.autoVariants.map((element,index)=>
                        <div className="autoMenu_element">
                            <div className="autoMenu_element_textBlock">
                                <div className="autoMenu_element_picture"/>
                                <div className="autoMenu_element_text">{element}</div>
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