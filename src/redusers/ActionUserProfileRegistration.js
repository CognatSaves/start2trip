const WHICH_PAGE_RENDER_USER = 'WHICH_PAGE_RENDER_USER';




const whichPageRenderUser = function(pageRender) {
    return {
        type: 'WHICH_PAGE_RENDER_USER',
        pageRender: pageRender,
    };
}


export {
    whichPageRenderUser,
    WHICH_PAGE_RENDER_USER,
}