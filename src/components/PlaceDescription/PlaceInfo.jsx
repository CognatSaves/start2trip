import React from 'react';
import '../Places/PlacesCountryInfo.css';
import Stars from '../stars/Stars';
import { connect } from 'react-redux';
class PlaceInfoClass extends React.Component {
    shouldComponentUpdate(nextProps){
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeProgramm;
        function getMonthName(number){
            let monthArray = textInfo.monthArray;//["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
            return monthArray[number];
        }
        function findTagName(tagId,tagArray){
            
            for(let i=0; i<tagArray.length; i++){
                if(tagId===tagArray[i].id){
                    return tagArray[i].tagLoc.name
                }
            }
        }
        let date = this.props.date ? new Date(this.props.date) : '';
        return(
            <React.Fragment>
            <div className="col-12">
                <div style={{padding: '75px 0'}}>
                {
                    <div className="d-flex">
                        <h1 className="placeDescription_description_name" >
                            {this.props.name}
                        </h1>
                    </div>
                }
                <div className="d-flex flex-md-row flex-column" style={{paddingTop: '10px'}}>
                    <div className='d-flex'/*d-flex нужен для того, чтобы margin считывался */>
                        <div style={{margin: 'auto 0'}}>
                            <Stars /*changeStarsBlock={'placeinfo_starsBlock'}*/ commentTextStilizated={'placeDescription_description_commentTextStyle'} value={Math.ceil(this.props.rating*10)/10} commentNumber={this.props.comments + " "+textInfo.comments} valueDisplay={true} commentNumberDisplay={true} />
                        </div>
                    </div>
                    
                    {
                        this.props.tags.length>0 ?
                        <React.Fragment>
                            <div className="placeinfo_vertical"/>
                        
                            <div className="d-flex" style={{margin: 'auto 0 0 0'/* margin: "10px 5px 20px 0px" */}} >
                                
                                
                                    <React.Fragment>
                                        <div className="placeDescription_description_tagCard" />
                                        {
                                            this.props.tags.map((element,index)=>
                                                <div className="placeDescription_description_tagElement">{findTagName(element,this.props.tagsArray)+(index+1!==this.props.tags.length ? ",":"")}</div>
                                            )
                                        }
                                    </React.Fragment>
                              
                            </div>
                        </React.Fragment>
                        : <React.Fragment/>
                    }
                    {
                        this.props.date ?
                        <React.Fragment>
                            <div className="placeinfo_vertical"/>
                            <div className="d-flex" style={{}}>
                                <div className={"placeDescription_description_tagElement"/*"placeDescription_description_date"*/}>
                                    {date.getDate()+" "+getMonthName(date.getMonth())+" "+date.getFullYear()}
                                </div>
                               
                                
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment/>
                    }
                         
                </div>
                
                
            </div>    
            </div>    
                {
                    /*
                    <div className="d-flex flex-column placesCountryInfo" style={{position: "relative"}}>
                        <div className="placesCountryInfo_countryName">{this.props.place.name}</div>
                        <div className="placesCountryInfo_line"/>
                        <div className="placesCountryInfo_countryinfo">
                            {this.props.place.info}
                        </div>
                    </div>


                    */
                }
                
            </React.Fragment>
        )
    }
}

const PlaceInfo = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),

)(PlaceInfoClass);

export default PlaceInfo;