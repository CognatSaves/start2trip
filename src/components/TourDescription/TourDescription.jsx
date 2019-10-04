import React from 'react';
import { connect } from 'react-redux';
import { changePlacesFixedClass, setPlacesPanelSelectedElement } from '../../redusers/ActionPlaces';
import { isMobileOnly } from 'react-device-detect';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import requests from '../../config';
import './TourDescription.css'

import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Header from '../header/Header';
import PlaceInfo from '../PlaceDescription/PlaceInfo.jsx';
import PlacePhotoShow from '../PlaceDescription/PlacePhotoShow.jsx';
import PlaceProgramm from '../PlaceDescription/PlaceProgramm.jsx';
import PlacePhotos from '../PlaceDescription/PlacePhotos.jsx';
import RouteTravelBlock from '../RouteDescription/RouteTravelBlock';
import SimularToursBlock from './SimularToursBlock.jsx';
import CommentBlock from '../TourDescription/CommentBlock.jsx';
import TourPanel from '../TourDescription/TourPanel.jsx';
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'

import Stars from '../stars/Stars'
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

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ToureDescriptionClass extends React.Component {
    constructor(props) {
        super(props);
        let getdate = props.globalReduser.findGetParameter("date");
        let dateValue;

        if (getdate) {
            dateValue = props.globalReduser.getDateFromDateString(getdate);
            let now = new Date(Date.now());
            if (dateValue < now) {

                let day = dateValue.getDate(); let month = dateValue.getMonth(); let year = dateValue.getFullYear();
                let daynow = now.getDate(); let monthnow = now.getMonth(); let yearnow = now.getFullYear();
                if (day !== daynow || month !== monthnow || year !== yearnow) {
                    dateValue = now;
                    let address = document.location.origin + document.location.pathname;
                    document.location.replace(address);
                }
            }
            dateValue = props.globalReduser.convertDateToUTC(new Date(dateValue));

        }
        else {
            dateValue = props.globalReduser.convertDateToUTC(new Date(Date.now()));
        }

        this.state = {
            isRefreshExist: false,
            isRefreshing: true,
            isGoodAnswer: true,
            newTour: {},
            couldSendRequest: true,
            slug: '',
            selectedLanguage: '',
            isMaskVisible: false,
            clickedImageIndex: 0,
            page: 1,
            showPages: 1,
            departureDate: dateValue,
            travelVisibility: false,
            successVisibility: 'none',
            elementPrice: 0,
            author: null,
            btMore: false,
            elementActive: null,
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
    getCurrencies = (currency, criterion) => {
        let idIndex = null
        switch (criterion) {
            case "id":
                this.props.storeState.currencies.map((item, index) => {
                    if (item.id.indexOf(currency) === 0) { idIndex = index }
                })
                break;
            case "ISO":
                this.props.storeState.currencies.map((item, index) => {
                    if (item.ISO.indexOf(currency) === 0) { idIndex = index }
                })
                break;
        }
        return idIndex
    }
    changeTravelVisibility = (elementPrice, elementActive) => {
        this.setState({
            travelVisibility: !this.state.travelVisibility,
            elementPrice: elementPrice,
            elementActive: elementActive,
        })
    }

    changeSuccessVisibility = (value) => {
        this.setState({
            successVisibility: value
        })
    }

    render() {

        console.log('RouteDescription render', this.state, this.props);
        let topBlockId = "routeDescriptionId";
        let slug = this.props.match.params.slug;
        if (this.props.storeState.languages.length > 0 && this.state.newTour.local && this.state.selectedLanguage !== this.props.storeState.activeLanguageNumber) {



            let slugArray = this.state.newTour.local.slugArray;
            for (let i = 0; i < slugArray.length; i++) {
                if (this.props.storeState.languages[this.props.storeState.activeLanguageNumber].id === slugArray[i].language && slugArray[i].slug.length > 0) {
                    this.setState({
                        selectedLanguage: this.props.storeState.activeLanguageNumber,

                    });
                    this.props.globalReduser.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/tours/' + slugArray[i].slug + '/');
                }
            }
            //надо что-то сделать, если не нашли          
        }
        if (!this.state.newTour.local && !this.state.isRefreshExist) {
            this.setState({
                isRefreshExist: true,
                isRefreshing: true,
            });
        }
        if (this.state.couldSendRequest && (!this.state.newTour.local || this.state.slug !== slug) && this.props.storeState.languages.length > 0) {
            this.setState({
                couldSendRequest: false,
                isRefreshExist: true,
                isRefreshing: true,
                selectedLanguage: this.props.storeState.activeLanguageNumber
            });
            let that = this;
            axios.get(requests.showTour + "?slug=" + (slug ? slug : ''))
                .then(response => {
                    return response.data;
                })
                .then(function (data) {
                    if (data.error) {

                        console.log('bad tour descr request');
                        throw data.error;
                    }
                    else {
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                        console.log('good, data=', data);
                        that.setState({
                            isRefreshExist: false,
                            newTour: data,
                            couldSendRequest: true,
                            slug: data.local.slug,
                            author: data.tour.author,
                        });
                    }
                })
                .catch(function (error) {

                    console.log('get wasted answer');
                    that.props.globalReduser.history.push('/404/');
                })

        }
        let textInfo = this.props.storeState.languageTextMain.tourDescription;
        let simularPlaceBlockId = topBlockId + '5';
        let helmet = this.props.storeState.languageTextMain.helmets.routeDescription;
        let info = null;
        if (document.querySelector("#routeDescriptionId1")) {
            info = document.querySelector("#routeDescriptionId1").textContent;
        }
        let shareUrl = document.URL;
        let title = null;
        let exampleImage = null;
        let points = null;
        if (this.props.storeState.languages.length > 0 && this.state.newTour.local !== undefined) {
            title = this.state.newTour.local.name;
            exampleImage = this.state.newTour.tour.blockListImage.url
            points = this.state.newTour.local.points
            if (points[0].point !== this.state.newTour.local.departurePoint.point) {
                points.unshift(this.state.newTour.local.departurePoint)
            }

        }

        let isoCurrencies = cookies.get('userCurr', { path: "/" })
        let price = null

        if (this.props.storeState.currencies.length > 0 && this.state.newTour.local !== undefined) {
            let idIndex = this.getCurrencies(this.state.newTour.tour.currency, "id")
            let usd = this.state.newTour.tour.price / this.props.storeState.currencies[idIndex].costToDefault
            if (isoCurrencies === "USD") {
                let idIndex = this.getCurrencies("USD", "ISO")
                usd = Math.ceil(usd)
                price = this.props.storeState.currencies[idIndex].symbol + " " + usd
            } else {
                let idIndex = this.getCurrencies(isoCurrencies, "ISO")
                usd = usd * this.props.storeState.currencies[idIndex].costToDefault
                usd = Math.ceil(usd)
                price = this.props.storeState.currencies[idIndex].isLeft ? (this.props.storeState.currencies[idIndex].symbol + " " + usd) :
                    (usd + " " + this.props.storeState.currencies[idIndex].symbol)
            }
        }

        let storeState = this.props.storeState;
        let activeCurrency = storeState.currencies[storeState.activeCurrencyNumber];
        let guideOrAgency = textInfo.placeDescription.variantsArray[2];
        let language = [];
        if (this.state.author !== null && this.state.author.language.length > 0) {
            language = this.state.author.language.map((el, index) => {
                for (let i = 0; i < this.props.storeState.untranslatedlanguages.length; i++) {
                    if (this.props.storeState.untranslatedlanguages[i].id === el) {
                        return this.props.storeState.untranslatedlanguages[i]
                    }
                }
            })
        }
        let cars = [];
        if (this.state.author !== null && this.state.author.cars.length > 0) {
            cars = this.state.author.cars
        }


        return (
            <>
                {
                    this.state.newTour.local ?
                        <Helmet>
                            <title>{this.state.newTour.local.name + helmet.basic.title}</title>
                            <meta name="description" content={this.state.newTour.local.name + helmet.basic.description} />
                            <meta property="og:site_name" content="Tripfer.com" />
                            <meta property="og:type" content="website" />
                            <meta property="og:url" content={document.URL} /*тут нужна подгрузка корректного слага */ />
                            <meta property="og:title" content={this.state.newTour.local.name + helmet.basic.title} />
                            <meta property="og:description" content={this.state.newTour.local.name + helmet.basic.description} />
                            <script type="application/ld+json">
                                {`
                      {
                        "@context": "https://schema.org",
                        "@type": "Place",
                        "url": `+ JSON.stringify(document.URL) + `,
                        "aggregateRating": {
                          "@type": "AggregateRating",
                          "ratingValue": `+ JSON.stringify(this.state.newTour.tour.rating) + `,
                          "reviewCount": `+ JSON.stringify(this.state.newTour.tour.commentNumber) + `
                        },
                        "name":`+ JSON.stringify(this.state.newTour.local.name) + `,
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
                        "thumbnail":"https://tripfer.com`+ this.state.newTour.tour.blockListImage.url + `"
                        }
                        ]
                      }
                  `}
                            </script>
                            {/* TODO  "addressRegion":["tbilisi","kakheti"] статика*/}
                        </Helmet> :
                        <React.Fragment />
                }

                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist}
                    isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />

                <div style={{ position: 'relative' }}>
                    {
                        this.state.newTour.local ?
                            <PlacePhotoShow onClose={() => { this.setState({ isMaskVisible: false }) }}
                                isMaskVisible={this.state.isMaskVisible} clickedImageIndex={this.state.clickedImageIndex} images={this.state.newTour.tour.images} />
                            : <React.Fragment />

                    }
                    {isMobileOnly ?
                        <Header history={this.props.history} showBtnBack={true} />

                        :
                        <React.Fragment />
                    }

                    <div className="placeDescription_background col-12 p-0" style={{ background: "url(" + (this.state.newTour.local && this.state.newTour.tour.mainImage ? (isMobileOnly ? requests.serverAddressImg + this.state.newTour.tour.blockListImage.url : requests.serverAddressImg + this.state.newTour.tour.mainImage.url) : '') + ") no-repeat" }} id={topBlockId}>
                        {!isMobileOnly ?
                            <Header history={this.props.history} />
                            :
                            <React.Fragment />
                        }

                        {
                            this.state.newTour.local ?
                                <div className="placeDescription_topImageMask">
                                    <div className="wrapper d-flex flex-column  ">
                                        <PlaceInfo tagsArray={[]} date={this.state.newTour.local.createdAt}
                                            tags={[]} rating={this.state.newTour.tour.rating}
                                            comments={this.state.newTour.tour.commentNumber} name={this.state.newTour.local.name} />
                                    </div>
                                </div>
                                : <React.Fragment />
                        }

                    </div>
                    {
                        this.state.newTour.local ?
                            <div className="wrapper d-flex flex-column">
                                <div className="drivers_bottom_background d-flex flex-column" >
                                    <div className="drivers_body d-flex">
                                        <div className="left_body_part col-12">
                                            {
                                                <TourPanel topBlockId={topBlockId} descriptionId={topBlockId} variantsArray={textInfo.placeDescription.variantsArray}
                                                    setPanelStateFunc={changePlacesFixedClass} panelFixedClass={this.props.placesState.placePanelFixedClass}
                                                    isGuide={this.state.author.guide} isTour={true}
                                                    panelSelectedElement={this.props.placesState.placePanelSelectedElement} setPanelSelectedElement={setPlacesPanelSelectedElement}
                                                    removeElements={this.state.newTour.additionalTours.length === 0 ? [simularPlaceBlockId] : []} />
                                            }

                                            <div className="placeDescription_block d-flex flex-column p-0" style={this.state.btMore ? { maxHeight: "max-content" } : { maxHeight: "480px" }} id={topBlockId + "1"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[0]}</div>
                                                {/* <div key={JSON.stringify(this.state.newTour.local.endPlace)}>
                                                    <PlaceTravelBlock id={topBlockId + "3"} place={{ ...this.state.newTour.local, country: this.state.newTour.country, capital: this.state.newTour.capital }} />
                                                </div> */}
                                                <PlaceProgramm id={topBlockId + "1"} tagsArray={[]} place={{ ...this.state.newTour.local/*, tags: this.state.newTour.tour.tags, rating: this.state.newTour.tour.rating, comments: this.state.newTour.tour.commentNumber*/ }} />
                                            </div>
                                            <div className="placeDescription_block_btMore d-flex justify-content-end">
                                                <span onClick={() => { this.setState({ btMore: !this.state.btMore }) }}>{this.state.btMore ? "Скрыть" : "Подробнее"}</span>
                                            </div>
                                            {isMobileOnly ? <>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.share}</div>
                                                <div className="d-flex ">
                                                    <div className="networkLink">
                                                        <TelegramShareButton
                                                            url={shareUrl}
                                                            title={title}
                                                            className="networkLink__share-button">
                                                            <TelegramIcon size={32} round />
                                                        </TelegramShareButton>
                                                    </div>
                                                    <div className="networkLink">
                                                        <ViberShareButton
                                                            url={shareUrl}
                                                            title={title}
                                                            className="networkLink__share-button">
                                                            <ViberIcon
                                                                size={32}
                                                                round />
                                                        </ViberShareButton>
                                                    </div>
                                                    <div className="networkLink">
                                                        <WhatsappShareButton
                                                            url={shareUrl}
                                                            title={title}
                                                            separator=":: "
                                                            className="networkLink__share-button">
                                                            <WhatsappIcon size={32} round />
                                                        </WhatsappShareButton>
                                                    </div>
                                                    <div className="networkLink">
                                                        <FacebookShareButton
                                                            url={shareUrl}
                                                            quote={title}
                                                            className="networkLink__share-button">
                                                            <FacebookIcon
                                                                size={32}
                                                                round />
                                                        </FacebookShareButton>
                                                    </div>
                                                    <div className="networkLink">
                                                        <TwitterShareButton
                                                            url={shareUrl}
                                                            title={title}
                                                            className="networkLink__share-button">
                                                            <TwitterIcon
                                                                size={32}
                                                                round />
                                                        </TwitterShareButton>
                                                    </div>
                                                    <div className="networkLink">
                                                        <VKShareButton
                                                            url={shareUrl}
                                                            image={`${String(window.location)}/${exampleImage}`}
                                                            windowWidth={660}
                                                            windowHeight={460}
                                                            className="networkLink__share-button">
                                                            <VKIcon
                                                                size={32}
                                                                round />
                                                        </VKShareButton>
                                                    </div>
                                                    <div className="networkLink" >
                                                        <PinterestShareButton
                                                            url={String(shareUrl)}
                                                            media={String("https://tripfer.com" + exampleImage)}
                                                            windowWidth={1000}
                                                            windowHeight={730}
                                                            className="networkLink__share-button">
                                                            <PinterestIcon size={32} round />
                                                        </PinterestShareButton>
                                                    </div>
                                                </div>
                                            </> : <React.Fragment />}

                                            <div className="placeDescription_block d-flex flex-column" id={topBlockId + "2"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[1]}</div>
                                                <PlacePhotos photoArray={this.state.newTour.tour.images}
                                                    showMask={(clickedImageIndex) => { this.setState({ isMaskVisible: true, clickedImageIndex: clickedImageIndex }) }} />
                                            </div>
                                            <div className="placeDescription_block d-flex flex-column" id={topBlockId + "3"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{guideOrAgency[this.state.author.guide ? 0 : 1]}</div>
                                                {/*  */}
                                                <div className="placeDescription_author d-flex flex-md-row flex-column align-items-center justify-content-between col-12 p-0 mb-4">
                                                    <div className="d-flex col-md-6 col-12 mb-md-0 mb-3">
                                                        <div>
                                                            <img src={requests.serverAddressImg + this.state.author.avatar.url} alt={this.state.author.firstName + " avatar"} />
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-center pl-4">
                                                            <h5><Link to={"/" + cookies.get('country', { path: "/" }) + "-" + cookies.get('userLangISO', { path: "/" }) +"/guides/"+this.state.author.userSlug +"/"}>{this.state.author.firstName + " " + this.state.author.lastName}</Link></h5>
                                                            <Stars value={this.state.author.rating} commentNumber={this.state.author.comments ? this.state.author.comments.length + " отзывов" : 0} valueDisplay={true} commentNumberDisplay={true} />
                                                            <div className="d-flex align-items-center">
                                                                <span>{textInfo.language}</span>
                                                                {language.map((el, index) => (<i className="placesList_info_icons" style={{ background: "url(" + requests.serverAddressImg + el.icon.url + ")no-repeat" }} />))}
                                                            </div>
                                                            {cars.length > 0 &&
                                                                <div className="d-flex flex-wrap align-items-center">
                                                                    <span>{textInfo.cars}</span>
                                                                    {cars.map((el, index) => (<span>{el.carBrand + (cars.length - 1 === index ? " " : ", ")}</span>))}
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <p>{this.state.author.dataAbout}</p>
                                                    </div>
                                                </div>
                                                {/*  */}
                                            </div>
                                            <RouteTravelBlock points={points} id={topBlockId + "4"} isTours={true} textInfo={textInfo}
                                                daily={this.state.newTour.tour.daily} departureDate={this.state.departureDate}
                                                author={this.state.author} changeTravelVisibility={this.changeTravelVisibility}
                                                dateWork={this.state.newTour.tour.calendary} price={price} elementActive={this.state.newTour} />

                                            <div className="placeDescription_block flex-column" id={simularPlaceBlockId} style={{ display: this.state.newTour.additionalTours.length > 0 ? 'flex' : 'none' }}>
                                                <SimularToursBlock outerBlock={simularPlaceBlockId} tours={this.state.newTour.additionalTours}
                                                    tags={this.state.newTour.tags} changeTravelVisibility={this.changeTravelVisibility}
                                                    fragmentName={textInfo.placeDescription.variantsArray[4]} priseDisplay={"none"} />
                                            </div>

                                            <CommentBlock targetType="tour" comments={this.state.newTour.comments} targetId={this.state.newTour.tour.id} page={this.state.page} setPage={this.setPage}
                                                showMorePages={this.showMorePages} showPages={this.state.showPages} id={topBlockId + "6"} startRolling={() => this.startRolling()} endRolling={(result) => this.endRolling(result)} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <React.Fragment />
                    }
                    <StartTravelForm {...this.props} changeTravelVisibility={this.changeTravelVisibility}
                        changeSuccessVisibility={this.changeSuccessVisibility} travelVisibility={this.state.travelVisibility}
                        elementPrice={this.state.elementPrice} elementActive={this.state.elementActive}
                        activeCurrency={activeCurrency} isoCountryMap={this.props.storeState.isoCountryMap}
                        textInfo={this.props.storeState.languageTextMain.startTravelForm}
                        isTourDescription={true}

                    />
                    <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
                        textInfo={this.props.storeState.languageTextMain.startTravelForm}
                    />
                </div>

            </>
        )
    }
}

const ToureDescription = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        placesState: state.PlacesReduser,
        toursState: state.ToursReduser
    }),

)(ToureDescriptionClass);

export default ToureDescription;