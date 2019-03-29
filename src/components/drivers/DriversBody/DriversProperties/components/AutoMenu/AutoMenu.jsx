import React from 'react';
import './AutoMenu.css'
import { connect } from 'react-redux';
import {setAuto} from "../../../../../../redusers/Action"
import sedan from './pictures/sedan.svg';
import jeep from './pictures/jeep.svg';
import microbus from './pictures/microbus.svg';
import minivan from './pictures/minivan.svg';

class AutoMenuClass extends React.Component{
    /*constructor(props) {
        super(props);      
      }*/
    render(){        
        if(this.props.isVisible){
            let pictureArray = [sedan, jeep, minivan,microbus];
            return(
                <div className="drivers_properties_autoMenu" >
                    {this.props.storeState.autoVariants.map((element,index)=>
                        <div className="autoMenu_element">
                            <div className="autoMenu_element_textBlock" onClick={()=>this.props.dispatch(setAuto(element,pictureArray[index]))}>
                                <div className="autoMenu_element_picture">
                                    <img src={pictureArray[index]} width="100%" height="100%" alt={"auto_"+index}></img>
                                </div>
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
const AutoMenu = connect(
    (state) => ({
      storeState: state.AppReduser,
    }),
  )(AutoMenuClass);
  
  export default AutoMenu;