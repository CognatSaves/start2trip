import React, { Suspense, lazy } from 'react';
import './header_css.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { whichPageRenderHistory, whichPageRender } from "../../redusers/ActionGlobal"
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import {
  setUser, setActiveCurr, setActiveLang, setModalRegister,
  setActiveLangAdmin, modalCountryDispatch
} from '../../redusers/Action';
import { Modal, ModalBody } from 'reactstrap';
import { isMobileOnly, isMobile } from 'react-device-detect';
import requests from '../../config';
import axios from 'axios';
import { checkBtUp } from '../../redusers/GlobalFunction'

// import RenderModalCountry from './RenderModalCountry'
// import { disablePageScroll, clearQueueScrollLocks, enablePageScroll } from 'scroll-lock';
//import pageTextInfo from '../../textInfo/RenderModalRegistration';

import mapWorldIcon from '../media/map.png'
import crossIconModal from '../media/closeGray.svg'
import backpackIcon from '../media/backpack.svg'
import dealIcon from '../media/deal.svg'
import wheelIcon from '../media/wheel.svg'

import HeaderLinkRender from './HeaderLinkRender'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RenderModalRegistration from './RenderModalRegistration'
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, } from '../../redusers/GlobalFunction'
import Dialog from 'material-ui/Dialog';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const RenderModalCountry = lazy(() => import('./RenderModalCountry'));

