import React from 'react';
import '../../Places/PopularPlaces.css';
import { connect } from 'react-redux';
import requests from '../../../config';
import { setSelectedDirection } from '../../../redusers/ActionPlaces';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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
            this.props.globalReduser.history.push("/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+`/routes-${slug}`);
            //}
            //else{
            //    this.props.dispatch(setSelectedDirection(''));
            //    this.props.globalReduser.history.push('/places');
            //}
            
        }
        else{
            this.props.dispatch(setSelectedDirection(''));
            this.props.globalReduser.history.push("/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+'/home');
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
        
        let arrayRender = [...this.props.placesState.directions];
        if(arrayRender.length>0){
            debugger;
        }
        arrayRender.sort((a,b)=>{
            if(a.zIndex!==b.zIndex){
                return b.zIndex-a.zIndex; 
            }
            else{
                return b.routesNumber-a.routesNumber;
            }             
        })
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
        console.log(placeRender);
        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.homePopularPlaces;
        return (
            <React.Fragment>
                <div className={placeRender.length>0 ? "popularPlacesBody pt-4" : 'd-none'} >

                    <div className="popularPlacesTitle">
                        <h2>{textInfo.popularPlacesTitle+':'}</h2>
                    </div>
                    {
                        this.props.storeState.languages.length>0 ?
                        <div className="d-flex col-12 p-0">
                            <div className="d-flex col-12 flex-md-wrap flex-nowrap p-0 py-2 popularPlacesRender">
                                {placeRender.map((element, index) => {
                                    if (arrayRender.length !== placeRender.length) {
                                        if (placeRender.length - 1 == index) {
                                            return (
                                                <div className="col-md-2 col-7 d-flex flex-column popularPlacesEl popularPlacesMore"
                                                onClick={() => { this.setState({ howMuchRender: this.state.howMuchRender + 6 }) }}>
                                                    <span>{textInfo.morePics}</span>
                                                    <img src={arrayRender[arrayRender.length-1].image ? requests.serverAddress + arrayRender[arrayRender.length-1].image.url : ''} alt="img" />
                                                </div>
                                            )
                                        }
                                    }
                                    return (
                                        <div className={"col-md-2 col-7 d-flex flex-column popularPlacesEl "
                                        +(isDirSelected(element.id, this.props.placesState.selectedDirection) ? 'popularPlacesEl_selected' : '')}
                                        onClick={()=>this.onDirClick(element.id)}>
                                            <span className="popularPlacesElMes">{textInfo.cancel}</span>
                                            <div>
                                                <img src={element.image ? requests.serverAddress + element.image.url : ''} alt="img" />
                                            </div>
                                            <div className="mt-2 routeName">
                                                <span>{getDirectionName(element,this)}</span>
                                            </div>
                                        </div>
                                    )
                                }

                                )}
                            </div>
                        </div>
                        : <React.Fragment/>
                    }
                    

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