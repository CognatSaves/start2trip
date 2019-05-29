import React from 'react';
import {connect} from 'react-redux';
import './FirstEnterModal.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class FirstEnterModalClass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputChecked: [true,false,false,false],
            openModalStart: true,
            changeBtClose:false,
        }
        this.ChangeinputChecked=this.ChangeinputChecked.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }
    ChangeinputChecked(number){
        let index;
        if(isNaN(number)){
            for(let i=0; i<this.state.inputChecked.length; i++){
                if(this.state.inputChecked[i]===true){
                    index = i + 1;
                    break;
                }
            }
        }
        else{
            index = number;
        }

        let inputChecked = Array(this.state.inputChecked.length).fill(false);
        inputChecked[index]=true;
        if(index!==this.state.inputChecked.length){
            this.setState({
                inputChecked:inputChecked,
                changeBtClose: index===this.state.inputChecked.length-1 ? true : false
            });
        }
        else{
            this.handleClose();
        }
    }
    handleClose(){
        let date = new Date(Date.now()+1000*3600*24*60*500);
        cookies.set('firstEnter', 'no',{path: '/', expires: date} );
        this.setState({
            openModalStart: false
        });
    }
    render(){
        return(
         <React.Fragment>
             {
             //Модалка для мобильной версии стартовая
             }
             <div className="modalStartInformation" style={{display: this.state.openModalStart? "block":"none"}}>
             <div className="d-flex align-items-center justify-content-end col-11 mt-3">
                 <span className="modalStartInformationSkip" onClick={this.handleClose}>Пропустить</span>
             </div>
             
             <div class="modalStartInformationContent">
                 <input type="radio" name="point" id="slide1" onClick={(e)=>{this.ChangeinputChecked(0)}} checked={this.state.inputChecked[0]}/>
                 <input type="radio" name="point" id="slide2" onClick={(e)=>{this.ChangeinputChecked(1)}} checked={this.state.inputChecked[1]}/>
                 <input type="radio" name="point" id="slide3" onClick={(e)=>{this.ChangeinputChecked(2)}} checked={this.state.inputChecked[2]}/>
                 <input type="radio" name="point" id="slide4" onClick={(e)=>{this.ChangeinputChecked(3)}} checked={this.state.inputChecked[3]}/>
                 <div class="slider">
                     <div class="slides slide1">
                         <i className="iconRout"></i>
                         <span>Маршрут</span>
                         <p>Стройте свой собственный марщрут путешествия,
                         с возможностью включить в
                         него известный достопримечательности.</p>
             
                     </div>
                     <div class="slides slide2">
                         <i className="iconCalendar"></i>
                         <span>Дата отправления</span>
                         <p>Подбирайте удобную для Вас дату поездки</p>
                     </div>
                     <div class="slides slide3">
                         <i className="iconOffer"></i>
                         <span>Предложения</span>
                         <p>Выбирайте из предложенного
                             списка местного водителя-гида,
                             который охотно познакомит Вас со страной изнутри.</p>
                     </div>
                     <div class="slides slide4">
                         <i className="iconEnjoy"></i>
                         <span>Наслаждайтесь поездкой</span>
                         <p>По Вашему запросу водитель сделает
                             остановку в любом месте для фото или видео
                             съемки, посещения достопримечательности.</p>
                     </div>
                 </div>
                 <div class="controls">
                     <label htmlFor="slide1"></label>
                     <label htmlFor="slide2"></label>
                     <label htmlFor="slide3"></label>
                     <label htmlFor="slide4"></label>
                 </div>
             </div>
             <div className="modalStartInformationDivNext d-flex align-items-center justify-content-center col-11 " onClick={()=>{ this.state.changeBtClose ? this.handleClose() : this.ChangeinputChecked()}}>
                 <span className="modalStartInformationNext">{this.state.changeBtClose?"Закрыть":"Далее"}</span>
             </div>
             </div>
             {
                 // Модалка для мобильной версии стартовая
             }
         </React.Fragment>
        )
     }
}

const FirstEnterModal = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(FirstEnterModalClass);

export default FirstEnterModalClass;