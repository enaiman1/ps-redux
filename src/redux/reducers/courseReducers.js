import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function courseReducer(state = initialState.courses, action){
 switch(action.type) {
     case types.CREATE_COURSE_SUCCESS:
        //  whatever is returned becomes the new reducer
        return [...state, {...action.course}];
    case types.UPDATE_COURSE_SUCCESS:
        return state.map(course => course.id === action.course.id ? action.course: course)
    case types.LOAD_COURSE_SUCCESS:
        return action.courses;
     default:
         return state;
 }
}