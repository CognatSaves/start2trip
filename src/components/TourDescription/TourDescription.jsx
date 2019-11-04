import React from 'react';
import { connect } from 'react-redux';
import { changePlacesFixedClass, setPlacesPanelSelectedElement } from '../../redusers/ActionPlaces';
import { isMobileOnly } from 'react-device-detect';
import { Helmet } from 'react-helmet';

import axios from 'axios';
import requests from '../../config';
import './TourDescription.css'

import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,getCurrencies } from '../../redusers/GlobalFunction'
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
import TourHeaderEditorCustom from '../usefulСomponents/TourHeaderEditorCustom'

import TourGuideInfo from './TourGuideInfo'

import ShareLinkElements from '../driverProfileRegistration/ShareLinkElements';
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
            imgModal: false,

            savedDate: '',//date that connected with savedSeatsNumber
            savedDateSeatsData: {}
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

    changeTravelVisibility = (elementPrice, elementActive) => {
        let obj = elementActive ? (elementActive.tour ? elementActive.tour : elementActive.element) : null;
        if(this.state.savedDate.length>0){
            this.setState({
                travelVisibility: !this.state.travelVisibility,
                elementPrice: !this.state.travelVisibility ? elementPrice : 0,
                savedDate: elementActive && obj && this.state.newTour.tour.id === obj.id ? this.state.savedDate : '',//if id's is not equal - we must calculate savedDateSeatsData again
                elementActive: !this.state.travelVisibility ? elementActive : null,           
            })
        }
        else{

        }
        
    }
    changeSuccessVisibility = (value) => {
        this.setState({
            successVisibility: value,

        })
    }
    imgModalShow = () => {
        this.setState({ imgModal: !this.state.imgModal });
    };
    changeImg = (newImg, typeImg) => {
        let newTour = { ...this.state.newTour }
        if (typeImg === "mainImage") {
            newTour.tour.mainImage.url = newImg
        } else {
            newTour.tour.blockListImage.url = newImg
        }
        this.setState({ newTour: newTour })

    }
    resetSelectedSeatsNumber = () => {
        //this function reset the seats number if date is changed
        //
        if(this.state.departureDate){
            let departureDateDay = this.state.departureDate.toISOString().substring(0,10);
            if(this.state.savedDate!==departureDateDay){
                
                let selectedSeatsNumber = this.findSelectedSeatsNumber(departureDateDay);
                this.setState({
                    savedDateSeatsData: selectedSeatsNumber,
                    savedDate: departureDateDay
                })
            }
        }
        else{
            //if no date - set default values
            if(this.state.savedDate!==''){
                this.setState({
                    savedDate: '',
                    savedDateSeatsData: {}
                })
            }   
        }
    }
    findSelectedSeatsNumber = (departureDateDay) => {
        //this function returns the seats number in selected departureDate
        //visited tour will be calculated for newTour if the elementActive is not null (that means, that we do not visit startTravelForm)
  
        
        let visitedTour = this.state.elementActive ? (this.state.elementActive.tour ? this.state.elementActive.tour : this.state.elementActive.element)
            : this.state.newTour.tour;
        let calendary = visitedTour.calendary;
        let isCalendaryValid = false;
        const daily = visitedTour.daily;
        const isPricePerPerson = visitedTour.isPricePerPerson;
        
        
        if(!daily){
            //if tour !daily - firstly check, is the day is good enough for us, 
            //it will be good, if it exist in calendary
            for(let i=0; i<calendary.length; i++){
                let calendaryDay = new Date(calendary[i]).toISOString().substring(0,10);
                if(calendaryDay===departureDateDay){
                    isCalendaryValid=true;
                    break;
                }
            }
        }
        if(daily || isCalendaryValid){
            let tourSeatsDataArray = visitedTour.tourSeatsData;
            for(let i=0; i<tourSeatsDataArray.length; i++){
                if(tourSeatsDataArray[i].startDefault===departureDateDay){
                    return {
                        //startDefault: tourSeatsDataArray[i].startDefault,
                        //if tour is !isPricePerPerson and there are any book on that day - say, that there are no seats for new customers
                        //this function must be on server, but, maybe, can be not everywhere
                        //additional check can be inportant for us
                        //later this place can be tested and additional check can be removed
                        seatsLeft: !isPricePerPerson && tourSeatsDataArray[i].seatsReserved>0 ? 0 :  tourSeatsDataArray[i].seatsLeft,
                        seatsReserved: tourSeatsDataArray[i].seatsReserved
                    }
                }
            }
            return {
                //startDefault: departureDateDay,
                seatsLeft: visitedTour.seats,
                seatsReserved: 0
            }
        }
        return {
            //startDefault: departureDateDay,
            seatsLeft: 0,
            seatsReserved: 0
        }
    }
    shouldDisableTourDateFunc = (params) => {
        //dont use "this" in that func, if you need "this" - send "that" throw params

        //this function check dates in calendary, if we have a possibility to book
        //tour on that day)
        //I send it to routeTravelBlock calendary, but also that func should check 
        //is the date, that we take from url is valid
        function calendaryCheck(dateWork, selectedDate){
            //this function makes calendary check
            //we must find element here, if we want show date
            //return true, if not finded, other way - false
            let day = selectedDate.getDate();
            let month = selectedDate.getMonth()+1;
            let year = selectedDate.getFullYear();
            let flag = true;
            for(let i=0; i<dateWork.length; i++){
                let newDate = new Date(dateWork[i]);
                let newDay = newDate.getDate();
                let newMonth = newDate.getMonth()+1;
                let newYear = newDate.getFullYear();
                if (newDay === day && newMonth === month && newYear === year) {
                    flag = false;
                    i=dateWork.length;
                }
            }
            return flag;
        }
        function tourSeatsDataCheck(tourSeatsData, selectedDate, isMulticustomeralTour){
            //this function makes tourSeatsData check
            //we must not find object here or find it and there must be free seats
            //return true, if date is not valid, otherwise - false
            
            let day = selectedDate.getDate();
            let month = selectedDate.getMonth()+1;
            let year = selectedDate.getFullYear();
            let selectedDateString = year + '-'+(month<10 ? '0'+month : month) + '-' + (day<10 ? '0'+day : day);
            //let isMulticustomeralTour = 
            for(let i=0; i<tourSeatsData.length; i++){
                if(tourSeatsData[i].startDefault === selectedDateString){
                    if(isMulticustomeralTour){
                        //if multicustomeral, we must have at least 1 free seat
                        if(tourSeatsData[i].seatsLeft>0){
                            return false
                        }
                        else{
                            return true;
                        }
                    }
                    else{
                        //if singlecustomeral, there must be another users, that book that tour on that day
                        //server protect us from that(send zeros on needed places), but bonus check is needed
                        if(tourSeatsData[i].seatsLeft>0 && tourSeatsData[i].seatsReserved===0){
                            return false
                        }
                        else{
                            return true;
                        }
                    }
                }   
            }
            return false;
        }
        
        let {daily,dateWork,date,tourSeatsData,isPricePerPerson,
            busyDaysArrayVerification,busyDays,daysNumber} = params;
        
        if(!daily){
            let calendaryCheckValue = calendaryCheck(dateWork,date);
            if(calendaryCheckValue){
                //if calendaryCheckValue === true, then this tour can not be driven that day 
                return calendaryCheckValue;
            }
        }
        let tourSeatsDataCheckValue = tourSeatsDataCheck(tourSeatsData,
             date, isPricePerPerson);
        if(tourSeatsDataCheckValue){
            //if tourSeatsDataCheckValue === true, then this tour can not be driven that day
            return tourSeatsDataCheckValue;
        }
        //busyDaysArrayVerification func 
        let busyDaysCheckValue = !(busyDaysArrayVerification(busyDays, date, daysNumber));
        return busyDaysCheckValue;
    }
    render() {

        console.log('TourDescription render', this.state, this.props);
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
        if (this.state.couldSendRequest && (!this.state.newTour.local || this.state.slug !== slug) && this.props.storeState.languages.length > 0) {
            this.setState({
                couldSendRequest: false,
                selectedLanguage: this.props.storeState.activeLanguageNumber
            });
            let that = this;
            startRefresherGlobal(this)
            axios.get(requests.showTour + "?slug=" + (slug ? slug : ''))
                .then(response => {
                    return response.data;
                })
                .then(function (data) {
                    
                    //
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
                        thenFuncGlobal(that)
                        that.setState({
                            newTour: data,
                            couldSendRequest: true,
                            slug: data.local.slug,
                            author: data.tour.author,
                        });
                        
                        /*let dateValidationResult = !(that.shouldDisableTourDateFunc({
                            daily: data.tour.daily, dateWork: data.tour.calendary,
                            date: that.state.departureDate, tourSeatsData: data.tour.tourSeatsData,
                            isPricePerPerson: data.tour.isPricePerPerson, 
                            busyDaysArrayVerification: (busyDays, date, daysNumber)=>that.props.globalReduser.busyDaysArrayVerification(busyDays, date, daysNumber),
                            busyDays: data.tour.busyDays, daysNumber:data.tour.daysNumber
                        }));
                        if(!dateValidationResult){
                            that.setState({departureDate: undefined});
                        }*/
                    }
                })
                .catch(function (error) {
                    catchFuncGlobal(that)
                    console.log('get wasted answer');
                    that.props.globalReduser.history.push('/404/');
                })

        }
        if(this.state.newTour.tour){
            //if tour data exist, call the func that check tourSeatsData
            this.resetSelectedSeatsNumber();
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
            let idIndex =getCurrencies(this.state.newTour.tour.currency, "id",this)
            let usd = this.state.newTour.tour.price / this.props.storeState.currencies[idIndex].costToDefault
            if (isoCurrencies === "USD") {
                let idIndex = getCurrencies("USD", "ISO",this)
                usd = Math.ceil(usd)
                price = this.props.storeState.currencies[idIndex].symbol + " " + usd
            } else {
                let idIndex = getCurrencies(isoCurrencies, "ISO",this)
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
        
        let renderEl = false
        let userId = cookies.get('userId', { path: "/" })
        if (
            "5d8c748f2af67f052213a249" === userId
            || "5cc6b6bbab3b7e111009d58e" === userId
            || "5d3015c437976716c39c488d" === userId
            || "5d654ed89523424ba6a6b333" === userId
            || (this.state.newTour.tour.author.id === userId)) {
            renderEl = true
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

                <div style={{ position: 'relative',minHeight:"94vh" }}>
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
                        {
                            this.state.newTour.local &&
                            <>
                                {
                                    renderEl ?
                                    <div className="editTourHeaderBG">
                                        <i onClick={() => { this.imgModalShow() }} >{textInfo.editCover}</i>
                                    </div>
                                    :
                                    <></>
                                }
                            </>
                        }



                    </div>
                    <TourHeaderEditorCustom imgModalShow={this.imgModalShow} imgModal={this.state.imgModal}
                        img={(this.state.newTour.local && this.state.newTour.tour.mainImage ? (isMobileOnly ? requests.serverAddressImg + this.state.newTour.tour.blockListImage.url : requests.serverAddressImg + this.state.newTour.tour.mainImage.url) : '')}
                        tourId={this.state.newTour.local ? this.state.newTour.tour.id : ""} authorId={this.state.newTour.local ? this.state.newTour.tour.author.id : ""}
                        changeImg={this.changeImg}
                    />
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

                                            <div className="placeDescription_block d-flex flex-column p-0" style={this.state.btMore ? { maxHeight: "max-content" } : { maxHeight: "462px" }} id={topBlockId + "1"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[0]}</div>
                                                {/* <div key={JSON.stringify(this.state.newTour.local.endPlace)}>
                                                    <PlaceTravelBlock id={topBlockId + "3"} place={{ ...this.state.newTour.local, country: this.state.newTour.country, capital: this.state.newTour.capital }} />
                                                </div> */}
                                                <PlaceProgramm id={topBlockId + "1"} tagsArray={[]} place={{ ...this.state.newTour.local/*, tags: this.state.newTour.tour.tags, rating: this.state.newTour.tour.rating, comments: this.state.newTour.tour.commentNumber*/ }} />
                                            </div>
                                            {
                                               (isMobileOnly?(this.state.newTour.local.info.length > 700) :(this.state.newTour.local.info.length > 1455)) &&
                                                <div className="placeDescription_block_btMore d-flex justify-content-end">
                                                    <span onClick={() => { this.setState({ btMore: !this.state.btMore }) }}>{this.state.btMore ? textInfo.btMore[0]: textInfo.btMore[1]}</span>
                                                </div>
                                            }

                                            

                                            <div className="placeDescription_block d-flex flex-column" id={topBlockId + "2"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.placeDescription.variantsArray[1]}</div>
                                                <PlacePhotos photoArray={this.state.newTour.tour.images}
                                                    showMask={(clickedImageIndex) => { this.setState({ isMaskVisible: true, clickedImageIndex: clickedImageIndex }) }} />
                                            </div>
                                            {isMobileOnly ? <>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{textInfo.share}</div>
                                                <div className="d-flex ">
                                                    <ShareLinkElements shareUrl={shareUrl} title={title} isAdmin={false}/>                                                   
                                                </div>
                                            </> : <React.Fragment />}
                                            <div className="placeDescription_block d-flex flex-column" id={topBlockId + "3"}>
                                                <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }} >{guideOrAgency[this.state.author.guide ? 0 : 1]}</div>
                                                
                                                <TourGuideInfo that={this} textInfo={textInfo}  cars={cars} language={language}/>
                                           
                                            </div>
                                            <RouteTravelBlock points={points} id={topBlockId + "4"} isTours={true} textInfo={textInfo}
                                                daily={this.state.newTour.tour.daily} departureDate={this.state.departureDate}
                                                author={this.state.author} changeTravelVisibility={this.changeTravelVisibility}
                                                dateWork={this.state.newTour.tour.calendary} price={price} elementActive={this.state.newTour}
                                                seats={/*this.state.newTour.tour.seats*/this.state.savedDateSeatsData.seatsLeft} 
                                                isPricePerPerson={this.state.newTour.tour.isPricePerPerson}
                                                busyDays= {this.state.newTour.tour.busyDays}
                                                daysNumber={this.state.newTour.tour.daysNumber}
                                                tourDescriptionDateTransferFunction={(utcDate)=>this.setState({departureDate:utcDate})}
                                                shouldDisableTourDateFunc={this.shouldDisableTourDateFunc}   
                                                />

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
                        isTourDescription={this.state.elementActive && this.state.elementActive.element ? false : true} freeSeats = {this.state.savedDateSeatsData.seatsLeft}

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