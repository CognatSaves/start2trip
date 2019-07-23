const WHICH_PAGE_RENDER_HISTORY = 'WHICH_PAGE_RENDER_HISTORY';

const WHICH_PAGE_RENDER = 'WHICH_PAGE_RENDER';

const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

const SET_URL_ADDRESS = 'SET_URL_ADDRESS';

const SET_TRANSACTION_DATA = 'SET_TRANSACTION_DATA';

const setTransactionData = function(data) {
    return {
        type: 'SET_TRANSACTION_DATA',
        filteredTransactions: data.transactions,
        transactionCardPeriod: data.transactionCardPeriod,
        transactionCashPeriod: data.transactionCashPeriod,
        transactionPartnerPeriod: data.transactionPartnerPeriod
    }
}
const whichPageRenderHistory = function(history) {
    return {
        type: 'WHICH_PAGE_RENDER_HISTORY',
        history: history,
    };
}

const whichPageRender = function(pageRender) {
    return {
        type: 'WHICH_PAGE_RENDER',
        pageRender: pageRender,
    };
}

const setProfileData = function(profile) {
    return {
        type: 'SET_PROFILE_DATA',
        profile: profile
    }
}
const setUrlAddress = function(previousUrl) {
    return {
        type: 'SET_URL_ADDRESS',
        previousUrl: previousUrl
    }
}
export {
    whichPageRender,
    WHICH_PAGE_RENDER,
    whichPageRenderHistory,
    WHICH_PAGE_RENDER_HISTORY,
    SET_PROFILE_DATA,
    setProfileData,
    SET_URL_ADDRESS,
    setUrlAddress,
    SET_TRANSACTION_DATA,
    setTransactionData
}