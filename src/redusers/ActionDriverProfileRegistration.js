const WHICH_PAGE_RENDER = 'WHICH_PAGE_RENDER';

const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

const SET_REFRESH_STATE = 'SET_REFRESH_STATE';


const whichPageRender = function(pageRender) {
    return {
        type: 'WHICH_PAGE_RENDER',
        pageRender: pageRender,
    };
}
const setProfileData = function(profile) {
    return{
        type: 'SET_PROFILE_DATA',
        profile: profile
    }
}
const setRefreshState = function(values){
    /*let result = {
        type: 'SET_REFRESH_STATE'
    };
    if(values.isRefreshExist){
        result.isRefreshExist = values.isRefreshExist;
    }
    if(values.isRefreshing){
        result.isRefreshing = values.isRefreshing;
    }
    if(result.isGoodAnswer){
        result.isGoodAnswer = values.isGoodAnswer;
    }
    return result;*/
}
export {
    whichPageRender,
    WHICH_PAGE_RENDER,
    SET_PROFILE_DATA,setProfileData,
    SET_REFRESH_STATE,setRefreshState
}