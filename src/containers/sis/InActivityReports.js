import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchInactivityReportsCall } from '../../actions/reports.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import InActivityReports from '../../components/sis/reports/InActivityReports'
import { TablePageData } from '../../data/TablePageData'
import { selectMasterData, selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty } from '../../helpers/utils'

const defaultHeadCells = [
  'student_Id',
  'enrollment_Id',
  'student_Name',
  'email_Address',
  'registered_Date',
  'date_Enrollment',
  'date_of_birth',
  'student_Gender',
  'last_login',
  'enrollment_status',
  'registration_status',
]

function InActivityReportsContainer({
  headerAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
  fetchInactivityReportsCall,
  uiStateAction,
  uiState,
  masterData,
}) {
  const { t } = useTranslation()
  const [initialHeadcells, setInitialHeadcells] = React.useState(defaultHeadCells)
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('')
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const [inactivityReportsList, setInactivityReportsList] = React.useState([])
  const districtCode = useRef('')

  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
  }

  const filterState = React.useRef({
    student: '',
    districtId: '',
    schoolId: '',
    registrationStatus: '',
    enrollmentStatus: '',
    registeredDateFrom: '',
    registeredDateTo: '',
    enrolledDateFrom: '',
    enrolledDateTo: '',
    gender: 'All',
    ageFrom: '',
    ageTo: '',
    inactivityDuration: '14',
    renderer: uuid(),
  })

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchInactivityReports)
  }

  const setFilterValue = function (e) {
    uiStateAction({
      inActivityReportFilter: {
        ...uiState.inActivityReportFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const onFilterReset = function () {
    setSchools([])
    setInactivityReportsList([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      inActivityReportFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchInactivityReports()
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

  const fetchInactivityReports = function () {
    const filterData = {
      ...uiState.inActivityReportFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchInactivityReportsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchInactivityReports()
        return
      }
      setInactivityReportsList(content)
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
    const headerData = {
      activeMenuItem: 'inactivityreport',
      activeParent: 'reports',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (
      uiState.inActivityReportFilter.districtId &&
      uiState.inActivityReportFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.inActivityReportFilter.districtId)
      districtCode.current = uiState.inActivityReportFilter.districtId
    }
  }, [uiState.inActivityReportFilter.districtId])

  React.useEffect(() => {
    fetchInactivityReports()
    fetchDistricts()
  }, [order, orderBy])

  const allHeadCells = [
    {
      id: 'student_Id',
      label: t('studentId'),
      isSort: true,
      sortProperty: 'custid',
    },
    {
      id: 'enrollment_Id',
      label: t('enrollmentId'),
      isSort: true,
      sortProperty: 'enr_system_enrollment_id',
    },
    {
      id: 'student_Name',
      label: t('studentName'),
      isSort: true,
      sortProperty: 'firstName',
    },
    {
      id: 'email_Address',
      label: t('emailAddress'),
      isSort: true,
      sortProperty: 'primaryEmail',
      width: '200px',
    },
    {
      id: 'registered_Date',
      label: t('registeredDate'),
      isSort: true,
      sortProperty: 'registeredDate',
    },
    {
      id: 'date_Enrollment',
      label: t('enrolledDate'),
      isSort: true,
      sortProperty: 'enr_enrolled_on',
    },
    {
      id: 'date_of_birth',
      label: t('dateOfBirth'),
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
      id: 'last_login',
      label: t('lastLogin'),
      isSort: true,
      sortProperty: 'last_login_time',
    },
    {
      id: 'registration_status',
      label: t('registrationStatus'),
      isSort: true,
      sortProperty: 'approval_status',
      width: '200px',
    },
    {
      id: 'enrollment_status',
      label: t('enrollmentStatus'),
      isSort: true,
      sortProperty: 'enr_status',
      width: '200px',
    },
  ]
  /**
   * renders JSX of All Student Reports container
   * @param AllStudentReports
   */
  return (
    <InActivityReports
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.inActivityReportFilter}
      setFilterValue={setFilterValue}
      onApplyFilter={onApplyFilter}
      onFilterReset={onFilterReset}
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      districts={districts}
      schools={schools}
      inactivityReportsList={inactivityReportsList}
      masterData={masterData}
    />
  )
}

InActivityReportsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchInactivityReportsCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
  masterData: PropTypes.object,
}

InActivityReportsContainer.defaultProps = {
  headerAction: () => {},
  fetchInactivityReportsCall: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
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
  fetchInactivityReportsCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
})(InActivityReportsContainer)
