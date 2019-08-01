import React from 'react';
import './Manipulator.css'
import leftArrow from '../media/arrow_gray_left.svg'
import rightArrow from '../media/arrow_gray_right.svg'
import { connect } from 'react-redux';
class ManipulatorClass extends React.Component{
    /*constructor(props){
        super(props);        
    }*/   
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

        let showMoreButtonDisabled = false;//определяет, является ли кнопка "Показать ещё" активной
        if(this.props.page === maxPage){
            showMoreButtonDisabled=true;
        }
        let textInfo = this.props.storeState.languageTextMain.manipulator;
        
        let isEnoughPages = (maxPage>1);
        debugger;
        return(
        <React.Fragment>
            <div className="drivers_block_manipulator" style={{display: this.props.page>0 && maxPage>0 ? 'flex' : 'none'}}>
                {
                    
                    this.props.page !== maxPage ?
                    <button className="driversBlockManipulator_button" onClick={()=>{this.props.showMorePages(); setTimeout(()=>{window.scrollBy(0,400)}, 1)}} disabled={showMoreButtonDisabled}>
                        <div className="driversBlockManipulator_button_value">{textInfo.manupulatorShowMore}</div>
                    </button>
                    : <React.Fragment/>
                    
                }
                {
                    isEnoughPages ? 
                    <div className="driversBlockManipulator_pageNumbers" style={{margin: this.props.page !== maxPage ? '0 auto' : 'auto'}}>
                        <button className="pageNumbers_arrow" onClick={()=>{ if(this.props.page>1){this.props.setPage(this.props.page-1)}}}>
                            <img src={leftArrow} width="100%" height="100%" alt="leftA" style={{borderRadius: "5px"}}></img>
                        </button>               
                        <div className="pageNumbers_text" onClick={()=>this.props.setPage(1)}>
                            <div className="pageNumbers_text_value">{textInfo.moveStart}</div>
                        </div>
                        <div className="pageNumbers_numberPosition">
                            {numberArray.map((element,index)=>                  
                                <div className="numberPosition_numberBlock" style={{padding: spaceWidthSize[numberArray.length]}}>
                                    <button className={numberStyle[index]} onClick={()=>this.props.setPage(element)}>{element}</button>
                                </div>
                                                        
                            )}
                        </div>
                        <div className="pageNumbers_text" onClick={()=>this.props.setPage(maxPage)}>
                            <div classNmae="pageNumbers_text_value">{textInfo.moveEnd}</div>
                        </div>
                        <button className="pageNumbers_arrow" onClick={()=>{ if(this.props.page<maxPage){this.props.setPage(this.props.page+1)}}}>
                            <img src={rightArrow} width="100%" height="auto" alt="rightA" style={{borderRadius: "5px"}}></img>
                        </button>
                    </div> : <React.Fragment/>
                }
                
            </div>
            
        </React.Fragment>
        )

    }
}

const Manipulator = connect(
    (state) => ({
      storeState: state.AppReduser,
    }),
  )(ManipulatorClass);
  
  export default Manipulator;