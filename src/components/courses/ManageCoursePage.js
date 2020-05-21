import React from 'react'
import { connect } from 'react-redux'
import { loadCourses } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'


class ManageCoursePage extends React.Component {

    componentDidMount() {
        const { courses, authors, loadAuthors, loadCourses } = this.props;

        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            })
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            })
        }
    }


    render() {
        return (
            <>
                <h2>Manage Course</h2>
            </>
        )

    }
}
ManageCoursePage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
}

// this func displays courses and authors..(determines what state is pass to our component via props)
function mapStateToProps(state) {
    return {
        courses: state.courses,
        authors: state.authors
    }
}

// this will determine what actions are available on props in our component
const mapDispatchToProps = {
    loadCourses,
    loadAuthors
}


// the connect function connects out component to redux by returning a function that theb calls our component
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)