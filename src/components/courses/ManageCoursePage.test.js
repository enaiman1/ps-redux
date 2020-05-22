import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, courses } from " ../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";

function render(args){
    const defaultProps = { 
        authors,
        courses,
        /* 
        Passed from React Router in real app, so just stubbing in for test.
        could also choose to use MemoryRouter as sshown in Header.test.js,
        oreven wrap with React Router, depedning on whether I need
        to test React Router related behavior
        */

        history:{},
        saveCourse: jest.fn(),
        loadAuthor: jest.fn(),
        loadCourses: jest.fn(),
        course: newCourse,
        match: {}
    };
    const props = { ...defaultProps, ...args }
    //we are using mount for these tests, so we can render the child component too
    return mount(<ManageCoursePage {...props} />)
}

it("set error when attempting to save an empty title field", () => {
    const wrapper = render();
    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("Title is required.");
})

