import React, { Component } from 'react';
import './DriversBody.css'
import DriversBlock from './DriversBlock/DriversBlock.jsx';
import DriversCommercial from './DriversCommercial/DriversCommercial.jsx';
import DriversProperties from './DriversProperties/DriversProperties.jsx';


export default class DriversBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div className = "drivers_body">
            
            <DriversBlock/>
            <DriversCommercial/>
            <DriversProperties/>
          </div>
        )
    }

}
