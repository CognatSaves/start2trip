import React from 'react';
import { Markdown } from 'react-showdown';
import { connect } from 'react-redux';

class PlaceProgrammClass extends React.Component {

    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    render() {
        //Данный блок является нужным, он расшифровывает то, что приходит с сервера - описание в специфическом формате.
        //в результате возвращает блок текста - описание с выделениями, списками и прочее
        return (
            <Markdown markup={this.props.place.info} />
        )
    }
}


const PlaceProgramm = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),

)(PlaceProgrammClass);

export default PlaceProgramm;