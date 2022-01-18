import toNumber from 'lodash/toNumber'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { fetchDistrictsCall } from '../../actions/district.action'
import { headerAction } from '../../actions/header.action'
import { fetchProgramsCall } from '../../actions/program.action'
import {
  fetchInstructerReportsCall,
  fetchStudentGenericReportsCall,
  fetchSuccessCoachReportsCall,
} from '../../actions/reports.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import CustomReport from '../../components/sis/reports/CustomReports'
import { TablePageData } from '../../data/TablePageData'
import { USEQUERY } from '../../helpers/constants'
import { selectMasterData, selectUiState } from '../../helpers/selectors'
import { get, getQueryData, handleChangePage, isEmpty } from '../../helpers/utils'

function CustomReportContainer({
  headerAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
  uiState,
  fetchStudentGenericReportsCall,
  fetchSuccessCoachReportsCall,
  fetchInstructerReportsCall,
  masterData,
  fetchProgramsCall,
}) {
  const [queryData] = React.useState(USEQUERY ? getQueryData() : {})
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])
  const [genericStudentReportList, setGenericStudentReportList] = React.useState([])
  const [successCoachReportList, setSuccessCoachReportList] = React.useState([])
  const [instructerReportList, setInstructerReportList] = React.useState([])
  const [programList, setProgramList] = React.useState([])
  const districtCode = useRef('')

  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: toNumber(queryData.current_page) || TablePageData.current_page,
    per_page: toNumber(queryData.per_page) || TablePageData.per_page,
  })

  const [pageDetails, setPageDetails] = React.useState({ ...paginationMidState })
  const [successCoachPageDetails, setSuccessCoachPageDetails] = React.useState({
    ...paginationMidState,
  })
  const [instructerPageDetails, setInstructerPageDetails] = React.useState({
    ...paginationMidState,
  })

  const studentFilterState = React.useRef({
    student: '',
    districtId: '',
    schoolId: '',
    registrationStatus: '',
    enrollmentStatus: '',
    programId: '',
    successCoachStatus: '',
    registeredDateFrom: '',
    registeredDateTo: '',
    enrollmentDateFrom: '',
    enrollmentDateTo: '',
    graduationDateFrom: '',
    graduationDateTo: '',
    gender: '',
    ageFrom: '',
    ageTo: '',
    inactivityDuration: '',
    enrIsIep: true,
    balanceDue: true,
    renderer: uuid(),
  })

  const successCoachFilterState = React.useRef({
    successCoachStatus: '',
    districtId: '',
    schoolId: '',
    registrationStatus: '',
    joinedFromDate: '',
    joinedToDate: '',
    gender: '',
    availability: '',
    renderer: uuid(),
  })

  const instructerFilterState = React.useRef({
    instructer: '',
    districtId: '',
    schoolId: '',
    status: '',
    joinedFromDate: '',
    joinedToDate: '',
    gender: '',
    availability: '',
    program: '',
    renderer: uuid(),
  })

  const setStudentFilterValue = function (e) {
    uiStateAction({
      studentReportFilter: {
        ...uiState.studentReportFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const setSuccessCoachFilter = function (e) {
    uiStateAction({
      successCoachReportFilter: {
        ...uiState.successCoachReportFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const setInstructerFilter = function (e) {
    uiStateAction({
      instructerReportFilter: {
        ...uiState.instructerReportFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const onStudentFilterReset = function () {
    setGenericStudentReportList([])
    setSchools([])
    setPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      studentReportFilter: studentFilterState.current,
    })
  }

  const onSuccessCoachFilterReset = function () {
    setSuccessCoachReportList([])
    setSchools([])
    setSuccessCoachPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      successCoachReportFilter: successCoachFilterState.current,
    })
  }

  const onInstructerFilterReset = function () {
    setInstructerReportList([])
    setSchools([])
    setInstructerPageDetails({ ...paginationMidState })
    districtCode.current = ''
    uiStateAction({
      instructerReportFilter: instructerFilterState.current,
    })
  }

  const onApplyStudentFilter = function () {
    paginationMidState.current_page = 1
    fetchStudentGenericReports()
  }

  const onApplySuccessCoachFilter = function () {
    paginationMidState.current_page = 1
    fetchSuccessCoachReports()
  }

  const onApplyInstructerFilter = function () {
    paginationMidState.current_page = 1
    fetchInstructerReports()
  }

  const onChangeStudentPage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchStudentGenericReports)
  }

  const onChangeSuccessCoachPage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchSuccessCoachReports)
  }

  const onChangeInstructerPage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchInstructerReports)
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

  const fetchStudentGenericReports = function () {
    const filterData = {
      ...uiState.studentReportFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchStudentGenericReportsCall(
      { ...pageDetails, ...paginationMidState, ...filterData },
      (data) => {
        const { content, ...paginationDetail } = data
        if (isEmpty(content) && pageDetails.current_page !== 1) {
          paginationMidState.current_page = 1
          fetchStudentGenericReports()
          return
        }
        setGenericStudentReportList(content)
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
      }
    )
  }

  const fetchSuccessCoachReports = function () {
    const filterData = {
      ...uiState.successCoachReportFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchSuccessCoachReportsCall(
      { ...successCoachPageDetails, ...paginationMidState, ...filterData },
      (data) => {
        const { content, ...paginationDetail } = data
        if (isEmpty(content) && successCoachPageDetails.current_page !== 1) {
          paginationMidState.current_page = 1
          fetchSuccessCoachReports()
          return
        }
        setSuccessCoachReportList(content)
        setSuccessCoachPageDetails((previousPageData) => {
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
      }
    )
  }

  const fetchProgramsList = function (values) {
    let filterData = {
      ...uiState.programFilter,
      sort_by: '',
      sort_order: '',
      schoolId: schools.find((item) => item.sch_school_public_id === values.schoolId)?.sch_id,
    }
    fetchProgramsCall({ ...filterData }, (data) => {
      const { content } = data
      setProgramList(content)
    })
  }

  const fetchInstructerReports = function () {
    const filterData = {
      ...uiState.instructerReportFilter,
      sort_by: orderBy,
      sort_order: order,
    }
    fetchInstructerReportsCall(
      { ...instructerPageDetails, ...paginationMidState, ...filterData },
      (data) => {
        const { content, ...paginationDetail } = data
        if (isEmpty(content) && instructerPageDetails.current_page !== 1) {
          paginationMidState.current_page = 1
          fetchInstructerReports()
          return
        }
        setInstructerReportList(content)
        setInstructerPageDetails((previousPageData) => {
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
      }
    )
  }

  React.useEffect(() => {
    const headerData = {
      activeMenuItem: 'customreport',
      activeParent: 'reports',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.studentReportFilter)) {
      uiStateAction({ studentReportFilter: studentFilterState.current })
    }
  }, [])

  React.useEffect(() => {
    if (
      uiState.studentReportFilter.districtId &&
      uiState.studentReportFilter.districtId !== districtCode.current
    ) {
      fetchSchool(uiState.studentReportFilter.districtId)
      districtCode.current = uiState.studentReportFilter.districtId
    }
    fetchProgramsList(uiState.studentReportFilter)
  }, [uiState.studentReportFilter])

  React.useEffect(() => {
    if (isEmpty(uiState.successCoachReportFilter)) {
      uiStateAction({ successCoachReportFilter: successCoachFilterState.current })
    }
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.instructerReportFilter)) {
      uiStateAction({ instructerReportFilter: instructerFilterState.current })
    }
  }, [])

  React.useEffect(() => {
    fetchStudentGenericReports()
    fetchSuccessCoachReports()
    fetchInstructerReports()
    fetchDistricts()
  }, [order, orderBy])

  /**
   * renders JSX of All Student Reports container
   * @param AllStudentReports
   */

  return (
    <CustomReport
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      districts={districts}
      schools={schools}
      fetchSchool={fetchSchool}
      pageDetails={pageDetails}
      studentGenericFilter={uiState.studentReportFilter}
      setStudentFilterValue={setStudentFilterValue}
      onStudentFilterReset={onStudentFilterReset}
      onApplyStudentFilter={onApplyStudentFilter}
      onChangeStudentPage={onChangeStudentPage}
      genericStudentReportList={genericStudentReportList}
      successCoachFilter={uiState.successCoachReportFilter}
      setSuccessCoachFilter={setSuccessCoachFilter}
      onApplySuccessCoachFilter={onApplySuccessCoachFilter}
      onSuccessCoachFilterReset={onSuccessCoachFilterReset}
      successCoachPageDetails={successCoachPageDetails}
      onChangeSuccessCoachPage={onChangeSuccessCoachPage}
      successCoachReportList={successCoachReportList}
      instructerFilter={uiState.instructerReportFilter}
      setInstructerFilter={setInstructerFilter}
      onApplyInstructerFilter={onApplyInstructerFilter}
      onInstructerFilterReset={onInstructerFilterReset}
      instructerPageDetails={instructerPageDetails}
      onChangeInstructerPage={onChangeInstructerPage}
      instructerReportList={instructerReportList}
      masterData={masterData}
      programList={programList}
    />
  )
}

CustomReportContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchStudentGenericReportsCall: PropTypes.func,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  uiStateAction: PropTypes.func,
  uiState: PropTypes.object,
  fetchSuccessCoachReportsCall: PropTypes.func,
  fetchInstructerReportsCall: PropTypes.func,
  masterData: PropTypes.object,
  fetchProgramsCall: PropTypes.func,
}

CustomReportContainer.defaultProps = {
  headerAction: () => {},
  fetchStudentGenericReportsCall: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  uiStateAction: () => {},
  uiState: {},
  fetchSuccessCoachReportsCall: () => {},
  fetchInstructerReportsCall: () => {},
  masterData: {},
  fetchProgramsCall: () => {},
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
  uiStateAction,
  fetchStudentGenericReportsCall,
  fetchSuccessCoachReportsCall,
  fetchInstructerReportsCall,
  fetchProgramsCall,
})(CustomReportContainer)
