import serverAddress from './serverAddress';
const serverRegistrationRequest = serverAddress+'/auth/local/register';
const serverAuthorizationRequest = serverAddress+'/auth/local';
const facebookRequest = serverAddress+'/connect/facebook';
const googleRequest = serverAddress+'/connect/google';
const meRequest = serverAddress+'/users/me/auth';
const profileRequest = serverAddress+'/users/me/profile';
const profileUpdateRequest = serverAddress+"/users/me/update";
const travelsettingsUpdateRequest = serverAddress + '/users/me/travelsetings';//запрос для админки 
const userCarsCreateRequest = serverAddress + '/users/me/car';//запрос для админки 
const userCarDestroyRequest = serverAddress + '/cars/me';//запрос для админки
const userCarUpdateRequest = serverAddress + '/cars/me';//запрос для админки
const userCarActivateRequest = serverAddress + '/cars/me/activate';//запрос для админки
const userAvatarChangeRequest = serverAddress + '/users/me/avatar';//запрос для админки
const userTourCreateRequest = serverAddress + '/tours/me/create';//запрос для админки
const userTourDestroyRequest = serverAddress + '/tours/me';//запрос для админки
const userTourUpdateRequest = serverAddress + '/tours/me';//запрос для админки
const userTourActivateRequest = serverAddress + '/tours/me/activate';//запрос для админки
export default {serverAddress: serverAddress, serverRegistrationRequest: serverRegistrationRequest, facebookRequest: facebookRequest,
     googleRequest: googleRequest, serverAuthorizationRequest: serverAuthorizationRequest, meRequest: meRequest, 
     profileRequest:profileRequest, profileUpdateRequest: profileUpdateRequest, travelsettingsUpdateRequest: travelsettingsUpdateRequest,
     userCarsCreateRequest: userCarsCreateRequest,userCarDestroyRequest:userCarDestroyRequest,
     userCarUpdateRequest: userCarUpdateRequest, userCarActivateRequest:userCarActivateRequest,
     userAvatarChangeRequest:userAvatarChangeRequest, userTourCreateRequest:userTourCreateRequest,
     userTourDestroyRequest:userTourDestroyRequest, userTourUpdateRequest: userTourUpdateRequest,
     userTourActivateRequest:userTourActivateRequest};