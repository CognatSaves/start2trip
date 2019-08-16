import React from 'react';
import { Markdown } from 'react-showdown';
import { connect } from 'react-redux';

/*
var showdown = require('showdown');
var converter = new showdown.Converter();
*/

// TODO Этот блок нужен - он расшифровавает ересь, что приходит с сервера. Но почистить его не мешало бы

class PlaceProgrammClass extends React.Component {
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    /*
    render(){
        
        //let textInfo = this.props.storeState.languageTextMain.placeProgramm;
        //var htmlElement =
        
        <div className="col-12 d-flex flex-column">
                <div className="d-flex placeDescription_description_info">
                    
                    { converter.makeHtml(this.props.place.info)}
                </div>
            </div>


        
        return (
            <Markdown markup={ this.props.place.info } components={{ MyComponent }} />
            
        )
    }
*/
    render() {
        return (
            <Markdown markup={this.props.place.info} />
        )
    }
}

/*
render: () => {
    var markdown = '# Hello\n\n<MyComponent tag="strong">More Content...</MyComponent>';
    return <Markdown markup={ markdown } components={{ PlaceProgrammClass }} />
}
*/

const PlaceProgramm = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),

)(PlaceProgrammClass);

export default PlaceProgramm;