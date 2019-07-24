import {ADD_COMMENT, SET_COMMENT_VALUE} from './ActionComments';
/*import { EditorBorderAll } from 'material-ui/svg-icons';*/

const initialState = {
    commentValue: 0,
       
};


export const CommentReduser = (state = initialState, action) => {
    switch (action.type){
        case ADD_COMMENT:{
            let newState = { ...state };
            newState.comments[newState.comments.length] = action.comment;
            return newState;
        }
        case SET_COMMENT_VALUE:{
            let newState = {...state};
            newState.commentValue=action.commentValue;
            return newState;
        }   
    default: return state;
    }
}