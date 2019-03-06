import React, { Component } from 'react';
import './DriversProperties.css'
import LanguageMenu from './components/LanguageMenu/LanguageMenu.jsx'
import PeopleMenu from './components/PeopleMenu/PeopleMenu.jsx'
import SortMenu from './components/SortMenu/SortMenu.jsx'
import PagesMenu from './components/PagesMenu/PagesMenu.jsx'
import ValueMenu from './components/ValueMenu/ValueMenu.jsx'
import AutoMenu from './components/AutoMenu/AutoMenu.jsx'
import { connect } from 'react-redux';
import sedan from './components/AutoMenu/pictures/sedan.svg';

import languageBlueIcon from '../DriversBlock/pictures/language_blue.svg'
import userBlueIcon from '../DriversBlock/pictures/user_blue.svg'


class DriversPropertiesClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      languageMenu: false,
      peopleMenu: false,
      sortMenu: false,
      pagesMenu: false,
      valueMenu: false,
      autoMenu: false,
      sortMenuValue: "Популярность",
      sortMenuVariants: ["Популярность","Рейтинг","Цена"],
      //pagesMenuValue: 10,
      //pagesMenuVariants: ["10","20","40"],
      persons: [1,0],
      //autoValue: "Тип авто",
      languageValue: "Язык",
      languageIcon: languageBlueIcon,
      autoIcon:sedan,
      selectedPrice: this.props.maxValue
    }
    this.languageMenuCall=this.languageMenuCall.bind(this);
    this.peopleMenuCall=this.peopleMenuCall.bind(this);
    this.sortMenuCall=this.sortMenuCall.bind(this);
    this.sortMenuChoose=this.sortMenuChoose.bind(this);
    this.pagesMenuCall=this.pagesMenuCall.bind(this);
    this.pagesMenuChoose=this.pagesMenuChoose.bind(this);
    
    this.valueMenuCall=this.valueMenuCall.bind(this);
    this.autoMenuCall=this.autoMenuCall.bind(this);

    this.autoValueChoose=this.autoValueChoose.bind(this);
    this.languageValueChoose=this.languageValueChoose.bind(this);

    this.changePersonsNumber=this.changePersonsNumber.bind(this);
  }
  changePersonsNumber(index, value){
    // console.log("changePersonsNumber call");
     let persons = this.state.persons.slice();
     persons[index]+=value;
    // console.log("new persons");
     if(persons[0]>=1 && persons[1]>=0){
         this.setState({
             persons: persons
         })
     }
 }
  languageMenuCall(){
    this.setState({
      languageMenu: !this.state.languageMenu
    })
  }
  peopleMenuCall(clear){
    if(clear){
      this.setState({
        persons: [1,0]
    })
    }
    this.setState({
      peopleMenu: !this.state.peopleMenu
    })
  }
  sortMenuCall(){
    this.setState({
      sortMenu: !this.state.sortMenu
    })
  }
  sortMenuChoose(value){
    this.props.setSortMenu(value);
    this.setState({
      sortMenu: false,
      //sortMenuValue: value
    })
  }
  pagesMenuCall(){
    console.log("pagesMenuCall");
    
    this.setState({
      pagesMenu: !this.state.pagesMenu
    })
  }
  valueMenuCall(){
    this.props.setTempPricePart(this.props.storeState.pricePart);
    this.setState({
      valueMenu: !this.state.valueMenu
    })
  }
  pagesMenuChoose(value){
    console.log("pagesMenuChoose");
    this.props.setPages(value);
    this.setState({
      pagesMenu: false,
      //pagesMenuValue: value
    })
  }
  autoMenuCall(){
    this.setState({
      autoMenu: !this.state.autoMenu
    })
  }
  autoValueChoose(value,icon){
    this.props.setAuto(value);
    this.setState({
      //autoValue: value,
      autoMenu: false,
      autoIcon: icon
    })
  }
  languageValueChoose(value,icon){
    this.setState({
      languageValue: value,
      languageMenu: false,
      languageIcon: icon
    })
  }
  
  render() {
    function valueTextGenerator(pricePart, maxPrice){
      if(pricePart<100){
        let price = pricePart*maxPrice/100;
        return "до "+price;
      }
      else{
        return "Цена";
      }
    }
    function personsCalculation(people){
      let result=0;
      people.forEach(function(item, i,people){
        result+=item;
      })
      let resultString="";
      if([2,3,4].some(el => el === result)){
        resultString = result + " человека";
      }
      else{
        resultString = result + " человек";
      }
      return resultString;
    }
    let personsNumberString = personsCalculation(this.state.persons);


    let valueText = valueTextGenerator(this.props.storeState.pricePart, this.props.storeState.maxPrice);
    return (
      <div className = "drivers_properties" >
        
        <div className="properties_leftBlock">
          <div className="drivers_properties_text">Подобрать:       
          </div>
          <div className="properties_buttonStyle properties_leftButton" onClick={()=>this.languageMenuCall()}>
            <div className="properties_value"><img src={this.state.languageIcon} width="15px" height="15px"/>{this.state.languageValue}</div>
            <div className="properties_arrow"></div>     
            <LanguageMenu isVisible = {this.state.languageMenu} languages = {this.state.languages}  languageValueChoose={this.languageValueChoose}/>
          </div>
          <div className="properties_buttonStyle properties_leftButton" onClick={()=>this.autoMenuCall()}>
            <div className="properties_carPicture">
              <img src={this.state.autoIcon} width="100%" height="100%" alt="carImage"/>
            </div>
            <div className="properties_value">{this.props.storeState.autoValue}</div>             
            <div className="properties_arrow"></div>
            <AutoMenu isVisible={this.state.autoMenu} autoVariants={this.state.autoVariants} autoValueChoose={this.autoValueChoose}/>
          </div>
          <div style={{position:"relative"}}>
            <div className="properties_buttonStyle properties_leftButton" onClick={()=>this.peopleMenuCall()}>
              <div className="properties_value"><img src={userBlueIcon} width="12px" height="12px"/>{personsNumberString}</div>
              <div className="properties_arrow"></div>  
            </div>                  
            <PeopleMenu isVisible = {this.state.peopleMenu} close={this.peopleMenuCall} changePersonsNumber={this.changePersonsNumber} persons={this.state.persons}/>
          </div>
          <div style={{position: "relative"}} >
            <div className="properties_buttonStyle properties_leftButton" onClick = {()=>
            {this.valueMenuCall()}}>           
              <div className="properties_value">{valueText}</div>
              <div className="properties_arrow"></div>
            </div>            
            <ValueMenu isVisible={this.state.valueMenu} maxPrice={this.props.maxPrice} price={this.props.price} changePrice={this.props.changePrice} close={this.valueMenuCall}/>           
          </div>
          
        </div>
        <div className="properties_rightBlock">         
          <div className="properties_buttonStyle properties_rightButton" onClick={()=>this.sortMenuCall()}>
            <div className="properties_rightButton_characteristic">Сортировать:</div>
            <div className="properties_rightButton_value">{this.props.storeState.sortMenuValue}</div>
            <div className="properties_arrow"></div>
            <SortMenu isVisible = {this.state.sortMenu} chooseFunc={this.sortMenuChoose} variants = {this.props.storeState.sortMenuVariants}/>
          </div>
          <div className="properties_buttonStyle properties_rightButton" onClick={()=>this.pagesMenuCall()}>
            <div className="properties_rightButton_characteristic">{this.props.storeState.pagesMenuValue} / страниц</div>            
            <div className="properties_arrow"></div>
            <PagesMenu isVisible = {this.state.pagesMenu} chooseFunc={this.pagesMenuChoose}/>
          </div>
        </div>         
      </div>
      
    )
  }
}
const DriversProperties = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
  (dispatch) => ({
    setAuto: (autoValue) => dispatch({type: "SET_AUTO", autoValue: autoValue}),
    setPages: (pagesMenuValue) => dispatch({type: "SET_PAGES", pagesMenuValue: pagesMenuValue}),
    setSortMenu: (sortMenuValue) => dispatch({type: "SET_SORT_MENU", sortMenuValue: sortMenuValue}),
    setTempPricePart: (tempPricePart)=>dispatch({type: "SET_TEMP_PRICE_PART", tempPricePart: tempPricePart})
  })
)(DriversPropertiesClass);

export default DriversProperties;