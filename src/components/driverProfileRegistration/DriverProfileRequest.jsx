import axios from 'axios';
import requests from '../../config';

function getUserData(requestValues, thenFunc, catchFunc, params) {
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
          if (params && params.thenFunc) {
            setTimeout(() => {
              thenFunc(params.thenFunc);
            }, 700)
          }
          else {
            setTimeout(() => {
              thenFunc();
            }, 700)
          }
        }
      })
      .catch(error => {

        if (catchFunc) {
          if (params && params.catchFunc) {
            catchFunc(params.catchFunc)
          }
          else {
            catchFunc();
          }
        }
        console.log('error, here must be return to authorization window! or smth else');
      })
  }
}

export default getUserData;