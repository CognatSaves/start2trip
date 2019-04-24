const serverAddress = 'http://localhost:1337';
const serverRegistrationRequest = serverAddress+'/auth/local/register';
const serverAuthorizationRequest = serverAddress+'/auth/local';
const facebookRequest = serverAddress+'/connect/facebook';
const googleRequest = serverAddress+'/connect/google';
const meRequest = serverAddress+'/users/me';

export default {serverAddress: serverAddress, serverRegistrationRequest: serverRegistrationRequest, facebookRequest: facebookRequest,
     googleRequest: googleRequest, serverAuthorizationRequest: serverAuthorizationRequest, meRequest: meRequest};