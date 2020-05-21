import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action){
 switch(action.type) {
     case types.CREATE_COURSE:
        //  whatever is returned becomes the new reducer
        return [...state, {...action.course}];
    case types.LOAD_COURSE_SUCCESS:
        return action.courses;
     default:
         return state;
 }
}