import React from 'react';
import RenderModalRegistration from '../header/RenderModalRegistration';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import './AuthRedirect.css';
import { Url } from 'url';
import { setUrlAddress } from "../../redusers/ActionGlobal"
const ModalRegistration = (props) => {
    let { modalRegistration, toggle, className, authorization } = props;
    return (   
            <Modal isOpen={modalRegistration} toggle={/*toggle*/{}} className={className + " p-0"}>
                
                    <ModalBody>
                        <RenderModalRegistration close={toggle} authorization={authorization} />
                    </ModalBody>
                
            </Modal>
    )
  }
class AuthRedirectClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
        this.authorization=this.authorization.bind(this);
        this.toggle=this.toggle.bind(this);
    }
    authorization(){
        return 0;
    }
    toggle(){//функция завершения работы
        //this.props.globalhistory.history.pop();

        //alert(window.document.referrer);
        debugger;
        let address = this.props.globalReduser.previousUrl;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            //debugger;
            if(address.length===0){
                this.props.history.push('/');
            }
            else{
                let urlAddress = new Url(address);
                this.props.dispatch(setUrlAddress(""));
                

                this.props.history.push(address);
            };
           
            console.log('toggle end');
        }
        else{
            alert('Ошибка! JWT не установлен!');
        }
    }
    render(){
        return(
            <React.Fragment>
                <div style={{position: 'absolute',width: '100%', height: '100%', backgroundColor: 'white', zIndex: '50'}}>
                    <ModalRegistration modalRegistration={/*this.state.modalRegistration*/true} toggle={this.toggle} className={'authRedirect_background'} authorization={this.authorization} />
                </div>
            </React.Fragment>
        )
    }
}
const AuthRedirect = connect(
    (state) => ({
      //storeState: state.AppReduser,
      globalReduser: state.GlobalReduser,
      //globalReduser: state.GlobalReduser,*/
    }),
  )(AuthRedirectClass);
  
  export default AuthRedirect;