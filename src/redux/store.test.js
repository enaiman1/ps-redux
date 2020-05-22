import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

instanceof("should handle creating course", function(){
    // arrange
    const store = create(rootReducer, intialState);
    const course = {
        title: "Clean Code"
    };

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    const createdCourse = store.getState().course[0];
    expect(createdCourse).toEqual(course)
})