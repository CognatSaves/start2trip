import React from 'react';
import '../../Places/PopularPlaces.css';
import { connect } from 'react-redux';
// import Tbilisy from './pictures/tbilisi_desk.jpg'
// import Batumi from './pictures/Batumi.-Podorozh-do-sertsya-Gruziyi-700x420.jpg'
// import kytaisy from './pictures/Kolhidskiy-fontan.-Kutaisi.jpg'
// import Rustavi from './pictures/Rustavi_Museum_(A._Muhranoff,_2011).jpg'
// import samegrello from './pictures/thumb_536_1370_437_0_0_auto.jpg'
// import Andshi from './pictures/Вид_на_деревушку_Адиши,_Грузия.jpg'
import requests from '../../../config';
import { setSelectedDirection } from '../../../redusers/ActionPlaces';

class PopularPlacesClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //arrayRender: arrayRender,
            howMuchRender: 6,
        }
    }
    onDirClick=(id)=>{
        function findSelectedDirectionName(directions, id, storeState){
            
            for(let i=0; i<directions.length; i++){
                if(directions[i].id===id){
                    for(let k=0; k<directions[i].loc.length; k++){
                        let lang1 = directions[i].loc[k].language;
                        let lang2=storeState.languages[storeState.activeLanguageNumber].id;
                        if(lang1===lang2){
                            return directions[i].loc[k].slug
                        }
                    }
                }
                
            }
            return false;
            
        }
        //let index = this.props.placesState.selectedDirections.indexOf(id);
        console.log('onTagClick', id);
        
        let selectedDirection = this.props.placesState.selectedDirection;
        let slug = findSelectedDirectionName(this.props.placesState.directions, id,this.props.storeState);
        if(selectedDirection!==id && slug){
            
            //let slug = findSelectedDirectionName(this.props.placesState.directions, id);
            //if(slug){
            this.props.dispatch(setSelectedDirection(id));
            this.props.globalReduser.history.push('/home/'+slug);
            //}
            //else{
            //    this.props.dispatch(setSelectedDirection(''));
            //    this.props.globalReduser.history.push('/places');
            //}
            
        }
        else{
            this.props.dispatch(setSelectedDirection(''));
            this.props.globalReduser.history.push('/home');
        }
        
        
        
        
        //let totalIndex = this.props.placesState.directions.indexOf(id);
        //let value = this.props.globalReduser.convFunc(this.props.placesState.directions[this.props.placesState.directions.indexOf(id)], this.props.storeState.languages[this.props.storeState.activeLanguageNumber].ISO);
        
        //console.log(value);
        /*if(index===-1){
            
        }
        else{
            this.props.globalReduser.history.push('/places')
        }
        */

    }
    render() {
        function isDirSelected(directionId, selectedDirection){
            /*for(let i=0; i<selectedDirections.length; i++){
                if(selectedDirections[i]===directionId){
                    return true;
                }
            }
            return false;*/
            return selectedDirection===directionId;
        }

        
        let placeRender = [];
        let arrayRender = this.props.placesState.directions;
        if (arrayRender.length > this.state.howMuchRender) {

            for (let i = 0; i < this.state.howMuchRender; i++) {
                if (i < this.state.howMuchRender) {
                    placeRender.push(arrayRender[i]);
                }
            }
        } else {
            placeRender = arrayRender;
        }
        function getDirectionName(element, that){
            for(let i=0;i<element.loc.length; i++){
                if(element.loc[i].language===that.props.storeState.languages[that.props.storeState.activeLanguageNumber].id){
                    return element.loc[i].name;
                }
            }
            return element.loc.length>0 ? element.loc[0].name : 'no-name';
        }
       // let textInfo = this.props.storeState.languageTextMain.places;
        /*let directions = arrayRender;
        */
        return (
            <React.Fragment>
                <div className="popularPlacesBody">

                    <div className="popularPlacesTitle">
                        <h3>{/*textInfo.popularPlaces.popularPlacesTitle*/'Готовые маршруты из:'}</h3>
                    </div>

                    <div className="d-flex col-12 p-0">
                        <div className="d-flex col-12 flex-wrap p-0 popularPlacesRender">
                            {placeRender.map((element, index) => {
                                if (arrayRender.length !== placeRender.length) {
                                    if (placeRender.length - 1 == index) {
                                        return (
                                            <div className="col-2 d-flex flex-column align-items-center popularPlacesEl popularPlacesMore" onClick={() => { this.setState({ howMuchRender: this.state.howMuchRender + 6 }) }}>
                                                <span>{"more"}</span>
                                                <img src={arrayRender[arrayRender.length-1].image ? requests.serverAddress+ arrayRender[arrayRender.length-1].image.url : ''} alt="img" />
                                            </div>
                                        )
                                    }
                                }
                                return (
                                    <div className={"col-2 d-flex flex-column align-items-center popularPlacesEl "+(isDirSelected(element.id, this.props.placesState.selectedDirection) ? 'popularPlacesEl_selected' : '')} onClick={()=>this.onDirClick(element.id)}>
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
        placesState: state.PlacesReduser,
        globalReduser: state.GlobalReduser
    }),
)(PopularPlacesClass);

export default PopularPlaces;