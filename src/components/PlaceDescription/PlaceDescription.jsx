import React from 'react';
import './PlaceDescription.css';
import Header from '../header/Header';
import PlaceInfo from './PlaceInfo.jsx';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';

import { connect } from 'react-redux';

import ippodrom from './pictures/ippodrom.jpg';
import ippodrom2 from './pictures/ippodrom2.jpg';
import ippodrom3 from './pictures/ippodrom3.jpg';
import ippodrom4 from './pictures/ippodrom4.jpg';
import georgiaImg from '../home/HomeBody/pictures/georgia.png';

import PlaceProgramm from './PlaceProgramm.jsx';
import PlacePhotos from './PlacePhotos.jsx';
import PlaceTravelBlock from './PlaceTravelBlock.jsx';
import PlaceMapBlock from './PlaceMapBlock.jsx';
import CommentBlock from '../TourDescription/CommentBlock.jsx';
import SimularToursBlock from '../TourDescription/SimularToursBlock.jsx';
import TourPanel from '../TourDescription/TourPanel.jsx';
import { changePlacesFixedClass, setPlacesPanelSelectedElement } from '../../redusers/ActionPlaces';
import axios from 'axios';
import requests from '../../config';
import SimularPlaceBlock from './SimularPlaceBlock';
import PlacePhotoShow from './PlacePhotoShow.jsx';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import { isMobile } from 'react-device-detect'
class PlaceDescriptionClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "Заинтересованный посетитель",
            page: 1,
            showPages: 1,
            popularPlaces: [
                { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "32 отзыва", prise: "120$" },
                { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "12 отзывов", prise: "80$" },
                { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "55 отзыва", prise: "150$" },
            ],
            isMaskVisible: false,
            clickedImageIndex: 0,
            slug: '',
            selectedPhotoIndex: 0,
            photoSlice: 0,
            //width: 870,
            //height: 500,
            //n: 7,
            //place: this.props.placesState.places[/*countryId*/0].places[/*placeId*/0],
            newPlace: {},
            couldSendRequest: true,
            isRefreshExist: true,
            isRefreshing: true,
            isGoodAnswer: true,
            //photoArray: [ippodrom, ippodrom4, ippodrom2, ippodrom3, ippodrom, ippodrom4, ippodrom2, ippodrom3, ippodrom, ippodrom4, ippodrom2, ippodrom3, ippodrom, ippodrom4, ippodrom2, ippodrom3, ippodrom, ippodrom4, ippodrom2, ippodrom3],
            selectedLanguage: -1,
            //isMobile: false,
            //topBlockImage:''
        };
    }
    /*
    shouldComponentUpdate(nextProps, nextState){
        debugger;
        let a = (JSON.stringify(nextProps)!==JSON.stringify(this.props));
        let b = (JSON.stringify(nextState)!==JSON.stringify(this.state));
        //let c = (isMobile!==this.state.isMobile);
        return a || b ;
    }
    */
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
    /*
    shouldComponentUpdate(nextProps, nextState){
        
        let result = (JSON.stringify(nextProps)!==JSON.stringify(this.props) || JSON.stringify(nextState)!==JSON.stringify(this.state)); 
        return result;
    }
    */
    selectPhoto=(photoIndex)=> {
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
    showMorePages=()=> {
        this.setState({
            page: this.state.page + 1,
            showPages: this.state.showPages + 1
        })
    }
    setPage=(page)=> {
        if (page !== "...") {
            this.setState(
                {
                    page: page,
                    showPages: 1
                }
            )
        }
    }
    render() {
        console.log('Place description render', this.state, this.props);
        
        ///let countryId = this.props.match.params.country;
        //let placeId = this.props.match.params.id;
        let comments = [...this.props.commentState.comments].reverse();
        //let place = this.props.placesState.places[/*countryId*/0].places[/*placeId*/0];
        let slug = this.props.match.params.slug;
        if (this.props.storeState.languages.length > 0 && this.state.newPlace.local && this.state.selectedLanguage !== this.props.storeState.activeLanguageNumber) {

            let slugArray = this.state.newPlace.local.slugArray;
            for (let i = 0; i < slugArray.length; i++) {
                if (this.props.storeState.languages[this.props.storeState.activeLanguageNumber].id === slugArray[i].language) {
                    this.setState({
                        selectedLanguage: this.props.storeState.activeLanguageNumber
                    });
                    this.props.globalReduser.history.push('/place/' + slugArray[i].slug);
                }
            }
            //надо что-то сделать, если не нашли          
        }

        if (this.state.couldSendRequest && (!this.state.newPlace.local || this.state.slug !== slug) && this.props.storeState.languages.length > 0) {

            this.setState({
                couldSendRequest: false,
                isRefreshExist: true,
                selectedLanguage: this.props.storeState.activeLanguageNumber
            })
            let that = this;
            axios.get(requests.showPlace + "?slug=" + (slug ? slug : '')/*+"&lang="+this.props.storeState.languages[this.props.storeState.activeLanguageNumber].id*/)
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
                        that.setState({ isRefreshExist: false, newPlace: data, couldSendRequest: true, slug: data.local.slug });
                        that.props.match.params.slug = data.local.slug;
                        //this.props.dispatch(setPlacesList(data.places, data.tags, data.directions,data.country));
                    }
                })
                .catch(error => {
                    console.log('get wasted answer');
                    that.props.globalReduser.history.push('/');
                });



        }

        let topBlockId = "placeDescriptionId";
        let simularPlaceBlockId = topBlockId+'4';
        let textInfo = this.props.storeState.languageTextMain.placeDescription;
        let bigImage = 'url(' + (this.state.newPlace.place && this.state.newPlace.place.mainImage ?
            requests.serverAddress + this.state.newPlace.place.mainImage.url : '') + ') no-repeat';
        let smallImage = 'url(' + (this.state.newPlace.place && this.state.newPlace.place.blockListImage ?
            requests.serverAddress + this.state.newPlace.place.blockListImage.url : '') + ') no-repeat';
        return (
            <React.Fragment>
                <DriverRefreshIndicator isRefreshExist={this.state.isRefreshExist} isRefreshing={this.state.isRefreshing} isGoodAnswer={this.state.isGoodAnswer} />

                <div style={{ position: 'relative' }}>
                    {
                        this.state.newPlace.local ?
                            <PlacePhotoShow onClose={() => this.setState({ isMaskVisible: false })}
                                isMaskVisible={this.state.isMaskVisible} clickedImageIndex={this.state.clickedImageIndex} images={this.state.newPlace.place.images} />
                            : <React.Fragment />
                    }

                    <div className="placeDescription_background col-12 p-0" style={{ background: isMobile ? smallImage : bigImage }} id={topBlockId}>
                        <Header history={this.props.history} />
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

                                : <React.Fragment />
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
                                                removeElements={this.state.newPlace.additionalPlaces.length===0 ? [simularPlaceBlockId] : []}/>

                                            <div className="placeDescription_block d-flex flex-column p-0" id={topBlockId + "1"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[0]}</div>
                                                <PlaceProgramm tagsArray={this.state.newPlace.tags} place={/*this.state.place*/{ ...this.state.newPlace.local, tags: this.state.newPlace.place.tags, rating: this.state.newPlace.place.rating, comments: this.state.newPlace.place.commentNumber }} />
                                            </div>

                                            <div className="placeDescription_block d-flex flex-column" id={topBlockId + "2"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[1]}</div>
                                                <PlacePhotos photoArray={/*this.state.photoArray*/this.state.newPlace.place.images}
                                                    showMask={(clickedImageIndex) => { this.setState({ isMaskVisible: true, clickedImageIndex: clickedImageIndex }) }}/*width={this.state.width} height={this.state.height} number={this.state.n}*/ />
                                            </div>

                                            <PlaceTravelBlock id={topBlockId + "3"} place={{ ...this.state.newPlace.local, country: this.state.newPlace.country, capital: this.state.newPlace.capital }} />
                                            {
                                                /*
                                                    <PlaceMapBlock />
                                                */
                                            }


                                            <div className="placeDescription_block flex-column" id={simularPlaceBlockId} style={{display: this.state.newPlace.additionalPlaces.length>0 ? 'flex' : 'none'}}>
                                                {
                                                    /*
                                                        <SimularToursBlock tours={this.state.popularPlaces} fragmentName={"Вас может заинтересовать"} priseDisplay={"none"}/>
                                                    */
                                                }
                                                <SimularPlaceBlock outerBlock={simularPlaceBlockId} places={this.state.newPlace.additionalPlaces} tags={this.state.newPlace.tags} tours={this.state.popularPlaces} fragmentName={textInfo.placeDescription.variantsArray[3]} priseDisplay={"none"} />
                                            </div>
                                            <CommentBlock targetType="place" comments={this.state.newPlace.comments} targetId={this.state.newPlace.place.id} page={this.state.page} setPage={this.setPage}
                                                showMorePages={this.showMorePages} showPages={this.state.showPages} id={topBlockId + '5'} startRolling={() => this.startRolling()} endRolling={(result) => this.endRolling(result)} />

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
                            : <React.Fragment />
                    }

                </div>
            </React.Fragment>
        )

    }
}

const PlaceDescription = connect(
    (state) => ({
        placesState: state.PlacesReduser,
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        commentState: state.CommentReduser
    }),

)(PlaceDescriptionClass);

export default PlaceDescription;