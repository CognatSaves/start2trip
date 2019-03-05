import React from 'react';
import './Home.css';
import './text.css';

//import HomeHeader from './HomeHeader/HomeHeader.jsx'
import Header from '../header/Header';
import HomeBody from './HomeBody/HomeBody.jsx'
import Footer from '../Footer/Footer.jsx'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.redirectFunc=this.redirectFunc.bind(this);
  }
  redirectFunc(where){
    this.props.history.push(where);
  }
  render(){
    console.log("Home render");
    console.log(this.props);
    console.log("window.google");
    console.log(window.google);
    return (
      <React.Fragment>
      <div className="home_window">
        <div className="home_block">
          <div className="home_header">
            <Header colorClass="homeColorClass" colorClass2="homeColorClass2" backgroundColorClass="homeBackgroundColorClass"
                 borderColorClass="homeBorderColorClass" labelColorClass="homeLabelColorClass" type={0}/>
          </div>
          <div className="home_text">
            <div className="text_firstLine">Cпланируйте свою экскурсию</div>
            <div className="text_secondLine">Предложения от местных гидов-водителей по вашему индивидуальному маршруту</div>
            <div className="text_changeBodyBlock">
              <div className="text_changeBodyBlock_element changeBody_element_select changeBodyBlock_element_left">СПИСОК</div>
              <div className="text_changeBodyBlock_element changeBodyBlock_element_right">КАРТА</div>
            </div>
          </div>
          <div className="home_body">
            <HomeBody redirectToDrivers={()=>this.redirectFunc('/drivers')}/>
          </div>
          
        </div>
        
        
        <Footer/>
      </div>
      
      
      
      </React.Fragment>
    )
  }
}


export default Home;

/*


 
      */