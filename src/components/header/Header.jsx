import React from 'react';
import './header_css.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import RenderModalCountry from './RenderModalCountry'
import RenderModalRegistration from './RenderModalRegistration'
import mapWorldIcon from '../media/mapWorld.svg'
import { connect } from 'react-redux';
import crossIconModal from '../media/closeGray.svg'
// import geoFlag from './pictures/georgia.svg'
// import ruFlag from './pictures/russia.svg'
// import enFlag from './pictures/united-kingdom.svg'
// import espFlag from './pictures/spain.svg'
import { Link } from 'react-router-dom';
// import { Collapse } from 'reactstrap';
import { Modal, ModalBody } from 'reactstrap';
import requests from '../../config';
import axios from 'axios';
import { setUser, setActiveCurr, setActiveLang, setModalRegister, setActiveLangAdmin,modalCountryDispatch } from '../../redusers/Action';
import { disablePageScroll, clearQueueScrollLocks, enablePageScroll } from 'scroll-lock';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { whichPageRenderHistory ,whichPageRender } from "../../redusers/ActionGlobal"
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import getUserData from '../driverProfileRegistration/DriverProfileRequest';
import DriverRefreshIndicator from '../driverProfileRegistration/DriverRefreshIndicator';
import Cookies from 'universal-cookie';
import pageTextInfo from '../../textInfo/RenderModalRegistration';

import Dialog from 'material-ui/Dialog';
import { isMobileOnly, isMobile } from 'react-device-detect';
import backpackIcon from '../media/backpack.svg'
import dealIcon from '../media/deal.svg'
import wheelIcon from '../media/wheel.svg'
const cookies = new Cookies();

