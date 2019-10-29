import React from 'react';
import '../../Places/PopularPlaces.css';
import { connect } from 'react-redux';
import requests from '../../../config';

// import { setSelectedDirection } from '../../../redusers/ActionPlaces';

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

    onDirClickCleared = (address) => {
        this.props.globalReduser.history.push(address + "/");
    }
    directionHrefCreator = (id) => {
        function findSelectedDirectionName(directions, id, storeState) {

            for (let i = 0; i < directions.length; i++) {
                if (directions[i].id === id) {
                    for (let k = 0; k < directions[i].loc.length; k++) {
                        let lang1 = directions[i].loc[k].language;
                        let lang2 = storeState.languages[storeState.activeLanguageNumber].id;
                        if (lang1 === lang2) {
                            return directions[i].loc[k].slug
                            
                        }
                    }
                }

            }
            return false;

        }

        let selectedDirection = this.props.placesState.selectedDirection;
        let slug = findSelectedDirectionName(this.props.placesState.directions, id, this.props.storeState);
        
        if (selectedDirection !== id && slug) {
            return "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/routes-${slug}`
        }
        else {
            return "/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/routes`
        }
    }
    render() {
        function isDirSelected(directionId, selectedDirection) {
            /*for(let i=0; i<selectedDirections.length; i++){
                if(selectedDirections[i]===directionId){
                    return true;
                }
            }
            return false;*/

            let res = (selectedDirection === directionId);
            return res;
        }


        let placeRender = [];

        let arrayRender = [...this.props.placesState.directions];
        if (arrayRender.length > 0) {

        }
        arrayRender.sort((a, b) => {
            if (a.zIndex !== b.zIndex) {
                return b.zIndex - a.zIndex;
            }
            else {
                return b.routesNumber - a.routesNumber;
            }
        })
        if (arrayRender.length > this.state.howMuchRender) {
            for (let i = 0; i < this.state.howMuchRender; i++) {
                if (i < this.state.howMuchRender) {
                    placeRender.push(arrayRender[i]);
                }
            }
        } else {
            placeRender = arrayRender;
        }
        function getDirectionName(element, that) {

            for (let i = 0; i < element.loc.length; i++) {
                if (element.loc[i].language === that.props.storeState.languages[that.props.storeState.activeLanguageNumber].id) {
                    return element.loc[i].name;
                }
            }
            return element.loc.length > 0 ? element.loc[0].name : 'no-name';
        }
        // let textInfo = this.props.storeState.languageTextMain.places;
        /*let directions = arrayRender;
        */
       
        console.log(placeRender);
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.homePopularPlaces;
        return (
            <>
                <div className={placeRender.length > 0 ? "popularPlacesBody pt-4" : 'd-none'} >

                    <div className="popularPlacesTitle">
                        <h2>{textInfo.popularPlacesTitle + ':'}</h2>
                    </div>
                    {
                        this.props.storeState.languages.length > 0 ?
                            <div className="d-flex col-12 p-0">
                                <div className="d-flex col-12 flex-md-wrap flex-nowrap p-3 pb-4 popularPlacesRender">
                                    {placeRender.map((element, index) => {
                                        let address = this.directionHrefCreator(element.id);
                                        if (arrayRender.length !== placeRender.length) {
                                            if (placeRender.length - 1 == index) {
                                                return (
                                                    <div className="col-md-2 col-7 d-flex flex-column popularPlacesEl popularPlacesMore"
                                                        onClick={() => { this.setState({ howMuchRender: this.state.howMuchRender + 6 }) }}>
                                                        <span>{textInfo.morePics}</span>
                                                        <img src={arrayRender[arrayRender.length - 1].image ? requests.serverAddressImg + arrayRender[arrayRender.length - 1].image.url : ''} alt="img" />
                                                    </div>
                                                )
                                            }
                                        }
                                        return (
                                            <>
                                                {
                                                    <a href={requests.frontendAddress + address + "/"} className={"col-md-2 col-7 d-flex flex-column popularPlacesEl "
                                                        + (isDirSelected(element.id, this.props.placesState.selectedDirection) ? 'popularPlacesEl_selected' : '')}
                                                        onClick={(e) => { e.preventDefault(); this.onDirClickCleared(address) }}>
                                                        <span className="popularPlacesElMes">{textInfo.cancel}</span>
                                                        <div>
                                                            <img src={element.image ? requests.serverAddressImg + element.image.url : ''} alt="img" />
                                                        </div>
                                                        <div className="mt-2 routeName">
                                                            <span>{getDirectionName(element, this)}</span>
                                                        </div>
                                                    </a>
                                                }
                                            </>
                                        )
                                    }

                                    )}
                                </div>
                            </div>
                            : <React.Fragment />
                    }


                </div>

            </>
        )
    }
}
const PopularPlaces = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser,
        globalReduser: state.GlobalReduser
    }),
)(PopularPlacesClass);

export default PopularPlaces;