import serverAddress from './serverAddress';
const serverRegistrationRequest = serverAddress+'/auth/local/register';
const serverAuthorizationRequest = serverAddress+'/auth/local';
const facebookRequest = serverAddress+'/connect/facebook';
const googleRequest = serverAddress+'/connect/google';
const meRequest = serverAddress+'/users/me/auth';
const profileRequest = serverAddress+'/users/me/profile';
const profileUpdateRequest = serverAddress+"/users/me/update";
const travelsettingsUpdateRequest = serverAddress + '/users/me/travelsetings';
export default {serverAddress: serverAddress, serverRegistrationRequest: serverRegistrationRequest, facebookRequest: facebookRequest,
     googleRequest: googleRequest, serverAuthorizationRequest: serverAuthorizationRequest, meRequest: meRequest, 
     profileRequest:profileRequest, profileUpdateRequest: profileUpdateRequest, travelsettingsUpdateRequest: travelsettingsUpdateRequest};