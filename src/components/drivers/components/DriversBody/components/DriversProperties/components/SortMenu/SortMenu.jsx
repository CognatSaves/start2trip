import React, { Component } from 'react';
import './SortMenu.css'


export default class SortMenu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.isVisible){
            return(
                <div className="drivers_properties_sortMenu">
                    {this.props.variants.map((element,index) => 
                        <div className="sortMenu_element">
                            <div className="sortMenu_element_text" onClick={()=>this.props.chooseFunc(element)}>
                                <div className="sortMenu_element_text_value">{element}</div>
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


/*

<div className="sortMenu_element">
                        <div className="sortMenu_element_text">A</div>
                    </div>
                    <div className="sortMenu_element">B</div>
                    <div className="sortMenu_element">C</div>


                    */