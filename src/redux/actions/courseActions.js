import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi'
import { beginApiCall, apiCallError } from './apiStatusActions'


// this function does not fire until Authors return from our api call
export function loadCoursesSuccess(courses){
    return { type: types.LOAD_COURSE_SUCCESS, courses }
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course}
}
export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course}
}




// export function looks like this because it utlized by thunk middleware..
// Thunk middleware passes dispatch as an argument to our thunk
// Redux thunk injects dispatch so we dont have to
export function loadCourses(){
    return function (dispatch){
        dispatch(beginApiCall())
        return courseApi.getCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses))
        }).catch(error =>{
            dispatch(apiCallError(error))
            throw error;
        })
    }
}

export function saveCourse(course){
    return function(dispatch, getState) {
        dispatch(beginApiCall())
        return courseApi
        .saveCourse(course)
        .then(savedCourse => {
            course.id
            ? dispatch(updateCourseSuccess(savedCourse))
            : dispatch(createCourseSuccess(savedCourse))
        }).catch(error => {
            dispatch(apiCallError(error))
            throw error;
        })
    }
}

