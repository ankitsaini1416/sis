import toNumber from 'lodash/toNumber'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchAllStudentReportsCall } from '../../actions/reports.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import AllStudentReports from '../../components/sis/reports/AllStudentReports'
import { TablePageData } from '../../data/TablePageData'
import { USEQUERY } from '../../helpers/constants'
import { selectUiState } from '../../helpers/selectors'
import { get, getQueryData, handleChangePage, isEmpty } from '../../helpers/utils'

const defaultHeadCells = [
  'student_Id',
  'enrollment_Id',
  'student_Name',
  'registered_Date',
  'date_Enrollment',
  'student_Age',
  'student_Gender',
  'program_name',
  'last_login',
  'status',
]

function AllStudentReportsContainer({
  headerAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
  fetchAllStudentReportsCall,
  uiStateAction,
  uiState,
}) {
  const { t } = useTranslation()
  const [initialHeadcells, setInitialHeadcells] = React.useState(defaultHeadCells)
  const [queryData] = React.useState(USEQUERY ? getQueryData() : {})
  const [pageDetails, setPageDetails] = React.useState({})
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const [allStudentsReportList, setAllStudentsReportList] = React.useState([])
  const [renderer, setRenderer] = React.useState(uuid())
  const districtCode = useRef('')

  const filterState = React.useRef({
    student: '',
    districtId: '',
    schoolId: '',
    status: '',
    ageFrom: '',
    ageTo: '',
    registeredDateFrom: '',
    registeredDateTo: '',
    enrollmentDateFrom: '',
    enrollmentDateTo: '',
    gender: '',
    renderer: uuid(),
  })

  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: toNumber(queryData.current_page) || TablePageData.current_page,
    per_page: toNumber(queryData.per_page) || TablePageData.per_page,
  })

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchAllStudent)
  }

  const setFilterValue = function (e) {
    uiStateAction({
      allStudentFilter: {
        ...uiState.allStudentFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const onFilterReset = function () {
    uiStateAction(
      {
        allStudentFilter: filterState.current,
      },
      setRenderer(uuid())
    )
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchAllStudent()
  }

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
  }

  const fetchDistricts = function (q, perPage) {
    fetchDistrictsCall(
      {
        q,
        per_page: perPage,
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

  const fetchSchool = function (districtId) {
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

  const fetchAllStudent = function () {
    const filterData = {
      ...uiState.allStudentFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchAllStudentReportsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchAllStudent()
      }
      setAllStudentsReportList(content)
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

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'allstudents',
      activeParent: 'reports',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (
      uiState.allStudentFilter.districtId &&
      uiState.allStudentFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.allStudentFilter.districtId)
      districtCode.current = uiState.allStudentFilter.districtId
    }
  }, [uiState.allStudentFilter.districtId])

  React.useEffect(() => {
    if (isEmpty(uiState.allStudentFilter)) {
      uiStateAction({ allStudentFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.allStudentFilter.renderer, renderer])

  React.useEffect(() => {
    fetchAllStudent()
    fetchDistricts()
  }, [order, orderBy, renderer])

  const allHeadCells = [
    {
      id: 'student_Id',
      label: t('studentId'),
      isSort: true,
      sortProperty: 'student_Id',
    },
    {
      id: 'enrollment_Id',
      label: t('enrollmentId'),
      isSort: true,
      sortProperty: 'enrollment_Id',
    },
    {
      id: 'student_Name',
      label: t('studentName'),
      isSort: true,
      sortProperty: 'student_Name',
    },
    {
      id: 'registered_Date',
      label: t('registeredDate'),
      isSort: true,
      sortProperty: 'registered_Date',
    },
    {
      id: 'date_Enrollment',
      label: t('enrolledDate'),
      isSort: true,
      sortProperty: 'date_Enrollment',
    },
    {
      id: 'student_Age',
      label: t('studentAge'),
      isSort: true,
      sortProperty: 'student_Age',
    },
    {
      id: 'student_Gender',
      label: t('studentGender'),
      isSort: true,
      sortProperty: 'student_Gender',
    },
    {
      id: 'program_name',
      label: t('programName'),
      isSort: true,
      sortProperty: 'program_name',
    },

    {
      id: 'last_login',
      label: t('lastLogin'),
      isSort: true,
      sortProperty: 'last_login',
    },
    {
      id: 'status',
      label: t('status'),
      isSort: true,
      sortProperty: 'status',
    },
  ]

  /**
   * renders JSX of All Student Reports container
   * @param AllStudentReports
   */

  return (
    <AllStudentReports
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      filter={uiState.allStudentFilter}
      setFilterValue={setFilterValue}
      onApplyFilter={onApplyFilter}
      onFilterReset={onFilterReset}
      districts={districts}
      schools={schools}
      allStudentsReportList={allStudentsReportList}
    />
  )
}

AllStudentReportsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchAllStudentReportsCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
}

AllStudentReportsContainer.defaultProps = {
  headerAction: () => {},
  fetchAllStudentReportsCall: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  uiStateAction: () => {},
  uiState: {},
}
const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
})
/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchAllStudentReportsCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
})(AllStudentReportsContainer)
