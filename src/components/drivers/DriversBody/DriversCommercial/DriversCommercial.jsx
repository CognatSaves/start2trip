import React from 'react';
import './DriversCommercial.css'
import picture1 from './pictures/commercial_picture1.png';
import picture2 from './pictures/commercial_picture2.png';


export default class DriversCommercial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {//написано фиктивно - будет использоваться при подключ. бд
      picture1: "pictures/commercial_picture1.png",
      picture2: "pictures/commercial_picture2.png"
    }
  }
  render() {
    return (
      <div className="drivers_commercial d-flex flex-column">
        <div className="commercial_picture picture1">
          <img src={picture1} width="100%" height="100%" alt="pic1"></img>
        </div>
        <div className="commercial_picture picture2">
          <img src={picture2} width="100%" height="100%" alt="pic2"></img>
        </div>
      </div>
    )
  }

}
