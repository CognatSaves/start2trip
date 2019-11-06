import React from 'react';
import { connect } from 'react-redux';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,findTagName} from '../../redusers/GlobalFunction'

// import RenderFourEl from '../home/HomeBody/RenderFourEl.jsx';

import PlaceListElement from '../Places/PlaceListElement';

class SimularToursBlockClass extends React.Component {
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    render() {
       
        //let tours = this.props.tours;
        let outerBlock = document.getElementById(this.props.outerBlock);
        console.log('outerBlock', outerBlock ? outerBlock.offsetWidth : 0);
        return (
            <>
                {
                    /*
                    <div className="placeDescription_fragmentName">{this.props.fragmentName}</div>
                    <div className="render_otherPlaces" style={{ marginTop: "15px" }}>
                        <RenderFourEl tours={tours} priseDisplay={this.props.priseDisplay}/>
                    </div>
    
                    */
                }
                <div className="placeDescription_fragmentName">{this.props.fragmentName}</div>
                <div className="d-flex col-12 flex-md-wrap flex-nowrap p-1 pb-4 popularPlacesRender" >
                    {
                        this.props.places.map((element, index) => {
                            if (index > 0) {
                                let temp = document.getElementById("addPlace" + (index - 1));
                                console.log('temp', temp ? temp.offsetWidth : 0);
                            }
                            return (
                                <PlaceListElement element={element} index={'addPlace' + index} findTagName={(tagId) => {findTagName(tagId, this)}}
                                    placeListElementClass={"col-xl-3 col-lg-3 col-md-4 col-sm-6 col-10 p-2 pb-3"}
                                />
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

const SimularToursBlock = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser,
        globalReduser: state.GlobalReduser
    }),
)(SimularToursBlockClass);

export default SimularToursBlock;