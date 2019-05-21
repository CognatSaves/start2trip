const WHICH_PAGE_RENDER_HISTORY = 'WHICH_PAGE_RENDER_HISTORY';

const SET_PROFILE_DATA = 'SET_PROFILE_DATA';



const whichPageRenderHistory = function(history) {
    return {
        type: 'WHICH_PAGE_RENDER_HISTORY',
        history: history,
    };
}
const setProfileData = function(profile) {
    return{
        type: 'SET_PROFILE_DATA',
        profile: profile
    }
}

export {
    whichPageRenderHistory,
    WHICH_PAGE_RENDER_HISTORY,
    SET_PROFILE_DATA,setProfileData,
}