const ModalRegistration = (props) => {
  let { modalRegistration, toggle, className, authorization } = props;
  return (
    <>

      <Modal isOpen={modalRegistration} toggle={toggle} className={className + " p-0"}>
        <ModalBody>
          <RenderModalRegistration close={toggle} authorization={authorization} />
        </ModalBody>
      </Modal>

    </>
  )
}
const ModalUserType = (props) => {
  function sendUserType(that) {
    let jwt = that.props.globalReduser.readCookie('jwt');
    if (jwt && jwt !== "-") {
      startRefresherGlobal(that, true)
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
            thenFuncGlobal(that)
          }
        })
        .catch(function (error) {
          console.log("bad");
          console.log('An error occurred:', error);
          catchFuncGlobal(that)
        });
    }
    else {
      this.props.dispatch(setUrlAddress(window.location.pathname));
      this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
      //return null;
    }
  }
  function setSelectedUserType(value, that) {
    that.setState({
      selectedUserType: value
    })
  }
  let { isOpen, that, textInfo, pageTextInfo } = props;
  let lang = 0; // подключить мультиязычность!!!
  let massIcon = [backpackIcon, wheelIcon, dealIcon];
  const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
  };
  const customContentStyle2 = {
    maxWidth: '512px',
  };
  if (that.state.selectedUserCountry.length === 0 && that.props.storeState.country.length > 0) {
    that.setState({
      selectedUserCountry: that.props.storeState.country
    })
  }
  let profile = that.props.globalReduser.profile;
  let selectUserTypeVisibility = true;

  if (profile.isDriver || profile.isAgency) {
    selectUserTypeVisibility = false;
    if (that.state.selectedUserType === 0) {
      if (profile.isDriver) {
        setSelectedUserType(2, that);
      }
      if (profile.isAgency) {
        setSelectedUserType(3, that);
      }

    }
  }


  let activeLanguageId = that.props.storeState.languages.length > 0 ? that.props.storeState.languages[that.props.storeState.activeLanguageNumber].id : 'notFound';

  function selectCountryLoc(activeLanguageId, countryEl) {

    for (let i = 0; i < countryEl.locals.length; i++) {
      if (countryEl.locals[i].langId === activeLanguageId) {
        return countryEl.locals[i].name
      }
    }
    return countryEl.locals[1].name
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
            <>
              <span>{textInfo.modalUserType.selectAccountTypeText}</span>
              {
                pageTextInfo.registrationUserType.userTypes.map((element, index) =>
                  <div key={element + index} className={index ? "selectTypeBlockLine selectTypeBlock d-flex align-items-center col-8" : "selectTypeBlock d-flex align-items-center col-8"}
                    onClick={() => { setSelectedUserType(index + 1, that) }} >
                    <i style={{ background: "url(" + massIcon[index] + ") no-repeat" }} />
                    <label className="typeCheckLabel" for={"typeCheckbox" + (index + 1)}>{element.userText}</label>
                    <input className="typeCheckButton" id={"typeCheckbox" + (index + 1)}
                      type="radio" name="raz" checked={index + 1 === that.state.selectedUserType ? true : false} />
                  </div>
                )
              }
            </> : <React.Fragment />
        }
        {
          that.state.selectedUserType > 1 ?
            <>
              {/* TODO Перевод */}
              <span>{"Укажите страну, в которой вы будете работать"}</span>
              <DropDownMenu
                value={that.state.selectedUserCountry}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                onChange={(event, index, value) => {
                  that.setState({
                    selectedUserCountry: value
                  })
                }}
                style={{ width: "100%" }}
                className="dropdownClass"
                autoWidth={false}
                selectedMenuItemStyle={{ color: "#f60" }}
              >
                {
                  that.props.storeState.countries.map((element, index) =>
                    <MenuItem value={element.ISO} primaryText={selectCountryLoc(activeLanguageId, element)} />
                  )
                }
              </DropDownMenu>
            </> : <React.Fragment />
        }
        {
          that.state.selectedUserType > 0 ?
            <button className="selectTypeBt" onClick={() => that.state.selectedUserType === 0 ?
              {} : sendUserType(that)}>{pageTextInfo.registrationUserType.buttonNext}
            </button>
            : <React.Fragment />
        }

      </div>
    </Dialog>

  )
}
const CountrySelect = (props) => {
  let { modalCountry, toggleModalCountry, className, textInfo } = props;
  let renderModal = true;
  if (/prerendercloud/.test(window.navigator.userAgent)) {
    console.log("Chrome headless detected");
    renderModal = false;
  }
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
            {renderModal ?
              <Suspense fallback={<div>{textInfo.loading + '...'}</div>}>
                <RenderModalCountry close={toggleModalCountry} />
              </Suspense>
              :
              <React.Fragment />
            }
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
const BurgerMenuLanguageDropDown = (props) => {
  let { labelValue, dropdownValue, onChange, languageArray } = props;
  return (
    <div className="d-flex align-items-end justify-content-between w-100 border-bottom">
      <label>{labelValue}</label>
      <DropDownMenu anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        className="burgerMenuTopDropDown" menuStyle={{ maxWidth: "93px", overflow: "hidden" }}
        value={dropdownValue/*this.props.storeState.activeLanguageNumberAdmin*/}
        onChange={(event, index, value) => { onChange('adminLang', index)/*this.setLocals('adminLang', index)*/ }}>
        {/*adminLanguages*/languageArray.map((element, index) =>
          <MenuItem value={index} primaryText={
            <>
              <img className="mb-1" src={requests.serverAddressImg + element.icon.url} width="15px" height="15px" alt={element.ISO} />
              <span className="burgerMenuTopDropDownSpan">{element.ISO}
              </span>
            </>} >
          </MenuItem>
        )}
      </DropDownMenu>
    </div>
  )
}
const BasicLanguageDropDown = (props) => {
  let { isOpen, toggle, languages, activeLanguageNumber, onClick } = props;

  return (
    <Dropdown setActiveFromChild="true" isOpen={/*this.state.dropdownLanguageOpen*/isOpen} toggle={/*this.toggleLanguage*/toggle}
      className={languages.length > 0 ? "selectGeneral" : "selectGeneral preloadHiddenBlock"}>
      <DropdownToggle className="selectGeneralButton" caret size="sm">
        <img src={languages.length > 0 ? requests.serverAddressImg + languages[activeLanguageNumber/*this.state.activLanguageNumber*/].icon.url : ''} height="15px" width="15px" alt="flag" />
        {languages.length > 0 ? languages[activeLanguageNumber/*this.props.storeState.activeLanguageNumberAdmin*/].ISO : ''}
      </DropdownToggle>
      <DropdownMenu className="dropdownMenu">
        {
          languages.map((element, index) =>
            <DropdownItem className="dropdownMenu" onClick={() => { onClick(index)/*this.setLocals('adminLang', index)*/ }}>
              <img src={requests.serverAddressImg + element.icon.url} height="15px" width="15px" alt="RU" />{element.ISO}
            </DropdownItem>
          )
        }
      </DropdownMenu>
    </Dropdown>
  )
}
//}

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


      // menuItems: ["Профиль", "Автомобиль", "Настройки поездок", "Туры", "Отзывы", "Настройки", "Биллинг", "Партнерская программа", "Выход"],
      history: props.history,
      isWaiting: false,
      isUsertypeLooking: false,
      selectedUserCountry: '',
      savedAddress: '',
      savedNumber: 0,
      selectedUserType: 0
    };

    window.onscroll = (e) => checkBtUp(e, this);

    //this.getLocals();
  }
  readIsoInUrl = () => {

    let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
    let cookiesIso = cookies.get('country', { path: "/" })
    let cookiesLangISO = cookies.get('userLangISO', { path: "/" })
    let pathnameUrl = this.props.history.location.pathname;
    pathnameUrl = pathnameUrl.split('/');
    pathnameUrl = pathnameUrl[1];
    let pathnameLength = pathnameUrl.split('');

    if (pathnameLength.length === 6) {
      let stringCookies = (cookiesIso + "-" + cookiesLangISO)
      if (stringCookies !== pathnameUrl) {
        pathnameUrl = pathnameUrl.split("-")
        if ((pathnameUrl[0].length === 3) && (pathnameUrl[1].length === 2)) {
          cookies.set('country', pathnameUrl[0], { path: "/", expires: date });
          cookies.set('userLangISO', pathnameUrl[1], { path: '/', expires: date });
          this.props.dispatch(modalCountryDispatch(pathnameUrl[0]))
        }
      }

    }
  }

  setLocals = (type, index, isAdmin) => {

    let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
    thenFuncGlobal(this)
    switch (type) {
      case 'userLang': {
        let that = this;
        function loadScript(url, onload) {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.onload = resolve;
            script.onerror = reject;
            script.src = url;

            if (document.head) {

              //document.getElementById('langScript').remove();
              script.id = 'langScript';
              //document.head.appendChild(script);
              that.props.dispatch(setActiveLang(index));
              cookies.set('userLang', that.props.storeState.languages[index].ISO, { path: '/', expires: date });
              cookies.set('userLangISO', that.props.storeState.languages[index].isoAutocomplete, { path: '/', expires: date });

              let flag = true
              let namePage = that.props.globalhistory.history.location.pathname.split("/");
              if (namePage[1].length === 6) {
                namePage = namePage.splice(2)
                namePage = namePage.join('/')
              } else {
                if (namePage[1] === "en") {
                  namePage = "ru/" + namePage[2]
                } else {
                  namePage = "en/" + namePage[2]
                }
                flag = false
              }

              if (!isAdmin) {
                that.props.history.push((flag ? ("/" + that.props.storeState.country + "-" + that.props.storeState.languages[index].isoAutocomplete + "/") : '/') + (namePage === "" ? "" : (namePage + (flag ? "" : "/"))))
              }

            }
          });
        }
        let string = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBxjEYepkLXhQuXcf_1sUakshHN5Jrozc8&libraries=places&callback=initialize";
        let langString = string + "&language=" + this.props.storeState.languages[index].isoAutocomplete;
        loadScript(langString);

        break;
      }
      case 'adminLang': {

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
          let avatarUrl = requests.serverAddressImg + response.data.url;
          let userName = response.data.firstName;
          let userData = response.data.userData;
          let isCustomer = response.data.isCustomer;
          if (avatarUrl !== this.props.storeState.avatarUrl || userName !== this.props.storeState.userName) {
            let date = new Date(Date.now() + 1000 * 3600 * 24 * 60);
            cookies.set('userName', userName, { path: '/', expires: date });
            cookies.set('avatarUrl', avatarUrl, { path: '/', expires: date });
            cookies.set('userId', userData.userId, { path: '/', expires: date });
            this.props.dispatch(setUser(userName, avatarUrl, userData, isCustomer));
          }

        })
        .catch(error => {
          this.props.dispatch(setUser("", "", {}));
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


        that.props.dispatch(setUser("", "", {}));
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
    this.props.globalhistory.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/');
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
      if (!((profile.isDriver && profile.country) || profile.isCustomer || (profile.isAgency && profile.country))) {
        startRefresherGlobal(that, true)
        axios.get(requests.profileCheck, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
          .then(response => {

            console.log();
            that.props.dispatch(setProfileData(response.data));
            thenFunc(that, address, number);
            thenFuncGlobal(that)
          })
          .catch(error => {
            catchFuncGlobal(that)
            this.props.dispatch(setUser("", "", {}));
          });
      }
      else {
        thenFunc(that, address, number);
      }
    }
    else {
      this.props.dispatch(setUrlAddress(window.location.pathname));
      this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
      //return null;
    }
  }
  render() {
    /*
    function currencyFilter(storeState){
      //эта функция отсекает из массива только те валюты, которые либо являются национальными для страны,
      //либо базовая для системы - на данный момент $
      let res = [];
      if(storeState.currencies.length===0){
        return res;
      }
      
      let nationalCurrency='';
      for(let i=0; i<storeState.countries.length;i++){
        if(storeState.countries[i].ISO===storeState.country){
          nationalCurrency=storeState.countries[i].nationalCurrency;
        }
      }
      for(let i=0; i<storeState.currencies.length;i++){
        if(storeState.currencies[i].id===nationalCurrency){
          res.push(storeState.currencies[i])
        }
        if(storeState.currencies[i].costToDefault===1 && storeState.currencies[i].id!==nationalCurrency){
          res.push(storeState.currencies[i]);
        }
      }
      return res;
    }
    */
    /*
     function changeActiveCurrency(that,availableCurrencies, value){
       //эта функция устанавливает activeCurrencyNumber в соответствие с общим массивом
       //т.е. по номеру в доступных находит номер в общих
       
       let currId = availableCurrencies[value].id;
       let selectedId = that.props.storeState.activeCurrencyNumber;
       for(let i=0;i<that.props.storeState.currencies.length;i++){
         if(currId===that.props.storeState.currencies[i].id){
           selectedId=i;
           break;
         }
       }
       that.setLocals('userCurr', selectedId)
     }
     */
    /*
    function findSelectedCurrency(that,availableCurrencies){
      //по номеру в общих находит номер в доступных валютах
      if(that.props.storeState.currencies.length>0){
        let currId = that.props.storeState.currencies[that.props.storeState.activeCurrencyNumber].id;
        for(let i=0; i<availableCurrencies.length;i++){
          if(availableCurrencies[i].id===currId){
            return i;
          }
        }
      }
      else{
        return 0;
      }
    }*/
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
    let pageTextInfo = this.props.storeState.languageTextMain.renderModalRegistration;
    let buttonMassElements = [
      {
        to: "/",
        value: textInfo.menuElements[0]
      },
      {
        to: "/routes/",
        value: textInfo.menuElements[1]
      },
      {
        to: "/tours/",
        value: textInfo.menuElements[3]
      },
      {
        to: '/guides/',
        value: textInfo.menuElements[4]
      },
      {
        to: "/drivers-page/",
        value: textInfo.menuElements[5]
      },
      {
        to: "/places/",
        value: textInfo.menuElements[2]
      },
    ];

    let availableCurrencies = this.props.globalReduser.currencyFilter(this.props.storeState);
    let selectedCurrNumber = this.props.globalReduser.findSelectedCurrency(this, availableCurrencies);
    return (
      <>

        <ModalRegistration modalRegistration={this.props.storeState.modalRegistration} toggle={this.toggleModalRegistration} className={this.props.className} authorization={this.authorization} />
        <CountrySelect textInfo={textInfo} modalCountry={this.state.modalCountry} toggleModalCountry={this.toggleModalCountry} className={this.props.className} />
        {
          this.state.isWaiting ?
            <React.Fragment />
            : <React.Fragment />
        }

        <ModalUserType textInfo={textInfo} isOpen={this.state.isUsertypeLooking} that={this} pageTextInfo={pageTextInfo} />
        <div style={this.state.burgerMenu ? { position: "fixed", top: "0", zIndex: "40" } : {}} className="headerMobail  d-md-none d-flex align-items-center justify-content-around">
          <Link className="logoSite col-3" to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/"} />
          <div onClick={this.toggleModalCountry} style={{ visibility: this.props.storeState.countries.length > 0 ? 'visible' : 'hidden' }} className={!this.state.burgerMenu ? "headerGeoButton col-lg-5 col-md-4 col-3" : "headerGeoButton col-lg-5 col-md-4 col-6"}>
            <span>{this.props.storeState.country}</span>
          </div>
          {!this.state.burgerMenu && isMobile &&
            <>
              {
                this.props.storeState.isSecondLanguageGroupPart ?
                  <BasicLanguageDropDown isOpen={this.state.dropdownLanguageOpen}
                    toggle={this.toggleLanguage} languages={adminLanguages}
                    activeLanguageNumber={this.props.storeState.activeLanguageNumberAdmin}
                    onClick={(index) => this.setLocals('adminLang', index)}
                  />
                  :
                  <BasicLanguageDropDown isOpen={this.state.dropdownLanguageOpen}
                    toggle={this.toggleLanguage} languages={languages}
                    activeLanguageNumber={this.props.storeState.activeLanguageNumber}
                    onClick={(index) => this.setLocals('userLang', index, this.props.storeState.isAdminLanguageType)}
                  />
              }
            </>
          }
          <div className="headerSelect d-flex align-items-center justify-content-end ">
            <button className={this.state.burgerMenu ? "headerMobailButton-active" : "headerMobailButton"} onClick={() => {
              this.setState({ burgerMenu: !this.state.burgerMenu });
            }}></button>
            <nav className={this.state.burgerMenu ? "burgerMenu burgerMenu-active" : "burgerMenu"}>
              <div className="burgerMenuBg">
                <div className="burgerMenuTop">
                  <text className="col-11 pt-4 pb-2">{textInfo.burgerMenu.titlesName[0]}</text>
                  <div className="burgerMenuBlock burgerMenuP d-flex flex-column justify-content-center align-items-center col-11">
                    {
                      this.props.storeState.isSecondLanguageGroupPart ?
                        <BurgerMenuLanguageDropDown labelValue={textInfo.burgerMenu.settingsDrop[0]}
                          dropdownValue={this.props.storeState.activeLanguageNumberAdmin} onChange={(a, b) => { this.setLocals('adminLang', b) }}
                          languageArray={adminLanguages}
                        />
                        :
                        <BurgerMenuLanguageDropDown labelValue={textInfo.burgerMenu.settingsDrop[0]}
                          dropdownValue={this.props.storeState.activeLanguageNumber} onChange={(a, b) => this.setLocals('userLang', b, this.props.storeState.isAdminLanguageType)}
                          languageArray={languages}
                        />
                    }
                    <div className="d-flex align-items-end justify-content-between w-100 ">
                      <label>{textInfo.burgerMenu.settingsDrop[1]}</label>
                      <DropDownMenu menuItemStyle={{ color: "#304269", fontSize: "14px", fontWeight: "400" }} selectedMenuItemStyle={{ color: "#f60" }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} className="burgerMenuTopDropDown" menuStyle={{ maxWidth: "96px", overflow: "hidden" }}
                        value={selectedCurrNumber} onChange={(event, index, value) => { this.props.globalReduser.changeActiveCurrency(this, availableCurrencies, index, cookies, (selectedId) => this.setLocals('userCurr', selectedId)) /*changeActiveCurrency(this,availableCurrencies,index)*/ }}>
                        {availableCurrencies.map((element, index) =>
                          <MenuItem value={index} primaryText={<span className="pl-2">{element.symbol === element.ISO ? element.ISO : (element.symbol + " " + element.ISO)}</span>} />
                        )}
                      </DropDownMenu>
                    </div>
                  </div>
                  <text className="col-11 pt-4 pb-2">{textInfo.burgerMenu.titlesName[1]}</text>
                  <div className="burgerMenuBlock d-flex flex-column justify-content-center align-items-start col-11 p-0">
                    <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/routes/"} className="border-bottom routes" >{textInfo.burgerMenu.services[0]}</Link>
                    <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/tours/"} className="border-bottom tours" >{textInfo.burgerMenu.services[1]}</Link>
                    <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/places/"} className="border-bottom places" >{textInfo.burgerMenu.services[2]}</Link>
                    <Link to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/guides/"} className="guides" >{textInfo.burgerMenu.services[3]}</Link>
                  </div>

                  <text className="col-11 pt-4 pb-2">{textInfo.burgerMenu.titlesName[2]}</text>
                  <div className="burgerMenuBlock d-flex flex-column justify-content-center align-items-start col-11 p-0">
                    {
                      this.props.storeState.isAuthorized ?
                        <>
                          <span className="border-bottom profile" onClick={() => { this.setState({ burgerMenu: false }); this.accountRedirect("/profile", 1) }}>{textInfo.burgerMenu.profile}</span>
                          <span className="border-bottom blockedSpan timetable" onClick={() => { this.setState({ burgerMenu: false }); this.accountRedirect("/trips", 0) }}>{textInfo.burgerMenu.trips}</span>
                          <span className="border-bottom settingsGears" onClick={() => { this.setState({ burgerMenu: false }); this.accountRedirect("/settings", 6) }}>{textInfo.burgerMenu.settings}</span>
                          {
                            this.props.storeState.userData && this.props.storeState.userData.isAffiliatedDriver ?
                              <React.Fragment /> :
                              <span className="border-bottom saveMoney" onClick={() => { this.setState({ burgerMenu: false }); this.accountRedirect("/referrals", 8) }}>{textInfo.burgerMenu.partnership}</span>
                          }
                          <span className="exit" onClick={() => { this.logOffFunc() }}>{textInfo.burgerMenu.exit}</span>
                        </>
                        :
                        <span className="profile" onClick={this.toggleModalRegistration}>{textInfo.burgerMenu.burgerEnter}</span>
                    }
                  </div>
                  <text className="col-11 pt-4 pb-2">{textInfo.burgerMenu.titlesName[3]}</text>
                  <div className="burgerMenuBlock d-flex flex-column justify-content-center align-items-start col-11 p-0">
                    <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/about-service/"} className="border-bottom logoIcon" >{textInfo.burgerMenu.usefulLinks[0]}</Link>
                    <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/affiliate-program/"} className="border-bottom partner" >{textInfo.burgerMenu.usefulLinks[1]}</Link>
                    <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/terms/"} className="border-bottom contract" >{textInfo.burgerMenu.usefulLinks[2]}</Link>
                    <Link to="" className="border-bottom questionMarkGray" >{textInfo.burgerMenu.usefulLinks[3]}</Link>
                    <Link to={"/" + cookies.get('userLangISO', { path: "/" }) + "/contacts/"} className="phoneBook " >{textInfo.burgerMenu.usefulLinks[4]}</Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="btUp" onClick={() => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }) }}>
          <span>{textInfo.toPageStart}</span>
          <i className="footerMobileIconUp" />
        </div>
        <div className={this.props.driver ? "driverHeader" : "homeHeader"}>
          {/* {this.props.showBtnBack ? <div className="driversGoBack" style={{ display: isMobileOnly ? "flex" : "none" }}>
            <span onClick={() => { if (this.props.history.length > 2) { this.props.history.goBack() } else { this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/') }; }}>Назад</span>
          </div> :
            <React.Fragment />} */}

          <div className='header d-md-flex d-none align-items-stretch justify-content-between'>
            <div className="d-flex align-items-center col-xl-2 col-lg-2 col-md-3 col-sm-2 col-2">
              <Link className="logoSite col-xl-8 col-lg-9 col-md-8 col-sm-8 col-7" to={"/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + "/"} />
              <div onClick={this.toggleModalCountry} style={{ visibility: this.props.storeState.countries.length > 0 ? 'visible' : 'hidden' }} className="headerGeoButton col-xl-5 col-lg-5 col-md-4 col-sm-5 col-5">
                <span>{this.props.storeState.country}</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end col-xl-7 col-lg-9 col-md-8 col-sm-6 col-6">
              <div className="headerButtonMass d-flex align-self-stretch justify-content-end col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 p-0">
                <HeaderLinkRender array={buttonMassElements} history={this.props.history} more={textInfo.burgerMenu.more} />
              </div>
              <div className="headerSelect d-flex align-items-center justify-content-end col-3">
                <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownOpen} className={availableCurrencies.length > 0 ? "selectGeneral" : "selectGeneral preloadHiddenBlock"}>
                  <DropdownToggle className="selectGeneralButton" caret size="sm">
                    {/*this.state.activeCurrency[this.state.activeCurrencyNumber]*/ availableCurrencies.length > 0 ?
                      /*далее я оставил просто currencies, т.к. они и availableCurrencies должны быть взаимосвязаны */
                      (currencies[this.props.storeState.activeCurrencyNumber].symbol === currencies[this.props.storeState.activeCurrencyNumber].ISO ?
                        " " + currencies[this.props.storeState.activeCurrencyNumber].ISO : (currencies[this.props.storeState.activeCurrencyNumber].symbol
                          + " " + currencies[this.props.storeState.activeCurrencyNumber].ISO)) : ''}
                  </DropdownToggle>
                  <DropdownMenu className="dropdownMenu currenty" >
                    {
                      availableCurrencies.map((element, index) =>
                        <DropdownItem className="dropdownMenu" onClick={() => {
                          this.props.globalReduser.changeActiveCurrency(this, availableCurrencies, index, cookies, (selectedId) =>
                            this.setLocals('userCurr', selectedId))/* changeActiveCurrency(this,availableCurrencies,index)*/
                        }}>
                          {element.symbol === element.ISO ? " " + element.ISO : (element.symbol + " " + element.ISO)}
                        </DropdownItem>
                      )
                    }
                  </DropdownMenu>
                </Dropdown>
                {!isMobile &&
                  <>
                    {
                      this.props.storeState.isSecondLanguageGroupPart ?
                        <BasicLanguageDropDown isOpen={this.state.dropdownLanguageOpen}
                          toggle={this.toggleLanguage} languages={adminLanguages}
                          activeLanguageNumber={this.props.storeState.activeLanguageNumberAdmin}
                          onClick={(index) => this.setLocals('adminLang', index)}
                        />
                        :
                        <BasicLanguageDropDown isOpen={this.state.dropdownLanguageOpen}
                          toggle={this.toggleLanguage} languages={languages}
                          activeLanguageNumber={this.props.storeState.activeLanguageNumber}
                          onClick={(index) => this.setLocals('userLang', index, this.props.storeState.isAdminLanguageType)}
                        />
                    }
                  </>
                }
              </div>
              <div className="headerRegistration d-flex justify-content-start col-xl-1 col-lg-1 col-md-2 col-sm-1 col-1">
                <span style={{ display: this.props.storeState.isAuthorized ? 'none' : 'block' }} onClick={this.toggleModalRegistration}>{textInfo.burgerMenu.enter}</span>
                <div style={{ display: this.props.storeState.isAuthorized ? 'flex' : 'none' }} className="openMenu position-relative align-items-center">
                  <div className="avatar" style={{ background: 'url(' + this.props.storeState.avatarUrl + ') no-repeat' }}></div>
                  <i className="openDropDownMenuBt "></i>
                  <div className={'hederMenu ' + ((this.props.storeState.userData && this.props.storeState.userData.isAffiliatedDriver) ? 'shortHeaderMenu' : 'longHeaderMenu')}>
                    <span onClick={() => { this.accountRedirect("/profile", 1) }}>{textInfo.burgerMenu.profile}</span>
                    <span /*className="blockedSpan"*/ onClick={() => { this.accountRedirect("/trips", 0) }}>{textInfo.burgerMenu.trips}</span>
                    <span onClick={() => { this.accountRedirect("/settings", 6) }}>{textInfo.burgerMenu.settings}</span>
                    {
                      this.props.storeState.userData && this.props.storeState.userData.isAffiliatedDriver ?
                        <React.Fragment /> :
                        <span onClick={() => { this.accountRedirect("/referrals", 8) }}>{textInfo.burgerMenu.partnership}</span>
                    }
                    <span onClick={this.logOffFunc}>{textInfo.burgerMenu.exit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
