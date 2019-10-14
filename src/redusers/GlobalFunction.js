import {
  isMobileOnly
} from 'react-device-detect';
import {
  setMorePagesShow
} from '../redusers/ActionPlaces'
import {
  startRefresher,
  thenFunc,
  catchFunc,
  isRefreshExistToFalse
} from '../redusers/Action';

const checkBtUp = (e, that) => {

  let scrollEvent = e.currentTarget.pageYOffset;
  if (isMobileOnly) {
    if (that.state.previousPageYOffset > scrollEvent) {
      document.querySelector(".footerMobile").classList.remove("footerMobile_active");
      if (scrollEvent > 730) {
        document.querySelector(".btUp").classList.add("btUp-active");
      } else {
        if (document.querySelector(".btUp") !== null) {
          document.querySelector(".btUp").classList.remove("btUp-active");
        }
      }
    } else {
      if (document.querySelector(".btUp") !== null) {
        document.querySelector(".btUp").classList.remove("btUp-active");
      }
      if ((document.scrollingElement.offsetHeight - e.currentTarget.top.pageYOffset) < document.scrollingElement.clientHeight + 80) {
        that.props.dispatch(setMorePagesShow());
        // document.querySelector(".footerMobile").classList.remove("footerMobile_active");
      } else {
        // document.querySelector(".footerMobile").classList.add("footerMobile_active");
      }


    }
  } else {
    if ((document.scrollingElement.offsetHeight - e.currentTarget.top.pageYOffset) < document.scrollingElement.clientHeight + 80) {
      that.props.dispatch(setMorePagesShow());

    }
    if (that.state.previousPageYOffset > scrollEvent) {
      if (document.querySelector(".footerButtonUp") !== null) {
        if (scrollEvent > 400) {
          document.querySelector(".footerButtonUp").classList.add("footerButtonUp-active");
        } else {
          document.querySelector(".footerButtonUp").classList.remove("footerButtonUp-active");
        }

      }
    }
  }
  that.setState({
    previousPageYOffset: scrollEvent
  })

}

const startRefresherGlobal = (that,isNeedRefreshIndicator) => {
    debugger
  let props = that.props
  if(props === undefined){
    that.dispatch(startRefresher(isNeedRefreshIndicator))
  }else{
      that.props.dispatch(startRefresher(isNeedRefreshIndicator))
  }
  
 
}

const thenFuncGlobal = (that) => {
  
  let props = that.props
  if(props === undefined){
    let tempThat = that
    that.dispatch(thenFunc())
    setTimeout(() => {
      tempThat.dispatch(isRefreshExistToFalse())
    }, 1000);
  }else{
    let tempThat = that
    that.props.dispatch(thenFunc())
    setTimeout(() => {
      tempThat.props.dispatch(isRefreshExistToFalse())
    }, 1000);
  }
  
}

const catchFuncGlobal = (that) => {

  let props = that.props
  if(props === undefined){
    let tempThat = that
    that.dispatch(catchFunc())
    setTimeout(() => {
      tempThat.dispatch(isRefreshExistToFalse())
    }, 1000);
  }else{
    let tempThat = that
    that.props.dispatch(catchFunc())
    setTimeout(() => {
      tempThat.props.dispatch(isRefreshExistToFalse())
    }, 2000);
  }
}

export {
  checkBtUp,
  startRefresherGlobal,
  thenFuncGlobal,
  catchFuncGlobal,
}