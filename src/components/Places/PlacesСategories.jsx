import React from 'react';
import './PopularPlaces.css';
import { connect } from 'react-redux';
import Tbilisy from './pictures/tbilisi_desk.jpg'
import Batumi from './pictures/Batumi.-Podorozh-do-sertsya-Gruziyi-700x420.jpg'
import kytaisy from './pictures/Kolhidskiy-fontan.-Kutaisi.jpg'
import Rustavi from './pictures/Rustavi_Museum_(A._Muhranoff,_2011).jpg'
import samegrello from './pictures/thumb_536_1370_437_0_0_auto.jpg'
import more from './pictures/Вид_на_деревушку_Адиши,_Грузия.jpg'

class PopularPlacesClass extends React.Component {
    render() {
        let plase = [
        {title:"Tbilisy",img:Tbilisy},
        {title:"Batumi",img:Batumi},
        {title:"kytaisy",img:kytaisy},
        {title:"Rustavi",img:Rustavi},
        {title:"samegrello",img:samegrello},
        {title:"more",img:more},
     ];

        return (
            <React.Fragment>
                <div className="popularPlacesBody">
                    <div className="popularPlacesTitle">
                        <h3>Популярные места</h3>
                    </div>
                    <div className="d-flex flex-wrap col-12 my-2 popularPlacesRender">
                        {plase.map((element, index) =>
                            <div className="col-2 d-flex flex-column align-items-center popularPlacesEl">
                                <div>
                                    <img src={element.img} alt="img"/>
                                </div>
                                <div className="mt-2">
                                    <span>{element.title}</span>
                                </div>
                            </div>
                        )}

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