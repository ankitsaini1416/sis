import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import EditCourse from '../../components/sis/programs/courses/EditCourse'
import { messageAction } from './../../actions/app.action'
import {
  editCourseCall,
  fetchCourseByIdCall,
  fetchInstructors,
  uploadCourseLogoCall,
} from './../../actions/courses.action'
import { fetchSubjectsCall } from './../../actions/subject.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { get, isEmpty } from './../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

let districtListTimer = null

function EditCourseContainer({
  headerAction,
  editCourseCall,
  fetchCourseByIdCall,
  uploadCourseLogoCall,
  fetchSubjectsCall,
  messageAction,
  fetchInstructors,
}) {
  const { courseId } = useParams()
  const history = useHistory()
  const [course, setCourse] = useState({})
  const [schools, setSchools] = useState([])
  const [subjects, setSubjects] = useState([])
  const [instructors, setInstructors] = React.useState([])
  const updateCourse = (id, values, { setErrors }) => {
    editCourseCall(
      id,
      values,
      () => {
        history.goBack()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorEditCourseGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorEditCourseGeneral',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }
  const editLogo = (file) => {
    uploadCourseLogoCall(
      course.id,
      file,
      () => {},
      (err) => {
        const error = get(err, 'response.data.field_errors', {})
        const splitted = error?.cr_logo[0].split(':')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(splitted[0], 'error:editLogo'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:editLogo',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const fetchSubjects = function (schoolId) {
    fetchSubjectsCall(
      {
        q: '',
        current_page: 1,
        per_page: 1000,
        isActive: 'active',
        schoolId: schoolId,
      },
      ({ content }) => {
        setSubjects(content)
      }
    )
  }

  const getInstructors = function (data) {
    const filterData = {
      districtId: data.cr_school.sch_district.dst_district_public_id,
      schoolId: data.cr_school.sch_school_public_id,
    }
    fetchInstructors(filterData, (data) => {
      setInstructors(data)
    })
  }

  useEffect(() => {
    return () => {
      clearTimeout(districtListTimer)
    }
  })
  useEffect(() => {
    const headerData = {
      activeMenuItem: 'allCourses',
      activeParent: 'programs',
    }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    fetchCourseByIdCall(courseId, (data) => {
      setSchools([data.cr_school])
      fetchSubjects(data.cr_school_id)
      getInstructors(data)
      setCourse(data)
    })
  }, [])

  /**
   * renders JSX of Edit Course container component
   * @param user
   */
  return (
    <EditCourse
      course={course}
      updateCourse={updateCourse}
      editLogo={editLogo}
      schools={schools}
      subjects={subjects}
      instructors={instructors}
    />
  )
}

EditCourseContainer.propTypes = {
  headerAction: PropTypes.func,
  editCourseCall: PropTypes.func,
  fetchCourseByIdCall: PropTypes.func,
  uploadCourseLogoCall: PropTypes.func,
  fetchSubjectsCall: PropTypes.func,
  messageAction: PropTypes.func,
  fetchInstructors: PropTypes.func,
}

EditCourseContainer.defaultProps = {
  headerAction: () => {},
  editCourseCall: () => {},
  fetchCourseByIdCall: () => {},
  uploadCourseLogoCall: () => {},
  fetchSubjectsCall: () => {},
  messageAction: () => {},
  fetchInstructors: () => {},
}

const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  editCourseCall,
  messageAction,
  fetchCourseByIdCall,
  uploadCourseLogoCall,
  fetchSubjectsCall,
  fetchInstructors,
})(EditCourseContainer)
