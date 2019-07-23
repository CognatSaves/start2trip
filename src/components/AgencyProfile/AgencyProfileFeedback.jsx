import React from 'react';
import {connect} from 'react-redux';

// import '../driverProfileRegistration/img/drivers_body_photo.png';
import Stars from '../stars/Stars';
import requests from '../../config';

class AgencyProfileFeedbackClass extends React.Component{
    constructor(props){
        super(props);
        let profile = this.props.globalReduser.profile;
        this.state={
            comments: profile.comments
        }

        
    }

    render(){
        /*let comments = [...this.props.commentState.comments].reverse();
        let selectedComments = comments.slice((1-4) * 5, (1) * 5);
        */
        function getMonthName(number){
            let monthArray = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
            return monthArray[number];
            
        }
        /*
        function createDateTimeString(start){
            let date = new Date(start);
            let month = date.getUTCMonth(); let day = date.getUTCDate(); let hours = date.getUTCHours(); let minutes = date.getMinutes();
            let res = date.getUTCFullYear()+"-"+(month>=10 ? month : '0'+month)+"-"+(day>=10 ? day : '0'+day)+'; '+
            (hours>=10 ? hours : '0'+hours)+":"+(minutes>=10 ? minutes : '0'+minutes);
            return res;
        }
        */
        // TODO добавить кнопку показать еще и пагинацию
        debugger;
        return(
            <React.Fragment>
            <div className="d-flex flex-wrap">
            {this.state.comments.map((element,index)=> 
                <React.Fragment>
                {
                    /*
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 p-2 pb-3" style={{backgroundColor: 'red'}}>                      
                        <div className="commentBlock_element d-flex flex-column" key={element+"/"+index}>
                            <div className="commentBlock_picture d-flex flex-row">
                                <img src={requests.serverAddress+element.clearedAuthor.url} width="auto" height="100%" alt=""></img>
                                <div className="d-flex flex-column">
                                    <div className="valueBlock_firstElement_name">{element.clearedAuthor.firstName}</div>
                                    <div className="valueBlock_firstElement_date">{element.updatedAt}</div>
                                    </div>
                            </div>
                            <div className="commentBlock_valueBlock d-flex flex-column">
                                <div style={{marginBottom: "20px"}}>
                                    <Stars key={element.mark+"/"+element.index} value={element.mark} valueDisplay={true} commentNumberDisplay={false}/>
                                </div>
                                <input className="put" id={"put"+element+index} type="checkbox"></input>
                                <div className="news">
                                    <label htmlFor={"put"+element+index}>{element.text}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    */
                }
                
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2" key={element}>
                <div className="trevelHistoryBody  d-flex flex-column">
                    <div className="d-flex flex-column historyBodyHeader">
                        <div className="d-flex flex-row" style={{marginBottom: '5px'}}>
                            <img src={requests.serverAddress+element.avatar.url} width="auto" height="100%" alt=""></img>
                            <div className="valueBlock_firstElement_name" style={{margin: 'auto 0 auto auto'}}>{element.name}</div>
                        </div>
                        <div className="d-flex flex-row">  
                            <Stars key={element.rating+"/"+element.index} value={element.rating} valueDisplay={true} commentNumberDisplay={false}/>                         
                            <div className="valueBlock_firstElement_date" style={{margin: 'auto 0 auto auto'}}>{this.props.globalReduser.createDateTimeString(element.createdAt)/*element.date.getDate()+" "+getMonthName(element.date.getMonth())+" "+element.date.getFullYear()*/}</div>
                            
                        </div>
                        <hr/>
                    </div>
                    <div className="d-flex flex-column historyBodyElement ">
                        <input className="put" id={"put"+element+index} type="checkbox"></input>
                        <div className="news">
                            <label htmlFor={"put"+element+index}>{element.value}</label>
                        </div>
                    </div>
        
                </div>
            </div>
                </React.Fragment> 
            )}
            </div> 
            
            </React.Fragment>
        )
    }
}
const AgencyProfileFeedback = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileFeedbackClass);

export default AgencyProfileFeedback;