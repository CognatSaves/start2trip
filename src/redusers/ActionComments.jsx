const ADD_COMMENT = 'ADD_COMMENT';

const SET_COMMENT_VALUE = 'SET_COMMENT_VALUE';

const addComment = function (comment){
    return {
        type: 'ADD_COMMENT',
        comment: comment
    }
}

const setCommentValue = function (commentValue){
    return {
        type: 'SET_COMMENT_VALUE',
        commentValue: commentValue
    }
}
export {
    ADD_COMMENT, addComment,
    SET_COMMENT_VALUE, setCommentValue
}