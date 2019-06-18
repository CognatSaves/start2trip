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
             {/* style={{display: this.state.openModalStart? "block":"none"}} */}
             <div className="modalStartInformation " >
                <div className="d-flex align-items-center justify-content-end col-11 mt-3"/*  */ style={{margin: '0 auto'}}>
                    <div className="modalStartInformation_logo"/>
                    <span className="modalStartInformationSkip" onClick={this.handleClose}>Пропустить</span>
                </div>
                
                <div className="modalStartInformationContent d-flex align-items-center">
                    <div className="d-flex flex-column align-items-center" id="firsItem">
                    <i className="iconRout"></i>
                            <span>Маршрут</span>
                            <p>Стройте свой собственный маршрут путешествия,
                            с возможностью включить в
                            него известные достопримечательности.</p>
                    </div>
                    <div className="d-flex flex-column align-items-center" id="secondItem">
                    <i className="iconCalendar"></i>
                            <span>Дата отправления</span>
                            <p>Подберите удобную для Вас дату поездки</p>
                    </div>
                    <div className="d-flex flex-column align-items-center" id="thirdItem">
                    <i className="iconOffer"></i>
                            <span>Предложения</span>
                            <p>Выберите из предложенного
                                списка местного водителя-гида,
                                который охотно познакомит Вас со страной.</p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                    <i className="iconEnjoy"></i>
                            <span>Наслаждайтесь поездкой</span>
                            <p>По Вашему запросу водитель сделает
                                остановку в любом месте для фото или видео
                                съемки, посещения достопримечательностей.</p>
                    </div>
                    
                </div>
                <div className="d-flex">
                    <a href="#firsItem">dot1</a>
                    <a href="#secondItem">dot2</a>
                    <a href="#thirdItem">dot3</a>
                    <a href="#firsItem">dot1</a>
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