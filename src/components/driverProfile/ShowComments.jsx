import React from 'react';
import './DriversProfileComments.css';
import tempPicture from './pictures/drivers_body_photo.png'
import Stars from '../stars/Stars';
import requests from '../../config';
import { connect } from 'react-redux';
class ShowCommentsClass extends React.Component{
    /*constructor(props){
        super(props);
    }*/
    render(){
        let textInfo = this.props.storeState.languageTextMain.placeDescription.placeProgramm;
        function getMonthName(number){
            let monthArray = textInfo.monthArray;
            return monthArray[number];
        }
        if(this.props.selectedComments.length>0){
            return(
                <div className="commentBlock_comments d-flex flex-column">
                {this.props.selectedComments.map((element,index)=>{
                    //let obj = element.name || element.createdAt ? element : {name: element.user.name} 
                    
                    let date = element.date ? new Date(element.date) : new Date(element.createdAt);     
                    
                    return(               
                    <div className="commentBlock_element d-flex" key={element+"/"+index}>
                        <div className="commentBlock_picture">
                            <img src={element.avatar ? requests.serverAddress+element.avatar.url : tempPicture} width="auto" height="100%" alt=""></img>
                        </div>
                        <div className="commentBlock_valueBlock d-flex flex-column">
                            <div className="d-flex flex-md-row flex-column justify-content-between">
                                <div className="valueBlock_firstElement_name">{element.name}</div>
                                <div className="valueBlock_firstElement_date">{date.getDate()+" "+getMonthName(date.getMonth())+" "+date.getFullYear()}</div>
                            </div>
                            <div style={{marginBottom: "20px"}}>
                                <Stars key={element.rating+"/"+element.index} value={element.rating} valueDisplay={true} commentNumberDisplay={false}/>
                            </div>
                            
                            <input className="put" id={"put"+element+index} type="checkbox"></input>
                            <div className="news">
                                <label htmlFor={"put"+element+index}>{element.value}</label>
                            </div>

                            
                        </div>
                    </div> 
                    )}
                )}
                
            </div> 
            )
        }
        else{
            return(
                <div className="commentBlock_comments d-flex flex-column">
                    <div className="commentBlock_element d-flex">
                        {this.props.noCommentsText}
                    </div>        
                </div>             
            )
        }
        
    }
}

const ShowComments = connect(
    (state) => ({
      storeState: state.AppReduser,
    }),
  )(ShowCommentsClass);
  
  export default ShowComments;