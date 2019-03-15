import React from 'react';
import './Stars.css';
import emptyStar from './pictures/star.svg';
import { connect } from 'react-redux'
import {setCommentValue} from '../../redusers/ActionComments';

const Star = (props) => {
  const {index,color1, colorValue1, color2, colorValue2, setTempValue, setValue} = props;

  return (
    <div className="starsBlock_stars_element d-flex" onMouseMove={(e)=>{setTempValue(index,e.nativeEvent.offsetX,e.target.width)}} onClick={()=>setValue()}>
      <div className="background_stars" style={{backgroundImage: "linear-gradient( to right, "+color1+" "+colorValue1+","+color2+" "+colorValue2+" , #ccc 100%)"}}/>
      <img src={emptyStar} width="15px" height="18px" alt="star1"></img>
    </div>
  )
}
class StarsClass extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        //value: this.props.value || 0,
        tempValue: this.props.value || this.props.commentState.commentValue,
        changable: this.props.changable || false
      }
      this.setTempValue=this.setTempValue.bind(this);
      this.resetTempValue=this.resetTempValue.bind(this);
      this.setValue=this.setValue.bind(this);
    }
    setTempValue(index,x,width){
      if(this.state.changable){
        
        if(x && width){
          let isMoreThanHalf = Math.floor(x/width+0.5);
          this.setState({
            tempValue: index+isMoreThanHalf,
          })
        }
      }   
    }
    resetTempValue(){
      
      if(this.state.changable){
        this.setState({
          tempValue: this.props.commentState.commentValue
        })
      }      
    }
    setValue(){
      if(this.state.changable){
        this.props.dispatch(setCommentValue(this.state.tempValue));
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
                let value = correctVisualArray[Math.ceil(tempRating*10)];
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
        let starsColors = starsColorCalculation(this.state.tempValue);
        return(
          <div className="infoBlock_starsBlock d-flex flex-row justify-content-start" onMouseLeave={()=>{this.resetTempValue()}}>
            <div className="infoBlock_starsBlock_value " style={{display: this.props.valueDisplay }}>{this.state.tempValue}</div>
            <div className="infoBlock_starsBlock_stars d-flex flex-row">
              {
                starsColors.map((element,index)=>
                  <Star index={index} color1={element[2]} colorValue1={element[0]} color2={element[3]} colorValue2={element[1]} setTempValue={this.setTempValue} setValue={this.setValue} />
                )
              }             
            </div>
            <div className="infoBlock_starsBlock_number d-flex" style={{display: this.props.commentNumberDisplay}}>{this.props.commentNumber}</div>
          </div>
        )
    }
}

const Stars = connect(
  (state) =>({
    commentState: state.CommentReduser
  }),
)(StarsClass);

export default Stars;