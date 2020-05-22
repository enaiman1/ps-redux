import React from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseList from "./CourseList"
import { Redirect } from "react-router-dom";
import Spinner from '../common/Spinner'
import { toast } from 'react-toastify'



class CoursesPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    }

    componentDidMount() {
        const { courses, authors, actions } = this.props;

        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            })
        }

        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Loading authors failed" + error)
            })
        }
    }

    handleDeleteCourse = async course => {
        toast.success("Course deleted");
        try{
            await this.props.actions.deleteCourse(course);
        }catch(error){
            toast.error("Delete failed. " + error.message, {autoClose: false})
        }
    };


    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Courses</h2>
                {this.props.loading ? <Spinner /> : (
                    <>
                        <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-course"
                            onClick={() => this.setState({ redirectToAddCoursePage: true })}
                        >
                            Add Course
                </button>
                        <CourseList courses={this.props.courses} onDeleteClick={this.handleDeleteCourse}/>
                    </>
                )}
            </>
        )

    }
}
CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

// this func displays courses and authors..(determines what state is pass to our component via props)
function mapStateToProps(state) {
    return {
        // pass course on props
        courses:
            // if no author data return empty array
            state.authors.length === 0
                ? []
                // if we do have authors data, map over the array of course
                : state.courses.map(course => {
                    return {
                        // we will enhance that array
                        ...course,
                        // each element in the array will have an extra property
                        // which is being set by finding the corosponding author it author id
                        authorName: state.authors.find(a => a.id === course.authorId).name
                    }
                }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    }
}

// this will determine what actions are available on props in our component
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
        }
    }
}


// the connect function connects out component to redux by returning a function that theb calls our component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)