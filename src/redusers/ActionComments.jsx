const ADD_COMMENT = 'ADD_COMMENT';

const addComment = function (comment){
    return {
        type: 'ADD_COMMENT',
        comment: comment
    }
}

export {
    ADD_COMMENT, addComment
}