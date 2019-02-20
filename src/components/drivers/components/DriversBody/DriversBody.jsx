import React, { Component } from 'react';
import './DriversBody.css'
import DriversBlock from './components/DriversBlock/DriversBlock.jsx';
import DriversCommercial from './components/DriversCommercial/DriversCommercial.jsx';
import DriversProperties from './components/DriversProperties/DriversProperties.jsx';


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
