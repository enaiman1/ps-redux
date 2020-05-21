import React from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseList from "./CourseList"

class CoursesPage extends React.Component {
componentDidMount(){
    this.props.actions.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
    })
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
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

// this func determines what state is pass to our component via props
function mapStateToProps(state) {
    return {
        courses: state.courses
    }
}

// this will determine what actions are available on props in our component
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}


// the connect function connects out component to redux by returning a function that theb calls our component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)