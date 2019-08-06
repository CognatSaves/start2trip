import React from 'react';
import { connect } from 'react-redux';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Header from '../header/Header';
import PlaceInfo from '../PlaceDescription/PlaceInfo.jsx';
import axios from 'axios';
import requests from '../../config';
import { changePlacesFixedClass, setPlacesPanelSelectedElement } from '../../redusers/ActionPlaces';

import PlacePhotoShow from '../PlaceDescription/PlacePhotoShow.jsx';
import PlaceProgramm from '../PlaceDescription/PlaceProgramm.jsx';
import PlacePhotos from '../PlaceDescription/PlacePhotos.jsx';
import RouteTravelBlock from './RouteTravelBlock';
import SimularRouteBlock from './SimularRouteBlock';
import CommentBlock from '../TourDescription/CommentBlock.jsx';

import TourPanel from '../TourDescription/TourPanel.jsx';
import Cookies from 'universal-cookie';
import { isMobileOnly } from 'react-device-detect';
const cookies = new Cookies();

class RouteDescriptionClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshExist: false,
            isRefreshing: true,
            isGoodAnswer: true,
            newRoute: {},
            couldSendRequest: true,
            slug: '',
            selectedLanguage: '',

            isMaskVisible: false,
            clickedImageIndex: 0,
            page: 1,
            showPages: 1,
        }
    }
    showMorePages = () => {
        this.setState({
            page: this.state.page + 1,
            showPages: this.state.showPages + 1
        })
    }
    setPage = (page) => {
        if (page !== "...") {
            this.setState(
                {
                    page: page,
                    showPages: 1
                }
            )
        }
    }
    startRolling = () => {
        this.setState({
            isRefreshExist: true
        });
    }
    endRolling = (result) => {
        let that = this;
        this.setState({
            isRefreshing: false,
            isGoodAnswer: result
        });
        setTimeout(
            function () {
                that.setState({ isRefreshExist: false, isRefreshing: true })
            }, 2000
        )
    }
    render() {

        console.log('RouteDescription render', this.state, this.props);
        let topBlockId = "routeDescriptionId";
        let slug = this.props.match.params.slug;
        if (this.props.storeState.languages.length > 0 && this.state.newRoute.local && this.state.selectedLanguage !== this.props.storeState.activeLanguageNumber) {

            let slugArray = this.state.newRoute.local.slugArray;
            for (let i = 0; i < slugArray.length; i++) {
                if (this.props.storeState.languages[this.props.storeState.activeLanguageNumber].id === slugArray[i].language) {
                    this.setState({
                        selectedLanguage: this.props.storeState.activeLanguageNumber,

                    });
                    this.props.globalReduser.history.push("/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+'/routes/' + slugArray[i].slug);
                }
            }
            //надо что-то сделать, если не нашли          
        }

        if (this.state.couldSendRequest && (!this.state.newRoute.local || this.state.slug !== slug) && this.props.storeState.languages.length > 0) {
            this.setState({
                couldSendRequest: false,
                isRefreshExist: true,
                selectedLanguage: this.props.storeState.activeLanguageNumber
            });
            let that = this;
            axios.get(requests.showRoute + "?slug=" + (slug ? slug : ''))
                .then(response => {
                    console.log(response);
                    return response.data;
                })
                .then(data => {
                    if (data.error) {
                        console.log("bad");
                        throw data.error;
                    }
                    else {
                        console.log('good');
                        console.log(data);
                        that.setState({
                            isRefreshExist: false,
                            newRoute: data,
                            couldSendRequest: true,
                            slug: data.local.slug
                        });
                    }
                })
                .catch(error => {
                    console.log('get wasted answer');
                    //that.props.globalReduser.history.push('/');
                });

        }
        let textInfo = this.props.storeState.languageTextMain.placeDescription;
        let simularPlaceBlockId = topBlockId+'4';
        return (
            <React.Fragment>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist}
                    isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />

                <div style={{ position: 'relative' }}>
                    {

                        this.state.newRoute.local ?
                            <PlacePhotoShow onClose={() => { this.setState({ isMaskVisible: false })}}
                                isMaskVisible={this.state.isMaskVisible} clickedImageIndex={this.state.clickedImageIndex} images={this.state.newRoute.route.images} />
                            : <React.Fragment />

                    }
                    <div className="placeDescription_background col-12 p-0" style={{ background: "url(" + (this.state.newRoute.local && this.state.newRoute.route.mainImage ? (isMobileOnly ? requests.serverAddress + this.state.newRoute.route.blockListImage.url:requests.serverAddress + this.state.newRoute.route.mainImage.url)  : '') + ") no-repeat" }} id={topBlockId}>
                        <Header history={this.props.history} />

                        {
                            this.state.newRoute.local ?
                                <div className="placeDescription_topImageMask">
                                    <div className="wrapper d-flex flex-column  ">
                                        <PlaceInfo tagsArray={[]} date={this.state.newRoute.local.createdAt}
                                            tags={[]} rating={this.state.newRoute.route.rating}
                                            comments={this.state.newRoute.route.commentNumber} name={this.state.newRoute.local.name} />
                                    </div>
                                </div>
                                : <React.Fragment />
                        }

                    </div>
                    {
                        this.state.newRoute.local ?
                            <div className="wrapper d-flex flex-column">
                                <div className="drivers_bottom_background d-flex flex-column" >
                                    <div className="drivers_body d-flex">
                                        <div className="left_body_part col-12">
                                            {
                                                <TourPanel topBlockId={topBlockId} descriptionId={topBlockId} variantsArray={textInfo.placeDescription.variantsArray}
                                                    setPanelStateFunc={changePlacesFixedClass} panelFixedClass={this.props.placesState.placePanelFixedClass}
                                                    panelSelectedElement={this.props.placesState.placePanelSelectedElement} setPanelSelectedElement={setPlacesPanelSelectedElement}
                                                    removeElements={this.state.newRoute.additionalRoutes.length===0 ? [simularPlaceBlockId] : []} />
                                            }

                                            <div className="placeDescription_block d-flex flex-column p-0" id={topBlockId + "1"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[0]}</div>

                                                <PlaceProgramm id={topBlockId + "1"} tagsArray={[]} place={{ ...this.state.newRoute.local, tags: []/*this.state.newPlace.place.tags*/, rating: this.state.newRoute.route.rating, comments: this.state.newRoute.route.commentNumber }} />
                                            </div>


                                            <div className="placeDescription_block d-flex flex-column" id={topBlockId + "2"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[1]}</div>
                                                <PlacePhotos photoArray={this.state.newRoute.route.images}
                                                    showMask={(clickedImageIndex) => { this.setState({ isMaskVisible: true, clickedImageIndex: clickedImageIndex }) }} />
                                            </div>
                                            <RouteTravelBlock points={this.state.newRoute.local.points} id={topBlockId + "3"} />
                                            <div className="placeDescription_block flex-column" id={simularPlaceBlockId} style={{display: this.state.newRoute.additionalRoutes.length>0 ? 'flex' : 'none'}}>

                                                <SimularRouteBlock outerBlock={simularPlaceBlockId} routes={this.state.newRoute.additionalRoutes} fragmentName={textInfo.placeDescription.variantsArray[3]} priseDisplay={"none"} />
                                            </div>

                                            <CommentBlock targetType="route" comments={this.state.newRoute.comments} targetId={this.state.newRoute.route.id} page={this.state.page} setPage={this.setPage}
                                                showMorePages={this.showMorePages} showPages={this.state.showPages} id={topBlockId + "5"} startRolling={() => this.startRolling()} endRolling={(result) => this.endRolling(result)} />


                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                </div>
            </React.Fragment>
        )
    }
}

const RouteDescription = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        placesState: state.PlacesReduser
    }),

)(RouteDescriptionClass);

export default RouteDescription;