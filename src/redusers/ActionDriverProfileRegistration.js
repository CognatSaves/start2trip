const WHICH_PAGE_RENDER = 'WHICH_PAGE_RENDER';




const whichPageRender = function(pageRender) {
    return {
        type: 'WHICH_PAGE_RENDER',
        pageRender: pageRender,
    };
}


export {
    whichPageRender,
    WHICH_PAGE_RENDER,
}