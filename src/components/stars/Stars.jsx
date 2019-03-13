import React from 'react';
import './Stars.css';
import emptyStar from './pictures/star.svg';

const Star = (props) => {
  const {color1, colorValue1, color2, colorValue2} = props;

  return (
    <div className="starsBlock_stars_element d-flex" onMouseMove={(e)=>{console.log(e.target.offsetX+" / "+e.target.offsetY); console.log("Щекотно!")}}>
      <div className="background_stars" style={{backgroundImage: "linear-gradient( to right, "+color1+" "+colorValue1+","+color2+" "+colorValue2+" , #ccc 100%)"}}/>
      <img src={emptyStar} width="15px" height="18px" alt="star1"></img>
    </div>
  )
}
export default class Stars extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        value: this.props.value || 0,
        tempValue: 0
      }
    }
    render(){
        function starsColorCalculation(rating){
          let tempRating = rating;
          let resultArray = Array(5).fill([]);
          
          for(let i=0; i<5; i++){
            if(tempRating>0){
              if(tempRating>=1){
                resultArray[i]=["100%","0%", "#ff6600","#ff6600"];             
              }
              else{
                let correctVisualArray = [0,20,25,33,42,50,58,67,75,80,100];
                console.log(Math.ceil(tempRating*10));
                let value = correctVisualArray[Math.ceil(tempRating*10)];
                console.log(value);
                resultArray[i]=[value+"%", value+"%","#ff6600", "#ccc"];
              }
              tempRating=tempRating-1;
            }
            else{
              resultArray[i]=["0%","100%","#ccc","#ccc"];
            }
          }
          return resultArray;
        }
        let starsColors = starsColorCalculation(this.state.value);
        return(
          <div className="infoBlock_starsBlock d-flex flex-row justify-content-start">
            <div className="infoBlock_starsBlock_value " style={{display: this.props.valueDisplay}}>{this.props.value}</div>
            <div className="infoBlock_starsBlock_stars d-flex flex-row">
              {
                starsColors.map((element,index)=>
                  <Star color1={element[2]} colorValue1={element[0]} color2={element[3]} colorValue2={element[1]}/>
                )
              }             
            </div>
            <div className="infoBlock_starsBlock_number d-flex" style={{display: this.props.commentNumberDisplay}}>{this.props.commentNumber}</div>
          </div>
        )
    }
}
