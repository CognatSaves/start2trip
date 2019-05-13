import axios from 'axios';

function getUserData (requestValues,thenFunc,params){
  //debugger;
  let jwt = requestValues.readCookie('jwt');
  
  if(jwt && jwt!=="-"){    
    axios.get(requestValues.requestAddress+'?ISO=RUS&countryISO=IRO', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response =>{
      console.log('get answer');
      console.log(response.data);
      requestValues.setProfileData(response.data);
      if(thenFunc){
        thenFunc(params);
      }        
    })
    .catch(error => {
      console.log('error, here must be return to authorization window! or smth else');
    })
  }
  return 0;
}

export default getUserData;