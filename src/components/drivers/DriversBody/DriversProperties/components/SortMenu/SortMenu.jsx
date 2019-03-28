import React from 'react';
import './SortMenu.css'
import { connect } from 'react-redux';
import {setSortMenu} from '../../../../../../redusers/Action'


class SortMenuClass extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    render(){
        if(this.props.isVisible){
            return(
                <div className="drivers_properties_sortMenu">
                    {this.props.storeState.sortMenuVariants.map((element,index) => 
                        <div className="sortMenu_element">
                            <div className="sortMenu_element_text" onClick={()=>this.props.dispatch(setSortMenu(element))}>
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

const SortMenu = connect(
    (state) => ({
      storeState: state.AppReduser,
    }),
  )(SortMenuClass);
  
  export default SortMenu;
