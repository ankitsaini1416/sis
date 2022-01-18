import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchGraduateReportsCall } from '../../actions/reports.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import GraduateReport from '../../components/sis/reports/GraduateReports'
import { TablePageData } from '../../data/TablePageData'
import { selectMasterData, selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty } from '../../helpers/utils'

const defaultHeadCells = [
  'student_Id',
  'enrollment_Id',
  'student_Name',
  'email_Address',
  'primary_Phone',
  'registered_Date',
  'date_Enrollment',
  'date_of_birth',
  'student_Gender',
  'program_name',
  'gpa',
  'enrollment_status',
  'registration_status',
]

function GraduateReportContainer({
  headerAction,
  fetchGraduateReportsCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
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
  const [graduateReportsList, setGraduateReportsList] = React.useState([])
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
    enrollmentStatus: 'graduated',
    registeredDateFrom: '',
    registeredDateTo: '',
    enrolledDateFrom: '',
    enrolledDateTo: '',
    graduationDateFrom: '',
    graduateDateTo: '',
    gender: 'All',
    ageFrom: '',
    ageTo: '',
    renderer: uuid(),
  })

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchGraduateReports)
  }

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
  }

  const setFilterValue = function (e) {
    uiStateAction({
      graduateReportFilter: {
        ...uiState.graduateReportFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const onFilterReset = function () {
    setSchools([])
    setGraduateReportsList([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      graduateReportFilter: filterState.current,
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchGraduateReports()
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

  const fetchGraduateReports = function () {
    const filterData = {
      ...uiState.graduateReportFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchGraduateReportsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchGraduateReports()
        return
      }
      setGraduateReportsList(content)
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
      activeMenuItem: 'graduatereport',
      activeParent: 'reports',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (
      uiState.graduateReportFilter.districtId &&
      uiState.graduateReportFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.graduateReportFilter.districtId)
      districtCode.current = uiState.graduateReportFilter.districtId
    }
  }, [uiState.graduateReportFilter.districtId])

  React.useEffect(() => {
    if (isEmpty(uiState.graduateReportFilter)) {
      uiStateAction({ graduateReportFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    fetchGraduateReports()
    fetchDistricts()
  }, [])

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
    },
    {
      id: 'student_Gender',
      label: t('studentGender'),
      isSort: true,
      sortProperty: 'gender',
    },
    {
      id: 'program_name',
      label: t('programName'),
      isSort: false,
      sortProperty: 'program_name',
      width: '200px',
    },
    {
      id: 'gpa',
      label: t('gpa'),
      isSort: true,
      sortProperty: 'gpa',
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
    <GraduateReport
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.graduateReportFilter}
      setFilterValue={setFilterValue}
      onApplyFilter={onApplyFilter}
      onFilterReset={onFilterReset}
      districts={districts}
      schools={schools}
      graduateReportsList={graduateReportsList}
      masterData={masterData}
    />
  )
}

GraduateReportContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchGraduateReportsCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
  masterData: PropTypes.object,
}

GraduateReportContainer.defaultProps = {
  headerAction: () => {},
  fetchGraduateReportsCall: () => {},
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
  fetchGraduateReportsCall,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
})(GraduateReportContainer)
