import React, { Component } from 'react';
import './DriversProperties.css'
import LanguageMenu from './components/LanguageMenu/LanguageMenu.jsx'
import PeopleMenu from './components/PeopleMenu/PeopleMenu.jsx'
import SortMenu from './components/SortMenu/SortMenu.jsx'
import PagesMenu from './components/PagesMenu/PagesMenu.jsx'
import ValueMenu from './components/ValueMenu/ValueMenu.jsx'
import AutoMenu from './components/AutoMenu/AutoMenu.jsx'
import geoFlag from './components/LanguageMenu/pictures/georgia.svg'
import ruFlag from './components/LanguageMenu/pictures/russia.svg'
import enFlag from './components/LanguageMenu/pictures/united-kingdom.svg'
import espFlag from './components/LanguageMenu/pictures/spain.svg'
import sedan from './components/AutoMenu/pictures/sedan.svg';
import jeep from './components/AutoMenu/pictures/jeep.svg';
import microbus from './components/AutoMenu/pictures/microbus.svg';
import minivan from './components/AutoMenu/pictures/minivan.svg';



export default class DriversProperties extends React.Component {
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
      pagesMenuValue: "10",
      pagesMenuVariants: ["10","20","40"],
      persons: [1,0],
      autoValue: "Тип авто",
      autoVariants: ["Седан","Внедорожник","Минивен","Микроавтобус"],
      languageValue: "Язык",
      languages: [        
        {
          languageName: "Русский",
          icon:ruFlag,
        },
        {
          languageName: "English",
          icon:enFlag,
        },
        {
          languageName: "Georgian",
          icon:geoFlag,
        },
        {
          languageName: "Spanish",
          icon:espFlag,
        },
        
      ]
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
  peopleMenuCall(){
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
    this.setState({
      sortMenu: false,
      sortMenuValue: value
    })
  }
  pagesMenuCall(){
    console.log("pagesMenuCall");
    
    this.setState({
      pagesMenu: !this.state.pagesMenu
    })
  }
  valueMenuCall(){
    this.setState({
      valueMenu: !this.state.valueMenu
    })
  }
  pagesMenuChoose(value){
    console.log("pagesMenuChoose");
    this.setState({
      pagesMenu: false,
      pagesMenuValue: value
    })
  }
  autoMenuCall(){
    this.setState({
      autoMenu: !this.state.autoMenu
    })
  }
  autoValueChoose(value){
    this.setState({
      autoValue: value,
      autoMenu: false
    })
  }
  languageValueChoose(value){
    console.log("languageValueChoose");
    console.log(value);
    this.setState({
      languageValue: value,
      languageMenu: false
    })
  }
  render() {
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
    return (
      <div className = "drivers_properties" >
        
        <div className="properties_leftBlock">
          <div className="drivers_properties_text">Подобрать:       
          </div>
          <div className="properties_buttonStyle properties_leftButton" onClick={()=>this.languageMenuCall()}>
            <div className="properties_value">{this.state.languageValue}</div>
            <div className="properties_arrow"></div>     
            <LanguageMenu isVisible = {this.state.languageMenu} languages = {this.state.languages} languageValueChoose={this.languageValueChoose}/>
          </div>
          <div className="properties_buttonStyle properties_leftButton" onClick={()=>this.autoMenuCall()}>
            <div className="properties_carPicture">
              <img src={sedan} width="100%" height="100%" alt="carImage"></img>
            </div>
            <div className="properties_value">{this.state.autoValue}</div>             
            <div className="properties_arrow"></div>
            <AutoMenu isVisible={this.state.autoMenu} autoVariants={this.state.autoVariants} autoValueChoose={this.autoValueChoose}/>
          </div>
          <div className="properties_buttonStyle properties_leftButton" onClick={()=>this.peopleMenuCall()}>
            <div className="properties_value">{personsNumberString}</div>
            <div className="properties_arrow"></div>          
            <PeopleMenu isVisible = {this.state.peopleMenu} close={this.peopleMenuCall} changePersonsNumber={this.changePersonsNumber} persons={this.state.persons}/>
          </div>
          <div className="properties_buttonStyle properties_leftButton" onClick = {()=>this.valueMenuCall()}>           
            <div className="properties_value">Цена</div>
            <div className="properties_arrow"></div>            
            <ValueMenu isVisible={this.state.valueMenu}/>
          </div>
        </div>
        <div className="properties_rightBlock">         
          <div className="properties_buttonStyle properties_rightButton" onClick={()=>this.sortMenuCall()}>
            <div className="properties_rightButton_characteristic">Сортировать:</div>
            <div className="properties_rightButton_value">{this.state.sortMenuValue}</div>
            <div className="properties_arrow"></div>
            <SortMenu isVisible = {this.state.sortMenu} variants={this.state.sortMenuVariants} chooseFunc={this.sortMenuChoose}/>
          </div>
          <div className="properties_buttonStyle properties_rightButton" onClick={()=>this.pagesMenuCall()}>
            <div className="properties_rightButton_characteristic">{this.state.pagesMenuValue} / страниц</div>            
            <div className="properties_arrow"></div>
            <PagesMenu isVisible = {this.state.pagesMenu} variants={this.state.pagesMenuVariants} chooseFunc={this.pagesMenuChoose}/>
          </div>
        </div>         
      </div>
      
    )
  }
}