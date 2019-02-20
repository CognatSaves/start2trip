import React, { Component } from 'react';
import './PagesMenu.css'


export default class PagesMenu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.isVisible){
            return(
                <div className="drivers_properties_pagesMenu">
                    {this.props.variants.map((element,index) => 
                        <div className="pagesMenu_element">
                            <div className="pagesMenu_element_text" onClick={()=>this.props.chooseFunc(element)}>
                                <div className="pagesMenu_element_text_value">{element}</div>
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
                        <div className="pagesMenu_element">
                            <div className="pagesMenu_element_text" onClick={()=>this.props.chooseFunc(element)}>
                                <div className="pagesMenu_element_text_value">{element}</div>
                            </div>
                        </div>

*/
/*

 {this.props.variants.map((element,index) => 
                        <div className="pagesMenu_element">
                            <div className="pagesMenu_element_text" onClick={()=>this.props.chooseFunc(element)}>
                                <div className="pagesMenu_element_text_value">{element}</div>
                            </div>
                        </div>
                    )}

                    */