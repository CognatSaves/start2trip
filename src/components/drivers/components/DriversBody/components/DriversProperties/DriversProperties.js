import React, { Component } from 'react';
import './DriversProperties.css'
import LanguageMenu from './components/LanguageMenu/LanguageMenu.js'
import PeopleMenu from './components/PeopleMenu/PeopleMenu.js'
import SortMenu from './components/SortMenu/SortMenu.js'
import PagesMenu from './components/PagesMenu/PagesMenu.js'
import ValueMenu from './components/ValueMenu/ValueMenu.js'
import AutoMenu from './components/AutoMenu/AutoMenu.js'

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
      autoValue: "Седан",
      autoVariants: ["Седан","Внедорожник","Минивен","Микроавтобус"],
      languages: [        
        {
          languageName: "Русский",
        },
        {
          languageName: "English",
        },
        {
          languageName: "Deutsch",
        },
        {
          languageName: "Français",
        },
        
      ]
    }
    this.languageMenuCall=this.languageMenuCall.bind(this);
    this.peopleMenuCall=this.peopleMenuCall.bind(this);
    this.sortMenuCall=this.sortMenuCall.bind(this);
    this.sortMenuChoose=this.sortMenuChoose.bind(this);
    this.pagesMenuCall=this.pagesMenuCall.bind(this);
    this.pagesMenuChoose=this.pagesMenuChoose.bind(this);
    this.changePersonsNumber=this.changePersonsNumber.bind(this);
    this.valueMenuCall=this.valueMenuCall.bind(this);
    this.autoMenuCall=this.autoMenuCall.bind(this);
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
    let personsNumberString = personsCalculation(this.state.persons)
    return (
      <div className = "drivers_properties" >
        <div className="drivers_properties_text">Подобрать:       
        </div>
        <div className="properties_buttonStyle properties_leftButton" onClick={()=>this.languageMenuCall()}>
          <div>
            <div className="properties_leftHidden">_</div>
            Язык
            <div className="properties_arrow"></div>
            <div className="properties_rightHidden">_</div>
          </div>         
          <LanguageMenu isVisible = {this.state.languageMenu} languages = {this.state.languages}/>
        </div>
        <div className="properties_leftSpace"></div>
        <div className="properties_buttonStyle properties_leftButton">
          <div onClick={()=>this.autoMenuCall()}>
            <div className="properties_leftHidden">_</div>  
            Тип авто
            <div className="properties_arrow"></div>
            <div className="properties_rightHidden">_</div>
          </div>
          <AutoMenu isVisible={this.state.autoMenu} autoVariants={this.state.autoVariants}/>
        </div>
        <div className="properties_leftSpace"></div>
        <div className="properties_buttonStyle properties_leftButton" >
          <div onClick={()=>this.peopleMenuCall()}>
            <div className="properties_leftHidden" >_</div>  
            {personsNumberString}
            <div className="properties_arrow"></div>
            <div className="properties_rightHidden">_</div>
          </div>
          
          <PeopleMenu isVisible = {this.state.peopleMenu} close={this.peopleMenuCall} changePersonsNumber={this.changePersonsNumber} persons={this.state.persons}/>
        </div>
        <div className="properties_leftSpace"></div>
        <div className="properties_buttonStyle properties_leftButton">
          <div onClick = {()=>this.valueMenuCall()}>
            <div className="properties_leftHidden">_</div>  
            Цена
            <div className="properties_arrow"></div>
            <div className="properties_rightHidden">_</div>
          </div>
          <ValueMenu isVisible={this.state.valueMenu}/>
        </div>


        <div className="properties_rightBlock">
          
          <div className="properties_buttonStyle properties_rightButton" onClick={()=>this.pagesMenuCall()}>
            <div className="properties_leftHidden">_</div> 
            {this.state.pagesMenuValue} / страниц
            <div className="properties_arrow"></div>
            <div className="properties_rightHidden">_</div>
            <PagesMenu isVisible = {this.state.pagesMenu} variants={this.state.pagesMenuVariants} chooseFunc={this.pagesMenuChoose}/>
          </div>
          <div className="properties_rightSpace"></div>
          <div className="properties_buttonStyle properties_rightButton" onClick={()=>this.sortMenuCall()}>
            <div className="properties_leftHidden">_</div> 
            <div className="properties_rightButton_characteristic">Сортировать:</div>
            <div className="properties_leftHidden">_</div> 
            <div className="properties_rightButton_value">{this.state.sortMenuValue}</div>
            <div className="properties_leftHidden">_</div> 
            <div className="properties_arrow"></div>
            <SortMenu isVisible = {this.state.sortMenu} variants={this.state.sortMenuVariants} chooseFunc={this.sortMenuChoose}/>
          </div>
          <div className="properties_rightSpace"></div>
        </div>
      
        
        
        
      </div>
    )
  }

}
