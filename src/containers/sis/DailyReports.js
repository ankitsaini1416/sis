import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchDailyReportsCall } from '../../actions/reports.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import DailyReport from '../../components/sis/reports/DailyReports'
import { TablePageData } from '../../data/TablePageData'
import { selectMasterData, selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty } from '../../helpers/utils'

const defaultHeadCells = [
  'student_Id',
  'enrollment_Id',
  'student_Name',
  'email_Address',
  'primary_Phone',
  'address',
  'registered_Date',
  'date_Enrollment',
  'date_of_birth',
  'student_Gender',
  'program_name',
  'completion_rate',
  'last_login',
  'enrollment_status',
  'registration_status',
]

function DailyReportContainer({
  headerAction,
  masterData,
  fetchDistrictsCall,
  fetchSchoolsCall,
  fetchDailyReportsCall,
  uiStateAction,
  uiState,
}) {
  const { t } = useTranslation()

  const allHeadCells = [
    {
      id: 'student_Id',
      label: t('studentId'),
      isSort: true,
      sortProperty: 'custid',
      width: '200px',
    },
    {
      id: 'enrollment_Id',
      label: t('enrollmentId'),
      isSort: true,
      sortProperty: 'enr_system_enrollment_id',
      width: '200px',
    },
    {
      id: 'student_Name',
      label: t('studentName'),
      isSort: true,
      settingDisabled: true,
      sortProperty: 'firstName',
      width: '200px',
    },
    {
      id: 'email_Address',
      label: t('emailAddress'),
      isSort: true,
      sortProperty: 'primaryEmail',
      width: '200px',
    },
    {
      id: 'primary_Phone',
      label: t('primaryPhone'),
      isSort: true,
      sortProperty: 'mobilePhone',
      width: '200px',
    },
    {
      id: 'address',
      label: t('address'),
      isSort: true,
      sortProperty: 'addresses',
      width: '300px',
    },
    {
      id: 'registered_Date',
      label: t('registeredDate'),
      isSort: true,
      sortProperty: 'registeredDate',
      width: '200px',
    },
    {
      id: 'date_Enrollment',
      label: t('enrolledDate'),
      isSort: true,
      sortProperty: 'enr_enrolled_on',
      width: '200px',
    },
    {
      id: 'date_of_birth',
      label: t('dateOfBirth'),
      isSort: true,
      sortProperty: 'birthday',
      width: '150px',
    },
    {
      id: 'student_Gender',
      label: t('studentGender'),
      isSort: true,
      sortProperty: 'gender',
      width: '150px',
    },
    {
      id: 'program_name',
      label: t('programName'),
      isSort: false,
      settingDisabled: true,
      sortProperty: 'program_name',
      width: '200px',
    },
    {
      id: 'last_login',
      label: t('lastLogin'),
      isSort: true,
      sortProperty: 'last_login_time',
      width: '150px',
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
    {
      id: 'completion_rate',
      label: t('completionRate'),
      isSort: false,
      settingDisabled: true,
      sortProperty: 'completion_rate',
      width: '250px',
    },
  ]

  const [initialHeadcells, setInitialHeadcells] = React.useState(defaultHeadCells)
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('')
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const [dailyReportsList, setDailyReportsList] = React.useState([])
  const districtCode = useRef('')

  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  const filterState = React.useRef({
    student: '',
    districtId: '',
    schoolId: '',
    registrationStatus: '',
    enrollmentStatus: '',
    registeredDateFrom: '',
    registeredDateTo: '',
    enrollmentDateFrom: '',
    enrollmentDateTo: '',
    gender: '',
    ageFrom: '',
    ageTo: '',
    renderer: uuid(),
  })

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
  }

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchDailyReports)
  }

  const setFilterValue = function (e) {
    uiStateAction({
      dailyReportFilter: {
        ...uiState.dailyReportFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const onFilterReset = function () {
    setDailyReportsList([])
    setSchools([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      dailyReportFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchDailyReports()
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

  const fetchDailyReports = function () {
    const filterData = {
      ...uiState.dailyReportFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchDailyReportsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchDailyReports()
        return
      }
      setDailyReportsList(content)
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
      activeMenuItem: 'dailyreport',
      activeParent: 'reports',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (
      uiState.dailyReportFilter.districtId &&
      uiState.dailyReportFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.dailyReportFilter.districtId)
      districtCode.current = uiState.dailyReportFilter.districtId
    }
  }, [uiState.dailyReportFilter])

  React.useEffect(() => {
    if (isEmpty(uiState.dailyReportFilter)) {
      uiStateAction({ dailyReportFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    fetchDailyReports()
    fetchDistricts()
  }, [order, orderBy])

  /**
   * renders JSX of All Student Reports container
   * @param AllStudentReports
   */

  return (
    <DailyReport
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.dailyReportFilter}
      setFilterValue={setFilterValue}
      onApplyFilter={onApplyFilter}
      onFilterReset={onFilterReset}
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      districts={districts}
      schools={schools}
      dailyReportsList={dailyReportsList}
      masterData={masterData}
    />
  )
}

DailyReportContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchDailyReportsCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
  masterData: PropTypes.object,
}

DailyReportContainer.defaultProps = {
  headerAction: () => {},
  fetchDailyReportsCall: () => {},
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
  fetchDailyReportsCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
})(DailyReportContainer)
