import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import { Route, Redirect } from 'react-router-dom';
import requests from '../../config';
import getUserData from '../driverProfileRegistration/DriverProfileRequest';

import { modalCountryDispatch } from '../../redusers/Action'
import { setActiveCurr } from '../../redusers/Action';

import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'
import DriverProfileRegistration from '../driverProfileRegistration/DriverProfileRegistration';
import UserProfileRegistration from '../UserProfile/UserProfileRegistration';
import AgencyProfile from '../AgencyProfile/AgencyProfile';

import backpackIcon from '../media/backpack.svg'
import dealIcon from '../media/deal.svg'
import wheelIcon from '../media/wheel.svg'
import { isMobileOnly, isMobile } from 'react-device-detect';
import Dialog from 'material-ui/Dialog';
import Header from '../header/Header';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
const ModalUserType = (props) => {
  function sendUserType(that) {
    let jwt = that.props.globalReduser.readCookie('jwt');
    if (jwt && jwt !== "-") {
      that.setState({
        isWaiting: true,
        isUsertypeLooking: false
      });
      startRefresherGlobal(that)
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
            let addressArray = ['', '/user', '/driver', '/agency'];
            //that.accountRedirect(that.state.savedAddress, that.state.savedNumber);
            let newPath = '/account' + addressArray[that.state.selectedUserType] + '/profile';
            that.props.history.push(newPath);
            that.props.dispatch(setProfileData({}))
            getProfileData(that);
            thenFuncGlobal(that)
          }
        })
        .catch(function (error) {
          catchFuncGlobal(that)
          console.log("bad");
          console.log('An error occurred:', error);
          //that.catchFunc();
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
              <br />
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
function getProfileData(that) {
  
  let jwt = that.props.globalReduser.readCookie('jwt');
  if (jwt && jwt !== '-') {
    debugger
    startRefresherGlobal(that)
    let requestValues = {
      readCookie: that.props.globalReduser.readCookie,
      setProfileData: function (data) {
        that.props.dispatch(setProfileData(data))
      },
      requestAddress: requests.profileRequest
    }
    getUserData(requestValues,thenFuncGlobal,catchFuncGlobal,that);
  }
  else {
    that.props.dispatch(setUrlAddress(window.location.pathname));
    that.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
    //return null;
  }
}
class AccountRedirectorClass extends React.Component {
  constructor(props) {
    super(props);

    const that = this;

    this.state = {
      selectedUserCountry: '',
      selectedUserType: 0
    }
    getProfileData(that);
  }

  render() {
    let helmet = this.props.storeState.languageTextMain.helmets.accountRedirector;

    function parseLocationPathname(pathname, profile) {
      let splitedString = pathname.split('/');

      if (profile.isCustomer) {
        address = 'user';
        if (splitedString[2] === 'user') {
          return true
        }
        else {
          correctedPath += '/user/profile';
          return false;
        }
      }
      if (profile.isDriver) {
        address = 'driver';
        if (splitedString[2] === 'driver') {
          return true
        }
        else {
          correctedPath += '/driver/profile';
          return false;
        }
      }
      if (profile.isAgency) {
        address = 'agency';
        if (splitedString[2] === 'agency') {
          return true
        }
        else {
          correctedPath += '/agency/profile';
          return false;
        }
      }
      return false;
    }


    let profile = this.props.globalReduser.profile;
    let pathname = this.props.history.location.pathname;
    let address;
    let textInfoMain = this.props.storeState.languageTextMain.header;
    let textInfoAdmin = this.props.storeState.languageText.header;
    let isAdmin = this.props.storeState.isSecondLanguageGroupPart;
    let textInfo = isAdmin ? textInfoAdmin : textInfoMain;
    let pageTextInfo = this.props.storeState.languageTextMain.renderModalRegistration;
    let correctedPath = '/account';//изменённый адрес для аутистов
    //
    if (!profile.email) {
      return (
        <>
        </>
      )
    }
    else {

      let selected = false;

      let parseLocationPathnameResult = parseLocationPathname(pathname, profile);

      if (parseLocationPathnameResult) {
        
        let country = this.props.globalReduser.findCountryById(profile.country, this.props.storeState.countries);
        if(country && this.props.storeState.country!==country.ISO){
          this.props.globalReduser.changeActiveCountry(country, (ISO, isoMap)=>this.props.dispatch(modalCountryDispatch(ISO,isoMap)),
          cookies, this.props.storeState.currencies,
          (currencyIndex) => this.props.dispatch(setActiveCurr(currencyIndex)));
        }
     
        return (
          <>
            <Helmet>
              <title>{helmet.object.title}</title>
              <meta name="description" content={helmet.object.description} />
              <meta property="og:site_name" content="Tripfer" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content={document.URL} /* тут надо подумать, может вообще перенести это внутрь каждого типа */ />
              <meta property="og:title" content={helmet.object.title} />
              <meta property="og:description" content={helmet.object.description} />
            </Helmet>

            <Route path="/account/driver" component={DriverProfileRegistration} />
            <Route path="/account/user" component={UserProfileRegistration} />
            <Route path="/account/agency" component={AgencyProfile} />
            
          </>
        )
      }
      else {
        if (!(profile.isAgency) && !(profile.isCustomer) && !(profile.isDriver)) {
          let windowImg = null
          if (this.props.storeState.languages.length > 0) {

            let coockisIso = cookies.get('country', { path: '/' })
            let j;
            for (let i = 0; i < this.props.storeState.countries.length; i++) {
              if (this.props.storeState.countries[i].ISO === coockisIso) {
                j = i
                break;
              }
            }
            if (coockisIso === undefined) {
              j = 1
            }
            windowImg = requests.serverAddressImg + this.props.storeState.countries[j].windowImg.url
          }
          return (
            <>
              <ModalUserType textInfo={textInfo} isOpen={true} that={this} pageTextInfo={pageTextInfo} />
              <div className="forgotPasswordBody d-flex flex-column align-items-center" style={{ background: "url(" + windowImg + ")no-repeat" }}>
                <Header history={this.props.history} />
              </div>
            </>
          )
        }
        else {
          let newPath = correctedPath;
          this.props.history.push(newPath);
          return null;
        }

      }

    }
    //if everything is bad! If it entered here there is a problem!
    this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes');
    return null;
  }
}

const AccountRedirector = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalReduser: state.GlobalReduser,
  }),
)(AccountRedirectorClass);

export default AccountRedirector;