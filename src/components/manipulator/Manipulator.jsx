import React, { Component } from 'react';
import './Manipulator.css'
import leftArrow from './pictures/drivers_manipulator_leftArrow.png'
import rightArrow from './pictures/drivers_manipulator_rightArrow.png'

export default class Manipulator extends React.Component{
    constructor(props){
        super(props);        
    }
    
    render(){
        function numbersCalculation(maxNumber, page){
            let numberArray = [page-2, page-1, page, page+1, page+2];
            let result = [];
            if(numberArray[0]>1){
                result.push("...");
            }
            for(let i=0; i<numberArray.length;i++){
                if(numberArray[i]>0 && numberArray[i]<=maxNumber){
                    result.push(numberArray[i]);
                }
            }
            if(result[result.length-1]<maxNumber){
                result.push("...");
            }
            return result;
        }
        let maxPage = Math.ceil(this.props.number/this.props.elementsNumber);
        let numberArray = numbersCalculation(maxPage, this.props.page);
        let spaceWidthSize = ["","","","","0 4%","0 2%","0 1%","0 1%"];
        let pageIndex = numberArray.indexOf(this.props.page);
        let numberStyle =Array(numberArray.length).fill("numberPosition_numberBlock_value");
        numberStyle[pageIndex]= "numberPosition_numberBlock_value numberPosition_numberBlock_selected";

        let showMoreButtonState = false;
        if(this.props.page === maxPage){
            showMoreButtonState=true;
        }
        return(
         <div className="drivers_block_manipulator">
            <button className="driversBlockManipulator_button" onClick={()=>this.props.showMorePages()} disabled={showMoreButtonState}>
                <div className="driversBlockManipulator_button_value">Показать ещё</div>
            </button>
            <div className="driversBlockManipulator_pageNumbers">
                <button className="pageNumbers_arrow" onClick={()=>{ if(this.props.page>1){this.props.setPage(this.props.page-1)}}}>
                    <img src={leftArrow} width="100%" height="100%" alt="leftA" style={{borderRadius: "5px"}}></img>
                </button>               
                <div className="pageNumbers_text" onClick={()=>this.props.setPage(1)}>
                    <div className="pageNumbers_text_value">в начало</div>
                </div>
                <div className="pageNumbers_numberPosition">
                    {numberArray.map((element,index)=>                  
                        <div className="numberPosition_numberBlock" style={{padding: spaceWidthSize[numberArray.length]}}>
                            <button className={numberStyle[index]} onClick={()=>this.props.setPage(element)}>{element}</button>
                        </div>
                                              
                    )}
                </div>
                <div className="pageNumbers_text" onClick={()=>this.props.setPage(maxPage)}>
                    <div classNmae="pageNumbers_text_value">в конец</div>
                </div>
                <button className="pageNumbers_arrow" onClick={()=>{ if(this.props.page<maxPage){this.props.setPage(this.props.page+1)}}}>
                    <img src={rightArrow} width="100%" height="100%" alt="rightA" style={{borderRadius: "5px"}}></img>
                </button>

            </div>
         </div>
        )

    }
}
/*

<React.Fragment>
             <button className="driversBlockManipulator_button">Показать ещё</button>
             <div className="driversBlockManipulator_pageNumbers">
                <div className="pageNumbers_leftArrow" onClick={()=>{ if(this.props.page>1){this.props.setPage(this.props.page-1)}}}></div>               
                <div className="pageNumbers_leftText" onClick={()=>this.props.setPage(1)}>в начало</div>
                <div className="pageNumbers_space"></div>
                <div className="pageNumbers_numberPosition">
                    <div className="numberPosition_numberBlock_space" style={{width: spaceWidthSize[numberArray.length]}}></div>
                    {numberArray.map((element,index)=>
                   
                        <div className="numberPosition_numberBlock">
                            <button className={numberStyle[index]} onClick={()=>this.props.setPage(element)}>{element}</button>
                            <div className="numberPosition_numberBlock_space" style={{width: spaceWidthSize[numberArray.length]}}></div>
                        </div>
                                              
                    )}
                    <div className="numberPosition_numberBlock_space" style={{width: spaceWidthSize[numberArray.length]}}></div>
                </div>
                <div className="pageNumbers_rightText" onClick={()=>this.props.setPage(maxPage)}>в конец</div>
                <div className="pageNumbers_rightArrow" onClick={()=>{ if(this.props.page<maxPage){this.props.setPage(this.props.page+1)}}}></div>
             </div>
         </React.Fragment>

         */