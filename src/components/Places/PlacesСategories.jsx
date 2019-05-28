import React from 'react';
import './PlacesСategories.css';
import { connect } from 'react-redux';


class PlacesСategoriesClass extends React.Component {
    render() {
     

        return (
            <React.Fragment>
               

            </React.Fragment>
        )
    }
}
const PlacesСategories = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser
    }),
)(PlacesСategoriesClass);

export default PlacesСategories;