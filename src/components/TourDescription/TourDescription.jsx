import React from 'react';
import './TourDescription.css';
import { connect } from 'react-redux';
import { changePanelFixedClass, setTourPanelSelectedElement } from '../../redusers/ActionTours';

import carthage from '../media/bachground.jpg';
import antioch from '../media/bachground.jpg';
import roma from '../media/bachground.jpg';
import alexandria from '../media/bachground.jpg';
import konstantinople from '../media/bachground.jpg';

// import georgiaImg from '../media/georgia.png';

import Header from '../header/Header';
import TourInfo from './TourInfo.jsx';
import TourPanel from './TourPanel.jsx';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import TourProgram from './TourProgram.jsx';
import PlacePhotos from '../PlaceDescription/PlacePhotos';
import TourMapBlock from './TourMapBlock.jsx';
import SimularToursBlock from './SimularToursBlock.jsx';
import CommentBlock from './CommentBlock.jsx';

class TourDescriptionClass extends React.Component {
    constructor(props) {
        super(props);
        let countryId = this.props.match.params.country;
        let tourId = this.props.match.params.id;
        let tour = this.props.toursState.tours[countryId].tours[tourId];

        this.state = {
            userName: "Заинтересованный посетитель",
            page: 1,
            showPages: 1,
            photoSlice: 0,
            selectedPhotoIndex: 0,
            tour: tour,
            width: 870,
            height: 500,
            n: 7,
            photoArray: [carthage, antioch, roma, alexandria, konstantinople, carthage,
                antioch, roma, alexandria, konstantinople, carthage, antioch, roma,
                alexandria, konstantinople, carthage, antioch, roma, alexandria,
                konstantinople],
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
    render() {



        let comments = [...this.props.commentState.comments].reverse();

        let topBlockId = "tourDescriptionId";

        return (
            <React.Fragment>
                <div className="drivers_top_background placeDescription_background col-12" id={topBlockId}>
                    <img src={carthage} width="100%" height="100%" style={{ position: "absolute" }} alt="noImage" />
                    <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }} />
                    <div className="wrapper d-flex flex-column">
                        <Header history={this.props.history} />
                        <TourInfo tour={this.state.tour} />
                    </div>
                </div>
                <div className="wrapper d-flex flex-column" key="aaa">
                    <div className="drivers_bottom_background d-flex flex-column" >
                        <div className="drivers_body d-flex">
                            <div className="left_body_part col-9">
                                <TourPanel topBlockId={topBlockId} descriptionId={"tourDescriptionId"} variantsArray={["Программа тура", "Фотографии", "Карта тура", "Похожие туры", "Отзывы"]}
                                    setPanelStateFunc={changePanelFixedClass} panelFixedClass={this.props.toursState.tourPanelFixedClass}
                                    panelSelectedElement={this.props.toursState.tourPanelSelectedElement} setPanelSelectedElement={setTourPanelSelectedElement} />
                                <TourProgram tour={this.state.tour} />
                                <div className="placeDescription_block d-flex flex-column" id="tourDescriptionId2">
                                    <div className="placeDescription_fragmentName" style={{ marginBottom: "15px" }}>Фотографии</div>
                                    <PlacePhotos photoArray={this.state.photoArray} width={this.state.width}
                                        height={this.state.height} number={this.state.n} />
                                </div>
                                <TourMapBlock tour={this.state.tour} cities={["Стамбул", "Антакья", "Александрия", "Картадж", "Рим"]} />
                                <div className="placeDescription_block d-flex flex-column" id="tourDescriptionId4">
                                    <SimularToursBlock tours={this.state.popularPlaces} fragmentName={"Похожие туры"} priseDisplay={"block"} />
                                </div>
                                <CommentBlock comments={comments} userName={this.state.userName} page={this.state.page}
                                    setPage={this.setPage} showMorePages={this.showMorePages} showPages={this.state.showPages} id={"tourDescriptionId5"} />
                            </div>
                            <div className="right_body_part col-3">
                                <DriversCommercial />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const TourDescription = connect(
    (state) => ({
        toursState: state.ToursReduser,
        commentState: state.CommentReduser
    }),

)(TourDescriptionClass);

export default TourDescription;