import React from 'react';

import { connect } from 'react-redux';
class PlaceProgrammClass extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        
        //let textInfo = this.props.storeState.languageTextMain.placeProgramm;
        
        return (
            <div className="placeDescription_block d-flex flex-column" id={this.props.id}>
                <div className="d-flex placeDescription_description_info">
                    {this.props.place.info}
                </div>
            </div>
        )
    }
}

const PlaceProgramm = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),

)(PlaceProgrammClass);

export default PlaceProgramm;