import React from 'react';
import { connect } from 'react-redux';

import RouteListElement from '../home/HomeBottom/RouteListElement';

class SimularRouteBlockClass extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    render() {
        // let outerBlock = document.getElementById(this.props.outerBlock);
        //console.log('outerBlock',outerBlock ? outerBlock.offsetWidth : 0);

        return (
            <>

                <div className="placeDescription_fragmentName">{this.props.fragmentName}</div>
                <div className="d-flex col-12 flex-md-wrap flex-nowrap p-0 popularPlacesRender">
                    {
                        this.props.routes.map((element, index) => {
                            if (index > 0) {
                                let temp = document.getElementById("addPlace" + (index - 1));
                                console.log('temp', temp ? temp.offsetWidth : 0);
                            }
                            return (
                                <RouteListElement element={element} index={'addPlace' + index} routeListElementClass={"col-xl-3 col-lg-3 col-md-4 col-sm-6 col-10 p-2 pb-3"} />
                            )
                        })
                    }
                </div>
            </>
        )
    }
}
const SimularRouteBlock = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser,
        globalReduser: state.GlobalReduser
    }),
)(SimularRouteBlockClass);

export default SimularRouteBlock;