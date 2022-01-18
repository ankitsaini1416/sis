import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import localStorageService from '../../api/localStorageService'
import Audit from '../../components/sis/settings/audit/Audit'
import { TablePageData } from '../../data/TablePageData'
import { selectUiState } from '../../helpers/selectors'
import { get, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'
import { fetchAuditLogs } from './../../actions/audit.action'
import { fetchDistrictsCall } from './../../actions/district.action'
import { fetchSchoolsCall } from './../../actions/schools.action'
import { auditActions } from './../../helpers/stub'

const defaultHeadCells = [
  'event_code',
  'triggered_by',
  'time_log',
  'service',
  'description',
  'actions',
]
function AuditContainer({
  headerAction,
  fetchAuditLogs,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiState,
  uiStateAction,
}) {
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'event_code',
      label: t('eventCode'),
      isSort: false,
      sortProperty: 'event_code',
      width: '250px',
    },
    {
      id: 'triggered_by',
      label: t('triggeredBy'),
      isSort: false,
      sortProperty: 'triggered_by',
      width: '250px',
    },
    {
      id: 'time_log',
      label: t('timeLog'),
      isSort: false,
      sortProperty: 'update_time',
    },
    {
      id: 'service',
      label: t('service'),
      isSort: false,
      sortProperty: 'service',
    },
    {
      id: 'description',
      label: t('description'),
      isSort: false,
      sortProperty: 'description',
      width: '400px',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
    },
  ]
  const [initialHeadcells, setInitialHeadcells] = React.useState(
    !isEmpty(localStorageService.getHeadCellsAudit())
      ? localStorageService.getHeadCellsAudit()()
      : defaultHeadCells
  )
  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
    localStorageService.setHeadCellsDistricts(headcells)
  }

  const filterState = React.useRef({
    f_urn: '',
    f_principal: '',
    f_service: '',
    f_startdate: '',
    f_enddate: '',
    f_action: 'All',
    f_eventcode: '',
    districtId: '',
    school_name: '',
    q: '',
    renderer: uuid(),
  })

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('event_code')
  const [auditList, setAuditList] = React.useState([])
  const [districts, setDistricts] = React.useState([])
  const [schools, setSchools] = React.useState([])

  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchAuditLogsList)
  }

  const setFilterValue = function (e) {
    const auditFilter = {
      ...uiState.auditFilter,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'districtId' && !e.target.value) {
      auditFilter.schoolId = ''
    }
    uiStateAction({ auditFilter })
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
    setSchools([])
    uiStateAction({
      auditFilter: filterState.current,
    })
    fetchAuditLogsList()
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchAuditLogsList()
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

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchAuditLogsList()
    }
  }

  const fetchAuditLogsList = function () {
    let filterData = {
      ...uiState.auditFilter,
      f_action:
        uiState.auditFilter.f_action !== '0'
          ? (auditActions.find((item) => item.name === uiState.auditFilter.f_action) || {}).value
          : '',
      sort_by: orderBy,
      sort_order: order,
    }
    fetchAuditLogs({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchAuditLogsList()
      }
      setAuditList(content)
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
      activeMenuItem: 'audit',
      activeParent: 'settings',
    }
    headerAction(headerData)
  }, [])

  React.useEffect(() => {
    if (isEmpty(uiState.auditFilter)) {
      uiStateAction({ auditFilter: filterState.current })
    }
  }, [])

  React.useEffect(() => {
    fetchDistricts()
  }, [])

  React.useEffect(() => {
    if (!isEmpty(uiState.auditFilter)) {
      onApplyFilter()
    }
  }, [orderBy, order, uiState.auditFilter.renderer])

  /**
   * renders JSX of Audit container
   * @param Audit
   */

  return (
    <Audit
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      auditList={auditList}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.auditFilter}
      districts={districts}
      schools={schools}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      onApplyFilter={onApplyFilter}
      onSearchEnter={onSearchEnter}
      fetchSchool={fetchSchool}
    />
  )
}
AuditContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchAuditLogs: PropTypes.any,
  fetchDistrictsCall: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
}

AuditContainer.defaultProps = {
  headerAction: () => {},
  fetchAuditLogs: () => {},
  fetchDistrictsCall: () => {},
  fetchSchoolsCall: () => {},
  uiState: {},
  uiStateAction: () => {},
}
const mapStateToProps = (state) => ({
  uiState: selectUiState(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  fetchAuditLogs,
  headerAction,
  fetchDistrictsCall,
  fetchSchoolsCall,
  uiStateAction,
})(AuditContainer)
