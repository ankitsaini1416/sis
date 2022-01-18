import toNumber from 'lodash/toNumber'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { messageAction, uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import AllSubject from '../../components/sis/programs/subjects/AllSubjects'
import { TablePageData } from '../../data/TablePageData'
import { MESSAGE_SEVERITIES, USEQUERY } from '../../helpers/constants'
import { selectUiState } from '../../helpers/selectors'
import { getQueryData, handleChangePage, isEnter } from '../../helpers/utils'
import { mapFieldErrors, mapGeneralErrors } from '../../helpers/validator'
import { fetchSchoolsCall } from './../../actions/schools.action'
import {
  createSubjectCall,
  deleteSubjectCall,
  fetchSubjectsCall,
} from './../../actions/subject.action'
import { get, isEmpty } from './../../helpers/utils'

const defaultHeadCells = [
  'subject_code',
  'subject_name',
  'created_at',
  'updated_at',
  'status',
  'actions',
]
function AllSubjectContainer({
  headerAction,
  createSubjectCall,
  fetchSubjectsCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
  deleteSubjectCall,
  uiState,
  uiStateAction,
  messageAction,
}) {
  const { t } = useTranslation()
  const [districts, setDistricts] = useState([])
  const [schools, setSchools] = useState([])
  const [initialHeadcells, setInitialHeadcells] = useState(defaultHeadCells)
  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
  }

  const [queryData] = useState(USEQUERY ? getQueryData() : {})
  let [paginationMidState] = useState({
    ...TablePageData,
    current_page: toNumber(queryData.current_page) || TablePageData.current_page,
    per_page: toNumber(queryData.per_page) || TablePageData.per_page,
  })

  const filterState = useRef({
    districtId: '',
    schoolId: '',
    q: '',
    type: '',
    fromDate: '',
    toDate: '',
    renderer: uuid(),
  })

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('sub_name')
  const [subjects, setSubjects] = useState([])
  const districtCode = useRef('')

  const setFilterValue = function (e) {
    const subjectFilter = {
      ...uiState.subjectFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      subjectFilter.schoolId = ''
    }
    uiStateAction({ subjectFilter })
  }

  const fetchSchool = function (districtId) {
    if (!districtId) {
      return
    }
    fetchSchoolsCall(
      {
        q: '',
        current_page: 1,
        per_page: 1000,
        is_active: '',
        districtId: districtId,
      },
      (data) => {
        const { content } = data
        setSchools(content)
      },
      null,
      false
    )
  }

  const onFilterReset = function () {
    setSubjects([])
    setSchools([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      subjectFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchSubjects()
  }

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchSubjects()
    }
  }

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchSubjects)
  }

  const fetchSubjects = function () {
    const filterData = {
      ...uiState.subjectFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchSubjectsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchSubjects()
        return
      }
      setSubjects(content)
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

  const allHeadCells = [
    {
      id: 'subject_code',
      label: t('subjectCode'),
      isSort: true,
      sortProperty: 'sub_code',
    },
    {
      id: 'subject_name',
      label: t('subjectName'),
      isSort: true,
      sortProperty: 'sub_name',
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
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '150px',
    },
  ]

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

  const createSubject = (values, { setErrors, callback }) => {
    createSubjectCall(
      values,
      () => {
        callback()
        fetchSubjects()
      },
      (err) => {
        const errors = get(err, 'response.data.field_errors', {})
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(errors)) {
          setErrors(mapFieldErrors(errors))
        } else if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorAddSubject'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorAddSubject',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  const archiveSubject = function (id, { callback }) {
    deleteSubjectCall(
      id,
      () => {
        fetchSubjects()
        callback()
      },
      (err) => {
        callback()
        const error = get(err, 'response.data.code', '')
        if (!isEmpty(error)) {
          messageAction({
            subTitle: mapGeneralErrors(error, 'error:errorSubjectDelete'),
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        } else {
          messageAction({
            subTitle: 'error:errorSubjectDelete',
            severity: MESSAGE_SEVERITIES.ERROR,
          })
        }
      }
    )
  }

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'allSubjects',
      activeParent: 'programs',
    }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    fetchDistricts()
  }, [])

  useEffect(() => {
    if (
      uiState.subjectFilter.districtId &&
      uiState.subjectFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.subjectFilter.districtId)
      districtCode.current = uiState.subjectFilter.districtId
    }
  }, [uiState.subjectFilter.districtId])

  useEffect(() => {
    if (isEmpty(uiState.subjectFilter)) {
      uiStateAction({ subjectFilter: filterState.current })
    }
  }, [])

  useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.subjectFilter.renderer])

  /**
   * renders JSX of All Course container
   * @param AllCourse
   */

  return (
    <AllSubject
      subjects={subjects}
      schools={schools}
      districts={districts}
      createSubject={createSubject}
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.subjectFilter}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      onSearchEnter={onSearchEnter}
      fetchSchool={fetchSchool}
      archiveSubject={archiveSubject}
    />
  )
}

AllSubjectContainer.propTypes = {
  headerAction: PropTypes.func,
  createSubjectCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  fetchSubjectsCall: PropTypes.func,
  deleteSubjectCall: PropTypes.func,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
  messageAction: PropTypes.func,
}

AllSubjectContainer.defaultProps = {
  headerAction: () => {},
  createSubjectCall: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  fetchSubjectsCall: () => {},
  deleteSubjectCall: () => {},
  uiState: {},
  uiStateAction: () => {},
  messageAction: () => {},
}
const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  createSubjectCall,
  fetchDistrictsCall,
  messageAction,
  fetchSchoolsCall,
  fetchSubjectsCall,
  deleteSubjectCall,
  uiStateAction,
})(AllSubjectContainer)
