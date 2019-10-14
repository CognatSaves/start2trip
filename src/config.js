const serverAddress = 'http://localhost:1337'; //'https://tripfer.com:41337'; //
const serverAddressImg = 'http://localhost:1337'; //'https://tripfer.com';//
const frontendAddress = 'http://localhost:3000'; //'https://tripfer.com'; //

const serverRegistrationRequest = serverAddress + '/auth/local/register';
const serverAuthorizationRequest = serverAddress + '/auth/local';
const facebookRequest = serverAddress + '/connect/facebook';
const googleRequest = serverAddress + '/connect/google';
const meRequest = serverAddress + '/users/me/auth';
const routeMap = "(blr-en|blr-ru|rus-en|rus-ru|geo-en|geo-ru|arm-en|arm-ru|aze-en|aze-ru|tur-en|tur-ru|isr-en|isr-ru|esp-ru|esp-en)";

const profileRequest = serverAddress + '/users/me/profile'; //получение данных профиля в админке
const profileUpdateRequest = serverAddress + "/users/me/update"; //сохранение данных профиля(базовых данных - имя и т.д.) в админке
const travelsettingsUpdateRequest = serverAddress + '/users/me/travelsetings'; //запрос для админки 
const userCarsCreateRequest = serverAddress + '/users/me/car'; //запрос для админки 
const userCarDestroyRequest = serverAddress + '/cars/me'; //запрос для админки

const userCarUpdateRequest = serverAddress + '/cars/me'; //запрос для админки
const userCarActivateRequest = serverAddress + '/cars/me/activate'; //запрос для админки
const userAvatarChangeRequest = serverAddress + '/users/me/avatar'; //запрос для админки
const userTourCreateRequest = serverAddress + '/tours/me/create'; //запрос для админки
const userTourDestroyRequest = serverAddress + '/tours/me'; //запрос для админки

const userTourUpdateRequest = serverAddress + '/tours/me'; //запрос для админки
const userTourActivateRequest = serverAddress + '/tours/me/activate'; //запрос для админки
const getLocals = serverAddress + "/getLocals"; //первичный запрос массивов языков и валют
const getDrivers = serverAddress + "/users/findDrivers"; //запрос на водителей для выбранного маршрута
const getDriverData = serverAddress + "/users/getDriverData"; //запрос данных водителя с его машиной

const checkPromocode = serverAddress + "/checkPromocode/"; //запрос на проверку промокода
const createNewTrip = serverAddress + "/createNewTrip"; //запрос на создание новой поездки (без подтверждений)
const customerConfirmation = serverAddress + '/customerConfirmation'; //запрос на подтверждение заказа пользователем
const customerCancel = serverAddress + '/customerCancel'; //запрос на отмену поездки пользователем
const carrierConfirmation = serverAddress + "/carrierConfirmation"; //запрос на подтверждение водителем поездки
const tripStart = serverAddress + "/tripStart"; //функция начала поездки водителем

const tripEnd = serverAddress + "/tripEnd"; //функция окончания поездки водителем
const executeSystemPayment = serverAddress + "/executeSystemPayment"; //выполнить оплату за пользование системой
const getUserTransactions = serverAddress + "/getUserTransactions"; //обновить таблицу транзакций в админке под выбранный пользователем промежуток времени
const getPlacesList = serverAddress + "/getPlaces"; //получить список мест
const showPlace = serverAddress + "/showPlace"; //отобразить одно место подробно

const createComment = serverAddress + "/createComment"; //создание немодерированного комментария
const forgotPassword = serverAddress + "/auth/forgotPassword";
const resetPassword = serverAddress + "/auth/reset-password";
const changeMyDriver = serverAddress + "/users/me/changeDriver";
const getRoutes = serverAddress + "/getRoutes";

const showRoute = serverAddress + "/showRoute";
const getDriverInfo = serverAddress + "/users/getDriverInfo";
const getDriverDescription = serverAddress + "/users/getDriverDescription";
const profileCheck = serverAddress + "/users/me/profileCheck"; //проверка типа аккаунта при первом заходе в админку
const isCommentedTrip = serverAddress + '/isCommentedTrip';

const getTours = serverAddress + '/getTours';//запрос на получения массива туров
const userFeedback = serverAddress + '/users/me/userFeedback';//запрос на отправку отзыва пользователя о работе системы
const showTour = serverAddress + '/showTour';//запрос на получение описания тура для tourDescription
const setTourSeatsData = serverAddress + '/setTourSeatsData';//запрос на установку количества мест для тура по дням

const findGuides = serverAddress + '/users/findGuides';//запрос на получение списка гидов на странице guides
const showGuide = serverAddress + '/users/showGuide';//запрос на получение описания гида на странице /guides/:id -> GuideDescription
export default {
    frontendAddress: frontendAddress,
    serverAddress: serverAddress,
    serverAddressImg: serverAddressImg,
    serverRegistrationRequest: serverRegistrationRequest,
    facebookRequest: facebookRequest,
    googleRequest: googleRequest,

    serverAuthorizationRequest: serverAuthorizationRequest,
    meRequest: meRequest,
    profileRequest: profileRequest,
    profileUpdateRequest: profileUpdateRequest,
    travelsettingsUpdateRequest: travelsettingsUpdateRequest,

    userCarsCreateRequest: userCarsCreateRequest,
    userCarDestroyRequest: userCarDestroyRequest,
    userCarUpdateRequest: userCarUpdateRequest,
    userCarActivateRequest: userCarActivateRequest,
    userAvatarChangeRequest: userAvatarChangeRequest,

    userTourCreateRequest: userTourCreateRequest,
    userTourDestroyRequest: userTourDestroyRequest,
    userTourUpdateRequest: userTourUpdateRequest,
    userTourActivateRequest: userTourActivateRequest,
    getLocals: getLocals,

    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    changeMyDriver: changeMyDriver,
    getDrivers: getDrivers,
    getDriverData: getDriverData,

    checkPromocode: checkPromocode,
    createNewTrip: createNewTrip,
    customerConfirmation: customerConfirmation,
    customerCancel: customerCancel,
    carrierConfirmation: carrierConfirmation,
    tripStart: tripStart,

    tripEnd: tripEnd,
    executeSystemPayment: executeSystemPayment,
    getUserTransactions: getUserTransactions,
    getPlacesList: getPlacesList,
    showPlace: showPlace,

    createComment: createComment,
    getRoutes: getRoutes,
    showRoute: showRoute,
    getDriverDescription: getDriverDescription,
    getDriverInfo: getDriverInfo,

    profileCheck: profileCheck,
    routeMap: routeMap,
    isCommentedTrip: isCommentedTrip,
    getTours: getTours,
    userFeedback: userFeedback,

    showTour:showTour,
    setTourSeatsData:setTourSeatsData,
    findGuides:findGuides,
    showGuide:showGuide
};