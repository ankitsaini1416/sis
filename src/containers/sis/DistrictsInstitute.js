import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { uiStateAction } from '../../actions/app.action'
import { headerAction } from '../../actions/header.action'
import { fetchSchoolsCall } from '../../actions/schools.action'
import localStorageService from '../../api/localStorageService'
import Districts from '../../components/sis/institute/districts/Districts'
import { TablePageData } from '../../data/TablePageData'
import { handleChangePage, isEmpty, isEnter } from '../../helpers/utils'
import { fetchInstituteDistrictsCall } from './../../actions/InstituteDistrict.action'
import { selectMasterData, selectUiState } from './../../helpers/selectors'
import { statuses } from './../../helpers/stub'

const defaultHeadCells = [
  'dst_district_public_id',
  'dst_name',
  'dst_organization',
  'dst_contact_person',
  'dst_type',
  'dst_slug',
  'created_at',
  'updated_at',
  'dst_is_active',
  'actions',
]
const defaultSchoolsHeadCells = [
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
function DistrictsContainer({
  headerAction,
  fetchInstituteDistrictsCall,
  masterData,
  uiState,
  uiStateAction,
  fetchSchoolsCall,
}) {
  const { t } = useTranslation()
  const allHeadCells = [
    {
      id: 'dst_district_public_id',
      label: t('districtID'),
      isSort: true,
      sortProperty: 'dst_district_public_id',
    },
    {
      id: 'dst_name',
      label: t('districtName'),
      isSort: true,
      sortProperty: 'dst_name',
    },
    {
      id: 'dst_organization',
      label: t('Institute'),
      isSort: true,
      sortProperty: 'dst_organization',
    },
    {
      id: 'dst_contact_person',
      label: t('superintendent'),
      isSort: true,
      sortProperty: 'dst_contact_person',
    },
    {
      id: 'dst_type',
      label: t('type'),
      isSort: true,
      sortProperty: 'dst_type',
    },
    {
      id: 'dst_slug',
      label: t('link'),
      isSort: true,
      sortProperty: 'dst_slug',
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
      id: 'dst_is_active',
      label: t('status'),
      isSort: true,
      sortProperty: 'dst_is_active',
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
  const allSchoolsHeadCells = [
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
  const [initialSChoolHeadcells, setInitialSchoolHeadcells] = React.useState(
    !isEmpty(localStorageService.getHeadCellsSchools())
      ? localStorageService.getHeadCellsSchools()
      : defaultSchoolsHeadCells
  )
  const setSchoolHeadcells = function (headcells) {
    setInitialSchoolHeadcells(headcells)
    localStorageService.setInitialSchoolHeadcells(headcells)
  }
  const [initialHeadcells, setInitialHeadcells] = React.useState(
    !isEmpty(localStorageService.getHeadCellsDistricts())
      ? localStorageService.getHeadCellsDistricts()
      : defaultHeadCells
  )

  const setHeadcells = function (headcells) {
    setInitialHeadcells(headcells)
    localStorageService.setHeadCellsDistricts(headcells)
  }

  let [paginationMidState] = React.useState({
    ...TablePageData,
    current_page: TablePageData.current_page,
    per_page: TablePageData.per_page,
  })

  const filterState = React.useRef({
    q: '',
    type: '',
    fromDate: '',
    toDate: '',
    isActive: '',
    renderer: uuid(),
  })

  const [order, setOrder] = useState('asc')
  const [districts, setDistricts] = useState([])
  const [schools, setSchools] = useState([])
  const [orderBy, setOrderBy] = useState('dst_name')

  const onChangePage = function (event, newPage) {
    handleChangePage(event, newPage, paginationMidState, fetchDistricts)
  }

  const [pageDetails, setPageDetails] = React.useState({
    ...paginationMidState,
  })

  const setFilterValue = function (e) {
    uiStateAction({
      districtFilter: {
        ...uiState.districtFilter,
        [e.target.name]: e.target.value,
      },
    })
  }

  const onFilterReset = function () {
    uiStateAction({
      districtFilter: { ...filterState.current, renderer: uuid() },
    })
  }

  const onApplyFilter = function () {
    paginationMidState.current_page = 1
    fetchDistricts()
  }

  const onSearchEnter = function (event) {
    if (isEnter(event)) {
      event.preventDefault()
      fetchDistricts()
    }
  }

  const fetchDistricts = function () {
    const filterData = {
      ...uiState.districtFilter,
      isActive: uiState.districtFilter.isActive
        ? statuses.find((item) => item.name === uiState.districtFilter.isActive).value
        : '',
      sort_by: orderBy,
      sort_order: order,
    }
    fetchInstituteDistrictsCall(
      { ...pageDetails, ...paginationMidState, ...filterData },
      (data) => {
        const { content, ...paginationDetail } = data
        if (isEmpty(content) && pageDetails.current_page !== 1) {
          paginationMidState.current_page = 1
          fetchDistricts()
          return
        }
        setDistricts(content)
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
  //
  const fetchSchools = function (districtId) {
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
        const tempData = [...districts]
        console.log(districts, tempData)

        tempData.map((el) => {
          if (el.id === districtId) {
            el.schools = [...content]
          }
          return el
        })
        setDistricts(tempData)
        // setSchools(content)
      },
      null,
      false
    )
  }

  useEffect(() => {
    if (isEmpty(uiState.districtFilter)) {
      uiStateAction({ districtFilter: filterState.current })
    }
  }, [])

  useEffect(() => {
    const headerData = {
      activeMenuItem: 'institute districts',
      activeParent: 'institute',
    }
    headerAction(headerData)
  }, [])

  useEffect(() => {
    onApplyFilter()
  }, [orderBy, order, uiState.districtFilter.renderer])

  /**
   * renders JSX of Districts container
   * @param Districts
   */

  return (
    <Districts
      allHeadCells={allHeadCells}
      allSchoolsHeadCells={allSchoolsHeadCells}
      initialHeadcells={initialHeadcells}
      initialSChoolHeadcells={initialSChoolHeadcells}
      setSchoolHeadcells={setSchoolHeadcells}
      setHeadcells={setHeadcells}
      pageDetails={pageDetails}
      districts={districts}
      onChangePage={onChangePage}
      order={order}
      orderBy={orderBy}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      filter={uiState.districtFilter}
      setFilterValue={setFilterValue}
      onFilterReset={onFilterReset}
      masterData={masterData}
      onApplyFilter={onApplyFilter}
      onSearchEnter={onSearchEnter}
      fetchDistricts={fetchDistricts}
      schools={schools}
      setSchools={setSchools}
      fetchSchools={fetchSchools}
    />
  )
}

DistrictsContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchInstituteDistrictsCall: PropTypes.func,
  masterData: PropTypes.object,
  uiState: PropTypes.object,
  uiStateAction: PropTypes.func,
  fetchSchoolsCall: PropTypes.func,
}

DistrictsContainer.defaultProps = {
  headerAction: () => {},
  fetchInstituteDistrictsCall: () => {},
  masterData: {},
  uiState: {},
  uiStateAction: () => {},
  fetchSchoolsCall: () => {},
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
  fetchInstituteDistrictsCall,
  uiStateAction,
  fetchSchoolsCall,
})(DistrictsContainer)
