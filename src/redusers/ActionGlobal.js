const WHICH_PAGE_RENDER_HISTORY = 'WHICH_PAGE_RENDER_HISTORY';




const whichPageRenderHistory = function(history) {
    return {
        type: 'WHICH_PAGE_RENDER_HISTORY',
        history: history,
    };
}


export {
    whichPageRenderHistory,
    WHICH_PAGE_RENDER_HISTORY,

}