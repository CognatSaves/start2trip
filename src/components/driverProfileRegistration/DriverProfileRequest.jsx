import axios from 'axios';
import requests from '../../config';
import Cookies from 'universal-cookie';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"

const cookies = new Cookies();

function getUserData(thenFunc, catchFunc,that) {
  let jwt = cookies.get('jwt', { path: "/" });
  let userLang = cookies.get('userLang', { path: "/" });

  if (jwt && jwt !== "-") {

    axios.get(requests.profileRequest + '?ISO=' + userLang, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(response => {

        console.log('get answer');
        that.props.dispatch(setProfileData(response.data))
        if (thenFunc) {
           thenFunc(that)
        }
      })
      .catch(error => {

        if (catchFunc) {
            catchFunc(that)
        }
        console.log('error, here must be return to authorization window! or smth else');
      })
  }else{
    that.props.dispatch(setUrlAddress(window.location.pathname));
    that.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
  }
}

export default getUserData;