import axios from 'axios';
import requests from '../../config';

function getUserData(requestValues, thenFunc, catchFunc,that) {
  let jwt = requestValues.readCookie('jwt');
  let userLang = requestValues.readCookie('userLang');
  let country = requestValues.readCookie('country')
  if (jwt && jwt !== "-") {

    axios.get(requestValues.requestAddress + '?ISO=' + userLang/*+'&countryISO='+country*/, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(response => {

        console.log('get answer');
        requestValues.setProfileData(response.data);

        if (thenFunc) {
          // thenFunc(that)
        }
      })
      .catch(error => {

        if (catchFunc) {
            catchFunc()
        }
        console.log('error, here must be return to authorization window! or smth else');
      })
  }
}

export default getUserData;