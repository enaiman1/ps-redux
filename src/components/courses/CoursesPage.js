import React from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseList from "./CourseList"


class CoursesPage extends React.Component {
    
    componentDidMount() {
        const {courses, authors, actions } = this.props;

        if(courses.length === 0){
            actions.loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            })
        }
        
        if(authors.length === 0){
        actions.loadAuthors().catch(error => {
            alert("Loading authors failed" + error);
        })
    }
    }


    render() {
        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
            </>
        )

    }
}
CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
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
        authors: state.authors
    }
}

// this will determine what actions are available on props in our component
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    }
}


// the connect function connects out component to redux by returning a function that theb calls our component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)