import React from 'react';
import '../Places/PlacesList.css';
import { connect } from 'react-redux';
import { setPage, setMorePagesShow } from '../../redusers/ActionGuides';

//import PlaceListElement from './PlaceListElement';
import Manipulator from '../manipulator/Manipulator';
import GuidesListElement from './GuidesListElement';
// import requests from '../../config';

class GuidesListClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    guidesSort = (array, type) => {

        switch (type) {
            case 0:
                return array.sort((a, b) => { return a.rating > b.rating ? -1 : 1 });
            case 1:
                return array.sort((a, b) => { return a.comments > b.comments ? -1 : 1 });
            /*    
            case 2:
                return array.sort((a, b) => { return a.placelocalization.name < b.placelocalization.name ? -1 : 1 });
            */
            default: return array;
        }

    }
    showMorePages = () => {
        this.props.dispatch(setMorePagesShow());
    }
    setPageFunc = (page) => {
        if (page !== "...") {
            this.props.dispatch(setPage(page));
        }
    }
    guidesLanguageFilter = (array) => {
        let filteredArray = [];
        let storeState= this.props.storeState;
        if(storeState.languageValue.length===0){
            return array;
        }
        array.map((element, index)=>{
            for(let j=0; j<storeState.languageValue.length; j++){
                for(let k=0; k<element.language.length; k++){
                    if(storeState.languages[storeState.languageValue[j]].id === element.language[k]){
                        filteredArray.push(element);
                        k=element.language.length;
                        j=storeState.languageValue.length;
                    }
                }
            }
        })

        return filteredArray;
    }
    render() {
        console.log('PlacesList render');
        console.log(this.props);
        let filteredGuidesArray = this.guidesLanguageFilter([...this.props.guidesState.guidesList])

        let sortedArray;
        sortedArray = this.guidesSort(filteredGuidesArray, this.props.guidesState.sortMenuValue);
        // }

        let selectedPlaces = sortedArray.slice((this.props.guidesState.page - this.props.guidesState.showPages) * this.props.guidesState.pagesMenuValue,
            this.props.guidesState.page * this.props.guidesState.pagesMenuValue);

        console.log('selectedPlaces', selectedPlaces);
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.homeRoutesList;
        let pageNotFound = this.props.storeState.languageTextMain.home.pageNotFound;
        let isEmpty = (selectedPlaces.length === 0 && this.props.isStaying);
        let isLoading = (selectedPlaces.length === 0 && !this.props.isStaying);
        return (

            <>
                <div className="drivers_block d-flex flex-wrap">
                    {selectedPlaces.map((element, index) =>
                        <>
                            <GuidesListElement element={element} index={index} /*findTagName={(tag) => findTagName(tag, this)}*/

                            />
                        </>
                    )}
                    {
                        isLoading || isEmpty ?
                            <>
                                {isLoading ?
                                    <div className="placesList_loading">
                                        <span>{'Загружаемся!'}</span>
                                    </div> :
                                    <div className="placesList_noElementsBlock">
                                        <span>{pageNotFound.text1 + " " + pageNotFound.text2}<br />{pageNotFound.text3}</span>
                                    </div>
                                }
                            </>
                            : <React.Fragment />
                    }
                </div>
                <Manipulator number={sortedArray.length} page={this.props.guidesState.page} setPage={this.setPageFunc}
                    elementsNumber={this.props.guidesState.pagesMenuValue} showMorePages={this.showMorePages}
                />
            </>

        )
    }
}
const GuidesList = connect(
    (state) => ({
        storeState: state.AppReduser,
        guidesState: state.GuidesReduser,
        globalReduser: state.GlobalReduser
    }),
)(GuidesListClass);

export default GuidesList;