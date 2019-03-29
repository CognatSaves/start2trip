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
import {changePlacesFixedClass, setPlacesPanelSelectedElement} from '../../redusers/ActionPlaces';

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
            selectedPhotoIndex: 0,
            photoSlice: 0,
            width: 870,
            height: 500,
            n: 7,
            photoArray: [ippodrom, ippodrom4, ippodrom2, ippodrom3, ippodrom, ippodrom4, ippodrom2, ippodrom3, ippodrom, ippodrom4, ippodrom2, ippodrom3, ippodrom, ippodrom4, ippodrom2, ippodrom3, ippodrom, ippodrom4, ippodrom2, ippodrom3],
        };
        this.selectPhoto = this.selectPhoto.bind(this);
        this.showMorePages = this.showMorePages.bind(this);
        this.setPage = this.setPage.bind(this);
    }
    selectPhoto(photoIndex) {
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
    showMorePages() {
        this.setState({
            page: this.state.page + 1,
            showPages: this.state.showPages + 1
        })
    }
    setPage(page) {
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
        let countryId = this.props.match.params.country;
        let placeId = this.props.match.params.id;
        let comments = [...this.props.commentState.comments].reverse();
        let place = this.props.placesState.places[countryId].places[placeId];

        let topBlockId = "placeDescriptionId";
        return (
            <React.Fragment>
                <div className="drivers_top_background placeDescription_background container" id={topBlockId}>
                    <img src={ippodrom} width="100%" height="100%" style={{ position: "absolute" }} alt="noImage" />
                    <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }} />
                    <Header colorWhite={true} />
                    <div className="wrapper d-flex flex-column">
                        
                        <PlaceInfo place={place}/>
                    </div>
                </div>
                <div className="wrapper d-flex flex-column">
                    <div className="drivers_bottom_background d-flex flex-column" >
                        <div className="drivers_body d-flex">
                            <div className="left_body_part col-9">
                                <TourPanel topBlockId={topBlockId} descriptionId={"placeDescriptionId"} variantsArray={["Описание","Фотографии","Как добраться","Карта","Вас может заинтересовать","Отзывы"]}
                                setPanelStateFunc={changePlacesFixedClass} panelFixedClass={this.props.placesState.placePanelFixedClass}
                                panelSelectedElement={this.props.placesState.placePanelSelectedElement} setPanelSelectedElement={setPlacesPanelSelectedElement}/>
                                <PlaceProgramm place={place}/> 
                                <div className="placeDescription_block d-flex flex-column" id="placeDescriptionId2"> 
                                    <div className="placeDescription_fragmentName" style={{marginBottom: "15px"}} >Фотографии</div>                           
                                    <PlacePhotos photoArray={this.state.photoArray}
                                        width={this.state.width} height={this.state.height} number={this.state.n}/>
                                </div>
                                <PlaceTravelBlock place={place} />
                                <PlaceMapBlock />
                                <div className="placeDescription_block d-flex flex-column" id="placeDescriptionId5">
                                    <SimularToursBlock tours={this.state.popularPlaces} fragmentName={"Вас может заинтересовать"} priseDisplay={"none"}/>
                                </div>
                                <CommentBlock comments={comments} userName={this.state.userName} page={this.state.page} setPage={this.setPage}
                                    showMorePages={this.showMorePages} showPages={this.state.showPages} id={"placeDescriptionId6"}/>
                            
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

const PlaceDescription = connect(
    (state) => ({
        placesState: state.PlacesReduser,
        commentState: state.CommentReduser
    }),

)(PlaceDescriptionClass);

export default PlaceDescription;