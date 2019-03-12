import React from 'react';
import './Stars.css';
import emptyStar from './pictures/star.svg';

export default class Stars extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="infoBlock_starsBlock d-flex flex-row justify-content-start">
                    <div className="infoBlock_starsBlock_value " style={{display: this.props.valueDisplay}}>{this.props.value}</div>
                    <div className="infoBlock_starsBlock_stars d-flex flex-row">
                      <div className="starsBlock_stars_element d-flex">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star1"></img>
                      </div>
                      <div className="starsBlock_stars_element d-flex">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star2"></img>
                      </div>
                      <div className="starsBlock_stars_element d-flex">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star3"></img>
                      </div>
                      <div className="starsBlock_stars_element d-flex">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star4"></img>
                      </div>
                      <div className="starsBlock_stars_element d-flex">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star5"></img>
                      </div>
                    </div>
                    <div className="infoBlock_starsBlock_number d-flex" style={{display: this.props.commentNumberDisplay}}>{this.props.commentNumber}</div>
            </div>
        )
    }
}
