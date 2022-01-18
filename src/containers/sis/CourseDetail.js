import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import CourseDetails from '../../components/sis/programs/courses/CourseDetail'
import { TablePageData } from '../../data/TablePageData'
import { handleChangePage } from '../../helpers/utils'
import { fetchCourseByIdCall, fetchCourseProgramsCall } from './../../actions/courses.action'

function CourseDetailsContainer({ headerAction, fetchCourseByIdCall, fetchCourseProgramsCall }) {
  const { courseId } = useParams()
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'programId',
      label: t('programId'),
      isSort: true,
      sortProperty: 'programId',
    },
    {
      id: 'program_name',
      label: t('programName'),
      isSort: true,
      sortProperty: 'program_name',
    },
    {
      id: 'school',
      label: t('school'),
      isSort: true,
      sortProperty: 'school',
    },
    {
      id: 'program_cateogry',
      label: t('programCateogry'),
      isSort: true,
      sortProperty: 'program_cateogry',
    },
    {
      id: 'min_age',
      label: t('minAge'),
      isSort: true,
      sortProperty: 'min_age',
    },
    {
      id: 'transcript_required',
      label: t('transcriptRequired'),
      isSort: true,
      sortProperty: 'transcript_required',
    },
    {
      id: 'assigned_date',
      label: t('assignedDate'),
      isSort: true,
      sortProperty: 'assigned_date',
    },
    { id: 'status', label: t('status'), isSort: true, sortProperty: 'status' },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
    },
  ]

  let [paginationMidState] = useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })
  // eslint-disable-next-line no-unused-vars
  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('sch_id')

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState)
  }
  const [course, setCourse] = useState({})
  const [coursePrograms, setCoursePrograms] = useState([])
  useEffect(() => {
    const headerData = {
      activeMenuItem: 'allCourses',
      activeParent: 'programs',
    }
    headerAction(headerData)
  }, [])
  useEffect(() => {
    fetchCourseByIdCall(courseId, (data) => {
      setCourse(data)
    })
    fetchCourseProgramsCall(
      courseId,
      (data) => {
        setCoursePrograms(data)
      },
      (err) => {
        console.log(err)
      }
    )
  }, [])

  /**
   * renders JSX of Course Detail container
   * @param user
   */
  return (
    <CourseDetails
      coursePrograms={coursePrograms}
      course={course}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      allHeadCells={allHeadCells}
      pageDetails={pageDetails}
    />
  )
}

CourseDetailsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchCourseByIdCall: PropTypes.func,
  fetchCourseProgramsCall: PropTypes.func,
}

CourseDetailsContainer.defaultProps = {
  headerAction: () => {},
  fetchCourseByIdCall: () => {},
  fetchCourseProgramsCall: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchCourseByIdCall,
  fetchCourseProgramsCall,
})(CourseDetailsContainer)
