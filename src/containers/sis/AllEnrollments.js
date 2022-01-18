import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { fetchEnrollmentCall } from '../../actions/enrollment.action'
import { headerAction } from '../../actions/header.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import AllEnrollments from '../../components/sis/enrollment/AllEnrollments'
import { TablePageData } from '../../data/TablePageData'
import { selectMasterData, selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'
const defaultHeadCells = [
  'enrollment_Id',
  'student_Id',
  'student_Name',
  'student_Age',
  'student_Gender',
  'program_ID',
  'program_Name',
  'date_Enrollment',
  'success_Coach_Status',
  'enrollment_status',
  'actions',
]

function AllEnrollmentContainer({
  headerAction,
  masterData,
  fetchSchoolsCall,
  fetchDistrictsCall,
  fetchEnrollmentCall,
  uiStateAction,
  uiState,
}) {
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'enrollment_Id',
      label: t('enrollmentId'),
      isSort: true,
      sortProperty: 'enr_id',
    },
    {
      id: 'student_Id',
      label: t('studentId'),
      isSort: true,
      sortProperty: 'public_id',
    },
    {
      id: 'student_Name',
      label: t('studentName'),
      isSort: true,
      sortProperty: 'firstName',
    },
    {
      id: 'student_Age',
      label: t('studentAge'),
      isSort: true,
      sortProperty: 'birthday',
    },
    {
      id: 'student_Gender',
      label: t('studentGender'),
      isSort: true,
      sortProperty: 'gender',
    },
    {
      id: 'program_ID',
      label: t('programID'),
      isSort: true,
      sortProperty: 'enr_program_id',
    },
    {
      id: 'program_Name',
      label: t('programName'),
      isSort: false,
      sortProperty: 'enr_program_name',
    },
    {
      id: 'date_Enrollment',
      label: t('dateEnrollment'),
      isSort: true,
      sortProperty: 'enr_enrolled_on',
    },
    {
      id: 'success_Coach_Status',
      label: t('successCoachStatus'),
      isSort: true,
      sortProperty: 'enr_success_coach',
    },
    {
      id: 'enrollment_status',
      label: t('enrollmentStatus'),
      isSort: true,
      sortProperty: 'enr_status',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]

  const filterState = React.useRef({
    q: '',
    ageFrom: '',
    ageTo: '',
    fromDate: '',
    toDate: '',
    gender: '',
    districtId: '',
    schoolId: '',
    status: '',
    successCoach: '',
    renderer: uuid(),
  })

  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('enr_enrolled_on')
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const [initialHeadcells, setInitialHeadcells] = React.useState(defaultHeadCells)
  const [enrollmentList, setEnrollmentList] = React.useState([])
  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })
  const districtCode = useRef('')

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
  }

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, getEnrollmentList)
  }

  const setFilterValue = function (e) {
    uiStateAction({
      enrollmentFilter: {
        ...uiState.enrollmentFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const onFilterReset = function () {
    setEnrollmentList([])
    setPageDetails({ ...paginationMidState })
    setSchools([])
    districtCode.current = ''
    uiStateAction({
      enrollmentFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    getEnrollmentList()
  }

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      getEnrollmentList()
    }
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

  const changeStep = (activeTab) => {
    uiStateAction({
      enrollmentDetail: {
        ...uiState.enrollmentDetail,
        activeTab,
      },
    })
  }

  const getEnrollmentList = function () {
    let filterData = {
      ...uiState.enrollmentFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchEnrollmentCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        getEnrollmentList()
        return
      }
      setEnrollmentList(content)
      setPageDetails((previousPageData) => {
        return {
          ...previousPageData,
          last_page: paginationDetail.lastPage,
          current_page: paginationDetail.currentPage,
          from: paginationDetail.from,
          per_page: paginationDetail.perPage,
          to: paginationDetail.to,
          total: paginationDetail.total,
        }
      })
    })
  }

  React.useEffect(() => {
    const headerData = { activeMenuItem: 'allenrollments', activeParent: 'enrollments' }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    fetchDistricts()
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.enrollmentFilter)) {
      uiStateAction({ enrollmentFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    onApplyFilter()
  }, [order, orderBy, uiState.enrollmentFilter.renderer])

  React.useEffect(() => {
    if (
      uiState.enrollmentFilter.districtId &&
      uiState.enrollmentFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.enrollmentFilter.districtId)
      districtCode.current = uiState.enrollmentFilter.districtId
    }
  }, [uiState.enrollmentFilter.districtId])

  /**
   * renders JSX of All Enrollment container
   * @param AllEnrollment
   */

  return (
    <AllEnrollments
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.enrollmentFilter}
      districts={districts}
      schools={schools}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      enrollmentList={enrollmentList}
      onSearchEnter={onSearchEnter}
      changeStep={changeStep}
      masterData={masterData}
    />
  )
}

AllEnrollmentContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  fetchEnrollmentCall: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
  masterData: PropTypes.object,
}

AllEnrollmentContainer.defaultProps = {
  headerAction: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  fetchEnrollmentCall: () => {},
  uiStateAction: () => {},
  uiState: {},
  masterData: {},
}
const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
  masterData: selectMasterData(state),
})
/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
  fetchEnrollmentCall,
  uiStateAction,
})(AllEnrollmentContainer)
