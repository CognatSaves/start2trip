import React, { Component } from 'react';
import './DriversCommercial.css'

export default class DriversCommercial extends React.Component {
  constructor(props) {
    super(props);
    this.state={//на данный момент не испоьзуется, картинка задана напрямую в css
      picture1: "pictures/commercial_picture1.png",
      picture2: "pictures/commercial_picture2.png"
    }
  }
  render() {
    
    return (
      <div className = "drivers_commercial">
        <div className="commercial_picture1"></div>
        <div className="commercial_picture2"></div>
      </div>
    )
  }

}
