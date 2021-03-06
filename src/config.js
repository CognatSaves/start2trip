const serverAddress = 'https://tripfer.com:8443'; //'http://localhost:1337'; //
const frontendAddress = 'https://tripfer.com'; //'http://localhost:3000'; //
const serverAddressImg = 'https://tripfer.com';//'http://localhost:1337'; //

const serverRegistrationRequest = serverAddress + '/auth/local/register';
const serverAuthorizationRequest = serverAddress + '/auth/local';
const facebookRequest = serverAddress + '/connect/facebook';
const googleRequest = serverAddress + '/connect/google';
const meRequest = serverAddress + '/users/me/auth';
const routeMap = "(blr-en|blr-ru|rus-en|rus-ru|geo-en|geo-ru|arm-en|arm-ru|aze-en|aze-ru|tur-en|tur-ru|isr-en|isr-ru|esp-ru|esp-en)";
const isSuperUser = (userId)=> ("5d8c748f2af67f052213a249"=== userId || "5cc6b6bbab3b7e111009d58e"=== userId 
|| "5d56c865bfa40751352b55c8"=== userId || "5d3015c437976716c39c488d"=== userId
|| "5dca674ebe7a224f4cff4ba0"=== userId || "5dca676ebe7a224f4cff4ba1"=== userId 
|| "5dca6786be7a224f4cff4ba2"=== userId || "5dca67dbbe7a224f4cff4ba3"=== userId
|| "5d654ed89523424ba6a6b333"=== userId || "5dca6617be7a224f4cff4b9f"=== userId )

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
const userTourEditImgRequest = serverAddress +'/tours/me/toursMainImg' // Запрос на изменение фотографии в header тура

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
const changeCommentary = serverAddress + "/changeCommentary"; //изменение комментария
const fakeCommentCreation = serverAddress + "/fakeCommentCreation"; // Создание фейкового пользователя с новым комментарием
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
const errorMessage = serverAddress+'/errorMessage'; // как-бы это небыло странно но нужно выдавать ошибку 404 на странице pageNotFound
const getPromoCode = serverAddress+'/createPromocodeArray'; // Полуение промокодов массивом 
const getDriversList = serverAddress + '/users/getDriversList';//получить список водителей в стране
const showDriverPage = serverAddress + "/users/showDriverPage";//получить описание одного водителя

const transactionStart = serverAddress + "/paymenttransaction/start";//начать оплату пользователем услуг системы
const tripTableData = serverAddress + '/tripTableData';//запрос для списка активных заказов
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
    changeCommentary:changeCommentary,
    fakeCommentCreation:fakeCommentCreation,
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
    showGuide:showGuide,
    userTourEditImgRequest:userTourEditImgRequest,
    errorMessage:errorMessage,
    getPromoCode:getPromoCode,

    getDriversList:getDriversList,
    showDriverPage:showDriverPage,
    isSuperUser:isSuperUser,
    transactionStart:transactionStart,
    tripTableData:tripTableData
};