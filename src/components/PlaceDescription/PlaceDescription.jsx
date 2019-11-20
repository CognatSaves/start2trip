import React from 'react';
import { connect } from 'react-redux';
import { changePlacesFixedClass, setPlacesPanelSelectedElement,setPlacesList } from '../../redusers/ActionPlaces';
import { isMobileOnly } from 'react-device-detect'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import requests from '../../config';

// import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
// import georgiaImg from '../media/georgia.png';

import Header from '../header/Header';
import PlaceInfo from './PlaceInfo.jsx';
import PlaceProgramm from './PlaceProgramm.jsx';
import PlacePhotos from './PlacePhotos.jsx';
import PlaceTravelBlock from './PlaceTravelBlock.jsx';
import CommentBlock from '../TourDescription/CommentBlock.jsx';
import TourPanel from '../TourDescription/TourPanel.jsx';
import SimularPlaceBlock from './SimularPlaceBlock';
import PlacePhotoShow from './PlacePhotoShow.jsx';
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, } from '../../redusers/GlobalFunction'

import ShareLinkElements from '../usefulСomponents/ShareLinkElements';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class PlaceDescriptionClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "Заинтересованный посетитель",
            page: 1,
            showPages: 1,
            isMaskVisible: false,
            clickedImageIndex: 0,
            slug: '',
            selectedPhotoIndex: 0,
            photoSlice: 0,
            newPlace: {},
            couldSendRequest: true,
            selectedLanguage: -1,
            images: null,
            //isMobile: false,
            //topBlockImage:''
        };
    }

    selectPhoto = (photoIndex) => {
        function calculatePhotoSlice(photoIndex, length, OldPhotoIndex, OldPhotoSlice) {
            let photoSlice = 0;
            if (OldPhotoIndex < photoIndex) {
                photoSlice = OldPhotoSlice + 1;
            }
            else {
                photoSlice = OldPhotoSlice - 1;
            }
            if (length <= 7) {
                return 0;
            }
            else {
                while (photoSlice < 0) {
                    photoSlice++;
                }
                while (length - photoSlice < 7) {
                    photoSlice--;
                }
                return photoSlice;
            }
        }
        let photoSlice = calculatePhotoSlice(photoIndex, this.state.photoArray.length, this.state.selectedPhotoIndex, this.state.photoSlice);
        this.setState({
            selectedPhotoIndex: photoIndex,
            photoSlice: photoSlice
        })

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
    newComments = (newArray)=>{
        let newPlace = {...this.state.newPlace}
        newPlace.comments = newArray
        this.setState({newPlace:newPlace})
    }

    render() {

        console.log('Place description render', this.state, this.props);

        ///let countryId = this.props.match.params.country;
        //let placeId = this.props.match.params.id;
        //let comments = [...this.props.commentState.comments].reverse();
        //let place = this.props.placesState.places[/*countryId*/0].places[/*placeId*/0];
        let slug = this.props.match.params.slug;



        if (this.props.storeState.languages.length > 0 && this.state.newPlace.local && this.state.selectedLanguage !== this.props.storeState.activeLanguageNumber) {
            //если языки на месте и данные на месте и выбранный язык не совпадает с языком, что выбрал пользователь, то нужно отправить запрос с другим слагом


            let slugArray = this.state.newPlace.local.slugArray;
            let number = 0;
            for (; number < slugArray.length; number++) {
                if (this.props.storeState.languages[this.props.storeState.activeLanguageNumber].id === slugArray[number].language) {
                    this.setState({
                        selectedLanguage: this.props.storeState.activeLanguageNumber
                    });
                    this.props.globalReduser.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/places/' + slugArray[number].slug + '/');
                    break;
                }
            }
            if (number === slugArray.length) {
                //происходит, если прошли по всему массиву slug и не нашли нужный, т.е., скорее всего, он был написан вручную
                //в таком случае выходим на уровень выше, сделать ничего нельзя
                this.props.globalReduser.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/places/');
            }


        }

        if (this.state.couldSendRequest && (!this.state.newPlace.local || this.state.slug !== slug) && this.props.storeState.languages.length > 0) {
            //если можем сделать запрос (проверка на ожидание ответа) и (нет данных локально или slug не совпадает с сохранённым) и языки на месте, то отправляем запрос

            this.setState({
                couldSendRequest: false,
                selectedLanguage: this.props.storeState.activeLanguageNumber
            })
            startRefresherGlobal(this)
            let that = this;
            
            axios.get(requests.showPlace + "?slug=" + (slug ? slug : '') /*+ "&country=" + cookies.get('country', { path: '/' })*/ /*+"&lang="+this.props.storeState.languages[this.props.storeState.activeLanguageNumber].id*/)
                .then(response => {

                    // console.log(response);
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
                        });

                        console.log('good');
                        console.log(data);
                        thenFuncGlobal(that)
                        that.setState({ newPlace: data, couldSendRequest: true, slug: data.local.slug, selectedLanguage: this.props.storeState.activeLanguageNumber });
                        that.props.match.params.slug = data.local.slug;
                        
                        that.props.dispatch(setPlacesList([], data.tags, [],{}));
                    }
                })
                .catch(error => {
                    catchFuncGlobal(that)
                    console.log('get wasted answer');
                    that.props.globalReduser.history.push('/404/');
                });



        }

        let topBlockId = "placeDescriptionId";
        let simularPlaceBlockId = topBlockId + '4';
        let textInfo = this.props.storeState.languageTextMain.placeDescription;
        let bigImage = 'url(' + (this.state.newPlace.place && this.state.newPlace.place.mainImage ?
            requests.serverAddressImg + this.state.newPlace.place.mainImage.url : '') + ') no-repeat';
        let smallImage = 'url(' + (this.state.newPlace.place && this.state.newPlace.place.blockListImage ?
            requests.serverAddressImg + this.state.newPlace.place.blockListImage.url : '') + ') no-repeat';
        let helmet = this.props.storeState.languageTextMain.helmets.placeDescription;
        let info = null;
        if (document.querySelector("#placeDescriptionId1")) {
            info = document.querySelector("#placeDescriptionId1").textContent;
        }

        let shareUrl = document.URL;
        let title = null;
        let exampleImage = null;
        if (this.props.storeState.languages.length > 0 && this.state.newPlace.local !== undefined) {
            title = this.state.newPlace.local.name;
            exampleImage = this.state.newPlace.place.blockListImage.url
        }
        return (
            <>
                {
                    this.state.newPlace.local ?
                        <Helmet>
                            <title>{this.state.newPlace.local.name + helmet.object.title}</title>
                            <meta name="description" content={this.state.newPlace.local.name + helmet.object.description} />
                            <meta property="og:site_name" content="Tripfer.com" />
                            <meta property="og:type" content="website" />
                            <meta property="og:url" content={document.URL} /*Здесь нужно нормальный slug подключить */ />
                            <meta property="og:title" content={this.state.newPlace.local.name + helmet.object.title} />
                            <meta property="og:description" content={this.state.newPlace.local.name + helmet.object.description} />
                            <script type="application/ld+json">
                                {`
                      {
                        "@context": "https://schema.org",
                        "@type": "Place",
                        "url": `+ JSON.stringify(document.URL) + `,
                        "aggregateRating": {
                          "@type": "AggregateRating",
                          "ratingValue": `+ JSON.stringify(this.state.newPlace.place.rating) + `,
                          "reviewCount": `+ JSON.stringify(this.state.newPlace.place.commentNumber) + `
                        },
                        "name":`+ JSON.stringify(this.state.newPlace.local.name) + `,
                        "description":`+ JSON.stringify(info) + `,
                        "address":[
                        {
                         "@type": "PostalAddress",
                         "addressCountry":`+ JSON.stringify(this.props.storeState.country) + `
                         } 
                        ],
                        "geo": {
                          "@type": "GeoCoordinates",
                          "latitude": `+ JSON.stringify(this.state.newPlace.local.endPlace.lat) + `,
                          "longitude": `+ JSON.stringify(this.state.newPlace.local.endPlace.lat) + `
                        },
                        "hasMap":"https://www.google.com/maps/place/@`+ this.state.newPlace.local.endPlace.lat + `,` + this.state.newPlace.local.endPlace.lat + `,15z",
                         "publicAccess": true,
                        "photo":[
                        {
                        "@type": "ImageObject",
                        "thumbnail":`+ JSON.stringify("https://tripfer.com" + this.state.newPlace.place.blockListImage.url) + `
                        }
                        ]
                      }
                  `}
                                {/* TODO  "addressRegion":["tbilisi","kakheti"] статика*/}
                            </script>
                        </Helmet> :
                        <React.Fragment />
                }


                <div style={{ position: 'relative',minHeight:"94vh" }}>
                    {
                        this.state.images !== null ?
                            <PlacePhotoShow onClose={() => this.setState({ isMaskVisible: false })}
                                isMaskVisible={this.state.isMaskVisible} clickedImageIndex={this.state.clickedImageIndex} images={this.state.newPlace.place.images} />
                            : <React.Fragment />
                    }
                    {isMobileOnly ?
                        <Header history={this.props.history} showBtnBack={true} />

                        :
                        <React.Fragment />
                    }
                    <div className="placeDescription_background col-12 p-0" style={{ background: isMobileOnly ? smallImage : bigImage }} id={topBlockId}>

                        {!isMobileOnly ?
                            <Header history={this.props.history} />
                            :
                            <React.Fragment />
                        }
                        {
                            this.state.newPlace.local ?
                                <div className="placeDescription_topImageMask">
                                    <div className="wrapper d-flex flex-column">
                                        <PlaceInfo tagsArray={this.state.newPlace.tags} date={this.state.newPlace.local.createdAt}
                                            tags={this.state.newPlace.place.tags} rating={this.state.newPlace.place.rating}
                                            comments={this.state.newPlace.place.commentNumber} name={this.state.newPlace.local.name}
                                    /*place={{...this.state.newPlace.local}}*/ />
                                    </div>
                                </div>
                                :
                                <React.Fragment />
                        }

                    </div>
                    {
                        this.state.newPlace.local ?
                            <div className="wrapper d-flex flex-column">
                                <div className="drivers_bottom_background d-flex flex-column" >
                                    <div className="drivers_body d-flex">
                                        <div className="left_body_part col-12">
                                            <TourPanel topBlockId={topBlockId} descriptionId={topBlockId} variantsArray={textInfo.placeDescription.variantsArray}
                                                setPanelStateFunc={changePlacesFixedClass} panelFixedClass={this.props.placesState.placePanelFixedClass}
                                                panelSelectedElement={this.props.placesState.placePanelSelectedElement} setPanelSelectedElement={setPlacesPanelSelectedElement}
                                                removeElements={this.state.newPlace.additionalPlaces.length === 0 ? [simularPlaceBlockId] : []} />

                                            <div className="placeDescription_block d-flex flex-column p-0" style={this.state.btMore ? { maxHeight: "max-content" } : { maxHeight: "454px" }} id={topBlockId + "1"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[0]}</div>
                                                <PlaceProgramm tagsArray={this.state.newPlace.tags} place={/*this.state.place*/{ ...this.state.newPlace.local, tags: this.state.newPlace.place.tags, rating: this.state.newPlace.place.rating, comments: this.state.newPlace.place.commentNumber }} />
                                            </div>
                                            {
                                                (isMobileOnly ? (this.state.newPlace.local.info.length > 700) : (this.state.newPlace.local.info.length > 1455)) &&
                                                <div className="placeDescription_block_btMore d-flex justify-content-end">
                                                    <span onClick={() => { this.setState({ btMore: !this.state.btMore }) }}>{this.state.btMore ? textInfo.btMore[0] : textInfo.btMore[1]}</span>
                                                </div>
                                            }


                                            <div className="placeDescription_block d-flex flex-column" id={topBlockId + "2"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[1]}</div>

                                                <PlacePhotos photoArray={/*this.state.photoArray*/this.state.newPlace.place.images}
                                                    showMask={(clickedImageIndex, images) => { this.setState({ isMaskVisible: true, clickedImageIndex: clickedImageIndex, images: images }) }}/*width={this.state.width} height={this.state.height} number={this.state.n}*/ />
                                            </div>
                                            {isMobileOnly ? <>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.share}</div>
                                                <div className="d-flex ">
                                                    <ShareLinkElements shareUrl={shareUrl} title={title} isAdmin={false} />
                                                </div>
                                            </> : <React.Fragment />}
                                            <div key={JSON.stringify(this.state.newPlace.local.endPlace)}>
                                                <PlaceTravelBlock id={topBlockId + "3"} place={{ ...this.state.newPlace.local, country: this.state.newPlace.country, capital: this.state.newPlace.capital }} />
                                            </div>

                                            <div className="placeDescription_block flex-column" id={simularPlaceBlockId} style={{ display: this.state.newPlace.additionalPlaces.length > 0 ? 'flex' : 'none' }}>
                                                {
                                                    /*
                                                        <SimularToursBlock tours={this.state.popularPlaces} fragmentName={"Вас может заинтересовать"} priseDisplay={"none"}/>
                                                    */
                                                }
                                                <SimularPlaceBlock outerBlock={simularPlaceBlockId} places={this.state.newPlace.additionalPlaces} tags={this.state.newPlace.tags} /*tours={this.state.popularPlaces}*/ fragmentName={textInfo.placeDescription.variantsArray[3]} priseDisplay={"none"} />
                                            </div>
                                            <CommentBlock targetType="place" comments={this.state.newPlace.comments} newComments={this.newComments}
                                            targetId={this.state.newPlace.place.id} page={this.state.page} setPage={this.setPage} showCreateComment={true}
                                            showMorePages={this.showMorePages} showPages={this.state.showPages} id={topBlockId + '5'} />

                                        </div>
                                        {
                                            /*
                                            <div className="right_body_part d-none">
                                                <DriversCommercial />
                                            </div>
                                            */
                                        }

                                    </div>

                                </div>
                            </div>
                            :
                            <React.Fragment />
                    }
                </div>
            </>
        )

    }
}

const PlaceDescription = connect(
    (state) => ({
        placesState: state.PlacesReduser,
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),

)(PlaceDescriptionClass);

export default PlaceDescription;