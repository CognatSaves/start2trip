const WHICH_PAGE_RENDER = 'WHICH_PAGE_RENDER';

const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

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

export {
    whichPageRender,
    WHICH_PAGE_RENDER,
    SET_PROFILE_DATA,setProfileData
}