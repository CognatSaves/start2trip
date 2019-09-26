import React from 'react';
import './PopularPlaces.css';
import { connect } from 'react-redux';
import requests from '../../config';

// import { setSelectedDirection } from '../../redusers/ActionPlaces';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class PopularPlacesClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //arrayRender: arrayRender,
            howMuchRender: 6,
        }
    }

    directionHrefCreator = (id) => {
        function findSelectedDirectionName(directions, id, storeState) {

            for (let i = 0; i < directions.length; i++) {
                if (directions[i].id === id) {
                    return directions[i].loc.slug;
                }

            }
            return false;
        }
        let selectedDirection = this.props.placesState.selectedDirection;
        let slug = findSelectedDirectionName(this.props.placesState.directions, id, this.props.storeState);
        if (selectedDirection !== id && slug) {
            return "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/' + this.props.where + '-' + slug;
        }
        else {
            return "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/' + this.props.where;
        }
    }
    onDirClickCleared = (address) => {

        this.props.globalReduser.history.push(address + "/");
    }
    render() {

        function isDirSelected(directionId, selectedDirection) {
            /*for(let i=0; i<selectedDirections.length; i++){
                if(selectedDirections[i]===directionId){
                    return true;
                }
            }
            return false;*/
            return selectedDirection === directionId;
        }


        let placeRender = [];
        
        let arrayRender = [...this.props.placesState.directions];
        arrayRender.sort((a, b) => {
            if (a.zIndex !== b.zIndex) {
                return b.zIndex - a.zIndex;
            }
            else {
                return b.placesNumber - a.placesNumber;
            }
        })
        // if (arrayRender.length > 0) {

        // }
        if (arrayRender.length > this.state.howMuchRender) {

            for (let i = 0; i < this.state.howMuchRender; i++) {
                if (i < this.state.howMuchRender) {
                    placeRender.push(arrayRender[i]);
                }
            }
        } else {
            placeRender = arrayRender;
        }
        let textInfo = this.props.storeState.languageTextMain.places.popularPlaces;
        /*let directions = arrayRender;
        */
        return (
            <>
                <div className={placeRender.length > 0 ? "popularPlacesBody pt-4" : 'd-none'} >
                    <div className="popularPlacesTitle">
                        <h2>{textInfo.popularPlacesTitle}</h2>
                    </div>
                    <div className="d-flex col-12 p-0">
                        <div className="d-flex col-12 flex-md-wrap flex-nowrap p-0 py-1 popularPlacesRender">
                            {placeRender.map((element, index) => {
                                let address = this.directionHrefCreator(element.id);
                                if (arrayRender.length !== placeRender.length) {
                                    if (placeRender.length - 1 == index) {
                                        return (
                                            <div className="col-md-2 col-7 d-flex flex-column align-items-center popularPlacesEl popularPlacesMore" onClick={() => { this.setState({ howMuchRender: this.state.howMuchRender + 6 }) }}>
                                                <span>{textInfo.more}</span>
                                                <img src={arrayRender[arrayRender.length - 1].image ? requests.serverAddressImg + arrayRender[arrayRender.length - 1].image.url : ''} alt="img" />
                                            </div>
                                        )
                                    }
                                }
                                return (
                                    <a href={requests.frontendAddress + address + "/"}
                                        className={"col-md-2 col-7 d-flex flex-column popularPlacesEl " + (isDirSelected(element.id, this.props.placesState.selectedDirection) ? 'popularPlacesEl_selected' : '')}
                                        onClick={(e) => { e.preventDefault(); this.onDirClickCleared(address) }}>
                                        <span className="popularPlacesElMes">{textInfo.cancel}</span>
                                        <div>
                                            <img src={element.image ? requests.serverAddressImg + element.image.url : ''} alt="img" />
                                        </div>
                                        <div className="mt-2 routeName">
                                            <span>{element.loc.name}</span>
                                        </div>
                                    </a>
                                )
                            }

                            )}
                        </div>
                    </div>

                </div>

            </>
        )
    }
}
const PopularPlaces = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(PopularPlacesClass);

export default PopularPlaces;