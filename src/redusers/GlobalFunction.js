import { isMobileOnly } from 'react-device-detect';

 const checkBtUp = (e,that) => {
    
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
        if((document.scrollingElement.offsetHeight-e.currentTarget.top.pageYOffset )< document.scrollingElement.clientHeight+80){
            document.querySelector(".footerMobile").classList.remove("footerMobile_active");
        }else{
            document.querySelector(".footerMobile").classList.add("footerMobile_active");
        }
        
        
      }
    } else {
      if (that.state.previousPageYOffset > scrollEvent) {
        if (document.querySelector(".footerButtonUp") !== null) {
          if (scrollEvent > 400) {
            document.querySelector(".footerButtonUp").classList.add("footerButtonUp-active");
          }
          else {
            document.querySelector(".footerButtonUp").classList.remove("footerButtonUp-active");
          }

        }
      }
    }
    that.setState({ previousPageYOffset: scrollEvent })

  }

  export default checkBtUp