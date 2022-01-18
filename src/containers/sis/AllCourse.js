import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { headerAction } from '../../actions/header.action'
import localStorageService from '../../api/localStorageService'
import AllCourse from '../../components/sis/programs/courses/AllCourse'
import { TablePageData } from '../../data/TablePageData'
import { selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'
import { messageAction, uiStateAction } from './../../actions/app.action'
import {
  addCourseCall,
  fetchCoursesCall,
  fetchInstructors,
  removeCourseCall,
} from './../../actions/courses.action'
import { fetchDistrictsCall } from './../../actions/district.action'
import { fetchInstituteDistrictsCall } from './../../actions/InstituteDistrict.action'
import { fetchSchoolsCall } from './../../actions/schools.action'
import { fetchSubjectsCall } from './../../actions/subject.action'
import { MESSAGE_SEVERITIES } from './../../helpers/constants'
import { statuses } from './../../helpers/stub'
import { mapFieldErrors, mapGeneralErrors } from './../../helpers/validator'

let districtListTimer = null

const defaultHeadCells = [
  'cr_number',
  'cr_name',
  'cr_school_id',
  'cr_subject_id',
  'created_at',
  'updated_at',
  'cr_is_active',
  'actions',
]
function AllCourseContainer({
  headerAction,
  messageAction,
  addCourseCall,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  fetchSubjectsCall,
  fetchCoursesCall,
  removeCourseCall,
  uiStateAction,
  uiState,
  fetchInstructors,
}) {
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'cr_number',
      label: t('courseCode'),
      isSort: true,
      sortProperty: 'cr_number',
    },
    {
      id: 'cr_name',
      label: t('courseName'),
      isSort: true,
      sortProperty: 'cr_name',
    },
    {
      id: 'cr_school_id',
      label: t('school'),
      isSort: true,
      sortProperty: 'cr_school_id',
    },
    {
      id: 'cr_subject_id',
      label: t('subject'),
      isSort: true,
      sortProperty: 'cr_subject_id',
    },
    {
      id: 'created_at',
      label: t('createdDate'),
      isSort: true,
      sortProperty: 'created_at',
    },
    {
      id: 'updated_at',
      label: t('lastUpdated'),
      isSort: true,
      sortProperty: 'updated_at',
    },
    {
      id: 'cr_is_active',
      label: t('status'),
      isSort: true,
      sortProperty: 'cr_is_active',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '150px',
    },
  ]
  const [initialHeadcells, setInitialHeadcells] = useState(
    !isEmpty(localStorageService.getHeadCellsCourses())
      ? localStorageService.getHeadCellsCourses()
      : defaultHeadCells
  )
  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
    localStorageService.setHeadCellsCourses(headcells)
  }
  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })
  const filterState = React.useRef({
    q: '',
    districtId: '',
    schoolId: '',
    subjectId: '',
    fromDate: '',
    toDate: '',
    isActive: '',
    renderer: uuid(),
  })
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('cr_name')
  const [districts, setDistricts] = useState([])
  const [schools, setSchools] = useState([])
  const [subjects, setSubjects] = useState([])
  const [courses, setCourses] = useState([])
  const [instructors, setInstructors] = React.useState([])
  const districtCode = useRef('')
  const schoolCode = useRef('')
  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  const setFilterValue = function (e) {
    const courseFilter = {
      ...uiState.courseFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      courseFilter.schoolId = ''
    }
    uiStateAction({ courseFilter })
  }

  const onFilterReset = function () {
    setCourses([])
    setSchools([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    schoolCode.current = ''
    uiStateAction({
      courseFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchCourses()
  }

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchCourses()
    }
  }

  const fetchCourses = function () {
    if (!uiState.courseFilter.schoolId) {
      return
    }
    const filterData = {
      ...uiState.courseFilter,
      isActive: uiState.courseFilter.isActive
        ? statuses.find((item) => item.name === uiState.courseFilter.isActive).value
        : '',
      sort_by: orderBy,
      sort_order: order,
    }
    fetchCoursesCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchCourses()
        return
      }
      setCourses(content)
      setPageDetails((previousPageData) => {
        return {
          ...previousPageData,
          last_page: paginationDetail.last_page,
          current_page: paginationDetail.current_page,
          from: paginationDetail.from,
          per_page: paginationDetail.per_page,
          to: paginationDetail.to,
          total: paginationDetail.total,
        }
      })
    })
  }

  const removeCourse = function (id, { callback }) {
    removeCourseCall(
      id,
      () => {
        fetchCourses()
        callback()
      },
      (err) => {
        callback()
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorCourseDelete'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorCourseDelete',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchCourses)
  }

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'allCourses',
      activeParent: 'programs',
    }
    headerAction(headerData)
  }, [])

  const addCourse = (values, { setErrors, callback }) => {
    addCourseCall(
      values,
      () => {
        callback()
        fetchCourses()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')

        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddSchoolGeneral'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddCourse',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const fetchDistricts = function (q) {
    fetchDistrictsCall(
      {
        q,
        per_page: 1000,
        is_active: '',
        current_page: 1,
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }
  const fetchInstituteDistricts = function (q) {
    fetchInstituteDistrictsCall(
      {
        q,
        per_page: 1000,
        is_active: '',
        current_page: 1,
      },
      (records) => {
        setDistricts(get(records, 'content', []))
      },
      null,
      false
    )
  }

  const fetchSchools = function (districtId) {
    if (!districtId) {
      return
    }
    fetchSchoolsCall(
      {
        q: '',
        current_page: 1,
        per_page: 1000,
        isActive: 'active',
        districtId,
      },
      (data) => {
        const { content } = data
        setSchools(content)
      },
      null,
      false
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

  const getInstructors = function (values) {
    const filterData = {
      districtId: districts.find((item) => item.dst_id === values.sch_dst_id)
        ?.dst_district_public_id,
      schoolId: schools.find((item) => item.sch_id === values.cr_school_id)?.sch_school_public_id,
    }
    fetchInstructors(
      filterData,
      (data) => {
        setInstructors(data)
      },
      () => {}
    )
  }

  useEffect(() => {
    return () => {
      clearTimeout(districtListTimer)
    }
  })

  useEffect(() => {
    fetchDistricts()
  }, [])
  useEffect(() => {
    fetchInstituteDistricts()
  }, [])

  useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.courseFilter.renderer])

  React.useEffect(() => {
    if (
      uiState.courseFilter.districtId &&
      uiState.courseFilter.districtId !== districtCode.current
    ) {
      fetchSchools(uiState.courseFilter.districtId)
      districtCode.current = uiState.courseFilter.districtId
    } else if (uiState.courseFilter.schoolId !== schoolCode.current) {
      fetchSubjects(uiState.courseFilter.schoolId)
      schoolCode.current = uiState.courseFilter.schoolId
    }
  }, [uiState.courseFilter])

  /**
   * renders JSX of All Course container
   * @param AllCourse
   */
  return (
    <AllCourse
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      onChangePage={onChangePage}
      pageDetails={pageDetails}
      courses={courses}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.courseFilter}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      onSearchEnter={onSearchEnter}
      districts={districts}
      fetchSchools={fetchSchools}
      schools={schools}
      addCourse={addCourse}
      fetchSubjects={fetchSubjects}
      getInstructors={getInstructors}
      subjects={subjects}
      removeCourse={removeCourse}
      fetchCourses={fetchCourses}
      instructors={instructors}
    />
  )
}

AllCourseContainer.propTypes = {
  headerAction: PropTypes.func,
  messageAction: PropTypes.func,
  addCourseCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  fetchSubjectsCall: PropTypes.func,
  fetchCoursesCall: PropTypes.func,
  removeCourseCall: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
  fetchInstructors: PropTypes.func,
}

AllCourseContainer.defaultProps = {
  headerAction: () => {},
  messageAction: () => {},
  addCourseCall: () => {},
  fetchDistrictsCall: () => {},
  fetchInstituteDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  fetchSubjectsCall: () => {},
  fetchCoursesCall: () => {},
  removeCourseCall: () => {},
  uiState: {},
  uiStateAction: () => {},
  fetchInstructors: () => {},
}

const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  messageAction,
  addCourseCall,
  fetchDistrictsCall,
  fetchInstituteDistrictsCall,
  fetchSchoolsCall,
  fetchSubjectsCall,
  fetchCoursesCall,
  removeCourseCall,
  uiStateAction,
  fetchInstructors,
})(AllCourseContainer)
