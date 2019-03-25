import React from 'react';
import { connect } from 'react-redux';
import ToursListBlock from '../Tours/ToursListBlock';
import bookmarkEmpty from '../Places/pictures/bookmark_contour.svg';
import bookmarkFilled from '../Places/pictures/bookmark_blue.svg';
import bookmarkSelected from '../Places/pictures/bookmark_orange.svg';
import { setToursPage, setToursMorePagesShow } from '../../redusers/ActionTours';

class DriverProfileToursClass extends React.Component{
    constructor(props){
        super(props);
        this.setPage = this.setPage.bind(this);
        this.showMorePages = this.showMorePages.bind(this);
    }
    setPage(page) {
        if (page !== "...") {
            this.props.dispatch(setToursPage(page));
        }
    }
    showMorePages() {
        this.props.dispatch(setToursMorePagesShow());
    }
    render(){
        function createNames(tourArray) {
            let res = [];
            for (let i = 0; i < tourArray.length; i++) {
                res[i] = tourArray[i].places[0];
                for (let j = 1; j < tourArray[i].places.length; j++) {
                    res[i] = res[i] + "-" + tourArray[i].places[j];
                }
            }
            return res;
        }
        let sortedArray = [...this.props.toursState.tours[0].tours];
        let selectedTours = sortedArray.slice(0,5);
        let srcArray = Array(selectedTours.length).fill(bookmarkEmpty);

        srcArray[0] = bookmarkSelected;
        srcArray[1] = bookmarkFilled;
        
        let namesArray = createNames(selectedTours);

        return(
            <ToursListBlock selectedTours={selectedTours} namesArray={namesArray} srcArray={srcArray}
                manipulatorNumber={this.props.toursState.tours[0].tours.length} manipulatorElementsNumber={this.props.storeState.pagesMenuValue}
                manipulatorPage={this.props.toursState.toursPage} manipulatorSetPage={this.setPage} 
                manipulatorShowMorePage={this.showMorePages}
            />
        )
    }
}
const DriverProfileTours = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser,
        toursState: state.ToursReduser
    }),
)(DriverProfileToursClass);

export default DriverProfileTours;