import React from 'react';
import RenderFourEl from '../home/HomeBody/RenderFourEl.jsx';

export default class SimularToursBlock extends React.Component {
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    render() {
        let tours = this.props.tours;
        return (
            <React.Fragment>
                <div className="placeDescription_fragmentName">{this.props.fragmentName}</div>
                <div className="render_otherPlaces" style={{ marginTop: "15px" }}>
                    <RenderFourEl tours={tours} priseDisplay={this.props.priseDisplay} />
                </div>
            </React.Fragment>
        )
    }
}