import React from 'react';
import './PopularPlaces.css';
import { connect } from 'react-redux';
// import Tbilisy from './pictures/tbilisi_desk.jpg'
// import Batumi from './pictures/Batumi.-Podorozh-do-sertsya-Gruziyi-700x420.jpg'
// import kytaisy from './pictures/Kolhidskiy-fontan.-Kutaisi.jpg'
// import Rustavi from './pictures/Rustavi_Museum_(A._Muhranoff,_2011).jpg'
// import samegrello from './pictures/thumb_536_1370_437_0_0_auto.jpg'
// import Andshi from './pictures/Вид_на_деревушку_Адиши,_Грузия.jpg'
import requests from '../../config';

class PopularPlacesClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //arrayRender: this.props.arrayRender,
            howMuchRender: 6,
        }
    }
    render() {
        // let plase = [
        //     { title: "Tbilisy", img: Tbilisy },
        //     { title: "Batumi", img: Batumi },
        //     { title: "kytaisy", img: kytaisy },
        //     { title: "Rustavi", img: Rustavi },
        //     { title: "samegrello", img: samegrello },
        //     { title: "Tbilisy", img: Tbilisy },
        //     { title: "Rustavi", img: Rustavi },
        //     { title: "samegrello", img: samegrello },
        //     { title: "Tbilisy", img: Tbilisy },
        //     { title: "Andshi", img: Andshi },
        //     { title: "Batumi", img: Batumi },
        //     { title: "kytaisy", img: kytaisy },
        //     { title: "Rustavi", img: Rustavi },
        //     { title: "samegrello", img: samegrello },
        //     { title: "Tbilisy", img: Tbilisy },
        //     { title: "Rustavi", img: Rustavi },
        //     { title: "samegrello", img: samegrello },
        //     { title: "Tbilisy", img: Tbilisy },
        //     { title: "Andshi", img: Andshi },

        // ];
        //debugger;
        let placeRender = [];

        if (this.props.arrayRender.length > this.state.howMuchRender) {

            for (let i = 0; i < this.state.howMuchRender; i++) {
                if (i < this.state.howMuchRender) {
                    placeRender.push(this.props.arrayRender[i]);
                }
            }
        } else {
            placeRender = this.props.arrayRender;
        }
        function getDirectionName(element, that){
            for(let i=0;i<element.loc.length; i++){
                if(element.loc[i].language===that.props.storeState.languages[that.props.storeState.activeLanguageNumber].id){
                    return element.loc[i].name;
                }
            }
            return element.loc.length>0 ? element.loc[0].name : 'no-name';
        }
        return (
            <React.Fragment>
                <div className="popularPlacesBody">

                    <div className="popularPlacesTitle">
                        <h3>Популярные направления</h3>
                    </div>

                    <div className="d-flex col-12 p-0">
                        <div className="d-flex col-12 flex-wrap p-0 popularPlacesRender">
                            {placeRender.map((element, index) => {
                                if (this.props.arrayRender.length !== placeRender.length) {
                                    if (placeRender.length - 1 == index) {
                                        return (
                                            <div className="col-2 d-flex flex-column align-items-center popularPlacesEl popularPlacesMore" onClick={() => { this.setState({ howMuchRender: this.state.howMuchRender + 6 }) }}>
                                                <span>{"more"}</span>
                                                <img src={this.props.arrayRender[this.props.arrayRender.length-1].image ? requests.serverAddress+ this.props.arrayRender[this.props.arrayRender.length-1].image.url : ''} alt="img" />
                                            </div>
                                        )
                                    }
                                }
                                return (
                                    <div className="col-2 d-flex flex-column align-items-center popularPlacesEl">
                                        <div>
                                            <img src={element.image ? requests.serverAddress + element.image.url : ''} alt="img" />
                                        </div>
                                        <div className="mt-2">
                                            <span>{getDirectionName(element,this)}</span>
                                        </div>
                                    </div>
                                )
                            }

                            )}
                        </div>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}
const PopularPlaces = connect(
    (state) => ({
        storeState: state.AppReduser,
        placesState: state.PlacesReduser
    }),
)(PopularPlacesClass);

export default PopularPlaces;