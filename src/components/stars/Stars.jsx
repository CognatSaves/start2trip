import React from 'react';
import './Stars.css';
import emptyStar from './pictures/star.svg';

export default class Stars extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="infoBlock_starsBlock">
                    <div className="infoBlock_starsBlock_value" style={{display: this.props.valueDisplay}}>{this.props.value}</div>
                    <div className="infoBlock_starsBlock_stars">
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star1"></img>
                      </div>
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star2"></img>
                      </div>
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star3"></img>
                      </div>
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star4"></img>
                      </div>
                      <div className="starsBlock_stars_element">
                        <div className="background_stars" />
                        <img src={emptyStar} width="15px" height="18px" alt="star5"></img>
                      </div>
                    </div>
                    <div className="infoBlock_starsBlock_number" style={{display: this.props.valueDisplay}}>{this.props.commentNumber}</div>
            </div>
        )
    }
}
