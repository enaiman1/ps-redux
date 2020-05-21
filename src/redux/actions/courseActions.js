import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi'

// this function is an action creator
export function createCourse(course){
    // this object returns the action
    return { type: types.CREATE_COURSE, course}
}

// this function does not fire until Authors return from our api call
export function loadCoursesSuccess(courses){
    return { type: types.LOAD_COURSE_SUCCESS, courses }
}


export function loadCourses(){
    return function (dispatch){
        return courseApi.getCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses))
        }).catch(error =>{
            throw error;
        })
    }
}

// export function looks like this because it utlized by thunk middleware..
// Thunk middleware passes dispatch as an argument to our thunk
// Redux thunk injects dispatch so we dont have to