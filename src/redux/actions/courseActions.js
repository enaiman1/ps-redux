import * as types from './actionTypes';

// this function is an action creator
export function createCourse(course){
    // this object returns the action
    return { type: types.CREATE_COURSE, course}
}
