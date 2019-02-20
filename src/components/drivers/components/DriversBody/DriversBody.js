import React, { Component } from 'react';
import './DriversBody.css'
import DriversBlock from './components/DriversBlock/DriversBlock.js';
import DriversCommercial from './components/DriversCommercial/DriversCommercial.js';
import DriversProperties from './components/DriversProperties/DriversProperties.js';


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
