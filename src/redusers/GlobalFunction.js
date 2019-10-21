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
  let props = that.props
  
  if(props === undefined){
    that.dispatch(startRefresher(isNeedRefreshIndicator))
  }else{
      that.props.dispatch(startRefresher(isNeedRefreshIndicator))
  }
  
 
}

const thenFuncGlobal = (that, endFunc) => {
  
  let props = that.props;
  let tempThat;
  if(props === undefined){
    tempThat = that;
  }
  else{
    tempThat = that.props;
  }
  tempThat.dispatch(thenFunc());
  setTimeout(() => {
    tempThat.dispatch(isRefreshExistToFalse());
    if(endFunc){
      endFunc();
    }
  }, 500);
  /*
  if(props === undefined){  
    tempThat.dispatch(thenFunc())
    setTimeout(() => {
      tempThat.dispatch(isRefreshExistToFalse());
      if(endFunc){
        endFunc();
      }
    }, 500);
  }else{
    that.props.dispatch(thenFunc())
    setTimeout(() => {
      tempThat.props.dispatch(isRefreshExistToFalse())
      if(endFunc){
        endFunc();
      }
    }, 500);
  }*/
  
}

const catchFuncGlobal = (that) => {
  
  let props = that.props
  let tempThat;
  if(props === undefined){
    tempThat = that;
  }
  else{
    tempThat = that.props;
  }
  tempThat.dispatch(catchFunc());
  setTimeout(() => {
    tempThat.dispatch(isRefreshExistToFalse())
  }, 500);
  /*
  let props = that.props
  if(props === undefined){
    let tempThat = that
    that.dispatch(catchFunc())
    setTimeout(() => {
      tempThat.dispatch(isRefreshExistToFalse())
    }, 500);
  }else{
    let tempThat = that
    that.props.dispatch(catchFunc())
    setTimeout(() => {
      tempThat.props.dispatch(isRefreshExistToFalse())
    }, 500);
  }
  */
}

export {
  checkBtUp,
  startRefresherGlobal,
  thenFuncGlobal,
  catchFuncGlobal,
}