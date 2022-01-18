import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import localStorageService from '../../api/localStorageService'
import Schools from '../../components/sis/organizations/schools/Schools'
import { TablePageData } from '../../data/TablePageData'
import { get, handleChangePage, isEmpty, isEnter } from '../../helpers/utils'
import { fetchDistrictsCall } from './../../actions/district.action'
import { fetchSchoolsCall } from './../../actions/schools.action'
import { selectMasterData, selectUiState } from './../../helpers/selectors'
import { statuses } from './../../helpers/stub'

const defaultHeadCells = [
  'sch_school_public_id',
  'sch_name',
  'sch_dst_id',
  'sch_school_type',
  'sch_slug',
  'created_at',
  'updated_at',
  'sch_is_active',
  'actions',
]
function SchoolsContainer({
  headerAction,
  fetchSchoolsCall,
  masterData,
  fetchDistrictsCall,
  uiState,
  uiStateAction,
}) {
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'sch_school_public_id',
      label: t('schoolID'),
      isSort: true,
      sortProperty: 'sch_school_public_id',
    },
    {
      id: 'sch_name',
      label: t('schoolName'),
      isSort: true,
      sortProperty: 'sch_name',
    },
    {
      id: 'sch_dst_id',
      label: t('district'),
      isSort: true,
      sortProperty: 'sch_dst_id',
    },
    {
      id: 'sch_school_type',
      label: t('type'),
      isSort: true,
      settingDisabled: true,
      sortProperty: 'sch_school_type',
    },
    {
      id: 'sch_slug',
      label: t('link'),
      isSort: true,
      sortProperty: 'sch_slug',
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
      id: 'sch_is_active',
      label: t('status'),
      isSort: true,
      sortProperty: 'sch_is_active',
      width: '100px',
    },
    {
      id: 'actions',
      label: t('actions'),
      isSort: false,
      sortProperty: 'actions',
      width: '100px',
    },
  ]
  const [districts, setDistricts] = useState([])
  const [initialHeadcells, setInitialHeadcells] = React.useState(
    !isEmpty(localStorageService.getHeadCellsSchools())
      ? localStorageService.getHeadCellsSchools()
      : defaultHeadCells
  )
  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
    localStorageService.setHeadCellsSchools(headcells)
  }
  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })
  const filterState = React.useRef({
    q: '',
    districtId: '',
    sch_dst_name: '',
    type: '',
    fromDate: '',
    toDate: '',
    isActive: '',
    renderer: uuid(),
  })
  const [order, setOrder] = useState('asc')
  const [schools, setSchools] = useState([])
  const [orderBy, setOrderBy] = useState('sch_name')

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchSchools)
  }
  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })
  const setFilterValue = function (e) {
    uiStateAction({
      schoolFilter: {
        ...uiState.schoolFilter,
        [e.target.name]: e.target.value,
      },
    })
  }
  const onFilterReset = function () {
    uiStateAction({
      schoolFilter: { ...filterState.current, renderer: uuid() },
    })
  }
  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchSchools()
  }
  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchSchools()
    }
  }
  const fetchSchools = function () {
    const filterData = {
      ...uiState.schoolFilter,
      isActive: uiState.schoolFilter.isActive
        ? statuses.find((item) => item.name === uiState.schoolFilter.isActive).value
        : '',
      sort_by: orderBy,
      sort_order: order,
    }
    fetchSchoolsCall({ ...pageDetails, ...paginationMidState, ...filterData }, (data) => {
      const { content, ...paginationDetail } = data
      if (isEmpty(content) && pageDetails.current_page !== 1) {
        paginationMidState.current_page = 1
        fetchSchools()
        return
      }
      setSchools(content)
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

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'schools',
      activeParent: 'organizations',
    }
    headerAction(headerData)
  }, [])
  useEffect(() => {
    if (isEmpty(uiState.schoolFilter)) {
      uiStateAction({ schoolFilter: filterState.current })
    }
  }, [])
  useEffect(() => {
    fetchDistricts()
  }, [])

  useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.schoolFilter.renderer])

  /**
   * renders JSX of Schools container
   * @param Schools
   */
  return (
    <Schools
      allHeadCells={allHeadCells}
      initialHeadcells={initialHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      schools={schools}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.schoolFilter}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      masterData={masterData}
      onApplyFilter={onApplyFilter}
      districts={districts}
      onSearchEnter={onSearchEnter}
      fetchSchools={fetchSchools}
    />
  )
}

SchoolsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
  masterData: PropTypes.object,
  fetchDistrictsCall: PropTypes.func,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
}

SchoolsContainer.defaultProps = {
  headerAction: () => {},
  fetchSchoolsCall: () => {},
  masterData: {},
  fetchDistrictsCall: () => {},
  uiState: {},
  uiStateAction: () => {},
}
const mapStateToProps = (state) => ({
  masterData: selectMasterData(state),
  uiState: selectUiState(state),
})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchSchoolsCall,
  fetchDistrictsCall,
  uiStateAction,
})(SchoolsContainer)
