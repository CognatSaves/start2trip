import React from 'react';
import { connect } from 'react-redux';
import { changePlacesFixedClass, setPlacesPanelSelectedElement } from '../../redusers/ActionPlaces';
import { isMobileOnly,isMobile } from 'react-device-detect';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import requests from '../../config';

import { 
    startRefresherGlobal, thenFuncGlobal, 
    catchFuncGlobal,lengthTimeCalc,
    setLengthTimeFunc,createRequestElement, } from '../../redusers/GlobalFunction'
import { setDriversList, setLengthTime, setWaitingDriverRequest } from '../../redusers/ActionDrivers';
import { setMaxPrice } from '../../redusers/Action';
import Header from '../header/Header';
import PlaceInfo from '../PlaceDescription/PlaceInfo.jsx';
import PlacePhotoShow from '../PlaceDescription/PlacePhotoShow.jsx';
import PlaceProgramm from '../PlaceDescription/PlaceProgramm.jsx';
import PlacePhotos from '../PlaceDescription/PlacePhotos.jsx';
import RouteTravelBlock from './RouteTravelBlock';
import SimularRouteBlock from './SimularRouteBlock';
import CommentBlock from '../TourDescription/CommentBlock.jsx';
import TourPanel from '../TourDescription/TourPanel.jsx';
import DriversBlock from '../drivers/DriversBody/DriversBlock/DriversBlock';
import {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    VKShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    ViberShareButton,

    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    VKIcon,
    TelegramIcon,
    WhatsappIcon,
    ViberIcon,
} from 'react-share';
import ShareLinkElements from '../driverProfileRegistration/ShareLinkElements';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class RouteDescriptionClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newRoute: {},
            couldSendRequest: true,
            slug: '',
            selectedLanguage: '',
            isMaskVisible: false,
            clickedImageIndex: 0,
            page: 1,
            showPages: 1,
            isRequestSend: false,
            date: "",
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
        startRefresherGlobal(this)
    }
    endRolling = (result) => {
        thenFuncGlobal(this)
    }
    maxPriceCalc = (array) => {
        let maxValue = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].price > maxValue) {
                maxValue = array[i].price;
            }
        }
        return maxValue;
    }
    changeDate = (date) => {
        this.setState({
            isRequestSend: false,
            date: date,
        })
        this.props.dispatch(setDriversList([]));
    }

    lookAvailable = (additionalParams) => {
        console.log('look available');

        let routeDate = this.props.globalhistory.getRoute(additionalParams.point, this.props.storeState.languages[this.props.storeState.activeLanguageNumber].isoAutocomplete);//this.getRoute(this.props.storeState.cities);
        let newStringCities = routeDate.route;
        let country = routeDate.country;
        let langISO = routeDate.langISO;
        if (additionalParams && additionalParams.noDate) {
            this.props.globalhistory.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/drivers/${newStringCities}/`);
        }
        else {
            let dateString = this.props.globalhistory.createDateTimeString(new Date(), true);
            this.props.globalhistory.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + `/drivers/${newStringCities}?date=` + dateString);
        }


    }

    requestFunction = () => {
        this.setState({ isRequestSend: true })
        this.props.dispatch(setWaitingDriverRequest(true));
        let that = this;
    
        let cities = this.state.newRoute.local.points
        let filteredCities = this.props.globalhistory.firstLastCityCompare(cities);//проверка 1-го и последнего городов
    
        let request = createRequestElement(filteredCities, window.google.maps.DirectionsTravelMode.DRIVING);
        let service = new window.google.maps.DirectionsService();
    
    
        service.route(request, function (response, status) {
    
          if (status !== window.google.maps.DirectionsStatus.OK) {
            //необходима обработка случая, когда не смог построить маршрут)))
            return false;
          }
          let textInfo = that.props.storeState.languageTextMain.home.routeMenu;
          
          console.log(response);
          console.log(status);
    
          let routeProps = lengthTimeCalc(response);
    
          setLengthTimeFunc(that, routeProps.distance, routeProps.duration, textInfo);
    
          
          let body = JSON.stringify({
            cities: filteredCities,
            country: that.props.storeState.country,
            date: that.state.date ? that.state.date : new Date(),
            distance: routeProps.distance,
            duration: routeProps.duration
        });
        
        fetch(requests.getDrivers, {
            method: 'PUT', body: body,
            headers: { 'content-type': 'application/json' }
        })
            .then(response => {

                return response.json();
            })
            .then(function (data) {

                if (data.error) {
                    console.log("bad");

                    throw data.error;
                }
                else {
                    console.log("good");
                    console.log(data);

                    let maxPrice = that.maxPriceCalc(data.drivers)
                    that.props.dispatch(setMaxPrice(maxPrice, maxPrice));
                    that.props.dispatch(setDriversList(data.drivers));
                    that.props.dispatch(setWaitingDriverRequest(false));
                }
            })
            .catch(function (error) {
                console.log("bad");
                console.log('An error occurred:', error);
            });
        })
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
                    this.props.globalReduser.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/' + slugArray[i].slug + '/');
                }
            }
            //надо что-то сделать, если не нашли          
        }

        if (this.state.couldSendRequest && (!this.state.newRoute.local || this.state.slug !== slug) && this.props.storeState.languages.length > 0) {
            this.setState({
                couldSendRequest: false,
                selectedLanguage: this.props.storeState.activeLanguageNumber,
                isRequestSend: false
            });
            let that = this;
            startRefresherGlobal(this)

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
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        })
                        console.log('good');
                        console.log(data);

                        thenFuncGlobal(that)
                        that.setState({
                            newRoute: data,
                            couldSendRequest: true,
                            slug: data.local.slug
                        });

                        that.props.dispatch(setLengthTime("", "", null, null));
                        that.props.dispatch(setDriversList([]));


                    }
                })
                .catch(error => {
                    console.log('get wasted answer');
                    catchFuncGlobal(that)
                    that.props.globalReduser.history.push('/404/');
                });

        }
        let textInfo = this.props.storeState.languageTextMain.placeDescription;
        let simularPlaceBlockId = topBlockId + '5';
        let helmet = this.props.storeState.languageTextMain.helmets.routeDescription;
        let info = null;
        if (document.querySelector("#routeDescriptionId1")) {
            info = document.querySelector("#routeDescriptionId1").textContent;
        }
        let shareUrl = document.URL;
        let title = null;
        let exampleImage = null;
        if (this.props.storeState.languages.length > 0 && this.state.newRoute.local !== undefined) {
            title = this.state.newRoute.local.name;
            exampleImage = this.state.newRoute.route.blockListImage.url
        }
        if (!this.state.isRequestSend) {
            if (this.props.driversState.driversList.length <= 0 && this.state.newRoute.local) {
                this.requestFunction(false)
            }else if(isMobile && this.props.driversState.driversList.length <= 0 && this.state.newRoute.local){
                this.requestFunction(true)
            }
        }

        let routeUrl;
        if (this.state.newRoute.local) {
            routeUrl = this.props.globalReduser.getRoute(this.state.newRoute.local.points);
            routeUrl = routeUrl.route
        }


        return (
            <>
                {
                    this.state.newRoute.local ?
                        <Helmet>
                            <title>{this.state.newRoute.local.name + helmet.basic.title}</title>
                            <meta name="description" content={this.state.newRoute.local.name + helmet.basic.description} />
                            <meta property="og:site_name" content="Tripfer.com" />
                            <meta property="og:type" content="website" />
                            <meta property="og:url" content={document.URL} /*тут нужна подгрузка корректного слага */ />
                            <meta property="og:title" content={this.state.newRoute.local.name + helmet.basic.title} />
                            <meta property="og:description" content={this.state.newRoute.local.name + helmet.basic.description} />
                            <script type="application/ld+json">
                                {`
                      {
                        "@context": "https://schema.org",
                        "@type": "Place",
                        "url": `+ JSON.stringify(document.URL) + `,
                        "aggregateRating": {
                          "@type": "AggregateRating",
                          "ratingValue": `+ JSON.stringify(this.state.newRoute.route.rating) + `,
                          "reviewCount": `+ JSON.stringify(this.state.newRoute.route.commentNumber) + `
                        },
                        "name":`+ JSON.stringify(this.state.newRoute.local.name) + `,
                        "description":`+ JSON.stringify(info) + `,
                        "address":[
                        {
                         "@type": "PostalAddress",
                         "addressCountry":`+ JSON.stringify(this.props.storeState.country) + `
                         } 
                        ],
                         "publicAccess": true,
                        "photo":[
                        {
                        "@type": "ImageObject",
                        "thumbnail":"https://tripfer.com`+ this.state.newRoute.route.blockListImage.url + `"
                        }
                        ]
                      }
                  `}
                            </script>
                            {/* TODO  "addressRegion":["tbilisi","kakheti"] статика*/}
                        </Helmet> :
                        <React.Fragment />
                }


                <div style={{ position: 'relative' }}>
                    {

                        this.state.newRoute.local ?
                            <PlacePhotoShow onClose={() => { this.setState({ isMaskVisible: false }) }}
                                isMaskVisible={this.state.isMaskVisible} clickedImageIndex={this.state.clickedImageIndex} images={this.state.newRoute.route.images} />
                            : <React.Fragment />

                    }
                    {isMobileOnly ?
                        <Header history={this.props.history} showBtnBack={true} />

                        :
                        <React.Fragment />
                    }

                    <div className="placeDescription_background col-12 p-0" style={{ background: "url(" + (this.state.newRoute.local && this.state.newRoute.route.mainImage ? (isMobileOnly ? requests.serverAddressImg + this.state.newRoute.route.blockListImage.url : requests.serverAddressImg + this.state.newRoute.route.mainImage.url) : '') + ") no-repeat" }} id={topBlockId}>
                        {!isMobileOnly ?
                            <Header history={this.props.history} />
                            :
                            <React.Fragment />
                        }

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
                                                <TourPanel topBlockId={topBlockId} descriptionId={topBlockId} variantsArray={textInfo.routeDescription.variantsArray}
                                                    setPanelStateFunc={changePlacesFixedClass} panelFixedClass={this.props.placesState.placePanelFixedClass}
                                                    panelSelectedElement={this.props.placesState.placePanelSelectedElement} setPanelSelectedElement={setPlacesPanelSelectedElement}
                                                    removeElements={this.state.newRoute.additionalRoutes.length === 0 ? [simularPlaceBlockId] : []} />
                                            }

                                            <div className="placeDescription_block d-flex flex-column p-0" id={topBlockId + "1"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.routeDescription.variantsArray[0]}</div>

                                                <PlaceProgramm id={topBlockId + "1"} tagsArray={[]} place={{ ...this.state.newRoute.local, tags: []/*this.state.newPlace.place.tags*/, rating: this.state.newRoute.route.rating, comments: this.state.newRoute.route.commentNumber }} />
                                            </div>
                                            {isMobileOnly ? <>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.share}</div>
                                                <div className="d-flex ">
                                                    <ShareLinkElements shareUrl={shareUrl} title={title} isAdmin={false}/>                                                 
                                                </div>
                                            </> : <React.Fragment />}

                                            <div className="placeDescription_block d-flex flex-column" id={topBlockId + "2"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.routeDescription.variantsArray[1]}</div>
                                                <PlacePhotos photoArray={this.state.newRoute.route.images}
                                                    showMask={(clickedImageIndex) => { this.setState({ isMaskVisible: true, clickedImageIndex: clickedImageIndex }) }} />

                                            </div>
                                            <RouteTravelBlock points={this.state.newRoute.local.points} id={topBlockId + "3"} textInfo={textInfo} changeDate={this.changeDate} />
                                            <div className="placeDescription_block d-flex flex-column" id={topBlockId + "4"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.routeDescription.variantsArray[3]}</div>

                                                <DriversBlock changeTravelVisibility={this.changeTravelVisibility} country={this.props.storeState.country}
                                                    cities={routeUrl} howMuchRenderEl={12} isRouteDescription={true}
                                                    dateString={this.props.globalReduser.createDateTimeString(this.state.date ? this.state.date : new Date(), true)} />



                                                <div className="d-flex justify-content-center align-items-center w-100 py-2">
                                                    <span className="routesDescriptionShowMore" onClick={() => this.lookAvailable({ noDate: false, point: this.state.newRoute.local.points })}>{textInfo.showMore}</span>
                                                </div>

                                            </div>
                                            <div className="placeDescription_block flex-column" id={simularPlaceBlockId} style={{ display: this.state.newRoute.additionalRoutes.length > 0 ? 'flex' : 'none' }}>

                                                <SimularRouteBlock outerBlock={simularPlaceBlockId} routes={this.state.newRoute.additionalRoutes} fragmentName={textInfo.routeDescription.variantsArray[4]} priseDisplay={"none"} />
                                            </div>

                                            <CommentBlock targetType="route" comments={this.state.newRoute.comments} targetId={this.state.newRoute.route.id} page={this.state.page} setPage={this.setPage}
                                                showMorePages={this.showMorePages} showPages={this.state.showPages} id={topBlockId + "6"} startRolling={() => this.startRolling()} endRolling={(result) => this.endRolling(result)} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                </div>
            </>
        )
    }
}

const RouteDescription = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        globalhistory: state.GlobalReduser,
        placesState: state.PlacesReduser,
        driversState: state.DriversReduser,
    }),

)(RouteDescriptionClass);

export default RouteDescription;