const ModalRegistration = (props) => {
  let { modalRegistration, toggle, className, authorization } = props;
  return (
    <Modal isOpen={modalRegistration} toggle={toggle} className={className + " p-0"}>
      <ModalBody>
        <RenderModalRegistration close={toggle} authorization={authorization} />
      </ModalBody>
    </Modal>
  )
}
const ModalUserType = (props) => {
  function sendUserType(that) {
    let jwt = that.props.globalReduser.readCookie('jwt');
    if (jwt && jwt !== "-") {
      that.setState({
        isWaiting: true,
        isUsertypeLooking: false
      });
      let body = JSON.stringify({ userType: that.state.selectedUserType, country: that.state.selectedUserCountry });
      fetch(requests.profileUpdateRequest, {
        method: 'PUT', body: body,
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}` }
      })
        .then(response => {
          return response.json();
        })
        .then(function (data) {

          if (data.error) {
            console.log("bad");
            throw data.error;
          }
          else {
            console.log("good");
            that.accountRedirect(that.state.savedAddress, that.state.savedNumber);
          }
        })
        .catch(function (error) {
          console.log("bad");
          console.log('An error occurred:', error);
          //that.catchFunc();
        });
    }
    else {
      this.props.dispatch(setUrlAddress(window.location.pathname));
      this.props.history.push('/login');
      //return null;
    }
  }
  function setSelectedUserType(value, that) {
    that.setState({
      selectedUserType: value
    })
  }
  let { isOpen, that, textInfo } = props;
  let lang = 0; // подключить мультиязычность!!!
  let massIcon = [backpackIcon, wheelIcon, dealIcon];
  const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
  };
  const customContentStyle2 = {
    maxWidth: '512px',
  };
  if(that.state.selectedUserCountry.length===0 && that.props.storeState.country.length>0){
    that.setState({
      selectedUserCountry: that.props.storeState.country
    })
  }
  let profile = that.props.globalReduser.profile;
  let selectUserTypeVisibility = true;
  
  if(profile.isDriver || profile.isAgency){
    selectUserTypeVisibility=false;
    if(that.state.selectedUserType===0){
      if(profile.isDriver){
        setSelectedUserType(2,that);
      }
      if(profile.isAgency){
        setSelectedUserType(3,that);
      }

    }
  }
  return (
    <Dialog
      modal={true}
      open={isOpen}
      contentStyle={isMobile ? customContentStyle : customContentStyle2}
    >
      <div className='d-flex flex-column align-items-center selectTypeBody'>
        {
          selectUserTypeVisibility ? 
          <React.Fragment>
            <span>{textInfo.modalUserType.selectAccountTypeText}</span>
            {
              pageTextInfo.registrationUserType.userTypes.map((element, index) =>
                <div className={index ? "selectTypeBlockLine selectTypeBlock d-flex align-items-center col-8" : "selectTypeBlock d-flex align-items-center col-8"}
                  onClick={() => { setSelectedUserType(index + 1, that) }} >
                  <i style={{ background: "url(" + massIcon[index] + ") no-repeat" }} />
                  <label className="typeCheckLabel" for={"typeCheckbox" + (index + 1)}>{element.userText[lang]}</label>
                  <input className="typeCheckButton" id={"typeCheckbox" + (index + 1)}
                    type="radio" name="raz" />
                </div>
              )
            }
          </React.Fragment> : <React.Fragment/>
        }    
        {
          that.state.selectedUserType>1 ? 
          <React.Fragment>
            <span>{"Укажите страну, в которой вы будете работать"}</span>
            <DropDownMenu
              value={that.state.selectedUserCountry}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
              onChange={(event, index, value)=>{ that.setState({
                selectedUserCountry: value
              })}}
              style={{ width: "100%" }}
              className="dropdownClass"
              autoWidth={false}
              selectedMenuItemStyle={{ color: "#f60" }}   
            >
              {
                that.props.storeState.countries.map((element, index)=>
                  <MenuItem value={element.ISO} primaryText={element.ISO}/>
                )
              }
            </DropDownMenu>
          </React.Fragment> : <React.Fragment/>
        }
        {
          that.state.selectedUserType>0 ? 
          <button className="selectTypeBt" onClick={() => that.state.selectedUserType === 0 ?
            {} : sendUserType(that)}>{pageTextInfo.registrationUserType.buttonNext[lang]}
          </button>
          : <React.Fragment/>
        }
        
      </div>
    </Dialog>

  )
}
const CountrySelect = (props) => {
  let { modalCountry, toggleModalCountry, className,textInfo } = props;
  return (
    <Modal isOpen={modalCountry} toggle={toggleModalCountry} className={className}>
      <ModalBody>
        <div className="d-flex flex-column col-12">
          <div className="d-flex  justify-content-center col-12 p-4">
            <img src={mapWorldIcon} height="150px" alt="mapWorldIcon" />
            <button className="modalCountryButtton" onClick={() => { toggleModalCountry() }}><img src={crossIconModal} width="20px" height="20px" alt="crossIconModal" /></button>
          </div>
          <div className="modalCountry d-flex flex-column align-items-center mb-5">
            <span className="mb-4">{textInfo.modalCountrySelect.selectCountryText}</span>
            <RenderModalCountry close={toggleModalCountry} />
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

class HeaderClass extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.history) {
      this.props.dispatch(whichPageRenderHistory(this.props.history));
    }
    this.readIsoInUrl();
    this.authorization();
    let avatarUrl = this.props.globalReduser.readCookie('avatarUrl');
    let userName = this.props.globalReduser.readCookie('userName');
    let jwt = this.props.globalReduser.readCookie('jwt');

    /*
    if (jwt && jwt !== "-" && (this.props.storeState.avatarUrl !== avatarUrl || this.props.storeState.userName !== userName)) {
      if(avatarUrl===null || userName===null){
        cookies.remove('jwt',{path: '/'});
      }
      else{
        this.props.dispatch(setUser(userName, avatarUrl));
      }    
    }
    */
    let activeLanguageNumber = 0;
    let activeCurrencyNumber = 0;
    if (this.props.storeState.languages.length > 0) {
      let languages = this.props.storeState.languages;
      let currencies = this.props.storeState.currencies;
      let lang = this.props.globalReduser.readCookie('userLang');
      let curr = this.props.globalReduser.readCookie('userCurr');

      if (!lang) {
        for (let i = 0; i < languages.length; i++) {
          if (languages[i].ISO === 'ENG') {
            activeLanguageNumber = i;
            break;
          }
        }
      }
      else {
        let i = 0;
        for (; i < languages.length; i++) {
          if (lang === languages[i].ISO) {
            activeLanguageNumber = i;
            break;
          }
        }
      }
      if (!curr) {
        for (let i = 0; i < currencies.length; i++) {
          if (currencies[i].ISO === "USD") {
            activeCurrencyNumber = i;
            break;
          }
        }
      }
      else {
        let i = 0;
        for (; i < currencies.length; i++) {
          if (curr === currencies[i].ISO) {
            activeCurrencyNumber = i;
            break;
          }
        }
      }
    }
    this.props.dispatch(setActiveCurr(activeCurrencyNumber));
    this.props.dispatch(setActiveLang(activeLanguageNumber));

    //let textInfo = this.props.storeState.languageTextMain.header;
    
    this.state = {
      dropdownLanguageOpen: false,
      burgerMenu: false,
      dropdownOpen: false,
      //activLanguageNumber: activeLanguageNumber,
      //activeCurrencyNumber: activeCurrencyNumber,
      previousPageYOffset: null,
      modalCountry: false,
      collapse: false,
      //modalRegistration: false,
      

      menuItems: ["Профиль", "Автомобиль", "Настройки поездок", "Туры", "Отзывы", "Настройки", "Биллинг", "Партнерская программа", "Выход"],
      history: props.history,
      isWaiting: false,
      isUsertypeLooking: false,
      selectedUserCountry: '',
      savedAddress: '',
      savedNumber: 0,
      selectedUserType: 0
    };
    window.onscroll = (e) => this.checkBtUp(e);

    //this.getLocals();
  }
  readIsoInUrl=()=>{
    
    let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
    let cookiesIso = cookies.get('country',{path:"/"})
    let cookiesLangISO = cookies.get('userLangISO',{path:"/"})
    let pathnameUrl = this.props.history.location.pathname;
    pathnameUrl = pathnameUrl.split('/');
    pathnameUrl = pathnameUrl[1];
    let pathnameLength = pathnameUrl.split('');
    
    if(pathnameLength.length===6){
      let stringCookies = (cookiesIso+"-"+cookiesLangISO)
      if(stringCookies!==pathnameUrl){
        pathnameUrl = pathnameUrl.split("-")
        if((pathnameUrl[0].length===3)&&(pathnameUrl[1].length===2)){
          cookies.set('country',pathnameUrl[0],{path:"/", expires: date });
          cookies.set('userLangISO', pathnameUrl[1], { path: '/', expires: date });
          this.props.dispatch(modalCountryDispatch(pathnameUrl[0]))
        }
      }
      
    }
  }

  setLocals = (type, index) => {

    let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
    switch (type) {
      case 'userLang': {
        let that = this;
        function loadScript (url, onload){
          return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.type = 'text/javascript';
              script.onload = resolve;
              script.onerror = reject;
              script.src = url;
              
              if (document.head) {
                
                //document.getElementById('langScript').remove();
                script.id='langScript';
                //document.head.appendChild(script);
                that.props.dispatch(setActiveLang(index));
                cookies.set('userLang', that.props.storeState.languages[index].ISO, { path: '/', expires: date });
                cookies.set('userLangISO', that.props.storeState.languages[index].isoAutocomplete, { path: '/', expires: date });
                let namePage = that.props.globalhistory.history.location.pathname.split("/");
                namePage = namePage.splice(2)
                namePage = namePage.join('/')
                that.props.history.push("/"+that.props.storeState.country+"-"+that.props.storeState.languages[index].isoAutocomplete+"/"+(namePage===""?"route":namePage))
              }
          });
        }
        let string = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBxjEYepkLXhQuXcf_1sUakshHN5Jrozc8&libraries=places&callback=initialize";
        let langString= string+"&language="+this.props.storeState.languages[index].isoAutocomplete;
        loadScript(langString);
        
        break;
      }
      case 'adminLang':{
        
        let that = this;
        console.log('adminLang called');
        this.props.dispatch(setActiveLangAdmin(index));
        cookies.set('adminLang', that.props.storeState.adminLanguages[index].ISO, { path: '/', expires: date });
        break;
      }
      case 'userCurr': {
        this.props.dispatch(setActiveCurr(index));
        /*this.setState({
          activeCurrencyNumber: index
        });*/
        cookies.set('userCurr', this.props.storeState.currencies[index].ISO, { path: '/', expires: date });
        break;
      }
      default:
    }
  }
  toggleModalCountry = () => {
    this.setState(prevState => ({
      modalCountry: !prevState.modalCountry
    }));
  }
  toggleModalRegistration = () => {
    //this.setState(prevState => ({
      this.props.dispatch(setModalRegister(!this.props.storeState.modalRegistration));
      //modalRegistration: !prevState.modalRegistration
    //}));
  }
  toggleLanguage = () => {
    this.setState({
      dropdownLanguageOpen: !this.state.dropdownLanguageOpen
    });
  }
  toggleDropdownOpen = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  authorization = () => {
    let jwt = this.props.globalReduser.readCookie('jwt');
    if (jwt && jwt !== "-") {
      axios.get(requests.meRequest, {
        headers: {
          //Authorization: `${jwt}`
          Authorization: `Bearer ${jwt}`
        }
      })
        .then(response => {

          // Handle success.
          //console.log('Data: ');
          // console.log(response.data);
          let avatarUrl = requests.serverAddress + response.data.url;
          let userName = response.data.firstName;
          let userData = response.data.userData;
          if (avatarUrl !== this.props.storeState.avatarUrl || userName !== this.props.storeState.userName) {
            let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
            cookies.set('userName', userName, { path: '/', expires: date });
            cookies.set('avatarUrl', avatarUrl, { path: '/', expires: date });
            this.props.dispatch(setUser(userName, avatarUrl,userData));
          }

        })
        .catch(error => {
          this.props.dispatch(setUser("", "",{}));
          //console.log('log off');
          //console.log('An error occurred:', error);
        });
    }
    else {

      //this.props.dispatch(setUrlAddress(window.location.pathname));
      //this.props.history.push('/login');


      //нет тела - авторизованного пользователя -> нет дела - отрисовки профиля в шапке
    }
  }
  logOffFunc = () => {
    function removeCookie(that) {
      setTimeout(() => {
        //this func is so shitty because there was (is) a chance to save cookie
        //after doing this func once/ And then I make it cyclic (I think it usually will be once called, 
        // but sometime twice)


        let date = new Date(0);
        console.log('try to remove cookies');
        cookies.remove('jwt', { path: '/' });
        cookies.remove('jwtstatus', { path: '/' });
        cookies.remove('avatarUrl', { path: '/' });
        cookies.remove('userName', { path: '/' });
        cookies.remove('userType', { path: '/' });


        that.props.dispatch(setUser("", ""));
        that.props.dispatch(setProfileData({}));
        let newJwt = that.props.globalReduser.readCookie('jwt');
        let tempJWT = cookies.get('jwt', { path: '/' });
        if (newJwt && newJwt !== "-") {
          removeCookie(that);
        }
      }, 1000);


    }
    //console.log("logOffFunc");

    let jwt = this.props.globalReduser.readCookie('jwt');

    if (jwt && jwt !== "-") {
      removeCookie(this);
    }
    this.props.globalhistory.history.push("/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+'/home');
  }
  accountRedirect = (address, number) => {

    function thenFunc(that, address, number) {
      
      console.log(that);
      console.log(address);
      let profile = that.props.globalReduser.profile;
      let fullAddress = '/account';
      if ((profile.isDriver && profile.country) || profile.isCustomer || (profile.isAgency && profile.country)) {
        if (profile.isDriver) {
          fullAddress += '/driver';
        }
        if (profile.isCustomer) {
          fullAddress += '/user';
        }
        if (profile.isAgency) {
          fullAddress += '/agency';// or smth else if it changed
        }
        fullAddress += address;
        that.props.dispatch(whichPageRender(number));
        that.setState({
          isWaiting: false,
          isUsertypeLooking: false,
          selectedUserType: 0,
          savedAddress: '',
          savedNumber: 0
        })
        that.props.globalhistory.history.push(fullAddress);
      }
      else {
        //fullAddress='/home';
        that.setState({
          isWaiting: false,
          isUsertypeLooking: true,
          selectedUserType: 0,
          savedAddress: address,
          savedNumber: number
        })
      }

    }
    
    const that = this;
    let jwt = this.props.globalReduser.readCookie('jwt');
    
    if (jwt && jwt !== '-') {
      let profile = that.props.globalReduser.profile;
      if( !( (profile.isDriver && profile.country) || profile.isCustomer || (profile.isAgency && profile.country) ) ){
        axios.get(requests.profileCheck, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        .then(response => {
          
          console.log();
          that.props.dispatch(setProfileData(response.data));
          thenFunc(that, address, number);
        })
        .catch(error => {
          this.props.dispatch(setUser("", "",{}));
        });
      }
      else{
        thenFunc(that, address, number);
      }
    }
    else {
      this.props.dispatch(setUrlAddress(window.location.pathname));
      this.props.history.push('/login');
      //return null;
    }


  }

  checkBtUp = (e) => {
    let scrollEvent = e.currentTarget.pageYOffset;
    if (isMobileOnly) {
      if (this.state.previousPageYOffset > scrollEvent) {
        if (scrollEvent > 730) {
          document.querySelector(".btUp").classList.add("btUp-active");
        } else {
          if(document.querySelector(".btUp") !== null){
          document.querySelector(".btUp").classList.remove("btUp-active");
          }
        }
      } else {
        if(document.querySelector(".btUp") !== null){
          document.querySelector(".btUp").classList.remove("btUp-active");
        } 
      }
    } else {
      if (this.state.previousPageYOffset > scrollEvent) {
        if(document.querySelector(".footerButtonUp").classList !== null){
          if (scrollEvent > 400) {
              document.querySelector(".footerButtonUp").classList.add("footerButtonUp-active");
          }
          else {         
              document.querySelector(".footerButtonUp").classList.remove("footerButtonUp-active");            
          }
        }
        else {
          document.querySelector(".footerButtonUp").classList.remove("footerButtonUp-active");
        }
      }
    }
    this.setState({ previousPageYOffset: scrollEvent })

  }
  render() {
    console.log('Header render', this.props, window, document);
    //console.log(this.state);
    //console.log(this.props);
    
    let languages = this.props.storeState.languages;
    let currencies = this.props.storeState.currencies;
    let adminLanguages = this.props.storeState.adminLanguages;
    let textInfoMain = this.props.storeState.languageTextMain.header;
    let textInfoAdmin = this.props.storeState.languageText.header;
    let isAdmin = this.props.storeState.isSecondLanguageGroupPart;
    let textInfo = isAdmin ? textInfoAdmin : textInfoMain;
    
    let buttonMassElements= [
      {
        to: "/",
        value: textInfo.menuElements[0]
      },
      {
        to: "/places",
        value: textInfo.menuElements[1]
      },
      {
        to: "/tours",
        value: textInfo.menuElements[2]
      }
    ];
    return (
      <React.Fragment>
        <ModalRegistration modalRegistration={this.props.storeState.modalRegistration} toggle={this.toggleModalRegistration} className={this.props.className} authorization={this.authorization} />
        <CountrySelect textInfo={textInfo} modalCountry={this.state.modalCountry} toggleModalCountry={this.toggleModalCountry} className={this.props.className} />
        {
          this.state.isWaiting ?
            <DriverRefreshIndicator isRefreshExist={true} isRefreshing={true} isGoodAnswer={true} />
            : <React.Fragment />

        }
        {/*
          this.state.isUsertypeLooking ?
          
          : <React.Fragment/> */
        }
        <ModalUserType textInfo={textInfo} isOpen={this.state.isUsertypeLooking} that={this} />
        <div className="headerMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center justify-content-between">
          {/* <div onClick={this.toggleModalCountry} className="headerGeoButton">
            <span>{this.props.storeState.country}</span>
          </div> */}
          <Link className="" to={"/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+"/route"}>
            <h3 />
          </Link>
          <div onClick={this.toggleModalCountry} style={{visibility: this.props.storeState.countries.length>0 ? 'visible' : 'hidden'}} className="headerGeoButton col-lg-5 col-md-4 col-7">
                <span>{this.props.storeState.country}</span>
              </div>
          <div className="headerSelect d-flex align-items-center justify-content-end ">
            <button className={this.state.burgerMenu ? "headerMobailButton-active" : "headerMobailButton"} onClick={() => {
              if (this.state.burgerMenu) {
                clearQueueScrollLocks(); enablePageScroll();
              } else {
                disablePageScroll()
              }
              this.setState({ burgerMenu: !this.state.burgerMenu });
            }}></button>
            <nav className={this.state.burgerMenu ? "burgerMenu burgerMenu-active" : "burgerMenu"}>
              <div className="burgerMenuBg">
                <div className="burgerMenuTop">
                  <DropDownMenu anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} className="burgerMenuTopDropDown" menuStyle={{ width: "30px" }}
                    value={this.props.storeState.activeLanguageNumber/*this.state.activLanguageNumber*/} onChange={(event, index, value) => { this.setLocals('userLang', index) }}>
                    {languages.map((element, index) =>
                      <MenuItem value={index} primaryText={<React.Fragment><img className="mb-1" src={requests.serverAddress + element.icon.url} width="15px" height="15px" alt={element.ISO} /><span className="burgerMenuTopDropDownSpan">{element.ISO}</span></React.Fragment>} ></MenuItem>
                    )}
                  </DropDownMenu>
                  <DropDownMenu menuItemStyle={{ color: "#304269", fontSize: "14px", fontWeight: "400" }} selectedMenuItemStyle={{ color: "#f60" }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} className="burgerMenuTopDropDown" menuStyle={{ width: "30px" }}
                    value={this.props.storeState.activeCurrencyNumber/*this.state.activeCurrencyNumber*/} onChange={(event, index, value) => { this.setLocals('userCurr', index) }}>
                    {currencies.map((element, index) =>
                      <MenuItem value={index} primaryText={element.symbol + " " + element.ISO} />
                    )}
                  </DropDownMenu>
                  {
                    /*
                  <DropDownMenu anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} className="burgerMenuTopDropDown" menuStyle={{ width: "30px" }}
                   value={this.props.storeState.activeLanguageNumber} onChange={(event, index, value) => { this.setLocals('userLang',index) }}>
                    {languages.map((element, index) =>
                      <MenuItem value={index} primaryText={<React.Fragment><img className="mb-1" src={requests.serverAddress+element.icon.url} width="15px" height="15px" alt={element.ISO} /><span className="burgerMenuTopDropDownSpan">{element.ISO}</span></React.Fragment>} ></MenuItem>
                    )}
                  </DropDownMenu>

                    */
                  }

                </div>
                <div className="burgerMenuBottom">
                  {
                    this.props.storeState.isAuthorized ?
                    <React.Fragment>
                      <span onClick={() => {  clearQueueScrollLocks(); enablePageScroll();this.setState({burgerMenu: false}); this.accountRedirect("/profile", 1) }}>{textInfo.burgerMenu.profile}</span>
                      <span className="blockedSpan" onClick={() => {/* this.setState({burgerMenu: false});this.accountRedirect("/trips", 0)*/ }}>{textInfo.burgerMenu.trips}</span>
                      <span onClick={() => {  clearQueueScrollLocks(); enablePageScroll();this.setState({burgerMenu: false}); this.accountRedirect("/settings", 6) }}>{textInfo.burgerMenu.settings}</span>
                      <span onClick={() => {  clearQueueScrollLocks(); enablePageScroll();this.setState({burgerMenu: false}); this.accountRedirect("/referrals", 8) }}>{textInfo.burgerMenu.partnership}</span>
                      <span onClick={()=>{ clearQueueScrollLocks(); enablePageScroll(); this.setState({burgerMenu: false});this.logOffFunc()}}>{textInfo.burgerMenu.exit}</span> 
                    </React.Fragment>
                    :
                    <span onClick={this.toggleModalRegistration}>{textInfo.burgerMenu.enter}</span>

                  }              
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="btUp" onClick={() => { window.scroll(0, 0) }}>
          <span>{textInfo.toPageStart}</span>
          <i className="footerMobileIconUp" />
        </div>
        <div className={this.props.driver ? "driverHeader" : "homeHeader"}>
          <div className='header d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-stretch justify-content-between'>
            <div className="d-flex align-items-center col-xl-2 col-lg-2 col-md-3 col-sm-2 col-2">
              <Link className="col-xl-8 col-lg-9 col-md-8 col-sm-8 col-7" to={"/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+"/route"}>
                <h3 />
              </Link>
              <div onClick={this.toggleModalCountry} style={{visibility: this.props.storeState.countries.length>0 ? 'visible' : 'hidden'}} className="headerGeoButton col-xl-5 col-lg-5 col-md-4 col-sm-5 col-5">
                <span>{this.props.storeState.country}</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end col-xl-6 col-lg-7 col-md-8 col-sm-6 col-6">
              <div className="headerButtonMass d-flex align-self-stretch justify-content-end col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
                {
                  buttonMassElements.map((element, index) =>
                    <Link to={"/"+this.props.storeState.country+"-"+cookies.get('userLangISO',{path:"/"})+element.to} className="buttonMassLink align-self-stretch">{element.value}</Link>
                  )
                }
              </div>
              <div className="headerSelect d-flex align-items-center justify-content-end col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownOpen} className={currencies.length > 0 ? "selectGeneral" : "selectGeneral preloadHiddenBlock"}>
                  <DropdownToggle className="selectGeneralButton" caret size="sm">
                    {/*this.state.activeCurrency[this.state.activeCurrencyNumber]*/ currencies.length > 0 ? currencies[this.props.storeState.activeCurrencyNumber/*this.state.activeCurrencyNumber*/].symbol + " " + currencies[this.props.storeState.activeCurrencyNumber/*this.state.activeCurrencyNumber*/].ISO : ''}
                  </DropdownToggle>
                  <DropdownMenu className="dropdownMenu currenty" >
                    {
                      currencies.map((element, index) =>
                        <DropdownItem className="dropdownMenu" onClick={() => { this.setLocals('userCurr', index) }}>{element.symbol + " " + element.ISO}</DropdownItem>
                      )
                    }
                  </DropdownMenu>
                </Dropdown>
                {
                  this.props.storeState.isSecondLanguageGroupPart ? 


                  <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownLanguageOpen} toggle={this.toggleLanguage} className={adminLanguages.length > 0 ? "selectGeneral" : "selectGeneral preloadHiddenBlock"}>
                    <DropdownToggle className="selectGeneralButton" caret size="sm">
                      <img src={adminLanguages.length > 0 ? requests.serverAddress + adminLanguages[this.props.storeState.activeLanguageNumberAdmin/*this.state.activLanguageNumber*/].icon.url : ''} height="15px" width="15px" alt="flag" />
                      {adminLanguages.length > 0 ? adminLanguages[this.props.storeState.activeLanguageNumberAdmin/*this.state.activLanguageNumber*/].ISO : ''}
                    </DropdownToggle>
                    <DropdownMenu className="dropdownMenu">
                      {
                        adminLanguages.map((element, index) =>
                          <DropdownItem className="dropdownMenu" onClick={() => {  this.setLocals('adminLang', index) }}>
                            <img src={requests.serverAddress + element.icon.url} height="15px" width="15px" alt="RU" />{element.ISO}
                          </DropdownItem>
                        )
                      }
                    </DropdownMenu>
                  </Dropdown>


                  :

                  
                  <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownLanguageOpen} toggle={this.toggleLanguage} className={languages.length > 0 ? "selectGeneral" : "selectGeneral preloadHiddenBlock"}>
                    <DropdownToggle className="selectGeneralButton" caret size="sm">
                      <img src={languages.length > 0 ? requests.serverAddress + languages[this.props.storeState.activeLanguageNumber/*this.state.activLanguageNumber*/].icon.url : ''} height="15px" width="15px" alt="flag" />
                      {languages.length > 0 ? languages[this.props.storeState.activeLanguageNumber/*this.state.activLanguageNumber*/].ISO : ''}
                    </DropdownToggle>
                    <DropdownMenu className="dropdownMenu">
                      {
                        languages.map((element, index) =>
                          <DropdownItem className="dropdownMenu" onClick={() => { this.setLocals('userLang', index) }}>
                            <img src={requests.serverAddress + element.icon.url} height="15px" width="15px" alt="RU" />{element.ISO}
                          </DropdownItem>
                        )
                      }
                    </DropdownMenu>
                  </Dropdown>


                }
              
              </div>
              <div className="headerRegistration d-flex justify-content-start col-xl-1 col-lg-1 col-md-2 col-sm-1 col-1">
                <span style={{ display: this.props.storeState.isAuthorized ? 'none' : 'block' }} onClick={this.toggleModalRegistration}>{textInfo.burgerMenu.enter}</span>
                <div style={{ display: this.props.storeState.isAuthorized ? 'flex' : 'none' }} className="openMenu position-relative align-items-center">
                  <div className="avatar" style={{ background: 'url(' + this.props.storeState.avatarUrl + ') no-repeat' }}></div>
                  <i className="openDropDownMenuBt"></i>
                  <div className="hederMenu">
                    <span onClick={() => { this.accountRedirect("/profile", 1) }}>{textInfo.burgerMenu.profile}</span>
                    <span /*className="blockedSpan"*/ onClick={() => { this.accountRedirect("/trips", 0) }}>{textInfo.burgerMenu.trips}</span>
                    <span onClick={() => { this.accountRedirect("/settings", 6) }}>{textInfo.burgerMenu.settings}</span>
                    <span onClick={() => { this.accountRedirect("/referrals", 8) }}>{textInfo.burgerMenu.partnership}</span>
                    <span onClick={this.logOffFunc}>{textInfo.burgerMenu.exit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const Header = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
    globalReduser: state.GlobalReduser,
  }),
)(HeaderClass);

export default Header;
