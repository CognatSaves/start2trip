import React from 'react';
import './PopularPlaces.css';
import { connect } from 'react-redux';
import Tbilisy from './pictures/tbilisi_desk.jpg'
import Batumi from './pictures/Batumi.-Podorozh-do-sertsya-Gruziyi-700x420.jpg'
import kytaisy from './pictures/Kolhidskiy-fontan.-Kutaisi.jpg'
import Rustavi from './pictures/Rustavi_Museum_(A._Muhranoff,_2011).jpg'
import samegrello from './pictures/thumb_536_1370_437_0_0_auto.jpg'
import Andshi from './pictures/Вид_на_деревушку_Адиши,_Грузия.jpg'

class PopularPlacesClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayRender: this.props.arrayRender,
            howMuchRender: 6,
        }
    }
    render() {
        let plase = [
            { title: "Tbilisy", img: Tbilisy },
            { title: "Batumi", img: Batumi },
            { title: "kytaisy", img: kytaisy },
            { title: "Rustavi", img: Rustavi },
            { title: "samegrello", img: samegrello },
            { title: "Tbilisy", img: Tbilisy },
            { title: "Rustavi", img: Rustavi },
            { title: "samegrello", img: samegrello },
            { title: "Tbilisy", img: Tbilisy },
            { title: "Andshi", img: Andshi },
            { title: "Batumi", img: Batumi },
            { title: "kytaisy", img: kytaisy },
            { title: "Rustavi", img: Rustavi },
            { title: "samegrello", img: samegrello },
            { title: "Tbilisy", img: Tbilisy },
            { title: "Rustavi", img: Rustavi },
            { title: "samegrello", img: samegrello },
            { title: "Tbilisy", img: Tbilisy },
            { title: "Andshi", img: Andshi },

        ];
        let plaseRender = [];
        debugger
        if (plase.length > this.state.howMuchRender) {

            for (let i = 0; i < this.state.howMuchRender; i++) {
                if (i < this.state.howMuchRender) {
                    plaseRender.push(plase[i]);
                }
            }
        } else {
            plaseRender = plase;
        }

        return (
            <React.Fragment>
                <div className="popularPlacesBody">

                    <div className="popularPlacesTitle">
                        <h3>Популярные места</h3>
                    </div>

                    <div className="d-flex col-12 p-0">
                        <div className="d-flex col-12 flex-wrap p-0 my-2 popularPlacesRender">
                            {plaseRender.map((element, index) => {
                                if (plase.length !== plaseRender.length) {
                                    if (plaseRender.length - 1 == index) {
                                        return (
                                            <div className="col-2 d-flex flex-column align-items-center popularPlacesEl popularPlacesMore" onClick={() => { this.setState({ howMuchRender: this.state.howMuchRender + 6 }) }}>
                                                <span>{"more"}</span>
                                                <img src={plase[plase.length-1].img} alt="img" />
                                            </div>
                                        )
                                    }
                                }
                                return (
                                    <div className="col-2 d-flex flex-column align-items-center popularPlacesEl">
                                        <div>
                                            <img src={element.img} alt="img" />
                                        </div>
                                        <div className="mt-2">
                                            <span>{element.title}</span>
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